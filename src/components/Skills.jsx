import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// ── Simple Icons ─────────────────────────────────────────────────────────────
import {
  SiReact, SiJavascript, SiTypescript, SiHtml5, SiSass,
  SiTailwindcss, SiNodedotjs, SiNextdotjs, SiGit, SiGithub,
  SiFramer, SiThreedotjs, SiRedux, SiMongodb, SiFirebase,
  SiVite, SiWebpack, SiAxios, SiExpress, SiBootstrap,
  SiChakraui, SiEslint, SiPrettier, SiFigma, SiExpo,
  SiMui, SiBabel, SiDavinciresolve,
} from 'react-icons/si'

// ── Font Awesome ─────────────────────────────────────────────────────────────
import { FaCss3Alt } from 'react-icons/fa'

// ── Tabler Icons ─────────────────────────────────────────────────────────────
import {
  TbBrandReactNative, TbTable, TbDiamond, TbLayoutGrid,
  TbInfinity, TbBox, TbCube,
} from 'react-icons/tb'

import { SKILLS, SKILL_CATEGORIES } from '../utils/constants'

gsap.registerPlugin(ScrollTrigger)

const ICON_MAP = {
  SiReact, SiJavascript, SiTypescript, SiHtml5, SiSass,
  SiTailwindcss, SiNodedotjs, SiNextdotjs, SiGit, SiGithub,
  SiFramer, SiThreedotjs, SiRedux, SiMongodb, SiFirebase,
  SiVite, SiWebpack, SiAxios, SiExpress, SiBootstrap,
  SiChakraui, SiEslint, SiPrettier, SiFigma, SiExpo,
  SiMui, SiBabel, SiDavinciresolve,
  FaCss3Alt,
  TbBrandReactNative, TbTable, TbDiamond, TbLayoutGrid,
  TbInfinity, TbBox, TbCube,
}

const CATEGORY_LABELS = {
  All: 'All',
  Core: 'Core',
  State: 'State Mgmt',
  UI: 'UI Libraries',
  Data: 'Data & Tables',
  Backend: 'Backend / API',
  Mobile: 'Mobile',
  '3D': '3D / Creative',
  Design: 'Design',
  Tooling: 'Tooling',
}

// ── Wave animation keyframes injected once ───────────────────────────────────
const GLOBAL_STYLES = `
  @keyframes borderSpin {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes chipWave {
    0%   { transform: translateY(0px);  }
    40%  { transform: translateY(-7px); }
    100% { transform: translateY(0px);  }
  }
  @keyframes tierRise {
    from { opacity: 0; transform: translateY(48px) scaleX(0.82); }
    to   { opacity: 1; transform: translateY(0)    scaleX(1);    }
  }
  @keyframes pyramidReveal {
    from { clip-path: polygon(50% 100%, 50% 100%, 50% 100%); opacity: 0; }
    to   { clip-path: polygon(0% 100%, 100% 100%, 50% 0%);   opacity: 1; }
  }
`

