import React from 'react';
import { Link } from 'react-router-dom';
import styles from './FeaturedCategories.module.css';

const FeaturedCategories = () => {
  const categories = [
    {
      id: 1,
      title: "Men's Running",
      image: "/assets/images/categories/mens-running.jpg",
      path: "/category/mens/running",
      itemCount: 42
    },
    {
      id: 2,
      title: "Women's Lifestyle",
      image: "/assets/images/categories/womens-lifestyle.jpg",
      path: "/category/womens/lifestyle",
      itemCount: 38
    },
    {
      id: 3,
      title: "Basketball",
      image: "/assets/images/categories/basketball.jpg",
      path: "/category/basketball",
      itemCount: 24
    },
    {
      id: 4,
      title: "Limited Edition",
      image: "/assets/images/categories/limited-edition.jpg",
      path: "/category/limited-edition",
      itemCount: 16,
      featured: true
    }
  ];

  return (
    <section className={styles.categories} aria-labelledby="categories-title">
      <div className={styles.container}>
        <header className={styles.sectionHeader}>
          <h2 id="categories-title" className={styles.title}>
            Popular Categories
          </h2>
          <p className={styles.subtitle}>
            Discover our curated collection of premium sneakers
          </p>
        </header>

        <div className={styles.grid}>
          {categories.map((category) => (
            <Link
              key={category.id}
              to={category.path}
              className={`${styles.card} ${category.featured ? styles.featured : ''}`}
              aria-label={`Browse ${category.title} collection with ${category.itemCount} items`}
            >
              <div className={styles.imageWrapper}>
                <img
                  src={category.image}
                  alt={`${category.title} category`}
                  className={styles.image}
                  loading="lazy"
                />
              </div>
              <div className={styles.content}>
                <h3 className={styles.categoryTitle}>{category.title}</h3>
                <p className={styles.itemCount}>
                  {category.itemCount} Items
                </p>
                <span className={styles.link}>
                  Shop Now
                  <span className={styles.icon}>
                    <ion-icon name="arrow-forward-outline"></ion-icon>
                  </span>
                </span>
              </div>
              <div className={styles.overlay} aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories; 