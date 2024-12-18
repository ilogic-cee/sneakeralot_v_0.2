import { useState, useCallback } from 'react';

const VELOCITY_THRESHOLD = 0.5; // Minimum velocity to trigger swipe
const DISTANCE_THRESHOLD = 50; // Minimum distance to trigger swipe
const TIME_THRESHOLD = 300; // Maximum time for a swipe gesture

export const useSwipeGesture = ({ onSwipeLeft, onSwipeRight }) => {
  const [touchStart, setTouchStart] = useState({ x: 0, time: 0 });
  const [touchEnd, setTouchEnd] = useState({ x: 0, time: 0 });
  const [isSwiping, setIsSwiping] = useState(false);

  const handleTouchStart = useCallback((e) => {
    setTouchStart({
      x: e.touches[0].clientX,
      time: Date.now()
    });
    setIsSwiping(true);
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!isSwiping) return;

    setTouchEnd({
      x: e.touches[0].clientX,
      time: Date.now()
    });
  }, [isSwiping]);

  const handleTouchEnd = useCallback(() => {
    if (!isSwiping) return;

    const distance = touchStart.x - touchEnd.x;
    const time = touchEnd.time - touchStart.time;
    const velocity = Math.abs(distance / time);

    if (time <= TIME_THRESHOLD && velocity >= VELOCITY_THRESHOLD) {
      if (distance > DISTANCE_THRESHOLD) {
        onSwipeLeft?.();
      } else if (distance < -DISTANCE_THRESHOLD) {
        onSwipeRight?.();
      }
    }

    setIsSwiping(false);
    setTouchStart({ x: 0, time: 0 });
    setTouchEnd({ x: 0, time: 0 });
  }, [isSwiping, touchStart, touchEnd, onSwipeLeft, onSwipeRight]);

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    isSwiping
  };
}; 