/**
 * Starfield — runs inside <Canvas>
 * mouseNorm: { x, y } in [-1, 1] — drives parallax
 */
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const COUNT = 3000

export default function Starfield({ mouseNorm }) {
  const meshRef = useRef()
  const target  = useRef({ x: 0, y: 0 })

  const { positions, sizes } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3)
    const sizes     = new Float32Array(COUNT)
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 40
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40
      sizes[i]              = Math.random() * 1.5 + 0.3
    }
    return { positions, sizes }
  }, [])

  useFrame((_, delta) => {
    if (!meshRef.current) return

    // Smooth mouse lerp for parallax
    const norm = mouseNorm?.current?.normalised ?? mouseNorm ?? { x: 0, y: 0 }
    target.current.x += (norm.x * 0.3 - target.current.x) * 0.05
    target.current.y += (norm.y * 0.3 - target.current.y) * 0.05

    meshRef.current.rotation.x = target.current.y * 0.1
    meshRef.current.rotation.y += delta * 0.01 + target.current.x * 0.002
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} itemSize={3} count={COUNT} />
        <bufferAttribute attach="attributes-size"     array={sizes}     itemSize={1} count={COUNT} />
      </bufferGeometry>
      <pointsMaterial
        color="#ffffff"
        size={0.06}
        sizeAttenuation
        transparent
        opacity={0.6}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
