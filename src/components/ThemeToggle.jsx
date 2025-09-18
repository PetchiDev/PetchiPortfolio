import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import './ThemeToggle.css'

function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme()
  const toggleRef = useRef()
  const iconRef = useRef()

  useEffect(() => {
    // Initial animation
    gsap.fromTo(toggleRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
    )

    // Icon rotation animation
    gsap.to(iconRef.current, {
      rotation: isDarkMode ? 180 : 0,
      duration: 0.3,
      ease: "power2.out"
    })
  }, [isDarkMode])

  const handleToggle = () => {
    // Button press animation
    gsap.to(toggleRef.current, {
      scale: 0.9,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
      onComplete: toggleTheme
    })
  }

  return (
    <button
      ref={toggleRef}
      onClick={handleToggle}
      className="theme-toggle"
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      <div className="toggle-track">
        <div className={`toggle-thumb ${isDarkMode ? 'dark' : 'light'}`}>
          <div ref={iconRef} className="toggle-icon">
            {isDarkMode ? <Moon size={16} /> : <Sun size={16} />}
          </div>
        </div>
      </div>
    </button>
  )
}

export default ThemeToggle
