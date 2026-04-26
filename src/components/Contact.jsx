import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSend, FiCheck, FiMail, FiGithub, FiLinkedin, FiX, FiPhone, FiCopy } from 'react-icons/fi'
import emailjs from '@emailjs/browser'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef(null)
  const formContainerRef = useRef(null)
  const toastRef = useRef(null)
  const [status, setStatus] = useState('idle') 
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState({ title: '', sub: '' })
  
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })

  // --- Copy to Clipboard Logic ---
  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setToastMessage({
      title: `${type} Copied`,
      sub: "Ready to paste and connect!"
    });
    setShowToast(true);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-reveal]",
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 1, stagger: 0.2,
          ease: 'expo.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        }
      )

      const handleMouseMove = (e) => {
        const { clientX, clientY } = e
        const xPos = (clientX / window.innerWidth - 0.5) * 15
        const yPos = (clientY / window.innerHeight - 0.5) * 15
        gsap.to(formContainerRef.current, {
          rotationY: xPos,
          rotationX: -yPos,
          transformPerspective: 1000,
          duration: 0.5,
          ease: 'power2.out'
        })
      }

      window.addEventListener('mousemove', handleMouseMove)
      return () => window.removeEventListener('mousemove', handleMouseMove)
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (showToast) {
      gsap.fromTo(toastRef.current, 
        { y: 50, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" }
      )
      const timer = setTimeout(() => hideToast(), 4000)
      return () => clearTimeout(timer)
    }
  }, [showToast])

  const hideToast = () => {
    if(!toastRef.current) return;
    gsap.to(toastRef.current, {
      y: 20, opacity: 0, scale: 0.9, duration: 0.4, ease: "power3.in",
      onComplete: () => setShowToast(false)
    })
  }

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setStatus('sending')

    const fullMessageString = `
      New Inquiry Details:
      --------------------------
      Name: ${form.name}
      Email: ${form.email}
      Phone: ${form.phone || 'Not provided'}
      
      Message:
      ${form.message}
    `;

    try {
      await emailjs.send(
        'service_v4i1v3v', 
        'template_ez89v1q',
        { 
          from_name: form.name,
          reply_to: form.email,
          message: fullMessageString, 
        },
        'FnPce3n6PokWuApfI'
      )
      
      setToastMessage({
        title: "Transmission Received",
        sub: "I'll reach out to you shortly."
      });
      setStatus('success')
      setShowToast(true)
      setForm({ name: '', email: '', phone: '', message: '' })
      setTimeout(() => setStatus('idle'), 2000)
    } catch (err) {
      console.error("EmailJS Error:", err)
      setStatus('idle')
    }
  }

  const inputStyle = "w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/20 transition-all duration-300 placeholder:text-white/20"

  return (
    <section ref={sectionRef} className="min-h-screen py-24 relative overflow-hidden bg-[#020208] flex items-center">
      
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-yellow-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-yellow-600/10 blur-[120px] rounded-full pointer-events-none" />

      {/* DYNAMIC TOASTER */}
      <AnimatePresence>
        {showToast && (
          <div className="fixed bottom-10 left-0 right-0 z-[100] flex justify-center pointer-events-none px-6">
            <div 
              ref={toastRef}
              className="pointer-events-auto relative overflow-hidden bg-[#0a0a0a]/90 border border-yellow-500/30 backdrop-blur-2xl px-6 py-4 rounded-2xl flex items-center gap-5 shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
            >
              <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center text-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.2)]">
                <FiCheck size={20} />
              </div>
              <div className="pr-4">
                <h4 className="text-white font-bold text-sm">{toastMessage.title}</h4>
                <p className="text-white/40 text-xs mt-0.5">{toastMessage.sub}</p>
              </div>
              <button onClick={hideToast} className="text-white/20 hover:text-white transition-colors">
                <FiX size={18} />
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          <div className="space-y-8">
            <div data-reveal className="inline-block px-4 py-1.5 rounded-full border border-yellow-500/20 bg-yellow-500/5 text-yellow-500 font-mono text-xs tracking-widest uppercase">
              Now accepting inquiries
            </div>
            
            <h2 data-reveal className="text-6xl md:text-8xl font-bold text-white leading-tight">
              Let's craft <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-700">greatness.</span>
            </h2>

            <div data-reveal className="space-y-6">
              <p className="text-white/50 text-lg max-w-md leading-relaxed">
                Whether it's a React architecture consultation or a cinematic video project, let's connect.
              </p>
              
              {/* Contact Info Buttons */}
              <div className="flex flex-col gap-4">
                <button 
                  onClick={() => copyToClipboard("+919342557762", "Phone")}
                  className="flex items-center gap-4 text-white/70 hover:text-yellow-500 group transition-all w-fit"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-yellow-500/50 group-hover:bg-yellow-500/10 transition-all">
                    <FiPhone size={18} />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] uppercase tracking-widest text-white/30 font-mono">Mobile</p>
                    <p className="text-sm font-medium">+91 6369xxxx72</p>
                  </div>
                </button>

                <button 
                  onClick={() => copyToClipboard("muthuaravindh2512001@gmail.com", "Email")}
                  className="flex items-center gap-4 text-white/70 hover:text-yellow-500 group transition-all w-fit"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-yellow-500/50 group-hover:bg-yellow-500/10 transition-all">
                    <FiMail size={18} />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] uppercase tracking-widest text-white/30 font-mono">Email</p>
                    <p className="text-sm font-medium">muthuaravindh2512001@gmail.com
</p>
                  </div>
                </button>
              </div>
            </div>

            <div data-reveal className="flex gap-6 pt-4">
              <a href="https://www.linkedin.com/in/aravindh2501/" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-yellow-500 hover:border-yellow-500/50 transition-all duration-300 bg-white/5 shadow-xl"><FiLinkedin size={20} /></a>
              <a href="https://github.com/muthuaravindh" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-yellow-500 hover:border-yellow-500/50 transition-all duration-300 bg-white/5 shadow-xl"><FiGithub size={20} /></a>
            </div>
          </div>

          <div data-reveal className="relative">
            <div ref={formContainerRef} className="bg-white/[0.03] border border-white/10 backdrop-blur-3xl p-8 md:p-10 rounded-[2.5rem] shadow-2xl relative z-10">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-yellow-500/60 uppercase tracking-[0.2em] ml-1">Identity</label>
                    <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required className={inputStyle} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-yellow-500/60 uppercase tracking-[0.2em] ml-1">Contact No.</label>
                    <input type="tel" name="phone" placeholder="+91 ..." value={form.phone} onChange={handleChange} className={inputStyle} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-yellow-500/60 uppercase tracking-[0.2em] ml-1">Email Bridge</label>
                  <input type="email" name="email" placeholder="Email Address" value={form.email} onChange={handleChange} required className={inputStyle} />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-yellow-500/60 uppercase tracking-[0.2em] ml-1">The Brief</label>
                  <textarea name="message" rows={4} placeholder="How can I help you?" value={form.message} onChange={handleChange} required className={`${inputStyle} resize-none`} />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={status === 'sending'}
                  className="w-full py-5 rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-700 text-black font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(234,179,8,0.2)] disabled:opacity-50 mt-4"
                >
                  {status === 'sending' ? (
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  ) : (
                    <>Transmit <FiSend className="mb-0.5" /></>
                  )}
                </motion.button>
              </form>
            </div>
            <div className="absolute -inset-1 bg-gradient-to-br from-yellow-500/20 to-transparent blur-2xl -z-10 rounded-[2.5rem]" />
          </div>
        </div>
      </div>
    </section>
  )
}