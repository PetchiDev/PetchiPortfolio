import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Award, ExternalLink, Calendar, CheckCircle, Sparkles } from 'lucide-react'
import { Timeline } from './ui/timeline'
import './Certifications.css'

function Certifications() {
  const certsRef = useRef()

  // Certifications data - sorted by date (newest first)
  const certifications = [
    {
      id: 4,
      title: "Microsoft Certified: Azure AI Engineer Associate",
      issuer: "Microsoft",
      validity: "November 2023 - December 2024",
      year: "2023",
      month: "November",
      credentialId: "52202726E812E8C9",
      description: "Validates expertise in using cognitive services, machine learning, and knowledge mining to build AI solutions on Azure.",
      skills: ["Azure Cognitive Services", "Azure Machine Learning", "Azure Bot Service", "Computer Vision", "Natural Language Processing"],
      status: "Active",
      credentialUrl: "https://learn.microsoft.com/api/credentials/share/en-us/PetchiappanP-4916/52202726E812E8C9?sharingId=190516B3F744383E"
    },
    {
      id: 3,
      title: "Microsoft Certified: Azure Solutions Architect Expert",
      issuer: "Microsoft",
      validity: "November 2023 - December 2024",
      year: "2023",
      month: "November",
      credentialId: "D1C80525B0465352",
      description: "Advanced certification for designing solutions that run on Microsoft Azure, including compute, network, storage, and security.",
      skills: ["Azure Architecture", "Cloud Design Patterns", "Azure Security", "Cost Optimization", "Disaster Recovery"],
      status: "Active",
      credentialUrl: "https://learn.microsoft.com/api/credentials/share/en-us/PetchiappanP-4916/D1C80525B0465352?sharingId=190516B3F744383E"
    },
    {
      id: 2,
      title: "Microsoft Certified: Azure Administrator Associate",
      issuer: "Microsoft",
      validity: "October 2022 - October 2024",
      year: "2022",
      month: "October",
      credentialId: "73D40B26AF313CEC",
      description: "Validates skills in implementing, managing, and monitoring identity, governance, storage, compute, and virtual networks in a cloud environment.",
      skills: ["Azure Portal", "Azure CLI", "PowerShell", "Azure Monitor", "Azure Security Center"],
      status: "Active",
      credentialUrl: "https://learn.microsoft.com/api/credentials/share/en-us/PetchiappanP-4916/73D40B26AF313CEC?sharingId=190516B3F744383E"
    },
    {
      id: 1,
      title: "Microsoft Certified: Azure Developer Associate",
      issuer: "Microsoft",
      validity: "September 2022 - October 2024",
      year: "2022",
      month: "September",
      credentialId: "A97B9DCD5390D87F",
      description: "Demonstrates expertise in designing, building, testing, and maintaining cloud applications and services on Microsoft Azure.",
      skills: ["Azure App Service", "Azure Functions", "Azure Storage", "Azure SQL Database", "Azure DevOps"],
      status: "Active",
      credentialUrl: "https://learn.microsoft.com/api/credentials/share/en-us/PetchiappanP-4916/A97B9DCD5390D87F?sharingId=190516B3F744383E"
    }
  ]

  // Group certifications by year
  const groupedByYear = certifications.reduce((acc, cert) => {
    const year = cert.year
    if (!acc[year]) {
      acc[year] = []
    }
    acc[year].push(cert)
    return acc
  }, {})

  // Convert to timeline format
  const timelineData = Object.keys(groupedByYear)
    .sort((a, b) => parseInt(b) - parseInt(a)) // Sort years descending
    .map(year => {
      const yearCerts = groupedByYear[year].sort((a, b) => {
        const months = ["January", "February", "March", "April", "May", "June", 
                       "July", "August", "September", "October", "November", "December"]
        return months.indexOf(b.month) - months.indexOf(a.month)
      })

      return {
        title: year,
        content: (
          <div className="space-y-8">
            {yearCerts.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.2,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                whileHover={{ 
                  scale: 1.02, 
                  y: -5,
                  transition: { duration: 0.3 }
                }}
                className="cert-timeline-item"
              >
                <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 md:p-8 shadow-lg border border-neutral-200 dark:border-neutral-800 hover:shadow-xl transition-shadow duration-300">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl"
                      >
                        <Award className="w-6 h-6 text-white" />
                      </motion.div>
                      <div>
                        <h3 className="text-lg md:text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-1">
                          {cert.title}
                        </h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          {cert.issuer} • {cert.month} {cert.year}
                        </p>
                      </div>
                    </div>
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle 
                        className="w-5 h-5" 
                        style={{ color: cert.status === 'Active' ? '#10b981' : '#f59e0b' }}
                      />
                      <span 
                        className="text-xs font-medium"
                        style={{ color: cert.status === 'Active' ? '#10b981' : '#f59e0b' }}
                      >
                        {cert.status}
                      </span>
                    </motion.div>
                  </div>

                  {/* Description */}
                  <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="text-sm md:text-base text-neutral-700 dark:text-neutral-300 mb-6 leading-relaxed"
                  >
                    {cert.description}
                  </motion.p>

                  {/* Details */}
                  <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 }}
                      className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>{cert.validity}</span>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 }}
                      className="flex items-center gap-2 text-sm"
                    >
                      <span className="text-neutral-600 dark:text-neutral-400">Credential ID:</span>
                      <span className="font-mono text-xs bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">
                        {cert.credentialId}
                      </span>
                    </motion.div>
                  </div>

                  {/* Skills */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 }}
                    className="mb-6"
                  >
                    <h4 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-3 flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Key Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map((skill, skillIndex) => (
                        <motion.span
                          key={skillIndex}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ 
                            delay: 0.8 + (skillIndex * 0.05),
                            type: "spring",
                            stiffness: 200
                          }}
                          whileHover={{ 
                            scale: 1.1,
                            backgroundColor: "rgb(59, 130, 246)",
                            color: "white"
                          }}
                          className="px-3 py-1.5 text-xs font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full border border-blue-200 dark:border-blue-800 cursor-default transition-colors duration-200"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Link */}
                  <motion.a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.9 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-sm font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Credential
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        )
      }
    })

  const getStatusColor = (status) => {
    return status === 'Active' ? '#10b981' : '#f59e0b'
  }

  return (
    <section ref={certsRef} id="certifications" className="certifications">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="section-title"
        >
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3
            }}
          >
            <Award className="title-icon" />
          </motion.div>
          Certifications
        </motion.h2>
        
        <div className="certifications-timeline-wrapper">
          <Timeline 
            data={timelineData}
            title="My Certification Journey"
            description="A timeline of my professional certifications and achievements in cloud computing and AI."
          />
        </div>
      </div>
    </section>
  )
}

export default Certifications
