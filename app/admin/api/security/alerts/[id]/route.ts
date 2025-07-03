import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/admin/database"
import { requireAuth, requirePermission } from "@/lib/admin/auth-middleware"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = requireAuth(request)

    if (!requirePermission(user, "alerts_manage")) {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 })
    }

    const data = await request.json()

    const result = await query(
      `
      UPDATE security_alerts 
      SET type = COALESCE($1, type), 
          severity = COALESCE($2, severity), 
          target = COALESCE($3, target), 
          source = COALESCE($4, source), 
          description = COALESCE($5, description), 
          status = COALESCE($6, status)
      WHERE id = $7
      RETURNING *
    `,
      [data.type, data.severity, data.target, data.source, data.description, data.status, params.id],
    )

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Security alert not found" }, { status: 404 })
    }

    const alert = result.rows[0]

    // Get affected clients
    const clientsResult = await query("SELECT client_id FROM alert_affected_clients WHERE alert_id = $1", [params.id])

    return NextResponse.json({
      id: alert.id,
      type: alert.type,
      severity: alert.severity,
      target: alert.target,
      source: alert.source,
      timestamp: alert.created_at,
      status: alert.status,
      description: alert.description,
      affectedClients: clientsResult.rows.map((row) => row.client_id),
    })
  } catch (error) {
    console.error("Update security alert error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
