import { createClient } from "@supabase/supabase-js"
import { clientEnv, serverEnv, isSupabaseConfigured, isServerConfigured } from "./env"

// Default/fallback values for development
const DEFAULT_SUPABASE_URL = "https://your-project.supabase.co"
const DEFAULT_SUPABASE_ANON_KEY = "your-anon-key"
const DEFAULT_SERVICE_ROLE_KEY = "your-service-role-key"

// Get environment variables with fallbacks
const supabaseUrl = clientEnv.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL
const supabaseAnonKey = clientEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY
const supabaseServiceKey = serverEnv.SUPABASE_SERVICE_ROLE_KEY || DEFAULT_SERVICE_ROLE_KEY

// Singleton pattern for client-side Supabase client
let supabaseInstance: ReturnType<typeof createClient> | null = null

export const getSupabaseClient = () => {
  if (!supabaseInstance) {
    if (!isSupabaseConfigured()) {
      console.warn("⚠️ Supabase not configured. Using mock client.")
      // Return a mock client for development
      return createMockSupabaseClient()
    }

    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false,
      },
    })
  }
  return supabaseInstance
}

// Client for client-side operations (singleton)
export const supabase = getSupabaseClient()

// Server-side client with service role key (only for API routes)
export const supabaseAdmin = (() => {
  if (typeof window !== "undefined") {
    // Don't create admin client on client-side
    return null
  }

  if (!isServerConfigured()) {
    console.warn("⚠️ Server environment not configured. Using mock admin client.")
    return createMockSupabaseClient()
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
})()

// Mock Supabase client for development when environment variables are missing
function createMockSupabaseClient() {
  const mockResponse = {
    data: [],
    error: null,
    count: 0,
    status: 200,
    statusText: "OK",
  }

  const mockQuery = {
    select: () => mockQuery,
    insert: () => mockQuery,
    update: () => mockQuery,
    delete: () => mockQuery,
    eq: () => mockQuery,
    neq: () => mockQuery,
    gt: () => mockQuery,
    gte: () => mockQuery,
    lt: () => mockQuery,
    lte: () => mockQuery,
    like: () => mockQuery,
    ilike: () => mockQuery,
    is: () => mockQuery,
    in: () => mockQuery,
    contains: () => mockQuery,
    containedBy: () => mockQuery,
    rangeGt: () => mockQuery,
    rangeGte: () => mockQuery,
    rangeLt: () => mockQuery,
    rangeLte: () => mockQuery,
    rangeAdjacent: () => mockQuery,
    overlaps: () => mockQuery,
    textSearch: () => mockQuery,
    match: () => mockQuery,
    not: () => mockQuery,
    or: () => mockQuery,
    filter: () => mockQuery,
    order: () => mockQuery,
    limit: () => mockQuery,
    range: () => mockQuery,
    single: () => Promise.resolve(mockResponse),
    maybeSingle: () => Promise.resolve(mockResponse),
    then: (callback: any) => Promise.resolve(mockResponse).then(callback),
    catch: (callback: any) => Promise.resolve(mockResponse).catch(callback),
  }

  return {
    from: () => mockQuery,
    auth: {
      signUp: () => Promise.resolve({ data: null, error: null }),
      signInWithPassword: () => Promise.resolve({ data: null, error: null }),
      signOut: () => Promise.resolve({ error: null }),
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      getUser: () => Promise.resolve({ data: { user: null }, error: null }),
      onAuthStateChange: () => ({
        data: { subscription: { unsubscribe: () => {} } },
      }),
    },
    channel: (name: string) => ({
      on: () => ({
        on: () => ({
          subscribe: () => {},
        }),
      }),
      subscribe: () => {},
      unsubscribe: () => {},
    }),
  }
}

// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          name: string
          email: string
          role: "admin" | "webhosting_manager" | "cybersecurity_manager" | "webhosting_user" | "cybersecurity_user"
          department: "admin" | "webhosting" | "cybersecurity"
          status: "active" | "inactive" | "suspended"
          phone: string | null
          position: string | null
          supervisor_id: string | null
          avatar_url: string | null
          last_login: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          role: "admin" | "webhosting_manager" | "cybersecurity_manager" | "webhosting_user" | "cybersecurity_user"
          department: "admin" | "webhosting" | "cybersecurity"
          status?: "active" | "inactive" | "suspended"
          phone?: string | null
          position?: string | null
          supervisor_id?: string | null
          avatar_url?: string | null
          last_login?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          role?: "admin" | "webhosting_manager" | "cybersecurity_manager" | "webhosting_user" | "cybersecurity_user"
          department?: "admin" | "webhosting" | "cybersecurity"
          status?: "active" | "inactive" | "suspended"
          phone?: string | null
          position?: string | null
          supervisor_id?: string | null
          avatar_url?: string | null
          last_login?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      clients: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          company: string | null
          plan: "Basic" | "Professional" | "Business" | "Enterprise"
          status: "Active" | "Suspended" | "Pending" | "Cancelled"
          monthly_spend: number
          joined_date: string
          last_login: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          company?: string | null
          plan: "Basic" | "Professional" | "Business" | "Enterprise"
          status?: "Active" | "Suspended" | "Pending" | "Cancelled"
          monthly_spend?: number
          joined_date?: string
          last_login?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          company?: string | null
          plan?: "Basic" | "Professional" | "Business" | "Enterprise"
          status?: "Active" | "Suspended" | "Pending" | "Cancelled"
          monthly_spend?: number
          joined_date?: string
          last_login?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
