import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './FeaturedProducts.module.css';

const products = [
  {
    id: 1,
    name: "Nike Air Max 270",
    price: 149.99,
    image: "/assets/images/products/nike-airmax-270.jpg",
    brand: "Nike",
    rating: 4.5,
    reviews: 128,
    path: "/product/nike-air-max-270",
    discount: 0
  },
  {
    id: 2,
    name: "Adidas Ultra Boost 21",
    price: 179.99,
    image: "/assets/images/products/adidas-ultraboost-21.jpg",
    brand: "Adidas",
    rating: 4.8,
    reviews: 95,
    path: "/product/adidas-ultra-boost-21",
    discount: 15
  },
  {
    id: 3,
    name: "Jordan 1 Retro High",
    price: 189.99,
    image: "/assets/images/products/jordan-1-retro.jpg",
    brand: "Jordan",
    rating: 4.9,
    reviews: 156,
    path: "/product/jordan-1-retro-high",
    discount: 0
  },
  {
    id: 4,
    name: "Puma RS-X³",
    price: 129.99,
    image: "/assets/images/products/puma-rsx.jpg",
    brand: "Puma",
    rating: 4.3,
    reviews: 74,
    path: "/product/puma-rsx",
    discount: 20
  },
  {
    id: 5,
    name: "New Balance 990v5",
    price: 174.99,
    image: "/assets/images/products/nb-990v5.jpg",
    brand: "New Balance",
    rating: 4.7,
    reviews: 89,
    path: "/product/new-balance-990v5",
    discount: 0
  },
  {
    id: 6,
    name: "Yeezy Boost 350 V2",
    price: 229.99,
    image: "/assets/images/products/yeezy-350.jpg",
    brand: "Adidas",
    rating: 4.6,
    reviews: 203,
    path: "/product/yeezy-boost-350-v2",
    discount: 0
  }
];

const FeaturedProducts = () => {
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const formatPrice = (price, discount = 0) => {
    const finalPrice = price * (1 - discount / 100);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(finalPrice);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => {
      const filled = index < Math.floor(rating);
      const half = !filled && index < Math.ceil(rating);
      
      return (
        <ion-icon
          key={index}
          name={filled ? 'star' : half ? 'star-half' : 'star-outline'}
          style={{ color: 'var(--color-primary)' }}
          aria-hidden="true"
        />
      );
    });
  };

  return (
    <section className={styles.featuredProducts} aria-labelledby="featured-products-title">
      <div className={styles.container}>
        <h2 id="featured-products-title" className={styles.title}>
          Featured Products
        </h2>
        <p className={styles.subtitle}>
          Discover our most popular and trending sneakers
        </p>

        <div className={styles.grid}>
          {products.map((product) => (
            <Link
              key={product.id}
              to={product.path}
              className={styles.product}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
              aria-label={`View ${product.name} details`}
            >
              <div className={styles.imageContainer}>
                <img
                  src={product.image}
                  alt=""
                  className={styles.image}
                  loading="lazy"
                />
                {product.discount > 0 && (
                  <span className={styles.discount}>
                    -{product.discount}%
                  </span>
                )}
                <div className={styles.overlay}>
                  <button
                    className={styles.quickView}
                    onClick={(e) => {
                      e.preventDefault();
                      // TODO: Implement quick view functionality
                    }}
                    aria-label={`Quick view ${product.name}`}
                  >
                    Quick View
                  </button>
                </div>
              </div>

              <div className={styles.content}>
                <div className={styles.brand}>{product.brand}</div>
                <h3 className={styles.name}>{product.name}</h3>
                
                <div className={styles.rating}>
                  <div className={styles.stars} aria-label={`Rated ${product.rating} out of 5 stars`}>
                    {renderStars(product.rating)}
                  </div>
                  <span className={styles.reviews}>
                    ({product.reviews})
                  </span>
                </div>

                <div className={styles.priceContainer}>
                  {product.discount > 0 && (
                    <span className={styles.originalPrice}>
                      {formatPrice(product.price)}
                    </span>
                  )}
                  <span className={styles.price}>
                    {formatPrice(product.price, product.discount)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className={styles.action}>
          <Link to="/products" className={styles.viewAll}>
            View All Products
            <ion-icon name="arrow-forward-outline" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts; 