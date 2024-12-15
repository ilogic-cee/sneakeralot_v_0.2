import React, { useState } from 'react';
import styles from './Newsletter.module.css';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setStatus('error');
      return;
    }
    // Here you would typically integrate with your newsletter service
    setStatus('success');
    setEmail('');
    setTimeout(() => setStatus(''), 3000);
  };

  return (
    <section className={styles.newsletter}>
      <div className={styles.container}>
        <h2 className={styles.title}>Join Our Newsletter</h2>
        <p className={styles.description}>
          Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
        </p>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputWrapper}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className={`${styles.input} ${status === 'error' ? styles.error : ''}`}
              aria-label="Email address"
            />
            <button type="submit" className={styles.button}>
              Subscribe
            </button>
          </div>
          
          {status === 'error' && (
            <p className={styles.errorMessage}>Please enter a valid email address</p>
          )}
          {status === 'success' && (
            <p className={styles.successMessage}>Thank you for subscribing!</p>
          )}
        </form>
      </div>
    </section>
  );
};

export default Newsletter; 