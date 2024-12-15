import React, { useState } from 'react';
import styles from './InstagramFeed.module.css';

const InstagramFeed = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Mock Instagram feed data (in a real app, this would come from Instagram's API)
  const instagramPosts = [
    {
      id: 1,
      imageUrl: '/assets/images/instagram/post1.jpg',
      likes: 1234,
      comments: 45,
      caption: 'Fresh kicks for the summer! 🌞 #SneakerGame #FreshKicks',
      username: '@sneakeralot'
    },
    {
      id: 2,
      imageUrl: '/assets/images/instagram/post2.jpg',
      likes: 2156,
      comments: 67,
      caption: 'Limited edition drop alert! 🚨 #Exclusive #MustHave',
      username: '@sneakeralot'
    },
    {
      id: 3,
      imageUrl: '/assets/images/instagram/post3.jpg',
      likes: 3789,
      comments: 89,
      caption: 'Streetwear essentials 👟 #StreetStyle #SneakerCulture',
      username: '@sneakeralot'
    },
    {
      id: 4,
      imageUrl: '/assets/images/instagram/post4.jpg',
      likes: 1567,
      comments: 34,
      caption: 'Classic never goes out of style 🔥 #Timeless #SneakerHead',
      username: '@sneakeralot'
    },
    {
      id: 5,
      imageUrl: '/assets/images/instagram/post5.jpg',
      likes: 2890,
      comments: 56,
      caption: 'New arrivals in store now! 🎉 #NewIn #SneakerNews',
      username: '@sneakeralot'
    },
    {
      id: 6,
      imageUrl: '/assets/images/instagram/post6.jpg',
      likes: 4123,
      comments: 78,
      caption: 'Weekend vibes 🌅 #WeekendMood #SneakerStyle',
      username: '@sneakeralot'
    }
  ];

  // Simulate loading state
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={styles.instagramFeed} aria-labelledby="instagram-feed-title">
      <div className={styles.container}>
        <header className={styles.sectionHeader}>
          <h2 id="instagram-feed-title" className={styles.title}>
            Follow Us on Instagram
          </h2>
          <p className={styles.subtitle}>
            @sneakeralot • Join our community of {(45.6).toFixed(1)}k followers
          </p>
          <a
            href="https://instagram.com/sneakeralot"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.followButton}
          >
            <ion-icon name="logo-instagram"></ion-icon>
            Follow Us
          </a>
        </header>

        <div className={styles.feedGrid} aria-live="polite">
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 6 }).map((_, index) => (
              <div key={`skeleton-${index}`} className={styles.skeleton}></div>
            ))
          ) : (
            // Actual Instagram posts
            instagramPosts.map((post) => (
              <article key={post.id} className={styles.post}>
                <div className={styles.imageContainer}>
                  <img
                    src={post.imageUrl}
                    alt={post.caption}
                    className={styles.image}
                    loading="lazy"
                  />
                  <div className={styles.overlay}>
                    <div className={styles.stats}>
                      <span className={styles.stat}>
                        <ion-icon name="heart"></ion-icon>
                        {post.likes.toLocaleString()}
                      </span>
                      <span className={styles.stat}>
                        <ion-icon name="chatbubble"></ion-icon>
                        {post.comments.toLocaleString()}
                      </span>
                    </div>
                    <p className={styles.caption}>{post.caption}</p>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        <footer className={styles.feedFooter}>
          <a
            href="https://instagram.com/sneakeralot"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.viewMoreButton}
          >
            View More on Instagram
            <ion-icon name="arrow-forward"></ion-icon>
          </a>
        </footer>
      </div>
    </section>
  );
};

export default InstagramFeed; 