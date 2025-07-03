import type { NextRequest } from "next/server"
import jwt from "jsonwebtoken"
import { serverEnv } from "./env"

const JWT_SECRET = serverEnv.JWT_SECRET || "fallback-secret-key-for-development"

export interface AuthUser {
  userId: string
  email: string
  role: string
  department: string
}

export function getAuthUser(request: NextRequest): AuthUser | null {
  try {
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return null
    }

    const decoded = jwt.verify(token, JWT_SECRET) as AuthUser
    return decoded
  } catch (error) {
    console.warn("JWT verification failed:", error.message)
    return null
  }
}

export function requireAuth(request: NextRequest): AuthUser {
  const user = getAuthUser(request)
  if (!user) {
    throw new Error("Authentication required")
  }
  return user
}

export function requirePermission(user: AuthUser, permission: string): boolean {
  // Admin has all permissions
  if (user.role === "admin") {
    return true
  }

  // Check specific permissions based on role
  const rolePermissions: Record<string, string[]> = {
    webhosting_manager: [
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
    webhosting_user: ["hosting_view", "clients_view", "tasks_manage"],
    cybersecurity_manager: [
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
    cybersecurity_user: ["security_view", "alerts_view", "tasks_manage", "incidents_respond"],
  }

  return rolePermissions[user.role]?.includes(permission) || false
}
