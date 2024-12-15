import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Hero.module.css';

const QuickView = ({ product, onClose }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [is360View, setIs360View] = useState(false);
  const [rotationDegree, setRotationDegree] = useState(0);

  const handle360Drag = (e) => {
    if (is360View) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = x / rect.width;
      const newDegree = Math.floor(percentage * 360);
      setRotationDegree(newDegree);
    }
  };

  return (
    <div 
      className={styles.quickView} 
      onClick={(e) => e.stopPropagation()}
      role="dialog"
      aria-label={`Quick view for ${product.name}`}
    >
      <div className={styles.quickViewContent}>
        <button 
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close quick view"
        >
          <ion-icon name="close-outline"></ion-icon>
        </button>

        <div className={styles.productGallery}>
          {is360View ? (
            <div 
              className={styles.view360}
              onMouseMove={handle360Drag}
              role="img"
              aria-label={`360-degree view of ${product.name}`}
            >
              <img 
                src={product.images360[Math.floor(rotationDegree / (360 / product.images360.length))]}
                alt=""
                aria-hidden="true"
              />
              <button 
                className={styles.viewToggle}
                onClick={() => setIs360View(false)}
                aria-label="Switch to standard view"
              >
                <ion-icon name="image-outline"></ion-icon>
              </button>
            </div>
          ) : (
            <div 
              className={styles.standardView}
              role="img"
              aria-label={`Standard view of ${product.name}`}
            >
              <img src={product.image} alt="" aria-hidden="true" />
              <button 
                className={styles.viewToggle}
                onClick={() => setIs360View(true)}
                aria-label="Switch to 360° view"
              >
                <ion-icon name="360-outline"></ion-icon>
              </button>
            </div>
          )}
        </div>

        <div className={styles.productInfo}>
          <h3>{product.name}</h3>
          <div className={styles.priceWrapper}>
            <span className={styles.price}>${product.price}</span>
            {product.originalPrice && (
              <span className={styles.originalPrice}>${product.originalPrice}</span>
            )}
          </div>

          <div 
            className={styles.sizeSelector}
            role="radiogroup"
            aria-label="Select size"
          >
            <h4>Select Size</h4>
            <div className={styles.sizeOptions}>
              {product.sizes.map(size => (
                <button
                  key={size}
                  className={`${styles.sizeOption} ${selectedSize === size ? styles.selected : ''}`}
                  onClick={() => setSelectedSize(size)}
                  role="radio"
                  aria-checked={selectedSize === size}
                  aria-label={`Size ${size}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div 
            className={styles.colorSelector}
            role="radiogroup"
            aria-label="Select color"
          >
            <h4>Select Color</h4>
            <div className={styles.colorOptions}>
              {product.colors.map(color => (
                <button
                  key={color.name}
                  className={`${styles.colorOption} ${selectedColor === color.name ? styles.selected : ''}`}
                  style={{ '--color': color.code }}
                  onClick={() => setSelectedColor(color.name)}
                  role="radio"
                  aria-checked={selectedColor === color.name}
                  aria-label={`${color.name} color`}
                >
                  {selectedColor === color.name && (
                    <ion-icon name="checkmark-outline"></ion-icon>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.features}>
            {product.features.map((feature, index) => (
              <div key={index} className={styles.feature}>
                <ion-icon name="checkmark-circle-outline"></ion-icon>
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <button 
            className={styles.addToCart}
            disabled={!selectedSize || !selectedColor}
            onClick={() => {
              // Add to cart logic here
              onClose();
            }}
            aria-label={`Add ${product.name} to cart${!selectedSize || !selectedColor ? 
              '. Please select size and color first' : ''}`}
          >
            Add to Cart
            <ion-icon name="bag-add-outline"></ion-icon>
          </button>
        </div>
      </div>
    </div>
  );
};

QuickView.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    originalPrice: PropTypes.number,
    image: PropTypes.string.isRequired,
    images360: PropTypes.arrayOf(PropTypes.string).isRequired,
    sizes: PropTypes.arrayOf(PropTypes.string).isRequired,
    colors: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      code: PropTypes.string.isRequired
    })).isRequired,
    features: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
  onClose: PropTypes.func.isRequired
};

export default QuickView; 