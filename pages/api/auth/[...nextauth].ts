import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { createClient } from "@supabase/supabase-js"
import { ReactNode } from "react"

// ✅ Public client for login
const supabasePublic = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! // only anon here
)

// ✅ Private client for fetching role/profile
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // only for secure queries
)

declare module "next-auth" {
  interface User {
    role?: string
  }

  interface Session {
    user: {
      name: ReactNode
      id: string
      role?: string
      email?: string
    }
  }
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        // ✅ Use public client for login
        const { data, error } = await supabasePublic.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password,
        })

        if (error || !data.user) {
          console.error("Login failed:", error)
          return null
        }

        // ✅ Use service role client to fetch role
        const { data: profile, error: profileError } = await supabaseAdmin
          .from("profiles")
          .select("role, full_name")
          .eq("id", data.user.id)
          .single()

        if (profileError) console.warn("No profile found:", profileError)

        return {
          id: data.user.id,
          name: profile?.full_name || data.user.email,
          email: data.user.email,
          role: profile?.role || "user",
        }
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role
      return token
    },
    async session({ session, token }) {
      if (token) session.user.role = token.role as string | undefined
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
})
