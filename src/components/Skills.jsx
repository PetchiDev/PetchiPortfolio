import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Skills.css'

gsap.registerPlugin(ScrollTrigger)

function Skills() {
  const skillsRef = useRef()
  const titleRef = useRef()
  const skillsContainerRef = useRef()
  const skillItemsRef = useRef([])

  useEffect(() => {
    // Skills section scroll animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: skillsRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    })

    tl.fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    )
    .fromTo(skillItemsRef.current,
      { y: 100, opacity: 0, scale: 0.8 },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1, 
        duration: 0.6, 
        stagger: 0.1, 
        ease: "back.out(1.7)" 
      },
      "-=0.4"
    )

    // Skill bars animation
    skillItemsRef.current.forEach((skillItem, index) => {
      const progressBar = skillItem?.querySelector('.skill-progress')
      if (progressBar) {
        const percentage = progressBar.dataset.percentage
        gsap.fromTo(progressBar,
          { width: 0 },
          {
            width: `${percentage}%`,
            duration: 1.5,
            ease: "power2.out",
            delay: 0.5 + index * 0.1,
            scrollTrigger: {
              trigger: skillItem,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        )
      }
    })
  }, [])

  const skillCategories = [
    {
      title: "Frontend Development",
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
      skills: [
        { name: "SQL Server", percentage: 85, level: "Advanced" },
        { name: "MSSQL", percentage: 80, level: "Advanced" },
        { name: "Azure", percentage: 90, level: "Expert" },
        { name: "TypeORM", percentage: 75, level: "Intermediate" }
      ]
    },
    {
      title: "Tools & Others",
      skills: [
        { name: "Git", percentage: 85, level: "Advanced" },
        { name: "GSAP", percentage: 80, level: "Advanced" },
        { name: "Bootstrap", percentage: 90, level: "Expert" },
        { name: "Ionic", percentage: 70, level: "Intermediate" }
      ]
    }
  ]

  return (
    <section ref={skillsRef} id="skills" className="skills">
      <div className="container">
        <h2 ref={titleRef} className="section-title">
          Skills & Expertise
        </h2>
        
        <div ref={skillsContainerRef} className="skills-container">
          {skillCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="skill-category">
              <h3 className="category-title">{category.title}</h3>
              <div className="skills-list">
                {category.skills.map((skill, skillIndex) => (
                  <div 
                    key={skillIndex}
                    ref={el => skillItemsRef.current[categoryIndex * 10 + skillIndex] = el}
                    className="skill-item"
                  >
                    <div className="skill-header">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-level">{skill.level}</span>
                    </div>
                    <div className="skill-bar">
                      <div 
                        className="skill-progress"
                        data-percentage={skill.percentage}
                        style={{ width: '0%' }}
                      ></div>
                    </div>
                    <div className="skill-percentage">{skill.percentage}%</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
