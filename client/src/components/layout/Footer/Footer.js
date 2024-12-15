import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState('');
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  const handleSubscribe = useCallback((e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setSubscriptionStatus('error');
      return;
    }
    // Here you would typically integrate with your newsletter service
    setSubscriptionStatus('success');
    setEmail('');
    setTimeout(() => setSubscriptionStatus(''), 3000);
  }, [email]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  return (
    <footer className={styles.footer}>
      <button 
        onClick={scrollToTop} 
        className={styles.scrollToTop}
        aria-label="Scroll to top"
      >
        <ion-icon name="arrow-up-outline"></ion-icon>
      </button>

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
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  required
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
              <p className={styles.privacyNote}>
                By subscribing, you agree to our{' '}
                <button 
                  type="button" 
                  onClick={() => setIsPrivacyOpen(true)}
                  className={styles.privacyButton}
                >
                  Privacy Policy
                </button>
              </p>
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
            <div className={styles.paymentIcon} aria-label="Visa">
              <ion-icon name="card-outline"></ion-icon>
              <span>Visa</span>
            </div>
            <div className={styles.paymentIcon} aria-label="Mastercard">
              <ion-icon name="card-outline"></ion-icon>
              <span>Mastercard</span>
            </div>
            <div className={styles.paymentIcon} aria-label="American Express">
              <ion-icon name="card-outline"></ion-icon>
              <span>Amex</span>
            </div>
            <div className={styles.paymentIcon} aria-label="PayPal">
              <ion-icon name="logo-paypal"></ion-icon>
              <span>PayPal</span>
            </div>
            <div className={styles.paymentIcon} aria-label="Apple Pay">
              <ion-icon name="logo-apple"></ion-icon>
              <span>Apple Pay</span>
            </div>
            <div className={styles.paymentIcon} aria-label="Google Pay">
              <ion-icon name="logo-google"></ion-icon>
              <span>Google Pay</span>
            </div>
          </div>
          
          <div className={styles.copyright}>
            <p>&copy; {currentYear} Sneakeralot. All rights reserved.</p>
            <div className={styles.legalLinks}>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
              <Link to="/accessibility">Accessibility</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Policy Modal */}
      {isPrivacyOpen && (
        <div className={styles.modal} role="dialog" aria-modal="true">
          <div className={styles.modalContent}>
            <button 
              onClick={() => setIsPrivacyOpen(false)}
              className={styles.modalClose}
              aria-label="Close privacy policy"
            >
              <ion-icon name="close-outline"></ion-icon>
            </button>
            <h2>Privacy Policy</h2>
            <div className={styles.modalBody}>
              <p>Your privacy is important to us. We only use your email for newsletters and important updates.</p>
              <p>We never share your information with third parties.</p>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer; 