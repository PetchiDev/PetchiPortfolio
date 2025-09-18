import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { User, Award, Briefcase, MapPin } from 'lucide-react'
import userAvatar from '../assets/user-avatar.svg'
import './About.css'

gsap.registerPlugin(ScrollTrigger)

function About() {
  const aboutRef = useRef()
  const titleRef = useRef()
  const contentRef = useRef()
  const statsRef = useRef([])
  const imageRef = useRef()

  useEffect(() => {
    // About section scroll animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: aboutRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    })

    tl.fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    )
    .fromTo(contentRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.4"
    )
    .fromTo(imageRef.current,
      { x: 50, opacity: 0, scale: 0.8 },
      { x: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" },
      "-=0.6"
    )

    // Stats counter animation
    statsRef.current.forEach((stat, index) => {
      const endValue = parseInt(stat.textContent)
      // Set initial value to 0
      stat.textContent = 0
      
      gsap.fromTo(stat,
        { textContent: 0 },
        {
          textContent: endValue,
          duration: 1.5,
          ease: "power2.out",
          snap: { textContent: 1 },
          delay: 0,
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      )
    })

    // Image hover animation
    const imageElement = imageRef.current
    if (imageElement) {
      imageElement.addEventListener('mouseenter', () => {
        gsap.to(imageElement, { scale: 1.05, duration: 0.3, ease: "power2.out" })
      })
      
      imageElement.addEventListener('mouseleave', () => {
        gsap.to(imageElement, { scale: 1, duration: 0.3, ease: "power2.out" })
      })
    }
  }, [])

  const stats = [
    { number: 3, suffix: "+", label: "Years Experience" },
    { number: 15, suffix: "+", label: "Projects Completed" },
    { number: 4, suffix: "", label: "Azure Certifications" },
    { number: 100, suffix: "%", label: "Client Satisfaction" }
  ]

  return (
    <section ref={aboutRef} id="about" className="about">
      <div className="container">
        <h2 ref={titleRef} className="section-title">
          About Me
        </h2>
        
        <div className="about-content">
          <div ref={contentRef} className="about-text">
            <p className="about-description">
              I'm a passionate <strong>Software Developer</strong> with over 3 years of experience 
              in building modern web applications. Currently working at <strong>KRYPTOS INFO SYSTEMS</strong> 
              in Chennai, I specialize in Angular, React, and .NET technologies.
            </p>
            
            <p className="about-description">
              My journey in software development began with a B.Tech in Mechanical Engineering 
              from SNS College of Technology, Coimbatore. However, my passion for technology 
              led me to transition into software development, where I've been creating 
              innovative solutions ever since.
            </p>
            
            <p className="about-description">
              I'm particularly proud of my <strong>4 Microsoft Azure certifications</strong> and 
              my expertise in migrating legacy AngularJS applications to modern Angular frameworks. 
              I believe in writing clean, maintainable code and creating user experiences that 
              make a difference.
            </p>
            
            <div className="about-stats">
              {stats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <div 
                    ref={el => statsRef.current[index] = el}
                    className="stat-number"
                  >
                    {stat.number}{stat.suffix}
                  </div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div ref={imageRef} className="about-image">
            <div className="image-container">
              <img src={userAvatar} alt="Petchiappan P" className="user-image" />
              <div className="image-overlay">
                <div className="overlay-content">
                  <User className="overlay-icon" />
                  <span>Software Developer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
