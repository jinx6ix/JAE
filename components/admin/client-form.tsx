"use client"

import type React from "react"

import { useState } from "react"
import type { Client } from "@/lib/admin/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

interface ClientFormProps {
  client?: Client
  onSubmit: (data: Omit<Client, "id">) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
}

export function ClientForm({ client, onSubmit, onCancel, isLoading }: ClientFormProps) {
  const [formData, setFormData] = useState({
    name: client?.name || "",
    email: client?.email || "",
    phone: client?.phone || "",
    company: client?.company || "",
    plan: client?.plan || "Basic",
    status: client?.status || "Active",
    monthlySpend: client?.monthlySpend || 0,
    domains: client?.domains?.join(", ") || "",
    services: client?.services?.join(", ") || "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const clientData = {
      ...formData,
      joined: client?.joined || new Date().toISOString().split("T")[0],
      domains: formData.domains
        .split(",")
        .map((d) => d.trim())
        .filter(Boolean),
      services: formData.services
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    }

    await onSubmit(clientData)
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>{client ? "Edit Client" : "Add New Client"}</CardTitle>
        <CardDescription>{client ? "Update client information" : "Create a new client account"}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
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
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="plan">Plan</Label>
              <Select value={formData.plan} onValueChange={(value) => setFormData({ ...formData, plan: value as any })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Basic">Basic</SelectItem>
                  <SelectItem value="Professional">Professional</SelectItem>
                  <SelectItem value="Business">Business</SelectItem>
                  <SelectItem value="Enterprise">Enterprise</SelectItem>
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
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Suspended">Suspended</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="monthlySpend">Monthly Spend ($)</Label>
            <Input
              id="monthlySpend"
              type="number"
              value={formData.monthlySpend}
              onChange={(e) => setFormData({ ...formData, monthlySpend: Number(e.target.value) })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="domains">Domains (comma-separated)</Label>
            <Input
              id="domains"
              value={formData.domains}
              onChange={(e) => setFormData({ ...formData, domains: e.target.value })}
              placeholder="example.com, api.example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="services">Services (comma-separated)</Label>
            <Input
              id="services"
              value={formData.services}
              onChange={(e) => setFormData({ ...formData, services: e.target.value })}
              placeholder="Web Hosting, SSL Certificate, DDoS Protection"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {client ? "Update Client" : "Create Client"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
