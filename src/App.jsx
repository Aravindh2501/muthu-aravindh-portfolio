import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Loader          from './components/Loader'
import CustomCursor    from './components/CustomCursor'
import ParticleTrails  from './components/ParticleTrails'
import Navbar          from './components/Navbar'
import Hero            from './components/Hero'
import About           from './components/About'
import Skills          from './components/Skills'
import Experience      from './components/Experience'
import Projects        from './components/Projects'
import Contact         from './components/Contact'
import Footer          from './components/Footer'
import GlobalStarfield from './three/GlobalStarfield'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const lenis = new Lenis({
      duration:         1.4,
      easing:           (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth:           true,
      smoothTouch:      false,
      touchMultiplier:  2,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    return () => lenis.destroy()
  }, [])

  return (
    <>
      {/* Fixed full-page star background — always visible behind all sections */}
      <GlobalStarfield />

      {!loaded && <Loader onComplete={() => setLoaded(true)} />}

      <div className={`relative transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`} style={{ position: 'relative', zIndex: 1 }}>
        <CustomCursor />
        <ParticleTrails />
        <Navbar />

        <main>
          {/* Hero owns its own Canvas + galaxy background */}
          <Hero />

          <section id="about"><About /></section>
          <section id="skills"><Skills /></section>
          <section id="experience"><Experience /></section>
          <section id="projects"><Projects /></section>
          <section id="contact"><Contact /></section>
        </main>

        <Footer />
      </div>
    </>
  )
}
