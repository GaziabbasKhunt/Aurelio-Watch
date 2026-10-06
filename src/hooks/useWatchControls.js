import { useState, useCallback } from 'react';

export function useWatchControls() {
  const [explodedMode, setExplodedMode] = useState(false);
  const [explodedProgress, setExplodedProgress] = useState(0);
  const [activeWatchId, setActiveWatchId] = useState('a-01');
  const [autoRotate, setAutoRotate] = useState(true);
  const [resetCount, setResetCount] = useState(0);

  const toggleExploded = useCallback(() => {
    setExplodedMode(prev => {
      const next = !prev;
      setExplodedProgress(next ? 1 : 0);
      return next;
    });
  }, []);

  const resetView = useCallback(() => {
    setExplodedMode(false);
    setExplodedProgress(0);
    setAutoRotate(true);
    setResetCount(prev => prev + 1);
  }, []);

  return {
    explodedMode,
    explodedProgress,
    setExplodedProgress,
    toggleExploded,
    activeWatchId,
    setActiveWatchId,
    autoRotate,
    setAutoRotate,
    resetView,
    resetCount
  };
}
