import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Award, ExternalLink, Calendar, CheckCircle } from 'lucide-react'
import './Certifications.css'

gsap.registerPlugin(ScrollTrigger)

function Certifications() {
  const certsRef = useRef()
  const titleRef = useRef()
  const certItemsRef = useRef([])

  useEffect(() => {
    // Certifications section scroll animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: certsRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    })

    tl.fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    )
    .fromTo(certItemsRef.current,
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

    // Certification hover animations
    certItemsRef.current.forEach((certItem, index) => {
      if (certItem) {
        certItem.addEventListener('mouseenter', () => {
          gsap.to(certItem, { 
            scale: 1.05, 
            y: -10,
            duration: 0.3, 
            ease: "power2.out" 
          })
        })
        
        certItem.addEventListener('mouseleave', () => {
          gsap.to(certItem, { 
            scale: 1, 
            y: 0,
            duration: 0.3, 
            ease: "power2.out" 
          })
        })
      }
    })
  }, [])

  const certifications = [
    {
      id: 1,
      title: "Microsoft Certified: Azure Developer Associate",
      issuer: "Microsoft",
      validity: "September 2022 - October 2024",
      credentialId: "A97B9DCD5390D87F",
      description: "Demonstrates expertise in designing, building, testing, and maintaining cloud applications and services on Microsoft Azure.",
      skills: ["Azure App Service", "Azure Functions", "Azure Storage", "Azure SQL Database", "Azure DevOps"],
      status: "Active",
      credentialUrl: "https://learn.microsoft.com/api/credentials/share/en-us/PetchiappanP-4916/A97B9DCD5390D87F?sharingId=190516B3F744383E"
    },
    {
      id: 2,
      title: "Microsoft Certified: Azure Administrator Associate",
      issuer: "Microsoft",
      validity: "October 2022 - October 2024",
      credentialId: "73D40B26AF313CEC",
      description: "Validates skills in implementing, managing, and monitoring identity, governance, storage, compute, and virtual networks in a cloud environment.",
      skills: ["Azure Portal", "Azure CLI", "PowerShell", "Azure Monitor", "Azure Security Center"],
      status: "Active",
      credentialUrl: "https://learn.microsoft.com/api/credentials/share/en-us/PetchiappanP-4916/73D40B26AF313CEC?sharingId=190516B3F744383E"
    },
    {
      id: 3,
      title: "Microsoft Certified: Azure Solutions Architect Expert",
      issuer: "Microsoft",
      validity: "November 2023 - December 2024",
      credentialId: "D1C80525B0465352",
      description: "Advanced certification for designing solutions that run on Microsoft Azure, including compute, network, storage, and security.",
      skills: ["Azure Architecture", "Cloud Design Patterns", "Azure Security", "Cost Optimization", "Disaster Recovery"],
      status: "Active",
      credentialUrl: "https://learn.microsoft.com/api/credentials/share/en-us/PetchiappanP-4916/D1C80525B0465352?sharingId=190516B3F744383E"
    },
    {
      id: 4,
      title: "Microsoft Certified: Azure AI Engineer Associate",
      issuer: "Microsoft",
      validity: "November 2023 - December 2024",
      credentialId: "52202726E812E8C9",
      description: "Validates expertise in using cognitive services, machine learning, and knowledge mining to build AI solutions on Azure.",
      skills: ["Azure Cognitive Services", "Azure Machine Learning", "Azure Bot Service", "Computer Vision", "Natural Language Processing"],
      status: "Active",
      credentialUrl: "https://learn.microsoft.com/api/credentials/share/en-us/PetchiappanP-4916/52202726E812E8C9?sharingId=190516B3F744383E"
    }
  ]

  const getStatusColor = (status) => {
    return status === 'Active' ? '#10b981' : '#f59e0b'
  }

  return (
    <section ref={certsRef} id="certifications" className="certifications">
      <div className="container">
        <h2 ref={titleRef} className="section-title">
          <Award className="title-icon" />
          Certifications
        </h2>
        
        <div className="certifications-grid">
          {certifications.map((cert, index) => (
            <div 
              key={cert.id}
              ref={el => certItemsRef.current[index] = el}
              className="cert-item"
            >
              <div className="cert-header">
                <div className="cert-icon">
                  <Award className="award-icon" />
                </div>
                <div className="cert-status">
                  <CheckCircle 
                    className="status-icon" 
                    style={{ color: getStatusColor(cert.status) }}
                  />
                  <span style={{ color: getStatusColor(cert.status) }}>
                    {cert.status}
                  </span>
                </div>
              </div>
              
              <div className="cert-content">
                <h3 className="cert-title">{cert.title}</h3>
                <p className="cert-issuer">{cert.issuer}</p>
                <p className="cert-description">{cert.description}</p>
                
                <div className="cert-details">
                  <div className="cert-detail">
                    <Calendar className="detail-icon" />
                    <span>{cert.validity}</span>
                  </div>
                  <div className="cert-detail">
                    <span className="detail-label">Credential ID:</span>
                    <span className="credential-id">{cert.credentialId}</span>
                  </div>
                </div>
                
                <div className="cert-skills">
                  <h4>Key Skills:</h4>
                  <div className="skills-tags">
                    {cert.skills.map((skill, skillIndex) => (
                      <span key={skillIndex} className="skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <a 
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-link"
                >
                  <ExternalLink className="link-icon" />
                  View Credential
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Certifications
