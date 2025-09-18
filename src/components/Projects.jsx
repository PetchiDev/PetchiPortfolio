import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
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
  const projectsContainerRef = useRef()
  const projectItemsRef = useRef([])
  const [activeProject, setActiveProject] = useState(0)

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
    .fromTo(projectItemsRef.current,
      { y: 100, opacity: 0, scale: 0.8 },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1, 
        duration: 0.8, 
        stagger: 0.2, 
        ease: "back.out(1.7)" 
      },
      "-=0.4"
    )

    // Project hover animations
    projectItemsRef.current.forEach((projectItem, index) => {
      if (projectItem) {
        projectItem.addEventListener('mouseenter', () => {
          gsap.to(projectItem, { 
            scale: 1.05, 
            y: -10,
            duration: 0.3, 
            ease: "power2.out" 
          })
        })
        
        projectItem.addEventListener('mouseleave', () => {
          gsap.to(projectItem, { 
            scale: 1, 
            y: 0,
            duration: 0.3, 
            ease: "power2.out" 
          })
        })
      }
    })
  }, [])

  const projects = [
    {
      id: 1,
      title: "Migration from WCF Service to ASP.NET Core Web API",
      description: "We modernized Select PPE's legacy WCF services by migrating them to ASP.NET Core Web API, aligning the platform with RESTful best practices and cloud-native standards. Alongside the API migration, we optimized critical database queries to reduce latency and improve throughput, and we integrated the new APIs into the existing ASP.NET MVC application with resilient, typed HTTP clients. Target runtime is .NET 8 (LTS) with .NET 9 readiness for performance and observability improvements.",
      technologies: ["ASP.NET Core", "WCF Migration", ".NET 8", "RESTful API", "Database Optimization", "HTTP Clients"],
      image: SelectPPEImage,
      duration: "Oct 2024 - Dec 2024",
      client: "Select PPE",
      features: ["WCF to ASP.NET Core Migration", "RESTful API Implementation", "Database Query Optimization", "Resilient HTTP Clients", ".NET 8 LTS Support", "Cloud-native Standards"]
    },
    {
      id: 2,
      title: "Qatar Living - Monorepo",
      description: "Modern, scalable multi-vertical platform with Next.js 15 frontend and ASP.NET Core Web API backend. Features autonomous verticals for eCommerce, Marketing, CMS/News, and Jobs.",
      technologies: ["Next.js 15", "ASP.NET Core", "TypeScript", "TanStack Query", ".NET 8/9"],
      image: QatarLivingImage,
      duration: "March 2025 - September 2025",
      client: "Qatar Living",
      features: ["Monorepo Architecture", "Feature-based Structure", "Shared Libraries", "Clean Service-oriented Backend"]
    },
    {
      id: 3,
      title: "REST API for Multiple Sheets",
      description: "Scalable REST API using NestJS and TypeORM to read data from multiple sheets and store in database. Includes configurable sheet reader and robust error handling.",
      technologies: ["NestJS", "TypeORM", "Node.js", "TypeScript", "REST API"],
      image: MGMImage,
      duration: "April 2024 - September 2024",
      client: "MGM Technologies",
      features: ["Scalable Architecture", "Configurable Sheet Reader", "Robust Error Handling", "Performance Monitoring"]
    },
    {
      id: 4,
      title: "Rowing Website",
      description: "Responsive website showcasing rowing boats with club information, features, and contact details. Features modern design and seamless user experience across devices.",
      technologies: ["Angular 16", "Bootstrap 5", "TypeScript", "HTML5", "CSS3"],
      image: RowgisticImage,
      duration: "February 2024 - March 2024",
      client: "Rowgistic",
      features: ["Responsive Design", "Search Functionality", "Modern UI/UX", "Cross-device Compatibility"]
    },
    {
      id: 5,
      title: "Angular-Based Ticketing System",
      description: "Role-based access control system for Employees, Admins, and HR personnel. Secure authentication and authorization mechanisms with responsive interface.",
      technologies: ["Angular 16", "TypeScript", "ASP.NET Core", "REST API", "Authentication"],
      image: VleadImage,
      duration: "March 2023 - May 2023",
      client: "Vlead Design Services",
      features: ["Role-based Access", "Secure Authentication", "Responsive Interface", "RESTful API"]
    },
    {
      id: 6,
      title: "AngularJS to Angular Migration",
      description: "Led successful migration of enterprise-level online transaction application from AngularJS to Angular. Optimized performance and enhanced features during migration.",
      technologies: ["Angular", "AngularJS", "TypeScript", "Migration", "Performance Optimization"],
      image: VleadImage,
      duration: "January 2023 - August 2023",
      client: "Vlead Design Services",
      features: ["Legacy Migration", "Performance Optimization", "TypeScript Conversion", "Internationalization"]
    }
  ]

  const handleProjectClick = (projectId) => {
    setActiveProject(projectId - 1)
    gsap.fromTo(projectItemsRef.current[projectId - 1],
      { scale: 0.9 },
      { scale: 1, duration: 0.3, ease: "power2.out" }
    )
  }

  return (
    <section ref={projectsRef} id="projects" className="projects">
      <div className="container">
        <h2 ref={titleRef} className="section-title">
          Featured Projects
        </h2>
        
        <div ref={projectsContainerRef} className="projects-container">
          {projects.map((project, index) => (
            <div 
              key={project.id}
              ref={el => projectItemsRef.current[index] = el}
              className={`project-item ${activeProject === index ? 'active' : ''}`}
              onClick={() => handleProjectClick(project.id)}
            >
              <div className="project-image">
                <img src={project.image} alt={project.client} className="project-client-image" />
              </div>
              
              <div className="project-content">
                <div className="project-header">
                  <h3 className="project-title">{project.title}</h3>
                  <span className="project-duration">{project.duration}</span>
                </div>
                
                <p className="project-description">{project.description}</p>
                
                <div className="project-client">
                  <strong>Client:</strong> {project.client}
                </div>
                
                <div className="project-technologies">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="project-features">
                  <h4>Key Features:</h4>
                  <ul>
                    {project.features.map((feature, featureIndex) => (
                      <li key={featureIndex}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
