import React, { useState, useCallback, useEffect } from 'react';
import styles from './CustomerReviews.module.css';

const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "/assets/images/reviews/avatar-1.jpg",
    rating: 5,
    date: "2024-01-15",
    product: "Nike Air Max 270",
    review: "Absolutely love these sneakers! The comfort is unmatched, and they look even better in person. Perfect for both casual wear and workouts.",
    verified: true
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "/assets/images/reviews/avatar-2.jpg",
    rating: 4,
    date: "2024-01-12",
    product: "Adidas Ultra Boost 21",
    review: "Great running shoes with excellent support. The boost technology really makes a difference in comfort during long runs.",
    verified: true
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    avatar: "/assets/images/reviews/avatar-3.jpg",
    rating: 5,
    date: "2024-01-10",
    product: "Jordan 1 Retro High",
    review: "These are my first Jordans and I'm impressed! The quality is outstanding and they're surprisingly comfortable for everyday wear.",
    verified: true
  },
  {
    id: 4,
    name: "David Kim",
    avatar: "/assets/images/reviews/avatar-4.jpg",
    rating: 5,
    date: "2024-01-08",
    product: "New Balance 990v5",
    review: "The perfect balance of style and comfort. These have become my go-to shoes for everything from running errands to light workouts.",
    verified: true
  }
];

const CustomerReviews = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextReview = useCallback(() => {
    if (!isAnimating) {
      setIsAnimating(true);
      setActiveIndex((current) => (current + 1) % reviews.length);
    }
  }, [isAnimating]);

  const prevReview = useCallback(() => {
    if (!isAnimating) {
      setIsAnimating(true);
      setActiveIndex((current) => (current - 1 + reviews.length) % reviews.length);
    }
  }, [isAnimating]);

  const goToReview = useCallback((index) => {
    if (!isAnimating && index !== activeIndex) {
      setIsAnimating(true);
      setActiveIndex(index);
    }
  }, [isAnimating, activeIndex]);

  useEffect(() => {
    const timer = setInterval(nextReview, 5000);
    return () => clearInterval(timer);
  }, [nextReview]);

  const handleTransitionEnd = () => {
    setIsAnimating(false);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <ion-icon
        key={index}
        name={index < rating ? 'star' : 'star-outline'}
        style={{ color: 'var(--color-primary)' }}
        aria-hidden="true"
      />
    ));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section className={styles.customerReviews} aria-labelledby="customer-reviews-title">
      <div className={styles.container}>
        <h2 id="customer-reviews-title" className={styles.title}>
          What Our Customers Say
        </h2>
        <p className={styles.subtitle}>
          Real reviews from verified customers
        </p>

        <div className={styles.carousel}>
          <div 
            className={styles.track}
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            onTransitionEnd={handleTransitionEnd}
          >
            {reviews.map((review) => (
              <div key={review.id} className={styles.review}>
                <div className={styles.header}>
                  <img
                    src={review.avatar}
                    alt=""
                    className={styles.avatar}
                    loading="lazy"
                  />
                  <div className={styles.info}>
                    <div className={styles.name}>
                      {review.name}
                      {review.verified && (
                        <span className={styles.verified}>
                          <ion-icon name="checkmark-circle" aria-hidden="true" />
                          Verified Purchase
                        </span>
                      )}
                    </div>
                    <div className={styles.rating}>
                      {renderStars(review.rating)}
                    </div>
                  </div>
                </div>

                <div className={styles.content}>
                  <p className={styles.text}>{review.review}</p>
                  <div className={styles.meta}>
                    <span className={styles.product}>{review.product}</span>
                    <span className={styles.date}>{formatDate(review.date)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            className={`${styles.navButton} ${styles.prev}`}
            onClick={prevReview}
            aria-label="Previous review"
          >
            <ion-icon name="chevron-back-outline" aria-hidden="true" />
          </button>

          <button
            className={`${styles.navButton} ${styles.next}`}
            onClick={nextReview}
            aria-label="Next review"
          >
            <ion-icon name="chevron-forward-outline" aria-hidden="true" />
          </button>

          <div className={styles.dots}>
            {reviews.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${index === activeIndex ? styles.active : ''}`}
                onClick={() => goToReview(index)}
                aria-label={`Go to review ${index + 1}`}
                aria-current={index === activeIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews; 