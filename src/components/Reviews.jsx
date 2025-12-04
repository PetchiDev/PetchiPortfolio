import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AnimatedTestimonials } from './ui/animated-testimonials'
import { Building2, Shirt, Truck } from 'lucide-react'
import './Reviews.css'

gsap.registerPlugin(ScrollTrigger)

function Reviews() {
  const reviewsRef = useRef()
  const titleRef = useRef()
  const footerRef = useRef()

  useEffect(() => {
    // Title animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: reviewsRef.current,
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

    // Footer items animation
    if (footerRef.current) {
      const footerItems = footerRef.current.querySelectorAll('.footer-item')
      gsap.fromTo(footerItems,
        {
          y: 50,
          opacity: 0,
          scale: 0.9
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      )
    }
  }, [])

  // Transform reviews data to match AnimatedTestimonials format
  const testimonials = [
    {
      id: 1,
      name: "TGY Export Team",
      role: "Export Services",
      company: "TGYExportEnterprise",
      content: "Outstanding work! The export management system transformed our operations. Delivered comprehensive export management solutions with seamless integration and automation. The platform enables efficient order processing, documentation management, and real-time tracking. Highly professional and delivered on time.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Trippin Team",
      role: "E-commerce Platform",
      company: "Trippin",
      content: "The platform exceeded our expectations! Customers love the customization features. Developed an e-commerce platform for custom T-shirts and personalized decorations including laser engraving and nameboard services. Features intuitive design tools and seamless order management. Sales have increased significantly since launch.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Rowgistic Management",
      role: "Logistics Solutions",
      company: "Rowgistic",
      content: "Perfect execution! The website beautifully represents our brand and makes it easy for customers to explore our services. Created a responsive website showcasing rowing boats and logistics solutions. Features modern design, club information, and seamless user experience across all devices.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    }
  ]

  const trustedCompanies = [
    "TGYExportEnterprise",
    "Trippin",
    "Rowgistic",
    "MGM Technologies",
    "Qatar Living",
    "Select PPE"
  ]

  return (
    <section ref={reviewsRef} id="reviews" className="reviews">
      <div className="container">
        <h2 ref={titleRef} className="section-title">
          Client Reviews & Testimonials
        </h2>
        
        <AnimatedTestimonials
          title="Loved by Our Clients"
          subtitle="Don't just take our word for it. See what our clients have to say about our solutions and services."
          badgeText="5-Star Rated"
          testimonials={testimonials}
          autoRotateInterval={7000}
          trustedCompanies={trustedCompanies}
          trustedCompaniesTitle="Trusted by companies worldwide"
          className="reviews-testimonials"
        />

        <div ref={footerRef} className="reviews-footer">
          <h3>Why Clients Choose Our Solutions</h3>
          <div className="footer-content">
            <div className="footer-item">
              <h4>Expertise & Experience</h4>
              <p>3+ years of proven track record in delivering scalable web applications with cutting-edge technologies.</p>
            </div>
            <div className="footer-item">
              <h4>Custom Solutions</h4>
              <p>Every project is tailored to meet specific business needs, ensuring optimal functionality and user experience.</p>
            </div>
            <div className="footer-item">
              <h4>Timely Delivery</h4>
              <p>Committed to delivering projects on time without compromising quality and performance standards.</p>
            </div>
            <div className="footer-item">
              <h4>Ongoing Support</h4>
              <p>Continuous support and maintenance to ensure your platform stays updated and performs optimally.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Reviews
