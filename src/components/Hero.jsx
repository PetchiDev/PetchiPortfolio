import { useEffect, useRef, useCallback, useMemo, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import './Hero.css'

gsap.registerPlugin(ScrollTrigger)

// Function to calculate experience dynamically
function calculateExperience(startDate) {
  const start = new Date(startDate)
  const today = new Date()
  
  let years = today.getFullYear() - start.getFullYear()
  let months = today.getMonth() - start.getMonth()
  
  // Adjust if current month is before start month
  if (months < 0) {
    years--
    months += 12
  }
  
  // Adjust if current day is before start day (haven't completed full month yet)
  if (today.getDate() < start.getDate()) {
    months--
    if (months < 0) {
      years--
      months += 12
    }
  }
  
  return { years, months }
}

function Hero() {
  const heroRef = useRef()
  const titleRef = useRef()
  const subtitleRef = useRef()
  const descriptionRef = useRef()
  const ctaRef = useRef()
  const floatingElementsRef = useRef([])
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [isClicked, setIsClicked] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  // Calculate experience dynamically from start date (24th March 2022)
  // This will automatically update every month on the 24th
  const experience = useMemo(() => {
    return calculateExperience('2022-03-24')
  }, [])

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

    // Cursor position tracking for 3D model
    const handleMouseMove = (e) => {
      const rect = heroRef.current?.getBoundingClientRect()
      if (!rect) return
      
      // Get cursor position relative to hero section (normalized to -1 to 1)
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
      
      // Update cursor position state for 3D model
      setCursorPosition({ x, y })
    }

    // Add mouse move listener
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // Handle click on 3D model
  const handleModelClick = () => {
    setIsClicked(true)
    setTimeout(() => setIsClicked(false), 1000)
  }

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

      {/* 3D Model with React Three Fiber */}
      <div 
        className="hero-3d-model"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleModelClick}
      >
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />
          <RobotModel 
            cursorPosition={cursorPosition}
            isClicked={isClicked}
            isHovered={isHovered}
          />
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            autoRotate={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        </Canvas>
        <div className="model-hint"> Click me!</div>
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
          Building high-performance web applications with {experience.years} {experience.years === 1 ? 'year' : 'years'}{experience.months > 0 ? ` and ${experience.months} ${experience.months === 1 ? 'month' : 'months'}` : ''} of expertise in 
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

// 3D Robot Model Component with Interactive Features
function RobotModel({ cursorPosition, isClicked, isHovered }) {
  // Load GLB file - using public folder for easier access
  const { scene } = useGLTF('/models/base_basic_pbr.glb')
  const modelRef = useRef()
  const headRef = useRef()
  const leftEarRef = useRef()
  const rightEarRef = useRef()
  const leftEyeRef = useRef()
  const rightEyeRef = useRef()
  
  // Find model parts by traversing the scene
  useEffect(() => {
    if (!scene) return
    
    scene.traverse((child) => {
      if (child.isMesh) {
        const name = child.name.toLowerCase()
        
        // Find head (usually the main/largest mesh or named "head")
        if (name.includes('head') || name.includes('face') || !headRef.current) {
          if (!headRef.current || child.geometry.boundingBox.max.y > headRef.current.geometry.boundingBox.max.y) {
            headRef.current = child
          }
        }
        
        // Find ears (usually side meshes or named "ear")
        if (name.includes('ear') || name.includes('antenna')) {
          if (name.includes('left') || name.includes('l_')) {
            leftEarRef.current = child
          } else if (name.includes('right') || name.includes('r_')) {
            rightEarRef.current = child
          } else if (!leftEarRef.current) {
            leftEarRef.current = child
          } else if (!rightEarRef.current) {
            rightEarRef.current = child
          }
        }
        
        // Find eyes (usually small meshes or named "eye")
        if (name.includes('eye') || name.includes('pupil')) {
          if (name.includes('left') || name.includes('l_')) {
            leftEyeRef.current = child
          } else if (name.includes('right') || name.includes('r_')) {
            rightEyeRef.current = child
          } else if (!leftEyeRef.current) {
            leftEyeRef.current = child
          } else if (!rightEyeRef.current) {
            rightEyeRef.current = child
          }
        }
      }
    })
    
    // If no specific parts found, use the main mesh
    if (!headRef.current && scene.children[0]) {
      headRef.current = scene.children[0]
    }
    
    modelRef.current = scene
  }, [scene])
  
  // Animation time for smooth animations
  const timeRef = useRef(0)
  const blinkTimeRef = useRef(0)
  const earMoveTimeRef = useRef(0)
  const clickAnimationRef = useRef(0)
  
  // Main animation loop
  useFrame((state, delta) => {
    timeRef.current += delta
    blinkTimeRef.current += delta
    earMoveTimeRef.current += delta
    
    if (!modelRef.current) return
    
    // 1. FLOATING ANIMATION - Smooth up/down movement
    if (modelRef.current) {
      modelRef.current.position.y = Math.sin(timeRef.current * 0.5) * 0.3
    }
    
    // 2. HEAD TRACKING CURSOR - Follows mouse movement
    if (headRef.current && cursorPosition) {
      const { x, y } = cursorPosition
      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, x * 0.5, 0.1)
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, -y * 0.3, 0.1)
    }
    
    // 3. EYES BLINKING - Random blinking animation (improved)
    if (blinkTimeRef.current > 2 + Math.random() * 3) {
      blinkTimeRef.current = 0
      
      // Blink animation with smooth transition
      if (leftEyeRef.current) {
        const originalScale = leftEyeRef.current.scale.y || 1
        // Close eye
        gsap.to(leftEyeRef.current.scale, {
          y: 0.05,
          duration: 0.1,
          ease: "power2.in",
          onComplete: () => {
            // Open eye
            if (leftEyeRef.current) {
              gsap.to(leftEyeRef.current.scale, {
                y: originalScale,
                duration: 0.15,
                ease: "power2.out"
              })
            }
          }
        })
      }
      
      if (rightEyeRef.current) {
        const originalScale = rightEyeRef.current.scale.y || 1
        // Close eye
        gsap.to(rightEyeRef.current.scale, {
          y: 0.05,
          duration: 0.1,
          ease: "power2.in",
          onComplete: () => {
            // Open eye
            if (rightEyeRef.current) {
              gsap.to(rightEyeRef.current.scale, {
                y: originalScale,
                duration: 0.15,
                ease: "power2.out"
              })
            }
          }
        })
      }
    }
    
    // 4. EARS MOVING - Enhanced ear movement animation (left and right)
    if (leftEarRef.current) {
      // Left ear - more pronounced movement
      leftEarRef.current.rotation.z = Math.sin(earMoveTimeRef.current * 1.2) * 0.4
      leftEarRef.current.rotation.x = Math.sin(earMoveTimeRef.current * 0.8) * 0.2
      leftEarRef.current.rotation.y = Math.sin(earMoveTimeRef.current * 0.5) * 0.15
    }
    
    if (rightEarRef.current) {
      // Right ear - opposite movement for natural look
      rightEarRef.current.rotation.z = -Math.sin(earMoveTimeRef.current * 1.2) * 0.4
      rightEarRef.current.rotation.x = Math.sin(earMoveTimeRef.current * 0.8) * 0.2
      rightEarRef.current.rotation.y = -Math.sin(earMoveTimeRef.current * 0.5) * 0.15
    }
    
    // 5. HOVER EFFECT - Scale up slightly when hovered
    if (modelRef.current) {
      const targetScale = isHovered ? 1.1 : 1.0
      modelRef.current.scale.x = THREE.MathUtils.lerp(modelRef.current.scale.x, targetScale, 0.1)
      modelRef.current.scale.y = THREE.MathUtils.lerp(modelRef.current.scale.y, targetScale, 0.1)
      modelRef.current.scale.z = THREE.MathUtils.lerp(modelRef.current.scale.z, targetScale, 0.1)
    }
    
    // 6. CLICK REACTION - Bounce and spin when clicked
    if (isClicked) {
      clickAnimationRef.current += delta * 5
      
      if (modelRef.current) {
        // Bounce effect
        modelRef.current.position.y = Math.sin(clickAnimationRef.current) * 0.5
        // Spin effect
        modelRef.current.rotation.y += delta * 2
        
        // Ears wiggle excitedly
        if (leftEarRef.current) {
          leftEarRef.current.rotation.z = Math.sin(clickAnimationRef.current * 10) * 0.5
        }
        if (rightEarRef.current) {
          rightEarRef.current.rotation.z = -Math.sin(clickAnimationRef.current * 10) * 0.5
        }
        
        // Eyes pop
        if (leftEyeRef.current) {
          leftEyeRef.current.scale.setScalar(1.2)
        }
        if (rightEyeRef.current) {
          rightEyeRef.current.scale.setScalar(1.2)
        }
      }
    } else {
      clickAnimationRef.current = 0
      
      // Reset after click animation
      if (modelRef.current && clickAnimationRef.current === 0) {
        modelRef.current.rotation.y = THREE.MathUtils.lerp(modelRef.current.rotation.y, 0, 0.1)
      }
      
      if (leftEyeRef.current) {
        leftEyeRef.current.scale.setScalar(THREE.MathUtils.lerp(leftEyeRef.current.scale.x, 1, 0.1))
      }
      if (rightEyeRef.current) {
        rightEyeRef.current.scale.setScalar(THREE.MathUtils.lerp(rightEyeRef.current.scale.x, 1, 0.1))
      }
    }
  })
  
  return <primitive object={scene} ref={modelRef} />
}

// Preload the model
useGLTF.preload('/models/base_basic_pbr.glb')

export default Hero
