"use client"

import { useState, useEffect } from "react"
import { Globe, Check, X, Clock, Server } from "lucide-react"

type DataCenter = {
  id: string
  location: string
  status: "online" | "degraded" | "offline"
  latency: number
  capacity: number
}

export default function AvailabilityChecker() {
  const [dataCenters, setDataCenters] = useState<DataCenter[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API fetch
    const fetchData = async () => {
      setLoading(true)
      // Mock data - in a real app you would fetch this from your API
      const mockData: DataCenter[] = [
        { id: "nyc1", location: "New York, USA", status: "online", latency: 28, capacity: 85 },
        { id: "lon1", location: "London, UK", status: "online", latency: 42, capacity: 72 },
        { id: "sgp1", location: "Singapore", status: "degraded", latency: 68, capacity: 92 },
        { id: "syd1", location: "Sydney, Australia", status: "online", latency: 145, capacity: 65 },
        { id: "fra1", location: "Frankfurt, Germany", status: "online", latency: 35, capacity: 78 },
        { id: "blr1", location: "Bangalore, India", status: "offline", latency: 0, capacity: 0 },
      ]
      
      setTimeout(() => {
        setDataCenters(mockData)
        setLoading(false)
      }, 800)
    }

    fetchData()
    const interval = setInterval(fetchData, 30000) // Refresh every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch(status) {
      case "online": return "text-green-500"
      case "degraded": return "text-yellow-500"
      case "offline": return "text-red-500"
      default: return "text-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch(status) {
      case "online": return <Check className="h-4 w-4" />
      case "degraded": return <Clock className="h-4 w-4" />
      case "offline": return <X className="h-4 w-4" />
      default: return <Server className="h-4 w-4" />
    }
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="grid grid-cols-12 bg-muted p-4 font-medium">
        <div className="col-span-4">Location</div>
        <div className="col-span-2 text-center">Status</div>
        <div className="col-span-2 text-center">Latency</div>
        <div className="col-span-2 text-center">Capacity</div>
        <div className="col-span-2 text-center">Deploy</div>
      </div>
      {loading ? (
        <div className="p-8 text-center">Loading data center status...</div>
      ) : (
        <div className="divide-y">
          {dataCenters.map((dc) => (
            <div key={dc.id} className="grid grid-cols-12 p-4 items-center">
              <div className="col-span-4 flex items-center">
                <Globe className="h-5 w-5 mr-3 text-muted-foreground" />
                <span>{dc.location}</span>
              </div>
              <div className={`col-span-2 flex items-center justify-center ${getStatusColor(dc.status)}`}>
                {getStatusIcon(dc.status)}
                <span className="ml-2 capitalize">{dc.status}</span>
              </div>
              <div className="col-span-2 text-center">
                {dc.latency > 0 ? `${dc.latency}ms` : "-"}
              </div>
              <div className="col-span-2 text-center">
                {dc.capacity > 0 ? (
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${
                        dc.capacity > 90 ? "bg-red-500" : 
                        dc.capacity > 75 ? "bg-yellow-500" : "bg-green-500"
                      }`} 
                      style={{ width: `${dc.capacity}%` }}
                    ></div>
                  </div>
                ) : "-"}
              </div>
              <div className="col-span-2 text-center">
                <button 
                  className={`px-3 py-1 rounded text-sm ${
                    dc.status === "online" 
                      ? "bg-primary text-white hover:bg-primary/90" 
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                  disabled={dc.status !== "online"}
                >
                  Deploy
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="p-4 bg-muted text-sm text-muted-foreground">
        <p>Last updated: {new Date().toLocaleTimeString()}</p>
      </div>
    </div>
  )
}