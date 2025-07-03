import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // Mock server data
    const mockServers = [
      {
        id: "1",
        name: "Web-01",
        type: "Web Server",
        location: "US-East-1",
        ip: "192.168.1.10",
        cpu: 45,
        memory: 62,
        disk: 78,
        bandwidth: 85,
        status: "Healthy",
        uptime: 99.9,
        clients: ["1", "2"],
        lastMaintenance: "2024-11-01",
      },
      {
        id: "2",
        name: "DB-01",
        type: "Database Server",
        location: "US-West-1",
        ip: "192.168.1.20",
        cpu: 32,
        memory: 58,
        disk: 45,
        bandwidth: 67,
        status: "Healthy",
        uptime: 99.8,
        clients: ["1"],
        lastMaintenance: "2024-10-15",
      },
      {
        id: "3",
        name: "CDN-01",
        type: "CDN Edge",
        location: "EU-West-1",
        ip: "192.168.1.30",
        cpu: 28,
        memory: 45,
        disk: 35,
        bandwidth: 92,
        status: "Healthy",
        uptime: 99.95,
        clients: ["2", "3"],
        lastMaintenance: "2024-11-10",
      },
    ]

    return NextResponse.json(mockServers)
  } catch (error) {
    console.error("Get servers error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Mock creation
    const newServer = {
      id: Date.now().toString(),
      ...data,
      clients: data.clients || [],
      lastMaintenance: new Date().toISOString().split("T")[0],
    }

    return NextResponse.json(newServer)
  } catch (error) {
    console.error("Create server error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
