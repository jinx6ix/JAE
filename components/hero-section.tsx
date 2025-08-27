"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useIsMobile } from "@/hooks/use-mobile"

export default function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 to-black">
      {/* Animated grid background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3e6b8b,transparent)]"></div>
      </div>

      {/* Animated elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '2s'}}></div>

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
          
          {/* Server Visualization */}
          <div className="flex justify-center items-center p-8">
            <div className="relative w-full max-w-md">
              {/* Server rack illustration */}
              <div className="bg-gray-800 rounded-lg p-4 border border-cyan-500/30 shadow-lg shadow-cyan-500/20">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-cyan-400 text-sm font-mono">SERVER RACK 01</div>
                </div>
                
                {/* Server units */}
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="bg-gray-900 rounded p-3 border border-gray-700 flex items-center">
                      <div className="w-4 h-4 bg-cyan-500 rounded-sm mr-3 animate-pulse"></div>
                      <div className="flex-1">
                        <div className="h-2 bg-gray-700 rounded-full w-3/4 mb-2"></div>
                        <div className="h-1 bg-gray-800 rounded-full w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Status bar */}
                <div className="mt-4 pt-2 border-t border-gray-700 flex justify-between items-center text-xs text-cyan-400 font-mono">
                  <span>STATUS: ONLINE</span>
                  <span>100% UPTIME</span>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-cyan-500/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-green-500/10 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}