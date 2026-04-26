import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FiExternalLink, FiGithub } from 'react-icons/fi'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: 'NDE Drive File Management System',
    description:
      'A file management interface similar to Google Drive built using React. Supports nested folder structures, file organization, and drag-and-drop operations for managing files efficiently.',

    tech: ['React', 'Material UI', 'Pragmatic DnD (Atlassian)', 'React Window', 'Zustand'],

    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    accent: '#667eea',

    github: null,
    live: '#',

    featured: true,
    label: 'Production · Internal Tool',
  },

  {
    title: 'CRM Dashboard & Kanban Pipeline',
    description:
      'CRM dashboard built with React and Material UI featuring Kanban-style workflow management and data tables for managing leads and deals.',

    tech: ['React', 'Material UI', 'TanStack Table', 'TanStack Query', 'Zustand'],

    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    accent: '#43e97b',

    github: null,
    live: '#',

    featured: true,
    label: 'Production · CRM',
  },

  {
    title: 'Smart Expense Manager',
    description:
      'A mobile expense tracking application built to learn React Native. Allows users to track daily expenses and categorize transactions.',

    tech: ['React Native', 'TypeScript', 'SQLite', 'Expo'],

    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    accent: '#f093fb',

    github: 'https://github.com/Aravindh2501',
    live: 'https://expo.dev/accounts/aravindh_2501/projects/MyApp/builds/6123254d-35a0-468d-8b7c-e85717ca5d1d',

    featured: true,
    label: 'Mobile Project',
  },

  {
    title: 'Logistics Dashboard Template',
    description:
      'A dashboard template built using React and Material UI with reusable components and modern UI design patterns.',

    tech: ['React', 'Material UI', 'Framer Motion', 'Zustand', 'Vite'],

    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    accent: '#fa709a',

    github: 'https://github.com/Aravindh2501',
    live: 'https://logisticsdashboard.vercel.app/',

    featured: false,
    label: 'Web App Template',
  },

  {
    title: 'HRMS Portal',
    description:
      'Human Resource Management System for managing employee attendance, payroll information, and internal communication tools.',

    tech: ['React', 'Redux', 'Material UI', 'Node.js', 'Chart.js'],

    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    accent: '#4facfe',

    github: null,
    live: '#',

    featured: false,
    label: 'Production · HRMS',
  },

  {
    title: 'Spin Wheel Giveaway Tool',
    description:
      'A simple interactive spin wheel tool used for giveaways. Supports importing participant data from files and selecting random winners.',

    tech: ['React', 'Tailwind CSS', 'XLSX Parser', 'HTML5 Canvas'],

    gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    accent: '#a18cd1',

    github: 'https://github.com/Aravindh2501',
    live: 'https://madshot-studio.netlify.app',

    featured: false,
    label: 'Web Tool',
  }
]

function ProjectCard({ project, index }) {
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    const rotateX = (y - 0.5) * -10
    const rotateY = (x - 0.5) * 10

    gsap.to(card, {
      rotateX, rotateY, z: 20,
      duration: 0.4, ease: 'power2.out',
      transformPerspective: 1000,
    })

    // Move gradient spotlight
    const spotlight = card.querySelector('.card-spotlight')
    if (spotlight) {
      spotlight.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, ${project.accent}20, transparent 60%)`
    }
  }

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0, rotateY: 0, z: 0,
      duration: 0.8, ease: 'elastic.out(1, 0.4)',
    })
  }

  return (
    <div
      ref={cardRef}
      className="group relative rounded-2xl overflow-hidden cursor-none"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid rgba(255,193,7,0.12)`,
        backdropFilter: 'blur(20px)',
        transformStyle: 'preserve-3d',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${project.accent}44`
        e.currentTarget.style.boxShadow = `0 0 40px ${project.accent}18, 0 30px 60px rgba(0,0,0,0.4)`
      }}
      data-cursor-hover
    >
      {/* Spotlight effect */}
      <div className="card-spotlight absolute inset-0 pointer-events-none z-0 transition-all duration-200" />

      {/* Header gradient bar */}
      <div
        className="h-40 relative overflow-hidden"
        style={{ background: project.gradient }}
      >
        {/* Abstract pattern overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.07\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }}
        />

        {/* Project number */}
        <div
          className="absolute top-4 right-4 font-display font-bold text-5xl opacity-20"
          style={{ color: 'white', userSelect: 'none' }}
        >
          {String(index + 1).padStart(2, '0')}
        </div>

        {/* Label badge */}
        <div className="absolute bottom-4 left-4">
          <span
            className="px-3 py-1 rounded-full font-mono text-xs"
            style={{
              background: 'rgba(0,0,0,0.4)',
              backdropFilter: 'blur(10px)',
              color: 'rgba(255,255,255,0.8)',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            {project.label}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 relative z-10">
        <h3
          className="font-display font-bold text-xl mb-3"
          style={{ color: '#e8e8f0' }}
        >
          {project.title}
        </h3>

        <p
          className="font-body text-sm leading-relaxed mb-5"
          style={{ color: 'rgba(255,255,255,0.5)', minHeight: '4.5rem' }}
        >
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tech.map(t => (
            <span
              key={t}
              className="px-2.5 py-1 rounded-lg font-mono text-xs"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: 'rgba(255,255,255,0.45)',
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          {project.live && project.live !== '#' && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-display font-semibold transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, ${project.accent}cc, ${project.accent}88)`,
                color: 'white',
                cursor: 'none',
              }}
              data-cursor-hover
            >
              <FiExternalLink size={13} />
              Live Demo
            </a>
          )}
           {/* <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-display font-semibold transition-all duration-300"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.6)',
              cursor: 'none',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
            data-cursor-hover
          >
            <FiGithub size={13} />
            GitHub
          </a> */}
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 80%' }
        }
      )

      const cards = gridRef.current.children
      gsap.fromTo(cards,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.8, stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 80%' }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="section-padding relative">
      <div className="container-custom">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'rgba(255,193,7,0.5)' }}>
            04 / Projects
          </span>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(255,193,7,0.3), transparent)' }} />
        </div>

        <div ref={headingRef} className="mb-16">
          <h2 className="font-display font-bold mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#e8e8f0' }}>
            Things I've{' '}
            <span className="gold-gradient-text">shipped</span>
          </h2>
          <p className="font-body text-base max-w-xl" style={{ color: 'rgba(255,255,255,0.45)' }}>
            A selection of projects that reflect my obsession with clean architecture, performance, and meaningful UI.
          </p>
        </div>

        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
