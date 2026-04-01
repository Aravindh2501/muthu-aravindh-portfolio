import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollCamera(cameraRef) {
  useEffect(() => {
    if (!cameraRef?.current) return

    const camera = cameraRef.current

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
      }
    })

    // Hero → About
    tl.to(camera.position, { z: 2, duration: 1 }, 0)
    tl.to(camera.position, { x: 1, duration: 1 }, 1)
    // About → Skills
    tl.to(camera.position, { x: 0, y: 0.5, duration: 1 }, 2)
    // Skills → Projects
    tl.to(camera.position, { z: 4, y: 0, duration: 1 }, 3)

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])
}
