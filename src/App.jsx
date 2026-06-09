import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'

const skills = {
  frontend: ['HTML', 'CSS', 'JavaScript', 'React', 'Bootstrap', 'Tailwind'],
  backend: ['Python', 'C++', 'Java', 'Spring Boot', 'Node.js'],
  tools: ['Git', 'GitHub', 'MySQL', 'Vercel']
}

const journey = [
  { year: '2024', title: 'First Steps', description: 'Wrote my first lines of code. Started with Python and C++.' },
  { year: '2025', title: 'Web Dev', description: 'Discovered React, Tailwind, and the joy of building for the web.' },
  { year: '2026', title: 'Deepening', description: 'Exploring Java, Spring Boot, Data Science, and open source.' },
]

const philosophy = [
  { text: "Code is communication.", accent: true },
  { text: "Ship first, perfect later.", accent: false },
  { text: "Learn in public, build in silence.", accent: false },
  { text: "Done > perfect.", accent: true },
]

const glowVariant = {
  initial: { opacity: 0, scale: 0.8, filter: "blur(10px)" },
  whileInView: { 
    opacity: 1, 
    scale: 1, 
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
}

const fadeInUp = {
  initial: { opacity: 0, y: 80 },
  whileInView: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  },
  viewport: { once: true, margin: "-100px" }
}

const stagger = {
  whileInView: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
}

function AnimatedText({ text, className = "", delay = 0 }) {
  const words = text.split(" ")
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block mr-3 overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: delay + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

function LetterReveal({ children, className = "" }) {
  const chars = children.toString().split("")
  return (
    <span className={className}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.03, ease: [0.22, 1, 0.36, 1] }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  )
}

function Cursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [outlinePos, setOutlinePos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY })
      setTimeout(() => setOutlinePos({ x: e.clientX, y: e.clientY }), 50)
    }
    
    const handleHover = (e) => {
      const target = e.target
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }
    
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', handleHover)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', handleHover)
    }
  }, [])

  return (
    <>
      <motion.div 
        className="cursor-dot fixed pointer-events-none z-[9999] rounded-full"
        animate={{ 
          x: pos.x - 6, 
          y: pos.y - 6,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? '#fff' : '#00d4ff'
        }}
        transition={{ type: "tween", duration: 0 }}
      />
      <motion.div 
        className="cursor-outline fixed pointer-events-none z-[9998] rounded-full border"
        animate={{ 
          x: outlinePos.x - 20, 
          y: outlinePos.y - 20,
          scale: isHovering ? 1.8 : 1,
          borderColor: isHovering ? '#fff' : '#00d4ff'
        }}
        transition={{ type: "tween", duration: 0.1 }}
      />
    </>
  )
}

function GridBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />
      <motion.div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          background: 'radial-gradient(circle at 50% 50%, #fff 0%, transparent 50%)'
        }}
        animate={{
          background: [
            'radial-gradient(circle at 50% 50%, #fff 0%, transparent 50%)',
            'radial-gradient(circle at 60% 40%, #fff 0%, transparent 50%)',
            'radial-gradient(circle at 40% 60%, #fff 0%, transparent 50%)',
            'radial-gradient(circle at 50% 50%, #fff 0%, transparent 50%)'
          ]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
    </div>
  )
}

function Navigation() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })
  
  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 px-6 py-5 flex justify-between items-center bg-bg-primary/80 backdrop-blur-md"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <a href="#" className="font-display font-bold text-xl text-text-primary group">
        <span className="group-hover:text-accent transition-colors">AK</span>
      </a>
      <div className="flex gap-8 font-mono text-xs text-text-secondary">
        {['01', '02', '03'].map((num, i) => (
          <motion.a
            key={num}
            href={`#${['about', 'work', 'contact'][i]}`}
            className="hover:text-accent transition-colors relative"
            whileHover={{ y: -2 }}
          >
            [{num}]
            <motion.span 
              className="absolute -bottom-1 left-0 h-[1px] bg-accent"
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>
        ))}
      </div>
      <motion.div 
        className="absolute bottom-0 left-0 h-[1px] bg-accent origin-left"
        style={{ scaleX }}
      />
    </motion.nav>
  )
}

