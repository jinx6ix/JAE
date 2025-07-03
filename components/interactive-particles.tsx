"use client"

import { useRef, useMemo } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

interface InteractiveParticlesProps {
  count?: number
}

interface ParticleData {
  position: [number, number, number]
  size: number
  speed: number
  offset: number
  color: string
}

export default function InteractiveParticles({ count = 200 }: InteractiveParticlesProps) {
  const particlesRef = useRef<THREE.Group>(null)
  const { mouse, viewport } = useThree()

  const particles = useMemo<ParticleData[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      ],
      size: Math.random() * 0.05 + 0.02,
      speed: Math.random() * 0.3 + 0.1,
      offset: Math.random() * Math.PI * 2,
      color: i % 4 === 0 ? "#00ffaa" : i % 4 === 1 ? "#0088ff" : i % 4 === 2 ? "#ff00aa" : "#ffffff",
    }))
  }, [count])

  useFrame((state, delta) => {
    if (!particlesRef.current) return

    const mouseInfluence = 2
    const mouseX = (mouse.x * viewport.width) / 2
    const mouseY = (mouse.y * viewport.height) / 2

    particlesRef.current.children.forEach((particle, i) => {
      const data = particles[i]
      const distanceToMouse = Math.sqrt(
        Math.pow(particle.position.x - mouseX, 2) + 
        Math.pow(particle.position.y - mouseY, 2)
      )

      if (distanceToMouse < 3) {
        particle.position.x += (mouseX - particle.position.x) * delta * 0.5
        particle.position.y += (mouseY - particle.position.y) * delta * 0.5
      }

      particle.position.y += Math.sin(state.clock.elapsedTime * data.speed + data.offset) * delta * 0.1
      particle.position.x += Math.cos(state.clock.elapsedTime * data.speed + data.offset) * delta * 0.05

      // Boundary wrapping
      if (particle.position.x > 10) particle.position.x = -10
      if (particle.position.x < -10) particle.position.x = 10
      if (particle.position.y > 10) particle.position.y = -10
      if (particle.position.y < -10) particle.position.y = 10
    })
  })

  return (
    <group ref={particlesRef}>
      {particles.map((particle, i) => (
        <mesh key={i} position={particle.position}>
          <sphereGeometry args={[particle.size, 8, 8]} />
          <meshStandardMaterial
            color={particle.color}
            emissive={particle.color}
            emissiveIntensity={0.8}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  )
}