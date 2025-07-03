"use client"

import { useState, useEffect } from "react"
import { type Client, api } from "@/lib/admin/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { User, Mail, Phone, Building, Calendar, DollarSign, Globe, Shield, Edit, Trash2, Loader2 } from "lucide-react"
import { ClientForm } from "./client-form"

interface ClientDetailProps {
  clientId: string
  onBack: () => void
  onEdit: () => void
  onDelete: () => void
}

export function ClientDetail({ clientId, onBack, onEdit, onDelete }: ClientDetailProps) {
  const [client, setClient] = useState<Client | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    loadClient()
  }, [clientId])

  const loadClient = async () => {
    try {
      setIsLoading(true)
      const clientData = await api.getClient(clientId)
      setClient(clientData)
    } catch (error) {
      console.error("Failed to load client:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdate = async (data: Omit<Client, "id">) => {
    try {
      setIsUpdating(true)
      const updatedClient = await api.updateClient(clientId, data)
      setClient(updatedClient)
      setIsEditing(false)
    } catch (error) {
      console.error("Failed to update client:", error)
    } finally {
      setIsUpdating(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!client) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Client not found</p>
        <Button onClick={onBack} className="mt-4">
          Go Back
        </Button>
      </div>
    )
  }

  if (isEditing) {
    return (
      <ClientForm client={client} onSubmit={handleUpdate} onCancel={() => setIsEditing(false)} isLoading={isUpdating} />
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Button variant="ghost" onClick={onBack} className="mb-4">
            ← Back to Clients
          </Button>
          <h1 className="text-3xl font-bold">{client.name}</h1>
          <p className="text-muted-foreground">Client Details</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setIsEditing(true)}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{client.email}</span>
            </div>
            {client.phone && (
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{client.phone}</span>
              </div>
            )}
            {client.company && (
              <div className="flex items-center space-x-2">
                <Building className="h-4 w-4 text-muted-foreground" />
                <span>{client.company}</span>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Joined {new Date(client.joined).toLocaleDateString()}</span>
            </div>
            {client.lastLogin && (
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Last login {new Date(client.lastLogin).toLocaleDateString()}</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Plan</span>
              <Badge variant="outline">{client.plan}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Status</span>
              <Badge variant={client.status === "Active" ? "default" : "destructive"}>{client.status}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Monthly Spend</span>
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 mr-1" />
                <span>{client.monthlySpend.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="h-5 w-5 mr-2" />
              Domains
            </CardTitle>
          </CardHeader>
          <CardContent>
            {client.domains.length > 0 ? (
              <div className="space-y-2">
                {client.domains.map((domain, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Badge variant="secondary">{domain}</Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No domains configured</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Services
            </CardTitle>
          </CardHeader>
          <CardContent>
            {client.services.length > 0 ? (
              <div className="space-y-2">
                {client.services.map((service, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Badge variant="outline">{service}</Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No services configured</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
