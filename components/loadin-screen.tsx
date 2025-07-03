"use client"

import { useEffect, useState } from "react"
import { Shield, Server, Lock, Globe, Zap, Eye } from "lucide-react"

interface LoadingScreenProps {
  onLoadingComplete: () => void
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [particlePositions, setParticlePositions] = useState<Array<{
    left: string
    top: string
    delay: string
    duration: string
  }> | null>(null)

  const loadingSteps = [
    { icon: Shield, text: "Initializing Security Protocols", duration: 800 },
    { icon: Server, text: "Connecting to Secure Servers", duration: 600 },
    { icon: Lock, text: "Encrypting Data Channels", duration: 700 },
    { icon: Globe, text: "Establishing Global Network", duration: 500 },
    { icon: Zap, text: "Optimizing Performance", duration: 400 },
    { icon: Eye, text: "Activating Threat Detection", duration: 600 },
  ]

  useEffect(() => {
    // Generate stable particle positions on client-side only
    const positions = Array.from({ length: 20 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 2}s`,
      duration: `${2 + Math.random() * 2}s`,
    }))
    setParticlePositions(positions)

    let progressInterval: NodeJS.Timeout
    let stepTimeout: NodeJS.Timeout

    const startLoading = () => {
      progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval)
            setTimeout(() => onLoadingComplete(), 500)
            return 100
          }
          return prev + 1
        })
      }, 35)

      // Step progression
      const progressSteps = () => {
        if (currentStep < loadingSteps.length - 1) {
          stepTimeout = setTimeout(() => {
            setCurrentStep((prev) => prev + 1)
            progressSteps()
          }, loadingSteps[currentStep].duration)
        }
      }
      progressSteps()
    }

    startLoading()

    return () => {
      clearInterval(progressInterval)
      clearTimeout(stepTimeout)
    }
  }, [currentStep, onLoadingComplete])

  const CurrentIcon = loadingSteps[currentStep]?.icon || Shield

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>

        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
            {Array.from({ length: 96 }).map((_, i) => (
              <div
                key={i}
                className="border border-cyan-500/20 animate-pulse"
                style={{
                  animationDelay: `${i * 50}ms`,
                  animationDuration: "2s",
                }}
              />
            ))}
          </div>
        </div>

        {/* Floating Particles - Only render after positions are set */}
        <div className="absolute inset-0">
          {particlePositions?.map((pos, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-ping"
              style={{
                left: pos.left,
                top: pos.top,
                animationDelay: pos.delay,
                animationDuration: pos.duration,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Loading Content */}
      <div className="relative z-10 text-center max-w-md mx-auto px-6">
        {/* Logo */}
        <div className="mb-8">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-green-500 mx-auto mb-4 animate-pulse">
            <Shield className="h-8 w-8 text-white" />
            <Server className="absolute h-8 w-8 text-white opacity-50" />
          </div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-green-400">
            CyberShield
          </h1>
        </div>

        {/* Current Step */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500/20 to-green-500/20 flex items-center justify-center">
              <CurrentIcon className="h-6 w-6 text-cyan-400 animate-pulse" />
            </div>
          </div>
          <p className="text-gray-300 text-lg font-medium">{loadingSteps[currentStep]?.text || "Loading..."}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="w-full bg-gray-800 rounded-full h-2 mb-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-green-500 rounded-full transition-all duration-300 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            </div>
          </div>
          <p className="text-gray-400 text-sm">{progress}% Complete</p>
        </div>

        {/* Security Status */}
        <div className="grid grid-cols-3 gap-4 text-xs">
          <div className="flex flex-col items-center">
            <div className={`w-2 h-2 rounded-full mb-1 ${progress > 20 ? "bg-green-400" : "bg-gray-600"}`}></div>
            <span className="text-gray-400">Secure</span>
          </div>
          <div className="flex flex-col items-center">
            <div className={`w-2 h-2 rounded-full mb-1 ${progress > 60 ? "bg-green-400" : "bg-gray-600"}`}></div>
            <span className="text-gray-400">Encrypted</span>
          </div>
          <div className="flex flex-col items-center">
            <div className={`w-2 h-2 rounded-full mb-1 ${progress > 90 ? "bg-green-400" : "bg-gray-600"}`}></div>
            <span className="text-gray-400">Protected</span>
          </div>
        </div>
      </div>

      {/* Scanning Lines Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan"></div>
      </div>
    </div>
  )
}