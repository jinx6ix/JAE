import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/admin/database"
import { requireAuth, requirePermission } from "@/lib/admin/auth-middleware"

export async function GET(request: NextRequest) {
  try {
    const user = requireAuth(request)

    if (!requirePermission(user, "billing_view")) {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 })
    }

    const result = await query(`
      SELECT 
        i.*,
        c.name as client_name,
        ARRAY_AGG(DISTINCT ins.service_name) FILTER (WHERE ins.service_name IS NOT NULL) as services
      FROM invoices i
      JOIN clients c ON i.client_id = c.id
      LEFT JOIN invoice_services ins ON i.id = ins.invoice_id
      GROUP BY i.id, c.name
      ORDER BY i.created_at DESC
    `)

    const invoices = result.rows.map((row) => ({
      id: row.id,
      clientId: row.client_id,
      clientName: row.client_name,
      amount: Number.parseFloat(row.amount),
      status: row.status,
      dueDate: row.due_date,
      paidDate: row.paid_date,
      services: row.services || [],
      createdAt: row.created_at,
    }))

    return NextResponse.json(invoices)
  } catch (error) {
    console.error("Get invoices error:", error)
    return NextResponse.json(
      { error: error.message === "Authentication required" ? "Authentication required" : "Internal server error" },
      { status: error.message === "Authentication required" ? 401 : 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = requireAuth(request)

    if (!requirePermission(user, "billing_manage")) {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 })
    }

    const data = await request.json()

    // Generate invoice ID
    const invoiceId = `INV-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`

    // Insert invoice
    const invoiceResult = await query(
      `
      INSERT INTO invoices (id, client_id, amount, status, due_date, paid_date)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `,
      [invoiceId, data.clientId, data.amount, data.status || "Pending", data.dueDate, data.paidDate || null],
    )

    const invoice = invoiceResult.rows[0]

    // Insert services
    if (data.services && data.services.length > 0) {
      for (const service of data.services) {
        await query("INSERT INTO invoice_services (invoice_id, service_name) VALUES ($1, $2)", [invoice.id, service])
      }
    }

    // Get client name
    const clientResult = await query("SELECT name FROM clients WHERE id = $1", [data.clientId])
    const clientName = clientResult.rows[0]?.name || "Unknown Client"

    return NextResponse.json({
      id: invoice.id,
      clientId: invoice.client_id,
      clientName: clientName,
      amount: Number.parseFloat(invoice.amount),
      status: invoice.status,
      dueDate: invoice.due_date,
      paidDate: invoice.paid_date,
      services: data.services || [],
      createdAt: invoice.created_at,
    })
  } catch (error) {
    console.error("Create invoice error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
