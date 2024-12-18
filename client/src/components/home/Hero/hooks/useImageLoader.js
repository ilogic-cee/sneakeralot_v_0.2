import { useState, useCallback } from 'react';

const RETRY_DELAYS = [2000, 4000, 8000]; // Exponential backoff delays
const QUALITY_LEVELS = ['low', 'medium', 'high'];

export const useImageLoader = () => {
  const [loadedImages, setLoadedImages] = useState(new Map());
  const [errorImages, setErrorImages] = useState(new Map());
  const [retryCount, setRetryCount] = useState(new Map());

  const loadImageProgressively = useCallback(async (imageUrl, onProgress) => {
    if (loadedImages.has(imageUrl)) {
      return loadedImages.get(imageUrl);
    }

    for (const quality of QUALITY_LEVELS) {
      try {
        const url = new URL(imageUrl, window.location.origin);
        url.searchParams.set('quality', quality);
        
        const img = new Image();
        const loadPromise = new Promise((resolve, reject) => {
          img.onload = () => resolve(img);
          img.onerror = reject;
        });

        img.src = url.toString();
        await loadPromise;

        onProgress?.(quality);
        
        if (quality === 'high') {
          setLoadedImages(prev => new Map(prev).set(imageUrl, img));
          setErrorImages(prev => {
            const newMap = new Map(prev);
            newMap.delete(imageUrl);
            return newMap;
          });
        }
      } catch (error) {
        console.error(`Failed to load image at quality ${quality}:`, error);
        if (quality === 'high') {
          handleImageError(imageUrl);
        }
      }
    }
  }, [loadedImages]);

  const handleImageError = useCallback((imageUrl) => {
    const currentRetries = retryCount.get(imageUrl) || 0;
    
    if (currentRetries < RETRY_DELAYS.length) {
      setRetryCount(prev => new Map(prev).set(imageUrl, currentRetries + 1));
      setErrorImages(prev => new Map(prev).set(imageUrl, {
        retryCount: currentRetries + 1,
        nextRetry: Date.now() + RETRY_DELAYS[currentRetries]
      }));

      // Schedule retry
      setTimeout(() => {
        loadImageProgressively(imageUrl, () => {});
      }, RETRY_DELAYS[currentRetries]);
    } else {
      setErrorImages(prev => new Map(prev).set(imageUrl, {
        retryCount: currentRetries,
        failed: true
      }));
    }
  }, [retryCount, loadImageProgressively]);

  const resetImageError = useCallback((imageUrl) => {
    setRetryCount(prev => {
      const newMap = new Map(prev);
      newMap.delete(imageUrl);
      return newMap;
    });
    setErrorImages(prev => {
      const newMap = new Map(prev);
      newMap.delete(imageUrl);
      return newMap;
    });
    loadImageProgressively(imageUrl, () => {});
  }, [loadImageProgressively]);

  return {
    loadImage: loadImageProgressively,
    resetError: resetImageError,
    getImageError: (imageUrl) => errorImages.get(imageUrl),
    isImageLoaded: (imageUrl) => loadedImages.has(imageUrl),
    getLoadedImage: (imageUrl) => loadedImages.get(imageUrl)
  };
}; 