import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductGrid.module.css';

const ProductSkeleton = () => (
  <div className={styles.skeletonCard}>
    <div className={styles.skeletonImage}></div>
    <div className={styles.skeletonContent}>
      <div className={styles.skeletonTitle}></div>
      <div className={styles.skeletonBrand}></div>
      <div className={styles.skeletonPrice}></div>
      <div className={styles.skeletonColors}>
        <div className={styles.skeletonColor}></div>
        <div className={styles.skeletonColor}></div>
        <div className={styles.skeletonColor}></div>
      </div>
      <div className={styles.skeletonActions}>
        <div className={styles.skeletonButton}></div>
        <div className={styles.skeletonIconButton}></div>
      </div>
    </div>
  </div>
);

const ProductGrid = ({ products, isLoading, isLoadingMore }) => {
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const renderSkeletons = (count) => (
    Array(count).fill(null).map((_, index) => (
      <ProductSkeleton key={`skeleton-${index}`} />
    ))
  );

  if (isLoading) {
    return (
      <div className={styles.grid}>
        {renderSkeletons(12)}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className={styles.noResults}>
        <ion-icon name="search-outline" aria-hidden="true"></ion-icon>
        <h3>No products found</h3>
        <p>Try adjusting your search or filter criteria</p>
      </div>
    );
  }

  return (
    <>
      <div className={styles.grid}>
        {products.map((product) => (
          <div 
            key={product.id}
            className={styles.productCard}
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            <Link 
              to={`/product/${product.id}`} 
              className={styles.imageContainer}
              aria-label={`View details for ${product.name}`}
            >
              <img
                src={hoveredProduct === product.id && product.images[1] 
                  ? product.images[1] 
                  : product.images[0]}
                alt={product.name}
                className={styles.productImage}
                loading="lazy"
              />
              {product.discount > 0 && (
                <span className={styles.discountBadge} aria-label={`${product.discount}% off`}>
                  -{product.discount}%
                </span>
              )}
              {product.isNew && (
                <span className={styles.newBadge} aria-label="New product">
                  New
                </span>
              )}
            </Link>

            <div className={styles.productInfo}>
              <div className={styles.header}>
                <h3>
                  <Link to={`/product/${product.id}`}>
                    {product.name}
                  </Link>
                </h3>
                <button 
                  className={styles.wishlistButton}
                  aria-label={`Add ${product.name} to wishlist`}
                >
                  <ion-icon name="heart-outline"></ion-icon>
                </button>
              </div>

              <p className={styles.brand}>{product.brand}</p>

              <div className={styles.priceContainer}>
                <span className={styles.price}>
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice > product.price && (
                  <span className={styles.originalPrice}>
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              <div className={styles.colors}>
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    className={styles.colorOption}
                    style={{ '--color': color }}
                    aria-label={`View ${color} color`}
                  />
                ))}
              </div>

              <div className={styles.actions}>
                <button 
                  className={styles.addToCart}
                  aria-label={`Add ${product.name} to cart`}
                >
                  Add to Cart
                  <ion-icon name="bag-add-outline"></ion-icon>
                </button>
                <button 
                  className={styles.quickView}
                  aria-label={`Quick view ${product.name}`}
                >
                  <ion-icon name="eye-outline"></ion-icon>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {isLoadingMore && (
        <div className={styles.loadingMoreGrid}>
          {renderSkeletons(4)}
        </div>
      )}
    </>
  );
};

export default ProductGrid; 