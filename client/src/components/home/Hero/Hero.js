import React, { useReducer, useEffect, useCallback, memo, useTransition, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './Hero.module.css';
import SlideControls from './components/SlideControls';
import ZoomControls from './components/ZoomControls';
import { heroReducer, initialState, actionTypes } from './reducers/heroReducer';
import { useImageLoader } from './hooks/useImageLoader';
import { useSwipeGesture } from './hooks/useSwipeGesture';

// Memoized SlidePreview component
const SlidePreview = memo(({ slide, index, currentSlide, onSlideClick, progress }) => {
  return (
    <button
      key={slide.id}
      className={`${styles.preview} ${index === currentSlide ? styles.active : ''}`}
      onClick={() => onSlideClick(index)}
      onMouseEnter={() => {
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
            transform: `scaleX(${index === currentSlide ? progress / 100 : 0})`,
            transformOrigin: 'left'
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
  );
});

SlidePreview.displayName = 'SlidePreview';

const Hero = () => {
  // Define slides data first
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

  const [state, dispatch] = useReducer(heroReducer, initialState);
  const [isPending, startTransition] = useTransition();
  
  const {
    currentSlide,
    direction,
    isTransitioning,
    isAutoPlaying,
    zoomLevel,
    isZoomed,
    panPosition,
    progress,
    activeQuickView,
    networkStatus,
    error
  } = state;

  // Define slide navigation functions
  const nextSlide = useCallback(() => {
    dispatch({ type: actionTypes.NEXT_SLIDE, totalSlides: slides.length });
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    dispatch({ type: actionTypes.PREV_SLIDE, totalSlides: slides.length });
  }, [slides.length]);

  const goToSlide = useCallback((index) => {
    dispatch({ type: actionTypes.GO_TO_SLIDE, index });
  }, []);

  // Refs for cleanup and performance
  const sliderRef = useRef(null);
  const progressInterval = useRef(null);
  const cleanupRef = useRef(new Set());

  // Custom hooks
  const {
    loadImage,
    resetError,
    getImageError,
    isImageLoaded,
    getLoadedImage
  } = useImageLoader();

  const {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    isSwiping
  } = useSwipeGesture({
    onSwipeLeft: nextSlide,
    onSwipeRight: prevSlide
  });

  // Live region for accessibility
  const announceRef = useRef(null);
  const announce = useCallback((message) => {
    if (announceRef.current) {
      announceRef.current.textContent = message;
    }
  }, []);

  // Rest of the zoom and other handlers
  const handleZoomIn = useCallback(() => {
    dispatch({ type: actionTypes.UPDATE_ZOOM, zoomLevel: Math.min(zoomLevel + 0.5, 3) });
  }, [zoomLevel]);

  const handleZoomOut = useCallback(() => {
    dispatch({ type: actionTypes.UPDATE_ZOOM, zoomLevel: Math.max(zoomLevel - 0.5, 1) });
  }, [zoomLevel]);

  const handleZoomReset = useCallback(() => {
    dispatch({ type: actionTypes.RESET_ZOOM });
  }, []);

  const handlePanUpdate = useCallback((position) => {
    dispatch({ type: actionTypes.UPDATE_PAN, position });
  }, []);

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    return () => clearInterval(timer);
  }, [nextSlide]);

  // Handle transition end
  const handleTransitionEnd = useCallback(() => {
    dispatch({ type: actionTypes.SET_TRANSITION, isTransitioning: false });
  }, []);

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

  // Replace the renderPreviews function with:
  const renderPreviews = useCallback(() => {
    return slides.map((slide, index) => (
      <SlidePreview
        key={slide.id}
        slide={slide}
        index={index}
        currentSlide={currentSlide}
        progress={progress}
        onSlideClick={(index) => {
          startTransition(() => {
            goToSlide(index);
          });
        }}
      />
    ));
  }, [slides, currentSlide, progress, goToSlide]);

  // Preload images
  useEffect(() => {
    const preloadSlides = async () => {
      const slidesToPreload = [
        slides[currentSlide],
        slides[(currentSlide + 1) % slides.length],
        slides[(currentSlide - 1 + slides.length) % slides.length]
      ];

      for (const slide of slidesToPreload) {
        if (!isImageLoaded(slide.image)) {
          await loadImage(slide.image, (quality) => {
            console.log(`Loaded ${slide.image} at ${quality} quality`);
          });
        }
      }
    };

    preloadSlides();
  }, [currentSlide, slides, loadImage, isImageLoaded]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Clear all intervals and timeouts
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
      
      // Clear all cleanup tasks
      cleanupRef.current.forEach(cleanup => cleanup());
      cleanupRef.current.clear();
    };
  }, []);

  // Update progress
  useEffect(() => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }

    if (isAutoPlaying && !isTransitioning) {
      const startTime = Date.now();
      const duration = 5000; // 5 seconds

      progressInterval.current = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const newProgress = (elapsed / duration) * 100;

        dispatch({ type: actionTypes.UPDATE_PROGRESS, progress: Math.min(newProgress, 100) });

        if (newProgress >= 100) {
          nextSlide();
        }
      }, 16); // ~60fps

      cleanupRef.current.add(() => clearInterval(progressInterval.current));
    }

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [isAutoPlaying, isTransitioning, nextSlide]);

  // Announce slide changes
  useEffect(() => {
    const slide = slides[currentSlide];
    announce(`Showing slide ${currentSlide + 1} of ${slides.length}: ${slide.title}. ${slide.description}`);
  }, [currentSlide, slides, announce]);

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
      ref={sliderRef}
      data-testid="hero-carousel"
      style={{
        '--slide-offset': `${-currentSlide * 100}%`,
        '--slide-direction': direction === 'next' ? 1 : -1,
        '--zoom-level': zoomLevel,
        '--pan-x': `${panPosition.x}px`,
        '--pan-y': `${panPosition.y}px`
      }}
    >
      {/* Live region for accessibility */}
      <div 
        ref={announceRef}
        className={styles.visuallyHidden} 
        role="status" 
        aria-live="polite"
      />

      <div 
        className={styles.sliderContainer}
        data-testid="slider-container"
      >
        <div 
          className={`${styles.slider} ${isSwiping ? styles.swiping : ''}`}
          style={{ 
            transform: `translate3d(var(--slide-offset), 0, 0) scale(var(--zoom-level))`,
            transition: isSwiping ? 'none' : undefined
          }}
          onTransitionEnd={handleTransitionEnd}
          data-testid="slider"
        >
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`${styles.slide} ${index === currentSlide ? styles.active : ''}`}
              data-testid={`slide-${index}`}
              aria-hidden={index !== currentSlide}
              style={{
                transform: `translate3d(var(--pan-x), var(--pan-y), 0)`
              }}
            >
              <picture>
                <source
                  media="(min-width: 1200px)"
                  srcSet={`${slide.image}?quality=high&width=1920 1x, ${slide.image}?quality=high&width=3840 2x`}
                />
                <source
                  media="(min-width: 768px)"
                  srcSet={`${slide.image}?quality=medium&width=1200 1x, ${slide.image}?quality=high&width=2400 2x`}
                />
                <img
                  src={`${slide.image}?quality=low&width=640`}
                  alt={slide.title}
                  className={styles.slideImage}
                  loading={index === currentSlide ? "eager" : "lazy"}
                  onError={() => resetError(slide.image)}
                  data-testid={`slide-image-${index}`}
                />
              </picture>

              {getImageError(slide.image) && (
                <div className={styles.errorOverlay} data-testid="image-error">
                  <p>Failed to load image</p>
                  <button onClick={() => resetError(slide.image)}>
                    Retry
                  </button>
                </div>
              )}

              <div className={styles.content}>
                <span className={styles.subtitle}>{slide.subtitle}</span>
                <h2 className={styles.title}>{slide.title}</h2>
                <p className={styles.description}>{slide.description}</p>
                <Link 
                  to={slide.path}
                  className={styles.cta}
                  data-testid={`slide-cta-${index}`}
                >
                  {slide.buttonText}
                  <ion-icon name="arrow-forward-outline" aria-hidden="true" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <SlideControls
          onNext={nextSlide}
          onPrev={prevSlide}
          currentSlide={currentSlide}
          totalSlides={slides.length}
          isTransitioning={isTransitioning}
          data-testid="slide-controls"
        />

        <ZoomControls
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onReset={handleZoomReset}
          zoomLevel={zoomLevel}
          isZoomed={isZoomed}
          data-testid="zoom-controls"
        />

        <div 
          className={styles.progressBar}
          data-testid="progress-bar"
        >
          <div 
            className={styles.progressFill} 
            style={{ 
              transform: `scaleX(${progress / 100})`,
              transformOrigin: 'left'
            }}
          />
        </div>
      </div>

      {!networkStatus && (
        <div 
          className={styles.networkError}
          role="alert"
          data-testid="network-error"
        >
          You're offline. Some features may be limited.
        </div>
      )}
    </section>
  );
};

export default memo(Hero); 