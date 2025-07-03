"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/hooks/admin/use-auth"
import { Shield, AlertTriangle, Activity, FileText, Settings } from "lucide-react"

export function CybersecurityPlatform() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("alerts")

  if (!user) return null

  return (
    <div className="min-h-screen bg-red-50">
      {/* Header */}
      <header className="bg-red-600 text-white p-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <Shield className="h-8 w-8" />
            <div>
              <h1 className="text-2xl font-bold">Cybersecurity Platform</h1>
              <p className="text-red-100">Monitor threats, manage alerts, and secure systems</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-red-500">
              {user.department.toUpperCase()}
            </Badge>
            <span className="text-sm">{user.name}</span>
            <Button variant="outline" size="sm" onClick={logout} className="text-red-600">
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="alerts">Security Alerts</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
            <TabsTrigger value="incidents">Incidents</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="alerts" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">7</div>
                  <p className="text-xs text-muted-foreground">3 critical, 4 medium</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Threats Blocked</CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">1,247</div>
                  <p className="text-xs text-muted-foreground">Last 24 hours</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">System Health</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">98%</div>
                  <p className="text-xs text-muted-foreground">All systems operational</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Security Alerts</CardTitle>
                <CardDescription>Monitor and respond to security threats</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { id: 1, type: "Critical", message: "Suspicious login attempt detected", time: "2 min ago" },
                    { id: 2, type: "Medium", message: "Unusual network traffic pattern", time: "15 min ago" },
                    { id: 3, type: "Low", message: "Failed authentication attempts", time: "1 hour ago" },
                  ].map((alert) => (
                    <div key={alert.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <AlertTriangle
                          className={`h-8 w-8 ${
                            alert.type === "Critical"
                              ? "text-red-600"
                              : alert.type === "Medium"
                                ? "text-yellow-600"
                                : "text-blue-600"
                          }`}
                        />
                        <div>
                          <h3 className="font-semibold">{alert.message}</h3>
                          <p className="text-sm text-muted-foreground">{alert.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant="outline"
                          className={
                            alert.type === "Critical"
                              ? "text-red-600"
                              : alert.type === "Medium"
                                ? "text-yellow-600"
                                : "text-blue-600"
                          }
                        >
                          {alert.type}
                        </Badge>
                        <Button variant="outline" size="sm">
                          Investigate
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Monitoring</CardTitle>
                <CardDescription>Real-time security monitoring dashboard</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Firewall Status</span>
                      <Badge variant="outline" className="text-green-600">
                        Active
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Intrusion Detection</span>
                      <Badge variant="outline" className="text-green-600">
                        Running
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Antivirus Scans</span>
                      <Badge variant="outline" className="text-green-600">
                        Up to Date
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>VPN Connections</span>
                      <Badge variant="outline">24 Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>SSL Certificates</span>
                      <Badge variant="outline" className="text-green-600">
                        Valid
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Backup Status</span>
                      <Badge variant="outline" className="text-green-600">
                        Complete
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="incidents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Incidents</CardTitle>
                <CardDescription>Track and manage security incidents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { id: "INC-001", title: "Data breach attempt", status: "Resolved", severity: "High" },
                    { id: "INC-002", title: "Malware detection", status: "In Progress", severity: "Medium" },
                    { id: "INC-003", title: "Phishing email campaign", status: "Investigating", severity: "Low" },
                  ].map((incident) => (
                    <div key={incident.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <FileText className="h-8 w-8 text-red-600" />
                        <div>
                          <h3 className="font-semibold">{incident.title}</h3>
                          <p className="text-sm text-muted-foreground">{incident.id}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant="outline"
                          className={
                            incident.severity === "High"
                              ? "text-red-600"
                              : incident.severity === "Medium"
                                ? "text-yellow-600"
                                : "text-blue-600"
                          }
                        >
                          {incident.severity}
                        </Badge>
                        <Badge variant="outline">{incident.status}</Badge>
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

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Reports</CardTitle>
                <CardDescription>Generate and view security reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button className="w-full">Generate Monthly Security Report</Button>
                  <Button variant="outline" className="w-full">
                    Export Threat Intelligence
                  </Button>
                  <Button variant="outline" className="w-full">
                    Compliance Audit Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Configure cybersecurity platform settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Settings className="h-5 w-5" />
                      <span>Real-time monitoring</span>
                    </div>
                    <Badge variant="outline" className="text-green-600">
                      Enabled
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Settings className="h-5 w-5" />
                      <span>Alert notifications</span>
                    </div>
                    <Badge variant="outline" className="text-green-600">
                      Enabled
                    </Badge>
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
