/**
 * RobotScene — Spline robot rendered as a React component (not inside Canvas)
 * Sits alongside the Canvas in the Hero grid column.
 * Mouse tracking is handled via CSS transform for smooth head-follow effect.
 */
import { Suspense, useRef, useEffect, lazy } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'

const Spline = lazy(() => import('@splinetool/react-spline'))

function SplineLoader() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 rounded-full border-2 border-transparent"
          style={{
            borderTopColor: '#ffc107',
            borderRightColor: 'rgba(255,193,7,0.3)',
          }}
        />
        <span
          className="font-mono text-xs tracking-widest uppercase"
          style={{ color: 'rgba(255,193,7,0.4)' }}
        >
          Loading Robot...
        </span>
      </div>
    </div>
  )
}

export default function RobotScene({ mousePos }) {
  const containerRef = useRef()

  // Smooth spring for subtle tilt following mouse
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    let rafId
    let currentX = 0
    let currentY = 0

    const animate = () => {
      // mousePos is the ref from useMousePosition
      const norm = mousePos?.current?.normalised ?? { x: 0, y: 0 }
      currentX += (norm.x * 5 - currentX) * 0.06
      currentY += (-norm.y * 5 - currentY) * 0.06
      el.style.transform = `rotateY(${currentX}deg) rotateX(${currentY}deg)`
      rafId = requestAnimationFrame(animate)
    }

    animate()
    return () => cancelAnimationFrame(rafId)
  }, [mousePos])

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      style={{ transformStyle: 'preserve-3d', transformOrigin: 'center center' }}
    >
      <Suspense fallback={<SplineLoader />}>
        <Spline
          scene="https://prod.spline.design/qXjQGhknmeyzo01o/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </Suspense>
    </div>
  )
}
