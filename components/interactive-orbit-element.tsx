"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface InteractiveOrbitElementProps {
  position: [number, number, number]
  scale: number
  color: string
  delay: number
}

export default function InteractiveOrbitElement({
  position,
  scale,
  color,
  delay
}: InteractiveOrbitElementProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state, delta) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x += delta * 2
    meshRef.current.rotation.y += delta * 1.5
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + delay) * 0.2
    const targetScale = hovered ? scale * 1.5 : scale
    meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, delta * 5))
  })

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={scale}
      castShadow
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color={hovered ? "#ffffff" : color}
        emissive={hovered ? "#ffffff" : color}
        emissiveIntensity={hovered ? 0.8 : 0.5}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  )
}