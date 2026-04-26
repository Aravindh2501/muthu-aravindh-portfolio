import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ── Icons ─────────────────────────────────────────────────────────────────────
const IconCheck = () => (
  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)
const IconCalendar = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
)
const IconPin = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
    <circle cx="12" cy="9" r="2.5"/>
  </svg>
)

// ── Data ──────────────────────────────────────────────────────────────────────
const experiences = [
  {
    id: 'nde',
    company: 'New Digital Easy (NDE)',
    role: 'Frontend Developer',
    period: '2024 — Present',
    location: 'Karur, Tamil Nadu',
    type: 'Full-time',
    current: true,
    accent: '#ffc107',
    logo: 'NDE',

    summary:
      'Working on frontend development for internal business applications, focusing on building scalable UI components and improving user experience for data-driven systems.',

    bullets: [
      'Developed a File Management System with nested folder structures and drag-and-drop functionality using Atlassian Pragmatic Drag and Drop.',
      'Implemented state management using Zustand to handle application state and improve UI responsiveness.',
      'Built reusable UI components using React, TypeScript, and Material UI to maintain consistency across the application.',
      'Implemented data tables using TanStack Table with virtualization to handle large datasets efficiently.',
      'Integrated REST APIs and improved data fetching patterns using TanStack Query.',
      'Worked closely with backend developers to implement new features and improve application usability.',
    ],

    stack: [
      'React',
      'TypeScript',
      'Zustand',
      'Material UI',
      'TanStack Query',
      'TanStack Table',
      'React Window',
    ],
  },

  {
    id: 'kodukku',
    company: 'Kodukku Classified Pvt. Ltd.',
    role: 'Frontend Developer',
    period: '2023 — 2024',
    location: 'Chennai, India',
    type: 'Full-time',
    current: false,
    accent: '#00f0ff',
    logo: 'KCL',

    summary:
      'Worked on building frontend features for a multi-module classified platform including HRMS and internal tools.',

    bullets: [
      'Developed frontend modules for multiple platform sections including classifieds and internal HRMS tools.',
      'Built HRMS features such as employee attendance tracking, payslip management, and role-based access control.',
      'Implemented global state management using Redux for predictable application state handling.',
      'Integrated real-time messaging functionality using Socket.io for internal communication.',
      'Designed responsive user interfaces using React and PrimeReact components.',
    ],

    stack: [
      'React',
      'Redux',
      'Socket.io',
      'PrimeReact',
      'Axios',
      'REST APIs',
      'React Router',
    ],
  },

  {
    id: 'enrich',
    company: 'Enrich Money',
    role: 'UI Developer',
    period: '2022 — 2023',
    location: 'Chennai, India',
    type: 'Full-time',
    current: false,
    accent: '#cc66ff',
    logo: 'EM',

    summary:
      'Worked as a UI developer building user interfaces for a stock trading platform.',

    bullets: [
      'Developed UI components for trading dashboards using Angular and Material UI.',
      'Converted Figma designs into responsive and reusable frontend components.',
      'Worked with backend APIs to display real-time trading data in the UI.',
      'Improved responsiveness and cross-browser compatibility of the trading platform.',
    ],

    stack: [
      'Angular',
      'TypeScript',
      'Material UI',
      'SASS',
      'REST APIs',
      'HTML5',
      'CSS3',
    ],
  },
]


// ── Styles ────────────────────────────────────────────────────────────────────
const STYLES = `
  @keyframes dotPulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(255,193,7,0.6), 0 0 20px rgba(255,193,7,0.6); }
    60% { box-shadow: 0 0 0 14px rgba(255,193,7,0), 0 0 25px rgba(255,193,7,0.4); }
  }
  .exp-card-body {
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.04);
    backdrop-filter: blur(20px);
    overflow: hidden;
    transition:
      border-color 0.35s ease,
      box-shadow 0.4s ease,
      background-color 0.4s ease,
      transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    will-change: transform, box-shadow;
  }
  .bullet-item {
    display: flex; align-items: flex-start; gap: 10px;
    padding: 6px 8px; border-radius: 8px;
    transition: background 0.2s;
  }
  .bullet-item:hover { background: rgba(255,255,255,0.06); }
  .stack-chip {
    padding: 4px 12px; border-radius: 999px;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 11px; font-weight: 600; letter-spacing: 0.05em;
    transition: all 0.2s; cursor: default;
  }
  .meta-pill {
    display: inline-flex; align-items: center; gap: 6px;
    font-family: 'DM Sans', sans-serif; font-size: 12px;
    color: rgba(255,255,255,0.6);
  }
`