// ── SkillCard — pill chip with 3D tilt on hover ──────────────────────────────
function SkillCard({ name, icon, color, index, waveDelay = 0, animate = false }) {
  const Icon = ICON_MAP[icon] || SiReact
  const cardRef = useRef()

  // GSAP mouse tilt
  useEffect(() => {
    const el = cardRef.current
    if (!el) return

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      gsap.to(el, {
        rotateY: x * 14,
        rotateX: -y * 14,
        duration: 0.35,
        ease: 'power2.out',
        transformPerspective: 600,
      })
    }

    const onLeave = () => {
      gsap.to(el, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.5)',
      })
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20, scale: 0.88 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.88 }}
      transition={{
        delay: (index % 12) * 0.05,
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        transformStyle: 'preserve-3d',
        // wave animation driven by animate prop (triggered on section enter)
        animation: animate
          ? `chipWave 0.55s cubic-bezier(0.34,1.56,0.64,1) ${waveDelay}ms 1`
          : 'none',
      }}
    >
      {/* Gradient border */}
      <div
        style={{
          padding: '1px',
          borderRadius: '14px',
          background: `linear-gradient(135deg, ${color}50, rgba(212,175,55,0.15), ${color}35)`,
          backgroundSize: '200% 200%',
          animation: `borderSpin ${4 + (index % 8) * 0.3}s ease infinite`,
        }}
      >
        <div
          className="relative flex items-center gap-2 px-3 py-2 rounded-[13px] group overflow-hidden"
          style={{
            background: 'rgba(4, 4, 15, 0.9)',
            backdropFilter: 'blur(14px)',
            cursor: 'none',
            minWidth: '88px',
            justifyContent: 'center',
          }}
        >
          {/* Hover glow */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ background: `radial-gradient(circle at center, ${color}20, transparent 70%)` }}
          />

          {/* Icon */}
          <motion.span
            whileHover={{ scale: 1.25, rotate: 6 }}
            transition={{ type: 'spring', stiffness: 320, damping: 14 }}
            className="relative z-10 text-lg flex-shrink-0"
            style={{ color, filter: `drop-shadow(0 0 6px ${color}70)` }}
          >
            <Icon />
          </motion.span>

          {/* Name */}
          <span
            className="relative z-10 text-xs font-semibold tracking-wide transition-colors duration-300 group-hover:text-white whitespace-nowrap"
            style={{
              color: 'rgba(200,200,220,0.65)',
              fontFamily: "'Space Grotesk', sans-serif",
              letterSpacing: '0.05em',
            }}
          >
            {name}
          </span>

          {/* Bottom shimmer */}
          <div
            className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
          />
        </div>
      </div>
    </motion.div>
  )
}

