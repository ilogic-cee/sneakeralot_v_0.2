import React, { useState, useEffect, useRef } from 'react';
import styles from './BenefitsBar.module.css';

const BenefitsBar = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [featuredIndex, setFeaturedIndex] = useState(1);
  const [flippedIndex, setFlippedIndex] = useState(null);
  const [progress, setProgress] = useState(0);
  const progressInterval = useRef(null);

  const benefits = [
    {
      icon: 'rocket-outline',
      title: 'Express Delivery',
      description: 'Free on Orders Over R900',
      details: 'Next-day delivery available in major cities',
      isNew: true,
      actions: ['share', 'info']
    },
    {
      icon: 'shield-checkmark-outline',
      title: 'Secure Shopping',
      description: '100% Protected & Safe',
      details: 'SSL encryption and secure payment gateways',
      actions: ['lock', 'info']
    },
    {
      icon: 'refresh-outline',
      title: 'Easy Returns',
      description: '30-Day Money Back',
      details: 'No questions asked return policy',
      actions: ['calendar', 'info']
    },
    {
      icon: 'headset-outline',
      title: '24/7 Support',
      description: 'Live Chat & Phone',
      details: 'Dedicated customer service team',
      actions: ['call', 'mail']
    },
    {
      icon: 'pricetag-outline',
      title: 'Best Prices',
      description: 'Price Match Guarantee',
      details: "We'll match any authorized dealer",
      actions: ['cash', 'info']
    },
    {
      icon: 'gift-outline',
      title: 'Loyalty Rewards',
      description: 'Earn Points on Orders',
      details: 'Get R100 for every 1000 points',
      isNew: true,
      actions: ['star', 'info']
    }
  ];

  useEffect(() => {
    setProgress(0);
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }

    progressInterval.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setFeaturedIndex((prevIndex) => (prevIndex + 1) % benefits.length);
          return 0;
        }
        return prev + 2;
      });
    }, 100);

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [featuredIndex, benefits.length]);

  const handleBenefitClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
    setFlippedIndex(flippedIndex === index ? null : index);
  };

  const handleActionClick = (e, action) => {
    e.stopPropagation();
    switch (action) {
      case 'info':
        // Show more info modal
        break;
      case 'share':
        // Show share options
        break;
      case 'call':
        // Open call dialog
        break;
      case 'mail':
        // Open mail client
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.benefitsBar}>
      <div className={styles.container}>
        {benefits.map((benefit, index) => (
          <div 
            key={index}
            className={`${styles.benefit} ${activeIndex === index ? styles.active : ''} ${featuredIndex === index ? styles.featured : ''} ${flippedIndex === index ? styles.flipped : ''} ${benefit.isNew ? styles.new : ''}`}
            onClick={() => handleBenefitClick(index)}
          >
            <div className={styles.iconWrapper}>
              <ion-icon name={benefit.icon}></ion-icon>
            </div>
            <div className={styles.content}>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
              {activeIndex === index && (
                <div className={styles.details}>
                  {benefit.details}
                </div>
              )}
              <div className={styles.quickActions}>
                {benefit.actions.map((action, i) => (
                  <button
                    key={i}
                    className={styles.actionButton}
                    onClick={(e) => handleActionClick(e, action)}
                  >
                    <ion-icon name={`${action}-outline`}></ion-icon>
                  </button>
                ))}
              </div>
            </div>
            {featuredIndex === index && (
              <div 
                className={styles.progressBar}
                style={{ width: `${progress}%` }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BenefitsBar; 