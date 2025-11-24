import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Star, Quote, Building2, Shirt, Truck } from 'lucide-react'
import './Reviews.css'

gsap.registerPlugin(ScrollTrigger)

function Reviews() {
  const reviewsRef = useRef()
  const titleRef = useRef()
  const reviewCardsRef = useRef([])

  useEffect(() => {
    // Reviews section scroll animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: reviewsRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    })

    tl.fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    )
    .fromTo(reviewCardsRef.current,
      { 
        y: 100, 
        opacity: 0, 
        scale: 0.8,
        rotation: -5
      },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1,
        rotation: 0,
        duration: 0.8, 
        stagger: 0.2, 
        ease: "back.out(1.7)" 
      },
      "-=0.4"
    )

    // Card hover animations
    reviewCardsRef.current.forEach((card) => {
      if (card) {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, { 
            scale: 1.05, 
            y: -10,
            rotation: 2,
            duration: 0.3, 
            ease: "power2.out" 
          })
        })
        
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { 
            scale: 1, 
            y: 0,
            rotation: 0,
            duration: 0.3, 
            ease: "power2.out" 
          })
        })
      }
    })
  }, [])

  const reviews = [
    {
      id: 1,
      company: "TGYExportEnterprise",
      icon: Building2,
      service: "Export Services & Enterprise Solutions",
      description: "Delivered comprehensive export management solutions with seamless integration and automation. The platform enables efficient order processing, documentation management, and real-time tracking.",
      highlights: [
        "Custom ERP integration for export workflows",
        "Automated documentation generation",
        "Real-time shipment tracking",
        "Multi-currency support",
        "Compliance management system"
      ],
      rating: 5,
      testimonial: "Outstanding work! The export management system transformed our operations. Highly professional and delivered on time.",
      author: "TGY Export Team"
    },
    {
      id: 2,
      company: "Trippin",
      icon: Shirt,
      service: "T-Shirt & Customized Decorations",
      description: "Developed an e-commerce platform for custom T-shirts and personalized decorations including laser engraving and nameboard services. Features intuitive design tools and seamless order management.",
      highlights: [
        "Custom design tool with real-time preview",
        "Laser engraving customization options",
        "Nameboard design and ordering system",
        "Product catalog with filters",
        "Order tracking and management",
        "Payment gateway integration"
      ],
      rating: 5,
      testimonial: "The platform exceeded our expectations! Customers love the customization features. Sales have increased significantly since launch.",
      author: "Trippin Team"
    },
    {
      id: 3,
      company: "Rowgistic",
      icon: Truck,
      service: "Logistics & Rowing Solutions",
      description: "Created a responsive website showcasing rowing boats and logistics solutions. Features modern design, club information, and seamless user experience across all devices.",
      highlights: [
        "Responsive design for all devices",
        "Boat catalog with detailed specifications",
        "Club membership management",
        "Event booking system",
        "Logistics tracking integration",
        "Contact and inquiry forms"
      ],
      rating: 5,
      testimonial: "Perfect execution! The website beautifully represents our brand and makes it easy for customers to explore our services.",
      author: "Rowgistic Management"
    }
  ]

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`star ${index < rating ? 'filled' : ''}`}
        size={20}
        fill={index < rating ? 'currentColor' : 'none'}
      />
    ))
  }

  return (
    <section ref={reviewsRef} id="reviews" className="reviews">
      <div className="container">
        <h2 ref={titleRef} className="section-title">
          Client Reviews & Testimonials
        </h2>
        
        <div className="reviews-container">
          {reviews.map((review, index) => {
            const IconComponent = review.icon
            return (
              <div
                key={review.id}
                ref={el => reviewCardsRef.current[index] = el}
                className="review-card"
              >
                <div className="review-header">
                  <div className="company-icon">
                    <IconComponent size={32} />
                  </div>
                  <div className="company-info">
                    <h3 className="company-name">{review.company}</h3>
                    <p className="service-type">{review.service}</p>
                  </div>
                </div>

                <div className="review-rating">
                  {renderStars(review.rating)}
                </div>

                <div className="review-description">
                  <p>{review.description}</p>
                </div>

                <div className="review-highlights">
                  <h4>Key Features Delivered:</h4>
                  <ul>
                    {review.highlights.map((highlight, idx) => (
                      <li key={idx}>{highlight}</li>
                    ))}
                  </ul>
                </div>

                <div className="review-testimonial">
                  <Quote className="quote-icon" size={24} />
                  <p className="testimonial-text">"{review.testimonial}"</p>
                  <p className="testimonial-author">— {review.author}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="reviews-footer">
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
