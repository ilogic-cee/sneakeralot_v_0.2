import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement newsletter signup
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Company Info */}
          <div className={styles.company}>
            <Link to="/" className={styles.logo}>
              <img src="/assets/images/logo.png" alt="Sneakeralot" />
            </Link>
            <p>Your premier destination for authentic sneakers and streetwear.</p>
            <div className={styles.social}>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Facebook">
                <ion-icon name="logo-facebook"></ion-icon>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Twitter">
                <ion-icon name="logo-twitter"></ion-icon>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram">
                <ion-icon name="logo-instagram"></ion-icon>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.links}>
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/new-arrivals">New Arrivals</Link></li>
              <li><Link to="/best-sellers">Best Sellers</Link></li>
              <li><Link to="/men">Men</Link></li>
              <li><Link to="/women">Women</Link></li>
              <li><Link to="/kids">Kids</Link></li>
              <li><Link to="/sale">Sale</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className={styles.support}>
            <h3>Support</h3>
            <ul>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/shipping">Shipping Info</Link></li>
              <li><Link to="/returns">Returns</Link></li>
              <li><Link to="/size-guide">Size Guide</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/track-order">Track Order</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className={styles.newsletter}>
            <h3>Stay Updated</h3>
            <p>Subscribe to our newsletter for exclusive offers and updates.</p>
            <form onSubmit={handleNewsletterSubmit}>
              <div className={styles.inputGroup}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  aria-label="Email for newsletter"
                />
                <button type="submit" aria-label="Subscribe to newsletter">
                  <ion-icon name="paper-plane-outline"></ion-icon>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <div className={styles.legal}>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/sitemap">Sitemap</Link>
          </div>
          <div className={styles.copyright}>
            © {new Date().getFullYear()} Sneakeralot. All rights reserved.
          </div>
          <div className={styles.payments}>
            <img src="/assets/images/payment-methods.png" alt="Accepted payment methods" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 