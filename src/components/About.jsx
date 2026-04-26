import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import about from "../assets/abot.png";

import resume from "../assets/Muthu_Aravindh_Resume.pdf"

gsap.registerPlugin(ScrollTrigger)

// ── Inline SVG premium icons ──────────────────────────────────────────────────
const IconBuilding = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9M15 21V9" />
  </svg>
)


const IconPin = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /><circle cx="12" cy="9" r="2.5" />
  </svg>
)
const IconZap = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
)
const IconCamera = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" />
  </svg>
)


const IconCode = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
)

const IconStar = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)
const IconArrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17L17 7M7 7h10v10" />
  </svg>
)

// ── Data ──────────────────────────────────────────────────────────────────────
const highlights = [
  { label: 'Company', value: 'NDE · New Digital Easy', Icon: IconBuilding },
  { label: 'Role', value: 'Frontend Developer', Icon: IconCode },
  { label: 'Location', value: 'Karur, India', Icon: IconPin },
  { label: 'Focus', value: 'React · TypeScript · UI Development', Icon: IconZap },
]

const stats = [
  { num: '3+', sub: 'Years Experience' },
  { num: '10+', sub: 'Projects Built' },
  { num: 'Daily', sub: 'Learning' },
]

// ── Styles ────────────────────────────────────────────────────────────────────
const STYLES = `
  @keyframes floatY {
    0%, 100% { transform: translateY(0px) rotate(-1deg); }
    50%       { transform: translateY(-14px) rotate(1deg); }
  }
  @keyframes orbitBadge {
    0%, 100% { transform: translate(0, 0); }
    25%       { transform: translate(4px, -4px); }
    75%       { transform: translate(-4px, 4px); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes pulseRing {
    0%   { box-shadow: 0 0 0 0 rgba(255,193,7,0.35); }
    70%  { box-shadow: 0 0 0 14px rgba(255,193,7,0);  }
    100% { box-shadow: 0 0 0 0 rgba(255,193,7,0);     }
  }
  .about-image-wrap {
    animation: floatY 6s ease-in-out infinite;
    transform-origin: center;
  }
  .about-badge {
    animation: orbitBadge 4s ease-in-out infinite;
  }
  .highlight-card {
    transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
  }
  .highlight-card:hover {
    border-color: rgba(255,193,7,0.45) !important;
    box-shadow: 0 0 24px rgba(255,193,7,0.1);
    transform: translateY(-2px);
  }
  .highlight-card:hover .card-icon-wrap {
    background: rgba(255,193,7,0.18) !important;
    box-shadow: 0 0 12px rgba(255,193,7,0.25);
  }
  .tag-pill {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 5px 12px; border-radius: 999px;
    font-size: 11px; font-family: 'Space Grotesk', sans-serif;
    font-weight: 600; letter-spacing: 0.07em;
    background: rgba(255,193,7,0.07);
    border: 0.5px solid rgba(255,193,7,0.25);
    color: rgba(255,193,7,0.8);
    transition: all 0.2s;
    cursor: default;
  }
  .tag-pill:hover {
    background: rgba(255,193,7,0.14);
    border-color: rgba(255,193,7,0.5);
    color: #ffc107;
  }
  .stat-card {
    text-align: center;
    padding: 14px 10px;
    border-radius: 16px;
    border: 0.5px solid rgba(255,193,7,0.14);
    background: rgba(255,193,7,0.03);
    transition: all 0.3s;
  }
  .stat-card:hover {
    border-color: rgba(255,193,7,0.4);
    background: rgba(255,193,7,0.07);
    box-shadow: 0 0 20px rgba(255,193,7,0.08);
  }
`

