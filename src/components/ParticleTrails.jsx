import { useEffect, useRef } from 'react'

export default function ParticleTrails() {
  const lastPos = useRef({ x: 0, y: 0 })
  const velocity = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const createParticle = (x, y, vx, vy) => {
      const particle = document.createElement('div')
      const size = Math.random() * 4 + 2
      const hue = Math.random() > 0.5 ? '#ffc107' : '#ff8f00'
      
      particle.className = 'particle'
      particle.style.cssText = `
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        background: ${hue};
        box-shadow: 0 0 ${size * 2}px ${hue};
        transform: translate(-50%, -50%);
      `
      
      document.body.appendChild(particle)
      
      setTimeout(() => {
        if (particle.parentNode) particle.parentNode.removeChild(particle)
      }, 800)
    }

    let lastTime = 0
    const throttle = 40 // ms between particles

    const onMouseMove = (e) => {
      const now = Date.now()
      const speed = Math.sqrt(
        Math.pow(e.clientX - lastPos.current.x, 2) +
        Math.pow(e.clientY - lastPos.current.y, 2)
      )

      velocity.current = {
        x: e.clientX - lastPos.current.x,
        y: e.clientY - lastPos.current.y,
      }

      if (now - lastTime > throttle && speed > 5) {
        createParticle(e.clientX, e.clientY, velocity.current.x, velocity.current.y)
        lastTime = now
      }

      lastPos.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  return null
}
