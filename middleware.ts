// middleware.ts
import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // ✅ Allow login page & NextAuth API without blocking
  if (pathname.startsWith("/admin/login") || pathname.startsWith("/api/auth")) {
    return NextResponse.next()
  }

  // ✅ Get NextAuth token (includes role we added in callbacks)
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
    cookieName:
      process.env.NODE_ENV === "production"
        ? "__Secure-next-auth.session-token"
        : "next-auth.session-token",
  })

  console.log("Middleware check:", {
    path: pathname,
    hasToken: !!token,
    role: token?.role,
  })

  // ✅ If not logged in, go to login
  if (!token && pathname.startsWith("/admin")) {
    const url = new URL("/admin/login", request.url)
    url.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(url)
  }

  // ✅ If logged in but not admin, block access
  if (token && token.role !== "admin" && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/", request.url)) // or "/403"
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
