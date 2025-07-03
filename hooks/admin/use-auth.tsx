"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "webhosting_manager" | "cybersecurity_manager" | "webhosting_user" | "cybersecurity_user"
  avatar?: string
  lastLogin?: string
  status: "active" | "inactive" | "suspended"
  permissions: string[]
  department: "admin" | "webhosting" | "cybersecurity"
  createdAt: string
  phone?: string
  position?: string
  requiresSecondaryAuth: boolean
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  })

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true }))

      const response = await fetch("/api/auth/me", {
        credentials: "include",
      })

      if (response.ok) {
        const contentType = response.headers.get("content-type")
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json()
          setState({
            user: data.user,
            isAuthenticated: true,
            isLoading: false,
          })
        } else {
          throw new Error("Invalid response format")
        }
      } else {
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        })
      }
    } catch (error) {
      console.error("Auth check failed:", error)
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      })
    }
  }

  const login = async (email: string, password: string) => {
    setState((prev) => ({ ...prev, isLoading: true }))

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      })

      // Check if response is JSON
      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server error - please try again later")
      }

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Login failed")
      }

      if (!data.success || !data.user) {
        throw new Error("Invalid response from server")
      }

      setState({
        user: data.user,
        isAuthenticated: true,
        isLoading: false,
      })
    } catch (error: any) {
      setState((prev) => ({ ...prev, isLoading: false }))
      console.error("Login error:", error)
      throw new Error(error.message || "Login failed - please try again")
    }
  }

  const logout = async () => {
    setState((prev) => ({ ...prev, isLoading: true }))
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      })

      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      })
    } catch (error) {
      console.error("Logout failed:", error)
      setState((prev) => ({ ...prev, isLoading: false }))
    }
  }

  return <AuthContext.Provider value={{ ...state, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const hasPermission = (user: User | null, permission: string): boolean => {
  if (!user) return false
  if (user.permissions.includes("all")) return true
  return user.permissions.includes(permission)
}

export const canAccessDepartment = (user: User | null, department: string): boolean => {
  if (!user) return false
  if (user.role === "admin") return true
  return user.department === department
}
