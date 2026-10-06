import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';

export function Hero({ activeWatchId }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const watchImages = {
    'a-01': './images/watch-a01.jpg',
    'a-02': './images/watch-a02.jpg',
    'a-03': './images/watch-a03.jpg'
  };

  const currentImage = watchImages[activeWatchId] || watchImages['a-01'];

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden bg-[#050608] flex items-center justify-center">
      
      {/* Motion Photo Background with Parallax */}
      <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
        
        {/* Ambient Pulsing Gold Glow */}
        <div className="absolute w-[600px] h-[600px] rounded-full bg-amber-500/10 blur-[150px] animate-pulse" style={{ animationDuration: '4s' }} />

        {/* Hero Timepiece Motion Photo */}
        <motion.div
          animate={{
            x: mousePos.x,
            y: mousePos.y,
            rotateY: mousePos.x * 0.4,
            rotateX: -mousePos.y * 0.4
          }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          className="relative w-full max-w-2xl h-[72vh] flex items-center justify-center p-4"
        >
          <img
            src={currentImage}
            alt="Aurelio Inspired By The Impossible"
            className="h-full w-auto object-contain filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)] transition-all duration-700"
          />
        </motion.div>
      </div>

      {/* Atmospheric Vignette & Radial Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050608]/85 via-transparent to-[#050608] pointer-events-none z-10" />
      <div className="absolute inset-0 bg-radial from-transparent via-[#050608]/50 to-[#050608] pointer-events-none z-10" />

      {/* Jacob & Co Inspired Content Overlay */}
      <div className="relative z-20 max-w-6xl mx-auto px-6 text-center flex flex-col items-center justify-between h-full pt-32 pb-12 pointer-events-none">
        
        {/* Top Brand Tagline */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="space-y-1 pointer-events-auto"
        >
          <span className="font-mono text-xs md:text-sm tracking-[0.4em] text-amber-400 uppercase font-medium">
            GENÈVE • MANUFACTURE HORLOGÈRE
          </span>
        </motion.div>

        {/* Center Title Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="space-y-4 my-auto pointer-events-auto max-w-4xl"
        >
          <h1 className="text-4xl sm:text-7xl md:text-8xl font-serif font-light tracking-[0.2em] text-slate-100 uppercase drop-shadow-2xl leading-tight">
            INSPIRED BY THE IMPOSSIBLE<span className="text-amber-400 font-normal">.</span>
          </h1>
          <p className="font-sans text-sm sm:text-lg md:text-xl tracking-[0.4em] text-zinc-300 uppercase font-light">
            AURELIO™ — THE ARCHITECTURE OF TIME.
          </p>
          <p className="font-mono text-xs md:text-sm tracking-[0.2em] text-zinc-500 max-w-lg mx-auto">
            High horology grand complications engineered without compromise.
          </p>
        </motion.div>

        {/* Dual CTA Buttons (Jacob & Co Style) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-4 pointer-events-auto"
        >
          <button
            onClick={() => scrollToSection('collection')}
            data-cursor="ENTER"
            className="group relative inline-flex items-center space-x-3 px-8 py-4 rounded-full border border-amber-400/50 bg-amber-500/10 hover:bg-amber-400 text-amber-200 hover:text-black font-mono text-xs tracking-[0.25em] font-semibold transition-all duration-300 shadow-2xl backdrop-blur-md cursor-pointer"
          >
            <span>DISCOVER TIMEPIECES</span>
            <ArrowRight className="w-4 h-4 text-amber-400 group-hover:text-black group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => scrollToSection('sequence-experience')}
            data-cursor="ENTER"
            className="group relative inline-flex items-center space-x-3 px-8 py-4 rounded-full border border-zinc-800 bg-zinc-950/80 hover:bg-zinc-900 text-zinc-300 hover:text-white font-mono text-xs tracking-[0.25em] transition-all duration-300 shadow-2xl backdrop-blur-md cursor-pointer"
          >
            <span>EXPLORE MOVEMENT SEQUENCE</span>
            <ChevronDown className="w-4 h-4 text-zinc-400 group-hover:translate-y-1 transition-transform" />
          </button>
        </motion.div>

      </div>

    </section>
  );
}
