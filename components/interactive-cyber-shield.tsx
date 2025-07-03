"use client"

import { useRef, useState } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import InteractiveOrbitElement from "./interactive-orbit-element"
import InteractiveDataStreams from "./interactive-data-streams"
import { Html } from "@react-three/drei"

// In interactive-cyber-shield.tsx
interface InteractiveCyberShieldProps {
  position: [number, number, number] // or Vector3 if you prefer
  primaryColor?: string
  secondaryColor?: string
}

export default function InteractiveCyberShield({ position = [0, 0, 0] }: InteractiveCyberShieldProps) {
  const shieldRef = useRef<THREE.Mesh>(null)
  const coreRef = useRef<THREE.Mesh>(null)
  const orbitRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const { mouse, viewport } = useThree()

  useFrame((state, delta) => {
    const mouseInfluence = 0.1
    const mouseX = (mouse.x * viewport.width) / 2
    const mouseY = (mouse.y * viewport.height) / 2

    if (shieldRef.current) {
      shieldRef.current.rotation.y += delta * 0.2 + mouseX * mouseInfluence * 0.01
      shieldRef.current.rotation.x = mouseY * mouseInfluence * 0.01
    }
    if (coreRef.current) {
      coreRef.current.rotation.y -= delta * 0.5 + mouseX * mouseInfluence * 0.02
      coreRef.current.rotation.z += delta * 0.1
      const targetScale = hovered ? 1.3 : clicked ? 1.5 : 1
      coreRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 5)
    }
    if (orbitRef.current) {
      orbitRef.current.rotation.z += delta * 0.15 + mouseX * mouseInfluence * 0.005
      orbitRef.current.rotation.x -= delta * 0.1 + mouseY * mouseInfluence * 0.005
    }
  })

  const handleClick = () => {
    setClicked(true)
    setTimeout(() => setClicked(false), 500)
  }

  return (
    <group position={position}>
      {/* Interactive Core sphere */}
      <mesh
        ref={coreRef}
        castShadow
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={handleClick}
      >
        <sphereGeometry args={[1.2, 64, 64]} />
        <meshStandardMaterial
          color={hovered ? "#00ff00" : clicked ? "#ff0000" : "#00ffaa"}
          emissive={hovered ? "#00ff00" : clicked ? "#ff0000" : "#00ffaa"}
          emissiveIntensity={hovered ? 0.8 : clicked ? 1.0 : 0.5}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Shield layers */}
      <mesh ref={shieldRef}>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshStandardMaterial
          color="#0088ff"
          emissive="#0088ff"
          emissiveIntensity={hovered ? 0.4 : 0.2}
          transparent
          opacity={hovered ? 0.5 : 0.3}
          wireframe
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[2.2, 24, 24]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={hovered ? 0.1 : 0.05} wireframe />
      </mesh>

      {/* Orbiting elements */}
      <group ref={orbitRef}>
        {[...Array(12)].map((_, i) => {
          const angle = (i / 12) * Math.PI * 2
          const radius = 3 + Math.sin(i) * 0.5
          const x = Math.cos(angle) * radius
          const z = Math.sin(angle) * radius
          const scale = 0.1 + Math.random() * 0.2

          return (
            <InteractiveOrbitElement
              key={i}
              position={[x, Math.sin(angle * 2) * 0.5, z]}
              scale={scale}
              color={i % 3 === 0 ? "#00ffaa" : i % 3 === 1 ? "#0088ff" : "#ff00aa"}
              delay={i * 0.1}
            />
          )
        })}
      </group>

      <InteractiveDataStreams />

      {hovered && (
        <Html position={[0, 3, 0]} center>
          <div className="bg-black/80 px-4 py-2 rounded-lg border border-cyan-500/50">
            <p className="text-cyan-400 text-sm font-medium">Security Core Active</p>
          </div>
        </Html>
      )}
    </group>
  )
}