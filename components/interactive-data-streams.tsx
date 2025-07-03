"use client"

import { useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

export default function InteractiveDataStreams() {
  const streamsRef = useRef<THREE.Group>(null)
  const { mouse } = useThree()

  useFrame((state, delta) => {
    if (streamsRef.current) {
      streamsRef.current.rotation.y += delta * 0.3 + mouse.x * 0.1
      streamsRef.current.rotation.x += mouse.y * 0.05
    }
  })

  return (
    <group ref={streamsRef}>
      {Array.from({ length: 30 }).map((_, i) => {
        // Calculate curve parameters
        const startAngle = (i / 30) * Math.PI * 2
        const endAngle = startAngle + Math.PI * 0.3
        const radius = 1.5 + (i % 3) * 0.5
        const height = -1 + (i % 5) * 0.4

        // Calculate start and end points
        const startX = Math.cos(startAngle) * radius
        const startZ = Math.sin(startAngle) * radius
        const endX = Math.cos(endAngle) * radius
        const endZ = Math.sin(endAngle) * radius

        // Create points along the curve
        const points = []
        const segments = 15

        for (let j = 0; j <= segments; j++) {
          const t = j / segments
          points.push(
            new THREE.Vector3(
              startX + (endX - startX) * t,
              height + Math.sin(t * Math.PI) * 0.4,
              startZ + (endZ - startZ) * t
            )
          )
        }

        // Create the curve
        const curve = new THREE.CatmullRomCurve3(points)

        // Determine color based on index
        const color = i % 3 === 0 ? "#00ffaa" : i % 3 === 1 ? "#0088ff" : "#ff00aa"

        return (
          <mesh key={`stream-${i}`}>
            <tubeGeometry args={[curve, 25, 0.015, 8, false]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.8}
              transparent
              opacity={0.7}
            />
          </mesh>
        )
      })}s
    </group>
  )
}