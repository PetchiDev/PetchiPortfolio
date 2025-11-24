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
import Reviews from './components/Reviews'
import Contact from './components/Contact'
import Navbar from './components/Navbar'

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

    // Initial page load animation with smooth fade-in
    gsap.fromTo(appRef.current, 
      { opacity: 0, scale: 0.98 },
      { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" }
    )

    // Enhanced smooth scroll behavior for navigation
    const handleSmoothScroll = () => {
      const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link')
      navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          const sectionId = link.textContent.toLowerCase().trim()
          const target = document.getElementById(sectionId)
          if (target) {
            e.preventDefault()
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - 80
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            })
          }
        })
      })
    }

    // Initialize smooth scroll after DOM is ready
    setTimeout(() => {
      handleSmoothScroll()
    }, 100)

    // Intersection Observer for fade-in animations on scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          gsap.fromTo(entry.target,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
          )
          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)

    // Observe all sections
    const sections = document.querySelectorAll('section')
    sections.forEach(section => {
      observer.observe(section)
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <ThemeProvider>
      <div ref={appRef} className="App">
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <Reviews />
        <Contact />
      </div>
    </ThemeProvider>
  )
}

export default App
