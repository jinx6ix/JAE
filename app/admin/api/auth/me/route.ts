import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    try {
      // Decode the simple base64 token
      const tokenData = JSON.parse(Buffer.from(token, "base64").toString())

      // Check if token is expired (24 hours)
      const tokenAge = Date.now() - tokenData.timestamp
      if (tokenAge > 86400000) {
        // 24 hours in milliseconds
        return NextResponse.json({ error: "Token expired" }, { status: 401 })
      }

      // Mock user data based on token
      const mockUsers = [
        {
          id: "550e8400-e29b-41d4-a716-446655440001",
          name: "John Admin",
          email: "admin@securehost.com",
          role: "admin",
          department: "admin",
          status: "active",
          phone: "+1-555-0001",
          position: "System Administrator",
          permissions: ["all"],
          requiresSecondaryAuth: false,
        },
        {
          id: "550e8400-e29b-41d4-a716-446655440002",
          name: "Sarah Wilson",
          email: "sarah.wilson@securehost.com",
          role: "webhosting_manager",
          department: "webhosting",
          status: "active",
          phone: "+1-555-0002",
          position: "Web Hosting Manager",
          permissions: [
            "hosting_manage",
            "hosting_view",
            "clients_manage",
            "clients_view",
            "billing_view",
            "users_view",
            "tasks_assign",
            "tasks_view",
            "tasks_manage",
          ],
          requiresSecondaryAuth: true,
        },
        {
          id: "550e8400-e29b-41d4-a716-446655440003",
          name: "Mike Johnson",
          email: "mike.johnson@securehost.com",
          role: "webhosting_user",
          department: "webhosting",
          status: "active",
          phone: "+1-555-0003",
          position: "Server Technician",
          permissions: ["hosting_view", "clients_view", "tasks_manage"],
          requiresSecondaryAuth: true,
        },
        {
          id: "550e8400-e29b-41d4-a716-446655440005",
          name: "Alex Rodriguez",
          email: "alex.rodriguez@securehost.com",
          role: "cybersecurity_manager",
          department: "cybersecurity",
          status: "active",
          phone: "+1-555-0005",
          position: "Cybersecurity Manager",
          permissions: [
            "security_manage",
            "security_view",
            "alerts_manage",
            "alerts_view",
            "users_view",
            "reports_generate",
            "tasks_assign",
            "tasks_view",
            "tasks_manage",
            "incidents_respond",
          ],
          requiresSecondaryAuth: true,
        },
        {
          id: "550e8400-e29b-41d4-a716-446655440006",
          name: "Lisa Chen",
          email: "lisa.chen@securehost.com",
          role: "cybersecurity_user",
          department: "cybersecurity",
          status: "active",
          phone: "+1-555-0006",
          position: "Security Analyst",
          permissions: ["security_view", "alerts_view", "tasks_manage", "incidents_respond"],
          requiresSecondaryAuth: true,
        },
      ]

      const user = mockUsers.find((u) => u.id === tokenData.userId)

      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 401 })
      }

      return NextResponse.json({
        user: {
          ...user,
          createdAt: "2024-01-01T00:00:00Z",
          lastLogin: new Date().toISOString(),
          avatar: null,
        },
      })
    } catch (tokenError) {
      console.error("Token decode error:", tokenError)
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }
  } catch (error) {
    console.error("Auth check error:", error)
    return NextResponse.json({ error: "Authentication check failed" }, { status: 500 })
  }
}
