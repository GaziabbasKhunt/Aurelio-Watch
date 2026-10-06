import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check mobile / touch screen
    if (window.innerWidth < 768 || 'ontouchstart' in window) {
      setIsMobile(true);
      return;
    }

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check hovered elements for custom cursor attributes
      const target = e.target.closest('[data-cursor], button, a, input');
      if (target) {
        setIsHovered(true);
        const text = target.getAttribute('data-cursor');
        setCursorText(text || '');
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (isMobile || !isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Central Small Dot */}
      <motion.div
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          opacity: isHovered ? 0 : 1
        }}
        transition={{ type: 'spring', stiffness: 1000, damping: 50, mass: 0.1 }}
        className="w-2 h-2 rounded-full bg-amber-400"
      />

      {/* Expanding Outer Ring with Dynamic Text */}
      <motion.div
        animate={{
          x: position.x - (isHovered ? 40 : 16),
          y: position.y - (isHovered ? 40 : 16),
          width: isHovered ? 80 : 32,
          height: isHovered ? 80 : 32,
          borderColor: isHovered ? 'rgba(212, 175, 55, 0.8)' : 'rgba(255, 255, 255, 0.2)',
          backgroundColor: isHovered ? 'rgba(212, 175, 55, 0.1)' : 'transparent'
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
        className="absolute rounded-full border border-amber-400/40 flex items-center justify-center backdrop-blur-[1px]"
      >
        {cursorText && (
          <span className="font-mono text-[9px] tracking-[0.2em] text-amber-300 font-bold uppercase select-none">
            {cursorText}
          </span>
        )}
      </motion.div>
    </div>
  );
}
