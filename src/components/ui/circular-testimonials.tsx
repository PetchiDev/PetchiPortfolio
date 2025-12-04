import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  src: string;
}

interface Colors {
  name?: string;
  designation?: string;
  testimony?: string;
  arrowBackground?: string;
  arrowForeground?: string;
  arrowHoverBackground?: string;
}

interface FontSizes {
  name?: string;
  designation?: string;
  quote?: string;
}

interface CircularTestimonialsProps {
  testimonials: Testimonial[];
  autoplay?: boolean;
  colors?: Colors;
  fontSizes?: FontSizes;
  className?: string;
}

function calculateGap(width: number) {
  const minWidth = 1024;
  const maxWidth = 1456;
  const minGap = 60;
  const maxGap = 86;

  if (width <= minWidth) return minGap;
  if (width >= maxWidth)
    return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));

  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

export const CircularTestimonials = ({
  testimonials,
  autoplay = true,
  colors = {},
  fontSizes = {},
  className = "",
}: CircularTestimonialsProps) => {
  // Color & font config
  const colorName = colors.name ?? "#000";
  const colorDesignation = colors.designation ?? "#6b7280";
  const colorTestimony = colors.testimony ?? "#4b5563";
  const colorArrowBg = colors.arrowBackground ?? "#141414";
  const colorArrowFg = colors.arrowForeground ?? "#f1f1f7";
  const colorArrowHoverBg = colors.arrowHoverBackground ?? "#00a6fb";

  const fontSizeName = fontSizes.name ?? "1.5rem";
  const fontSizeDesignation = fontSizes.designation ?? "0.925rem";
  const fontSizeQuote = fontSizes.quote ?? "1.125rem";

  // State
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1200);
  const [isHovered, setIsHovered] = useState(false);

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const glowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const particlesRef = useRef<HTMLDivElement>(null);

  const testimonialsLength = useMemo(() => testimonials.length, [testimonials]);
  const activeTestimonial = useMemo(
    () => testimonials[activeIndex],
    [activeIndex, testimonials]
  );

  // Responsive gap calculation
  useEffect(() => {
    function handleResize() {
      if (imageContainerRef.current) {
        setContainerWidth(imageContainerRef.current.offsetWidth);
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // GSAP animations for images
  useEffect(() => {
    const activeImage = imageRefs.current[activeIndex];
    const activeGlow = glowRefs.current[activeIndex];

    if (activeImage && activeGlow) {
      // Set initial state
      gsap.set(activeGlow, { opacity: 0.3, scale: 1 });
      gsap.set(activeImage, { y: 0 });

      // Pulse glow effect
      gsap.to(activeGlow, {
        opacity: 0.6,
        scale: 1.1,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Subtle floating animation
      gsap.to(activeImage, {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Rotating gradient border
      gsap.to(activeGlow, {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none",
      });
    }

    // Reset other images
    imageRefs.current.forEach((img, index) => {
      if (index !== activeIndex && img) {
        gsap.killTweensOf(img);
        gsap.set(img, { y: 0 });
      }
    });

    glowRefs.current.forEach((glow, index) => {
      if (index !== activeIndex && glow) {
        gsap.killTweensOf(glow);
        gsap.set(glow, { opacity: 0, scale: 1, rotation: 0 });
      }
    });
  }, [activeIndex]);

  // Particle effects
  useEffect(() => {
    if (!particlesRef.current) return;

    const particles = particlesRef.current;
    const particleCount = 15;

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: ${colorArrowHoverBg};
        border-radius: 50%;
        opacity: 0;
        pointer-events: none;
      `;
      particles.appendChild(particle);

      const startX = Math.random() * 100;
      const startY = Math.random() * 100;
      const endX = startX + (Math.random() - 0.5) * 200;
      const endY = startY + (Math.random() - 0.5) * 200;

      gsap.set(particle, {
        x: `${startX}%`,
        y: `${startY}%`,
        opacity: 0,
        scale: 0,
      });

      gsap.to(particle, {
        x: `${endX}%`,
        y: `${endY}%`,
        opacity: 0.8,
        scale: 1.5,
        duration: 3 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        delay: Math.random() * 2,
        ease: "sine.inOut",
      });
    }

    return () => {
      particles.innerHTML = "";
    };
  }, [colorArrowHoverBg]);

  // Autoplay
  useEffect(() => {
    if (autoplay && !isHovered) {
      autoplayIntervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonialsLength);
      }, 5000);
    }

    return () => {
      if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    };
  }, [autoplay, testimonialsLength, isHovered]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, testimonialsLength]);

  // Navigation handlers
  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonialsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    
    // Trigger particle burst
    if (particlesRef.current) {
      const particles = particlesRef.current.querySelectorAll(".particle");
        particles.forEach((particle, i) => {
          gsap.to(particle, {
            x: "+=50",
            y: "+=50",
            opacity: 1,
            scale: 2,
            duration: 0.8,
            delay: i * 0.05,
            ease: "power2.out",
            yoyo: true,
            repeat: 1,
          });
        });
    }
  }, [testimonialsLength]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + testimonialsLength) % testimonialsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    
    // Trigger particle burst
    if (particlesRef.current) {
      const particles = particlesRef.current.querySelectorAll(".particle");
        particles.forEach((particle, i) => {
          gsap.to(particle, {
            x: "-=50",
            y: "-=50",
            opacity: 1,
            scale: 2,
            duration: 0.8,
            delay: i * 0.05,
            ease: "power2.out",
            yoyo: true,
            repeat: 1,
          });
        });
    }
  }, [testimonialsLength]);

  // Compute transforms for each image (always show 3: left, center, right)
  function getImageStyle(index: number): React.CSSProperties {
    const gap = calculateGap(containerWidth);
    const maxStickUp = gap * 0.8;

    const isActive = index === activeIndex;
    const isLeft = (activeIndex - 1 + testimonialsLength) % testimonialsLength === index;
    const isRight = (activeIndex + 1) % testimonialsLength === index;

    if (isActive) {
      return {
        zIndex: 3,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(0px) translateY(0px) scale(1) rotateY(0deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }

    if (isLeft) {
      return {
        zIndex: 2,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(15deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }

    if (isRight) {
      return {
        zIndex: 2,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(-15deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }

    // Hide all other images
    return {
      zIndex: 1,
      opacity: 0,
      pointerEvents: "none",
      transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
    };
  }

  // Framer Motion variants for quote
  const quoteVariants = {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -20, scale: 0.95 },
  };

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <div 
      className={`testimonial-container ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Particle effects container */}
      <div 
        ref={particlesRef}
        className="particles-container"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      <motion.div 
        className="testimonial-grid"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {/* Images */}
        <div className="image-container" ref={imageContainerRef}>
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.src}
              className="image-wrapper"
              style={getImageStyle(index)}
            >
              {/* Glow effect */}
              <div
                ref={(el) => {
                  glowRefs.current[index] = el;
                }}
                className="image-glow"
                style={{
                  position: "absolute",
                  inset: "-20px",
                  background: `radial-gradient(circle, ${colorArrowHoverBg}40 0%, transparent 70%)`,
                  borderRadius: "var(--radius-2xl)",
                  filter: "blur(20px)",
                  opacity: index === activeIndex ? 0.6 : 0,
                  zIndex: -1,
                  transition: "opacity 0.8s ease",
                }}
              />
              
              <img
                ref={(el) => {
                  imageRefs.current[index] = el;
                }}
                src={testimonial.src}
                alt={testimonial.name}
                className="testimonial-image"
                data-index={index}
                style={{
                  position: "relative",
                  zIndex: 1,
                  maxWidth: "100%",
                  maxHeight: "100%",
                }}
              />
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="testimonial-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              variants={quoteVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <motion.h3
                className="name"
                style={{ color: colorName, fontSize: fontSizeName }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                {activeTestimonial.name}
              </motion.h3>
              
              <motion.p
                className="designation"
                style={{ color: colorDesignation, fontSize: fontSizeDesignation }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                {activeTestimonial.designation}
              </motion.p>
              
              <motion.p
                className="quote"
                style={{ color: colorTestimony, fontSize: fontSizeQuote }}
              >
                {activeTestimonial.quote.split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{
                      filter: "blur(10px)",
                      opacity: 0,
                      y: 5,
                    }}
                    animate={{
                      filter: "blur(0px)",
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.25,
                      ease: "easeInOut",
                      delay: 0.3 + 0.03 * i,
                    }}
                    style={{ display: "inline-block" }}
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          <div className="arrow-buttons">
            <motion.button
              className="arrow-button prev-button"
              onClick={handlePrev}
              style={{
                backgroundColor: hoverPrev ? colorArrowHoverBg : colorArrowBg,
              }}
              onMouseEnter={() => setHoverPrev(true)}
              onMouseLeave={() => setHoverPrev(false)}
              aria-label="Previous testimonial"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <FaArrowLeft size={28} color={colorArrowFg} />
            </motion.button>
            
            <motion.button
              className="arrow-button next-button"
              onClick={handleNext}
              style={{
                backgroundColor: hoverNext ? colorArrowHoverBg : colorArrowBg,
              }}
              onMouseEnter={() => setHoverNext(true)}
              onMouseLeave={() => setHoverNext(false)}
              aria-label="Next testimonial"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <FaArrowRight size={28} color={colorArrowFg} />
            </motion.button>
          </div>
        </div>
      </motion.div>

      <style>{`
        .testimonial-container {
          width: 100%;
          max-width: 56rem;
          padding: var(--spacing-xl);
          position: relative;
          overflow: hidden;
        }

        .testimonial-grid {
          display: grid;
          gap: var(--spacing-3xl);
          align-items: center;
        }

        .image-container {
          position: relative;
        //   width: 100%;
        //   height: 28rem;
          perspective: 1000px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .image-wrapper {
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--spacing-md);
        }

        .testimonial-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          border-radius: var(--radius-2xl);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          cursor: pointer;
          transition: all 0.3s ease;
          background: var(--bg-secondary);
          padding: var(--spacing-md);
        }

        .testimonial-image:hover {
          box-shadow: 0 25px 80px rgba(0, 0, 0, 0.4);
          transform: scale(1.02);
        }

        .testimonial-content {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 28rem;
          overflow: hidden;
        }

        .name {
          font-weight: 700;
          margin-bottom: var(--spacing-sm);
          position: relative;
          line-height: 1.3;
          word-wrap: break-word;
          overflow-wrap: break-word;
        }

        .name::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 60px;
          height: 3px;
          background: linear-gradient(90deg, ${colorArrowHoverBg}, transparent);
          border-radius: var(--radius-sm);
        }

        .designation {
          margin-bottom: var(--spacing-xl);
          line-height: 1.5;
          word-wrap: break-word;
        }

        .quote {
          line-height: 1.75;
          word-wrap: break-word;
          overflow-wrap: break-word;
          flex: 1;
          display: flex;
          flex-wrap: wrap;
          align-items: flex-start;
        }

        .arrow-buttons {
          display: flex;
          gap: var(--spacing-lg);
          padding-top: var(--spacing-xl);
          margin-top: auto;
        }

        .arrow-button {
          width: 2.7rem;
          height: 2.7rem;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-normal);
          border: none;
          box-shadow: var(--shadow-lg);
          flex-shrink: 0;
        }

        .arrow-button:hover {
          box-shadow: var(--shadow-xl);
        }

        .word {
          display: inline-block;
        }

        @media (min-width: 768px) {
          .testimonial-grid {
            grid-template-columns: 1fr 1fr;
          }

          .arrow-buttons {
            padding-top: 0;
            margin-top: var(--spacing-xl);
          }

          .testimonial-content {
            min-height: auto;
            padding-left: var(--spacing-lg);
          }
        }

        @media (max-width: 767px) {
          .testimonial-container {
            padding: var(--spacing-md);
          }

          .image-container {
            height: 22rem;
          }

          .testimonial-grid {
            gap: var(--spacing-2xl);
          }

          .testimonial-content {
            min-height: auto;
          }

          .name {
            font-size: 1.5rem;
          }

          .designation {
            font-size: 0.9rem;
          }

          .quote {
            font-size: 1rem;
          }
        }

        @media (max-width: 480px) {
          .image-container {
            height: 18rem;
          }

          .testimonial-content {
            min-height: auto;
          }
        }
      `}</style>
    </div>
  );
};

export default CircularTestimonials;

