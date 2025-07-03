// Environment variables validation and configuration
function getEnvVar(name: string, required = true): string | undefined {
  const value = process.env[name]

  if (required && !value) {
    console.error(`Missing required environment variable: ${name}`)
    if (typeof window === "undefined") {
      // Only throw on server-side to prevent client-side crashes
      throw new Error(`Missing required environment variable: ${name}`)
    }
  }

  return value
}

// Client-side environment variables (must be prefixed with NEXT_PUBLIC_)
export const clientEnv = {
  NEXT_PUBLIC_SUPABASE_URL: getEnvVar("NEXT_PUBLIC_SUPABASE_URL", false),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: getEnvVar("NEXT_PUBLIC_SUPABASE_ANON_KEY", false),
} as const

// Server-side only environment variables
export const serverEnv = {
  SUPABASE_SERVICE_ROLE_KEY: typeof window === "undefined" ? getEnvVar("SUPABASE_SERVICE_ROLE_KEY", false) : undefined,
  JWT_SECRET: typeof window === "undefined" ? getEnvVar("JWT_SECRET", false) : undefined,
} as const

// Check if Supabase is configured
export const isSupabaseConfigured = () => {
  return !!(clientEnv.NEXT_PUBLIC_SUPABASE_URL && clientEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY)
}

// Check if server environment is configured
export const isServerConfigured = () => {
  return !!(serverEnv.SUPABASE_SERVICE_ROLE_KEY && serverEnv.JWT_SECRET)
}
