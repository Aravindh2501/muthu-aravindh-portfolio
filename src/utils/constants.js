// ─── PERSONAL ────────────────────────────────────────────────────────────────
// ─── PERSONAL ────────────────────────────────────────────────────────────────
export const PERSONAL = {
  name: "Muthu Aravindh",
  firstName: "Muthu",
  lastName: "Aravindh",

  role: "React Frontend Developer",

  tagline:
    "Frontend Developer with 3+ years of experience building scalable web applications using React, TypeScript, and modern UI technologies.",

  location: "Chennai, India",

  available: true,

  github: "https://github.com/muthu-aravindh",

  linkedin: "https://linkedin.com/in/muthu-aravindh",

  email: "muthuaravindh2512001@gmail.com",

  resume: "/assets/resume.pdf",
}

// ─── SKILLS ──────────────────────────────────────────────────────────────────
// icon strings map to ICON_MAP in Skills.jsx
// color = brand hex for glow / icon tint

export const SKILLS = [
  // ── Core ─────────────────────────────────────────────────
  { name: 'React', icon: 'SiReact', color: '#61DAFB', category: 'Core' },
  { name: 'Next.js', icon: 'SiNextdotjs', color: '#e8e8f0', category: 'Core' },
  { name: 'TypeScript', icon: 'SiTypescript', color: '#3178C6', category: 'Core' },
  { name: 'JavaScript', icon: 'SiJavascript', color: '#F7DF1E', category: 'Core' },
  { name: 'HTML5', icon: 'SiHtml5', color: '#E34F26', category: 'Core' },
  { name: 'CSS3', icon: 'FaCss3Alt', color: '#1572B6', category: 'Core' },
  { name: 'SASS / SCSS', icon: 'SiSass', color: '#CC6699', category: 'Core' },

  // ── State Management ─────────────────────────────────────
  { name: 'Zustand', icon: 'TbCube', color: '#ffc107', category: 'State' },
  { name: 'Redux Toolkit', icon: 'SiRedux', color: '#764ABC', category: 'State' },
  { name: 'TanStack Query', icon: 'TbTable', color: '#FF4154', category: 'State' },

  // ── UI Libraries / Animation ─────────────────────────────
  { name: 'Material UI', icon: 'SiMui', color: '#007FFF', category: 'UI' },
  { name: 'Tailwind CSS', icon: 'SiTailwindcss', color: '#06B6D4', category: 'UI' },
  { name: 'Framer Motion', icon: 'SiFramer', color: '#e8e8f0', category: 'UI' },
  { name: 'GSAP', icon: 'SiGsap', color: '#88CE02', category: 'UI' },

  // ── Data / Tables ────────────────────────────────────────
  { name: 'TanStack Table', icon: 'TbLayoutGrid', color: '#FF4154', category: 'Data' },

  // ── Backend / API ────────────────────────────────────────
  { name: 'Node.js', icon: 'SiNodedotjs', color: '#339933', category: 'Backend' },
  { name: 'Express.js', icon: 'SiExpress', color: '#e8e8f0', category: 'Backend' },
  { name: 'MongoDB', icon: 'SiMongodb', color: '#47A248', category: 'Backend' },
  { name: 'Firebase', icon: 'SiFirebase', color: '#FFCA28', category: 'Backend' },
  { name: 'Axios', icon: 'SiAxios', color: '#5A29E4', category: 'Backend' },

  // ── Creative / 3D ────────────────────────────────────────
  { name: 'Three.js', icon: 'SiThreedotjs', color: '#e8e8f0', category: '3D' },

  // ── Design ───────────────────────────────────────────────
  { name: 'Figma', icon: 'SiFigma', color: '#F24E1E', category: 'Design' },

  // ── Tooling ──────────────────────────────────────────────
  { name: 'Git', icon: 'SiGit', color: '#F05032', category: 'Tooling' },
  { name: 'GitHub', icon: 'SiGithub', color: '#e8e8f0', category: 'Tooling' },
  { name: 'Vite', icon: 'SiVite', color: '#646CFF', category: 'Tooling' },
]

// ─── CATEGORY ORDER for display ────────────────────────────────────────────
export const SKILL_CATEGORIES = [
  { key: 'Core', label: 'Core' },
  { key: 'State', label: 'State Management' },
  { key: 'UI', label: 'UI Libraries' },
  { key: 'Data', label: 'Data & Tables' },
  { key: 'Backend', label: 'Backend / API' },
  { key: '3D', label: '3D / Creative' },
  { key: 'Design', label: 'Design' },
  { key: 'Tooling', label: 'Tooling' },
]