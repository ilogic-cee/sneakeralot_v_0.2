import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Company Info */}
          <div className={styles.section}>
            <h3>SneakerAlot</h3>
            <p>Your one-stop destination for premium sneakers and streetwear.</p>
            <div className={styles.social}>
              <a href="#" aria-label="Facebook">
                <ion-icon name="logo-facebook" />
              </a>
              <a href="#" aria-label="Instagram">
                <ion-icon name="logo-instagram" />
              </a>
              <a href="#" aria-label="Twitter">
                <ion-icon name="logo-twitter" />
              </a>
              <a href="#" aria-label="YouTube">
                <ion-icon name="logo-youtube" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.section}>
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/new-arrivals">New Arrivals</Link></li>
              <li><Link to="/best-sellers">Best Sellers</Link></li>
              <li><Link to="/sale">Sale</Link></li>
              <li><Link to="/coming-soon">Coming Soon</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div className={styles.section}>
            <h4>Help</h4>
            <ul>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/shipping">Shipping Info</Link></li>
              <li><Link to="/returns">Returns</Link></li>
              <li><Link to="/size-guide">Size Guide</Link></li>
            </ul>
          </div>

          {/* About */}
          <div className={styles.section}>
            <h4>About</h4>
            <ul>
              <li><Link to="/about">Our Story</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/press">Press</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className={`${styles.section} ${styles.newsletter}`}>
            <h4>Stay Updated</h4>
            <p>Subscribe to our newsletter for exclusive offers and updates.</p>
            <form className={styles.subscribeForm}>
              <input
                type="email"
                placeholder="Enter your email"
                aria-label="Email for newsletter"
              />
              <button type="submit" aria-label="Subscribe">
                <ion-icon name="paper-plane-outline" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <div className={styles.legal}>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/accessibility">Accessibility</Link>
          </div>
          <div className={styles.copyright}>
            © {new Date().getFullYear()} SneakerAlot. All rights reserved.
          </div>
          <div className={styles.payments}>
            <ion-icon name="card-outline" title="Credit Card" />
            <ion-icon name="logo-paypal" title="PayPal" />
            <ion-icon name="logo-apple" title="Apple Pay" />
            <ion-icon name="logo-google" title="Google Pay" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 