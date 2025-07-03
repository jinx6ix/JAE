"use client"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { WebHostingPlatform } from "@/components/admin/webhosting-platform"
import { CybersecurityPlatform } from "@/components/admin/cybersecurity-platform"
import { LoginForm } from "@/components/admin/login-form"
import { AuthProvider, useAuth } from "@/hooks/admin/use-auth"

function PlatformRouter() {
  const { user, isAuthenticated, isLoading } = useAuth()

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  // Show login form if not authenticated
  if (!isAuthenticated || !user) {
    return <LoginForm />
  }

  // Route to appropriate platform based on user's department
  switch (user.department) {
    case "webhosting":
      return <WebHostingPlatform />
    case "cybersecurity":
      return <CybersecurityPlatform />
    case "admin":
    default:
      return <AdminDashboard />
  }
}

export default function Page() {
  return (
    <AuthProvider>
      <PlatformRouter />
    </AuthProvider>
  )
}
