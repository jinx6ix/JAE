"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAuth } from "@/hooks/admin/use-auth"
import { canDirectlyAccessDepartment, canAccessDepartment, authenticateCrossDepartment } from "@/lib/admin/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Shield, Server, Lock, AlertCircle, CheckCircle } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface DepartmentAccessGuardProps {
  targetDepartment: string
  children: React.ReactNode
}

export function DepartmentAccessGuard({ targetDepartment, children }: DepartmentAccessGuardProps) {
  const { user } = useAuth()
  const [hasAccess, setHasAccess] = useState(false)
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const [authCredentials, setAuthCredentials] = useState({ password: "", accessCode: "" })
  const [authError, setAuthError] = useState("")
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  useEffect(() => {
    if (!user) {
      setHasAccess(false)
      return
    }

    // Check if user can directly access this department
    if (canDirectlyAccessDepartment(user, targetDepartment)) {
      setHasAccess(true)
      return
    }

    // Check if user has potential cross-department access
    if (canAccessDepartment(user, targetDepartment) && user.requiresSecondaryAuth) {
      setHasAccess(false)
      return
    }

    // No access at all
    setHasAccess(false)
  }, [user, targetDepartment])

  const handleCrossDepartmentAuth = async () => {
    if (!user) return

    setIsAuthenticating(true)
    setAuthError("")

    try {
      const success = await authenticateCrossDepartment(user, targetDepartment, authCredentials)

      if (success) {
        setHasAccess(true)
        setShowAuthDialog(false)
        setAuthCredentials({ password: "", accessCode: "" })
      } else {
        setAuthError("Invalid credentials. Please check your password or access code.")
      }
    } catch (error) {
      setAuthError("Authentication failed. Please try again.")
    } finally {
      setIsAuthenticating(false)
    }
  }

  const getDepartmentInfo = (dept: string) => {
    switch (dept) {
      case "webhosting":
        return {
          name: "Web Hosting Platform",
          icon: Server,
          description: "Manage hosting services, servers, and client accounts",
          color: "text-blue-600",
          bgColor: "bg-blue-50",
        }
      case "cybersecurity":
        return {
          name: "Cybersecurity Platform",
          icon: Shield,
          description: "Monitor threats, manage incidents, and security operations",
          color: "text-red-600",
          bgColor: "bg-red-50",
        }
      case "admin":
        return {
          name: "Admin Platform",
          icon: Lock,
          description: "System administration and cross-platform management",
          color: "text-purple-600",
          bgColor: "bg-purple-50",
        }
      default:
        return {
          name: "Platform",
          icon: Lock,
          description: "Access restricted platform",
          color: "text-gray-600",
          bgColor: "bg-gray-50",
        }
    }
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-96">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lock className="h-5 w-5 mr-2" />
              Access Denied
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Please log in to access this platform.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // User has direct access
  if (hasAccess) {
    return <>{children}</>
  }

  // User can potentially access with additional auth
  if (canAccessDepartment(user, targetDepartment) && user.requiresSecondaryAuth) {
    const deptInfo = getDepartmentInfo(targetDepartment)
    const DeptIcon = deptInfo.icon

    return (
      <>
        <div className="flex items-center justify-center min-h-screen p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className={`flex justify-center mb-4 p-3 rounded-full ${deptInfo.bgColor} w-fit mx-auto`}>
                <DeptIcon className={`h-8 w-8 ${deptInfo.color}`} />
              </div>
              <CardTitle>Cross-Department Access Required</CardTitle>
              <CardDescription>{deptInfo.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  You are trying to access the <strong>{deptInfo.name}</strong> from the{" "}
                  <Badge variant="outline">{user.department}</Badge> department. Additional authentication is required.
                </AlertDescription>
              </Alert>

              <div className="space-y-3">
                <div className="text-sm text-muted-foreground">
                  <p>Your current access:</p>
                  <div className="flex items-center mt-1">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span className="capitalize">{user.department} Department</span>
                  </div>
                </div>

                <Button onClick={() => setShowAuthDialog(true)} className="w-full" variant="outline">
                  <Lock className="h-4 w-4 mr-2" />
                  Request Access to {deptInfo.name}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <DeptIcon className={`h-5 w-5 mr-2 ${deptInfo.color}`} />
                Access {deptInfo.name}
              </DialogTitle>
              <DialogDescription>
                Enter your cross-department credentials to access the {deptInfo.name.toLowerCase()}.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {authError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{authError}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                <div>
                  <Label htmlFor="password">Department Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={authCredentials.password}
                    onChange={(e) => setAuthCredentials({ ...authCredentials, password: e.target.value })}
                    placeholder="Enter department password"
                    disabled={isAuthenticating}
                  />
                </div>

                <div className="text-center text-sm text-muted-foreground">or</div>

                <div>
                  <Label htmlFor="accessCode">Access Code</Label>
                  <Input
                    id="accessCode"
                    type="text"
                    value={authCredentials.accessCode}
                    onChange={(e) => setAuthCredentials({ ...authCredentials, accessCode: e.target.value })}
                    placeholder="Enter access code"
                    disabled={isAuthenticating}
                  />
                </div>
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setShowAuthDialog(false)}
                  className="flex-1"
                  disabled={isAuthenticating}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCrossDepartmentAuth}
                  className="flex-1"
                  disabled={isAuthenticating || (!authCredentials.password && !authCredentials.accessCode)}
                >
                  {isAuthenticating ? "Authenticating..." : "Access Platform"}
                </Button>
              </div>

              <div className="text-xs text-muted-foreground space-y-1">
                <p>
                  <strong>Demo Credentials:</strong>
                </p>
                <p>Web Hosting: password123 or WH2024</p>
                <p>Cybersecurity: security123 or CS2024</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </>
    )
  }

  // User has no access at all
  const deptInfo = getDepartmentInfo(targetDepartment)
  const DeptIcon = deptInfo.icon

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className={`flex justify-center mb-4 p-3 rounded-full ${deptInfo.bgColor} w-fit mx-auto`}>
            <DeptIcon className={`h-8 w-8 ${deptInfo.color}`} />
          </div>
          <CardTitle className="flex items-center justify-center">
            <Lock className="h-5 w-5 mr-2" />
            Access Denied
          </CardTitle>
          <CardDescription>Insufficient permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              You do not have permission to access the <strong>{deptInfo.name}</strong>. Your account is restricted to
              the <Badge variant="outline">{user.department}</Badge> department.
            </AlertDescription>
          </Alert>

          <div className="mt-4 text-sm text-muted-foreground">
            <p>Contact your system administrator if you need access to this platform.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
