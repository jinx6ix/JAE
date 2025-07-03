"use client"

import { useState } from "react"
import {
  BarChart3,
  Shield,
  Server,
  Users,
  CheckCircle,
  Clock,
  Settings,
  Bell,
  FileText,
  Activity,
  Target,
  AlertTriangle,
  Globe,
  DollarSign,
} from "lucide-react"

import { useAuth } from "@/hooks/admin/use-auth"
import type { Client, Server as ServerType, SecurityAlert, Invoice } from "@/lib/admin/api"
import { hasPermission } from "@/lib/admin/auth"
import type { Task } from "@/lib/admin/tasks"
import type { User } from "@/lib/admin/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2 } from "lucide-react"

interface UserLayoutProps {
  clients: Client[]
  servers: ServerType[]
  securityAlerts: SecurityAlert[]
  invoices: Invoice[]
  tasks: Task[]
  users: User[]
  isLoading: boolean
  onRefresh: () => void
}

export function UserLayout({
  clients,
  servers,
  securityAlerts,
  invoices,
  tasks,
  users,
  isLoading,
  onRefresh,
}: UserLayoutProps) {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("dashboard")

  // Get user-specific menu items based on role and permissions
  const getUserMenuItems = (currentUser: User | null) => {
    if (!currentUser) return []

    const baseItems = [
      { title: "My Dashboard", icon: BarChart3, id: "dashboard" },
      { title: "My Tasks", icon: CheckCircle, id: "tasks" },
    ]

    // Add department-specific items
    if (currentUser.department === "webhosting" || hasPermission(currentUser, "hosting_view")) {
      baseItems.push(
        { title: "Server Status", icon: Server, id: "hosting" },
        { title: "Client Accounts", icon: Users, id: "clients" },
        { title: "Domain Management", icon: Globe, id: "domains" },
        { title: "Support Tickets", icon: FileText, id: "support" },
      )
    }

    if (currentUser.department === "cybersecurity" || hasPermission(currentUser, "security_view")) {
      baseItems.push(
        { title: "Threat Monitor", icon: Shield, id: "security" },
        { title: "Incident Response", icon: AlertTriangle, id: "incidents" },
        { title: "Vulnerability Scans", icon: Activity, id: "vulnerabilities" },
        { title: "Security Reports", icon: FileText, id: "reports" },
      )
    }

    if (currentUser.department === "support" || hasPermission(currentUser, "support_view")) {
      baseItems.push(
        { title: "Support Queue", icon: FileText, id: "support" },
        { title: "Client Issues", icon: Users, id: "clients" },
        { title: "Knowledge Base", icon: FileText, id: "knowledge" },
      )
    }

    if (currentUser.department === "billing" || hasPermission(currentUser, "billing_view")) {
      baseItems.push(
        { title: "Billing Overview", icon: DollarSign, id: "billing" },
        { title: "Payment Processing", icon: CheckCircle, id: "payments" },
        { title: "Invoice Management", icon: FileText, id: "invoices" },
      )
    }

    baseItems.push({ title: "Settings", icon: Settings, id: "settings" })

    return baseItems
  }

  const menuItems = getUserMenuItems(user)

  const StatCard = ({ title, value, icon: Icon, description, color = "default" }: any) => (
    <Card className={color === "primary" ? "border-primary bg-primary/5" : ""}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${color === "primary" ? "text-primary" : "text-muted-foreground"}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
      </CardContent>
    </Card>
  )

  const MyDashboardContent = () => {
    const myTasks = tasks.filter((task) => task.assignedTo === user?.id)
    const pendingTasks = myTasks.filter((task) => task.status === "pending")
    const inProgressTasks = myTasks.filter((task) => task.status === "in_progress")
    const completedTasks = myTasks.filter((task) => task.status === "completed")

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name?.split(" ")[0]}!</h2>
            <p className="text-muted-foreground">
              {user?.position} • {user?.department} Department
            </p>
          </div>
          <Button onClick={onRefresh} variant="outline">
            <Activity className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Personal Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="My Tasks"
            value={myTasks.length}
            icon={Target}
            description={`${pendingTasks.length} pending`}
            color="primary"
          />
          <StatCard title="In Progress" value={inProgressTasks.length} icon={Clock} description="Active tasks" />
          <StatCard title="Completed" value={completedTasks.length} icon={CheckCircle} description="This month" />
          <StatCard
            title="Department"
            value={
              user?.department === "webhosting"
                ? "Web Hosting"
                : user?.department === "cybersecurity"
                  ? "Cybersecurity"
                  : "Admin"
            }
            icon={user?.department === "webhosting" ? Server : user?.department === "cybersecurity" ? Shield : Users}
            description={user?.role?.replace("_", " ")}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* My Tasks */}
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>My Active Tasks</CardTitle>
              <CardDescription>Tasks assigned to you</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myTasks.slice(0, 5).map((task) => (
                  <div key={task.id} className="flex items-center space-x-4 p-3 border rounded-lg">
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
                      <p className="text-xs text-muted-foreground">{task.description.slice(0, 80)}...</p>
                      <div className="flex items-center space-x-2 mt-2">
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
                {myTasks.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <CheckCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No tasks assigned to you</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Department Status */}
          <Card>
            <CardHeader>
              <CardTitle>Department Status</CardTitle>
              <CardDescription>
                {user?.department === "webhosting"
                  ? "Web Hosting"
                  : user?.department === "cybersecurity"
                    ? "Cybersecurity"
                    : "Admin"}{" "}
                Overview
              </CardDescription>
            </CardHeader>
            <CardContent>
              {user?.department === "webhosting" && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Active Servers</span>
                    <span className="text-sm font-medium">
                      {servers.filter((s) => s.status === "Healthy").length}/{servers.length}
                    </span>
                  </div>
                  <Progress
                    value={(servers.filter((s) => s.status === "Healthy").length / servers.length) * 100 || 0}
                  />
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Avg. CPU Usage</span>
                    <span className="text-sm font-medium">
                      {(servers.reduce((sum, s) => sum + s.cpu, 0) / servers.length || 0).toFixed(0)}%
                    </span>
                  </div>
                  <Progress value={servers.reduce((sum, s) => sum + s.cpu, 0) / servers.length || 0} />
                </div>
              )}

              {user?.department === "cybersecurity" && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Active Alerts</span>
                    <span className="text-sm font-medium">
                      {securityAlerts.filter((a) => a.status === "Active").length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">High Priority</span>
                    <span className="text-sm font-medium">
                      {securityAlerts.filter((a) => a.severity === "High").length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Resolved Today</span>
                    <span className="text-sm font-medium">
                      {securityAlerts.filter((a) => a.status === "Resolved").length}
                    </span>
                  </div>
                </div>
              )}

              {user?.department === "admin" && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Users</span>
                    <span className="text-sm font-medium">{users.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Active Clients</span>
                    <span className="text-sm font-medium">{clients.filter((c) => c.status === "Active").length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">System Health</span>
                    <span className="text-sm font-medium">Good</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const MyTasksContent = () => {
    const myTasks = tasks.filter((task) => task.assignedTo === user?.id)

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">My Tasks</h2>
          <div className="flex items-center space-x-2">
            <Badge variant="outline">{myTasks.length} total tasks</Badge>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <StatCard title="Total Tasks" value={myTasks.length} icon={Target} />
          <StatCard title="Pending" value={myTasks.filter((t) => t.status === "pending").length} icon={Clock} />
          <StatCard
            title="In Progress"
            value={myTasks.filter((t) => t.status === "in_progress").length}
            icon={Activity}
          />
          <StatCard
            title="Completed"
            value={myTasks.filter((t) => t.status === "completed").length}
            icon={CheckCircle}
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Task List</CardTitle>
            <CardDescription>All tasks assigned to you</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Task</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Assigned By</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {myTasks.map((task) => (
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
                    <TableCell>{task.assignedByName}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    )
  }

  const SecurityMonitorContent = () => {
    const myIncidents = [
      { id: "INC-001", type: "Malware", severity: "High", status: "Investigating", assigned: "2h ago" },
      { id: "INC-002", type: "Phishing", severity: "Medium", status: "Resolved", assigned: "1d ago" },
    ]

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Security Monitoring</h2>
          <Badge variant="outline">Cybersecurity Team</Badge>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <StatCard title="My Incidents" value={myIncidents.length} icon={AlertTriangle} />
          <StatCard title="Threats Blocked" value="47" icon={Shield} description="Today" />
          <StatCard title="Scans Completed" value="12" icon={Activity} description="This week" />
          <StatCard title="Response Time" value="3.2h" icon={Clock} description="Average" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>My Assigned Incidents</CardTitle>
            <CardDescription>Security incidents assigned to you</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myIncidents.map((incident) => (
                <div key={incident.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">
                      {incident.id} - {incident.type}
                    </p>
                    <p className="text-sm text-muted-foreground">Assigned {incident.assigned}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={incident.severity === "High" ? "destructive" : "secondary"}>
                      {incident.severity}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{incident.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const HostingManagementContent = () => {
    const myClients = [
      { name: "Acme Corp", plan: "Enterprise", status: "Active", issues: 0 },
      { name: "TechStart", plan: "Business", status: "Active", issues: 1 },
    ]

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Hosting Management</h2>
          <Badge variant="outline">Web Hosting Team</Badge>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <StatCard title="My Clients" value={myClients.length} icon={Users} />
          <StatCard title="Server Uptime" value="99.9%" icon={Server} />
          <StatCard title="Open Tickets" value="3" icon={FileText} />
          <StatCard title="Deployments" value="8" icon={Activity} description="This week" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>My Client Accounts</CardTitle>
            <CardDescription>Hosting accounts under your management</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myClients.map((client) => (
                <div key={client.name} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{client.name}</p>
                    <p className="text-sm text-muted-foreground">{client.plan} Plan</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={client.status === "Active" ? "default" : "secondary"}>{client.status}</Badge>
                    <p className="text-xs text-muted-foreground mt-1">{client.issues} open issues</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const SupportQueueContent = () => {
    const myTickets = [
      { id: "TKT-001", customer: "Acme Corp", subject: "Email issues", priority: "High", status: "Open" },
      { id: "TKT-002", customer: "TechStart", subject: "SSL certificate", priority: "Medium", status: "In Progress" },
    ]

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Support Queue</h2>
          <Badge variant="outline">Support Team</Badge>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <StatCard title="My Tickets" value={myTickets.length} icon={FileText} />
          <StatCard title="Resolved Today" value="5" icon={CheckCircle} />
          <StatCard title="Response Time" value="1.8h" icon={Clock} description="Average" />
          <StatCard title="Satisfaction" value="96%" icon={Users} description="Rating" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>My Support Tickets</CardTitle>
            <CardDescription>Customer support tickets assigned to you</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myTickets.map((ticket) => (
                <div key={ticket.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">
                      {ticket.id} - {ticket.subject}
                    </p>
                    <p className="text-sm text-muted-foreground">{ticket.customer}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={ticket.priority === "High" ? "destructive" : "secondary"}>{ticket.priority}</Badge>
                    <p className="text-xs text-muted-foreground mt-1">{ticket.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      )
    }

    switch (activeTab) {
      case "dashboard":
        return <MyDashboardContent />
      case "tasks":
        return <MyTasksContent />
      case "hosting":
        return <HostingManagementContent />
      case "security":
        return <SecurityMonitorContent />
      case "incidents":
        return <SecurityMonitorContent />
      case "support":
        return <SupportQueueContent />
      case "clients":
        return user?.department === "webhosting" ? <HostingManagementContent /> : <div>Clients (User View)</div>
      case "reports":
        return <div>Reports (User View)</div>
      case "settings":
        return <div>Settings (User View)</div>
      default:
        return <MyDashboardContent />
    }
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
                  {user?.department === "webhosting"
                    ? "Web Hosting"
                    : user?.department === "cybersecurity"
                      ? "Cybersecurity"
                      : "Dashboard"}
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
              <div>
                <h1 className="text-xl font-semibold">
                  {menuItems.find((item) => item.id === activeTab)?.title || "Dashboard"}
                </h1>
                <p className="text-sm text-muted-foreground">{user?.department} Department</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary">{user?.role?.replace("_", " ")}</Badge>
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
    </SidebarProvider>
  )
}
