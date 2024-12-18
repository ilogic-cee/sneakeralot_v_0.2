import React from 'react';
import { Link } from 'react-router-dom';
import styles from './FeaturedCategories.module.css';

const categories = [
  {
    id: 1,
    title: "Men's Sneakers",
    description: "Classic & Contemporary Styles",
    image: "/assets/images/categories/mens.jpg",
    path: "/category/men",
    color: "#2ecc71"
  },
  {
    id: 2,
    title: "Women's Collection",
    description: "Trendy & Comfortable",
    image: "/assets/images/categories/womens.jpg",
    path: "/category/women",
    color: "#e74c3c"
  },
  {
    id: 3,
    title: "Limited Editions",
    description: "Exclusive Releases",
    image: "/assets/images/categories/limited.jpg",
    path: "/category/limited",
    color: "#f39c12"
  },
  {
    id: 4,
    title: "Sport Performance",
    description: "Built for Athletes",
    image: "/assets/images/categories/sport.jpg",
    path: "/category/sport",
    color: "#3498db"
  }
];

const FeaturedCategories = () => {
  return (
    <section className={styles.featuredCategories} aria-labelledby="featured-categories-title">
      <div className={styles.container}>
        <h2 id="featured-categories-title" className={styles.title}>
          Shop by Category
        </h2>
        <p className={styles.subtitle}>
          Explore our curated collection of premium footwear
        </p>
        
        <div className={styles.grid}>
          {categories.map((category) => (
            <Link
              key={category.id}
              to={category.path}
              className={styles.category}
              style={{ '--accent-color': category.color }}
              aria-label={`Browse ${category.title}`}
            >
              <div className={styles.imageContainer}>
                <img
                  src={category.image}
                  alt=""
                  className={styles.image}
                  loading="lazy"
                />
                <div className={styles.overlay} />
              </div>
              <div className={styles.content}>
                <h3 className={styles.categoryTitle}>{category.title}</h3>
                <p className={styles.description}>{category.description}</p>
                <span className={styles.link}>
                  Shop Now
                  <ion-icon name="arrow-forward-outline" aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories; 