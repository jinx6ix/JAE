"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/hooks/admin/use-auth"
import { Server, Users, Globe, DollarSign, Settings, AlertCircle } from "lucide-react"

export function WebHostingPlatform() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("servers")

  if (!user) return null

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <Server className="h-8 w-8" />
            <div>
              <h1 className="text-2xl font-bold">Web Hosting Platform</h1>
              <p className="text-blue-100">Manage servers, clients, and hosting services</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-blue-500">
              {user.department.toUpperCase()}
            </Badge>
            <span className="text-sm">{user.name}</span>
            <Button variant="outline" size="sm" onClick={logout} className="text-blue-600">
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="servers">Servers</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="domains">Domains</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="servers" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Servers</CardTitle>
                  <Server className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">+2 from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Server Load</CardTitle>
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">67%</div>
                  <p className="text-xs text-muted-foreground">Average across all servers</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Uptime</CardTitle>
                  <Server className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">99.9%</div>
                  <p className="text-xs text-muted-foreground">Last 30 days</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Server Management</CardTitle>
                <CardDescription>Monitor and manage your hosting servers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((server) => (
                    <div key={server} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Server className="h-8 w-8 text-blue-600" />
                        <div>
                          <h3 className="font-semibold">Server {server}</h3>
                          <p className="text-sm text-muted-foreground">web-{server}.securehost.com</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-green-600">
                          Online
                        </Badge>
                        <Button variant="outline" size="sm">
                          Manage
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="clients" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Client Management</CardTitle>
                <CardDescription>Manage your hosting clients and their accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((client) => (
                    <div key={client} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Users className="h-8 w-8 text-blue-600" />
                        <div>
                          <h3 className="font-semibold">Client {client}</h3>
                          <p className="text-sm text-muted-foreground">client{client}@example.com</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">Active</Badge>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="domains" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Domain Management</CardTitle>
                <CardDescription>Manage domains and DNS settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["example.com", "testsite.org", "mywebsite.net"].map((domain) => (
                    <div key={domain} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Globe className="h-8 w-8 text-blue-600" />
                        <div>
                          <h3 className="font-semibold">{domain}</h3>
                          <p className="text-sm text-muted-foreground">Expires: Dec 2024</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-green-600">
                          Active
                        </Badge>
                        <Button variant="outline" size="sm">
                          DNS Settings
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Billing Overview</CardTitle>
                <CardDescription>View billing information and invoices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-5 w-5 text-green-600" />
                      <span className="font-semibold">Monthly Revenue: $12,450</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-5 w-5 text-blue-600" />
                      <span className="font-semibold">Pending Invoices: $2,340</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Settings</CardTitle>
                <CardDescription>Configure web hosting platform settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Settings className="h-5 w-5" />
                      <span>Auto-scaling enabled</span>
                    </div>
                    <Badge variant="outline" className="text-green-600">
                      Enabled
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Settings className="h-5 w-5" />
                      <span>Backup frequency</span>
                    </div>
                    <Badge variant="outline">Daily</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
