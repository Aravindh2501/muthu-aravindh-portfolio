import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Loader({ onComplete }) {
  const loaderRef = useRef(null)
  const textRef = useRef(null)
  const lineRef = useRef(null)
  const percentRef = useRef(null)
  const counterRef = useRef({ val: 0 })

  useEffect(() => {
    const tl = gsap.timeline()

    tl.fromTo(textRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    )
    .to(counterRef.current, {
      val: 100,
      duration: 2.2,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (percentRef.current) {
          percentRef.current.textContent = Math.round(counterRef.current.val) + '%'
        }
      }
    }, '<')
    .to(lineRef.current, {
      scaleX: 1,
      duration: 2.2,
      ease: 'power2.inOut'
    }, '<')
    .to(loaderRef.current, {
      yPercent: -100,
      duration: 1,
      ease: 'power4.inOut',
      delay: 0.3,
      onComplete
    })

    return () => tl.kill()
  }, [])

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#020208' }}
    >
      {/* Background stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(80)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1 + 'px',
              height: Math.random() * 2 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              opacity: Math.random() * 0.7 + 0.1,
              animation: `glowPulse ${Math.random() * 3 + 2}s ease-in-out infinite`,
              animationDelay: Math.random() * 2 + 's',
            }}
          />
        ))}
      </div>

      <div ref={textRef} className="text-center relative z-10" style={{ opacity: 0 }}>
        {/* Logo / Name */}
        <div className="mb-2">
          <span
            className="font-display font-bold tracking-wider"
            style={{
              fontSize: 'clamp(1rem, 3vw, 1.2rem)',
              color: 'rgba(255,193,7,0.6)',
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
            }}
          >
            Loading Portfolio
          </span>
        </div>
        <h1
          className="loader-text font-display font-bold mb-8"
          style={{ lineHeight: 1.1 }}
        >
          Muthu Aravindh
        </h1>

        {/* Progress bar */}
        <div className="relative w-64 h-px mx-auto mb-4" style={{ background: 'rgba(255,193,7,0.15)' }}>
          <div
            ref={lineRef}
            className="absolute inset-0 origin-left"
            style={{
              background: 'linear-gradient(90deg, #ffc107, #ff8f00)',
              transform: 'scaleX(0)',
              boxShadow: '0 0 10px rgba(255,193,7,0.8)',
            }}
          />
        </div>

        <span
          ref={percentRef}
          className="font-mono text-sm"
          style={{ color: 'rgba(255,193,7,0.5)' }}
        >
          0%
        </span>
      </div>

      {/* Bottom tagline */}
      <div
        className="absolute bottom-12 font-body text-xs tracking-widest uppercase"
        style={{ color: 'rgba(255,255,255,0.2)' }}
      >
        Senior Frontend Engineer
      </div>
    </div>
  )
}
