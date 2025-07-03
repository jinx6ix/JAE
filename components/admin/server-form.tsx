"use client"

import type React from "react"

import { useState } from "react"
import type { Server } from "@/lib/admin/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

interface ServerFormProps {
  server?: Server
  onSubmit: (data: Omit<Server, "id">) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
}

export function ServerForm({ server, onSubmit, onCancel, isLoading }: ServerFormProps) {
  const [formData, setFormData] = useState({
    name: server?.name || "",
    type: server?.type || "Web Server",
    location: server?.location || "",
    ip: server?.ip || "",
    cpu: server?.cpu || 0,
    memory: server?.memory || 0,
    disk: server?.disk || 0,
    bandwidth: server?.bandwidth || 0,
    status: server?.status || "Healthy",
    uptime: server?.uptime || 99.9,
    clients: server?.clients?.join(", ") || "",
    lastMaintenance: server?.lastMaintenance || "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const serverData = {
      ...formData,
      clients: formData.clients
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean),
    }

    await onSubmit(serverData)
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>{server ? "Edit Server" : "Add New Server"}</CardTitle>
        <CardDescription>{server ? "Update server configuration" : "Configure a new server"}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Server Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Server Type</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value as any })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Web Server">Web Server</SelectItem>
                  <SelectItem value="Database Server">Database Server</SelectItem>
                  <SelectItem value="CDN Edge">CDN Edge</SelectItem>
                  <SelectItem value="Load Balancer">Load Balancer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ip">IP Address</Label>
              <Input
                id="ip"
                value={formData.ip}
                onChange={(e) => setFormData({ ...formData, ip: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
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
                  <SelectItem value="Healthy">Healthy</SelectItem>
                  <SelectItem value="Warning">Warning</SelectItem>
                  <SelectItem value="Critical">Critical</SelectItem>
                  <SelectItem value="Offline">Offline</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="uptime">Uptime (%)</Label>
              <Input
                id="uptime"
                type="number"
                step="0.1"
                min="0"
                max="100"
                value={formData.uptime}
                onChange={(e) => setFormData({ ...formData, uptime: Number(e.target.value) })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="clients">Client IDs (comma-separated)</Label>
            <Input
              id="clients"
              value={formData.clients}
              onChange={(e) => setFormData({ ...formData, clients: e.target.value })}
              placeholder="1, 2, 3"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastMaintenance">Last Maintenance Date</Label>
            <Input
              id="lastMaintenance"
              type="date"
              value={formData.lastMaintenance}
              onChange={(e) => setFormData({ ...formData, lastMaintenance: e.target.value })}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {server ? "Update Server" : "Create Server"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