// ── PyramidTier — one row of the pyramid ─────────────────────────────────────
function PyramidTier({ tier, skills, widthPercent, tierIndex, totalTiers, doWave }) {
  // Pyramid color: top tiers slightly dimmer, base tiers full brightness
  const opacity = 0.55 + (tierIndex / (totalTiers - 1)) * 0.45

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scaleX: 0.75 }}
      whileInView={{ opacity: 1, y: 0, scaleX: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        delay: (totalTiers - 1 - tierIndex) * 0.1, // bottom tiers animate first
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      {/* Tier label */}
      <div
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '0.6rem',
          fontWeight: 600,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: `${tier.color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`,
          marginBottom: '6px',
        }}
      >
        {tier.label}
      </div>

      {/* Chips row — width narrows toward top */}
      <div
        style={{
          width: `${widthPercent}%`,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '6px',
          padding: '10px 14px',
          borderRadius: '12px',
          background: `${tier.color}0A`,
          border: `0.5px solid ${tier.color}30`,
          boxSizing: 'border-box',
          // Subtle left+right trapezoid feel via clip-path
          clipPath: (() => {
            const taper = ((totalTiers - 1 - tierIndex) / (totalTiers - 1)) * 3
            return `polygon(${taper}% 0%, ${100 - taper}% 0%, 100% 100%, 0% 100%)`
          })(),
        }}
      >
        <AnimatePresence>
          {skills.map((skill, i) => (
            <SkillCard
              key={skill.name}
              {...skill}
              index={i}
              waveDelay={i * 70}
              animate={doWave}
            />
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

// ── Main Skills section ───────────────────────────────────────────────────────
export default function Skills() {
  const sectionRef = useRef()
  const [activeCategory, setActiveCategory] = useState('All')
  const [doWave, setDoWave] = useState(false)
  const hasWaved = useRef(false)

  const categories = ['All', ...SKILL_CATEGORIES.map(c => c.key)]

  // Group skills by category, sorted largest → smallest (pyramid base at bottom)
  const grouped = SKILL_CATEGORIES.map(cat => ({
    ...cat,
    skills: SKILLS.filter(s => s.category === cat.key),
  })).filter(g => {
    if (activeCategory === 'All') return g.skills.length > 0
    return g.key === activeCategory
  }).sort((a, b) => b.skills.length - a.skills.length) // largest row at bottom

  const maxCount = Math.max(...grouped.map(g => g.skills.length), 1)

  // Trigger wave once on section enter
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 70%',
      onEnter: () => {
        if (!hasWaved.current) {
          hasWaved.current = true
          setDoWave(true)
          setTimeout(() => setDoWave(false), 2000)
        }
      },
    })

    return () => trigger.kill()
  }, [])

  // Re-trigger wave on category change
  const handleCategory = (cat) => {
    setActiveCategory(cat)
    setDoWave(true)
    setTimeout(() => setDoWave(false), 2000)
  }

  const filtered = activeCategory === 'All'
    ? SKILLS
    : SKILLS.filter(s => s.category === activeCategory)

  return (
    <div ref={sectionRef} className="section-padding relative overflow-hidden">
      <style>{GLOBAL_STYLES}</style>

      {/* Ambient orbs */}
      <div
        className="absolute right-0 top-1/3 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,193,7,0.04), transparent 70%)', filter: 'blur(80px)' }}
      />
      <div
        className="absolute -left-32 bottom-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(97,218,251,0.03), transparent 70%)', filter: 'blur(60px)' }}
      />

      <div className="container-custom relative z-10">

        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'rgba(255,193,7,0.5)' }}>
            02 / Skills
          </span>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(255,193,7,0.3), transparent)' }} />
        </div>

        {/* Heading */}
        <div className="flex flex-col items-center text-center mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: '#e8e8f0',
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              marginBottom: '1rem',
            }}
          >
            Tools of the{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #ffd54f, #ffc107, #ff8f00)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Trade
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.7 }}
            style={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', maxWidth: '32rem' }}
          >
            Technologies I use daily to craft scalable, performant, and beautiful digital experiences.
          </motion.p>
        </div>

        {/* Category filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="flex flex-wrap justify-center gap-2 mb-14"
        >
          {categories.map(cat => {
            const isActive = activeCategory === cat
            return (
              <button
                key={cat}
                onClick={() => handleCategory(cat)}
                className="px-4 py-2 rounded-full font-mono text-xs tracking-wider transition-all duration-300"
                style={{
                  background: isActive ? 'rgba(255,193,7,0.12)' : 'rgba(255,255,255,0.03)',
                  border: isActive ? '1px solid rgba(255,193,7,0.5)' : '1px solid rgba(255,255,255,0.08)',
                  color: isActive ? '#ffc107' : 'rgba(255,255,255,0.35)',
                  boxShadow: isActive ? '0 0 20px rgba(255,193,7,0.1)' : 'none',
                  cursor: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
                data-cursor-hover
              >
                {CATEGORY_LABELS[cat]}
              </button>
            )
          })}
        </motion.div>

        {/* ── PYRAMID ──────────────────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              width: '100%',
            }}
          >
            {grouped.map((tier, i) => {
              // Width: base (index 0, largest) = 100%, apex = ~28%
              const widthPercent = activeCategory !== 'All'
                ? 72
                : Math.round(28 + ((tier.skills.length / maxCount) * 72))

              return (
                <PyramidTier
                  key={tier.key}
                  tier={tier}
                  skills={tier.skills}
                  widthPercent={widthPercent}
                  tierIndex={i}
                  totalTiers={grouped.length}
                  doWave={doWave}
                />
              )
            })}
          </motion.div>
        </AnimatePresence>

        {/* Pyramid base line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(255,193,7,0.3), transparent)',
            marginTop: '12px',
            transformOrigin: 'center',
          }}
        />

        {/* Bottom label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="flex items-center justify-center gap-3 mt-6"
        >
          <div className="h-px w-16" style={{ background: 'rgba(255,193,7,0.2)' }} />
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.2)' }}>
            {filtered.length} technologies · Always learning more
          </span>
          <div className="h-px w-16" style={{ background: 'rgba(255,193,7,0.2)' }} />
        </motion.div>

      </div>
    </div>
  )
}