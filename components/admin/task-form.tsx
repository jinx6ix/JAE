"use client"

import type React from "react"
import { useState, useEffect } from "react"
import type { Task } from "@/lib/admin/tasks"
import type { User } from "@/lib/admin/auth"
import { usersApi } from "@/lib/admin/users-api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2 } from "lucide-react"

interface TaskFormProps {
  task?: Task
  onSubmit: (data: Omit<Task, "id" | "createdAt" | "updatedAt" | "comments">) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
  currentUser: User
}

export function TaskForm({ task, onSubmit, onCancel, isLoading, currentUser }: TaskFormProps) {
  const [formData, setFormData] = useState({
    title: task?.title || "",
    description: task?.description || "",
    type: task?.type || (currentUser.department === "admin" ? "general" : currentUser.department),
    priority: task?.priority || "medium",
    status: task?.status || "pending",
    assignedTo: task?.assignedTo || "",
    assignedToName: task?.assignedToName || "",
    dueDate: task?.dueDate ? task.dueDate.split("T")[0] : "",
    tags: task?.tags?.join(", ") || "",
  })

  const [availableUsers, setAvailableUsers] = useState<User[]>([])
  const [loadingUsers, setLoadingUsers] = useState(false)

  useEffect(() => {
    loadUsers()
  }, [formData.type])

  const loadUsers = async () => {
    try {
      setLoadingUsers(true)
      // Admin can assign tasks to users from any department
      if (currentUser.role === "admin") {
        const users = await usersApi.getUsers() // Get all users
        setAvailableUsers(users)
      } else {
        const users = await usersApi.getUsersByDepartment(formData.type === "general" ? "admin" : formData.type)
        setAvailableUsers(users)
      }
    } catch (error) {
      console.error("Failed to load users:", error)
    } finally {
      setLoadingUsers(false)
    }
  }

  const handleUserSelect = (userId: string) => {
    const selectedUser = availableUsers.find((u) => u.id === userId)
    if (selectedUser) {
      setFormData({
        ...formData,
        assignedTo: userId,
        assignedToName: selectedUser.name,
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const taskData = {
      ...formData,
      assignedBy: currentUser.id,
      assignedByName: currentUser.name,
      dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : undefined,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    }

    await onSubmit(taskData)
  }

  const taskTypes = [
    {
      value: "webhosting",
      label: "Web Hosting",
      disabled: currentUser.department === "cybersecurity" && currentUser.role !== "admin",
    },
    {
      value: "cybersecurity",
      label: "Cybersecurity",
      disabled: currentUser.department === "webhosting" && currentUser.role !== "admin",
    },
    { value: "general", label: "General", disabled: currentUser.role !== "admin" },
  ]

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>{task ? "Edit Task" : "Create New Task"}</CardTitle>
        <CardDescription>{task ? "Update task information" : "Assign a new task to a team member"}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Task Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Task Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) =>
                  setFormData({ ...formData, type: value as any, assignedTo: "", assignedToName: "" })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {taskTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value} disabled={type.disabled}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => setFormData({ ...formData, priority: value as any })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="assignedTo">Assign To</Label>
              <Select value={formData.assignedTo} onValueChange={handleUserSelect} disabled={loadingUsers}>
                <SelectTrigger>
                  <SelectValue placeholder={loadingUsers ? "Loading users..." : "Select user"} />
                </SelectTrigger>
                <SelectContent>
                  {availableUsers.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      <div className="flex items-center space-x-2">
                        <span>{user.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {user.position}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              />
            </div>
          </div>

          {task && (
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
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="maintenance, urgent, client-facing"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || !formData.assignedTo}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {task ? "Update Task" : "Create Task"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
