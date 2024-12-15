import React, { useState, useEffect } from 'react';
import styles from './CustomerReviews.module.css';

const CustomerReviews = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      date: "2024-01-15",
      avatar: "/assets/images/reviews/avatar1.jpg",
      review: "Amazing selection of sneakers! The quality is outstanding, and the customer service team was incredibly helpful.",
      purchasedItem: "Nike Air Max 270",
      verifiedPurchase: true
    },
    {
      id: 2,
      name: "Michael Chen",
      rating: 4,
      date: "2024-01-12",
      avatar: "/assets/images/reviews/avatar2.jpg",
      review: "Fast shipping and great prices. The size guide was spot on. Will definitely shop here again!",
      purchasedItem: "Adidas Ultra Boost",
      verifiedPurchase: true
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      rating: 5,
      date: "2024-01-10",
      avatar: "/assets/images/reviews/avatar3.jpg",
      review: "Found some rare editions that I couldn't get anywhere else. The authenticity guarantee gives great peace of mind.",
      purchasedItem: "Jordan Retro 4",
      verifiedPurchase: true
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [reviews.length]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span
        key={index}
        className={`${styles.star} ${index < rating ? styles.filled : ''}`}
        aria-hidden="true"
      >
        <ion-icon name={index < rating ? "star" : "star-outline"}></ion-icon>
      </span>
    ));
  };

  return (
    <section className={styles.customerReviews} aria-labelledby="reviews-title">
      <div className={styles.container}>
        <header className={styles.sectionHeader}>
          <h2 id="reviews-title" className={styles.title}>
            What Our Customers Say
          </h2>
          <p className={styles.subtitle}>
            Real reviews from verified purchasers
          </p>
        </header>

        <div className={styles.reviewsSlider} role="region" aria-label="Customer reviews slider">
          <div 
            className={styles.slidesTrack}
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {reviews.map((review) => (
              <div key={review.id} className={styles.reviewSlide}>
                <div className={styles.reviewCard}>
                  <div className={styles.reviewHeader}>
                    <img
                      src={review.avatar}
                      alt={`${review.name}'s avatar`}
                      className={styles.avatar}
                      loading="lazy"
                    />
                    <div className={styles.reviewerInfo}>
                      <h3 className={styles.reviewerName}>{review.name}</h3>
                      <div className={styles.rating} aria-label={`Rated ${review.rating} out of 5 stars`}>
                        {renderStars(review.rating)}
                      </div>
                    </div>
                  </div>

                  <blockquote className={styles.reviewContent}>
                    <p>{review.review}</p>
                  </blockquote>

                  <footer className={styles.reviewFooter}>
                    <div className={styles.purchaseInfo}>
                      <span className={styles.purchasedItem}>
                        Purchased: {review.purchasedItem}
                      </span>
                      {review.verifiedPurchase && (
                        <span className={styles.verifiedBadge}>
                          <ion-icon name="checkmark-circle"></ion-icon>
                          Verified Purchase
                        </span>
                      )}
                    </div>
                    <time className={styles.reviewDate} dateTime={review.date}>
                      {new Date(review.date).toLocaleDateString()}
                    </time>
                  </footer>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.sliderControls}>
            {reviews.map((_, index) => (
              <button
                key={index}
                className={`${styles.sliderDot} ${index === currentSlide ? styles.active : ''}`}
                onClick={() => handleSlideChange(index)}
                aria-label={`Go to review ${index + 1}`}
                aria-current={index === currentSlide}
              />
            ))}
          </div>
        </div>

        <div className={styles.reviewStats}>
          <div className={styles.stat}>
            <span className={styles.statNumber}>4.8</span>
            <div className={styles.statRating}>
              {renderStars(5)}
            </div>
            <span className={styles.statLabel}>Average Rating</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>10k+</span>
            <span className={styles.statLabel}>Verified Reviews</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>98%</span>
            <span className={styles.statLabel}>Satisfied Customers</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews; 