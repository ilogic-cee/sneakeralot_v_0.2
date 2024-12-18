import React from 'react';
import styles from '../Hero.module.css';

const SlideControls = ({ onNext, onPrev, currentSlide, totalSlides }) => {
  return (
    <div 
      className={styles.controls} 
      role="group" 
      aria-label="Slider controls"
    >
      <button 
        className={`${styles.arrow} ${styles.prev}`}
        onClick={onPrev}
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
        {[...Array(totalSlides)].map((_, index) => (
          <button
            key={index}
            className={`${styles.indicator} ${index === currentSlide ? styles.active : ''}`}
            onClick={() => onNext(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide}
            aria-controls="hero-slider"
          />
        ))}
      </div>
      <button 
        className={`${styles.arrow} ${styles.next}`}
        onClick={onNext}
        aria-label="Next slide"
        aria-controls="hero-slider"
      >
        <ion-icon name="chevron-forward-outline" aria-hidden="true"></ion-icon>
      </button>
    </div>
  );
};

export default React.memo(SlideControls); 