function Hero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-20 relative overflow-hidden">
      <GridBackground />
      
      <motion.div 
        className="absolute inset-0 opacity-30"
        style={{ y }}
      >
        <div 
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px]"
        />
        <div 
          className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-accent-pink/10 rounded-full blur-[100px]"
        />
      </motion.div>
      
      <motion.div style={{ y, opacity }} className="relative z-10">
        <motion.p 
          className="font-mono text-accent text-sm md:text-base mb-8 tracking-[0.3em]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          LEARNING. BUILDING. GROWING.
        </motion.p>
        
        <div className="overflow-hidden">
          <motion.h1 
            className="font-display text-[15vw] leading-[0.8] font-bold tracking-[-0.03em]"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-text-primary to-text-secondary">ANUSHKA</span>
          </motion.h1>
        </div>
        
        <div className="overflow-hidden">
          <motion.h1 
            className="font-display text-[15vw] leading-[0.8] font-bold tracking-[-0.03em] text-text-secondary/50"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            KANDHWAY
          </motion.h1>
        </div>

        <motion.div 
          className="mt-12 flex flex-col gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-2xl md:text-4xl font-body text-text-secondary">
            <AnimatedText text="Every line of code is a lesson learned." delay={0.8} />
            <motion.span 
              className="text-accent ml-2 inline-block w-2 h-8 md:h-12 align-middle bg-accent"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </p>
          
          <motion.div className="flex gap-6 mt-4">
            {[
              { label: 'GITHUB', url: 'https://github.com/kandhwayanushka-hue' },
              { label: 'LINKEDIN', url: 'https://www.linkedin.com/in/anushka-kandhway-0b2463364/' }
            ].map((link, i) => (
              <motion.a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + i * 0.1 }}
                whileHover={{ x: 4 }}
              >
                <span className="font-mono text-xs text-text-secondary group-hover:text-accent transition-colors">[{link.label}]</span>
                <motion.span 
                  className="w-0 h-[1px] bg-accent"
                  initial={{ width: 0 }}
                  whileHover={{ width: 20 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div 
        className="absolute bottom-10 left-6 md:left-20 flex items-center gap-4 font-mono text-xs text-text-secondary"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <motion.span 
          className="w-2 h-2 bg-accent rounded-full"
          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        AVAILABLE FOR PROJECTS
      </motion.div>
      
      <motion.div 
        className="absolute bottom-10 right-6 md:right-20 font-mono text-xs text-text-secondary hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="inline-block"
        >
          ⟳
        </motion.span>
        SCROLL
      </motion.div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="min-h-screen py-40 px-6 md:px-20 relative">
      <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" className="max-w-6xl">
        <motion.div 
          className="inline-block mb-4 px-4 py-1 border border-accent/30 rounded-full"
          variants={fadeInUp}
        >
          <span className="font-mono text-accent text-xs tracking-widest">// ABOUT</span>
        </motion.div>
        
        <div className="grid md:grid-cols-12 gap-12 mt-8">
          <div className="md:col-span-7">
            <motion.p 
              className="text-3xl md:text-5xl font-display font-bold leading-[1.1]"
              variants={stagger}
            >
              <div className="overflow-hidden"><LetterReveal>Full-stack dev</LetterReveal></div>
              <div className="overflow-hidden"><LetterReveal>exploring the</LetterReveal></div>
              <div className="overflow-hidden">
                <span className="text-accent glow-text">edges</span> of what's possible.
              </div>
            </motion.p>
            
            <motion.p 
              className="mt-8 text-xl text-text-secondary leading-relaxed max-w-xl"
              variants={fadeInUp}
            >
              Exploring <span className="text-accent">React</span>, <span className="text-accent">Spring Boot</span>, and <span className="text-accent">Data Science</span>. 
              Learning every day, building along the way.
            </motion.p>
          </div>
          
          <div className="md:col-span-5 space-y-8 mt-8 md:mt-0">
            {[
              { label: 'LOCATION', value: 'Delhi, India' },
              { label: 'EDUCATION', value: 'B.Tech CSE (Data Science)' },
              { label: 'STATUS', value: 'Learning. Building. Shipping.', glow: true },
            ].map((item, i) => (
              <motion.div 
                key={item.label}
                className="pl-6 border-l border-text-secondary/20"
                variants={fadeInUp}
                transition={{ delay: i * 0.1 }}
              >
                <p className="font-mono text-text-secondary text-xs mb-1">{item.label}</p>
                <p className={`text-lg font-body ${item.glow ? 'text-accent' : 'text-text-primary'}`}>{item.value}</p>
                {item.sub && <p className="text-text-secondary text-sm mt-1">{item.sub}</p>}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

function Journey() {
  return (
    <section className="min-h-screen py-40 px-6 md:px-20 relative">
      <motion.div 
        className="absolute right-0 top-1/4 w-1/3 h-2/3 bg-accent/5 rounded-full blur-[150px] pointer-events-none"
        variants={glowVariant}
        initial="initial"
        whileInView="whileInView"
      />
      
      <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView">
        <motion.div className="inline-block mb-16 px-4 py-1 border border-accent/30 rounded-full">
          <span className="font-mono text-accent text-xs tracking-widest">// JOURNEY</span>
        </motion.div>
        
        <div className="relative">
          <motion.div 
            className="absolute left-4 md:left-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-accent/50 via-accent/20 to-transparent"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 1.5 }}
          />
          
          {journey.map((item, idx) => (
            <motion.div 
              key={idx}
              className="relative pl-12 md:pl-20 mb-16"
              variants={fadeInUp}
            >
              <motion.div 
                className="absolute left-3 md:left-6 top-2 w-3 h-3 bg-bg-primary border-2 border-accent rounded-full"
                whileInView={{ scale: [0.5, 1.2, 1] }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              />
              <motion.p 
                className="font-mono text-accent text-sm mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: idx * 0.15 }}
              >
                {item.year}
              </motion.p>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-text-primary mb-2">{item.title}</h3>
              <p className="text-text-secondary">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

function Philosophy() {
  return (
    <section className="min-h-screen py-40 px-6 md:px-20 flex flex-col justify-center relative">
      <motion.div 
        className="absolute left-0 top-0 w-1/2 h-full bg-accent-pink/[0.02] pointer-events-none"
      />
      
      <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView">
        <motion.div className="inline-block mb-16 px-4 py-1 border border-accent/30 rounded-full">
          <span className="font-mono text-accent text-xs tracking-widest">// PHILOSOPHY</span>
        </motion.div>
        
        <div className="grid gap-8">
          {philosophy.map((item, idx) => (
            <motion.div
              key={idx}
              className="group relative"
              variants={fadeInUp}
              whileHover={{ x: 20 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.p
                className={`text-4xl md:text-6xl font-display font-bold cursor-pointer transition-all ${
                  item.accent ? 'text-text-primary group-hover:text-accent' : 'text-text-secondary/60 group-hover:text-text-primary'
                }`}
              >
                {item.text}
              </motion.p>
              <motion.span 
                className="absolute -left-8 top-1/2 -translate-y-1/2 w-0 h-[2px] bg-accent group-hover:w-6 transition-all duration-300"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

function SkillsSection() {
  return (
    <section className="min-h-screen py-40 px-6 md:px-20 relative">
      <motion.div 
        className="absolute right-1/4 top-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[150px] pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      
      <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView">
        <motion.div className="inline-block mb-16 px-4 py-1 border border-accent/30 rounded-full">
          <span className="font-mono text-accent text-xs tracking-widest">// SKILLS</span>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-12 md:gap-16">
          {Object.entries(skills).map(([category, skillList], catIdx) => (
            <motion.div key={category} variants={fadeInUp}>
              <h3 className="font-mono text-text-secondary text-xs tracking-widest mb-6 capitalize">{category}</h3>
              <div className="flex flex-wrap gap-3">
                {skillList.map((skill, i) => (
                  <motion.span
                    key={skill}
                    className="relative px-5 py-3 bg-bg-secondary text-text-primary font-body text-sm border border-text-secondary/10 hover:border-accent/50 transition-colors cursor-pointer overflow-hidden group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: catIdx * 0.1 + i * 0.05 }}
                    whileHover={{ y: -4 }}
                  >
                    <motion.span 
                      className="absolute inset-0 bg-accent/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                    />
                    <span className="relative z-10">{skill}</span>
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

function Projects() {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('https://api.github.com/users/kandhwayanushka-hue/repos?sort=updated&per_page=10')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch')
        return res.json()
      })
      .then(data => {
        setRepos(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return (
    <section id="work" className="min-h-screen py-40 px-6 md:px-20 relative">
      <motion.div 
        className="absolute left-0 bottom-0 w-1/3 h-1/2 bg-accent-pink/5 rounded-full blur-[150px] pointer-events-none"
      />
      
      <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView">
        <motion.div className="inline-block mb-16 px-4 py-1 border border-accent/30 rounded-full">
          <span className="font-mono text-accent text-xs tracking-widest">// WORK</span>
        </motion.div>
        
        {loading ? (
          <div className="flex items-center gap-4">
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                className="h-24 bg-bg-secondary rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                style={{ width: `calc(100% / ${3 - i * 0.5}))` }}
              />
            ))}
          </div>
        ) : error ? (
          <motion.div 
            className="p-6 bg-accent-pink/10 border border-accent-pink/30 rounded-lg"
            variants={fadeInUp}
          >
            <p className="font-mono text-accent-pink text-sm">Error: {error}</p>
          </motion.div>
        ) : (
          <div className="grid gap-4">
            {repos.map((repo, idx) => (
              <motion.a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-6 md:p-8 bg-bg-secondary border border-text-secondary/10 hover:border-accent/30 transition-all overflow-hidden"
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                whileHover={{ x: 8 }}
              >
                <motion.div 
                  className="absolute inset-0 bg-accent/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"
                />
                <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-text-primary group-hover:text-accent transition-colors">
                      {repo.name}
                    </h3>
                    <p className="text-text-secondary mt-2 line-clamp-1">{repo.description || 'No description yet'}</p>
                  </div>
                  
                  <div className="flex items-center gap-6 font-mono text-sm text-text-secondary">
                    <motion.span 
                      className="px-2 py-1 bg-bg-primary rounded"
                      whileHover={{ backgroundColor: '#00d4ff', color: '#050505' }}
                    >
                      {repo.language || '—'}
                    </motion.span>
                    <span className="flex items-center gap-1">
                      <motion.span whileHover={{ scale: 1.2 }}>★</motion.span> {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <motion.span whileHover={{ rotate: 20 }}>⑂</motion.span> {repo.forks_count}
                    </span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  )
}

function Building() {
  return (
    <section className="min-h-[80vh] py-40 px-6 md:px-20 flex items-center">
      <motion.div 
        className="w-full p-12 md:p-20 bg-bg-secondary border border-accent/20 relative overflow-hidden"
        variants={fadeInUp}
        initial="initial"
        whileInView="whileInView"
      >
        <motion.div 
          className="absolute inset-0 bg-accent/[0.02]"
          animate={{
            background: [
              'radial-gradient(circle at 0% 0%, rgba(0,212,255,0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 100% 100%, rgba(0,212,255,0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 0% 100%, rgba(0,212,255,0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 0% 0%, rgba(0,212,255,0.1) 0%, transparent 50%)'
            ]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        
        <div className="relative z-10">
          <motion.p 
            className="font-mono text-accent text-sm mb-6"
            variants={fadeInUp}
          >
            [CURRENTLY BUILDING]
          </motion.p>
          
          <motion.h3 
            className="text-4xl md:text-6xl font-display font-bold text-text-primary max-w-2xl"
            variants={fadeInUp}
          >
            Your next <span className="text-accent">project</span> starts here.
          </motion.h3>
          
          <motion.p 
            className="mt-6 text-xl text-text-secondary max-w-xl"
            variants={fadeInUp}
          >
            Looking for opportunities to build real things with real users. 
            Open to collaborations, internships, and freelance projects.
          </motion.p>
          
          <motion.a
            href="mailto:anushkakandhway@gmail.com"
            className="inline-block mt-10 px-10 py-5 bg-accent text-bg-primary font-mono font-bold text-lg hover:bg-white transition-colors"
            whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(0,212,255,0.4)" }}
            whileTap={{ scale: 0.98 }}
          >
            [LET'S TALK]
          </motion.a>
        </div>
      </motion.div>
    </section>
  )
}

function Contact() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 2000], [0, -200])
  
  return (
    <section id="contact" className="min-h-[80vh] py-40 px-6 md:px-20 flex flex-col justify-center relative">
      <motion.div style={{ y }} className="relative z-10 w-full">
        <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView">
          <motion.div className="inline-block mb-8 px-4 py-1 border border-accent/30 rounded-full">
            <span className="font-mono text-accent text-xs tracking-widest">// CONTACT</span>
          </motion.div>
          
          <motion.p className="text-5xl md:text-8xl font-display font-bold leading-[1]">
            <div className="overflow-hidden"><LetterReveal>Let's build</LetterReveal></div>
            <div className="overflow-hidden">
              <span className="text-accent glow-text">something</span>
            </div>
            <div className="overflow-hidden"><LetterReveal>together.</LetterReveal></div>
          </motion.p>

          <div className="flex flex-wrap gap-8 mt-16">
            {[
              { label: 'EMAIL', url: 'mailto:anushkakandhway@gmail.com' },
              { label: 'GITHUB', url: 'https://github.com/kandhwayanushka-hue' },
              { label: 'LINKEDIN', url: 'https://www.linkedin.com/in/anushka-kandhway-0b2463364/' }
            ].map((link, i) => (
              <motion.a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <span className="font-mono text-text-secondary group-hover:text-accent transition-colors text-xl">[{link.label}]</span>
                <motion.span 
                  className="w-8 h-[1px] bg-accent"
                  initial={{ width: 0 }}
                  whileHover={{ width: 32 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <motion.footer 
        className="mt-32 pt-8 border-t border-text-secondary/20 flex flex-col md:flex-row justify-between text-text-secondary text-sm font-mono gap-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <span>© 2026 Anushka Kandhway</span>
        <span className="hidden md:block">BUILT WITH REACT + FRAMER MOTION</span>
      </motion.footer>
    </section>
  )
}

export default function App() {
  return (
    <div className="bg-bg-primary min-h-screen text-text-primary selection:bg-accent selection:text-bg-primary">
      <Cursor />
      <Navigation />
      <Hero />
      <About />
      <Journey />
      <Philosophy />
      <SkillsSection />
      <Projects />
      <Building />
      <Contact />
    </div>
  )
}