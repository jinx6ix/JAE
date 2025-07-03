import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // Mock data for now - replace with actual database calls later
    const mockClients = [
      {
        id: "1",
        name: "Acme Corporation",
        email: "contact@acme.com",
        phone: "+1-555-0123",
        company: "Acme Corp",
        plan: "Enterprise",
        status: "Active",
        joined: "2024-01-15",
        monthlySpend: 2500,
        domains: ["acme.com", "www.acme.com"],
        services: ["Web Hosting", "SSL Certificate", "CDN"],
      },
      {
        id: "2",
        name: "TechStart Inc",
        email: "hello@techstart.io",
        phone: "+1-555-0456",
        company: "TechStart",
        plan: "Business",
        status: "Active",
        joined: "2024-02-20",
        monthlySpend: 1200,
        domains: ["techstart.io", "app.techstart.io"],
        services: ["Web Hosting", "CDN"],
      },
      {
        id: "3",
        name: "Global Solutions",
        email: "info@globalsolutions.com",
        phone: "+1-555-0789",
        company: "Global Solutions LLC",
        plan: "Professional",
        status: "Active",
        joined: "2024-03-10",
        monthlySpend: 800,
        domains: ["globalsolutions.com"],
        services: ["Web Hosting"],
      },
    ]

    return NextResponse.json(mockClients)
  } catch (error) {
    console.error("Get clients error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Mock creation - return the data with an ID
    const newClient = {
      id: Date.now().toString(),
      ...data,
      joined: data.joined || new Date().toISOString().split("T")[0],
      domains: data.domains || [],
      services: data.services || [],
    }

    return NextResponse.json(newClient)
  } catch (error) {
    console.error("Create client error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
