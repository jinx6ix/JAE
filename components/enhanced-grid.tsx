"use client"

import { useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

interface EnhancedGridProps {
  lineColor?: string
}

export default function EnhancedGrid({ lineColor = '#0088ff' }: EnhancedGridProps) {
  const gridRef = useRef<THREE.Mesh>(null)
  const { mouse } = useThree()

  useFrame((state, delta) => {
    if (!gridRef.current || !(gridRef.current.material instanceof THREE.Material)) return
    const pulse = Math.sin(state.clock.elapsedTime * 0.5) * 0.5 + 0.5
    const mouseInfluence = Math.abs(mouse.x) + Math.abs(mouse.y)
    gridRef.current.material.opacity = 0.2 + pulse * 0.1 + mouseInfluence * 0.1
  })

  return (
    <group position={[0, -4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <gridHelper args={[50, 50, lineColor, lineColor]} />
      <mesh ref={gridRef} receiveShadow position={[0, -0.01, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial
          color="#000000"
          metalness={0.8}
          roughness={0.5}
          opacity={0.3}
          transparent
          emissive={lineColor}
          emissiveIntensity={0.05}
        />
      </mesh>

      {/* Grid markers */}
      {[5, 10, 15, 20, 25].map((radius, i) => (
        <mesh key={i} position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[radius - 0.1, radius, 64]} />
          <meshBasicMaterial color={lineColor} transparent opacity={0.4 - i * 0.06} />
        </mesh>
      ))}
    </group>
  )
}