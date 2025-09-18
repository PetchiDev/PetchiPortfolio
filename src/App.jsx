import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ThemeProvider } from './contexts/ThemeContext'
import './App.css'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import Navbar from './components/Navbar'
import ThemeToggle from './components/ThemeToggle'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

function App() {
  const appRef = useRef()

  useEffect(() => {
    // Set up global GSAP configurations
    gsap.config({
      nullTargetWarn: false,
      trialWarn: false
    })

    // Initial page load animation
    gsap.fromTo(appRef.current, 
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "power2.out" }
    )
  }, [])

  return (
    <ThemeProvider>
      <div ref={appRef} className="App">
        <ThemeToggle />
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <Contact />
      </div>
    </ThemeProvider>
  )
}

export default App
