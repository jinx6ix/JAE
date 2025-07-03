"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Server, Settings, Users } from "lucide-react"
import type { User } from "@/lib/admin/auth"

interface DepartmentSelectorProps {
  currentDepartment: string
  onDepartmentChange: (department: string) => void
  user: User
}

export function DepartmentSelector({ currentDepartment, onDepartmentChange, user }: DepartmentSelectorProps) {
  const [isVisible, setIsVisible] = useState(true)

  const departments = [
    {
      id: "admin",
      name: "System Administration",
      description: "Complete system overview and management",
      icon: Settings,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
    },
    {
      id: "webhosting",
      name: "Web Hosting Platform",
      description: "Manage hosting services, servers, and clients",
      icon: Server,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      id: "cybersecurity",
      name: "Cybersecurity Platform",
      description: "Monitor threats, incidents, and security operations",
      icon: Shield,
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
    },
  ]

  if (!isVisible) {
    return (
      <div className="fixed top-14 right-4 z-50">
        <Button variant="outline" size="sm" onClick={() => setIsVisible(true)} className="shadow-lg">
          <Settings className="h-4 w-4 mr-2" />
          Switch Platform
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center">
            <Users className="h-6 w-6 mr-2" />
            Platform Selection
          </CardTitle>
          <CardDescription>Welcome, {user.name}! Choose which platform you'd like to access.</CardDescription>
          <Badge variant="outline" className="w-fit mx-auto">
            System Administrator
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {departments.map((dept) => {
              const DeptIcon = dept.icon
              const isSelected = currentDepartment === dept.id

              return (
                <Card
                  key={dept.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    isSelected ? `${dept.borderColor} border-2 ${dept.bgColor}` : "hover:border-primary/50"
                  }`}
                  onClick={() => {
                    onDepartmentChange(dept.id)
                    setIsVisible(false)
                  }}
                >
                  <CardHeader className="text-center pb-2">
                    <div className={`flex justify-center mb-2 p-3 rounded-full ${dept.bgColor} w-fit mx-auto`}>
                      <DeptIcon className={`h-8 w-8 ${dept.color}`} />
                    </div>
                    <CardTitle className="text-lg">{dept.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription className="text-sm">{dept.description}</CardDescription>
                    {isSelected && (
                      <Badge variant="default" className="mt-2">
                        Current Platform
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="flex justify-center mt-6">
            <Button variant="outline" onClick={() => setIsVisible(false)} disabled={!currentDepartment}>
              Continue to {departments.find((d) => d.id === currentDepartment)?.name || "Platform"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
