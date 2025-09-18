import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Contact.css'

gsap.registerPlugin(ScrollTrigger)

function Contact() {
  const contactRef = useRef()
  const titleRef = useRef()
  const formRef = useRef()
  const contactInfoRef = useRef()
  const socialLinksRef = useRef([])

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

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Form submission animation
    gsap.to(formRef.current, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
      onComplete: () => {
        alert('Thank you for your message! I\'ll get back to you soon.')
        e.target.reset()
      }
    })
  }

  const socialLinks = [
    { name: 'LinkedIn', url: 'https://linkedin.com/in/petchiappan-p-22sep', icon: '💼' },
    { name: 'GitHub', url: 'https://github.com/petchiappan', icon: '🐙' },
    { name: 'Email', url: 'mailto:petchidev22@gmail.com', icon: '📧' },
    { name: 'Phone', url: 'tel:+917092183131', icon: '📱' }
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
              
              <button type="submit" className="submit-button">
                Send Message
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
                <span className="contact-icon">📧</span>
                <div>
                  <strong>Email</strong>
                  <p>petchidev22@gmail.com</p>
                </div>
              </div>
              
              <div className="contact-item">
                <span className="contact-icon">📱</span>
                <div>
                  <strong>Phone</strong>
                  <p>+91 7092183131</p>
                </div>
              </div>
              
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <div>
                  <strong>Location</strong>
                  <p>Chennai, India</p>
                </div>
              </div>
              
              <div className="contact-item">
                <span className="contact-icon">💼</span>
                <div>
                  <strong>Current Role</strong>
                  <p>Software Developer at KRYPTOS INFO SYSTEMS</p>
                </div>
              </div>
            </div>
            
            <div className="social-links">
              <h4>Follow me</h4>
              <div className="social-icons">
                {socialLinks.map((link, index) => (
                  <a 
                    key={index}
                    ref={el => socialLinksRef.current[index] = el}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    title={link.name}
                  >
                    <span className="social-icon">{link.icon}</span>
                    <span className="social-name">{link.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
