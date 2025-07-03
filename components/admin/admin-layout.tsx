"use client"

import { useState } from "react"
import {
  BarChart3,
  Shield,
  Server,
  Users,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Settings,
  Bell,
  RefreshCw,
  Edit,
  Trash2,
  MoreHorizontal,
  Plus,
  Database,
  Globe,
  Zap,
  FileText,
  UserCheck,
  TrendingUp,
  Activity,
  Clock,
  Eye,
  Download,
} from "lucide-react"

import { useAuth } from "@/hooks/admin/use-auth"
import type { Client, Server as ServerType, SecurityAlert, Invoice } from "@/lib/admin/api"
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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ClientForm } from "./client-form"
import { ServerForm } from "./server-form"
import { UserForm } from "./user-form"
import { TaskForm } from "./task-form"
import { Loader2 } from "lucide-react"

interface AdminLayoutProps {
  clients: Client[]
  servers: ServerType[]
  securityAlerts: SecurityAlert[]
  invoices: Invoice[]
  tasks: Task[]
  users: User[]
  isLoading: boolean
  onRefresh: () => void
  onCreateClient: (data: Omit<Client, "id">) => Promise<void>
  onUpdateClient: (data: Omit<Client, "id">) => Promise<void>
  onDeleteClient: (id: string) => Promise<void>
  onCreateServer: (data: Omit<ServerType, "id">) => Promise<void>
  onUpdateServer: (data: Omit<ServerType, "id">) => Promise<void>
  onCreateUser: (data: Omit<User, "id" | "createdAt" | "lastLogin">) => Promise<void>
  onUpdateUser: (data: Omit<User, "id" | "createdAt" | "lastLogin">) => Promise<void>
  onDeleteUser: (id: string) => Promise<void>
  onCreateTask: (data: Omit<Task, "id" | "createdAt" | "updatedAt" | "comments">) => Promise<void>
  onUpdateTask: (data: Omit<Task, "id" | "createdAt" | "updatedAt" | "comments">) => Promise<void>
  onDeleteTask: (id: string) => Promise<void>
  onUpdateSecurityAlert: (id: string, updates: Partial<SecurityAlert>) => Promise<void>
}

