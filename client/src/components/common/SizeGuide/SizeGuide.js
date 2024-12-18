import React, { useState } from 'react';
import styles from './SizeGuide.module.css';
import FootMeasurementDiagram from './components/FootMeasurementDiagram';
import FootShapeAnalysis from './components/FootShapeAnalysis';

// Size conversion data
const sizeConversions = {
  mens: {
    us: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '13', '14'],
    uk: ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '12', '13'],
    eu: ['40', '40.5', '41', '41.5', '42', '42.5', '43', '43.5', '44', '44.5', '45', '46', '47']
  },
  womens: {
    us: ['5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5'],
    uk: ['3.5', '4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5'],
    eu: ['36', '36.5', '37', '37.5', '38', '38.5', '39', '39.5', '40', '40.5', '41', '41.5', '42']
  }
};

// Brand-specific fit recommendations
const brandFitGuide = {
  nike: {
    running: 'Nike running shoes typically run small. We recommend going up 0.5 size.',
    casual: 'Nike casual shoes are generally true to size.',
    basketball: 'Nike basketball shoes have a snug fit. Consider going up 0.5 size for wide feet.'
  },
  adidas: {
    running: 'Adidas running shoes are true to size for most people.',
    casual: 'Adidas casual shoes may run large. Consider going down 0.5 size.',
    basketball: 'Adidas basketball shoes are true to size with a roomy toe box.'
  },
  jordan: {
    casual: 'Air Jordans generally run true to size but may feel snug initially.',
    basketball: 'For basketball, stick to your true size for optimal performance.'
  },
  newBalance: {
    running: 'New Balance offers wider options. True to size with good width variety.',
    casual: 'New Balance casual shoes provide a roomy fit. Consider your usual size.'
  }
};

const measurementSteps = [
  {
    title: 'Prepare',
    instruction: 'Measure your feet in the afternoon/evening as feet tend to swell throughout the day.',
    icon: 'time-outline'
  },
  {
    title: 'Position',
    instruction: 'Stand straight on a piece of paper with your heel against a wall.',
    icon: 'footsteps-outline'
  },
  {
    title: 'Mark',
    instruction: 'Mark the tip of your longest toe and the back of your heel.',
    icon: 'pencil-outline'
  },
  {
    title: 'Measure',
    instruction: 'Measure the distance between marks in centimeters.',
    icon: 'ruler-outline'
  },
  {
    title: 'Width',
    instruction: 'Measure the widest part of your foot for width sizing.',
    icon: 'resize-outline'
  }
];

const SizeGuide = ({ brand = '', category = '', onClose }) => {
  const [gender, setGender] = useState('mens');
  const [activeTab, setActiveTab] = useState('chart');
  const [selectedSize, setSelectedSize] = useState(null);
  const [measurementUnit, setMeasurementUnit] = useState('cm');

  // Get brand-specific recommendations
  const getBrandRecommendation = () => {
    if (!brand || !category) return null;
    return brandFitGuide[brand.toLowerCase()]?.[category.toLowerCase()];
  };

  // Convert size to different unit
  const convertSize = (size, fromUnit, toUnit) => {
    if (fromUnit === toUnit) return size;
    if (fromUnit === 'cm' && toUnit === 'in') return (size * 0.393701).toFixed(2);
    if (fromUnit === 'in' && toUnit === 'cm') return (size * 2.54).toFixed(1);
    return size;
  };

  return (
    <div className={styles.sizeGuide}>
      <div className={styles.header}>
        <h2 className={styles.title}>Size Guide</h2>
        <button 
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close size guide"
        >
          <ion-icon name="close-outline" />
        </button>
      </div>

      {/* Gender Selection */}
      <div className={styles.genderSelector}>
        <button
          className={`${styles.genderButton} ${gender === 'mens' ? styles.active : ''}`}
          onClick={() => setGender('mens')}
        >
          <ion-icon name="man-outline" />
          Men's
        </button>
        <button
          className={`${styles.genderButton} ${gender === 'womens' ? styles.active : ''}`}
          onClick={() => setGender('womens')}
        >
          <ion-icon name="woman-outline" />
          Women's
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'chart' ? styles.active : ''}`}
          onClick={() => setActiveTab('chart')}
        >
          Size Chart
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'measure' ? styles.active : ''}`}
          onClick={() => setActiveTab('measure')}
        >
          How to Measure
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'analysis' ? styles.active : ''}`}
          onClick={() => setActiveTab('analysis')}
        >
          Foot Analysis
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'tips' ? styles.active : ''}`}
          onClick={() => setActiveTab('tips')}
        >
          Fit Tips
        </button>
      </div>

      {/* Content Area */}
      <div className={styles.content}>
        {activeTab === 'chart' && (
          <div className={styles.sizeChart}>
            <div className={styles.unitToggle}>
              <button
                className={`${styles.unitButton} ${measurementUnit === 'cm' ? styles.active : ''}`}
                onClick={() => setMeasurementUnit('cm')}
              >
                cm
              </button>
              <button
                className={`${styles.unitButton} ${measurementUnit === 'in' ? styles.active : ''}`}
                onClick={() => setMeasurementUnit('in')}
              >
                inches
              </button>
            </div>

            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>US</th>
                    <th>UK</th>
                    <th>EU</th>
                    <th>{measurementUnit.toUpperCase()}</th>
                  </tr>
                </thead>
                <tbody>
                  {sizeConversions[gender].us.map((size, index) => {
                    const footLength = gender === 'mens' 
                      ? 24 + (index * 0.5) 
                      : 22 + (index * 0.5);
                    
                    return (
                      <tr
                        key={size}
                        className={selectedSize === size ? styles.selected : ''}
                        onClick={() => setSelectedSize(size)}
                      >
                        <td>{size}</td>
                        <td>{sizeConversions[gender].uk[index]}</td>
                        <td>{sizeConversions[gender].eu[index]}</td>
                        <td>
                          {convertSize(footLength, 'cm', measurementUnit)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'measure' && (
          <div className={styles.measurementGuide}>
            <FootMeasurementDiagram />
          </div>
        )}

        {activeTab === 'analysis' && (
          <div className={styles.footAnalysis}>
            <FootShapeAnalysis />
          </div>
        )}

        {activeTab === 'tips' && (
          <div className={styles.fitTips}>
            {getBrandRecommendation() ? (
              <div className={styles.brandTip}>
                <h3>{brand} {category} Fit Guide:</h3>
                <p>{getBrandRecommendation()}</p>
              </div>
            ) : (
              <div className={styles.generalTips}>
                <h3>General Fit Guidelines:</h3>
                <ul>
                  <li>
                    <ion-icon name="checkmark-circle-outline" />
                    Your toes should have enough room to wiggle
                  </li>
                  <li>
                    <ion-icon name="checkmark-circle-outline" />
                    Heel should be snug but not tight
                  </li>
                  <li>
                    <ion-icon name="checkmark-circle-outline" />
                    Try shoes on in the afternoon
                  </li>
                  <li>
                    <ion-icon name="checkmark-circle-outline" />
                    Consider your usual activity level
                  </li>
                </ul>
                <div className={styles.widthGuide}>
                  <h4>Width Guide:</h4>
                  <div className={styles.widthTypes}>
                    <span>Narrow (A)</span>
                    <span>Standard (D)</span>
                    <span>Wide (2E)</span>
                    <span>Extra Wide (4E)</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SizeGuide; 