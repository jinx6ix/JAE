"use client"

import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useIsMobile } from "@/hooks/use-mobile"
import LoadingScreen from "@/components/loadin-screen"
import CyberScene from "@/components/cyber-scene"
import ServerRackScene from "@/components/server-rack-scene"

export default function HeroSection() {
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const isMobile = useIsMobile()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLoadingComplete = () => {
    setLoading(false)
  }

  if (loading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />
  }

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Interactive 3D Background */}
      {mounted && (
        <div className="absolute inset-0 z-0">
          <CyberScene />
        </div>
      )}

      {/* Content */}
      <div className="container px-4 md:px-6 py-12 md:py-24 lg:py-32 relative z-10 h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center w-full">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-green-400">
                Secure Hosting for the Modern Web
              </h1>
              <p className="max-w-[600px] text-gray-300 md:text-xl">
                Professional web hosting with enterprise-grade cybersecurity. Keep your website fast, reliable, and
                protected.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" asChild className="bg-gradient-to-r from-cyan-600 to-green-600 hover:from-cyan-700 hover:to-green-700">
                <Link href="/web-hosting">Explore Hosting</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-cyan-400 border-cyan-400 hover:bg-cyan-400/10">
                <Link href="/cybersecurity">Cybersecurity Solutions</Link>
              </Button>
            </div>
          </div>
          
          {/* Server Rack Visualization */}
          <div
            ref={containerRef}
            className={`w-full ${isMobile ? "h-[300px]" : "h-[500px]"}`}
          >
            <ServerRackScene containerRef={containerRef} />
          </div>
        </div>
      </div>
    </section>
  )
}