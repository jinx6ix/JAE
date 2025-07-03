import { type NextRequest, NextResponse } from "next/server"
import { serverEnv } from "@/lib/admin/env"

const JWT_SECRET = serverEnv.JWT_SECRET || "fallback-secret-key-for-development"

// Mock users for development when Supabase is not configured
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
    avatar_url: null,
    last_login: null,
    created_at: "2024-01-01T00:00:00Z",
    user_permissions: [{ permission: "all" }],
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
    avatar_url: null,
    last_login: null,
    created_at: "2024-01-01T00:00:00Z",
    user_permissions: [
      { permission: "hosting_manage" },
      { permission: "hosting_view" },
      { permission: "clients_manage" },
      { permission: "clients_view" },
      { permission: "billing_view" },
      { permission: "users_view" },
      { permission: "tasks_assign" },
      { permission: "tasks_view" },
      { permission: "tasks_manage" },
    ],
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
    avatar_url: null,
    last_login: null,
    created_at: "2024-01-05T00:00:00Z",
    user_permissions: [{ permission: "hosting_view" }, { permission: "clients_view" }, { permission: "tasks_manage" }],
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
    avatar_url: null,
    last_login: null,
    created_at: "2024-01-01T00:00:00Z",
    user_permissions: [
      { permission: "security_manage" },
      { permission: "security_view" },
      { permission: "alerts_manage" },
      { permission: "alerts_view" },
      { permission: "users_view" },
      { permission: "reports_generate" },
      { permission: "tasks_assign" },
      { permission: "tasks_view" },
      { permission: "tasks_manage" },
      { permission: "incidents_respond" },
    ],
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
    avatar_url: null,
    last_login: null,
    created_at: "2024-01-02T00:00:00Z",
    user_permissions: [
      { permission: "security_view" },
      { permission: "alerts_view" },
      { permission: "tasks_manage" },
      { permission: "incidents_respond" },
    ],
  },
]

export async function POST(request: NextRequest) {
  try {
    // Parse request body safely
    let body
    try {
      body = await request.json()
    } catch (parseError) {
      console.error("Failed to parse request body:", parseError)
      return NextResponse.json({ error: "Invalid request format" }, { status: 400 })
    }

    const { email, password } = body

    console.log("Login attempt for:", email)

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // For demo purposes, we'll accept 'password123' for all users
    if (password !== "password123") {
      console.log("Invalid password provided")
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    let userData: any = null

    // Always use mock data for now to avoid Supabase issues
    console.log("Using mock authentication")
    userData = mockUsers.find((u) => u.email === email && u.status === "active")

    if (!userData) {
      console.log("User not found:", email)
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    console.log("User found:", userData.name)

    // Create a simple token (avoiding JWT for now to prevent issues)
    const tokenData = {
      userId: userData.id,
      email: userData.email,
      role: userData.role,
      department: userData.department,
      timestamp: Date.now(),
    }

    const token = Buffer.from(JSON.stringify(tokenData)).toString("base64")

    // Format user data
    const user = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      department: userData.department,
      status: userData.status,
      phone: userData.phone,
      position: userData.position,
      avatar: userData.avatar_url,
      lastLogin: userData.last_login,
      permissions: userData.user_permissions?.map((p: any) => p.permission) || [],
      createdAt: userData.created_at || new Date().toISOString(),
    }

    console.log("Login successful for:", user.name)

    const response = NextResponse.json({
      success: true,
      user: {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        role: userData.role,
        department: userData.department,
        status: userData.status,
        phone: userData.phone,
        position: userData.position,
        avatar: userData.avatar_url,
        lastLogin: userData.last_login,
        permissions: userData.user_permissions?.map((p: any) => p.permission) || [],
        createdAt: userData.created_at || new Date().toISOString(),
        requiresSecondaryAuth: userData.department !== "admin",
      },
    })

    // Set HTTP-only cookie with token
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 86400, // 24 hours
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Login error:", error)
    // Always return JSON, never let it fall through to HTML error pages
    return NextResponse.json(
      {
        error: "Authentication service temporarily unavailable. Please try again.",
      },
      { status: 500 },
    )
  }
}
