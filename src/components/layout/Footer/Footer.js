import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setSubscriptionStatus('error');
      return;
    }
    // Here you would typically integrate with your newsletter service
    setSubscriptionStatus('success');
    setEmail('');
    setTimeout(() => setSubscriptionStatus(''), 3000);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>About Us</h3>
            <p className={styles.description}>
              Sneakeralot is your premier destination for authentic sneakers and streetwear.
              We offer the latest and most exclusive collections from top brands worldwide.
            </p>
            <div className={styles.socialLinks}>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Facebook">
                <ion-icon name="logo-facebook"></ion-icon>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Twitter">
                <ion-icon name="logo-twitter"></ion-icon>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram">
                <ion-icon name="logo-instagram"></ion-icon>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="Subscribe to our YouTube">
                <ion-icon name="logo-youtube"></ion-icon>
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="Follow us on TikTok">
                <ion-icon name="logo-tiktok"></ion-icon>
              </a>
            </div>
          </div>

          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Quick Links</h3>
            <ul className={styles.linkList}>
              <li><Link to="/new-arrivals">New Arrivals</Link></li>
              <li><Link to="/best-sellers">Best Sellers</Link></li>
              <li><Link to="/men">Men's Collection</Link></li>
              <li><Link to="/women">Women's Collection</Link></li>
              <li><Link to="/sale">Sale</Link></li>
              <li><Link to="/blog">Blog</Link></li>
            </ul>
          </div>

          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Customer Service</h3>
            <ul className={styles.linkList}>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/shipping">Shipping Information</Link></li>
              <li><Link to="/returns">Returns & Exchanges</Link></li>
              <li><Link to="/size-guide">Size Guide</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/track-order">Track Order</Link></li>
            </ul>
          </div>

          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Newsletter</h3>
            <p className={styles.description}>
              Subscribe to our newsletter and get 10% off your first purchase plus updates on new arrivals and exclusive offers.
            </p>
            <form onSubmit={handleSubscribe} className={styles.newsletterForm}>
              <div className={styles.inputGroup}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className={`${styles.input} ${subscriptionStatus === 'error' ? styles.error : ''}`}
                  aria-label="Email for newsletter"
                />
                <button type="submit" className={styles.subscribeButton} aria-label="Subscribe to newsletter">
                  <ion-icon name="paper-plane-outline"></ion-icon>
                </button>
              </div>
              {subscriptionStatus === 'error' && (
                <p className={styles.errorMessage} role="alert">Please enter a valid email address</p>
              )}
              {subscriptionStatus === 'success' && (
                <p className={styles.successMessage} role="alert">Thank you for subscribing!</p>
              )}
            </form>
          </div>

          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Contact Info</h3>
            <ul className={styles.contactList}>
              <li>
                <ion-icon name="location-outline"></ion-icon>
                <span>123 Sneaker Street, Fashion District, 12345</span>
              </li>
              <li>
                <ion-icon name="call-outline"></ion-icon>
                <a href="tel:+1234567890">+1 (234) 567-890</a>
              </li>
              <li>
                <ion-icon name="mail-outline"></ion-icon>
                <a href="mailto:support@sneakeralot.com">support@sneakeralot.com</a>
              </li>
              <li>
                <ion-icon name="time-outline"></ion-icon>
                <span>Mon - Fri: 9:00 AM - 6:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottomSection}>
          <div className={styles.paymentMethods} role="list" aria-label="Accepted payment methods">
            <img src="/images/payment-visa.png" alt="Visa" />
            <img src="/images/payment-mastercard.png" alt="Mastercard" />
            <img src="/images/payment-amex.png" alt="American Express" />
            <img src="/images/payment-paypal.png" alt="PayPal" />
            <img src="/images/payment-apple-pay.png" alt="Apple Pay" />
            <img src="/images/payment-google-pay.png" alt="Google Pay" />
            <img src="/images/payment-klarna.png" alt="Klarna" />
            <img src="/images/payment-afterpay.png" alt="Afterpay" />
            <img src="/images/payment-shop-pay.png" alt="Shop Pay" />
            <img src="/images/payment-stripe.png" alt="Stripe" />
            <img src="/images/payment-alipay.png" alt="Alipay" />
            <img src="/images/payment-wechat-pay.png" alt="WeChat Pay" />
          </div>
          
          <div className={styles.copyright}>
            <p>&copy; {currentYear} Sneakeralot. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 