import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase-server";

export async function middleware(req: NextRequest) {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();

  const isAuth = !!session;
  const isLoginPage = req.nextUrl.pathname === "/admin/login";

  if (!isAuth && !isLoginPage) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  if (isAuth && isLoginPage) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
