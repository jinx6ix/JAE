"use client"

import { useState, useEffect, useCallback } from "react"
import { api, type Client, type Server, type SecurityAlert, type Invoice } from "@/lib/admin/api"
import type { Task, User } from "@/lib/admin/users-api"

export function useApi() {
  const [clients, setClients] = useState<Client[]>([])
  const [servers, setServers] = useState<Server[]>([])
  const [securityAlerts, setSecurityAlerts] = useState<SecurityAlert[]>([])
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      const [clientsData, serversData, alertsData, invoicesData, tasksData, usersData] = await Promise.all([
        api.getClients().catch(() => []),
        api.getServers().catch(() => []),
        api.getSecurityAlerts().catch(() => []),
        api.getInvoices().catch(() => []),
        fetch("/api/tasks")
          .then((res) => (res.ok ? res.json() : []))
          .catch(() => []),
        fetch("/api/users")
          .then((res) => (res.ok ? res.json() : []))
          .catch(() => []),
      ])

      setClients(clientsData)
      setServers(serversData)
      setSecurityAlerts(alertsData)
      setInvoices(invoicesData)
      setTasks(tasksData)
      setUsers(usersData)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  const refreshAll = useCallback(() => {
    loadData()
  }, [loadData])

  // Client operations
  const createClient = useCallback(async (clientData: Omit<Client, "id">) => {
    try {
      const newClient = await api.createClient(clientData)
      setClients((prev) => [...prev, newClient])
      return newClient
    } catch (error) {
      throw error
    }
  }, [])

  const updateClient = useCallback(async (id: string, updates: Partial<Client>) => {
    try {
      const updatedClient = await api.updateClient(id, updates)
      setClients((prev) => prev.map((client) => (client.id === id ? updatedClient : client)))
      return updatedClient
    } catch (error) {
      throw error
    }
  }, [])

  const deleteClient = useCallback(async (id: string) => {
    try {
      await api.deleteClient(id)
      setClients((prev) => prev.filter((client) => client.id !== id))
    } catch (error) {
      throw error
    }
  }, [])

  // Server operations
  const createServer = useCallback(async (serverData: Omit<Server, "id">) => {
    try {
      const newServer = await api.createServer(serverData)
      setServers((prev) => [...prev, newServer])
      return newServer
    } catch (error) {
      throw error
    }
  }, [])

  const updateServer = useCallback(async (id: string, updates: Partial<Server>) => {
    try {
      const updatedServer = await api.updateServer(id, updates)
      setServers((prev) => prev.map((server) => (server.id === id ? updatedServer : server)))
      return updatedServer
    } catch (error) {
      throw error
    }
  }, [])

  // Security alert operations
  const updateSecurityAlert = useCallback(async (id: string, updates: Partial<SecurityAlert>) => {
    try {
      const updatedAlert = await api.updateSecurityAlert(id, updates)
      setSecurityAlerts((prev) => prev.map((alert) => (alert.id === id ? updatedAlert : alert)))
      return updatedAlert
    } catch (error) {
      throw error
    }
  }, [])

  // User operations
  const createUser = useCallback(async (userData: Omit<User, "id">) => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      })
      if (!response.ok) throw new Error("Failed to create user")
      const newUser = await response.json()
      setUsers((prev) => [...prev, newUser])
      return newUser
    } catch (error) {
      throw error
    }
  }, [])

  const updateUser = useCallback(async (id: string, updates: Partial<User>) => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      })
      if (!response.ok) throw new Error("Failed to update user")
      const updatedUser = await response.json()
      setUsers((prev) => prev.map((user) => (user.id === id ? updatedUser : user)))
      return updatedUser
    } catch (error) {
      throw error
    }
  }, [])

  const deleteUser = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("Failed to delete user")
      setUsers((prev) => prev.filter((user) => user.id !== id))
    } catch (error) {
      throw error
    }
  }, [])

  // Task operations
  const createTask = useCallback(async (taskData: Omit<Task, "id">) => {
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      })
      if (!response.ok) throw new Error("Failed to create task")
      const newTask = await response.json()
      setTasks((prev) => [...prev, newTask])
      return newTask
    } catch (error) {
      throw error
    }
  }, [])

  const updateTask = useCallback(async (id: string, updates: Partial<Task>) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      })
      if (!response.ok) throw new Error("Failed to update task")
      const updatedTask = await response.json()
      setTasks((prev) => prev.map((task) => (task.id === id ? updatedTask : task)))
      return updatedTask
    } catch (error) {
      throw error
    }
  }, [])

  const deleteTask = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("Failed to delete task")
      setTasks((prev) => prev.filter((task) => task.id !== id))
    } catch (error) {
      throw error
    }
  }, [])

  return {
    // Data
    clients,
    servers,
    securityAlerts,
    invoices,
    tasks,
    users,
    isLoading,
    error,

    // Actions
    refreshAll,

    // Client actions
    createClient,
    updateClient,
    deleteClient,

    // Server actions
    createServer,
    updateServer,

    // Security actions
    updateSecurityAlert,

    // User actions
    createUser,
    updateUser,
    deleteUser,

    // Task actions
    createTask,
    updateTask,
    deleteTask,
  }
}
