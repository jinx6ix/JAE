"use client"

import type React from "react"
import { useState } from "react"
import type { User } from "@/lib/admin/auth"
import { PERMISSIONS } from "@/lib/admin/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2 } from "lucide-react"

interface UserFormProps {
  user?: User
  onSubmit: (data: Omit<User, "id" | "createdAt" | "lastLogin">) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
  currentUser: User
}

export function UserForm({ user, onSubmit, onCancel, isLoading, currentUser }: UserFormProps) {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    position: user?.position || "",
    role: user?.role || "webhosting_user",
    department: user?.department || "webhosting",
    status: user?.status || "active",
    supervisor: user?.supervisor || "",
    permissions: user?.permissions || [],
  })

  const roleOptions = [
    { value: "admin", label: "Administrator", department: "admin", disabled: currentUser.role !== "admin" },
    { value: "webhosting_manager", label: "Web Hosting Manager", department: "webhosting" },
    { value: "webhosting_user", label: "Web Hosting User", department: "webhosting" },
    { value: "cybersecurity_manager", label: "Cybersecurity Manager", department: "cybersecurity" },
    { value: "cybersecurity_user", label: "Cybersecurity User", department: "cybersecurity" },
  ].filter((role) => {
    // Admin can create any role, others can only create roles in their department
    if (currentUser.role === "admin") return true
    return role.department === currentUser.department
  })

  const getPermissionsForRole = (role: string): string[] => {
    switch (role) {
      case "admin":
        return ["all"]
      case "webhosting_manager":
        return ["hosting_manage", "hosting_view", "clients_manage", "billing_view", "users_view", "tasks_assign"]
      case "webhosting_user":
        return ["hosting_view", "clients_view", "tasks_manage"]
      case "cybersecurity_manager":
        return ["security_manage", "security_view", "alerts_manage", "users_view", "reports_generate", "tasks_assign"]
      case "cybersecurity_user":
        return ["security_view", "alerts_view", "tasks_manage", "incidents_respond"]
      default:
        return []
    }
  }

  const handleRoleChange = (role: string) => {
    const selectedRole = roleOptions.find((r) => r.value === role)
    if (selectedRole) {
      setFormData({
        ...formData,
        role: role as any,
        department: selectedRole.department as any,
        permissions: getPermissionsForRole(role),
        supervisor: selectedRole.department !== "admin" ? formData.supervisor : "",
      })
    }
  }

  const handlePermissionChange = (permission: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        permissions: [...formData.permissions, permission],
      })
    } else {
      setFormData({
        ...formData,
        permissions: formData.permissions.filter((p) => p !== permission),
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(formData)
  }

  const availablePermissions = Object.entries(PERMISSIONS).filter(([key]) => {
    if (formData.role === "admin") return key === "all"
    if (formData.department === "webhosting") {
      return (
        key.includes("hosting") ||
        key.includes("clients") ||
        key.includes("billing") ||
        key.includes("tasks") ||
        key.includes("users")
      )
    }
    if (formData.department === "cybersecurity") {
      return (
        key.includes("security") ||
        key.includes("alerts") ||
        key.includes("incidents") ||
        key.includes("reports") ||
        key.includes("tasks") ||
        key.includes("users")
      )
    }
    return false
  })

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>{user ? "Edit User" : "Add New User"}</CardTitle>
        <CardDescription>
          {user ? "Update user information and permissions" : "Create a new user account"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Input
                id="position"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={formData.role} onValueChange={handleRoleChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {roleOptions.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value as any })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {formData.department !== "admin" && (
            <div className="space-y-2">
              <Label htmlFor="supervisor">Supervisor ID (Optional)</Label>
              <Input
                id="supervisor"
                value={formData.supervisor}
                onChange={(e) => setFormData({ ...formData, supervisor: e.target.value })}
                placeholder="Enter supervisor's user ID"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label>Permissions</Label>
            <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border rounded p-3">
              {availablePermissions.map(([key, description]) => (
                <div key={key} className="flex items-center space-x-2">
                  <Checkbox
                    id={key}
                    checked={formData.permissions.includes(key)}
                    onCheckedChange={(checked) => handlePermissionChange(key, checked as boolean)}
                    disabled={key === "all" && formData.role !== "admin"}
                  />
                  <Label htmlFor={key} className="text-xs">
                    {key}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {user ? "Update User" : "Create User"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
