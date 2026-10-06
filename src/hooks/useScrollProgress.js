import { useState, useEffect } from 'react';

export function useScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) return;

      const currentScroll = window.scrollY;
      const progress = Math.min(Math.max(currentScroll / totalScroll, 0), 1);
      
      setScrollProgress(progress);
      setIsScrolled(currentScroll > 60);

      // Compute step index based on sequence section element if present
      const sequenceContainer = document.getElementById('sequence-experience');
      if (sequenceContainer) {
        const rect = sequenceContainer.getBoundingClientRect();
        const containerHeight = sequenceContainer.offsetHeight - window.innerHeight;
        if (containerHeight > 0) {
          const containerProgress = Math.min(Math.max(-rect.top / containerHeight, 0), 1);
          const step = Math.min(Math.floor(containerProgress * 12), 11);
          setActiveStepIndex(step);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { scrollProgress, activeStepIndex, isScrolled };
}
