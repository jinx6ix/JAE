"use client"

import { useEffect } from "react"
import { getSupabaseClient } from "./supabase"
import { isSupabaseConfigured } from "./env"

// Initialize the application
export function useAppInitialization() {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("🚀 Admin Dashboard initialized")

      if (isSupabaseConfigured()) {
        console.log("✅ Supabase configured")

        // Initialize Supabase client and test connection
        const supabase = getSupabaseClient()

        supabase
          .from("users")
          .select("count")
          .limit(1)
          .then(({ error }) => {
            if (error) {
              console.warn("⚠️ Database connection issue:", error.message)
              console.log("📝 Using mock data for development")
            } else {
              console.log("✅ Database connection successful")
            }
          })
      } else {
        console.warn("⚠️ Supabase not configured - using mock data")
        console.log("📝 To use real database, add these environment variables:")
        console.log("   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url")
        console.log("   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key")
        console.log("   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key")
        console.log("   JWT_SECRET=your-jwt-secret")
      }
    }
  }, [])
}
