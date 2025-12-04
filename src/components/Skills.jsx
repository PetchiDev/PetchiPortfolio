import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Code, Server, Cloud, Wrench } from 'lucide-react'
import './Skills.css'

gsap.registerPlugin(ScrollTrigger)

function Skills() {
  const skillsRef = useRef()
  const titleRef = useRef()
  const categoryRefs = useRef([])
  const skillCardRefs = useRef([])

  // Technology icons - using official CDN sources
  const techIcons = {
    // Frontend
    'Angular': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg',
    'React.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    'Next.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
    'TypeScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    'HTML5/CSS3': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    // Backend
    'ASP.NET Core': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg',
    'C#': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg',
    'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    'NestJS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-plain.svg',
    'REST APIs': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
    // Database & Cloud
    'MSSQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg',
    'Azure': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg',
    'TypeORM': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    // Tools
    'Git': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    'GSAP': 'https://raw.githubusercontent.com/greensock/GSAP/main/logo.svg',
    'Bootstrap': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg',
    'Ionic': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ionic/ionic-original.svg'
  }

  const categoryIcons = {
    'Frontend Development': Code,
    'Backend Development': Server,
    'Database & Cloud': Cloud,
    'Tools & Others': Wrench
  }

  const skillCategories = [
    {
      title: "Frontend Development",
      icon: Code,
      color: "#00D4FF",
      skills: [
        { name: "Angular", percentage: 95, level: "Expert" },
        { name: "React.js", percentage: 85, level: "Advanced" },
        { name: "Next.js", percentage: 80, level: "Advanced" },
        { name: "TypeScript", percentage: 90, level: "Expert" },
        { name: "HTML5/CSS3", percentage: 95, level: "Expert" },
        { name: "JavaScript", percentage: 90, level: "Expert" }
      ]
    },
    {
      title: "Backend Development",
      icon: Server,
      color: "#10B981",
      skills: [
        { name: "ASP.NET Core", percentage: 85, level: "Advanced" },
        { name: "C#", percentage: 80, level: "Advanced" },
        { name: "Node.js", percentage: 75, level: "Intermediate" },
        { name: "NestJS", percentage: 70, level: "Intermediate" },
        { name: "REST APIs", percentage: 90, level: "Expert" }
      ]
    },
    {
      title: "Database & Cloud",
      icon: Cloud,
      color: "#8B5CF6",
      skills: [
        { name: "MSSQL", percentage: 80, level: "Advanced" },
        { name: "Azure", percentage: 70, level: "Intermediate" },
        { name: "TypeORM", percentage: 75, level: "Intermediate" }
      ]
    },
    {
      title: "Tools & Others",
      icon: Wrench,
      color: "#F59E0B",
      skills: [
        { name: "Git", percentage: 85, level: "Advanced" },
        { name: "GSAP", percentage: 80, level: "Advanced" },
        { name: "Bootstrap", percentage: 90, level: "Expert" },
        { name: "Ionic", percentage: 70, level: "Intermediate" }
      ]
    }
  ]

  useEffect(() => {
    // Title animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: skillsRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    })

    tl.fromTo(titleRef.current,
      { 
        y: 50, 
        opacity: 0,
        scale: 0.9
      },
      { 
        y: 0, 
        opacity: 1,
        scale: 1,
        duration: 0.8, 
        ease: "power2.out" 
      }
    )

    // Category cards animation with parallelogram effect
    categoryRefs.current.forEach((categoryRef, index) => {
      if (categoryRef) {
        const cards = categoryRef.querySelectorAll('.skill-parallelogram-card')
        
        // Parallelogram entrance animation
        gsap.fromTo(categoryRef,
          {
            opacity: 0,
            x: index % 2 === 0 ? -100 : 100,
            rotation: index % 2 === 0 ? -5 : 5,
            scale: 0.8
          },
          {
            opacity: 1,
            x: 0,
            rotation: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: categoryRef,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        )

        // Individual skill cards animation
        cards.forEach((card, cardIndex) => {
          const progressBar = card.querySelector('.skill-progress-bar')
          const percentage = card.dataset.percentage

          // Card entrance with parallelogram skew
          gsap.fromTo(card,
            {
              opacity: 0,
              y: 50,
              skewX: -15,
              scale: 0.8
            },
            {
              opacity: 1,
              y: 0,
              skewX: 0,
              scale: 1,
              duration: 0.6,
              delay: (index * 0.3) + (cardIndex * 0.15),
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play none none reverse"
              }
            }
          )

          // Progress bar animation
          if (progressBar && percentage) {
            gsap.fromTo(progressBar,
              { width: 0 },
              {
                width: `${percentage}%`,
                duration: 1.5,
                delay: (index * 0.3) + (cardIndex * 0.15) + 0.3,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 90%",
                  toggleActions: "play none none reverse"
                }
              }
            )
          }

          // Hover animation with parallelogram effect
          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              skewX: -5,
              y: -10,
              scale: 1.05,
              duration: 0.3,
              ease: "power2.out"
            })
            
            // Icon rotation
            const icon = card.querySelector('.skill-icon')
            if (icon) {
              gsap.to(icon, {
                rotation: 360,
                duration: 0.6,
                ease: "back.out(1.7)"
              })
            }
          })

          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              skewX: 0,
              y: 0,
              scale: 1,
              duration: 0.3,
              ease: "power2.out"
            })
          })
        })
      }
    })

    // Continuous floating animation for category headers
    categoryRefs.current.forEach((categoryRef) => {
      if (categoryRef) {
        const header = categoryRef.querySelector('.category-header')
        if (header) {
          gsap.to(header, {
            y: -10,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          })
        }
      }
    })

  }, [])

  return (
    <section ref={skillsRef} id="skills" className="skills">
      <div className="container">
        <h2 ref={titleRef} className="section-title">
          Skills & Expertise
        </h2>
        
        <div className="skills-categories-grid">
          {skillCategories.map((category, categoryIndex) => {
            const CategoryIcon = category.icon
            return (
              <div 
                key={categoryIndex}
                ref={el => categoryRefs.current[categoryIndex] = el}
                className="skill-category-wrapper"
                style={{ '--category-color': category.color }}
              >
                <div className="category-header">
                  <div className="category-icon-wrapper">
                    <CategoryIcon className="category-icon" />
                  </div>
                  <h3 className="category-title">{category.title}</h3>
                </div>
                
                <div className="skills-parallelogram-container">
                  {category.skills.map((skill, skillIndex) => (
                    <div
                      key={skillIndex}
                      ref={el => {
                        const index = categoryIndex * 20 + skillIndex
                        if (!skillCardRefs.current[index]) {
                          skillCardRefs.current[index] = el
                        }
                      }}
                      className="skill-parallelogram-card"
                      data-percentage={skill.percentage}
                    >
                      <div className="skill-card-content">
                        <div className="skill-top-section">
                          <div className="skill-icon-wrapper">
                            {techIcons[skill.name] ? (
                              <img 
                                src={techIcons[skill.name]} 
                                alt={skill.name}
                                className="skill-icon"
                                onError={(e) => {
                                  e.target.style.display = 'none'
                                }}
                              />
                            ) : (
                              <div className="skill-icon-fallback">
                                {skill.name.charAt(0)}
                              </div>
                            )}
                          </div>
                          <div className="skill-info">
                            <span className="skill-name">{skill.name}</span>
                            <span className="skill-level">{skill.level}</span>
                          </div>
                        </div>
                        
                        <div className="skill-progress-container">
                          <div className="skill-progress-track">
                            <div 
                              className="skill-progress-bar"
                              style={{ width: '0%' }}
                            ></div>
                          </div>
                          <span className="skill-percentage">{skill.percentage}%</span>
                        </div>
                      </div>
                      
                      {/* Parallelogram decorative elements */}
                      <div className="parallelogram-decoration parallelogram-top"></div>
                      <div className="parallelogram-decoration parallelogram-bottom"></div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Skills
