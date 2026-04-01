import { FiGithub, FiLinkedin, FiMail, FiInstagram, FiArrowUp } from 'react-icons/fi'
import { motion } from 'framer-motion'

const socials = [
  { icon: FiGithub, href: 'https://github.com/Aravindh2501', label: 'GitHub', color: '#ffffff', speed: '1.2s' },
  { icon: FiLinkedin, href: 'https://www.linkedin.com/in/aravindh2501/', label: 'LinkedIn', color: '#00f2ff', speed: '0.8s' },
  { icon: FiMail, href: 'mailto:muthuaravindh2512001@gmail.com', label: 'Email', color: '#ff0033', speed: '1.5s' },
  { icon: FiInstagram, href: 'https://instagram.com/mad.shot.diary', label: 'Instagram', color: '#ff00ff', speed: '1.1s' },
]

const SocialIcon = ({ icon: Icon, href, label, color, speed }) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="relative w-14 h-14 rounded-2xl flex items-center justify-center overflow-hidden group bg-[#020208]"
      whileHover={{ y: -10, scale: 1.15 }}
      transition={{ type: 'spring', stiffness: 500, damping: 15 }}
    >
      {/* ── 1. ALWAYS VISIBLE GREY BORDER ── */}
      <div className="absolute inset-0 rounded-2xl border border-white/10 z-0" />

      {/* ── 2. THE PRIMARY SPARK (Fast, Sharp) ── */}
      {/* Appears on top of grey border on hover */}
      <div className="absolute inset-[-100%] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
        <div 
          className="absolute inset-0 animate-[spin_var(--speed)_linear_infinite]"
          style={{ 
            '--speed': speed,
            background: `conic-gradient(from 0deg, transparent 40%, ${color} 50%, transparent 60%, ${color} 95%, transparent 100%)`,
            filter: `blur(1px) brightness(3)` 
          }}
        />
      </div>

      {/* ── 3. THE ENERGY AURA (Slower, Blurry Glow) ── */}
      <div className="absolute inset-[-100%] opacity-0 group-hover:opacity-60 transition-opacity duration-500 mix-blend-screen z-10">
        <div 
          className="absolute inset-0 animate-[spin_3s_linear_infinite_reverse]"
          style={{ 
            background: `conic-gradient(from 90deg, transparent 0%, ${color} 50%, transparent 100%)`,
            filter: `blur(15px) brightness(2)` 
          }}
        />
      </div>

      {/* ── 4. THE "STATIC" NEON BORDER (Constant on Hover) ── */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 z-20 pointer-events-none transition-opacity duration-300"
        style={{ 
          border: `1.5px solid ${color}`, 
          boxShadow: `0 0 20px ${color}, inset 0 0 10px ${color}` 
        }}
      />

      {/* ── 5. INNER CORE ── */}
      <div className="absolute inset-[2px] rounded-[14px] bg-[#020208] z-30 group-hover:bg-[#05050a] transition-colors duration-300" />

      {/* ── 6. ICON ── */}
      <Icon 
        size={22} 
        className="relative z-40 transition-all duration-500" 
        style={{ color: 'rgba(255,255,255,0.2)' }} 
      />

      <style jsx>{`
        a:hover :global(svg) {
          color: white !important;
          filter: drop-shadow(0 0 10px ${color}) brightness(2);
        }
      `}</style>
    </motion.a>
  )
}

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative py-28 overflow-hidden bg-[#020208]">
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* Surge Line at Top */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="container mx-auto px-6 relative z-10"
      >
        <div className="flex flex-col items-center gap-16">
          
          <div className="flex flex-col items-center">
            {/* Scroll Top Button */}
            <motion.button
              onClick={scrollToTop}
              whileInView={{ scale: 1, opacity: 1 }}
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ 
                scale: 1.1, 
                boxShadow: "0 0 40px rgba(255,193,7,0.4)",
                borderColor: "#ffc107"
              }}
              className="mb-12 w-14 h-14 rounded-full border border-yellow-500/30 flex items-center justify-center text-yellow-500 transition-all"
            >
              <FiArrowUp size={24} className="animate-bounce" />
            </motion.button>

            <div className="text-center">
              <h2 className="text-5xl md:text-7xl font-bold tracking-[0.35em] text-white uppercase mb-4">
                MUTHU ARAVINDH
              </h2>
              <p className="font-mono text-[12px] tracking-[0.9em] uppercase text-yellow-500/70 brightness-150">
                Visual Designer & Senior Frontend Engineer
              </p>
            </div>
          </div>

          {/* Social Icons with Non-Uniform Speeds and Always-on Grey Border */}
          <div className="flex items-center gap-8">
            {socials.map((social) => (
              <SocialIcon key={social.label} {...social} />
            ))}
          </div>

          <div className="w-full flex flex-col items-center gap-8 pt-10">
            <div className="w-px h-24 bg-gradient-to-b from-yellow-400 to-transparent shadow-[0_0_15px_#fbbf24]" />
            <div className="flex flex-col md:flex-row items-center gap-8 text-[11px] font-mono tracking-[0.5em] text-white/20 uppercase">
              <span>© {new Date().getFullYear()} ALL RIGHTS RESERVED</span>
              <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-yellow-500/30" />
              <span>EST. 2021 — PORTFOLIO V4.0</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Cinematic Metadata Corner Labels */}
      <div className="absolute bottom-12 left-12 hidden 2xl:block opacity-10 font-mono text-[10px] tracking-[1.2em] uppercase text-white rotate-90 origin-left select-none">
        Chennai // 12.9716° N
      </div>
      <div className="absolute bottom-12 right-12 hidden 2xl:block opacity-10 font-mono text-[10px] tracking-[1.2em] uppercase text-white -rotate-90 origin-right select-none">
        Visual identity v4.0
      </div>
    </footer>
  )
}