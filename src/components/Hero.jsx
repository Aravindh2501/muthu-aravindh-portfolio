import { useEffect, useRef, Suspense } from 'react'
import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { HiArrowDown } from 'react-icons/hi'
import { FiDownload } from 'react-icons/fi'
import gsap from 'gsap'

import GalaxyBackground from '../three/GalaxyBackground'
import Starfield from '../three/Starfield'
import RobotScene from '../three/RobotScene'
import { useMousePosition } from '../hooks/useMousePosition'
import { PERSONAL } from '../utils/constants'

// ─── Magnetic button ──────────────────────────────────────────────────────────
function useMagnetic(ref) {
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const cx   = rect.left + rect.width  / 2
      const cy   = rect.top  + rect.height / 2
      const dx   = e.clientX - cx
      const dy   = e.clientY - cy
      gsap.to(el, {
        x: dx * 0.35,
        y: dy * 0.35,
        duration: 0.4,
        ease: 'power2.out',
      })
    }

    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1.2, 0.5)' })
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [ref])
}

function MagneticBtn({ children, className, style, onClick, href, download }) {
  const ref = useRef()
  useMagnetic(ref)
  const Tag = href ? 'a' : 'button'
  return (
    <Tag
      ref={ref}
      className={className}
      style={{ cursor: 'none', ...style }}
      onClick={onClick}
      href={href}
      download={download}
      data-cursor-hover
    >
      {children}
    </Tag>
  )
}