// ── Component ─────────────────────────────────────────────────────────────────
export default function About() {
  const sectionRef = useRef(null)
  const imageRef = useRef(null)
  const badgesRef = useRef(null)
  const textRef = useRef(null)
  const cardsRef = useRef(null)
  const statsRef = useRef(null)
  const tagsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Image: scale + rotate reveal
      gsap.fromTo(imageRef.current,
        { opacity: 0, scale: 0.78, rotate: -6, y: 50 },
        {
          opacity: 1, scale: 1, rotate: 0, y: 0,
          duration: 1.4, ease: 'expo.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      )

      // Floating badges stagger in
      if (badgesRef.current) {
        gsap.fromTo(badgesRef.current.children,
          { opacity: 0, scale: 0.6 },
          {
            opacity: 1, scale: 1, duration: 0.7, stagger: 0.15,
            ease: 'back.out(2)',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
          }
        )
      }

      // Text lines reveal
      gsap.fromTo(textRef.current.children,
        { opacity: 0, y: 40, clipPath: 'inset(0 0 100% 0)' },
        {
          opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)',
          duration: 0.9, stagger: 0.12, ease: 'power4.out',
          scrollTrigger: { trigger: textRef.current, start: 'top 78%' },
        }
      )

      // Cards spring in
      gsap.fromTo(cardsRef.current.children,
        { opacity: 0, y: 28, scale: 0.92 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.75, stagger: 0.09, ease: 'back.out(1.7)',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 82%' },
        }
      )

      // Stats counter-like reveal
      gsap.fromTo(statsRef.current.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: statsRef.current, start: 'top 85%' },
        }
      )

      // Tag pills pop in
      gsap.fromTo(tagsRef.current.children,
        { opacity: 0, scale: 0.7 },
        {
          opacity: 1, scale: 1, duration: 0.5, stagger: 0.06, ease: 'back.out(2)',
          scrollTrigger: { trigger: tagsRef.current, start: 'top 88%' },
        }
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="section-padding relative overflow-hidden">
      <style>{STYLES}</style>

      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{
          position: 'absolute', top: '10%', left: '-10%',
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,193,7,0.05), transparent 70%)',
          filter: 'blur(60px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '5%', right: '-5%',
          width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(97,218,251,0.03), transparent 70%)',
          filter: 'blur(60px)',
        }} />
      </div>

      <div className="container-custom relative z-10">

        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'rgba(255,193,7,0.5)' }}>
            01 / About
          </span>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(255,193,7,0.3), transparent)' }} />
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-start">

          {/* ── LEFT — Image + cards ── */}
          <div>

            {/* Image + floating badges */}
            <div className="relative mb-10 w-fit">

              {/* Glow ring behind image */}
              <div style={{
                position: 'absolute', inset: '-18px', borderRadius: '32px',
                background: 'radial-gradient(circle at 40% 40%, rgba(255,193,7,0.12), transparent 65%)',
                filter: 'blur(16px)',
                zIndex: 0,
              }} />

              {/* Image wrapper */}
              <div
                ref={imageRef}
                className="about-image-wrap relative"
                style={{ opacity: 0, zIndex: 1 }}
              >
                <div style={{
                  width: 260, height: 300,
                  borderRadius: '28px',
                  overflow: 'hidden',
                  border: '1px solid rgba(255,193,7,0.25)',
                  boxShadow: '0 0 0 0 rgba(255,193,7,0.35)',
                  animation: 'pulseRing 3s ease-out infinite',
                  position: 'relative',
                }}>
                  {/* ── REPLACE src with your actual image path ── */}
                  <img
                    src={about}
                    alt="Muthu Aravindh"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    onError={(e) => { e.currentTarget.style.display = 'none' }}
                  />
                  {/* Fallback monogram shown if image fails */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'linear-gradient(145deg, rgba(255,193,7,0.1) 0%, rgba(2,2,8,1) 100%)',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 800, fontSize: '4rem', color: 'rgba(255,193,7,0.35)',
                    letterSpacing: '-0.02em',
                    zIndex: -1,
                  }}>
                    MA
                  </div>

                  {/* Inner overlay gradient */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(2,2,8,0.55) 0%, transparent 50%)',
                    pointerEvents: 'none',
                  }} />
                </div>
              </div>

              {/* Floating badges */}
              <div ref={badgesRef}>

                {/* Years badge — bottom right */}
                <div className="about-badge" style={{
                  position: 'absolute', bottom: -14, right: -20,
                  padding: '10px 16px', borderRadius: '16px',
                  background: 'rgba(2,2,8,0.92)',
                  border: '1px solid rgba(255,193,7,0.45)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 0 24px rgba(255,193,7,0.2)',
                  zIndex: 10,
                  opacity: 0,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: '50%',
                      background: 'linear-gradient(135deg, #ffc107, #ff8f00)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#020208', fontSize: 11,
                    }}>
                      <IconStar />
                    </div>
                    <div>
                      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 14, color: '#ffc107', lineHeight: 1 }}>3+ Yrs</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>Experience</div>
                    </div>
                  </div>
                </div>

                {/* Camera / Creative badge — top left */}
                <div className="about-badge" style={{
                  position: 'absolute', top: -16, left: -22,
                  padding: '8px 14px', borderRadius: '14px',
                  background: 'rgba(2,2,8,0.9)',
                  border: '1px solid rgba(97,218,251,0.3)',
                  backdropFilter: 'blur(16px)',
                  boxShadow: '0 0 16px rgba(97,218,251,0.12)',
                  zIndex: 10,
                  opacity: 0,
                  animationDelay: '1s',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ color: 'rgba(97,218,251,0.8)', display: 'flex' }}><IconCode /></span>
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 600, color: 'rgba(97,218,251,0.8)', letterSpacing: '0.05em' }}>Developer</span>
                  </div>
                </div>

                {/* Available badge — right middle */}
                <div className="about-badge" style={{
                  position: 'absolute', top: '40%', right: -24,
                  padding: '7px 12px', borderRadius: '12px',
                  background: 'rgba(2,2,8,0.9)',
                  border: '1px solid rgba(34,197,94,0.35)',
                  backdropFilter: 'blur(16px)',
                  zIndex: 10,
                  opacity: 0,
                  animationDelay: '2s',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <span style={{
                      width: 6, height: 6, borderRadius: '50%',
                      background: '#22c55e',
                      boxShadow: '0 0 8px #22c55e',
                      display: 'inline-block',
                    }} />
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, fontWeight: 600, color: 'rgba(34,197,94,0.9)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Open to work</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Stats row */}
            <div ref={statsRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 20 }}>
              {stats.map(s => (
                <div key={s.sub} className="stat-card">
                  <div style={{
                    fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800,
                    fontSize: '1.6rem', color: '#ffc107', lineHeight: 1,
                    background: 'linear-gradient(135deg, #ffd54f, #ffc107)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  }}>{s.num}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 4, letterSpacing: '0.05em' }}>{s.sub}</div>
                </div>
              ))}
            </div>

            {/* Highlight cards */}
            <div ref={cardsRef} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="highlight-card"
                  style={{
                    padding: '14px 16px', borderRadius: '18px',
                    background: 'rgba(255,255,255,0.025)',
                    border: '1px solid rgba(255,193,7,0.1)',
                    backdropFilter: 'blur(12px)',
                    display: 'flex', alignItems: 'flex-start', gap: 12,
                  }}
                >
                  <div
                    className="card-icon-wrap"
                    style={{
                      width: 34, height: 34, borderRadius: '10px', flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'rgba(255,193,7,0.1)',
                      border: '1px solid rgba(255,193,7,0.2)',
                      color: 'rgba(255,193,7,0.85)',
                      transition: 'all 0.3s',
                    }}
                  >
                    <item.Icon />
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, fontWeight: 600, color: 'rgba(255,193,7,0.45)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 3 }}>
                      {item.label}
                    </div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.75)', lineHeight: 1.4 }}>
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT — Bio ── */}
          <div ref={textRef}>

            {/* Heading */}
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800,
              fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: '#e8e8f0',
              lineHeight: 1.15, marginBottom: '1.5rem',
            }}>
              Frontend Developer
              <span style={{
                background: 'linear-gradient(135deg, #ffd54f, #ffc107, #ff8f00)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>focused on </span>
              building modern web applications.
            </h2>

            {/* Bio paragraphs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>

              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.58)' }}>
                I'm a Frontend Developer currently working at
                <span style={{ color: '#ffc107', fontWeight: 600 }}> NDE (Now Digital Easy)</span> in Karur.
                I have around 3 years of experience building web applications using modern frontend technologies.
              </p>

              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.58)' }}>
                My primary stack includes
                <span style={{ color: 'rgba(255,193,7,0.85)', fontWeight: 500 }}> React, TypeScript, Zustand, and Material UI</span>.
                I work on building user interfaces, dashboards, and application features that focus on usability, maintainability, and performance.
              </p>

              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.58)' }}>
                Recently I have been improving my skills in modern frontend architecture, state management, and building scalable applications using tools like TanStack Query and modern React patterns.
              </p>

              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.58)' }}>
                Outside of work, I also enjoy photography through my project
                <span style={{ color: 'rgba(97,218,251,0.85)', fontWeight: 500 }}> mad.shot.diary</span>,
                which helps me develop a strong eye for visual design and creativity.
              </p>

            </div>

            {/* Tech tags */}
            <div ref={tagsRef} style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: '1.8rem' }}>
              {['React', 'TypeScript', 'Next.js', 'Zustand', 'MUI', 'TanStack', 'GSAP', 'Framer Motion', 'Three.js', 'Figma'].map(tag => (
                <span key={tag} className="tag-pill">{tag}</span>
              ))}
            </div>

            {/* Divider + CTA */}
            <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,193,7,0.1)', display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
              <a
                href="mailto:muthuaravindh2512001@gmail.com"
                data-cursor-hover
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.82rem', fontWeight: 600, letterSpacing: '0.06em',
                  color: 'rgba(255,193,7,0.7)',
                  cursor: 'none', textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#ffc107'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,193,7,0.7)'}
              >
                muthuaravindh2512001@gmail.com
              </a>

              <span style={{ width: 1, height: 16, background: 'rgba(255,193,7,0.2)' }} />

              <a
                href={resume}
                download="Muthu_Aravindh_Resume.pdf"
                data-cursor-hover
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 7,
                  padding: '9px 20px', borderRadius: '999px',
                  background: 'linear-gradient(135deg, #ffc107, #ff8f00)',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em',
                  color: '#020208', cursor: 'none', textDecoration: 'none',
                  boxShadow: '0 0 20px rgba(255,193,7,0.25)',
                  transition: 'box-shadow 0.3s, transform 0.2s',
                  textTransform: 'uppercase',
                }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 32px rgba(255,193,7,0.45)'; e.currentTarget.style.transform = 'scale(1.04)' }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 20px rgba(255,193,7,0.25)'; e.currentTarget.style.transform = 'scale(1)' }}
              >
                <IconArrow /> Resume
              </a>

              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.78rem', color: 'rgba(255,255,255,0.28)', letterSpacing: '0.05em' }}>
                Chennai, India
              </span>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}