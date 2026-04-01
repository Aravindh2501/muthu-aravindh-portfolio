import { useEffect, useRef } from 'react'

export default function FireSnakeCursor() {
  const headRef = useRef(null)
  const segmentsRef = useRef([])
  const mousePos = useRef({ x: 0, y: 0 })
  // 20 segments is plenty for a small, tight tail
  const history = useRef(Array(20).fill({ x: 0, y: 0 })) 
  const rafRef = useRef(null)

  useEffect(() => {
    const segments = segmentsRef.current

    const onMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
    }

    const animate = () => {
      // 0.25 factor for a slightly snappier, more responsive feel
      const headX = history.current[0].x + (mousePos.current.x - history.current[0].x) * 0.25
      const headY = history.current[0].y + (mousePos.current.y - history.current[0].y) * 0.25

      history.current.unshift({ x: headX, y: headY })
      history.current.pop()

      if (headRef.current) {
        headRef.current.style.transform = `translate3d(${headX}px, ${headY}px, 0)`
      }

      segments.forEach((seg, index) => {
        if (!seg) return
        
        const point = history.current[index]
        const scale = Math.max(0, 1 - (index / history.current.length))
        
        // Slightly tighter color transition
        const hue = 45 - (index * 2.2) 
        
        seg.style.transform = `translate3d(${point.x}px, ${point.y}px, 0) scale(${scale})`
        seg.style.backgroundColor = `hsl(${hue}, 100%, 55%)`
        // Smaller glow radius for the "small ball" look
        seg.style.boxShadow = `0 0 ${12 * scale}px hsl(${hue}, 100%, 50%)`
        seg.style.opacity = scale * 0.8
      })

      rafRef.current = requestAnimationFrame(animate)
    }

    animate()
    window.addEventListener('mousemove', onMouseMove)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      {/* THE SMALL PLASMA CORE */}
      <div ref={headRef} className="fire-head" />

      {/* THE TIGHT BODY */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          ref={(el) => (segmentsRef.current[i] = el)}
          className="fire-segment"
          style={{
            position: 'fixed',
            top: -5, // Half of width to center
            left: -5,
            width: '10px', // Shrinked from 20px to 10px
            height: '10px',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 999 - i,
            willChange: 'transform',
            mixBlendMode: 'screen',
          }}
        />
      ))}

      <style jsx global>{`
        .fire-head {
          position: fixed;
          top: -6px; /* Half of 12px */
          left: -6px;
          width: 12px; /* Smaller core */
          height: 12px;
          background: radial-gradient(circle, #fff 0%, #ffc107 60%, transparent 100%);
          border-radius: 50%;
          pointer-events: none;
          z-index: 1000;
          will-change: transform;
          filter: blur(1px);
        }
        
        body, a, button {
          cursor: none !important;
        }

        .fire-head {
          animation: pulse 1s infinite alternate ease-in-out;
        }

        @keyframes pulse {
          0% { transform: scale(1); filter: blur(1px) brightness(1); }
          100% { transform: scale(1.2); filter: blur(2px) brightness(1.3); }
        }
      `}</style>
    </>
  )
}