// ─── Typing animation ─────────────────────────────────────────────────────────
function TypedText({ text }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 1.2 }}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 + i * 0.045, duration: 0.3 }}
          style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export default function Hero() {
  const mouseState = useMousePosition()   // ref with .current.position / .normalised
  const heroRef    = useRef()

  // Parallax: text layer floats opposite to mouse
  useEffect(() => {
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth  - 0.5) * 20
      const y = (e.clientY / window.innerHeight - 0.5) * 20
      gsap.to('.hero-text-layer', {
        x: -x * 0.4,
        y: -y * 0.4,
        duration: 1,
        ease: 'power2.out',
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* ── Three.js Canvas — Hero interactive parallax stars only ── */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          dpr={[1, 1.5]}
        >
          <GalaxyBackground />
          <Starfield mouseNorm={mouseState} />
        </Canvas>
      </div>

      {/* ── Content grid: text left | robot right ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-center min-h-screen py-24">

        {/* ── LEFT: Text ── */}
        <div className="hero-text-layer flex flex-col items-start gap-6">

          {/* Available badge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2 px-4 py-2 rounded-full"
            style={{
              background: 'rgba(255,193,7,0.08)',
              border:     '1px solid rgba(255,193,7,0.3)',
            }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: '#ffc107', boxShadow: '0 0 8px #ffc107' }}
            />
            <span
              className="font-mono text-xs tracking-widest font-medium uppercase"
              style={{ color: '#ffc107' }}
            >
              Available for Work
            </span>
          </motion.div>

          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="font-body text-lg"
            style={{ color: 'rgba(255,255,255,0.45)' }}
          >
            Hello, I'm
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-black leading-none tracking-tight"
            style={{
              fontSize: 'clamp(3.5rem, 9vw, 7.5rem)',
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            <span style={{ color: '#e8e8f0' }}>Muthu</span>
            <br />
            <span
              style={{
                background:           'linear-gradient(90deg, #D4AF37 0%, #F5C842 25%, #F7E27A 50%, #F5C842 75%, #D4AF37 100%)',
                backgroundSize:       '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor:  'transparent',
                backgroundClip:       'text',
                animation:            'shimmer 3s linear infinite',
              }}
            >
              Aravindh
            </span>
          </motion.h1>

          {/* Role with typed animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <div
              className="w-8 h-px"
              style={{ background: 'rgba(255,193,7,0.6)' }}
            />
            <h2
              className="font-display text-xl lg:text-2xl font-semibold tracking-widest uppercase"
              style={{
                fontFamily:    "'Space Grotesk', sans-serif",
                letterSpacing: '0.2em',
                color:         'rgba(255,255,255,0.75)',
              }}
            >
              <TypedText text={PERSONAL.role} />
            </h2>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.7 }}
            className="font-body text-base lg:text-lg leading-relaxed max-w-md"
            style={{ color: 'rgba(255,255,255,0.45)' }}
          >
            {PERSONAL.tagline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.9, duration: 0.7 }}
            className="flex flex-wrap items-center gap-4 mt-2"
          >
            {/* Primary */}
            <MagneticBtn
              className="group flex items-center gap-2 px-7 py-4 rounded-full font-display font-semibold text-sm tracking-wider transition-all duration-300"
              style={{
                background:  'linear-gradient(135deg, #ffc107, #ff8f00)',
                color:       '#020208',
                boxShadow:   '0 0 30px rgba(255,193,7,0.35)',
              }}
              onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="relative z-10">View Projects</span>
              <HiArrowDown
                size={16}
                className="relative z-10 group-hover:translate-y-1 transition-transform duration-200"
              />
            </MagneticBtn>

            {/* Secondary */}
            <MagneticBtn
              className="flex items-center gap-2 px-7 py-4 rounded-full font-display font-semibold text-sm tracking-wider transition-all duration-300"
              style={{
                background: 'transparent',
                border:     '1px solid rgba(255,193,7,0.4)',
                color:      '#ffc107',
              }}
              href={PERSONAL.resume}
              download
            >
              <FiDownload size={15} />
              <span>Download CV</span>
            </MagneticBtn>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
            className="flex items-center gap-3 mt-4"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-px h-8"
              style={{ background: 'linear-gradient(180deg, #ffc107, transparent)' }}
            />
            <span
              className="font-mono text-xs tracking-widest uppercase"
              style={{ color: 'rgba(255,255,255,0.25)' }}
            >
              Scroll to explore
            </span>
          </motion.div>
        </div>

        {/* ── RIGHT: Robot ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 60 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-[480px] lg:h-[680px] flex items-center justify-center"
        >
          {/* Pulsing glow rings behind robot */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              animate={{ scale: [1, 1.06, 1], opacity: [0.2, 0.45, 0.2] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="w-72 h-72 rounded-full"
              style={{
                border:    '1px solid rgba(255,193,7,0.25)',
                boxShadow: '0 0 60px rgba(255,193,7,0.1)',
              }}
            />
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.25, 0.1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
              className="absolute w-96 h-96 rounded-full"
              style={{ border: '1px solid rgba(255,193,7,0.1)' }}
            />
            <motion.div
              animate={{ scale: [1, 1.12, 1], opacity: [0.05, 0.15, 0.05] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute rounded-full"
              style={{
                width: '28rem', height: '28rem',
                border: '1px solid rgba(255,193,7,0.06)',
              }}
            />
          </div>

          {/* Ground glow beneath robot */}
          <div
            className="absolute bottom-12 left-1/2 -translate-x-1/2 pointer-events-none"
            style={{
              width:      '280px',
              height:     '40px',
              background: 'radial-gradient(ellipse, rgba(255,193,7,0.15), transparent 70%)',
              filter:     'blur(12px)',
            }}
          />

          {/* Spline Robot — fills right column */}
          <RobotScene mousePos={mouseState} />
        </motion.div>
      </div>

      {/* Bottom fade to rest of page */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to top, #020208 0%, transparent 100%)' }}
      />

      {/* Stats strip */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10 hidden lg:grid grid-cols-4"
        style={{ borderTop: '1px solid rgba(255,193,7,0.07)' }}
      >
        {[
          { value: '3+',   label: 'Years Experience' },
          { value: '20+',  label: 'Projects Shipped' },
          { value: '10+',  label: 'Technologies' },
          { value: '∞',    label: 'Cups of Coffee' },
        ].map((stat, i) => (
          <div
            key={i}
            className="py-5 px-6 text-center"
            style={{ borderRight: i < 3 ? '1px solid rgba(255,193,7,0.07)' : 'none' }}
          >
            <div
              className="font-display font-bold text-xl mb-0.5"
              style={{
                background:           'linear-gradient(135deg, #ffd54f, #ffc107)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor:  'transparent',
                backgroundClip:       'text',
                fontFamily:           "'Space Grotesk', sans-serif",
              }}
            >
              {stat.value}
            </div>
            <div
              className="font-mono text-xs tracking-wider uppercase"
              style={{ color: 'rgba(255,255,255,0.25)' }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* shimmer keyframe for gold name */}
      <style>{`
        @keyframes shimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `}</style>
    </section>
  )
}