export function AdminLayout({
  clients,
  servers,
  securityAlerts,
  invoices,
  tasks,
  users,
  isLoading,
  onRefresh,
  onCreateClient,
  onUpdateClient,
  onDeleteClient,
  onCreateServer,
  onUpdateServer,
  onCreateUser,
  onUpdateUser,
  onDeleteUser,
  onCreateTask,
  onUpdateTask,
  onDeleteTask,
  onUpdateSecurityAlert,
}: AdminLayoutProps) {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")
  const [showClientForm, setShowClientForm] = useState(false)
  const [showServerForm, setShowServerForm] = useState(false)
  const [editingClient, setEditingClient] = useState<Client | null>(null)
  const [editingServer, setEditingServer] = useState<ServerType | null>(null)
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showUserForm, setShowUserForm] = useState(false)
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  // Admin menu items - comprehensive view with hosting and cybersecurity features
  const adminMenuItems = [
    { title: "System Overview", icon: BarChart3, id: "overview" },
    { title: "User Management", icon: UserCheck, id: "users" },
    { title: "Hosting Plans", icon: Server, id: "hosting-plans" },
    { title: "Server Monitoring", icon: Database, id: "servers" },
    { title: "Billing & Payments", icon: DollarSign, id: "billing" },
    { title: "Domain & Email", icon: Globe, id: "domains" },
    { title: "Security Center", icon: Shield, id: "security" },
    { title: "Threat Monitoring", icon: AlertTriangle, id: "threats" },
    { title: "Incident Management", icon: FileText, id: "incidents" },
    { title: "Support Tickets", icon: CheckCircle, id: "support" },
    { title: "Analytics & Reports", icon: TrendingUp, id: "analytics" },
    { title: "System Settings", icon: Settings, id: "settings" },
  ]

  const handleCreateClient = async (data: Omit<Client, "id">) => {
    setIsSubmitting(true)
    try {
      await onCreateClient(data)
      setShowClientForm(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUpdateClient = async (data: Omit<Client, "id">) => {
    if (!editingClient) return
    setIsSubmitting(true)
    try {
      await onUpdateClient(data)
      setEditingClient(null)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCreateServer = async (data: Omit<ServerType, "id">) => {
    setIsSubmitting(true)
    try {
      await onCreateServer(data)
      setShowServerForm(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUpdateServer = async (data: Omit<ServerType, "id">) => {
    if (!editingServer) return
    setIsSubmitting(true)
    try {
      await onUpdateServer(data)
      setEditingServer(null)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCreateUser = async (data: Omit<User, "id" | "createdAt" | "lastLogin">) => {
    setIsSubmitting(true)
    try {
      await onCreateUser(data)
      setShowUserForm(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUpdateUser = async (data: Omit<User, "id" | "createdAt" | "lastLogin">) => {
    if (!editingUser) return
    setIsSubmitting(true)
    try {
      await onUpdateUser(data)
      setEditingUser(null)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCreateTask = async (data: Omit<Task, "id" | "createdAt" | "updatedAt" | "comments">) => {
    setIsSubmitting(true)
    try {
      await onCreateTask(data)
      setShowTaskForm(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUpdateTask = async (data: Omit<Task, "id" | "createdAt" | "updatedAt" | "comments">) => {
    if (!editingTask) return
    setIsSubmitting(true)
    try {
      await onUpdateTask(data)
      setEditingTask(null)
    } finally {
      setIsSubmitting(false)
    }
  }

  const StatCard = ({ title, value, icon: Icon, trend, trendValue, color = "default" }: any) => (
    <Card className={color === "primary" ? "border-primary bg-primary/5" : ""}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${color === "primary" ? "text-primary" : "text-muted-foreground"}`} />
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

  const SystemOverviewContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">System Overview</h2>
          <p className="text-muted-foreground">Complete administrative dashboard for SecureHost platform</p>
        </div>
        <Button onClick={onRefresh} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh All Data
        </Button>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <StatCard
          title="Total Revenue"
          value={`$${(clients.reduce((sum, c) => sum + c.monthlySpend, 0) / 1000).toFixed(1)}K`}
          icon={DollarSign}
          trend="up"
          trendValue="15"
          color="primary"
        />
        <StatCard
          title="Active Clients"
          value={clients.filter((c) => c.status === "Active").length}
          icon={Users}
          trend="up"
          trendValue="8"
        />
        <StatCard
          title="Server Health"
          value={`${((servers.filter((s) => s.status === "Healthy").length / servers.length) * 100 || 0).toFixed(0)}%`}
          icon={Server}
          trend="up"
          trendValue="2"
        />
        <StatCard
          title="Security Alerts"
          value={securityAlerts.filter((a) => a.status === "Active").length}
          icon={AlertTriangle}
          trend="down"
          trendValue="12"
        />
        <StatCard
          title="Team Members"
          value={users.filter((u) => u.status === "active").length}
          icon={UserCheck}
          trend="up"
          trendValue="5"
        />
      </div>

      {/* Dashboard Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Recent Activity */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Recent System Activity</CardTitle>
            <CardDescription>Latest events across all departments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { type: "Client", action: "New client registered", time: "2 minutes ago", icon: Users },
                { type: "Security", action: "DDoS attack mitigated", time: "15 minutes ago", icon: Shield },
                { type: "Server", action: "Server maintenance completed", time: "1 hour ago", icon: Server },
                { type: "Billing", action: "Invoice generated", time: "2 hours ago", icon: DollarSign },
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="p-2 bg-muted rounded-full">
                    <activity.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.type} • {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline" onClick={() => setShowClientForm(true)}>
              <Users className="h-4 w-4 mr-2" />
              Add New Client
            </Button>
            <Button className="w-full justify-start" variant="outline" onClick={() => setShowServerForm(true)}>
              <Server className="h-4 w-4 mr-2" />
              Add Server
            </Button>
            <Button className="w-full justify-start" variant="outline" onClick={() => setShowUserForm(true)}>
              <UserCheck className="h-4 w-4 mr-2" />
              Add Team Member
            </Button>
            <Button className="w-full justify-start" variant="outline" onClick={() => setShowTaskForm(true)}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Create Task
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Department Status */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Server className="h-5 w-5 mr-2" />
              Web Hosting
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Active Servers</span>
                <span className="text-sm font-medium">
                  {servers.filter((s) => s.status === "Healthy").length}/{servers.length}
                </span>
              </div>
              <Progress value={(servers.filter((s) => s.status === "Healthy").length / servers.length) * 100 || 0} />
              <p className="text-xs text-muted-foreground">
                Avg. Uptime: {(servers.reduce((sum, s) => sum + s.uptime, 0) / servers.length || 0).toFixed(1)}%
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Cybersecurity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Active Alerts</span>
                <span className="text-sm font-medium">
                  {securityAlerts.filter((a) => a.status === "Active").length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Resolved Today</span>
                <span className="text-sm font-medium">
                  {securityAlerts.filter((a) => a.status === "Resolved").length}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Threat Level: {securityAlerts.filter((a) => a.severity === "High").length > 0 ? "Elevated" : "Normal"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="h-5 w-5 mr-2" />
              Financial
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Monthly Revenue</span>
                <span className="text-sm font-medium">
                  ${(clients.reduce((sum, c) => sum + c.monthlySpend, 0) / 1000).toFixed(1)}K
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Outstanding</span>
                <span className="text-sm font-medium">
                  $
                  {(
                    invoices.filter((i) => i.status === "Pending").reduce((sum, i) => sum + i.amount, 0) / 1000
                  ).toFixed(1)}
                  K
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Growth: +15% vs last month</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const InfrastructureContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Infrastructure Management</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={onRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button size="sm" onClick={() => setShowServerForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Server
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard title="Total Servers" value={servers.length} icon={Server} />
        <StatCard
          title="CPU Usage"
          value={`${(servers.reduce((sum, s) => sum + s.cpu, 0) / servers.length || 0).toFixed(0)}%`}
          icon={Zap}
        />
        <StatCard
          title="Memory Usage"
          value={`${(servers.reduce((sum, s) => sum + s.memory, 0) / servers.length || 0).toFixed(0)}%`}
          icon={Database}
        />
        <StatCard
          title="Network Load"
          value={`${(servers.reduce((sum, s) => sum + s.bandwidth, 0) / servers.length || 0).toFixed(0)}%`}
          icon={Globe}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Server Infrastructure</CardTitle>
          <CardDescription>Complete server monitoring and management</CardDescription>
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
                <TableHead>Disk</TableHead>
                <TableHead>Network</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
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
                    <div className="flex items-center space-x-2">
                      <Progress value={server.disk} className="w-16 h-2" />
                      <span className="text-sm">{server.disk}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Progress value={server.bandwidth} className="w-16 h-2" />
                      <span className="text-sm">{server.bandwidth}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={server.status === "Healthy" ? "default" : "destructive"}>{server.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setEditingServer(server)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Server
                        </DropdownMenuItem>
                        <DropdownMenuItem>View Logs</DropdownMenuItem>
                        <DropdownMenuItem>Restart</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
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

  const HostingPlansContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Hosting Plan Management</h2>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Create Plan
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard title="Total Plans" value="12" icon={Server} />
        <StatCard title="Active Subscriptions" value="1,247" icon={CheckCircle} />
        <StatCard title="Plan Upgrades" value="23" icon={TrendingUp} description="This month" />
        <StatCard title="Revenue" value="$45.2K" icon={DollarSign} description="Monthly" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Hosting Plans</CardTitle>
          <CardDescription>Manage hosting plans, pricing, and features</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plan Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Storage</TableHead>
                <TableHead>Bandwidth</TableHead>
                <TableHead>Domains</TableHead>
                <TableHead>Active Users</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { name: "Basic", price: "$9.99", storage: "10GB", bandwidth: "100GB", domains: "1", users: 156 },
                {
                  name: "Professional",
                  price: "$19.99",
                  storage: "50GB",
                  bandwidth: "500GB",
                  domains: "5",
                  users: 423,
                },
                { name: "Business", price: "$39.99", storage: "100GB", bandwidth: "1TB", domains: "10", users: 287 },
                {
                  name: "Enterprise",
                  price: "$99.99",
                  storage: "500GB",
                  bandwidth: "5TB",
                  domains: "Unlimited",
                  users: 381,
                },
              ].map((plan) => (
                <TableRow key={plan.name}>
                  <TableCell className="font-medium">{plan.name}</TableCell>
                  <TableCell>{plan.price}/month</TableCell>
                  <TableCell>{plan.storage}</TableCell>
                  <TableCell>{plan.bandwidth}</TableCell>
                  <TableCell>{plan.domains}</TableCell>
                  <TableCell>{plan.users}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Plan
                        </DropdownMenuItem>
                        <DropdownMenuItem>View Users</DropdownMenuItem>
                        <DropdownMenuItem>Pricing History</DropdownMenuItem>
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

  const DomainsEmailContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Domain & Email Services</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Sync DNS
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Domain
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard title="Active Domains" value="2,847" icon={Globe} />
        <StatCard title="SSL Certificates" value="2,801" icon={Shield} description="98% coverage" />
        <StatCard title="Email Accounts" value="12,456" icon={FileText} />
        <StatCard title="DNS Zones" value="2,847" icon={Database} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Domain Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { domain: "example.com", action: "SSL Renewed", time: "2 hours ago", status: "success" },
                { domain: "testsite.org", action: "DNS Updated", time: "4 hours ago", status: "success" },
                { domain: "mystore.net", action: "Domain Transferred", time: "1 day ago", status: "pending" },
                { domain: "blog.io", action: "SSL Expired", time: "2 days ago", status: "warning" },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{activity.domain}</p>
                    <p className="text-sm text-muted-foreground">{activity.action}</p>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={
                        activity.status === "success"
                          ? "default"
                          : activity.status === "warning"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {activity.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>SSL Certificate Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Valid Certificates</span>
                <span className="text-sm font-medium">2,801</span>
              </div>
              <Progress value={98} />
              <div className="flex justify-between items-center">
                <span className="text-sm">Expiring Soon (30 days)</span>
                <span className="text-sm font-medium">23</span>
              </div>
              <Progress value={8} className="bg-yellow-100" />
              <div className="flex justify-between items-center">
                <span className="text-sm">Expired</span>
                <span className="text-sm font-medium">46</span>
              </div>
              <Progress value={2} className="bg-red-100" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const ThreatMonitoringContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Threat Monitoring Center</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button size="sm" variant="destructive">
            <Shield className="h-4 w-4 mr-2" />
            Emergency Response
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-5">
        <StatCard title="Active Threats" value="7" icon={AlertTriangle} color="primary" />
        <StatCard title="Blocked Attacks" value="1,247" icon={Shield} description="Last 24h" />
        <StatCard title="Protected Endpoints" value="3,456" icon={Server} />
        <StatCard title="Quarantined Files" value="89" icon={FileText} />
        <StatCard title="Threat Level" value="Medium" icon={Activity} />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Real-time Threat Feed</CardTitle>
            <CardDescription>Live security events and threat detection</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  type: "DDoS Attack",
                  target: "web-server-01",
                  severity: "High",
                  time: "2 min ago",
                  status: "Mitigated",
                },
                {
                  type: "Malware Detection",
                  target: "client-endpoint-45",
                  severity: "Critical",
                  time: "5 min ago",
                  status: "Quarantined",
                },
                {
                  type: "Brute Force",
                  target: "ssh-server-03",
                  severity: "Medium",
                  time: "8 min ago",
                  status: "Blocked",
                },
                {
                  type: "Phishing Attempt",
                  target: "email-gateway",
                  severity: "Low",
                  time: "12 min ago",
                  status: "Filtered",
                },
                { type: "Port Scan", target: "firewall-01", severity: "Low", time: "15 min ago", status: "Logged" },
              ].map((threat, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        threat.severity === "Critical"
                          ? "bg-red-500"
                          : threat.severity === "High"
                            ? "bg-orange-500"
                            : threat.severity === "Medium"
                              ? "bg-yellow-500"
                              : "bg-green-500"
                      }`}
                    />
                    <div>
                      <p className="font-medium">{threat.type}</p>
                      <p className="text-sm text-muted-foreground">{threat.target}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={
                        threat.severity === "Critical" || threat.severity === "High"
                          ? "destructive"
                          : threat.severity === "Medium"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {threat.severity}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{threat.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Threat Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Malware Blocked</span>
                  <span className="text-sm font-medium">89%</span>
                </div>
                <Progress value={89} />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">DDoS Mitigated</span>
                  <span className="text-sm font-medium">95%</span>
                </div>
                <Progress value={95} />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Phishing Filtered</span>
                  <span className="text-sm font-medium">78%</span>
                </div>
                <Progress value={78} />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Intrusion Attempts</span>
                  <span className="text-sm font-medium">92%</span>
                </div>
                <Progress value={92} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const IncidentManagementContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Incident Management</h2>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Create Incident
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard title="Open Incidents" value="12" icon={AlertTriangle} color="primary" />
        <StatCard title="In Progress" value="8" icon={Clock} />
        <StatCard title="Resolved Today" value="15" icon={CheckCircle} />
        <StatCard title="Avg Response Time" value="4.2h" icon={Activity} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Incidents</CardTitle>
          <CardDescription>Security incidents requiring attention</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Incident ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Affected System</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                {
                  id: "INC-2024-001",
                  type: "Data Breach",
                  severity: "Critical",
                  system: "Customer DB",
                  assignee: "John Doe",
                  status: "Investigating",
                  created: "2h ago",
                },
                {
                  id: "INC-2024-002",
                  type: "Malware",
                  severity: "High",
                  system: "Web Server",
                  assignee: "Jane Smith",
                  status: "Containment",
                  created: "4h ago",
                },
                {
                  id: "INC-2024-003",
                  type: "Phishing",
                  severity: "Medium",
                  system: "Email Gateway",
                  assignee: "Mike Johnson",
                  status: "Analysis",
                  created: "6h ago",
                },
                {
                  id: "INC-2024-004",
                  type: "DDoS",
                  severity: "High",
                  system: "Load Balancer",
                  assignee: "Sarah Wilson",
                  status: "Mitigated",
                  created: "8h ago",
                },
              ].map((incident) => (
                <TableRow key={incident.id}>
                  <TableCell className="font-medium">{incident.id}</TableCell>
                  <TableCell>{incident.type}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        incident.severity === "Critical"
                          ? "destructive"
                          : incident.severity === "High"
                            ? "destructive"
                            : incident.severity === "Medium"
                              ? "secondary"
                              : "outline"
                      }
                    >
                      {incident.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>{incident.system}</TableCell>
                  <TableCell>{incident.assignee}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        incident.status === "Mitigated"
                          ? "default"
                          : incident.status === "Investigating"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {incident.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{incident.created}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Update Status
                        </DropdownMenuItem>
                        <DropdownMenuItem>Assign to Team</DropdownMenuItem>
                        <DropdownMenuItem>Export Report</DropdownMenuItem>
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

  const SupportTicketsContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Support Ticket Management</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Create Ticket
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-5">
        <StatCard title="Open Tickets" value="47" icon={FileText} color="primary" />
        <StatCard title="In Progress" value="23" icon={Clock} />
        <StatCard title="Pending Customer" value="12" icon={Users} />
        <StatCard title="Resolved Today" value="31" icon={CheckCircle} />
        <StatCard title="Avg Response" value="2.4h" icon={Activity} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Support Tickets</CardTitle>
          <CardDescription>Customer support requests and technical issues</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticket #</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                {
                  id: "TKT-001",
                  customer: "Acme Corp",
                  subject: "Email not working",
                  priority: "High",
                  category: "Email",
                  assignee: "Support Team",
                  status: "Open",
                  created: "1h ago",
                },
                {
                  id: "TKT-002",
                  customer: "TechStart",
                  subject: "SSL certificate issue",
                  priority: "Medium",
                  category: "SSL",
                  assignee: "John Doe",
                  status: "In Progress",
                  created: "3h ago",
                },
                {
                  id: "TKT-003",
                  customer: "WebStore",
                  subject: "Site loading slowly",
                  priority: "Low",
                  category: "Performance",
                  assignee: "Jane Smith",
                  status: "Pending",
                  created: "5h ago",
                },
                {
                  id: "TKT-004",
                  customer: "BlogSite",
                  subject: "Backup restoration",
                  priority: "High",
                  category: "Backup",
                  assignee: "Mike Johnson",
                  status: "Resolved",
                  created: "1d ago",
                },
              ].map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell className="font-medium">{ticket.id}</TableCell>
                  <TableCell>{ticket.customer}</TableCell>
                  <TableCell>{ticket.subject}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        ticket.priority === "High"
                          ? "destructive"
                          : ticket.priority === "Medium"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {ticket.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>{ticket.category}</TableCell>
                  <TableCell>{ticket.assignee}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        ticket.status === "Resolved"
                          ? "default"
                          : ticket.status === "Open"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {ticket.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{ticket.created}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Ticket
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Update Status
                        </DropdownMenuItem>
                        <DropdownMenuItem>Assign to Agent</DropdownMenuItem>
                        <DropdownMenuItem>Add Note</DropdownMenuItem>
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

  const AnalyticsReportsContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Analytics & Reports</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
          <Button size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard title="Monthly Revenue" value="$127.5K" icon={DollarSign} trend="up" trendValue="15" />
        <StatCard title="New Signups" value="234" icon={Users} trend="up" trendValue="8" />
        <StatCard title="Churn Rate" value="2.1%" icon={TrendingUp} trend="down" trendValue="0.3" />
        <StatCard title="Support Satisfaction" value="94.2%" icon={CheckCircle} trend="up" trendValue="2" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { plan: "Enterprise", revenue: 45200, percentage: 35 },
                { plan: "Business", revenue: 38400, percentage: 30 },
                { plan: "Professional", revenue: 25600, percentage: 20 },
                { plan: "Basic", revenue: 19200, percentage: 15 },
              ].map((item) => (
                <div key={item.plan}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{item.plan}</span>
                    <span className="text-sm">
                      ${(item.revenue / 1000).toFixed(1)}K ({item.percentage}%)
                    </span>
                  </div>
                  <Progress value={item.percentage} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Threats Blocked</span>
                <span className="text-sm font-medium">99.7%</span>
              </div>
              <Progress value={99.7} />
              <div className="flex justify-between items-center">
                <span className="text-sm">Uptime</span>
                <span className="text-sm font-medium">99.9%</span>
              </div>
              <Progress value={99.9} />
              <div className="flex justify-between items-center">
                <span className="text-sm">Incident Response</span>
                <span className="text-sm font-medium">4.2h avg</span>
              </div>
              <Progress value={85} />
              <div className="flex justify-between items-center">
                <span className="text-sm">Customer Satisfaction</span>
                <span className="text-sm font-medium">94.2%</span>
              </div>
              <Progress value={94.2} />
            </div>
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
        return <SystemOverviewContent />
      case "users":
        return <div>User Management Content</div>
      case "hosting-plans":
        return <HostingPlansContent />
      case "servers":
        return <InfrastructureContent />
      case "billing":
        return <div>Enhanced Billing & Payments Content</div>
      case "domains":
        return <DomainsEmailContent />
      case "security":
        return <div>Security Center Content</div>
      case "threats":
        return <ThreatMonitoringContent />
      case "incidents":
        return <IncidentManagementContent />
      case "support":
        return <SupportTicketsContent />
      case "analytics":
        return <AnalyticsReportsContent />
      case "settings":
        return <div>System Settings Content</div>
      default:
        return <SystemOverviewContent />
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
                <h2 className="text-lg font-semibold">SecureHost Admin</h2>
                <p className="text-xs text-muted-foreground">System Administration</p>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Administration</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {adminMenuItems.map((item) => (
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
          <header className="flex h-16 items-center justify-between border-b px-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex items-center space-x-4">
              <SidebarTrigger />
              <div>
                <h1 className="text-xl font-semibold">
                  {adminMenuItems.find((item) => item.id === activeTab)?.title || "Dashboard"}
                </h1>
                <p className="text-sm text-muted-foreground">Administrator Panel</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                Admin
              </Badge>
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
                      <Badge variant="secondary" className="w-fit text-xs">
                        System Administrator
                      </Badge>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setActiveTab("settings")}>
                    <Settings className="h-4 w-4 mr-2" />
                    Admin Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          <main className="flex-1 space-y-4 p-6 bg-muted/30">{renderContent()}</main>
        </div>
      </div>

      {/* Admin Dialogs */}
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

      <Dialog open={showUserForm} onOpenChange={setShowUserForm}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Team Member</DialogTitle>
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
    </SidebarProvider>
  )
}
