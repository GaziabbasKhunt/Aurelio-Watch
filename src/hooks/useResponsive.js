import { useState, useEffect } from 'react';

export function useResponsive() {
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    isMobile: typeof window !== 'undefined' ? window.innerWidth < 768 : false,
    isTablet: typeof window !== 'undefined' ? window.innerWidth >= 768 && window.innerWidth < 1024 : false,
    isDesktop: typeof window !== 'undefined' ? window.innerWidth >= 1024 : true,
    pixelRatio: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1
  });

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      setDimensions({
        width: w,
        isMobile: w < 768,
        isTablet: w >= 768 && w < 1024,
        isDesktop: w >= 1024,
        pixelRatio: Math.min(window.devicePixelRatio, w < 768 ? 1.5 : 2)
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return dimensions;
}
