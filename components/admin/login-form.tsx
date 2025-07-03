"use client"

import type React from "react"
import { useState } from "react"
import { useAuth } from "@/hooks/admin/use-auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, Server, Eye, Loader2, AlertCircle } from "lucide-react"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("admin")
  const { login, isLoading } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Please enter both email and password")
      return
    }

    try {
      console.log("Attempting login with:", email)
      await login(email, password)
      console.log("Login successful!")
      // Don't reload the page - let React handle the state change
    } catch (err: any) {
      console.error("Login error:", err)
      setError(err.message || "Login failed. Please try again.")
    }
  }

  const demoCredentials = {
    admin: [{ email: "admin@securehost.com", name: "John Admin", role: "System Administrator" }],
    webhosting: [
      { email: "sarah.wilson@securehost.com", name: "Sarah Wilson", role: "Web Hosting Manager" },
      { email: "mike.johnson@securehost.com", name: "Mike Johnson", role: "Server Technician" },
    ],
    cybersecurity: [
      { email: "alex.rodriguez@securehost.com", name: "Alex Rodriguez", role: "Cybersecurity Manager" },
      { email: "lisa.chen@securehost.com", name: "Lisa Chen", role: "Security Analyst" },
    ],
  }

  const fillDemoCredentials = (email: string) => {
    setEmail(email)
    setPassword("password123")
    setError("")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Shield className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl">SecureHost Login</CardTitle>
          <CardDescription>Sign in to your dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="admin" className="text-xs">
                <Shield className="h-3 w-3 mr-1" />
                Admin
              </TabsTrigger>
              <TabsTrigger value="webhosting" className="text-xs">
                <Server className="h-3 w-3 mr-1" />
                Hosting
              </TabsTrigger>
              <TabsTrigger value="cybersecurity" className="text-xs">
                <Eye className="h-3 w-3 mr-1" />
                Security
              </TabsTrigger>
            </TabsList>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  disabled={isLoading}
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            <TabsContent value={activeTab} className="mt-4">
              <div className="text-center text-sm text-muted-foreground">
                <p className="font-medium mb-2">Demo Accounts:</p>
                <div className="space-y-2">
                  {demoCredentials[activeTab as keyof typeof demoCredentials].map((cred, index) => (
                    <div key={index} className="p-2 bg-muted rounded text-left">
                      <button
                        type="button"
                        onClick={() => fillDemoCredentials(cred.email)}
                        className="w-full text-left hover:bg-muted-foreground/10 p-1 rounded transition-colors"
                        disabled={isLoading}
                      >
                        <p className="font-medium text-xs">{cred.name}</p>
                        <p className="text-xs text-muted-foreground">{cred.email}</p>
                        <p className="text-xs text-muted-foreground">{cred.role}</p>
                      </button>
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-xs font-medium">Password: password123</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Click any demo account above to auto-fill credentials
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
