/**
 * GalaxyBackground — runs INSIDE a <Canvas> (React Three Fiber)
 * Used by Hero. The standalone canvas version in App.jsx is replaced
 * by this R3F version so both live in the same WebGL context.
 */
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = `
  attribute float aScale;
  attribute vec3  aRandomness;
  uniform   float uTime;
  varying   vec3  vColor;

  void main() {
    vColor = color;
    vec4 modelPos = modelMatrix * vec4(position, 1.0);

    // Slow spin
    float angle  = atan(modelPos.x, modelPos.z);
    float radius = length(modelPos.xz);
    float newAngle = angle + uTime * 0.08;
    modelPos.x = cos(newAngle) * radius;
    modelPos.z = sin(newAngle) * radius;

    // Add randomness drift
    modelPos.xyz += aRandomness * 0.02 * sin(uTime * 0.3 + radius);

    vec4 viewPos = viewMatrix * modelPos;
    gl_Position  = projectionMatrix * viewPos;
    gl_PointSize = aScale * 2.5 * (1.0 / -viewPos.z);
  }
`

const fragmentShader = `
  varying vec3 vColor;
  void main() {
    float dist     = distance(gl_PointCoord, vec2(0.5));
    float strength = 1.0 - smoothstep(0.0, 0.5, dist);
    strength = pow(strength, 1.8);
    gl_FragColor   = vec4(vColor, strength);
  }
`

export default function GalaxyBackground() {
  const meshRef   = useRef()
  const matRef    = useRef()

  const COUNT    = 50000
  const RADIUS   = 8
  const BRANCHES = 3
  const SPIN     = 1.2
  const RAND_POW = 3

  const { positions, colors, scales, randomness } = useMemo(() => {
    const positions  = new Float32Array(COUNT * 3)
    const colors     = new Float32Array(COUNT * 3)
    const scales     = new Float32Array(COUNT)
    const randomness = new Float32Array(COUNT * 3)

    const innerColor = new THREE.Color('#ffc107')
    const outerColor = new THREE.Color('#1a0a3d')

    for (let i = 0; i < COUNT; i++) {
      const i3     = i * 3
      const radius = Math.random() * RADIUS
      const spin   = radius * SPIN
      const branch = ((i % BRANCHES) / BRANCHES) * Math.PI * 2

      const rx = Math.pow(Math.random(), RAND_POW) * (Math.random() < 0.5 ? 1 : -1) * 0.3 * radius
      const ry = Math.pow(Math.random(), RAND_POW) * (Math.random() < 0.5 ? 1 : -1) * 0.3 * radius
      const rz = Math.pow(Math.random(), RAND_POW) * (Math.random() < 0.5 ? 1 : -1) * 0.3 * radius

      positions[i3]     = Math.cos(branch + spin) * radius + rx
      positions[i3 + 1] = ry
      positions[i3 + 2] = Math.sin(branch + spin) * radius + rz

      randomness[i3]     = rx
      randomness[i3 + 1] = ry
      randomness[i3 + 2] = rz

      const mixed = innerColor.clone().lerp(outerColor, radius / RADIUS)
      colors[i3]     = mixed.r
      colors[i3 + 1] = mixed.g
      colors[i3 + 2] = mixed.b

      scales[i] = Math.random()
    }
    return { positions, colors, scales, randomness }
  }, [])

  useFrame((_, delta) => {
    if (matRef.current) matRef.current.uniforms.uTime.value += delta
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.02
  })

  return (
    <points ref={meshRef} rotation={[0.3, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position"   array={positions}  itemSize={3} count={COUNT} />
        <bufferAttribute attach="attributes-color"      array={colors}     itemSize={3} count={COUNT} />
        <bufferAttribute attach="attributes-aScale"     array={scales}     itemSize={1} count={COUNT} />
        <bufferAttribute attach="attributes-aRandomness" array={randomness} itemSize={3} count={COUNT} />
      </bufferGeometry>
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{ uTime: { value: 0 } }}
        vertexColors
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
