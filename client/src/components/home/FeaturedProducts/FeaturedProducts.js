import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './FeaturedProducts.module.css';

const FeaturedProducts = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Products' },
    { id: 'new', label: 'New Arrivals' },
    { id: 'trending', label: 'Trending' },
    { id: 'bestsellers', label: 'Best Sellers' }
  ];

  const products = [
    {
      id: 1,
      name: "Nike Air Max 270",
      price: 2499.99,
      originalPrice: 2999.99,
      image: "/assets/images/products/nike-airmax-270.jpg",
      category: "new",
      rating: 4.5,
      reviewCount: 128,
      colors: ["Black/White", "Red/Black", "Blue/White"],
      sizes: [7, 8, 9, 10, 11],
      brand: "Nike"
    },
    {
      id: 2,
      name: "Adidas Ultra Boost",
      price: 2799.99,
      image: "/assets/images/products/adidas-ultraboost.jpg",
      category: "trending",
      rating: 4.8,
      reviewCount: 256,
      colors: ["White/Black", "Grey/White"],
      sizes: [8, 9, 10, 11],
      brand: "Adidas"
    },
    {
      id: 3,
      name: "Jordan 1 Retro High",
      price: 3499.99,
      image: "/assets/images/products/jordan-1-retro.jpg",
      category: "bestsellers",
      rating: 4.9,
      reviewCount: 512,
      colors: ["Chicago", "Royal Blue"],
      sizes: [7, 8, 9, 10, 11, 12],
      brand: "Jordan"
    },
    {
      id: 4,
      name: "Puma RS-X",
      price: 1899.99,
      originalPrice: 2299.99,
      image: "/assets/images/products/puma-rsx.jpg",
      category: "new",
      rating: 4.3,
      reviewCount: 96,
      colors: ["White/Multi", "Black/Neon"],
      sizes: [7, 8, 9, 10],
      brand: "Puma"
    },
    {
      id: 5,
      name: "Nike Dunk Low",
      price: 1999.99,
      image: "/assets/images/products/nike-dunk-low.jpg",
      category: "trending",
      rating: 4.7,
      reviewCount: 324,
      colors: ["Panda", "University Blue"],
      sizes: [7, 8, 9, 10, 11],
      brand: "Nike"
    },
    {
      id: 6,
      name: "Adidas Yeezy Boost",
      price: 4999.99,
      image: "/assets/images/products/adidas-yeezy.jpg",
      category: "bestsellers",
      rating: 4.6,
      reviewCount: 428,
      colors: ["Static", "Zebra"],
      sizes: [8, 9, 10, 11, 12],
      brand: "Adidas"
    },
    {
      id: 7,
      name: "New Balance 550",
      price: 2299.99,
      image: "/assets/images/products/nb-550.jpg",
      category: "trending",
      rating: 4.4,
      reviewCount: 186,
      colors: ["White/Green", "White/Navy"],
      sizes: [7, 8, 9, 10, 11],
      brand: "New Balance"
    },
    {
      id: 8,
      name: "Vans Old Skool",
      price: 1299.99,
      image: "/assets/images/products/vans-oldskool.jpg",
      category: "bestsellers",
      rating: 4.5,
      reviewCount: 642,
      colors: ["Black/White", "Navy/White"],
      sizes: [6, 7, 8, 9, 10, 11, 12],
      brand: "Vans"
    }
  ];

  const filteredProducts = activeFilter === 'all' 
    ? products 
    : products.filter(product => product.category === activeFilter);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span 
        key={index}
        className={styles.star}
        role="img"
        aria-label={index < Math.floor(rating) ? "filled star" : "empty star"}
      >
        <ion-icon 
          name={index < Math.floor(rating) ? "star" : 
                (index === Math.floor(rating) && rating % 1 > 0) ? "star-half" : "star-outline"}
        ></ion-icon>
      </span>
    ));
  };

  return (
    <section className={styles.featuredProducts} aria-labelledby="featured-title">
      <div className={styles.container}>
        <header className={styles.sectionHeader}>
          <h2 id="featured-title" className={styles.title}>
            Featured Products
          </h2>
          <p className={styles.subtitle}>
            Explore our collection of premium sneakers
          </p>
        </header>

        <div className={styles.filters} role="tablist" aria-label="Product filters">
          {filters.map(filter => (
            <button
              key={filter.id}
              className={`${styles.filterBtn} ${activeFilter === filter.id ? styles.active : ''}`}
              onClick={() => setActiveFilter(filter.id)}
              role="tab"
              aria-selected={activeFilter === filter.id}
              aria-controls="products-grid"
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div 
          id="products-grid"
          className={styles.grid}
          role="tabpanel"
          aria-label={`${activeFilter} products`}
        >
          {filteredProducts.map(product => (
            <article key={product.id} className={styles.productCard}>
              <div className={styles.imageWrapper}>
                <img
                  src={product.image}
                  alt={product.name}
                  className={styles.productImage}
                  loading="lazy"
                />
                <div className={styles.productActions}>
                  <button 
                    className={styles.actionBtn}
                    aria-label="Add to wishlist"
                  >
                    <ion-icon name="heart-outline"></ion-icon>
                  </button>
                  <button 
                    className={styles.actionBtn}
                    aria-label="Quick view"
                  >
                    <ion-icon name="eye-outline"></ion-icon>
                  </button>
                </div>
                {product.originalPrice && (
                  <span className={styles.discount}>
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </span>
                )}
              </div>

              <div className={styles.productInfo}>
                <div className={styles.productBrand}>{product.brand}</div>
                <h3 className={styles.productName}>
                  <Link to={`/product/${product.id}`}>
                    {product.name}
                  </Link>
                </h3>
                
                <div className={styles.productMeta}>
                  <div className={styles.rating} aria-label={`Rated ${product.rating} out of 5 stars`}>
                    {renderStars(product.rating)}
                    <span className={styles.reviewCount}>({product.reviewCount})</span>
                  </div>
                  <div className={styles.pricing}>
                    {product.originalPrice && (
                      <span className={styles.originalPrice}>
                        R{product.originalPrice.toFixed(2)}
                      </span>
                    )}
                    <span className={styles.price}>
                      R{product.price.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className={styles.productOptions}>
                  <div className={styles.colors}>
                    {product.colors.map((color, index) => (
                      <button
                        key={color}
                        className={styles.colorOption}
                        aria-label={`Select color ${color}`}
                        title={color}
                      />
                    ))}
                  </div>
                  <div className={styles.sizes}>
                    {product.sizes.slice(0, 3).map(size => (
                      <span key={size} className={styles.size}>
                        UK {size}
                      </span>
                    ))}
                    {product.sizes.length > 3 && (
                      <span className={styles.moreSize}>
                        +{product.sizes.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                <button 
                  className={styles.addToCart}
                  aria-label={`Add ${product.name} to cart`}
                >
                  Add to Cart
                  <span className={styles.icon}>
                    <ion-icon name="bag-add-outline"></ion-icon>
                  </span>
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.viewAll}>
          <Link to="/products" className={styles.viewAllBtn}>
            View All Products
            <span className={styles.icon}>
              <ion-icon name="arrow-forward-outline"></ion-icon>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts; 