// ── Card body ─────────────────────────────────────────────────────────────────
function CardBody({ exp }) {
  return (
    <div
      className="exp-card-body"
      style={{ border: `1px solid ${exp.accent}3a` }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${exp.accent}aa`
        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)'
        e.currentTarget.style.boxShadow = `0 20px 50px rgba(0,0,0,0.6), 0 0 30px ${exp.accent}40, inset 0 0 15px ${exp.accent}15`
        e.currentTarget.style.transform = 'translateY(-9px) scale(1.015)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = `${exp.accent}3a`
        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)'
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.transform = 'translateY(0) scale(1)'
      }}
    >
      {/* Header */}
      <div style={{
        padding: '20px 24px 16px',
        background: `linear-gradient(135deg, ${exp.accent}25 0%, transparent 70%)`,
        borderBottom: `1px solid ${exp.accent}1a`,
      }}>
        {/* Top row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginBottom: 12, flexWrap: 'wrap' }}>
          <div style={{
            padding: '4px 12px', borderRadius: '8px',
            background: `${exp.accent}25`, border: `1px solid ${exp.accent}60`,
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 800, fontSize: 12, color: exp.accent, letterSpacing: '0.07em',
            boxShadow: `0 0 10px ${exp.accent}30`,
          }}>
            {exp.logo}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {exp.current && (
              <span style={{
                padding: '3px 10px', borderRadius: '999px',
                background: 'rgba(34,197,94,0.2)',
                border: '1px solid rgba(34,197,94,0.7)',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 10, fontWeight: 700, letterSpacing: '0.12em',
                color: '#4ade80', textTransform: 'uppercase',
                boxShadow: '0 0 10px rgba(34,197,94,0.3)',
              }}>● Live</span>
            )}
            <span style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 12, fontWeight: 600, letterSpacing: '0.05em',
              color: 'rgba(255,255,255,0.7)',
            }}>
              {exp.period}
            </span>
          </div>
        </div>

        {/* Role & company */}
        <h3 style={{
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800,
          fontSize: '1.1rem', color: '#ffffff', margin: '0 0 4px', lineHeight: 1.2,
          textShadow: '0 2px 10px rgba(0,0,0,0.5)',
        }}>
          {exp.role}
        </h3>
        <div style={{ 
          fontFamily: "'Space Grotesk', sans-serif", 
          fontSize: 14, 
          fontWeight: 700, 
          color: exp.accent, 
          marginBottom: 12,
          textShadow: `0 0 8px ${exp.accent}40`
        }}>
          {exp.company}
        </div>

        {/* Meta */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 14 }}>
          <span className="meta-pill"><IconCalendar />{exp.type}</span>
          <span className="meta-pill"><IconPin />{exp.location}</span>
        </div>

        {/* Summary */}
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: '0.88rem',
          lineHeight: 1.65, color: 'rgba(255,255,255,0.75)',
          margin: 0, paddingLeft: 12,
          borderLeft: `3px solid ${exp.accent}`,
        }}>
          {exp.summary}
        </p>
      </div>

      {/* Bullets */}
      <div style={{ padding: '16px 20px' }}>
        {exp.bullets.map((b, i) => (
          <div key={i} className="bullet-item">
            <span style={{
              width: 18, height: 18, borderRadius: '50%', flexShrink: 0, marginTop: 2,
              background: `${exp.accent}25`, border: `1px solid ${exp.accent}70`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: exp.accent,
              boxShadow: `0 0 6px ${exp.accent}30`,
            }}>
              <IconCheck />
            </span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.88rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.85)' }}>
              {b}
            </span>
          </div>
        ))}

        {/* Stack chips */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: 8,
          marginTop: 16, paddingTop: 16, borderTop: `1px solid rgba(255,255,255,0.08)`,
        }}>
          {exp.stack.map(tag => (
            <span
              key={tag}
              className="stack-chip"
              style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid rgba(255,255,255,0.15)`, color: 'rgba(255,255,255,0.85)' }}
              onMouseEnter={e => { 
                e.currentTarget.style.background = `${exp.accent}25`; 
                e.currentTarget.style.color = '#ffffff'; 
                e.currentTarget.style.borderColor = exp.accent;
                e.currentTarget.style.boxShadow = `0 0 10px ${exp.accent}40`;
              }}
              onMouseLeave={e => { 
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; 
                e.currentTarget.style.color = 'rgba(255,255,255,0.85)'; 
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Timeline row (alternating) ────────────────────────────────────────────────
function TimelineRow({ exp, index }) {
  const leftRef = useRef()
  const rightRef = useRef()
  const dotRef = useRef()
  const isLeft = index % 2 === 0

  useEffect(() => {
    const cardEl = isLeft ? leftRef.current : rightRef.current
    gsap.fromTo(cardEl,
      { opacity: 0, x: isLeft ? -48 : 48, y: 16 },
      {
        opacity: 1, x: 0, y: 0, duration: 0.9, ease: 'expo.out',
        delay: index * 0.08,
        scrollTrigger: { trigger: cardEl, start: 'top 84%' },
      }
    )
    gsap.fromTo(dotRef.current,
      { scale: 0, opacity: 0 },
      {
        scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(3)',
        delay: index * 0.08 + 0.18,
        scrollTrigger: { trigger: cardEl, start: 'top 84%' },
      }
    )
  }, [index, isLeft])

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 56px 1fr', alignItems: 'start', marginBottom: 52 }}>

      {/* Left card slot */}
      <div style={{ padding: '0 28px 0 0' }}>
        {isLeft ? (
          <div ref={leftRef} style={{ opacity: 0 }}>
            <CardBody exp={exp} />
          </div>
        ) : (
          /* Year label right-aligned */
          <div ref={leftRef} style={{ textAlign: 'right', paddingTop: 14, opacity: 0 }}>
            <span style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 13, fontWeight: 800, letterSpacing: '0.1em',
              color: exp.accent, textTransform: 'uppercase',
              textShadow: `0 0 10px ${exp.accent}50`,
            }}>
              {exp.period.split('—')[0].trim()}
            </span>
          </div>
        )}
      </div>

      {/* Centre dot */}
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 16, position: 'relative', zIndex: 2 }}>
        <div
          ref={dotRef}
          style={{
            width: 16, height: 16, borderRadius: '50%',
            background: `#ffffff`,
            border: `3px solid ${exp.accent}`,
            opacity: 0,
            animation: exp.current ? 'dotPulse 2.4s ease infinite' : 'none',
            boxShadow: `0 0 15px 3px ${exp.accent}`,
          }}
        />
      </div>

      {/* Right card slot */}
      <div style={{ padding: '0 0 0 28px' }}>
        {!isLeft ? (
          <div ref={rightRef} style={{ opacity: 0 }}>
            <CardBody exp={exp} />
          </div>
        ) : (
          /* Year label left-aligned */
          <div ref={rightRef} style={{ paddingTop: 14, opacity: 0 }}>
            <span style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 13, fontWeight: 800, letterSpacing: '0.1em',
              color: exp.accent, textTransform: 'uppercase',
              textShadow: `0 0 10px ${exp.accent}50`,
            }}>
              {exp.period.split('—')[0].trim()}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function Experience() {
  const sectionRef  = useRef()
  const headingRef  = useRef()
  const timelineRef = useRef()
  const lineRef     = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current.children,
        { opacity: 0, y: 32 },
        {
          opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: 'power4.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 82%' },
        }
      )
      // Scrubbed line growth
      gsap.fromTo(lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1, ease: 'none',
          transformOrigin: 'top center',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 68%',
            end: 'bottom 18%',
            scrub: 1.4,
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="section-padding relative overflow-hidden" style={{ background: '#020208' }}>
      <style>{STYLES}</style>

      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{ position:'absolute', top:'15%', right:'-5%', width:600, height:600, borderRadius:'50%', background:'radial-gradient(circle, rgba(255,193,7,0.06), transparent 70%)', filter:'blur(80px)' }}/>
        <div style={{ position:'absolute', bottom:'8%', left:'-5%', width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle, rgba(0,240,255,0.05), transparent 70%)', filter:'blur(70px)' }}/>
      </div>

      <div className="container-custom relative z-10">

        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: '#ffc107', textShadow: '0 0 5px rgba(255,193,7,0.5)' }}>
            03 / Experience
          </span>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(255,193,7,0.5), transparent)' }} />
        </div>

        {/* Heading */}
        <div ref={headingRef} style={{ marginBottom: '4rem' }}>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800,
            fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#ffffff',
            lineHeight: 1.15, marginBottom: '0.75rem',
            textShadow: '0 5px 15px rgba(0,0,0,0.3)',
          }}>
            Where I've{' '}
            <span style={{
              background: 'linear-gradient(135deg, #fff275, #ffc107, #ff9100)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              filter: 'drop-shadow(0 2px 10px rgba(255,193,7,0.3))'
            }}>
              Built Things
            </span>
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: '1.05rem',
            color: 'rgba(255,255,255,0.65)', maxWidth: '40rem', lineHeight: 1.7,
          }}>
            3+ years across product startups — from multi-module classified platforms to
            enterprise file systems and CRM dashboards with 10K+ row performance.
          </p>
        </div>

        {/* ── Desktop alternating timeline ── */}
        <div ref={timelineRef} className="relative hidden md:block">
          {/* Background line */}
          <div style={{
            position: 'absolute', left: '50%', top: 0, bottom: 0,
            width: 2, transform: 'translateX(-50%)',
            background: 'rgba(255,255,255,0.05)', zIndex: 0,
          }}>
            {/* Scrubbed glow line */}
            <div ref={lineRef} style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to bottom, #ffc107 0%, #00f0ff 50%, #cc66ff 100%)',
              boxShadow: '0 0 15px rgba(255,193,7,0.5)',
              transformOrigin: 'top',
            }}/>
          </div>

          {experiences.map((exp, i) => (
            <TimelineRow key={exp.id} exp={exp} index={i} />
          ))}
        </div>

        {/* ── Mobile left-aligned timeline ── */}
        <div className="md:hidden relative" style={{ paddingLeft: 40 }}>
          <div style={{
            position: 'absolute', left: 16, top: 0, bottom: 0,
            width: 2, background: 'rgba(255,255,255,0.05)',
          }}/>
          {experiences.map((exp, i) => {
            return (
              <div key={exp.id} style={{ position: 'relative', marginBottom: 36 }}>
                <div style={{
                  position: 'absolute', left: -32, top: 18,
                  width: 14, height: 14, borderRadius: '50%',
                  background: '#ffffff',
                  boxShadow: `0 0 15px 3px ${exp.accent}`,
                  border: `3px solid ${exp.accent}`,
                  animation: exp.current ? 'dotPulse 2.4s ease infinite' : 'none',
                }}/>
                <CardBody exp={exp} />
              </div>
            )
          })}
        </div>

        {/* Bottom divider */}
        <div className="flex items-center justify-center gap-3 mt-10">
          <div className="h-px w-16" style={{ background: 'rgba(255,255,255,0.1)' }} />
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>
            3 companies · {experiences.reduce((a, e) => a + e.bullets.length, 0)} key achievements
          </span>
          <div className="h-px w-16" style={{ background: 'rgba(255,255,255,0.1)' }} />
        </div>

      </div>
    </div>
  )
}