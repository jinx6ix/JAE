"use client"

import * as THREE from "three"
import { OrbitControls } from 'three-stdlib'
import { useEffect, useRef } from "react"

interface ServerRackSceneProps {
  containerRef: React.RefObject<HTMLDivElement | null>
}

export default function ServerRackScene({ containerRef }: ServerRackSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = null
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    )
    camera.position.z = 5

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mountRef.current.appendChild(renderer.domElement)

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = false
    controls.autoRotate = true
    controls.autoRotateSpeed = 1

    // Create server rack model
    const createServerRack = () => {
      const serverGroup = new THREE.Group()

      // Rack frame
      const rackGeometry = new THREE.BoxGeometry(3, 4, 1)
      const rackMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x333333, 
        flatShading: true,
        shininess: 100
      })
      const rack = new THREE.Mesh(rackGeometry, rackMaterial)
      serverGroup.add(rack)

      // Servers
      const serverCount = 8
      const serverHeight = 0.4
      const serverGeometry = new THREE.BoxGeometry(2.8, serverHeight, 0.9)

      for (let i = 0; i < serverCount; i++) {
        const serverMaterial = new THREE.MeshPhongMaterial({
          color: i % 2 === 0 ? 0x3a86ff : 0x4361ee,
          flatShading: true,
          emissive: i % 2 === 0 ? 0x3a86ff : 0x4361ee,
          emissiveIntensity: 0.1
        })
        const server = new THREE.Mesh(serverGeometry, serverMaterial)
        server.position.y = -1.8 + i * (serverHeight + 0.1)
        serverGroup.add(server)

        // Server lights
        const lightGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.1)
        const lightMaterial = new THREE.MeshBasicMaterial({ 
          color: 0x00ff00,
          toneMapped: false
        })
        const light1 = new THREE.Mesh(lightGeometry, lightMaterial)
        light1.position.set(1.2, -1.8 + i * (serverHeight + 0.1), 0.5)
        serverGroup.add(light1)

        const light2 = new THREE.Mesh(lightGeometry, lightMaterial)
        light2.position.set(1.0, -1.8 + i * (serverHeight + 0.1), 0.5)
        serverGroup.add(light2)
      }

      // Shield
      const shieldGeometry = new THREE.CircleGeometry(1.5, 32)
      const shieldMaterial = new THREE.MeshPhongMaterial({
        color: 0x4cc9f0,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide,
        emissive: 0x4cc9f0,
        emissiveIntensity: 0.2
      })
      const shield = new THREE.Mesh(shieldGeometry, shieldMaterial)
      shield.position.z = 1.5
      shield.rotation.x = Math.PI / 2
      serverGroup.add(shield)

      return serverGroup
    }

    const serverRack = createServerRack()
    scene.add(serverRack)
    serverRack.rotation.x = 0.2

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    const pointLight = new THREE.PointLight(0x4cc9f0, 1, 10)
    pointLight.position.set(0, 0, 3)
    scene.add(pointLight)

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      const shield = serverRack.children.find(
        child => child.type === "Mesh" && (child as THREE.Mesh).geometry.type === "CircleGeometry"
      ) as THREE.Mesh | undefined
      if (shield) {
        shield.rotation.z += 0.01
      }
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    }
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement)
      }
      window.removeEventListener("resize", handleResize)
    }
  }, [containerRef])

  return <div ref={mountRef} className="w-full h-full" />
}