import React from 'react';
import { Link } from 'react-router-dom';
import styles from './FeaturedBrands.module.css';

const FeaturedBrands = () => {
  const brands = [
    {
      id: 1,
      name: "Nike",
      logo: "/assets/images/brands/nike.svg",
      path: "/brands/nike",
      productCount: 156,
      featured: true,
      description: "Just Do It - Innovative athletic footwear for every athlete",
      popularCategories: ["Running", "Basketball", "Lifestyle"]
    },
    {
      id: 2,
      name: "Adidas",
      logo: "/assets/images/brands/adidas.svg",
      path: "/brands/adidas",
      productCount: 142,
      featured: true,
      description: "Impossible Is Nothing - Performance meets style",
      popularCategories: ["Soccer", "Running", "Originals"]
    },
    {
      id: 3,
      name: "Jordan",
      logo: "/assets/images/brands/jordan.svg",
      path: "/brands/jordan",
      productCount: 89,
      featured: true,
      description: "Iconic basketball heritage with modern style",
      popularCategories: ["Basketball", "Lifestyle", "Training"]
    },
    {
      id: 4,
      name: "Puma",
      logo: "/assets/images/brands/puma.svg",
      path: "/brands/puma",
      productCount: 94,
      description: "Forever Faster - Sports and lifestyle footwear",
      popularCategories: ["Running", "Motorsport", "Training"]
    },
    {
      id: 5,
      name: "New Balance",
      logo: "/assets/images/brands/new-balance.svg",
      path: "/brands/new-balance",
      productCount: 78,
      description: "Crafted with precision for performance and comfort",
      popularCategories: ["Running", "Lifestyle", "Training"]
    },
    {
      id: 6,
      name: "Vans",
      logo: "/assets/images/brands/vans.svg",
      path: "/brands/vans",
      productCount: 67,
      description: "Off The Wall - Skateboarding and lifestyle shoes",
      popularCategories: ["Skateboarding", "Classics", "Lifestyle"]
    }
  ];

  return (
    <section className={styles.featuredBrands} aria-labelledby="brands-title">
      <div className={styles.container}>
        <header className={styles.sectionHeader}>
          <h2 id="brands-title" className={styles.title}>
            Featured Brands
          </h2>
          <p className={styles.subtitle}>
            Shop your favorite sneaker brands
          </p>
        </header>

        <div className={styles.brandsGrid}>
          {brands.map(brand => (
            <Link
              key={brand.id}
              to={brand.path}
              className={`${styles.brandCard} ${brand.featured ? styles.featured : ''}`}
              aria-label={`View ${brand.name} collection with ${brand.productCount} products`}
            >
              <div className={styles.brandLogo}>
                <img
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  className={styles.logo}
                  loading="lazy"
                />
              </div>

              <div className={styles.brandInfo}>
                <h3 className={styles.brandName}>{brand.name}</h3>
                <p className={styles.brandDescription}>{brand.description}</p>
                
                <div className={styles.categories}>
                  {brand.popularCategories.map((category, index) => (
                    <span key={index} className={styles.category}>
                      {category}
                    </span>
                  ))}
                </div>

                <div className={styles.productCount}>
                  <span className={styles.count}>{brand.productCount}</span>
                  <span className={styles.label}>Products</span>
                </div>

                <span className={styles.viewMore}>
                  View Collection
                  <span className={styles.icon}>
                    <ion-icon name="arrow-forward-outline"></ion-icon>
                  </span>
                </span>
              </div>

              <div className={styles.cardOverlay} aria-hidden="true" />
            </Link>
          ))}
        </div>

        <div className={styles.brandsShowcase}>
          <div className={styles.showcaseContent}>
            <h3 className={styles.showcaseTitle}>
              Discover All Brands
            </h3>
            <p className={styles.showcaseDescription}>
              Explore our complete collection of premium sneaker brands
            </p>
            <Link to="/brands" className={styles.showcaseBtn}>
              View All Brands
              <span className={styles.icon}>
                <ion-icon name="grid-outline"></ion-icon>
              </span>
            </Link>
          </div>

          <div className={styles.brandLogos}>
            {brands.map(brand => (
              <img
                key={brand.id}
                src={brand.logo}
                alt={`${brand.name} logo`}
                className={styles.showcaseLogo}
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBrands; 