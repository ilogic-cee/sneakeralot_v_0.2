import React, { useState, useEffect, useCallback, useRef, lazy, Suspense, useMemo, useTransition, startTransition } from 'react';
import { Link } from 'react-router-dom';
import styles from './Hero.module.css';
import ErrorBoundary from './ErrorBoundary';

// Constants for better performance
const ZOOM_LEVELS = { MIN: 1, MAX: 3, STEP: 0.5 };
const ANIMATION_SPRING = { tension: 170, friction: 26 };
const RETRY_DELAYS = [2000, 4000, 8000];
const INTERSECTION_OPTIONS = {
  root: null,
  rootMargin: '50px',
  threshold: 0.1
};

// Lazy load components
const QuickView = lazy(() => import('./QuickView'));

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState('next');
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [progress, setProgress] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [touchMoveCount, setTouchMoveCount] = useState(0);
  const [pinchStart, setPinchStart] = useState(null);
  const touchTimeout = useRef(null);
  const sliderRef = useRef(null);
  const progressInterval = useRef(null);
  const imageRef = useRef(null);
  const [activeQuickView, setActiveQuickView] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [is360View, setIs360View] = useState(false);
  const [rotationDegree, setRotationDegree] = useState(0);
  const rotationRef = useRef(null);
  const [announceMessage, setAnnounceMessage] = useState('');
  const [focusedElement, setFocusedElement] = useState(null);
  const announceRef = useRef(null);
  const slideRefs = useRef([]);
  const [isLoading, setIsLoading] = useState(true);
  const [swipeVelocity, setSwipeVelocity] = useState(0);
  const [lastTouchTime, setLastTouchTime] = useState(0);
  const [lastTouchX, setLastTouchX] = useState(0);
  const [preloadedImages, setPreloadedImages] = useState(new Set());
  const parallaxRef = useRef(null);
  const particlesRef = useRef(null);
  const [imageLoadErrors, setImageLoadErrors] = useState(new Set());
  const [retryCount, setRetryCount] = useState({});
  const springRef = useRef(null);
  const [touchDistance, setTouchDistance] = useState(0);
  const [lastTapTime, setLastTapTime] = useState(0);
  const [error, setError] = useState(null);

  // Performance optimizations
  const [isInView, setIsInView] = useState(false);
  const [networkStatus, setNetworkStatus] = useState(navigator.onLine);
  const [recycledSlides, setRecycledSlides] = useState(new Set());
  const intersectionObserver = useRef(null);
  const animationFrameId = useRef(null);
  const transformCache = useRef(new Map());

  // Add useTransition for smoother state updates
  const [isPending, startTransition] = useTransition();
  
  // Add ResizeObserver ref
  const resizeObserver = useRef(null);
  
  // Add momentum scrolling state
  const [momentum, setMomentum] = useState({ velocity: 0, timestamp: 0 });
  
  // Add magnetic snap points
  const snapPoints = useRef(new Map());

  const slides = [
    {
      id: 1,
      title: "Summer Collection 2024",
      subtitle: "Step into Style",
      description: "Discover the latest trends in sneaker fashion with our curated summer collection",
      cta: "Shop Now",
      image: "/images/hero/slide1.jpg",
      color: "#FF4D4D",
      product: {
        name: "Air Max Pulse",
        price: 179.99,
        originalPrice: 199.99,
        sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"],
        colors: [
          { name: "Obsidian", code: "#1a237e" },
          { name: "Crimson", code: "#d32f2f" },
          { name: "Platinum", code: "#e0e0e0" }
        ],
        images360: [
          "/images/hero/slide1.jpg",
          "/images/hero/slide1.jpg",
          "/images/hero/slide1.jpg"
        ],
        features: ["Responsive Cushioning", "Breathable Mesh", "Durable Outsole"]
      },
      hotspots: [
        {
          id: 'hs1',
          x: 25,
          y: 45,
          title: 'Premium Materials',
          description: 'Made with genuine leather and premium textiles',
          icon: 'diamond-outline',
          type: 'material'
        },
        {
          id: 'hs2',
          x: 65,
          y: 70,
          title: 'Comfort Technology',
          description: 'Advanced cushioning system for all-day comfort',
          icon: 'fitness-outline',
          type: 'feature',
          price: 179.99
        }
      ]
    },
    {
      id: 2,
      title: "Limited Edition Drops",
      subtitle: "Exclusive Collection",
      description: "Get your hands on rare and exclusive sneakers before they're gone",
      cta: "View Collection",
      image: "/images/hero/slide2.jpg",
      color: "#4D7FFF",
      product: {
        name: "Limited Edition Runner",
        price: 199.99,
        sizes: ["US 8", "US 9", "US 10"],
        colors: [
          { name: "Gold", code: "#FFD700" },
          { name: "Silver", code: "#C0C0C0" }
        ],
        images360: [
          "/images/hero/slide2.jpg",
          "/images/hero/slide2.jpg",
          "/images/hero/slide2.jpg"
        ],
        features: ["Limited Edition", "Numbered Series", "Certificate of Authenticity"]
      },
      hotspots: [
        {
          id: 'hs3',
          x: 35,
          y: 60,
          title: 'Limited Edition',
          description: 'Only 100 pairs available worldwide',
          icon: 'star-outline',
          type: 'feature'
        }
      ]
    },
    {
      id: 3,
      title: "New Arrivals",
      subtitle: "Fresh Kicks",
      description: "Be the first to wear the newest releases from top brands",
      cta: "Explore Now",
      image: "/images/hero/slide3.jpg",
      color: "#FFB84D",
      product: {
        name: "Fresh Release",
        price: 159.99,
        sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"],
        colors: [
          { name: "White", code: "#FFFFFF" },
          { name: "Black", code: "#000000" }
        ],
        images360: [
          "/images/hero/slide3.jpg",
          "/images/hero/slide3.jpg",
          "/images/hero/slide3.jpg"
        ],
        features: ["New Release", "Modern Design", "Premium Quality"]
      }
    }
  ];

  // Memoized computations
  const slideStyles = useMemo(() => {
    return slides.map((slide, index) => ({
      transform: transformCache.current.get(index) || 'none',
      opacity: index === currentSlide ? 1 : 0
    }));
  }, [currentSlide, slides.length]);

  // Enhanced accessibility announcements
  const announce = useCallback((message, priority = 'polite') => {
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', priority);
    announcer.setAttribute('aria-atomic', 'true');
    announcer.setAttribute('class', styles.visuallyHidden);
    document.body.appendChild(announcer);

    // Use two updates to ensure reliable announcement
    setTimeout(() => {
      announcer.textContent = message;
    }, 50);

    setTimeout(() => {
      document.body.removeChild(announcer);
    }, 1000);
  }, []);

  const announceSlideChange = useCallback((index) => {
    const slide = slides[index];
    const message = `Now showing slide ${index + 1} of ${slides.length}: ${slide.title}. ${slide.description}`;
    announce(message);
  }, [slides, announce]);

  const nextSlide = useCallback(() => {
    setDirection('next');
    setCurrentSlide((prev) => {
      const newIndex = (prev + 1) % slides.length;
      announceSlideChange(newIndex);
      return newIndex;
    });
    setIsZoomed(false);
    setProgress(0);
  }, [slides.length, announceSlideChange]);

  const prevSlide = useCallback(() => {
    setDirection('prev');
    setCurrentSlide((prev) => {
      const newIndex = (prev - 1 + slides.length) % slides.length;
      announceSlideChange(newIndex);
      return newIndex;
    });
    setIsZoomed(false);
    setProgress(0);
  }, [slides.length, announceSlideChange]);

  const goToSlide = (index) => {
    setDirection(index > currentSlide ? 'next' : 'prev');
    setCurrentSlide(index);
    announceSlideChange(index);
    setIsZoomed(false);
    setProgress(0);
  };

  useEffect(() => {
    let interval;
    if (isAutoPlaying && !isZoomed) {
      interval = setInterval(nextSlide, 5000);
      
      // Progress bar update
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
      progressInterval.current = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) return 0;
          return prev + 2;
        });
      }, 100);
    }
    return () => {
      clearInterval(interval);
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [isAutoPlaying, nextSlide, isZoomed]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => {
    if (!isZoomed) {
      setIsAutoPlaying(true);
    }
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowLeft':
        prevSlide();
        break;
      case 'ArrowRight':
        nextSlide();
        break;
      case 'ArrowUp':
        if (isZoomed) {
          setPanPosition(prev => ({
            ...prev,
            y: Math.max(prev.y - 10, -100)
          }));
        }
        break;
      case 'ArrowDown':
        if (isZoomed) {
          setPanPosition(prev => ({
            ...prev,
            y: Math.min(prev.y + 10, 100)
          }));
        }
        break;
      case 'Escape':
        if (isZoomed) {
          setIsZoomed(false);
          setPanPosition({ x: 0, y: 0 });
          setZoomLevel(1);
        } else if (activeQuickView !== null) {
          setActiveQuickView(null);
        }
        break;
      case 'Tab':
        // Handle focus trap in quick view modal
        if (activeQuickView !== null) {
          e.preventDefault();
          handleTabKey(e.shiftKey);
        }
        break;
      case ' ':
      case 'Enter':
        if (focusedElement === 'slider') {
          setIsAutoPlaying(prev => !prev);
          announceAutoplayState(!isAutoPlaying);
        }
        break;
      default:
        break;
    }
  };

  const handleTabKey = (shiftKey) => {
    const focusableElements = getFocusableElements();
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    if (shiftKey && document.activeElement === firstElement) {
      lastElement.focus();
    } else if (!shiftKey && document.activeElement === lastElement) {
      firstElement.focus();
    }
  };

  const getFocusableElements = () => {
    const modal = document.querySelector(`.${styles.quickView}`);
    if (!modal) return [];
    
    return Array.from(
      modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    );
  };

  const announceAutoplayState = (isPlaying) => {
    setAnnounceMessage(
      isPlaying ? 'Slideshow autoplay started' : 'Slideshow autoplay paused'
    );
  };

  // Focus management
  useEffect(() => {
    if (activeQuickView !== null) {
      // Focus first focusable element in quick view
      const focusableElements = getFocusableElements();
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    } else {
      // Return focus to slider
      sliderRef.current?.focus();
    }
  }, [activeQuickView]);

  // Screen reader announcements
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setAnnounceMessage('');
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [announceMessage]);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.5, 3));
    setIsZoomed(true);
    setIsAutoPlaying(false);
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => {
      const newZoom = Math.max(prev - 0.5, 1);
      if (newZoom === 1) {
        setIsZoomed(false);
        setPanPosition({ x: 0, y: 0 });
      }
      return newZoom;
    });
  };

  const handleMouseDown = (e) => {
    if (isZoomed) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - panPosition.x,
        y: e.clientY - panPosition.y
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && isZoomed) {
      const maxPanX = (imageRef.current?.offsetWidth * (zoomLevel - 1)) / 2;
      const maxPanY = (imageRef.current?.offsetHeight * (zoomLevel - 1)) / 2;
      
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;

      setPanPosition({
        x: Math.max(Math.min(newX, maxPanX), -maxPanX),
        y: Math.max(Math.min(newY, maxPanY), -maxPanY)
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e) => {
    if (e.ctrlKey) {
      e.preventDefault();
      const delta = -Math.sign(e.deltaY) * 0.1;
      const newZoom = Math.max(1, Math.min(3, zoomLevel + delta));
      setZoomLevel(newZoom);
      if (newZoom > 1) {
        setIsZoomed(true);
        setIsAutoPlaying(false);
      } else {
        setIsZoomed(false);
        setPanPosition({ x: 0, y: 0 });
      }
    }
  };

  useEffect(() => {
    const handleKeyZoom = (e) => {
      if (e.ctrlKey && e.key === '+') {
        e.preventDefault();
        handleZoomIn();
      } else if (e.ctrlKey && e.key === '-') {
        e.preventDefault();
        handleZoomOut();
      }
    };

    window.addEventListener('keydown', handleKeyZoom);
    return () => window.removeEventListener('keydown', handleKeyZoom);
  }, []);

  const handleTouchStart = (e) => {
    setLastTouchTime(Date.now());
    setLastTouchX(e.touches[0].clientX);
    if (e.touches.length === 2) {
      // Handle pinch zoom
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      setPinchStart({ distance, zoom: zoomLevel });
    } else {
      setTouchStart(e.touches[0].clientX);
      setTouchMoveCount(0);
      
      if (touchTimeout.current) {
        clearTimeout(touchTimeout.current);
      }
    }
  };

  const handleTouchMove = (e) => {
    const currentTime = Date.now();
    const currentX = e.touches[0].clientX;
    const timeDiff = currentTime - lastTouchTime;
    const distance = currentX - lastTouchX;
    
    if (timeDiff > 0) {
      setSwipeVelocity(distance / timeDiff);
    }
    
    if (pinchStart && e.touches.length === 2) {
      // Handle pinch zoom
      e.preventDefault();
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      
      const scale = distance / pinchStart.distance;
      const newZoom = Math.max(1, Math.min(3, pinchStart.zoom * scale));
      
      setZoomLevel(newZoom);
      if (newZoom > 1) {
        setIsZoomed(true);
        setIsAutoPlaying(false);
      }
    } else if (e.touches.length === 1) {
      setTouchEnd(e.touches[0].clientX);
      setTouchMoveCount(prev => prev + 1);
    }
  };

  // Enhanced slide transition with momentum
  const handleSlideTransition = useCallback((direction) => {
    const velocity = momentum.velocity;
    const now = Date.now();
    const timeDelta = now - momentum.timestamp;
    
    if (Math.abs(velocity) > 0.5 && timeDelta < 300) {
      // Use momentum to determine slide direction
      const targetDirection = velocity > 0 ? 'next' : 'prev';
      startTransition(() => {
        if (targetDirection === 'next') {
          nextSlide();
        } else {
          prevSlide();
        }
      });
    } else {
      // Normal slide transition
      startTransition(() => {
        if (direction === 'next') {
          nextSlide();
        } else {
          prevSlide();
        }
      });
    }
  }, [momentum, nextSlide, prevSlide]);

  // Enhanced touch handling with momentum
  const handleTouchEnd = useCallback((e) => {
    const now = Date.now();
    const velocity = swipeVelocity;
    
    setMomentum({
      velocity,
      timestamp: now
    });

    handleSlideTransition(velocity > 0 ? 'next' : 'prev');
  }, [swipeVelocity, handleSlideTransition]);

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.focus();
    }
  }, []);

  const getSlideClassName = (index) => {
    if (index === currentSlide) return styles.active;
    if (direction === 'next' && index === (currentSlide + 1) % slides.length) return styles.next;
    if (direction === 'prev' && index === (currentSlide - 1 + slides.length) % slides.length) return styles.prev;
    return '';
  };

  const handleQuickView = (productId) => {
    setActiveQuickView(activeQuickView === productId ? null : productId);
    setSelectedSize(null);
    setSelectedColor(null);
    setIs360View(false);
    setRotationDegree(0);
  };

  const handle360Drag = (e) => {
    if (is360View && rotationRef.current) {
      const rect = rotationRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = x / rect.width;
      const newDegree = Math.floor(percentage * 360);
      setRotationDegree(newDegree);
    }
  };

  const toggleView = () => {
    setIs360View(!is360View);
    setRotationDegree(0);
  };

  const renderQuickView = (product) => {
    if (!product) return null;

    return (
      <div className={styles.quickView} onClick={(e) => e.stopPropagation()}>
        <div className={styles.quickViewContent}>
          <button 
            className={styles.closeButton}
            onClick={() => setActiveQuickView(null)}
            aria-label="Close quick view"
          >
            <ion-icon name="close-outline"></ion-icon>
          </button>

          <div className={styles.productGallery}>
            {is360View ? (
              <div 
                ref={rotationRef}
                className={styles.view360}
                onMouseMove={handle360Drag}
              >
                <img 
                  src={product.images360[Math.floor(rotationDegree / (360 / product.images360.length))]}
                  alt={`${product.name} - ${rotationDegree}° view`}
                />
                <button 
                  className={styles.viewToggle}
                  onClick={toggleView}
                  aria-label="Switch to standard view"
                >
                  <ion-icon name="image-outline"></ion-icon>
                </button>
              </div>
            ) : (
              <div className={styles.standardView}>
                <img src={product.image} alt={product.name} />
                <button 
                  className={styles.viewToggle}
                  onClick={toggleView}
                  aria-label="Switch to 360° view"
                >
                  <ion-icon name="360-outline"></ion-icon>
                </button>
              </div>
            )}
          </div>

          <div className={styles.productInfo}>
            <h3>{product.name}</h3>
            <div className={styles.priceWrapper}>
              <span className={styles.price}>${product.price}</span>
              {product.originalPrice && (
                <span className={styles.originalPrice}>${product.originalPrice}</span>
              )}
            </div>

            <div className={styles.sizeSelector}>
              <h4>Select Size</h4>
              <div className={styles.sizeOptions}>
                {product.sizes.map(size => (
                  <button
                    key={size}
                    className={`${styles.sizeOption} ${selectedSize === size ? styles.selected : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.colorSelector}>
              <h4>Select Color</h4>
              <div className={styles.colorOptions}>
                {product.colors.map(color => (
                  <button
                    key={color.name}
                    className={`${styles.colorOption} ${selectedColor === color.name ? styles.selected : ''}`}
                    style={{ '--color': color.code }}
                    onClick={() => setSelectedColor(color.name)}
                    aria-label={`Select ${color.name} color`}
                  >
                    {selectedColor === color.name && (
                      <ion-icon name="checkmark-outline"></ion-icon>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.features}>
              {product.features.map((feature, index) => (
                <div key={index} className={styles.feature}>
                  <ion-icon name="checkmark-circle-outline"></ion-icon>
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <button 
              className={styles.addToCart}
              disabled={!selectedSize || !selectedColor}
            >
              Add to Cart
              <ion-icon name="bag-add-outline"></ion-icon>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderHotspots = (slide) => {
    if (!slide.hotspots) return null;

    return slide.hotspots.map(hotspot => (
      <div
        key={hotspot.id}
        className={`${styles.hotspot} ${styles[hotspot.type]} ${activeHotspot === hotspot.id ? styles.active : ''}`}
        style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
        onClick={(e) => {
          e.stopPropagation();
          if (hotspot.type === '360view') {
            setIs360View(true);
          } else {
            setActiveHotspot(activeHotspot === hotspot.id ? null : hotspot.id);
          }
        }}
        data-id={hotspot.id}
      >
        <div className={styles.hotspotIcon}>
          <ion-icon name={hotspot.icon}></ion-icon>
        </div>
        <div className={styles.hotspotContent}>
          <h3>{hotspot.title}</h3>
          <p>{hotspot.description}</p>
          {hotspot.price && (
            <button 
              className={styles.quickViewButton}
              onClick={(e) => {
                e.stopPropagation();
                handleQuickView(slide.id);
              }}
            >
              Quick View
              <ion-icon name="eye-outline"></ion-icon>
            </button>
          )}
        </div>
        <div className={styles.hotspotRing}></div>
      </div>
    ));
  };

  // Preload images
  useEffect(() => {
    const preloadNextImage = (index) => {
      const nextIndex = (index + 1) % slides.length;
      const imageUrl = slides[nextIndex].image;
      
      if (!preloadedImages.has(imageUrl)) {
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => {
          setPreloadedImages(prev => new Set([...prev, imageUrl]));
        };
      }
    };

    preloadNextImage(currentSlide);
  }, [currentSlide, slides, preloadedImages]);

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.pageYOffset;
        parallaxRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Particle effect
  useEffect(() => {
    if (particlesRef.current) {
      const canvas = particlesRef.current;
      const ctx = canvas.getContext('2d');
      const particles = [];

      const createParticle = () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 2 - 1,
        opacity: Math.random() * 0.5 + 0.2
      });

      for (let i = 0; i < 50; i++) {
        particles.push(createParticle());
      }

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
          particle.x += particle.speedX;
          particle.y += particle.speedY;

          if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
          if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
          ctx.fill();
        });

        requestAnimationFrame(animate);
      };

      animate();
    }
  }, []);

  // Skip link for accessibility
  const handleSkipToContent = () => {
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView();
    }
  };

  // Enhanced error handling for images
  const handleImageError = (imageUrl) => {
    setImageLoadErrors(prev => new Set([...prev, imageUrl]));
    const currentRetries = retryCount[imageUrl] || 0;
    if (currentRetries < 3) {
      setRetryCount(prev => ({
        ...prev,
        [imageUrl]: currentRetries + 1
      }));
      setTimeout(() => {
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => {
          setImageLoadErrors(prev => {
            const newErrors = new Set(prev);
            newErrors.delete(imageUrl);
            return newErrors;
          });
        };
      }, 2000 * (currentRetries + 1));
    }
  };

  // Enhanced touch handling
  const handleDoubleTap = (e) => {
    const now = Date.now();
    const timeDiff = now - lastTapTime;
    
    if (timeDiff < 300) {
      // Double tap detected
      const touch = e.touches[0];
      const element = document.elementFromPoint(touch.clientX, touch.clientY);
      if (element.closest(`.${styles.imageWrapper}`)) {
        if (isZoomed) {
          setZoomLevel(1);
          setIsZoomed(false);
          setPanPosition({ x: 0, y: 0 });
        } else {
          setZoomLevel(2);
          setIsZoomed(true);
          const rect = element.getBoundingClientRect();
          setPanPosition({
            x: (touch.clientX - rect.left) / rect.width * 100,
            y: (touch.clientY - rect.top) / rect.height * 100
          });
        }
      }
    }
    setLastTapTime(now);
  };

  // Enhanced pinch zoom
  const handlePinchZoom = (e) => {
    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );
      
      if (touchDistance) {
        const scale = distance / touchDistance;
        const newZoom = Math.max(1, Math.min(3, zoomLevel * scale));
        setZoomLevel(newZoom);
        if (newZoom > 1) {
          setIsZoomed(true);
          const centerX = (touch1.clientX + touch2.clientX) / 2;
          const centerY = (touch1.clientY + touch2.clientY) / 2;
          const rect = e.currentTarget.getBoundingClientRect();
          setPanPosition({
            x: (centerX - rect.left) / rect.width * 100,
            y: (centerY - rect.top) / rect.height * 100
          });
        }
      }
      setTouchDistance(distance);
    }
  };

  // Spring physics for slide transitions
  useEffect(() => {
    if (springRef.current) {
      springRef.current.style.transition = 'none';
      const animation = springRef.current.animate([
        { transform: 'translateX(0)' },
        { transform: `translateX(${direction === 'next' ? '-100%' : '100%'})` }
      ], {
        duration: 800,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        fill: 'forwards'
      });
      
      animation.onfinish = () => {
        springRef.current.style.transform = `translateX(${direction === 'next' ? '-100%' : '100%'})`;
      };
    }
  }, [currentSlide, direction]);

  // Enhanced keyboard shortcuts
  useEffect(() => {
    const handleKeyboardShortcuts = (e) => {
      if (e.altKey) {
        switch (e.key) {
          case 'z':
            handleZoomIn();
            break;
          case 'x':
            handleZoomOut();
            break;
          case 'r':
            setZoomLevel(1);
            setIsZoomed(false);
            setPanPosition({ x: 0, y: 0 });
            break;
          case 'p':
            setIsAutoPlaying(prev => !prev);
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyboardShortcuts);
    return () => window.removeEventListener('keydown', handleKeyboardShortcuts);
  }, []);

  // Enhanced error boundary
  useEffect(() => {
    const handleError = (error) => {
      console.error('Hero component error:', error);
      setError(error);
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  // Move preloadVisibleImages before it's used
  const preloadVisibleImages = useCallback(() => {
    if (!isInView) return;

    // Preload current and adjacent slides
    const indicesToPreload = [
      currentSlide,
      (currentSlide + 1) % slides.length,
      (currentSlide - 1 + slides.length) % slides.length
    ];

    indicesToPreload.forEach(index => {
      const slide = slides[index];
      if (slide && !preloadedImages.has(slide.image)) {
        const img = new Image();
        img.src = slide.image;
        img.onload = () => {
          setPreloadedImages(prev => new Set([...prev, slide.image]));
        };
        
        // If slide has 360 view images, preload those too
        if (slide.product?.images360) {
          slide.product.images360.forEach(imageUrl => {
            if (!preloadedImages.has(imageUrl)) {
              const img360 = new Image();
              img360.src = imageUrl;
              img360.onload = () => {
                setPreloadedImages(prev => new Set([...prev, imageUrl]));
              };
            }
          });
        }
      }
    });
  }, [currentSlide, slides, isInView, preloadedImages]);

  // Enhanced particle animation with performance optimization
  const startParticleAnimation = useCallback(() => {
    if (!particlesRef.current || !isInView) return;

    const ctx = particlesRef.current.getContext('2d');
    const particles = new Float32Array(150); // Use typed arrays for better performance
    let lastTime = performance.now();

    const animate = (currentTime) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      
      for (let i = 0; i < particles.length; i += 5) {
        particles[i] += particles[i + 2] * deltaTime * 0.06;
        particles[i + 1] += particles[i + 3] * deltaTime * 0.06;

        if (particles[i] < 0 || particles[i] > ctx.canvas.width) particles[i + 2] *= -1;
        if (particles[i + 1] < 0 || particles[i + 1] > ctx.canvas.height) particles[i + 3] *= -1;

        ctx.globalAlpha = particles[i + 4];
        ctx.beginPath();
        ctx.arc(particles[i], particles[i + 1], 2, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    // Initialize particles
    for (let i = 0; i < particles.length; i += 5) {
      particles[i] = Math.random() * ctx.canvas.width;     // x
      particles[i + 1] = Math.random() * ctx.canvas.height; // y
      particles[i + 2] = Math.random() * 2 - 1;            // speedX
      particles[i + 3] = Math.random() * 2 - 1;            // speedY
      particles[i + 4] = Math.random() * 0.3 + 0.2;        // opacity
    }

    animate(performance.now());
  }, [isInView]);

  const stopParticleAnimation = useCallback(() => {
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
  }, []);

  // Now the Intersection Observer setup can use preloadVisibleImages
  useEffect(() => {
    intersectionObserver.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting) {
          // Start animations and load resources
          startParticleAnimation();
          preloadVisibleImages();
        } else {
          // Cleanup when not in view
          stopParticleAnimation();
        }
      });
    }, INTERSECTION_OPTIONS);

    if (sliderRef.current) {
      intersectionObserver.current.observe(sliderRef.current);
    }

    return () => {
      if (intersectionObserver.current) {
        intersectionObserver.current.disconnect();
      }
    };
  }, [startParticleAnimation, preloadVisibleImages, stopParticleAnimation]);

  // Network status monitoring
  useEffect(() => {
    const handleOnline = () => setNetworkStatus(true);
    const handleOffline = () => setNetworkStatus(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Enhanced keyboard navigation
  const handleKeyboardNav = useCallback((e) => {
    const actions = {
      ArrowLeft: { fn: prevSlide, label: 'Previous slide', description: slides[(currentSlide - 1 + slides.length) % slides.length].title },
      ArrowRight: { fn: nextSlide, label: 'Next slide', description: slides[(currentSlide + 1) % slides.length].title },
      ArrowUp: { fn: handleZoomIn, label: 'Zoom in' },
      ArrowDown: { fn: handleZoomOut, label: 'Zoom out' },
      ' ': { fn: () => setIsAutoPlaying(prev => !prev), label: 'Toggle autoplay' },
      Home: { fn: () => goToSlide(0), label: 'First slide' },
      End: { fn: () => goToSlide(slides.length - 1), label: 'Last slide' }
    };

    const action = actions[e.key];
    if (action && document.activeElement === sliderRef.current) {
      e.preventDefault();
      startTransition(() => {
        action.fn();
      });
      announce(`${action.label}${action.description ? `: ${action.description}` : ''}`);
    }
  }, [slides, currentSlide, announce, prevSlide, nextSlide, handleZoomIn, handleZoomOut, goToSlide]);

  // Sound effects (optional)
  const playSound = useCallback((type) => {
    if (!window.AudioContext) return;
    
    const audioContext = new AudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    const sounds = {
      slide: { frequency: 440, duration: 0.15 },
      zoom: { frequency: 660, duration: 0.1 },
      error: { frequency: 220, duration: 0.3 }
    };

    const sound = sounds[type];
    if (sound) {
      oscillator.frequency.value = sound.frequency;
      gainNode.gain.value = 0.1;
      oscillator.start();
      oscillator.stop(audioContext.currentTime + sound.duration);
    }
  }, []);

  // Enhanced error handling
  const handleError = useCallback((error, context) => {
    console.error(`Error in ${context}:`, error);
    setError(error);
    playSound('error');
    
    // Attempt recovery based on context
    switch (context) {
      case 'image':
        handleImageError(error.target.src);
        break;
      case 'animation':
        stopParticleAnimation();
        startParticleAnimation();
        break;
      default:
        // Generic error recovery
        setIsAutoPlaying(false);
        setZoomLevel(ZOOM_LEVELS.MIN);
        setPanPosition({ x: 0, y: 0 });
    }
  }, []);

  // Enhanced preview thumbnails
  const renderPreviews = useCallback(() => {
    return slides.map((slide, index) => (
      <button
        key={slide.id}
        className={`${styles.preview} ${index === currentSlide ? styles.active : ''}`}
        onClick={() => {
          startTransition(() => {
            goToSlide(index);
          });
        }}
        onMouseEnter={() => {
          // Preload image on hover
          const img = new Image();
          img.src = slide.image;
        }}
        aria-label={`Preview of ${slide.title}${index === currentSlide ? ' (Current)' : ''}`}
        role="tab"
        aria-selected={index === currentSlide}
        tabIndex={index === currentSlide ? 0 : -1}
      >
        <div className={styles.previewProgress} role="presentation">
          <div 
            className={styles.previewProgressFill} 
            style={{ 
              width: index === currentSlide ? `${progress}%` : '0%' 
            }} 
          />
        </div>
        <img 
          src={slide.image} 
          alt="" 
          className={styles.previewImage}
          loading="lazy"
          role="presentation"
        />
        <div className={styles.previewOverlay} role="presentation" />
      </button>
    ));
  }, [slides, currentSlide, progress, goToSlide]);

  // Enhanced magnetic snap points - Move this up before updateLayout
  const updateSnapPoints = useCallback(() => {
    if (!sliderRef.current) return;
    
    const sliderWidth = sliderRef.current.offsetWidth;
    snapPoints.current.clear();
    
    slides.forEach((_, index) => {
      snapPoints.current.set(index, index * sliderWidth);
    });
  }, [slides.length]);

  // Layout update function - Now updateSnapPoints is defined before this
  const updateLayout = useCallback((width) => {
    if (!sliderRef.current) return;

    // Update layout based on viewport width
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1200;
    
    // Update slide dimensions
    const slides = sliderRef.current.querySelectorAll(`.${styles.slide}`);
    slides.forEach(slide => {
      const content = slide.querySelector(`.${styles.content}`);
      const imageWrapper = slide.querySelector(`.${styles.imageWrapper}`);
      
      if (isMobile) {
        content.style.maxWidth = '100%';
        imageWrapper.style.width = '100%';
      } else if (isTablet) {
        content.style.maxWidth = '50%';
        imageWrapper.style.width = '55%';
      } else {
        content.style.maxWidth = '600px';
        imageWrapper.style.width = '65%';
      }
    });

    // Update hotspot positions
    const hotspots = sliderRef.current.querySelectorAll(`.${styles.hotspot}`);
    hotspots.forEach(hotspot => {
      if (isMobile) {
        hotspot.style.transform = `translate(-50%, -50%) scale(0.8)`;
      } else {
        hotspot.style.transform = `translate(-50%, -50%)`;
      }
    });

    // Update preview container
    const previewContainer = sliderRef.current.querySelector(`.${styles.previewContainer}`);
    if (previewContainer) {
      if (isMobile) {
        previewContainer.style.bottom = '5rem';
        previewContainer.style.right = '50%';
        previewContainer.style.transform = 'translateX(50%) translateZ(100px)';
      } else {
        previewContainer.style.bottom = '6rem';
        previewContainer.style.right = '4rem';
        previewContainer.style.transform = 'translateZ(100px)';
      }
    }

    // Update controls position
    const controls = sliderRef.current.querySelector(`.${styles.controls}`);
    if (controls) {
      if (isMobile) {
        controls.style.left = '2rem';
        controls.style.bottom = '1.5rem';
      } else {
        controls.style.left = '4rem';
        controls.style.bottom = '2.5rem';
      }
    }

    // Update snap points after layout changes
    updateSnapPoints();
  }, [updateSnapPoints]);

  // Add ResizeObserver effect
  useEffect(() => {
    resizeObserver.current = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width } = entry.contentRect;
        updateLayout(width);
      }
    });

    if (sliderRef.current) {
      resizeObserver.current.observe(sliderRef.current);
    }

    return () => {
      if (resizeObserver.current) {
        resizeObserver.current.disconnect();
      }
    };
  }, [updateLayout]);

  // Add window resize listener for snap points
  useEffect(() => {
    updateSnapPoints();
    window.addEventListener('resize', updateSnapPoints);
    return () => window.removeEventListener('resize', updateSnapPoints);
  }, [updateSnapPoints]);

  return (
    <ErrorBoundary onError={handleError}>
      <button 
        onClick={handleSkipToContent}
        className={styles.skipLink}
      >
        Skip to main content
      </button>

      <div 
        role="status" 
        aria-live="polite" 
        className={styles.visuallyHidden}
      >
        {announceMessage}
      </div>

      <section 
        ref={sliderRef}
        className={`${styles.hero} ${isPending ? styles.pending : ''}`}
        style={{ 
          contain: 'content',
          cursor: isDragging ? 'grabbing' : isZoomed ? 'grab' : 'default' 
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onKeyDown={handleKeyDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
        tabIndex="0"
        role="region"
        aria-label={`Hero Slider with ${slides.length} slides. Use arrow keys to navigate. Press Space or Enter to toggle autoplay.`}
        aria-roledescription="carousel"
      >
        <canvas 
          ref={particlesRef}
          className={styles.particles}
          aria-hidden="true"
        />

        <div 
          ref={parallaxRef}
          className={styles.parallaxWrapper}
        >
          <div className={styles.slider}>
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                ref={el => slideRefs.current[index] = el}
                className={`${styles.slide} ${getSlideClassName(index)}`}
                style={{
                  '--slide-color': slide.color
                }}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${slides.length}: ${slide.title}`}
                aria-hidden={index !== currentSlide}
              >
                <div className={styles.content}>
                  <span className={styles.subtitle} role="text">{slide.subtitle}</span>
                  <h1 className={styles.title}>{slide.title}</h1>
                  <p className={styles.description}>{slide.description}</p>
                  <Link 
                    to="/shop" 
                    className={styles.cta}
                    aria-label={`${slide.cta} - ${slide.title}`}
                  >
                    {slide.cta}
                    <ion-icon name="arrow-forward-outline" aria-hidden="true"></ion-icon>
                  </Link>
                </div>
                
                <div className={styles.imageWrapper}>
                  <picture>
                    <source
                      media="(min-width: 1200px)"
                      srcSet={`${slide.image}?width=1600&quality=80 1x, ${slide.image}?width=3200&quality=80 2x`}
                    />
                    <source
                      media="(min-width: 768px)"
                      srcSet={`${slide.image}?width=1200&quality=80 1x, ${slide.image}?width=2400&quality=80 2x`}
                    />
                    <img
                      src={`${slide.image}?width=800&quality=80`}
                      alt={slide.title}
                      loading={index === currentSlide ? "eager" : "lazy"}
                      onError={() => handleImageError(slide.image)}
                      className={styles.slideImage}
                      style={{
                        opacity: imageLoadErrors.has(slide.image) ? 0.5 : 1
                      }}
                    />
                  </picture>
                  {imageLoadErrors.has(slide.image) && (
                    <div className={styles.imageError}>
                      <ion-icon name="warning-outline"></ion-icon>
                      <p>Image failed to load</p>
                      <button 
                        onClick={() => {
                          setImageLoadErrors(prev => {
                            const newErrors = new Set(prev);
                            newErrors.delete(slide.image);
                            return newErrors;
                          });
                          setRetryCount(prev => ({...prev, [slide.image]: 0}));
                        }}
                      >
                        Retry
                      </button>
                    </div>
                  )}
                </div>

                {activeQuickView === slide.id && slide.product && (
                  <Suspense fallback={<div className={styles.loading}>Loading...</div>}>
                    <QuickView 
                      product={slide.product}
                      onClose={() => setActiveQuickView(null)}
                    />
                  </Suspense>
                )}
              </div>
            ))}
          </div>
        </div>

        <div 
          className={styles.controls} 
          role="group" 
          aria-label="Slider controls"
        >
          <button 
            className={`${styles.arrow} ${styles.prev}`}
            onClick={prevSlide}
            aria-label="Previous slide"
            aria-controls="hero-slider"
          >
            <ion-icon name="chevron-back-outline" aria-hidden="true"></ion-icon>
          </button>
          <div 
            className={styles.indicators} 
            role="group" 
            aria-label="Slide indicators"
          >
            {slides.map((_, index) => (
              <button
                key={index}
                className={`${styles.indicator} ${index === currentSlide ? styles.active : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === currentSlide}
                aria-controls="hero-slider"
              />
            ))}
          </div>
          <button 
            className={`${styles.arrow} ${styles.next}`}
            onClick={nextSlide}
            aria-label="Next slide"
            aria-controls="hero-slider"
          >
            <ion-icon name="chevron-forward-outline" aria-hidden="true"></ion-icon>
          </button>
        </div>

        <div className={styles.zoomControl}>
          <button
            className={styles.zoomButton}
            onClick={handleZoomIn}
            disabled={zoomLevel >= 3}
            aria-label="Zoom in"
          >
            <ion-icon name="add-outline"></ion-icon>
          </button>
          <button
            className={styles.zoomButton}
            onClick={handleZoomOut}
            disabled={zoomLevel <= 1}
            aria-label="Zoom out"
          >
            <ion-icon name="remove-outline"></ion-icon>
          </button>
          {isZoomed && (
            <button
              className={styles.zoomButton}
              onClick={() => {
                setZoomLevel(1);
                setIsZoomed(false);
                setPanPosition({ x: 0, y: 0 });
              }}
              aria-label="Reset zoom"
            >
              <ion-icon name="refresh-outline"></ion-icon>
            </button>
          )}
        </div>

        <div className={styles.previewContainer}>
          {renderPreviews()}
        </div>

        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill} 
            style={{ width: `${progress}%` }}
          />
        </div>

        {isPending && (
          <div className={styles.loadingIndicator} role="status">
            <div className={styles.loadingSpinner} role="presentation" />
            <span className={styles.visuallyHidden}>Loading next slide...</span>
          </div>
        )}
      </section>
      {!networkStatus && (
        <div className={styles.networkError}>
          You're offline. Some features may be limited.
        </div>
      )}
    </ErrorBoundary>
  );
};

export default Hero; 