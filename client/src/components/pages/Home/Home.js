import React from 'react';
import Hero from '../../layout/Hero/Hero';
import BenefitsBar from '../../layout/BenefitsBar/BenefitsBar';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.home}>
      <Hero />
      <BenefitsBar />
    </div>
  );
};

export default Home; 