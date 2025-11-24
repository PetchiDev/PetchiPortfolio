import { useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Spline from '@splinetool/react-spline'
import './Hero.css'

gsap.registerPlugin(ScrollTrigger)

function Hero() {
  const heroRef = useRef()
  const titleRef = useRef()
  const subtitleRef = useRef()
  const descriptionRef = useRef()
  const ctaRef = useRef()
  const floatingElementsRef = useRef([])
  const splineRef = useRef()
  const robotRef = useRef()

  useEffect(() => {
    // Hero section entrance animation with enhanced effects
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

    // Split text animation for title
    const titleLines = titleRef.current?.querySelectorAll('.title-line')
    if (titleLines) {
      titleLines.forEach((line, index) => {
        gsap.fromTo(line,
          { 
            y: 100, 
            opacity: 0,
            rotationX: -90,
            transformOrigin: "50% 50%"
          },
          { 
            y: 0, 
            opacity: 1,
            rotationX: 0,
            duration: 1.2,
            ease: "power3.out",
            delay: index * 0.2
          }
        )
      })
    }

    tl.fromTo(subtitleRef.current,
      { 
        y: 80, 
        opacity: 0,
        scale: 0.9
      },
      { 
        y: 0, 
        opacity: 1,
        scale: 1,
        duration: 1, 
        ease: "power2.out"
      },
      "-=0.8"
    )
    .fromTo(descriptionRef.current,
      { 
        y: 60, 
        opacity: 0,
        filter: "blur(10px)"
      },
      { 
        y: 0, 
        opacity: 1,
        filter: "blur(0px)",
        duration: 1, 
        ease: "power2.out" 
      },
      "-=0.6"
    )
    .fromTo(ctaRef.current,
      { 
        scale: 0, 
        opacity: 0,
        rotation: -180
      },
      { 
        scale: 1, 
        opacity: 1,
        rotation: 0,
        duration: 0.8, 
        ease: "back.out(1.7)" 
      },
      "-=0.4"
    )

    // Enhanced floating elements animation with more dynamic movement
    floatingElementsRef.current.forEach((element, index) => {
      const randomDelay = Math.random() * 0.5
      const randomDuration = 3 + Math.random() * 3
      
      gsap.fromTo(element,
        { 
          y: Math.random() * 200 - 100,
          x: Math.random() * 200 - 100,
          opacity: 0,
          scale: 0,
          rotation: Math.random() * 360
        },
        {
          y: 0,
          x: 0,
          opacity: 0.15,
          scale: 1,
          rotation: 0,
          duration: 2,
          ease: "elastic.out(1, 0.5)",
          delay: 1 + index * 0.1 + randomDelay
        }
      )

      // Continuous floating animation with more variation
      gsap.to(element, {
        y: `+=${20 + Math.random() * 30}`,
        x: `+=${10 + Math.random() * 20}`,
        rotation: `+=${360 + Math.random() * 360}`,
        duration: randomDuration,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      })

      // Pulse animation
      gsap.to(element, {
        scale: 1.2,
        opacity: 0.25,
        duration: 2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: index * 0.1
      })
    })

    // Enhanced parallax effect on scroll
    ScrollTrigger.create({
      trigger: heroRef.current,
      start: "top top",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress
        // Parallax for floating elements
        gsap.to(floatingElementsRef.current, {
          y: progress * -100,
          rotation: progress * 360,
          duration: 0.3
        })
        // Parallax for content
        if (titleRef.current) {
          gsap.to(titleRef.current, {
            y: progress * 50,
            opacity: 1 - progress * 0.5,
            duration: 0.3
          })
        }
        if (subtitleRef.current) {
          gsap.to(subtitleRef.current, {
            y: progress * 30,
            opacity: 1 - progress * 0.3,
            duration: 0.3
          })
        }
        if (descriptionRef.current) {
          gsap.to(descriptionRef.current, {
            y: progress * 20,
            opacity: 1 - progress * 0.2,
            duration: 0.3
          })
        }
        if (ctaRef.current) {
          gsap.to(ctaRef.current, {
            y: progress * 15,
            opacity: 1 - progress * 0.15,
            duration: 0.3
          })
        }
      }
    })

    // Cursor follow effect for buttons
    const buttons = ctaRef.current?.querySelectorAll('.cta-button')
    buttons?.forEach(button => {
      button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        
        gsap.to(button, {
          backgroundPosition: `${x}px ${y}px`,
          duration: 0.3,
          ease: "power2.out"
        })
      })
    })

    // Cursor follow effect for robot head
    const handleMouseMove = (e) => {
      if (!robotRef.current || !splineRef.current) return
      
      const rect = heroRef.current?.getBoundingClientRect()
      if (!rect) return
      
      // Get cursor position relative to hero section
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2 // -1 to 1
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2 // -1 to 1
      
      // Convert to radians and limit rotation
      const rotationY = (x * 30) * (Math.PI / 180) // max 30 degrees in radians
      const rotationX = (-y * 20) * (Math.PI / 180) // max 20 degrees in radians
      
      // Smoothly animate rotation towards cursor using GSAP
      gsap.to(robotRef.current.rotation, {
        y: rotationY,
        x: rotationX,
        duration: 0.5,
        ease: "power2.out"
      })
    }

    // Add mouse move listener
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // Spline onLoad handler
  const onLoad = useCallback((spline) => {
    splineRef.current = spline
    
    // Find robot head object (try common naming conventions)
    const robotHead = spline.findObjectByName('Head') || 
                      spline.findObjectByName('head') || 
                      spline.findObjectByName('Robot') ||
                      spline.findObjectByName('robot') ||
                      spline.findObjectByName('RobotHead')
    
    if (robotHead) {
      robotRef.current = robotHead
      
      // Initial floating animation
      gsap.to(robotHead.position, {
        y: robotHead.position.y + 10,
        duration: 2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      })

      // Gentle rotation animation
      gsap.to(robotHead.rotation, {
        y: robotHead.rotation.y + 0.5,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      })
    }
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

      {/* Spline Robot on the right */}
      {/* TODO: Add your Spline robot scene URL here */}
      {/* 
      <div className="hero-robot">
        <Spline 
          scene="YOUR_SPLINE_SCENE_URL_HERE"
          onLoad={onLoad}
        />
      </div>
      */}
      
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
          Angular, React, .NET and modern web technologies. Passionate about creating 
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
