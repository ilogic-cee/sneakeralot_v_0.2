import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styles from './Hero.module.css';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const slides = [
    {
      id: 1,
      title: "New Season Arrivals",
      subtitle: "Check out all the new trends",
      description: "Up to 30% off on your first order",
      buttonText: "Shop Now",
      image: "/assets/images/banner-1.jpg",
      path: "/category/new-arrivals"
    },
    {
      id: 2,
      title: "Limited Edition Sneakers",
      subtitle: "Exclusive Collection",
      description: "Get the latest limited edition releases",
      buttonText: "View Collection",
      image: "/assets/images/banner-2.jpg",
      path: "/category/limited-edition"
    },
    {
      id: 3,
      title: "Summer Sale",
      subtitle: "Special Offers",
      description: "Save up to 50% on selected items",
      buttonText: "Shop Sale",
      image: "/assets/images/banner-3.jpg",
      path: "/category/sale"
    }
  ];

  const nextSlide = useCallback(() => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }
  }, [isTransitioning, slides.length]);

  const prevSlide = useCallback(() => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }
  }, [isTransitioning, slides.length]);

  const goToSlide = (index) => {
    if (!isTransitioning && index !== currentSlide) {
      setIsTransitioning(true);
      setCurrentSlide(index);
    }
  };

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    return () => clearInterval(timer);
  }, [nextSlide]);

  // Handle transition end
  const handleTransitionEnd = () => {
    setIsTransitioning(false);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowLeft':
        prevSlide();
        break;
      case 'ArrowRight':
        nextSlide();
        break;
      case 'Enter':
        // Navigate to current slide's link
        window.location.href = slides[currentSlide].path;
        break;
      default:
        break;
    }
  };

  return (
    <section 
      className={styles.hero}
      aria-label="Featured promotions carousel"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
      tabIndex="0"
      role="region"
    >
      <div className={styles.sliderContainer}>
        <div 
          className={styles.slider}
          style={{ 
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {slides.map((slide, index) => (
            <div 
              key={slide.id}
              className={`${styles.slide} ${index === currentSlide ? styles.active : ''}`}
              aria-hidden={index !== currentSlide}
            >
              <div className={styles.slideContent}>
                <h2 className={styles.subtitle}>{slide.subtitle}</h2>
                <h1 className={styles.title}>{slide.title}</h1>
                <p className={styles.description}>{slide.description}</p>
                <Link 
                  to={slide.path}
                  className={styles.button}
                  aria-label={`${slide.buttonText} - ${slide.title}`}
                >
                  {slide.buttonText}
                  <span className={styles.buttonIcon}>
                    <ion-icon name="arrow-forward-outline"></ion-icon>
                  </span>
                </Link>
              </div>
              <div 
                className={styles.slideImage}
                style={{ backgroundImage: `url(${slide.image})` }}
                role="img"
                aria-label={`${slide.title} promotional image`}
              />
            </div>
          ))}
        </div>

        <button 
          className={`${styles.navButton} ${styles.prevButton}`}
          onClick={prevSlide}
          aria-label="Previous slide"
          disabled={isTransitioning}
        >
          <ion-icon name="chevron-back-outline"></ion-icon>
        </button>

        <button 
          className={`${styles.navButton} ${styles.nextButton}`}
          onClick={nextSlide}
          aria-label="Next slide"
          disabled={isTransitioning}
        >
          <ion-icon name="chevron-forward-outline"></ion-icon>
        </button>

        <div className={styles.indicators} role="tablist">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`${styles.indicator} ${index === currentSlide ? styles.active : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-selected={index === currentSlide}
              role="tab"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero; 