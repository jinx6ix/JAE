import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/admin/database"
import { requireAuth, requirePermission } from "@/lib/admin/auth-middleware"

export async function GET(request: NextRequest) {
  try {
    const user = requireAuth(request)

    if (!requirePermission(user, "security_view") && !requirePermission(user, "alerts_view")) {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 })
    }

    const result = await query(`
      SELECT 
        sa.*,
        ARRAY_AGG(DISTINCT aac.client_id) FILTER (WHERE aac.client_id IS NOT NULL) as affected_client_ids
      FROM security_alerts sa
      LEFT JOIN alert_affected_clients aac ON sa.id = aac.alert_id
      GROUP BY sa.id
      ORDER BY sa.created_at DESC
    `)

    const alerts = result.rows.map((row) => ({
      id: row.id,
      type: row.type,
      severity: row.severity,
      target: row.target,
      source: row.source,
      timestamp: row.created_at,
      status: row.status,
      description: row.description,
      affectedClients: row.affected_client_ids || [],
    }))

    return NextResponse.json(alerts)
  } catch (error) {
    console.error("Get security alerts error:", error)
    return NextResponse.json(
      { error: error.message === "Authentication required" ? "Authentication required" : "Internal server error" },
      { status: error.message === "Authentication required" ? 401 : 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = requireAuth(request)

    if (!requirePermission(user, "alerts_manage")) {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 })
    }

    const data = await request.json()

    // Insert security alert
    const alertResult = await query(
      `
      INSERT INTO security_alerts (type, severity, target, source, description, status)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `,
      [data.type, data.severity, data.target, data.source || null, data.description, data.status || "Active"],
    )

    const alert = alertResult.rows[0]

    // Insert affected clients
    if (data.affectedClients && data.affectedClients.length > 0) {
      for (const clientId of data.affectedClients) {
        await query("INSERT INTO alert_affected_clients (alert_id, client_id) VALUES ($1, $2)", [alert.id, clientId])
      }
    }

    return NextResponse.json({
      id: alert.id,
      type: alert.type,
      severity: alert.severity,
      target: alert.target,
      source: alert.source,
      timestamp: alert.created_at,
      status: alert.status,
      description: alert.description,
      affectedClients: data.affectedClients || [],
    })
  } catch (error) {
    console.error("Create security alert error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
