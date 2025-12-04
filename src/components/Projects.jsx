import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CircularTestimonials } from './ui/circular-testimonials'
import MGMImage from '../assets/MGM.jpg'
import QatarLivingImage from '../assets/qatarLiving.png'
import SelectPPEImage from '../assets/SelectPPE.png'
import RowgisticImage from '../assets/Rowgistic.png'
import VleadImage from '../assets/Vlead.jpg'
import './Projects.css'

gsap.registerPlugin(ScrollTrigger)

function Projects() {
  const projectsRef = useRef()
  const titleRef = useRef()
  const containerRef = useRef()

  useEffect(() => {
    // Projects section scroll animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: projectsRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    })

    tl.fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    )

    // Animate container entrance
    if (containerRef.current) {
      gsap.fromTo(containerRef.current,
        { opacity: 0, scale: 0.95, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      )
    }

    // Add floating particles effect
    const particles = []
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div')
      particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: rgba(0, 166, 251, 0.3);
        border-radius: 50%;
        pointer-events: none;
        z-index: 0;
      `
      if (projectsRef.current) {
        projectsRef.current.appendChild(particle)
        particles.push(particle)

        const startX = Math.random() * 100
        const startY = Math.random() * 100

        gsap.set(particle, {
          x: `${startX}%`,
          y: `${startY}%`,
          opacity: 0
        })

        gsap.to(particle, {
          opacity: [0, 0.6, 0],
          scale: [0, 1.5, 0],
          x: `${startX + (Math.random() - 0.5) * 50}%`,
          y: `${startY + (Math.random() - 0.5) * 50}%`,
          duration: 4 + Math.random() * 3,
          repeat: -1,
          delay: Math.random() * 2,
          ease: "sine.inOut"
        })
      }
    }

    return () => {
      particles.forEach(p => p.remove())
    }
  }, [])

  // Convert projects to testimonials format for circular component
  const projectTestimonials = [
    {
      quote: "We modernized Select PPE's legacy WCF services by migrating them to ASP.NET Core Web API, aligning the platform with RESTful best practices and cloud-native standards. Alongside the API migration, we optimized critical database queries to reduce latency and improve throughput.",
      name: "Migration from WCF Service to ASP.NET Core Web API",
      designation: "Select PPE • Oct 2024 - Dec 2024",
      src: SelectPPEImage
    },
    {
      quote: "Modern, scalable multi-vertical platform with Next.js 15 frontend and ASP.NET Core Web API backend. Features autonomous verticals for eCommerce, Marketing, CMS/News, and Jobs with monorepo architecture and feature-based structure.",
      name: "Qatar Living - Monorepo",
      designation: "Qatar Living • March 2025 - September 2025",
      src: QatarLivingImage
    },
    {
      quote: "Scalable REST API using NestJS and TypeORM to read data from multiple sheets and store in database. Includes configurable sheet reader, robust error handling, and comprehensive performance monitoring.",
      name: "REST API for Multiple Sheets",
      designation: "MGM Technologies • April 2024 - September 2024",
      src: MGMImage
    },
    {
      quote: "Responsive website showcasing rowing boats with club information, features, and contact details. Features modern design, search functionality, and seamless user experience across all devices.",
      name: "Rowing Website",
      designation: "Rowgistic • February 2024 - March 2024",
      src: RowgisticImage
    },
    {
      quote: "Role-based access control system for Employees, Admins, and HR personnel. Secure authentication and authorization mechanisms with responsive interface and RESTful API integration.",
      name: "Angular-Based Ticketing System",
      designation: "Vlead Design Services • March 2023 - May 2023",
      src: VleadImage
    },
    {
      quote: "Led successful migration of enterprise-level online transaction application from AngularJS to Angular. Optimized performance, enhanced features, and implemented TypeScript conversion with internationalization support.",
      name: "AngularJS to Angular Migration",
      designation: "Vlead Design Services • January 2023 - August 2023",
      src: VleadImage
    }
  ]

  return (
    <section ref={projectsRef} id="projects" className="projects">
      <div className="container">
        <h2 ref={titleRef} className="section-title">
          Featured Projects
        </h2>
        
        <div ref={containerRef} className="projects-testimonials-wrapper">
          <CircularTestimonials 
            testimonials={projectTestimonials} 
            autoplay={true}
            className="projects-testimonials"
            colors={{
              name: "var(--text-primary)",
              designation: "var(--text-muted)",
              testimony: "var(--text-secondary)",
              arrowBackground: "var(--primary-color)",
              arrowForeground: "#ffffff",
              arrowHoverBackground: "var(--secondary-color)",
            }}
            fontSizes={{
              name: "1.75rem",
              designation: "1rem",
              quote: "1.125rem",
            }}
          />
        </div>
      </div>
    </section>
  )
}

export default Projects
