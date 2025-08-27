import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { NextAuthOptions } from "next-auth"

export const authOptions: NextAuthOptions = {
  providers: [
    // 🔐 Google Login
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // 🔑 Credentials login
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        })

        const data = await res.json()

        if (res.ok && data.user) {
          return data.user // This object will be attached to session.user and token.user
        }

        return null
      },
    }),
  ],

  // 🧠 Store extra user info in JWT token and session
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user
      }
      return token
    },
    async session({ session, token }) {
      session.user = token.user as any
      return session
    },
  },

  // 🔐 Use JWT for stateless session
  session: {
    strategy: "jwt",
  },

  // 🔁 Redirect users to this custom login page
  pages: {
    signIn: "/admin/login",
  },

  // 🔒 Required by NextAuth for encryption
  secret: process.env.NEXTAUTH_SECRET,
}
