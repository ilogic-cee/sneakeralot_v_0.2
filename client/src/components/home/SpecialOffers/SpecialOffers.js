import React from 'react';
import { Link } from 'react-router-dom';
import styles from './SpecialOffers.module.css';

const offers = [
  {
    id: 1,
    title: "Summer Sale",
    description: "Up to 50% off on selected items",
    image: "/assets/images/offers/summer-sale.jpg",
    path: "/sale/summer",
    color: "#e74c3c",
    endDate: "2024-08-31"
  },
  {
    id: 2,
    title: "New Customer Special",
    description: "Get 10% off your first purchase",
    image: "/assets/images/offers/new-customer.jpg",
    path: "/offers/new-customer",
    color: "#2ecc71",
    code: "WELCOME10"
  },
  {
    id: 3,
    title: "Free Shipping",
    description: "On orders over $100",
    image: "/assets/images/offers/free-shipping.jpg",
    path: "/offers/free-shipping",
    color: "#3498db",
    minAmount: 100
  }
];

const SpecialOffers = () => {
  const getTimeRemaining = (endDate) => {
    const total = Date.parse(endDate) - Date.parse(new Date());
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    return days > 0 ? `${days} days remaining` : 'Ending soon';
  };

  return (
    <section className={styles.specialOffers} aria-labelledby="special-offers-title">
      <div className={styles.container}>
        <h2 id="special-offers-title" className={styles.title}>
          Special Offers
        </h2>
        <p className={styles.subtitle}>
          Don't miss out on these amazing deals
        </p>

        <div className={styles.grid}>
          {offers.map((offer) => (
            <Link
              key={offer.id}
              to={offer.path}
              className={styles.offer}
              style={{ '--accent-color': offer.color }}
              aria-label={`View details for ${offer.title}`}
            >
              <div className={styles.imageContainer}>
                <img
                  src={offer.image}
                  alt=""
                  className={styles.image}
                  loading="lazy"
                />
                <div className={styles.overlay} />
              </div>

              <div className={styles.content}>
                <h3 className={styles.offerTitle}>{offer.title}</h3>
                <p className={styles.description}>{offer.description}</p>
                
                <div className={styles.details}>
                  {offer.endDate && (
                    <span className={styles.timeRemaining}>
                      <ion-icon name="time-outline" aria-hidden="true" />
                      {getTimeRemaining(offer.endDate)}
                    </span>
                  )}
                  {offer.code && (
                    <div className={styles.promoCode}>
                      <span className={styles.label}>Use code:</span>
                      <code className={styles.code}>{offer.code}</code>
                    </div>
                  )}
                  {offer.minAmount && (
                    <span className={styles.minimum}>
                      <ion-icon name="cart-outline" aria-hidden="true" />
                      Min. order ${offer.minAmount}
                    </span>
                  )}
                </div>

                <span className={styles.link}>
                  Shop Now
                  <ion-icon name="arrow-forward-outline" aria-hidden="true" />
                </span>
              </div>

              <div className={styles.badge}>
                <ion-icon 
                  name={
                    offer.endDate ? "flash-outline" : 
                    offer.code ? "gift-outline" : "airplane-outline"
                  }
                  aria-hidden="true"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers; 