import React, { useState } from 'react';
import styles from './Newsletter.module.css';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setStatus('error');
      return;
    }

    try {
      // Here you would typically make an API call to your backend
      // For now, we'll simulate a successful subscription
      setStatus('loading');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStatus('success');
      setEmail('');
      
      // Reset success message after 3 seconds
      setTimeout(() => setStatus(''), 3000);
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section className={styles.newsletter} aria-labelledby="newsletter-title">
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <h2 id="newsletter-title" className={styles.title}>
              Stay in the Loop
            </h2>
            <p className={styles.description}>
              Subscribe to our newsletter and get exclusive access to:
            </p>
            <ul className={styles.benefits}>
              <li>
                <ion-icon name="checkmark-circle" aria-hidden="true" />
                Early access to new releases
              </li>
              <li>
                <ion-icon name="checkmark-circle" aria-hidden="true" />
                Exclusive subscriber-only discounts
              </li>
              <li>
                <ion-icon name="checkmark-circle" aria-hidden="true" />
                Sneaker care tips and style guides
              </li>
            </ul>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <div className={styles.inputWrapper}>
                <ion-icon name="mail-outline" aria-hidden="true" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className={`${styles.input} ${status === 'error' ? styles.error : ''}`}
                  aria-label="Email address"
                  disabled={status === 'loading'}
                />
              </div>
              <button 
                type="submit" 
                className={styles.button}
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  <ion-icon name="reload-outline" className={styles.spinner} />
                ) : (
                  <>
                    Subscribe
                    <ion-icon name="arrow-forward-outline" aria-hidden="true" />
                  </>
                )}
              </button>
            </div>
            
            {status === 'error' && (
              <p className={styles.errorMessage} role="alert">
                Please enter a valid email address
              </p>
            )}
            {status === 'success' && (
              <p className={styles.successMessage} role="alert">
                Thank you for subscribing! Check your email to confirm your subscription.
              </p>
            )}
          </form>
        </div>

        <div className={styles.imageContainer}>
          <img
            src="/assets/images/newsletter/sneakers.png"
            alt=""
            className={styles.image}
            loading="lazy"
          />
          <div className={styles.badge}>
            <span className={styles.discount}>10% OFF</span>
            <span className={styles.text}>Your First Order</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter; 