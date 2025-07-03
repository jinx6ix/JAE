"use client"

import { EffectComposer, Bloom, Noise } from "@react-three/postprocessing"
import { OrbitControls, Environment } from "@react-three/drei"
import InteractiveCyberShield from "./interactive-cyber-shield"
import InteractiveParticles from "./interactive-particles"
import EnhancedGrid from "./enhanced-grid"
import { useTheme } from "next-themes"

interface CyberSceneContentProps {
  theme?: string
}

export default function CyberSceneContent({ theme }: CyberSceneContentProps) {
  const isDark = theme === 'dark'
  const primaryColor = isDark ? '#3a86ff' : '#2563eb'
  const secondaryColor = isDark ? '#4cc9f0' : '#0891b2'
  const accentColor = isDark ? '#00ffaa' : '#00b386'
  const gridLineColor = isDark ? '#4cc9f050' : '#0891b250'

  return (
    <>
      <InteractiveCyberShield position={[0, 0, 0]} />
      
      <InteractiveParticles count={200} />
      
      <EnhancedGrid lineColor={gridLineColor} />

      {/* Lighting setup */}
      <ambientLight intensity={isDark ? 0.03 : 0.1} />
      <spotLight 
        position={[15, 15, 15]} 
        angle={0.15} 
        penumbra={1} 
        intensity={isDark ? 1.5 : 1.2} 
        color={secondaryColor}
        castShadow 
        shadow-mapSize={2048} 
      />
      <pointLight 
        position={[-8, 8, -8]} 
        color={accentColor} 
        intensity={1.2} 
      />
      <pointLight 
        position={[8, -8, 8]} 
        color={primaryColor} 
        intensity={1.2} 
      />
      <pointLight 
        position={[0, 0, 10]} 
        color={secondaryColor} 
        intensity={0.8} 
      />

      <Environment preset={isDark ? "night" : "dawn"} />
      
      <EffectComposer>
        <Bloom 
          luminanceThreshold={0.1} 
          luminanceSmoothing={0.9} 
          height={300} 
          intensity={isDark ? 1.2 : 0.8}
        />
        <Noise 
          opacity={isDark ? 0.03 : 0.02} 
          premultiply
        />
      </EffectComposer>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 4}
        enableDamping
        dampingFactor={0.05}
      />
    </>
  )
}