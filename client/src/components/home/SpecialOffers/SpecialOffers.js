import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './SpecialOffers.module.css';

const SpecialOffers = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Set end date to 7 days from now
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 7);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endDate.getTime() - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  const deals = [
    {
      id: 1,
      title: "Summer Essentials",
      subtitle: "Limited Time Offer",
      description: "Get up to 40% off on selected summer sneakers",
      image: "/assets/images/deals/summer-essentials.jpg",
      discount: 40,
      path: "/deals/summer-essentials"
    },
    {
      id: 2,
      title: "Premium Collection",
      subtitle: "Exclusive Deal",
      description: "Save 30% on premium branded sneakers",
      image: "/assets/images/deals/premium-collection.jpg",
      discount: 30,
      path: "/deals/premium-collection"
    }
  ];

  return (
    <section className={styles.specialOffers} aria-labelledby="offers-title">
      <div className={styles.container}>
        <header className={styles.sectionHeader}>
          <h2 id="offers-title" className={styles.title}>
            Special Offers
          </h2>
          <p className={styles.subtitle}>
            Don't miss out on these amazing deals
          </p>
        </header>

        <div className={styles.countdown}>
          <div className={styles.timer}>
            <div className={styles.timeUnit}>
              <span className={styles.number}>{timeLeft.days}</span>
              <span className={styles.label}>Days</span>
            </div>
            <span className={styles.separator}>:</span>
            <div className={styles.timeUnit}>
              <span className={styles.number}>{timeLeft.hours}</span>
              <span className={styles.label}>Hours</span>
            </div>
            <span className={styles.separator}>:</span>
            <div className={styles.timeUnit}>
              <span className={styles.number}>{timeLeft.minutes}</span>
              <span className={styles.label}>Minutes</span>
            </div>
            <span className={styles.separator}>:</span>
            <div className={styles.timeUnit}>
              <span className={styles.number}>{timeLeft.seconds}</span>
              <span className={styles.label}>Seconds</span>
            </div>
          </div>
        </div>

        <div className={styles.dealsGrid}>
          {deals.map(deal => (
            <article key={deal.id} className={styles.dealCard}>
              <div className={styles.imageWrapper}>
                <img
                  src={deal.image}
                  alt={deal.title}
                  className={styles.dealImage}
                  loading="lazy"
                />
                <div className={styles.overlay} />
              </div>
              
              <div className={styles.dealContent}>
                <span className={styles.dealSubtitle}>{deal.subtitle}</span>
                <h3 className={styles.dealTitle}>{deal.title}</h3>
                <p className={styles.dealDescription}>{deal.description}</p>
                
                <div className={styles.dealDiscount}>
                  <span className={styles.discountLabel}>Save up to</span>
                  <span className={styles.discountValue}>{deal.discount}%</span>
                </div>

                <Link 
                  to={deal.path}
                  className={styles.shopNowBtn}
                  aria-label={`Shop ${deal.title} with up to ${deal.discount}% discount`}
                >
                  Shop Now
                  <span className={styles.icon}>
                    <ion-icon name="arrow-forward-outline"></ion-icon>
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.newsletter}>
          <div className={styles.newsletterContent}>
            <h3 className={styles.newsletterTitle}>
              Get Exclusive Offers To Your Inbox
            </h3>
            <p className={styles.newsletterDescription}>
              Subscribe to our newsletter and stay updated with the latest deals and promotions.
            </p>
          </div>

          <form className={styles.subscribeForm}>
            <div className={styles.inputWrapper}>
              <input
                type="email"
                placeholder="Enter your email"
                className={styles.emailInput}
                aria-label="Email subscription"
                required
              />
              <button 
                type="submit" 
                className={styles.subscribeBtn}
                aria-label="Subscribe to newsletter"
              >
                Subscribe
                <span className={styles.icon}>
                  <ion-icon name="paper-plane-outline"></ion-icon>
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers; 