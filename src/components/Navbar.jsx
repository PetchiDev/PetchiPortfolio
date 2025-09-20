import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Menu, X } from 'lucide-react'
import './Navbar.css'

gsap.registerPlugin(ScrollTrigger)

function Navbar() {
  const navRef = useRef()
  const logoRef = useRef()
  const menuItemsRef = useRef([])
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    // Navbar entrance animation
    gsap.fromTo(navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    )

    // Logo animation
    gsap.fromTo(logoRef.current,
      { scale: 0, rotation: -180 },
      { scale: 1, rotation: 0, duration: 1.2, ease: "back.out(1.7)", delay: 0.3 }
    )

    // Menu items stagger animation
    gsap.fromTo(menuItemsRef.current,
      { y: -50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        stagger: 0.1, 
        ease: "power2.out",
        delay: 0.5
      }
    )

    // Navbar scroll effect
    ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        if (self.direction === -1) {
          gsap.to(navRef.current, { y: 0, duration: 0.3 })
        } else {
          gsap.to(navRef.current, { y: 0, duration: 0.3 })
        }
      }
    })
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
    // Close mobile menu after navigation
    setIsMobileMenuOpen(false)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav ref={navRef} className="navbar">
      <div className="nav-container">
        <div ref={logoRef} className="nav-logo">
          <span className="logo-text">Petchiappan</span>
        </div>
        
        {/* Desktop Menu */}
        <ul className="nav-menu desktop-menu">
          {['home', 'about', 'skills', 'projects', 'contact'].map((item, index) => (
            <li 
              key={item}
              ref={el => menuItemsRef.current[index] = el}
              className="nav-item"
            >
              <button 
                onClick={() => scrollToSection(item)}
                className="nav-link"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
       

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
          <ul className="mobile-nav-list">
            {['home', 'about', 'skills', 'projects', 'contact'].map((item, index) => (
              <li key={item} className="mobile-nav-item">
                <button 
                  onClick={() => scrollToSection(item)}
                  className="mobile-nav-link"
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
