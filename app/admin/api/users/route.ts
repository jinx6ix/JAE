import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/admin/database"
import { requireAuth, requirePermission } from "@/lib/admin/auth-middleware"
import bcrypt from "bcryptjs"

export async function GET(request: NextRequest) {
  try {
    const user = requireAuth(request)

    if (!requirePermission(user, "users_view") && user.role !== "admin") {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const department = searchParams.get("department")

    let whereClause = ""
    const params: any[] = []

    // Filter by department if not admin
    if (user.role !== "admin") {
      whereClause = "WHERE u.department = $1"
      params.push(user.department)
    } else if (department && department !== "admin") {
      whereClause = "WHERE u.department = $1"
      params.push(department)
    }

    const result = await query(
      `
      SELECT 
        u.*,
        ARRAY_AGG(DISTINCT up.permission) FILTER (WHERE up.permission IS NOT NULL) as permissions,
        s.name as supervisor_name
      FROM users u
      LEFT JOIN user_permissions up ON u.id = up.user_id
      LEFT JOIN users s ON u.supervisor_id = s.id
      ${whereClause}
      GROUP BY u.id, s.name
      ORDER BY u.created_at DESC
    `,
      params,
    )

    const users = result.rows.map((row) => ({
      id: row.id,
      name: row.name,
      email: row.email,
      role: row.role,
      department: row.department,
      status: row.status,
      phone: row.phone,
      position: row.position,
      avatar: row.avatar_url,
      lastLogin: row.last_login,
      permissions: row.permissions || [],
      createdAt: row.created_at,
      supervisor: row.supervisor_name,
    }))

    return NextResponse.json(users)
  } catch (error) {
    console.error("Get users error:", error)
    return NextResponse.json(
      { error: error.message === "Authentication required" ? "Authentication required" : "Internal server error" },
      { status: error.message === "Authentication required" ? 401 : 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = requireAuth(request)

    if (!requirePermission(user, "users_manage") && user.role !== "admin") {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 })
    }

    const data = await request.json()

    // Hash password (default password123 for demo)
    const hashedPassword = await bcrypt.hash("password123", 10)

    // Insert user
    const userResult = await query(
      `
      INSERT INTO users (name, email, password_hash, role, department, status, phone, position, supervisor_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `,
      [
        data.name,
        data.email,
        hashedPassword,
        data.role,
        data.department,
        data.status || "active",
        data.phone || null,
        data.position || null,
        data.supervisor || null,
      ],
    )

    const newUser = userResult.rows[0]

    // Insert permissions
    if (data.permissions && data.permissions.length > 0) {
      for (const permission of data.permissions) {
        await query("INSERT INTO user_permissions (user_id, permission) VALUES ($1, $2)", [newUser.id, permission])
      }
    }

    return NextResponse.json({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      department: newUser.department,
      status: newUser.status,
      phone: newUser.phone,
      position: newUser.position,
      avatar: newUser.avatar_url,
      lastLogin: newUser.last_login,
      permissions: data.permissions || [],
      createdAt: newUser.created_at,
    })
  } catch (error) {
    console.error("Create user error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
