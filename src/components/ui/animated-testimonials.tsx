"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Quote, Star, Sparkles } from "lucide-react"
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

export interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  content: string
  rating: number
  avatar: string
}

export interface AnimatedTestimonialsProps {
  title?: string
  subtitle?: string
  badgeText?: string
  testimonials?: Testimonial[]
  autoRotateInterval?: number
  trustedCompanies?: string[]
  trustedCompaniesTitle?: string
  className?: string
}

export function AnimatedTestimonials({
  title = "Loved by the community",
  subtitle = "Don't just take our word for it. See what developers and companies have to say about our starter template.",
  badgeText = "Trusted by developers",
  testimonials = [],
  autoRotateInterval = 6000,
  trustedCompanies = [],
  trustedCompaniesTitle = "Trusted by developers from companies worldwide",
  className,
}: AnimatedTestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  // Refs for scroll animations
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const controls = useAnimation()
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      x: 100, 
      scale: 0.8,
      rotateY: 45
    },
    visible: { 
      opacity: 1, 
      x: 0, 
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
      }
    },
    exit: {
      opacity: 0,
      x: -100,
      scale: 0.8,
      rotateY: -45,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  }

  // Trigger animations when section comes into view
  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  // GSAP animations for decorative elements
  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean)
    
    cards.forEach((card, index) => {
      if (card && activeIndex === index) {
        // Floating animation
        gsap.to(card.querySelector('.floating-bg'), {
          y: -20,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        })

        // Rotating gradient
        gsap.to(card.querySelector('.rotating-gradient'), {
          rotation: 360,
          duration: 20,
          repeat: -1,
          ease: "none"
        })

        // Pulse effect on stars
        const stars = card.querySelectorAll('.star-pulse')
        stars.forEach((star, i) => {
          gsap.to(star, {
            scale: [1, 1.2, 1],
            duration: 1.5,
            delay: i * 0.1,
            repeat: -1,
            ease: "power2.inOut"
          })
        })
      }
    })
  }, [activeIndex])

  // Auto rotate testimonials
  useEffect(() => {
    if (autoRotateInterval <= 0 || testimonials.length <= 1 || isHovered) return

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length)
    }, autoRotateInterval)

    return () => clearInterval(interval)
  }, [autoRotateInterval, testimonials.length, isHovered])

  if (testimonials.length === 0) {
    return null
  }

  return (
    <section 
      ref={sectionRef} 
      id="testimonials" 
      className={`py-24 overflow-hidden bg-muted/30 relative ${className || ""}`}
      style={{ position: 'relative' }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ position: 'relative' }}>
        {[...Array(20)].map((_, i) => {
          const randomX = typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 1000
          const randomY = typeof window !== 'undefined' ? Math.random() * window.innerHeight : Math.random() * 800
          const targetY = typeof window !== 'undefined' ? Math.random() * window.innerHeight : randomY + 200
          return (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary/20 rounded-full"
              style={{ position: 'absolute' }}
              initial={{
                x: randomX,
                y: randomY,
                opacity: 0,
                scale: 0
              }}
              animate={{
                y: [randomY, targetY],
                opacity: [0, 0.5, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut",
                times: [0, 0.5, 1]
              }}
            />
          )
        })}
      </div>

      <div className="px-4 md:px-6 relative z-10">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid grid-cols-1 gap-16 w-full md:grid-cols-2 lg:gap-24"
        >
          {/* Left side: Heading and navigation */}
          <motion.div variants={itemVariants} className="flex flex-col justify-center">
            <div className="space-y-6">
              {badgeText && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"
                    animate={{
                      x: ['-100%', '100%']
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  <Star className="mr-1 h-3.5 w-3.5 fill-primary relative z-10" />
                  <span className="relative z-10">{badgeText}</span>
                </motion.div>
              )}

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent"
              >
                {title}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="max-w-[600px] text-muted-foreground md:text-xl/relaxed"
              >
                {subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-3 pt-4"
              >
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`h-2.5 rounded-full transition-all duration-300 relative overflow-hidden ${
                      activeIndex === index ? "w-10 bg-primary" : "w-2.5 bg-muted-foreground/30"
                    }`}
                    aria-label={`View testimonial ${index + 1}`}
                  >
                    {activeIndex === index && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-primary to-primary/50"
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                    )}
                  </motion.button>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Right side: Testimonial cards */}
          <motion.div 
            variants={itemVariants} 
            className="relative h-full mr-10 min-h-[300px] md:min-h-[400px]"
            style={{ position: 'relative' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <AnimatePresence mode="wait">
              {testimonials.map((testimonial, index) => {
                if (activeIndex !== index) return null
                
                return (
                  <motion.div
                    key={testimonial.id}
                    ref={(el) => {
                      cardRefs.current[index] = el
                    }}
                    className="absolute inset-0"
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  >
                    {/* Floating background decoration */}
                    <div className="floating-bg absolute -bottom-6 -left-6 h-32 w-32 rounded-xl bg-primary/5 blur-xl"></div>
                    <div className="floating-bg absolute -top-6 -right-6 h-32 w-32 rounded-xl bg-primary/5 blur-xl"></div>

                    {/* Rotating gradient border */}
                    <div className="absolute inset-0 rounded-xl overflow-hidden">
                      <div className="rotating-gradient absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20"></div>
                    </div>

                    <div className="bg-card border shadow-2xl rounded-xl p-8 h-full flex flex-col relative z-10 backdrop-blur-sm bg-opacity-95">
                      {/* Animated stars */}
                      <div className="mb-6 flex gap-2">
                        {Array(testimonial.rating)
                          .fill(0)
                          .map((_, i) => (
                            <motion.div
                              key={i}
                              className="star-pulse"
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ 
                                scale: 1, 
                                rotate: 0
                              }}
                              transition={{
                                delay: i * 0.1,
                                duration: 0.5,
                                type: "spring",
                                stiffness: 200
                              }}
                            >
                              <motion.div
                                animate={{ 
                                  y: [0, -5]
                                }}
                                transition={{
                                  delay: i * 0.1 + 0.5,
                                  duration: 1.5,
                                  repeat: Infinity,
                                  repeatType: "reverse",
                                  ease: "easeInOut"
                                }}
                              >
                                <Star className="h-5 w-5 fill-yellow-500 text-yellow-500 drop-shadow-lg" />
                              </motion.div>
                            </motion.div>
                          ))}
                      </div>

                      {/* Quote with animation */}
                      <div className="relative mb-6 flex-1">
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                        >
                          <Quote className="absolute -top-2 -left-2 h-8 w-8 text-primary/20 rotate-180" />
                        </motion.div>
                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          className="relative z-10 text-lg font-medium leading-relaxed"
                        >
                          "{testimonial.content}"
                        </motion.p>
                      </div>

                      <Separator className="my-4" />

                      {/* Avatar and info with animation */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex items-center gap-4"
                      >
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <Avatar className="h-12 w-12 border-2 border-primary/20">
                            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                            <AvatarFallback className="bg-gradient-to-br from-primary to-primary/50 text-white font-bold">
                              {testimonial.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        </motion.div>
                        <div>
                          <motion.h3
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="font-semibold"
                          >
                            {testimonial.name}
                          </motion.h3>
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="text-sm text-muted-foreground"
                          >
                            {testimonial.role}, {testimonial.company}
                          </motion.p>
                        </div>
                      </motion.div>

                      {/* Sparkle effects */}
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute"
                          style={{
                            top: `${20 + i * 30}%`,
                            right: `${10 + i * 15}%`,
                          }}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                            rotate: 360
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.5,
                            ease: "easeInOut"
                          }}
                        >
                          <Sparkles className="h-4 w-4 text-primary/40" />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Logo cloud with animation */}
        {trustedCompanies.length > 0 && (
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={controls}
            className="mt-24 text-center"
          >
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-sm font-medium text-muted-foreground mb-8"
            >
              {trustedCompaniesTitle}
            </motion.h3>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-8">
              {trustedCompanies.map((company, index) => (
                <motion.div
                  key={company}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 0.9 + index * 0.1,
                    type: "spring",
                    stiffness: 200
                  }}
                  whileHover={{ scale: 1.2, y: -5 }}
                  className="text-2xl font-semibold text-muted-foreground/50 cursor-pointer"
                >
                  {company}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
