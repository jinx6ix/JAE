import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/admin/database"
import { requireAuth, requirePermission } from "@/lib/admin/auth-middleware"

export async function GET(request: NextRequest) {
  try {
    const user = requireAuth(request)

    if (!requirePermission(user, "tasks_manage") && !requirePermission(user, "tasks_view")) {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const department = searchParams.get("department")

    let whereClause = ""
    const params: any[] = []

    // Build WHERE clause based on user permissions and filters
    if (user.role !== "admin") {
      if (requirePermission(user, "tasks_view")) {
        // Managers can see all tasks in their department
        whereClause = "WHERE t.type = $1"
        params.push(user.department)
      } else {
        // Regular users can only see their own tasks
        whereClause = "WHERE t.assigned_to = $1"
        params.push(user.userId)
      }
    } else {
      // Admin can see all tasks, but can filter
      if (userId) {
        whereClause = "WHERE t.assigned_to = $1"
        params.push(userId)
      } else if (department && department !== "admin") {
        whereClause = "WHERE t.type = $1"
        params.push(department)
      }
    }

    const result = await query(
      `
      SELECT 
        t.*,
        u1.name as assigned_to_name,
        u2.name as assigned_by_name,
        ARRAY_AGG(DISTINCT tt.tag) FILTER (WHERE tt.tag IS NOT NULL) as tags,
        COUNT(tc.id) as comment_count
      FROM tasks t
      JOIN users u1 ON t.assigned_to = u1.id
      JOIN users u2 ON t.assigned_by = u2.id
      LEFT JOIN task_tags tt ON t.id = tt.task_id
      LEFT JOIN task_comments tc ON t.id = tc.task_id
      ${whereClause}
      GROUP BY t.id, u1.name, u2.name
      ORDER BY t.created_at DESC
    `,
      params,
    )

    const tasks = result.rows.map((row) => ({
      id: row.id,
      title: row.title,
      description: row.description,
      type: row.type,
      priority: row.priority,
      status: row.status,
      assignedTo: row.assigned_to,
      assignedBy: row.assigned_by,
      assignedToName: row.assigned_to_name,
      assignedByName: row.assigned_by_name,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      dueDate: row.due_date,
      completedAt: row.completed_at,
      tags: row.tags || [],
      relatedEntity: row.related_entity_type
        ? {
            type: row.related_entity_type,
            id: row.related_entity_id,
            name: row.related_entity_name || "Unknown",
          }
        : null,
      comments: [], // Comments will be loaded separately when viewing task details
    }))

    return NextResponse.json(tasks)
  } catch (error) {
    console.error("Get tasks error:", error)
    return NextResponse.json(
      { error: error.message === "Authentication required" ? "Authentication required" : "Internal server error" },
      { status: error.message === "Authentication required" ? 401 : 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = requireAuth(request)

    if (!requirePermission(user, "tasks_assign") && user.role !== "admin") {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 })
    }

    const data = await request.json()

    // Insert task
    const taskResult = await query(
      `
      INSERT INTO tasks (title, description, type, priority, status, assigned_to, assigned_by, due_date, related_entity_type, related_entity_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *
    `,
      [
        data.title,
        data.description,
        data.type,
        data.priority,
        data.status || "pending",
        data.assignedTo,
        data.assignedBy,
        data.dueDate || null,
        data.relatedEntity?.type || null,
        data.relatedEntity?.id || null,
      ],
    )

    const task = taskResult.rows[0]

    // Insert tags
    if (data.tags && data.tags.length > 0) {
      for (const tag of data.tags) {
        await query("INSERT INTO task_tags (task_id, tag) VALUES ($1, $2)", [task.id, tag])
      }
    }

    // Get user names
    const usersResult = await query("SELECT id, name FROM users WHERE id IN ($1, $2)", [
      data.assignedTo,
      data.assignedBy,
    ])

    const assignedToUser = usersResult.rows.find((u) => u.id === data.assignedTo)
    const assignedByUser = usersResult.rows.find((u) => u.id === data.assignedBy)

    return NextResponse.json({
      id: task.id,
      title: task.title,
      description: task.description,
      type: task.type,
      priority: task.priority,
      status: task.status,
      assignedTo: task.assigned_to,
      assignedBy: task.assigned_by,
      assignedToName: assignedToUser?.name || "Unknown",
      assignedByName: assignedByUser?.name || "Unknown",
      createdAt: task.created_at,
      updatedAt: task.updated_at,
      dueDate: task.due_date,
      completedAt: task.completed_at,
      tags: data.tags || [],
      relatedEntity: data.relatedEntity || null,
      comments: [],
    })
  } catch (error) {
    console.error("Create task error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
