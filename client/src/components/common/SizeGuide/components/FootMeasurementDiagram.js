import React, { useState } from 'react';
import styles from './FootMeasurementDiagram.module.css';

const measurementPoints = [
  {
    id: 'length',
    title: 'Foot Length',
    description: 'Measure from heel to longest toe',
    position: { top: '50%', left: '50%' },
    line: { x1: '20%', y1: '50%', x2: '80%', y2: '50%' }
  },
  {
    id: 'width',
    title: 'Foot Width',
    description: 'Measure across the widest part',
    position: { top: '40%', left: '60%' },
    line: { x1: '45%', y1: '40%', x2: '75%', y2: '40%' }
  },
  {
    id: 'arch',
    title: 'Arch Height',
    description: 'Note your arch type for better fit',
    position: { top: '60%', left: '45%' }
  },
  {
    id: 'instep',
    title: 'Instep Height',
    description: 'Measure the height at midfoot',
    position: { top: '30%', left: '45%' }
  }
];

const FootMeasurementDiagram = () => {
  const [activePoint, setActivePoint] = useState(null);
  const [showAllPoints, setShowAllPoints] = useState(false);

  return (
    <div className={styles.diagramContainer}>
      <div className={styles.controls}>
        <button
          className={styles.toggleButton}
          onClick={() => setShowAllPoints(!showAllPoints)}
        >
          {showAllPoints ? 'Hide' : 'Show'} All Points
          <ion-icon name={showAllPoints ? 'eye-off-outline' : 'eye-outline'} />
        </button>
      </div>

      <div className={styles.diagram}>
        {/* Main foot outline SVG */}
        <svg
          viewBox="0 0 400 600"
          className={styles.footOutline}
        >
          <path
            d="M100,500 C100,400 150,300 200,200 C250,100 300,50 350,100 C400,150 400,300 350,400 C300,500 200,550 150,500 C100,450 100,500 100,500 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          
          {/* Measurement lines */}
          {(showAllPoints || activePoint) && measurementPoints.map(point => (
            point.line && (
              <g key={`line-${point.id}`} className={styles.measurementLine}>
                <line
                  x1={point.line.x1}
                  y1={point.line.y1}
                  x2={point.line.x2}
                  y2={point.line.y2}
                  stroke={activePoint === point.id ? 'var(--color-primary)' : 'currentColor'}
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
                <circle
                  cx={point.line.x1}
                  cy={point.line.y1}
                  r="4"
                  fill={activePoint === point.id ? 'var(--color-primary)' : 'currentColor'}
                />
                <circle
                  cx={point.line.x2}
                  cy={point.line.y2}
                  r="4"
                  fill={activePoint === point.id ? 'var(--color-primary)' : 'currentColor'}
                />
              </g>
            )
          ))}
        </svg>

        {/* Measurement points */}
        {measurementPoints.map(point => (
          <div
            key={point.id}
            className={`${styles.measurementPoint} ${activePoint === point.id ? styles.active : ''} ${showAllPoints ? styles.visible : ''}`}
            style={{
              top: point.position.top,
              left: point.position.left
            }}
            onMouseEnter={() => setActivePoint(point.id)}
            onMouseLeave={() => setActivePoint(null)}
          >
            <div className={styles.pointMarker}>
              <ion-icon name="radio-button-on" />
            </div>
            <div className={styles.tooltip}>
              <h4>{point.title}</h4>
              <p>{point.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <span className={styles.legendMarker} />
          <span>Measurement Point</span>
        </div>
        <div className={styles.legendItem}>
          <span className={styles.legendLine} />
          <span>Measurement Line</span>
        </div>
      </div>

      <div className={styles.instructions}>
        <p>Hover over measurement points for detailed instructions</p>
        <p>Use the toggle button to show/hide all measurement points</p>
      </div>
    </div>
  );
};

export default FootMeasurementDiagram; 