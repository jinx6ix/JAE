import { getToken } from "next-auth/jwt"
import { NextRequest } from "next/server"

const AUTH_COOKIE =
  process.env.NODE_ENV === "production"
    ? "__Secure-next-auth.session-token"
    : "next-auth.session-token"

export async function getAuthToken(request: NextRequest) {
  return await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
    cookieName: AUTH_COOKIE,
  })
}

/**
 * Check if request has a valid session
 */
export async function requireAuth(request: NextRequest) {
  const token = await getAuthToken(request)
  return !!token
}

/**
 * Check if request user is an admin
 */
export async function requireAdmin(request: NextRequest) {
  const token = await getAuthToken(request)
  return token?.role === "admin"
}
