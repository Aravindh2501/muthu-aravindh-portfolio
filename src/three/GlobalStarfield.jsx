/**
 * GlobalStarfield — fixed full-page starfield with Milky Way band.
 * Realistic tiny pinpoint stars as seen from Earth.
 * Dense galactic band sweeps diagonally across the whole sky.
 */
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function GlobalStarfield() {
  const mountRef = useRef()

  useEffect(() => {
    const el = mountRef.current
    if (!el) return

    // ── Renderer ──────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setSize(el.clientWidth, el.clientHeight)
    renderer.setClearColor(0x020208, 1)
    el.appendChild(renderer.domElement)

    // ── Scene & Camera ────────────────────────────────────────────────────────
    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(90, el.clientWidth / el.clientHeight, 0.1, 1000)
    camera.position.set(0, 0, 0.1)

    const R = 500 // sky-sphere radius — camera is at centre

    // Shared sharp pinpoint vertex shader
    const vertShader = `
      attribute float size;
      attribute float alpha;
      attribute vec3  color;
      varying   float vAlpha;
      varying   vec3  vColor;
      void main() {
        vAlpha = alpha;
        vColor = color;
        vec4 mvPos   = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size;
        gl_Position  = projectionMatrix * mvPos;
      }
    `

    // Sharp pinpoint with tiny diffraction cross
    const fragShader = `
      varying float vAlpha;
      varying vec3  vColor;
      uniform float uTime;
      void main() {
        vec2  uv   = gl_PointCoord - vec2(0.5);
        float dist = length(uv);
        float core  = 1.0 - smoothstep(0.0, 0.36, dist);
        core = pow(core, 2.5);
        float spike = max(1.0 - abs(uv.x) * 20.0, 1.0 - abs(uv.y) * 20.0) * 0.12;
        spike = clamp(spike, 0.0, 1.0) * (1.0 - smoothstep(0.0, 0.48, dist));
        float brightness = core + spike;
        if (brightness < 0.01) discard;
        float twinkle = 0.82 + 0.18 * sin(uTime * (1.2 + vAlpha * 2.5) + vAlpha * 70.0);
        gl_FragColor = vec4(vColor, brightness * vAlpha * twinkle);
      }
    `

    function makeMat() {
      return new THREE.ShaderMaterial({
        uniforms:       { uTime: { value: 0 } },
        vertexShader:   vertShader,
        fragmentShader: fragShader,
        transparent:    true,
        depthWrite:     false,
        blending:       THREE.AdditiveBlending,
        vertexColors:   true,
      })
    }

    // ── Helper: random point on sphere surface ────────────────────────────────
    function randOnSphere() {
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      return [
        R * Math.sin(phi) * Math.cos(theta),
        R * Math.sin(phi) * Math.sin(theta),
        R * Math.cos(phi),
      ]
    }

    // ── Helper: random point in galactic band ─────────────────────────────────
    // Milky Way band tilted ~63° — gaussian thickness
    const BAND_TILT = Math.PI * 0.58
    function randInBand(spreadFactor = 1.0) {
      const along = Math.random() * Math.PI * 2
      // Box-Muller for gaussian perpendicular offset
      const u1 = Math.random(), u2 = Math.random()
      const gauss = Math.sqrt(-2 * Math.log(Math.max(u1, 1e-6))) * Math.cos(2 * Math.PI * u2)
      const perp  = gauss * 0.18 * spreadFactor

      const bx = Math.cos(along)
      const by = Math.sin(along)
      const bz = perp

      const ca = Math.cos(BAND_TILT), sa = Math.sin(BAND_TILT)
      return [
        bx * R,
        (by * ca - bz * sa) * R,
        (by * sa + bz * ca) * R,
      ]
    }

    // ── Star colour helper ────────────────────────────────────────────────────
    function starColor() {
      const t = Math.random()
      if (t < 0.10) return [0.55, 0.68, 1.00]  // blue-white (O/B)
      if (t < 0.22) return [0.85, 0.90, 1.00]  // white (A)
      if (t < 0.35) return [1.00, 0.97, 0.88]  // yellow-white (F)
      if (t < 0.55) return [1.00, 0.90, 0.65]  // warm yellow (G — Sun-like)
      if (t < 0.70) return [1.00, 0.72, 0.40]  // orange (K)
      if (t < 0.80) return [1.00, 0.45, 0.28]  // red giant (M)
      return [1.00, 1.00, 1.00]                 // white
    }

    // ── Build geometry helper ─────────────────────────────────────────────────
    function buildGeo(count, posFn, sizeMin, sizeMax, colorFn, alphaMin, alphaMax) {
      const pos    = new Float32Array(count * 3)
      const sizes  = new Float32Array(count)
      const colors = new Float32Array(count * 3)
      const alphas = new Float32Array(count)
      for (let i = 0; i < count; i++) {
        const [x, y, z] = posFn()
        pos[i * 3] = x; pos[i * 3 + 1] = y; pos[i * 3 + 2] = z
        sizes[i]   = sizeMin + Math.random() * (sizeMax - sizeMin)
        alphas[i]  = alphaMin + Math.random() * (alphaMax - alphaMin)
        const [r, g, b] = colorFn()
        colors[i * 3] = r; colors[i * 3 + 1] = g; colors[i * 3 + 2] = b
      }
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      geo.setAttribute('size',     new THREE.BufferAttribute(sizes, 1))
      geo.setAttribute('color',    new THREE.BufferAttribute(colors, 3))
      geo.setAttribute('alpha',    new THREE.BufferAttribute(alphas, 1))
      return geo
    }

    // ── LAYER 1: Background scatter — 8000 tiny stars all-sky ─────────────────
    const scatterGeo = buildGeo(8000, randOnSphere,  0.4, 1.2, starColor, 0.25, 0.85)
    const scatterMat = makeMat()
    scene.add(new THREE.Points(scatterGeo, scatterMat))

    // ── LAYER 2: Milky Way core stars — 20 000 micro-stars in band ───────────
    const mwGeo = buildGeo(20000, () => randInBand(1.0), 0.3, 0.95, starColor, 0.2, 0.75)
    const mwMat = makeMat()
    scene.add(new THREE.Points(mwGeo, mwMat))

    // ── LAYER 3: Dense inner core — extra concentration at centre of band ─────
    const coreGeo = buildGeo(8000, () => randInBand(0.4), 0.3, 0.85, () => {
      // Core is warmer / more golden
      const t = Math.random()
      if (t < 0.4) return [1.00, 0.88, 0.60]
      if (t < 0.6) return [1.00, 0.95, 0.80]
      return [0.80, 0.85, 1.00]
    }, 0.15, 0.55)
    const coreMat = makeMat()
    scene.add(new THREE.Points(coreGeo, coreMat))

    // ── LAYER 4: Milky Way haze — soft blurry glow giving the milky look ─────
    ;(function() {
      const count = 4000
      const pos    = new Float32Array(count * 3)
      const sizes  = new Float32Array(count)
      const colors = new Float32Array(count * 3)
      const alphas = new Float32Array(count)
      for (let i = 0; i < count; i++) {
        const [x, y, z] = randInBand(1.2)
        pos[i * 3] = x; pos[i * 3 + 1] = y; pos[i * 3 + 2] = z
        sizes[i]   = 4.0 + Math.random() * 6.0   // large blurry blobs
        alphas[i]  = 0.008 + Math.random() * 0.022
        // Milky warm white-cream
        colors[i * 3] = 0.90; colors[i * 3 + 1] = 0.85; colors[i * 3 + 2] = 0.78
      }
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      geo.setAttribute('size',     new THREE.BufferAttribute(sizes, 1))
      geo.setAttribute('color',    new THREE.BufferAttribute(colors, 3))
      geo.setAttribute('alpha',    new THREE.BufferAttribute(alphas, 1))

      // Haze uses a soft gaussian blob fragment shader
      const mat = new THREE.ShaderMaterial({
        uniforms:     { uTime: { value: 0 } },
        vertexShader: vertShader,
        fragmentShader: `
          varying float vAlpha;
          varying vec3  vColor;
          uniform float uTime;
          void main() {
            float dist = length(gl_PointCoord - vec2(0.5));
            float s = 1.0 - smoothstep(0.0, 0.5, dist);
            s = pow(s, 0.5);
            if (s < 0.005) discard;
            gl_FragColor = vec4(vColor, s * vAlpha);
          }
        `,
        transparent:  true,
        depthWrite:   false,
        blending:     THREE.AdditiveBlending,
        vertexColors: true,
      })
      scene.add(new THREE.Points(geo, mat))
    })()

    // ── LAYER 5: Bright foreground stars — 60 slightly larger pinpoints ───────
    const brightGeo = buildGeo(60, randOnSphere, 1.6, 3.0, starColor, 0.7, 1.0)
    const brightMat = makeMat()
    scene.add(new THREE.Points(brightGeo, brightMat))

    // ── Mouse parallax ────────────────────────────────────────────────────────
    const mouse = { x: 0, y: 0 }
    const onMove = (e) => {
      mouse.x =  (e.clientX / window.innerWidth  - 0.5) * 2
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    // ── Resize ────────────────────────────────────────────────────────────────
    const onResize = () => {
      camera.aspect = el.clientWidth / el.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(el.clientWidth, el.clientHeight)
    }
    window.addEventListener('resize', onResize)

    // ── Animation loop ────────────────────────────────────────────────────────
    let rafId
    const clock  = new THREE.Clock()
    let rotX = 0, rotY = 0

    const allMats = [scatterMat, mwMat, coreMat, brightMat]

    const tick = () => {
      rafId = requestAnimationFrame(tick)
      const t = clock.getElapsedTime()

      allMats.forEach(m => { m.uniforms.uTime.value = t })

      // Smooth mouse → tiny sky rotation (parallax)
      rotX += (mouse.y * 0.035 - rotX) * 0.025
      rotY += (mouse.x * 0.035 - rotY) * 0.025

      // Very slow sidereal drift
      scene.rotation.y = rotY + t * 0.0012
      scene.rotation.x = rotX

      renderer.render(scene, camera)
    }
    tick()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{
        position:      'fixed',
        inset:         0,
        zIndex:        0,
        pointerEvents: 'none',
        background:    '#020208',
      }}
    />
  )
}
