import React from 'react';
import styles from '../Hero.module.css';

const ZoomControls = ({ onZoomIn, onZoomOut, onReset, zoomLevel, isZoomed }) => {
  return (
    <div className={styles.zoomControl}>
      <button
        className={styles.zoomButton}
        onClick={onZoomIn}
        disabled={zoomLevel >= 3}
        aria-label="Zoom in"
      >
        <ion-icon name="add-outline"></ion-icon>
      </button>
      <button
        className={styles.zoomButton}
        onClick={onZoomOut}
        disabled={zoomLevel <= 1}
        aria-label="Zoom out"
      >
        <ion-icon name="remove-outline"></ion-icon>
      </button>
      {isZoomed && (
        <button
          className={styles.zoomButton}
          onClick={onReset}
          aria-label="Reset zoom"
        >
          <ion-icon name="refresh-outline"></ion-icon>
        </button>
      )}
    </div>
  );
};

export default React.memo(ZoomControls); 