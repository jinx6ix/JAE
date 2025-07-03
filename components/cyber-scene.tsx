"use client"

import { Canvas } from "@react-three/fiber"
import { Suspense, useRef } from "react"
import CyberSceneContent from "./cyber-scene-content"
import { Loader } from "@react-three/drei"
import { useTheme } from "next-themes"

export default function CyberScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  return (
    <>
      <Canvas
        ref={canvasRef}
        shadows
        camera={{ position: [0, 3, 12], fov: 50 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
        dpr={[1, 2]}
        className="bg-gradient-to-br from-gray-900 via-black to-gray-900"
      >
        <color attach="background" args={theme === 'dark' ? ['#000000'] : ['#f0f0f0']} />
        <Suspense fallback={null}>
          <CyberSceneContent theme={theme} />
        </Suspense>
      </Canvas>
      <Loader
        containerStyles={{
          background: 'transparent'
        }}
        innerStyles={{
          backgroundColor: '#06b6d4', // cyan-500
          width: '100%',
          height: '2px'
        }}
        barStyles={{
          backgroundColor: '#22c55e', // green-500
          height: '2px'
        }}
        dataStyles={{
          color: '#a1a1aa' // gray-400
        }}
      />
    </>
  )
}