import React, { useState } from 'react';
import styles from './FootShapeAnalysis.module.css';

const archTypes = [
  {
    id: 'low',
    name: 'Low Arch (Flat Feet)',
    description: 'Your foot has minimal arch height, making full contact with the ground.',
    characteristics: [
      'Prone to overpronation',
      'May experience inner ankle strain',
      'Feet may tire easily'
    ],
    recommendations: [
      'Shoes with motion control',
      'Strong arch support',
      'Structured cushioning'
    ],
    image: '/assets/images/arch-types/low-arch.png'
  },
  {
    id: 'medium',
    name: 'Medium Arch (Normal)',
    description: 'Your foot has a balanced arch height with normal pronation.',
    characteristics: [
      'Natural pronation',
      'Even weight distribution',
      'Good shock absorption'
    ],
    recommendations: [
      'Neutral running shoes',
      'Moderate cushioning',
      'Flexible soles'
    ],
    image: '/assets/images/arch-types/medium-arch.png'
  },
  {
    id: 'high',
    name: 'High Arch (Supinated)',
    description: 'Your foot has an elevated arch with minimal ground contact.',
    characteristics: [
      'Tends to supinate',
      'Limited shock absorption',
      'May experience outer ankle strain'
    ],
    recommendations: [
      'Cushioned shoes',
      'Flexible midsoles',
      'Wide toe boxes'
    ],
    image: '/assets/images/arch-types/high-arch.png'
  }
];

const footShapes = [
  {
    id: 'egyptian',
    name: 'Egyptian',
    description: 'Big toe is longest, other toes angle downward',
    recommendations: [
      'Pointed toe shoes may be comfortable',
      'Look for gradual toe tapering',
      'Ensure enough toe box length'
    ]
  },
  {
    id: 'roman',
    name: 'Roman',
    description: 'First three toes are similar length',
    recommendations: [
      'Square toe boxes work well',
      'Medium-width shoes ideal',
      'Even toe box space distribution'
    ]
  },
  {
    id: 'greek',
    name: 'Greek',
    description: 'Second toe is longest',
    recommendations: [
      'Avoid pointed toe boxes',
      'Look for higher toe boxes',
      'Consider wide-toe options'
    ]
  }
];

const FootShapeAnalysis = () => {
  const [selectedArch, setSelectedArch] = useState(null);
  const [selectedShape, setSelectedShape] = useState(null);

  return (
    <div className={styles.analysisContainer}>
      {/* Arch Type Analysis */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Arch Type Analysis</h3>
        <div className={styles.archTypes}>
          {archTypes.map(arch => (
            <div
              key={arch.id}
              className={`${styles.archType} ${selectedArch === arch.id ? styles.selected : ''}`}
              onClick={() => setSelectedArch(arch.id)}
            >
              <div className={styles.archImage}>
                <img src={arch.image} alt={arch.name} />
                <div className={styles.archOverlay} />
              </div>
              <h4>{arch.name}</h4>
              <p>{arch.description}</p>
              
              {selectedArch === arch.id && (
                <div className={styles.archDetails}>
                  <div className={styles.detailSection}>
                    <h5>Characteristics:</h5>
                    <ul>
                      {arch.characteristics.map((item, index) => (
                        <li key={index}>
                          <ion-icon name="checkmark-circle-outline" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className={styles.detailSection}>
                    <h5>Recommendations:</h5>
                    <ul>
                      {arch.recommendations.map((item, index) => (
                        <li key={index}>
                          <ion-icon name="star-outline" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Foot Shape Analysis */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Foot Shape Analysis</h3>
        <div className={styles.footShapes}>
          {footShapes.map(shape => (
            <div
              key={shape.id}
              className={`${styles.footShape} ${selectedShape === shape.id ? styles.selected : ''}`}
              onClick={() => setSelectedShape(shape.id)}
            >
              <div className={styles.shapeIcon}>
                <ion-icon name={`foot-${shape.id}-outline`} />
              </div>
              <div className={styles.shapeContent}>
                <h4>{shape.name}</h4>
                <p>{shape.description}</p>
                
                {selectedShape === shape.id && (
                  <div className={styles.shapeRecommendations}>
                    <h5>Recommendations:</h5>
                    <ul>
                      {shape.recommendations.map((item, index) => (
                        <li key={index}>
                          <ion-icon name="checkmark-circle-outline" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Analysis Summary */}
      {(selectedArch || selectedShape) && (
        <section className={styles.summary}>
          <h3>Your Personalized Fit Summary</h3>
          <div className={styles.summaryContent}>
            {selectedArch && (
              <div className={styles.summarySection}>
                <h4>Arch Type:</h4>
                <p>{archTypes.find(a => a.id === selectedArch).name}</p>
              </div>
            )}
            {selectedShape && (
              <div className={styles.summarySection}>
                <h4>Foot Shape:</h4>
                <p>{footShapes.find(s => s.id === selectedShape).name}</p>
              </div>
            )}
            <button 
              className={styles.resetButton}
              onClick={() => {
                setSelectedArch(null);
                setSelectedShape(null);
              }}
            >
              Reset Analysis
              <ion-icon name="refresh-outline" />
            </button>
          </div>
        </section>
      )}
    </div>
  );
};

export default FootShapeAnalysis; 