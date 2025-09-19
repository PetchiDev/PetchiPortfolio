import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Mail, Phone, MapPin, Briefcase, Linkedin, Github, ExternalLink } from 'lucide-react'
import emailjs from '@emailjs/browser'
import './Contact.css'

gsap.registerPlugin(ScrollTrigger)

function Contact() {
  const contactRef = useRef()
  const titleRef = useRef()
  const formRef = useRef()
  const contactInfoRef = useRef()
  const socialLinksRef = useRef([])
  const [isLoading, setIsLoading] = useState(false)
  const [toast, setToast] = useState({ show: false, message: '', type: '' })

  useEffect(() => {
    // Contact section scroll animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: contactRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    })

    tl.fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    )
    .fromTo(formRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.4"
    )
    .fromTo(contactInfoRef.current,
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.6"
    )
    .fromTo(socialLinksRef.current,
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.6, 
        stagger: 0.1, 
        ease: "back.out(1.7)" 
      },
      "-=0.4"
    )

    // Form input focus animations
    const inputs = formRef.current?.querySelectorAll('input, textarea')
    inputs?.forEach(input => {
      input.addEventListener('focus', () => {
        gsap.to(input, { scale: 1.02, duration: 0.2, ease: "power2.out" })
      })
      
      input.addEventListener('blur', () => {
        gsap.to(input, { scale: 1, duration: 0.2, ease: "power2.out" })
      })
    })

    // Social links hover animations
    socialLinksRef.current.forEach(link => {
      if (link) {
        link.addEventListener('mouseenter', () => {
          gsap.to(link, { 
            scale: 1.2, 
            rotation: 5,
            duration: 0.3, 
            ease: "power2.out" 
          })
        })
        
        link.addEventListener('mouseleave', () => {
          gsap.to(link, { 
            scale: 1, 
            rotation: 0,
            duration: 0.3, 
            ease: "power2.out" 
          })
        })
      }
    })
  }, [])

  const showToast = (message, type) => {
    setToast({ show: true, message, type })
    setTimeout(() => {
      setToast({ show: false, message: '', type: '' })
    }, 4000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    const formData = new FormData(e.target)
    const templateParams = {
      from_name: formData.get('name'),
      message: formData.get('message'),
      from_email: formData.get('email'),
      subject: formData.get('subject')
    }

    try {
      // Form submission animation
      gsap.to(formRef.current, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      })

      await emailjs.send(
        "service_y9epouc",
        "template_y2z379l", 
        templateParams,
        "Lo78HE4gRbFCR7WRX"
      )
      
      showToast('Successfully sent!', 'success')
      e.target.reset()
    } catch (error) {
      console.error('EmailJS Error:', error)
      showToast('Some issues happened please try again later!', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const socialLinks = [
    { name: 'LinkedIn', url: 'https://linkedin.com/in/petchiappan-p-22sep', icon: Linkedin },
    { name: 'GitHub', url: 'https://github.com/petchiappan', icon: Github },
    { name: 'Email', url: 'mailto:petchidev22@gmail.com', icon: Mail },
    { name: 'Phone', url: 'tel:+917092183131', icon: Phone }
  ]

  return (
    <section ref={contactRef} id="contact" className="contact">
      <div className="container">
        <h2 ref={titleRef} className="section-title">
          Get In Touch
        </h2>
        
        <div className="contact-content">
          <div ref={formRef} className="contact-form">
            <h3>Send me a message</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Your Name" 
                  required 
                />
              </div>
              
              <div className="form-group">
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Your Email" 
                  required 
                />
              </div>
              
              <div className="form-group">
                <input 
                  type="text" 
                  name="subject" 
                  placeholder="Subject" 
                  required 
                />
              </div>
              
              <div className="form-group">
                <textarea 
                  name="message" 
                  placeholder="Your Message" 
                  rows="5" 
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="submit-button" disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
          
          <div ref={contactInfoRef} className="contact-info">
            <h3>Let's connect</h3>
            <p>
              I'm always interested in new opportunities and exciting projects. 
              Whether you have a question or just want to say hi, I'll try my best 
              to get back to you!
            </p>
            
            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon">
                  <Mail className="icon" />
                </div>
                <div>
                  <strong>Email</strong>
                  <p>petchidev22@gmail.com</p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <Phone className="icon" />
                </div>
                <div>
                  <strong>Phone</strong>
                  <p>+91 7092183131</p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <MapPin className="icon" />
                </div>
                <div>
                  <strong>Location</strong>
                  <p>Chennai, India</p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <Briefcase className="icon" />
                </div>
                <div>
                  <strong>Current Role</strong>
                  <p>Software Developer at KRYPTOS INFO SYSTEMS</p>
                </div>
              </div>
            </div>
            
            <div className="social-links">
              <h4>Follow me</h4>
              <div className="social-icons">
                {socialLinks.map((link, index) => {
                  const IconComponent = link.icon
                  return (
                    <a 
                      key={index}
                      ref={el => socialLinksRef.current[index] = el}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                      title={link.name}
                    >
                      <IconComponent className="social-icon" size={20} />
                      <span className="social-name">{link.name}</span>
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Toast Notification */}
      {toast.show && (
        <div className={`toast toast-${toast.type}`}>
          <div className="toast-content">
            <span className="toast-message">{toast.message}</span>
            <button 
              className="toast-close" 
              onClick={() => setToast({ show: false, message: '', type: '' })}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

export default Contact
