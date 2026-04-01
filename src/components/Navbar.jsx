import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ── Icons (Kept from your source) ─────────────────────────
const IconHome = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/><path d="M9 21V12h6v9"/></svg>
const IconUser = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
const IconCode = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
const IconBriefcase = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="2" y1="12" x2="22" y2="12"/></svg>
const IconLayers = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
const IconMail = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2 4 12 13 22 4"/></svg>
const IconDownload = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v13M5 14l7 7 7-7"/><line x1="3" y1="21" x2="21" y2="21"/></svg>

const navItems = [
  { id: 'home', href: '#home', Icon: IconHome, tooltip: 'Home' },
  { id: 'about', href: '#about', Icon: IconUser, tooltip: 'About' },
  { id: 'skills', href: '#skills', Icon: IconCode, tooltip: 'Skills' },
  { id: 'experience', href: '#experience', Icon: IconBriefcase, tooltip: 'Experience' },
  { id: 'projects', href: '#projects', Icon: IconLayers, tooltip: 'Projects' },
  { id: 'contact', href: '#contact', Icon: IconMail, tooltip: 'Contact' },
]

export default function Navbar() {
  const [active, setActive] = useState('home')
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const current = navItems.find(({ id }) => {
        const el = document.getElementById(id)
        if (!el) return false
        const rect = el.getBoundingClientRect()
        // Improved detection: check if section is near the top
        return rect.top <= 150 && rect.bottom >= 150
      })
      if (current) setActive(current.id)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (e, href) => {
    e.preventDefault() // Prevent default anchor jump
    const el = document.querySelector(href)
    if (el) {
      const offset = 80 // Adjust based on your header height
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = el.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
    // Delay closing slightly so the user sees the active state change
    setTimeout(() => setIsExpanded(false), 300)
  }

  const wiggleVariants = {
    animate: {
      rotate: [0, -7, 7, -7, 0],
      transition: { duration: 0.5, repeat: Infinity, repeatDelay: 4 }
    }
  }

  return (
    <nav className="fixed bottom-8 right-8 z-[9000] flex flex-col items-center">
      
      <motion.div
        layout
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        style={{
          padding: '8px',
          borderRadius: '32px',
          background: 'rgba(2, 2, 8, 0.85)',
          border: '1px solid rgba(255, 193, 7, 0.25)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: isExpanded 
            ? '0 0 40px rgba(255, 193, 7, 0.15), 0 20px 50px rgba(0,0,0,0.5)' 
            : '0 10px 30px rgba(0,0,0,0.4)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px'
        }}
      >
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="flex flex-col items-center gap-1 overflow-hidden"
            >
              {navItems.map((item) => {
                const isActive = active === item.id
                return (
                  <motion.a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => scrollTo(e, item.href)}
                    whileHover={{ scale: 1.1, x: -2 }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      width: '44px', height: '44px', borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: isActive ? '#ffc107' : 'rgba(255,255,255,0.3)',
                      background: isActive ? 'rgba(255,193,7,0.1)' : 'transparent',
                      position: 'relative',
                      textDecoration: 'none'
                    }}
                    className="group"
                  >
                    <item.Icon />
                    
                    {isActive && (
                      <motion.div 
                        layoutId="activeDot"
                        style={{ 
                          position: 'absolute', 
                          left: '6px', 
                          width: '4px', 
                          height: '4px', 
                          borderRadius: '50%', 
                          background: '#ffc107', 
                          boxShadow: '0 0 8px #ffc107' 
                        }}
                      />
                    )}

                    <span className="absolute right-[55px] px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all pointer-events-none bg-black/90 backdrop-blur-md border border-white/10 text-[10px] uppercase tracking-widest text-white whitespace-nowrap">
                      {item.tooltip}
                    </span>
                  </motion.a>
                )
              })}

              <div style={{ height: '1px', width: '24px', background: 'linear-gradient(to right, transparent, rgba(255,193,7,0.3), transparent)', margin: '6px 0' }} />

              <motion.a
                href="/resume.pdf" 
                download
                whileHover={{ scale: 1.1, backgroundColor: '#ffc107', color: '#000' }}
                style={{
                  width: '38px', height: '38px', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(255,193,7,0.15)', color: '#ffc107',
                  border: '1px solid rgba(255,193,7,0.4)', marginBottom: '8px'
                }}
              >
                <IconDownload />
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          layout
          onClick={() => setIsExpanded(!isExpanded)}
          variants={wiggleVariants}
          animate={isExpanded ? "" : "animate"}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            width: '48px', height: '48px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #ffc107, #ff8f00)',
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 800, fontSize: '14px', color: '#020208',
            cursor: 'pointer', border: 'none',
            boxShadow: '0 0 20px rgba(255,193,7,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 10
          }}
        >
          {isExpanded ? (
            <motion.span key="close" initial={{ rotate: -90 }} animate={{ rotate: 0 }}>✕</motion.span>
          ) : (
            <motion.span key="logo" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>MA</motion.span>
          )}
        </motion.button>
      </motion.div>

      {/* Ambient Glow */}
      <motion.div 
        animate={{ 
          opacity: isExpanded ? 0.4 : 0,
          scale: isExpanded ? 1.2 : 0.5 
        }}
        style={{
          position: 'absolute', zIndex: -1, inset: -40,
          background: 'radial-gradient(circle, rgba(255,193,7,0.25) 0%, transparent 70%)',
          filter: 'blur(30px)', pointerEvents: 'none'
        }}
      />
    </nav>
  )
}