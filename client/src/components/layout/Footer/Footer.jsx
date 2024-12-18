import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import { SearchContext } from '../../../contexts/SearchContext';

const Footer = () => {
  const { isSearchActive } = useContext(SearchContext);

  return (
    <footer className={`${styles.footer} ${isSearchActive ? styles.searchActive : ''}`}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.company}>
            <Link to="/" className={styles.logo}>
              <img src="/images/logo.png" alt="Sneakeralot" />
            </Link>
            <div className={styles.social}>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <ion-icon name="logo-facebook"></ion-icon>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <ion-icon name="logo-instagram"></ion-icon>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <ion-icon name="logo-twitter"></ion-icon>
              </a>
            </div>
          </div>
          
          {/* Links Section */}
          <div className={styles.links}>
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/new-releases">New Releases</Link></li>
              <li><Link to="/men">Men</Link></li>
              <li><Link to="/women">Women</Link></li>
              <li><Link to="/kids">Kids</Link></li>
              <li><Link to="/sale">Sale</Link></li>
            </ul>
          </div>

          {/* Support Section */}
          <div className={styles.support}>
            <h3>Support</h3>
            <ul>
              <li><Link to="/help">Help Center</Link></li>
              <li><Link to="/shipping">Shipping Info</Link></li>
              <li><Link to="/returns">Returns</Link></li>
              <li><Link to="/size-guide">Size Guide</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className={styles.newsletter}>
            <h3>Stay Updated</h3>
            <p>Subscribe to our newsletter for exclusive offers and updates</p>
            <div className={styles.inputGroup}>
              <input type="email" placeholder="Enter your email" />
              <button type="button">Subscribe</button>
            </div>
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
            © 2024 Sneakeralot. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 