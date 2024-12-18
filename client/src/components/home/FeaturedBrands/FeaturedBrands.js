import React from 'react';
import { Link } from 'react-router-dom';
import styles from './FeaturedBrands.module.css';

const brands = [
  {
    id: 1,
    name: "Nike",
    logo: "/assets/images/brands/nike.svg",
    path: "/brand/nike",
    featured: true,
    products: 156,
    description: "Just Do It"
  },
  {
    id: 2,
    name: "Adidas",
    logo: "/assets/images/brands/adidas.svg",
    path: "/brand/adidas",
    featured: true,
    products: 142,
    description: "Impossible Is Nothing"
  },
  {
    id: 3,
    name: "Jordan",
    logo: "/assets/images/brands/jordan.svg",
    path: "/brand/jordan",
    featured: true,
    products: 89,
    description: "Become Legendary"
  },
  {
    id: 4,
    name: "New Balance",
    logo: "/assets/images/brands/new-balance.svg",
    path: "/brand/new-balance",
    featured: false,
    products: 76,
    description: "Always in Beta"
  },
  {
    id: 5,
    name: "Puma",
    logo: "/assets/images/brands/puma.svg",
    path: "/brand/puma",
    featured: false,
    products: 94,
    description: "Forever Faster"
  },
  {
    id: 6,
    name: "Reebok",
    logo: "/assets/images/brands/reebok.svg",
    path: "/brand/reebok",
    featured: false,
    products: 67,
    description: "Life is Not a Spectator Sport"
  }
];

const FeaturedBrands = () => {
  return (
    <section className={styles.featuredBrands} aria-labelledby="featured-brands-title">
      <div className={styles.container}>
        <h2 id="featured-brands-title" className={styles.title}>
          Featured Brands
        </h2>
        <p className={styles.subtitle}>
          Shop your favorite brands and discover new ones
        </p>

        <div className={styles.grid}>
          {brands.map((brand) => (
            <Link
              key={brand.id}
              to={brand.path}
              className={`${styles.brand} ${brand.featured ? styles.featured : ''}`}
              aria-label={`View all ${brand.name} products`}
            >
              <div className={styles.logoContainer}>
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className={styles.logo}
                  loading="lazy"
                />
              </div>

              <div className={styles.content}>
                <h3 className={styles.brandName}>{brand.name}</h3>
                <p className={styles.description}>{brand.description}</p>
                <div className={styles.meta}>
                  <span className={styles.products}>
                    {brand.products} Products
                  </span>
                  <span className={styles.link}>
                    Shop Now
                    <ion-icon name="arrow-forward-outline" aria-hidden="true" />
                  </span>
                </div>
              </div>

              {brand.featured && (
                <div className={styles.badge}>
                  Featured
                </div>
              )}
            </Link>
          ))}
        </div>

        <div className={styles.action}>
          <Link to="/brands" className={styles.viewAll}>
            View All Brands
            <ion-icon name="arrow-forward-outline" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBrands; 