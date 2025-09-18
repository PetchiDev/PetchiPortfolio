import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Hero.css'

gsap.registerPlugin(ScrollTrigger)

function Hero() {
  const heroRef = useRef()
  const titleRef = useRef()
  const subtitleRef = useRef()
  const descriptionRef = useRef()
  const ctaRef = useRef()
  const floatingElementsRef = useRef([])

  useEffect(() => {
    // Hero section entrance animation
    const tl = gsap.timeline()

    tl.fromTo(titleRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
    )
    .fromTo(subtitleRef.current,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
      "-=0.8"
    )
    .fromTo(descriptionRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.6"
    )
    .fromTo(ctaRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
      "-=0.4"
    )

    // Floating elements animation
    floatingElementsRef.current.forEach((element, index) => {
      gsap.fromTo(element,
        { 
          y: Math.random() * 100 - 50,
          x: Math.random() * 100 - 50,
          opacity: 0,
          scale: 0
        },
        {
          y: 0,
          x: 0,
          opacity: 0.1,
          scale: 1,
          duration: 2,
          ease: "power2.out",
          delay: 1 + index * 0.2
        }
      )

      // Continuous floating animation
      gsap.to(element, {
        y: "+=20",
        x: "+=10",
        rotation: "+=360",
        duration: 4 + Math.random() * 2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      })
    })

    // Parallax effect on scroll
    ScrollTrigger.create({
      trigger: heroRef.current,
      start: "top top",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        gsap.to(floatingElementsRef.current, {
          y: self.progress * -100,
          duration: 0.3
        })
      }
    })
  }, [])

  return (
    <section ref={heroRef} id="home" className="hero">
      <div className="hero-background">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            ref={el => floatingElementsRef.current[i] = el}
            className="floating-element"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      
      <div className="hero-content">
        <h1 ref={titleRef} className="hero-title">
          <span className="title-line">Hi, I'm</span>
          <span className="title-line highlight">Petchiappan P</span>
        </h1>
        
        <h2 ref={subtitleRef} className="hero-subtitle">
          Dynamic Angular Developer
        </h2>
        
        <p ref={descriptionRef} className="hero-description">
          Building high-performance web applications with 3+ years of expertise in 
          Angular, React, and modern web technologies. Passionate about creating 
          seamless user experiences and scalable solutions.
        </p>
        
        <div ref={ctaRef} className="hero-cta">
          <button 
            className="cta-button primary"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View My Work
          </button>
          <button 
            className="cta-button secondary"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get In Touch
          </button>
        </div>
      </div>
      
      <div className="scroll-indicator">
        <div className="scroll-arrow"></div>
        <span>Scroll Down</span>
      </div>
    </section>
  )
}

export default Hero
