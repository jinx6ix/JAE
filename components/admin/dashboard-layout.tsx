"use client"

import { useState, useEffect } from "react"
import {
  BarChart3,
  Shield,
  Server,
  Users,
  DollarSign,
  AlertTriangle,
  Activity,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Settings,
  Bell,
  Search,
  Download,
  RefreshCw,
  Edit,
  Trash2,
  MoreHorizontal,
  Plus,
} from "lucide-react"

import { useAuth } from "@/hooks/admin/use-auth"
import { api, type Client, type Server as ServerType, type SecurityAlert, type Invoice } from "@/lib/admin/api"
import { hasPermission } from "@/lib/admin/auth"
import { tasksApi, type Task } from "@/lib/admin/tasks"
import { usersApi } from "@/lib/admin/users-api"
import type { User } from "@/lib/admin/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ClientForm } from "./client-form"
import { ServerForm } from "./server-form"
import { ClientDetail } from "./client-detail"
import { UserForm } from "./user-form"
import { TaskForm } from "./task-form"
import { Loader2 } from "lucide-react"

export function DashboardLayout() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")
  const [clients, setClients] = useState<Client[]>([])
  const [servers, setServers] = useState<ServerType[]>([])
  const [securityAlerts, setSecurityAlerts] = useState<SecurityAlert[]>([])
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showClientForm, setShowClientForm] = useState(false)
  const [showServerForm, setShowServerForm] = useState(false)
  const [editingClient, setEditingClient] = useState<Client | null>(null)
  const [editingServer, setEditingServer] = useState<ServerType | null>(null)
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [tasks, setTasks] = useState<Task[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [showUserForm, setShowUserForm] = useState(false)
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  // Define menu items based on user permissions
  const getMenuItems = (currentUser: User | null) => {
    const allMenuItems = [
      { title: "Overview", icon: BarChart3, id: "overview" },
      { title: "Web Hosting", icon: Server, id: "hosting", permission: "hosting_view" },
      { title: "Cybersecurity", icon: Shield, id: "security", permission: "security_view" },
      { title: "Clients", icon: Users, id: "clients", permission: "clients_view" },
      { title: "Tasks", icon: CheckCircle, id: "tasks", permission: "tasks_manage" },
      { title: "Team", icon: Users, id: "users", permission: "users_view" },
      { title: "Billing", icon: DollarSign, id: "billing", permission: "billing_view" },
      { title: "Settings", icon: Settings, id: "settings" },
    ]

    return allMenuItems.filter((item) => !item.permission || hasPermission(currentUser, item.permission))
  }

  const menuItems = getMenuItems(user)

  useEffect(() => {
    loadData()
  }, [user])

  const loadData = async () => {
    if (!user) return

    try {
      setIsLoading(true)

      // Try to fetch from API, but fall back to mock data if it fails
      const fetchWithFallback = async (url: string, fallbackData: any[]) => {
        try {
          const response = await fetch(url)
          if (!response.ok) {
            console.warn(`API ${url} failed, using mock data`)
            return fallbackData
          }
          return await response.json()
        } catch (error) {
          console.warn(`API ${url} error:`, error, "using mock data")
          return fallbackData
        }
      }

      // Mock data fallbacks
      const mockClients = [
        {
          id: "1",
          name: "Acme Corporation",
          email: "contact@acme.com",
          company: "Acme Corp",
          plan: "Enterprise",
          status: "Active",
          joined: "2024-01-15",
          monthlySpend: 2500,
          domains: ["acme.com", "www.acme.com"],
          services: ["Web Hosting", "SSL Certificate"],
        },
        {
          id: "2",
          name: "TechStart Inc",
          email: "hello@techstart.io",
          company: "TechStart",
          plan: "Business",
          status: "Active",
          joined: "2024-02-20",
          monthlySpend: 1200,
          domains: ["techstart.io"],
          services: ["Web Hosting", "CDN"],
        },
      ]

      const mockServers = [
        {
          id: "1",
          name: "Web-01",
          type: "Web Server",
          location: "US-East",
          ip: "192.168.1.10",
          cpu: 45,
          memory: 62,
          disk: 78,
          bandwidth: 85,
          status: "Healthy",
          uptime: 99.9,
          clients: ["1", "2"],
        },
        {
          id: "2",
          name: "DB-01",
          type: "Database Server",
          location: "US-West",
          ip: "192.168.1.20",
          cpu: 32,
          memory: 58,
          disk: 45,
          bandwidth: 67,
          status: "Healthy",
          uptime: 99.8,
          clients: ["1"],
        },
      ]

      const mockAlerts = [
        {
          id: "1",
          type: "DDoS Attack",
          severity: "High",
          target: "web-01.securehost.com",
          timestamp: new Date().toISOString(),
          status: "Active",
          description: "Unusual traffic detected",
          affectedClients: ["1"],
        },
      ]

      const mockInvoices = [
        {
          id: "INV-001",
          clientId: "1",
          clientName: "Acme Corporation",
          amount: 2500,
          status: "Paid",
          dueDate: "2024-01-31",
          services: ["Web Hosting", "SSL"],
          createdAt: "2024-01-01",
        },
      ]

      const mockTasks = [
        {
          id: "1",
          title: "Server Maintenance",
          description: "Perform routine maintenance on Web-01 server to ensure optimal performance",
          type: "maintenance",
          priority: "medium",
          status: "pending",
          assignedTo: user.id,
          assignedBy: "admin",
          assignedToName: user.name,
          assignedByName: "Admin",
          dueDate: "2024-12-31",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          comments: [],
        },
        {
          id: "2",
          title: "Security Audit",
          description: "Conduct comprehensive security audit of client systems",
          type: "security",
          priority: "high",
          status: "in_progress",
          assignedTo: user.id,
          assignedBy: "admin",
          assignedToName: user.name,
          assignedByName: "Admin",
          dueDate: "2024-12-25",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          comments: [],
        },
      ]

      const mockUsers = [
        {
          id: "1",
          name: "John Admin",
          email: "admin@securehost.com",
          role: "admin",
          department: "admin",
          status: "active",
          position: "System Administrator",
          createdAt: "2024-01-01",
          lastLogin: new Date().toISOString(),
          permissions: ["all"],
        },
        {
          id: "2",
          name: "Sarah Wilson",
          email: "sarah.wilson@securehost.com",
          role: "webhosting_manager",
          department: "webhosting",
          status: "active",
          position: "Web Hosting Manager",
          createdAt: "2024-01-01",
          lastLogin: new Date().toISOString(),
          permissions: ["hosting_manage", "hosting_view"],
        },
      ]

      // Fetch data with fallbacks
      const [clientsData, serversData, alertsData, invoicesData, tasksData, usersData] = await Promise.all([
        fetchWithFallback("/api/clients", mockClients),
        fetchWithFallback("/api/servers", mockServers),
        fetchWithFallback("/api/security/alerts", mockAlerts),
        fetchWithFallback("/api/billing/invoices", mockInvoices),
        fetchWithFallback("/api/tasks", mockTasks),
        fetchWithFallback("/api/users", mockUsers),
      ])

      setClients(clientsData)
      setServers(serversData)
      setSecurityAlerts(alertsData)
      setInvoices(invoicesData)
      setTasks(tasksData)
      setUsers(usersData)
    } catch (error) {
      console.error("Failed to load data:", error)
      // Set empty arrays as final fallback
      setClients([])
      setServers([])
      setSecurityAlerts([])
      setInvoices([])
      setTasks([])
      setUsers([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateClient = async (data: Omit<Client, "id">) => {
    try {
      setIsSubmitting(true)
      const newClient = await api.createClient(data)
      setClients([...clients, newClient])
      setShowClientForm(false)
    } catch (error) {
      console.error("Failed to create client:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUpdateClient = async (data: Omit<Client, "id">) => {
    if (!editingClient) return

    try {
      setIsSubmitting(true)
      const updatedClient = await api.updateClient(editingClient.id, data)
      setClients(clients.map((c) => (c.id === editingClient.id ? updatedClient : c)))
      setEditingClient(null)
    } catch (error) {
      console.error("Failed to update client:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteClient = async (clientId: string) => {
    try {
      await api.deleteClient(clientId)
      setClients(clients.filter((c) => c.id !== clientId))
      setSelectedClientId(null)
    } catch (error) {
      console.error("Failed to delete client:", error)
    }
  }

  const handleCreateServer = async (data: Omit<ServerType, "id">) => {
    try {
      setIsSubmitting(true)
      const newServer = await api.createServer(data)
      setServers([...servers, newServer])
      setShowServerForm(false)
    } catch (error) {
      console.error("Failed to create server:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUpdateServer = async (data: Omit<ServerType, "id">) => {
    if (!editingServer) return

    try {
      setIsSubmitting(true)
      const updatedServer = await api.updateServer(editingServer.id, data)
      setServers(servers.map((s) => (s.id === editingServer.id ? updatedServer : s)))
      setEditingServer(null)
    } catch (error) {
      console.error("Failed to update server:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUpdateSecurityAlert = async (alertId: string, updates: Partial<SecurityAlert>) => {
    try {
      const updatedAlert = await api.updateSecurityAlert(alertId, updates)
      setSecurityAlerts(securityAlerts.map((a) => (a.id === alertId ? updatedAlert : a)))
    } catch (error) {
      console.error("Failed to update security alert:", error)
    }
  }

  const handleCreateUser = async (data: Omit<User, "id" | "createdAt" | "lastLogin">) => {
    try {
      setIsSubmitting(true)
      const newUser = await usersApi.createUser(data)
      setUsers([...users, newUser])
      setShowUserForm(false)
    } catch (error) {
      console.error("Failed to create user:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUpdateUser = async (data: Omit<User, "id" | "createdAt" | "lastLogin">) => {
    if (!editingUser) return

    try {
      setIsSubmitting(true)
      const updatedUser = await usersApi.updateUser(editingUser.id, data)
      setUsers(users.map((u) => (u.id === editingUser.id ? updatedUser : u)))
      setEditingUser(null)
    } catch (error) {
      console.error("Failed to update user:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteUser = async (userId: string) => {
    try {
      await usersApi.deleteUser(userId)
      setUsers(users.filter((u) => u.id !== userId))
    } catch (error) {
      console.error("Failed to delete user:", error)
    }
  }

  const handleCreateTask = async (data: Omit<Task, "id" | "createdAt" | "updatedAt" | "comments">) => {
    try {
      setIsSubmitting(true)
      const newTask = await tasksApi.createTask(data)
      setTasks([...tasks, newTask])
      setShowTaskForm(false)
    } catch (error) {
      console.error("Failed to create task:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUpdateTask = async (data: Omit<Task, "id" | "createdAt" | "updatedAt" | "comments">) => {
    if (!editingTask) return

    try {
      setIsSubmitting(true)
      const updatedTask = await tasksApi.updateTask(editingTask.id, data)
      setTasks(tasks.map((t) => (t.id === editingTask.id ? updatedTask : t)))
      setEditingTask(null)
    } catch (error) {
      console.error("Failed to update task:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteTask = async (taskId: string) => {
    try {
      await tasksApi.deleteTask(taskId)
      setTasks(tasks.filter((t) => t.id !== taskId))
    } catch (error) {
      console.error("Failed to delete task:", error)
    }
  }

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.company?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const StatCard = ({ title, value, icon: Icon, trend, trendValue }: any) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <p className="text-xs text-muted-foreground">
            <span className={trend === "up" ? "text-green-600" : "text-red-600"}>
              {trend === "up" ? "+" : "-"}
              {trendValue}%
            </span>{" "}
            from last month
          </p>
        )}
      </CardContent>
    </Card>
  )

  const OverviewContent = () => (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Clients"
          value={clients.length.toLocaleString()}
          icon={Users}
          trend="up"
          trendValue="12"
        />
        <StatCard
          title="Active Servers"
          value={servers.filter((s) => s.status === "Healthy").length}
          icon={Server}
          trend="up"
          trendValue="3"
        />
        <StatCard
          title="Security Alerts"
          value={securityAlerts.filter((a) => a.status === "Active").length}
          icon={AlertTriangle}
          trend="down"
          trendValue="8"
        />
        <StatCard
          title="My Tasks"
          value={tasks.filter((t) => t.assignedTo === user?.id && t.status !== "completed").length}
          icon={CheckCircle}
          trend="up"
          trendValue="5"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>My Recent Tasks</CardTitle>
            <CardDescription>Tasks assigned to you</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tasks
                .filter((task) => task.assignedTo === user?.id)
                .slice(0, 4)
                .map((task) => (
                  <div key={task.id} className="flex items-center space-x-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{task.title}</p>
                        <Badge
                          variant={
                            task.priority === "critical" || task.priority === "high"
                              ? "destructive"
                              : task.priority === "medium"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {task.priority}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{task.description.slice(0, 100)}...</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {task.status}
                        </Badge>
                        {task.dueDate && (
                          <span className="text-xs text-muted-foreground">
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Security Alerts</CardTitle>
            <CardDescription>Latest security incidents and responses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {securityAlerts.slice(0, 4).map((alert) => (
                <div key={alert.id} className="flex items-center space-x-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{alert.type}</p>
                      <Badge
                        variant={
                          alert.severity === "High" || alert.severity === "Critical"
                            ? "destructive"
                            : alert.severity === "Medium"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {alert.severity}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{alert.target}</p>
                    <p className="text-xs text-muted-foreground">{new Date(alert.timestamp).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const HostingContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Web Hosting Management</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={loadData}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          {hasPermission(user, "hosting_manage") && (
            <Button size="sm" onClick={() => setShowServerForm(true)}>
              <Server className="h-4 w-4 mr-2" />
              Add Server
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="Total Servers" value={servers.length} icon={Server} />
        <StatCard
          title="Average Uptime"
          value={`${(servers.reduce((sum, s) => sum + s.uptime, 0) / servers.length || 0).toFixed(1)}%`}
          icon={Activity}
        />
        <StatCard
          title="Healthy Servers"
          value={servers.filter((s) => s.status === "Healthy").length}
          icon={CheckCircle}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Server Status</CardTitle>
          <CardDescription>Monitor all hosting servers and their performance</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Server</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>CPU</TableHead>
                <TableHead>Memory</TableHead>
                <TableHead>Status</TableHead>
                {hasPermission(user, "hosting_manage") && <TableHead>Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {servers.map((server) => (
                <TableRow key={server.id}>
                  <TableCell className="font-medium">{server.name}</TableCell>
                  <TableCell>{server.type}</TableCell>
                  <TableCell>{server.location}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Progress value={server.cpu} className="w-16 h-2" />
                      <span className="text-sm">{server.cpu}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Progress value={server.memory} className="w-16 h-2" />
                      <span className="text-sm">{server.memory}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={server.status === "Healthy" ? "default" : "destructive"}>{server.status}</Badge>
                  </TableCell>
                  {hasPermission(user, "hosting_manage") && (
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => setEditingServer(server)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Server
                          </DropdownMenuItem>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Server
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )

  const SecurityContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Cybersecurity Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          {hasPermission(user, "security_manage") && (
            <Button size="sm">
              <Shield className="h-4 w-4 mr-2" />
              Run Scan
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard title="Total Alerts" value={securityAlerts.length} icon={Shield} />
        <StatCard
          title="Active Alerts"
          value={securityAlerts.filter((a) => a.status === "Active").length}
          icon={AlertTriangle}
        />
        <StatCard
          title="Resolved Today"
          value={securityAlerts.filter((a) => a.status === "Resolved").length}
          icon={CheckCircle}
        />
        <StatCard
          title="High Priority"
          value={securityAlerts.filter((a) => a.severity === "High" || a.severity === "Critical").length}
          icon={XCircle}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Security Alerts</CardTitle>
          <CardDescription>Real-time security incidents and threat responses</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Alert Type</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
                {hasPermission(user, "alerts_manage") && <TableHead>Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {securityAlerts.map((alert) => (
                <TableRow key={alert.id}>
                  <TableCell className="font-medium">{alert.type}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        alert.severity === "High" || alert.severity === "Critical"
                          ? "destructive"
                          : alert.severity === "Medium"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {alert.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>{alert.target}</TableCell>
                  <TableCell>{new Date(alert.timestamp).toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        alert.status === "Resolved"
                          ? "default"
                          : alert.status === "Active"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {alert.status}
                    </Badge>
                  </TableCell>
                  {hasPermission(user, "alerts_manage") && (
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Investigate</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleUpdateSecurityAlert(alert.id, { status: "Resolved" })}>
                            Mark as Resolved
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )

  const ClientsContent = () => {
    if (selectedClientId) {
      return (
        <ClientDetail
          clientId={selectedClientId}
          onBack={() => setSelectedClientId(null)}
          onEdit={() => {
            const client = clients.find((c) => c.id === selectedClientId)
            if (client) {
              setEditingClient(client)
              setSelectedClientId(null)
            }
          }}
          onDelete={() => {
            handleDeleteClient(selectedClientId)
          }}
        />
      )
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Client Management</h2>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Search clients..."
                className="w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="outline" size="sm">
                <Search className="h-4 w-4" />
              </Button>
            </div>
            {hasPermission(user, "clients_manage") && (
              <Button size="sm" onClick={() => setShowClientForm(true)}>
                <Users className="h-4 w-4 mr-2" />
                Add Client
              </Button>
            )}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <StatCard title="Total Clients" value={clients.length} icon={Users} />
          <StatCard
            title="Active Clients"
            value={clients.filter((c) => c.status === "Active").length}
            icon={CheckCircle}
          />
          <StatCard
            title="This Month"
            value={
              clients.filter((c) => {
                const joinDate = new Date(c.joined)
                const now = new Date()
                return joinDate.getMonth() === now.getMonth() && joinDate.getFullYear() === now.getFullYear()
              }).length
            }
            icon={TrendingUp}
          />
          <StatCard title="Suspended" value={clients.filter((c) => c.status === "Suspended").length} icon={XCircle} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Client List</CardTitle>
            <CardDescription>Manage your client accounts and subscriptions</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Monthly Spend</TableHead>
                  <TableHead>Joined</TableHead>
                  {hasPermission(user, "clients_manage") && <TableHead>Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => (
                  <TableRow key={client.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-medium" onClick={() => setSelectedClientId(client.id)}>
                      <div>
                        <p>{client.name}</p>
                        {client.company && <p className="text-sm text-muted-foreground">{client.company}</p>}
                      </div>
                    </TableCell>
                    <TableCell onClick={() => setSelectedClientId(client.id)}>{client.email}</TableCell>
                    <TableCell onClick={() => setSelectedClientId(client.id)}>
                      <Badge variant="outline">{client.plan}</Badge>
                    </TableCell>
                    <TableCell onClick={() => setSelectedClientId(client.id)}>
                      <Badge variant={client.status === "Active" ? "default" : "destructive"}>{client.status}</Badge>
                    </TableCell>
                    <TableCell onClick={() => setSelectedClientId(client.id)}>
                      ${client.monthlySpend.toLocaleString()}
                    </TableCell>
                    <TableCell onClick={() => setSelectedClientId(client.id)}>
                      {new Date(client.joined).toLocaleDateString()}
                    </TableCell>
                    {hasPermission(user, "clients_manage") && (
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => setSelectedClientId(client.id)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setEditingClient(client)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Client
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteClient(client.id)}>
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Client
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    )
  }

  const TasksContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Task Management</h2>
        <div className="flex items-center space-x-2">
          {(hasPermission(user, "tasks_assign") || user?.role === "admin") && (
            <Button size="sm" onClick={() => setShowTaskForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Task
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard
          title={user?.role === "admin" ? "All Tasks" : "My Tasks"}
          value={user?.role === "admin" ? tasks.length : tasks.filter((t) => t.assignedTo === user?.id).length}
          icon={CheckCircle}
        />
        <StatCard title="Pending" value={tasks.filter((t) => t.status === "pending").length} icon={Clock} />
        <StatCard title="In Progress" value={tasks.filter((t) => t.status === "in_progress").length} icon={Activity} />
        <StatCard title="Completed" value={tasks.filter((t) => t.status === "completed").length} icon={CheckCircle} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tasks</CardTitle>
          <CardDescription>
            {user?.role === "admin"
              ? "All tasks across all departments"
              : hasPermission(user, "tasks_assign")
                ? "All tasks in your department"
                : "Tasks assigned to you"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Assigned By</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">
                    <div>
                      <p>{task.title}</p>
                      <p className="text-sm text-muted-foreground">{task.description.slice(0, 50)}...</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{task.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        task.priority === "critical" || task.priority === "high"
                          ? "destructive"
                          : task.priority === "medium"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {task.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>{task.assignedToName}</TableCell>
                  <TableCell>{task.assignedByName}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        task.status === "completed"
                          ? "default"
                          : task.status === "in_progress"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {task.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No due date"}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        {(task.assignedTo === user?.id ||
                          hasPermission(user, "tasks_assign") ||
                          user?.role === "admin") && (
                          <DropdownMenuItem onClick={() => setEditingTask(task)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Task
                          </DropdownMenuItem>
                        )}
                        {(hasPermission(user, "tasks_assign") || user?.role === "admin") && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteTask(task.id)}>
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Task
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )

  const UsersContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Team Management</h2>
        <div className="flex items-center space-x-2">
          {(hasPermission(user, "users_manage") || user?.role === "admin") && (
            <Button size="sm" onClick={() => setShowUserForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard title="Total Users" value={users.length} icon={Users} />
        <StatCard title="Active Users" value={users.filter((u) => u.status === "active").length} icon={CheckCircle} />
        <StatCard title="Managers" value={users.filter((u) => u.role.includes("manager")).length} icon={TrendingUp} />
        <StatCard title="Inactive" value={users.filter((u) => u.status === "inactive").length} icon={XCircle} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>
            {user?.role === "admin"
              ? "Manage all user accounts and permissions across departments"
              : "Manage user accounts in your department"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                {(hasPermission(user, "users_manage") || user?.role === "admin") && <TableHead>Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((teamUser) => (
                <TableRow key={teamUser.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={teamUser.avatar || "/placeholder.svg"} alt={teamUser.name} />
                        <AvatarFallback>
                          {teamUser.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p>{teamUser.name}</p>
                        <p className="text-sm text-muted-foreground">{teamUser.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <Badge variant="outline">{teamUser.role.replace("_", " ")}</Badge>
                      {teamUser.position && <p className="text-sm text-muted-foreground mt-1">{teamUser.position}</p>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{teamUser.department}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={teamUser.status === "active" ? "default" : "destructive"}>{teamUser.status}</Badge>
                  </TableCell>
                  <TableCell>
                    {teamUser.lastLogin ? new Date(teamUser.lastLogin).toLocaleDateString() : "Never"}
                  </TableCell>
                  {(hasPermission(user, "users_manage") || user?.role === "admin") && (
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => setEditingUser(teamUser)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit User
                          </DropdownMenuItem>
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          {user?.role === "admin" && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => handleDeleteUser(teamUser.id)}
                                disabled={teamUser.id === user?.id}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete User
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )

  const BillingContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Billing & Revenue</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          {hasPermission(user, "billing_manage") && (
            <Button size="sm">
              <DollarSign className="h-4 w-4 mr-2" />
              Generate Invoice
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard
          title="Monthly Revenue"
          value={`$${(clients.reduce((sum, c) => sum + c.monthlySpend, 0) / 1000).toFixed(1)}K`}
          icon={DollarSign}
          trend="up"
          trendValue="15"
        />
        <StatCard
          title="Outstanding"
          value={`$${(invoices.filter((i) => i.status === "Pending").reduce((sum, i) => sum + i.amount, 0) / 1000).toFixed(1)}K`}
          icon={Clock}
        />
        <StatCard
          title="Paid This Month"
          value={`$${(invoices.filter((i) => i.status === "Paid").reduce((sum, i) => sum + i.amount, 0) / 1000).toFixed(1)}K`}
          icon={CheckCircle}
        />
        <StatCard
          title="Overdue"
          value={`$${(invoices.filter((i) => i.status === "Overdue").reduce((sum, i) => sum + i.amount, 0) / 1000).toFixed(1)}K`}
          icon={AlertTriangle}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Due Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.slice(0, 5).map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell>{invoice.clientName}</TableCell>
                    <TableCell>${invoice.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          invoice.status === "Paid"
                            ? "default"
                            : invoice.status === "Overdue"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {invoice.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(invoice.dueDate).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue by Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {["Enterprise", "Business", "Professional", "Basic"].map((plan) => {
                const planClients = clients.filter((c) => c.plan === plan)
                const planRevenue = planClients.reduce((sum, c) => sum + c.monthlySpend, 0)
                const totalRevenue = clients.reduce((sum, c) => sum + c.monthlySpend, 0)
                const percentage = totalRevenue > 0 ? (planRevenue / totalRevenue) * 100 : 0

                return (
                  <div key={plan}>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{plan}</span>
                      <span className="text-sm font-medium">
                        ${(planRevenue / 1000).toFixed(1)}K ({percentage.toFixed(0)}%)
                      </span>
                    </div>
                    <Progress value={percentage} className="mt-1" />
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const SettingsContent = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Settings</h2>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>Manage your account preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                <AvatarFallback>
                  {user?.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-medium">{user?.name}</h3>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant="outline">{user?.role?.replace("_", " ")}</Badge>
                  <Badge variant="secondary">{user?.department}</Badge>
                </div>
              </div>
            </div>
            <Button variant="outline">Edit Profile</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Settings</CardTitle>
            <CardDescription>Configure system-wide preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Email Notifications</span>
              <Button variant="outline" size="sm">
                Configure
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <span>Security Alerts</span>
              <Button variant="outline" size="sm">
                Configure
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <span>Backup Settings</span>
              <Button variant="outline" size="sm">
                Configure
              </Button>
            </div>
            {user?.role === "admin" && (
              <div className="flex items-center justify-between">
                <span>API Keys</span>
                <Button variant="outline" size="sm">
                  Manage
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      )
    }

    switch (activeTab) {
      case "overview":
        return <OverviewContent />
      case "hosting":
        return <HostingContent />
      case "security":
        return <SecurityContent />
      case "clients":
        return <ClientsContent />
      case "tasks":
        return <TasksContent />
      case "users":
        return <UsersContent />
      case "billing":
        return <BillingContent />
      case "settings":
        return <SettingsContent />
      default:
        return <OverviewContent />
    }
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center space-x-2 px-4 py-2">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <h2 className="text-lg font-semibold">SecureHost</h2>
                <p className="text-xs text-muted-foreground">
                  {user.department === "admin" ? "Admin Dashboard" : `${user.department} Dashboard`}
                </p>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton onClick={() => setActiveTab(item.id)} isActive={activeTab === item.id}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1">
          <header className="flex h-16 items-center justify-between border-b px-6">
            <div className="flex items-center space-x-4">
              <SidebarTrigger />
              <h1 className="text-xl font-semibold">
                {menuItems.find((item) => item.id === activeTab)?.title || "Dashboard"}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                      <AvatarFallback>
                        {user?.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user?.position}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setActiveTab("settings")}>
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          <main className="flex-1 space-y-4 p-6">{renderContent()}</main>
        </div>
      </div>

      {/* Dialogs */}
      <Dialog open={showClientForm} onOpenChange={setShowClientForm}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Client</DialogTitle>
            <DialogDescription>Create a new client account with their details and preferences.</DialogDescription>
          </DialogHeader>
          <ClientForm
            onSubmit={handleCreateClient}
            onCancel={() => setShowClientForm(false)}
            isLoading={isSubmitting}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={!!editingClient} onOpenChange={() => setEditingClient(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Client</DialogTitle>
            <DialogDescription>Update client information and settings.</DialogDescription>
          </DialogHeader>
          {editingClient && (
            <ClientForm
              client={editingClient}
              onSubmit={handleUpdateClient}
              onCancel={() => setEditingClient(null)}
              isLoading={isSubmitting}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showServerForm} onOpenChange={setShowServerForm}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Server</DialogTitle>
            <DialogDescription>Configure a new server for your hosting infrastructure.</DialogDescription>
          </DialogHeader>
          <ServerForm
            onSubmit={handleCreateServer}
            onCancel={() => setShowServerForm(false)}
            isLoading={isSubmitting}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={!!editingServer} onOpenChange={() => setEditingServer(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Server</DialogTitle>
            <DialogDescription>Update server configuration and settings.</DialogDescription>
          </DialogHeader>
          {editingServer && (
            <ServerForm
              server={editingServer}
              onSubmit={handleUpdateServer}
              onCancel={() => setEditingServer(null)}
              isLoading={isSubmitting}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showUserForm} onOpenChange={setShowUserForm}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>Create a new user account with appropriate permissions.</DialogDescription>
          </DialogHeader>
          {user && (
            <UserForm
              onSubmit={handleCreateUser}
              onCancel={() => setShowUserForm(false)}
              isLoading={isSubmitting}
              currentUser={user}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!editingUser} onOpenChange={() => setEditingUser(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update user information and permissions.</DialogDescription>
          </DialogHeader>
          {editingUser && user && (
            <UserForm
              user={editingUser}
              onSubmit={handleUpdateUser}
              onCancel={() => setEditingUser(null)}
              isLoading={isSubmitting}
              currentUser={user}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showTaskForm} onOpenChange={setShowTaskForm}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
            <DialogDescription>Assign a new task to a team member.</DialogDescription>
          </DialogHeader>
          {user && (
            <TaskForm
              onSubmit={handleCreateTask}
              onCancel={() => setShowTaskForm(false)}
              isLoading={isSubmitting}
              currentUser={user}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!editingTask} onOpenChange={() => setEditingTask(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogDescription>Update task information and status.</DialogDescription>
          </DialogHeader>
          {editingTask && user && (
            <TaskForm
              task={editingTask}
              onSubmit={handleUpdateTask}
              onCancel={() => setEditingTask(null)}
              isLoading={isSubmitting}
              currentUser={user}
            />
          )}
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  )
}
