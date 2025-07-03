export interface Client {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  plan: "Basic" | "Professional" | "Business" | "Enterprise"
  status: "Active" | "Suspended" | "Pending" | "Cancelled"
  joined: string
  lastLogin?: string
  monthlySpend: number
  domains: string[]
  services: string[]
}

export interface Server {
  id: string
  name: string
  type: "Web Server" | "Database Server" | "CDN Edge" | "Load Balancer"
  location: string
  ip: string
  cpu: number
  memory: number
  disk: number
  bandwidth: number
  status: "Healthy" | "Warning" | "Critical" | "Offline"
  uptime: number
  clients: string[]
  lastMaintenance?: string
}

export interface SecurityAlert {
  id: string
  type: "DDoS Attack" | "Malware Detected" | "Brute Force" | "SQL Injection" | "Suspicious Activity"
  severity: "Low" | "Medium" | "High" | "Critical"
  target: string
  source?: string
  timestamp: string
  status: "Active" | "Investigating" | "Mitigated" | "Resolved"
  description: string
  affectedClients: string[]
}

export interface Invoice {
  id: string
  clientId: string
  clientName: string
  amount: number
  status: "Paid" | "Pending" | "Overdue" | "Cancelled"
  dueDate: string
  paidDate?: string
  services: string[]
  createdAt: string
}

// API functions
export const api = {
  // Clients
  getClients: async (): Promise<Client[]> => {
    const response = await fetch("/api/clients")
    if (!response.ok) {
      throw new Error("Failed to fetch clients")
    }
    return response.json()
  },

  getClient: async (id: string): Promise<Client | null> => {
    const response = await fetch(`/api/clients/${id}`)
    if (!response.ok) {
      if (response.status === 404) return null
      throw new Error("Failed to fetch client")
    }
    return response.json()
  },

  createClient: async (client: Omit<Client, "id">): Promise<Client> => {
    const response = await fetch("/api/clients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(client),
    })
    if (!response.ok) {
      throw new Error("Failed to create client")
    }
    return response.json()
  },

  updateClient: async (id: string, updates: Partial<Client>): Promise<Client> => {
    const response = await fetch(`/api/clients/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    })
    if (!response.ok) {
      throw new Error("Failed to update client")
    }
    return response.json()
  },

  deleteClient: async (id: string): Promise<void> => {
    const response = await fetch(`/api/clients/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) {
      throw new Error("Failed to delete client")
    }
  },

  // Servers
  getServers: async (): Promise<Server[]> => {
    const response = await fetch("/api/servers")
    if (!response.ok) {
      throw new Error("Failed to fetch servers")
    }
    return response.json()
  },

  getServer: async (id: string): Promise<Server | null> => {
    const response = await fetch(`/api/servers/${id}`)
    if (!response.ok) {
      if (response.status === 404) return null
      throw new Error("Failed to fetch server")
    }
    return response.json()
  },

  createServer: async (server: Omit<Server, "id">): Promise<Server> => {
    const response = await fetch("/api/servers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(server),
    })
    if (!response.ok) {
      throw new Error("Failed to create server")
    }
    return response.json()
  },

  updateServer: async (id: string, updates: Partial<Server>): Promise<Server> => {
    const response = await fetch(`/api/servers/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    })
    if (!response.ok) {
      throw new Error("Failed to update server")
    }
    return response.json()
  },

  // Security
  getSecurityAlerts: async (): Promise<SecurityAlert[]> => {
    const response = await fetch("/api/security/alerts")
    if (!response.ok) {
      throw new Error("Failed to fetch security alerts")
    }
    return response.json()
  },

  updateSecurityAlert: async (id: string, updates: Partial<SecurityAlert>): Promise<SecurityAlert> => {
    const response = await fetch(`/api/security/alerts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    })
    if (!response.ok) {
      throw new Error("Failed to update security alert")
    }
    return response.json()
  },

  // Billing
  getInvoices: async (): Promise<Invoice[]> => {
    const response = await fetch("/api/billing/invoices")
    if (!response.ok) {
      throw new Error("Failed to fetch invoices")
    }
    return response.json()
  },

  createInvoice: async (invoice: Omit<Invoice, "id">): Promise<Invoice> => {
    const response = await fetch("/api/billing/invoices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invoice),
    })
    if (!response.ok) {
      throw new Error("Failed to create invoice")
    }
    return response.json()
  },
}
