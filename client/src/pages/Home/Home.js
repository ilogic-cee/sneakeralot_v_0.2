import React from 'react';
import Hero from '../../components/home/Hero/Hero';
import FeaturedCategories from '../../components/home/FeaturedCategories/FeaturedCategories';
import FeaturedProducts from '../../components/home/FeaturedProducts/FeaturedProducts';
import SpecialOffers from '../../components/home/SpecialOffers/SpecialOffers';
import FeaturedBrands from '../../components/home/FeaturedBrands/FeaturedBrands';
import CustomerReviews from '../../components/home/CustomerReviews/CustomerReviews';
import Newsletter from '../../components/home/Newsletter/Newsletter';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.home}>
      <Hero />
      <FeaturedCategories />
      <FeaturedProducts />
      <SpecialOffers />
      <FeaturedBrands />
      <CustomerReviews />
      <Newsletter />
    </div>
  );
};

export default Home; 