import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SEQUENCE_STEPS } from '../data/sequenceSteps';
import { Layers, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';

export function ExplodedWatch({ activeWatchId, setActiveWatchId }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const containerRef = useRef();

  const currentStep = SEQUENCE_STEPS[currentStepIndex] || SEQUENCE_STEPS[0];

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      const totalH = containerRef.current.offsetHeight - windowH;

      if (totalH > 0) {
        const scrolled = -rect.top;
        const progress = Math.min(Math.max(scrolled / totalH, 0), 1);
        const index = Math.min(Math.floor(progress * SEQUENCE_STEPS.length), SEQUENCE_STEPS.length - 1);
        setCurrentStepIndex(index);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Motion Photo Visual Map per Step
  const getMotionVisual = (stepNumber) => {
    switch (stepNumber) {
      case 7:
        return {
          image: './images/exploded-components.jpg',
          scale: 1,
          translateY: 0,
          callouts: [
            { label: 'GRADE 5 MAINPLATE', x: '50%', y: '12%' },
            { label: 'TWIN BARREL ASSEMBLY', x: '28%', y: '36%' },
            { label: 'GEAR TRAIN WHEELS', x: '62%', y: '48%' },
            { label: 'SYNTHETIC RUBIES', x: '50%', y: '56%' },
            { label: 'FLYING TOURBILLON CAGE', x: '68%', y: '68%' },
            { label: 'EXHIBITION CASE BACK', x: '50%', y: '88%' }
          ]
        };
      case 10:
        return {
          image: './images/tourbillon-spotlight.jpg',
          scale: 1.15,
          translateY: 0,
          callouts: [
            { label: '60-SEC FLYING TOURBILLON', x: '48%', y: '50%' },
            { label: 'GOLD BALANCE POISING WEIGHTS', x: '62%', y: '28%' }
          ]
        };
      case 8:
      case 9:
      case 11:
        return {
          image: './images/movement-macro.jpg',
          scale: stepNumber === 11 ? 1.35 : 1.15,
          translateY: stepNumber === 11 ? -20 : 0,
          callouts: [
            { label: 'HAND-CHAMFERED ANGLAGE', x: '42%', y: '40%' },
            { label: 'FLAME-BLUED SCREW', x: '68%', y: '48%' }
          ]
        };
      case 6:
        return {
          image: './images/hero-watch.jpg',
          scale: 1.05,
          translateY: 0,
          callouts: [{ label: 'CALIBRE A-01 SKELETON', x: '50%', y: '50%' }]
        };
      case 2:
      case 3:
      case 4:
      case 5:
        return {
          image: './images/watch-a01.jpg',
          scale: 1.3 - (stepNumber - 2) * 0.05,
          translateY: -10 + (stepNumber - 2) * 5,
          callouts: [{ label: currentStep.title, x: '50%', y: '45%' }]
        };
      case 1:
      case 12:
      default:
        return {
          image: activeWatchId === 'a-02' ? './images/watch-a02.jpg' : activeWatchId === 'a-03' ? './images/watch-a03.jpg' : './images/watch-a01.jpg',
          scale: 1,
          translateY: 0,
          callouts: []
        };
    }
  };

  const visual = getMotionVisual(currentStep.step);

  return (
    <section
      id="sequence-experience"
      ref={containerRef}
      className="relative w-full bg-[#050608] border-t border-zinc-900"
      style={{ height: '450vh' }} // Guided motion photo scroll distance
    >
      {/* Sticky Motion Photo Stage */}
      <div className="sticky top-0 w-full h-screen flex flex-col justify-between p-6 md:p-12 overflow-hidden z-10">
        
        {/* Top Floating Header */}
        <div className="w-full flex justify-between items-start z-30 pointer-events-none">
          <div className="space-y-1">
            <span className="font-mono text-xs tracking-[0.3em] text-amber-400 uppercase font-semibold">
              MOTION EXHIBITION • {currentStep.number} / 12
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-slate-100 tracking-[0.2em] uppercase font-light">
              {currentStep.title}
            </h2>
          </div>

          <div className="hidden lg:block text-right font-mono text-xs text-zinc-500 tracking-widest uppercase">
            <div>CALIBRE A-01 HOROLOGY</div>
            <div className="text-amber-400/80">{currentStep.detail}</div>
          </div>
        </div>

        {/* Center Motion Stage Viewport */}
        <div className="absolute inset-0 z-10 flex items-center justify-center p-4">
          <div className="relative w-full max-w-5xl h-[75vh] flex items-center justify-center rounded-3xl overflow-hidden">
            
            {/* Background Ambient Radial Glow */}
            <div className="absolute w-[500px] h-[500px] rounded-full bg-amber-500/10 blur-[120px] pointer-events-none" />

            {/* Motion Image with Smooth Transition */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentStep.step}-${activeWatchId}`}
                initial={{ opacity: 0, scale: visual.scale * 0.95 }}
                animate={{ opacity: 1, scale: visual.scale, y: visual.translateY }}
                exit={{ opacity: 0, scale: visual.scale * 1.05 }}
                transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
                className="relative w-full h-full flex items-center justify-center"
              >
                <img
                  src={visual.image}
                  alt={currentStep.title}
                  className="max-h-full max-w-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
                />

                {/* Interactive Motion Annotation Pins */}
                {visual.callouts.map((pin, idx) => (
                  <motion.div
                    key={pin.label}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    style={{ top: pin.y, left: pin.x }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none hidden md:flex items-center space-x-2"
                  >
                    <span className="w-3 h-3 rounded-full bg-amber-400 ring-4 ring-amber-400/20 animate-pulse" />
                    <span className="px-3 py-1 rounded bg-zinc-950/90 border border-amber-400/40 font-mono text-[10px] text-slate-100 tracking-widest uppercase backdrop-blur-md whitespace-nowrap shadow-xl">
                      {pin.label}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

          </div>
        </div>

        {/* Step Card Overlay */}
        <div className="relative z-30 max-w-lg space-y-3 p-6 rounded-2xl bg-zinc-950/80 backdrop-blur-md border border-white/10 text-slate-200 pointer-events-auto shadow-2xl">
          <p className="font-sans text-sm md:text-base text-zinc-300 font-light leading-relaxed">
            "{currentStep.subtitle}"
          </p>

          {/* Quick step navigation bar */}
          <div className="flex items-center justify-between pt-3 border-t border-zinc-800/80 font-mono text-xs">
            <button
              onClick={() => setCurrentStepIndex(Math.max(0, currentStepIndex - 1))}
              disabled={currentStepIndex === 0}
              className="flex items-center space-x-1 text-zinc-400 hover:text-amber-300 disabled:opacity-30 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>PREV</span>
            </button>
            <span className="text-zinc-500 font-medium">{currentStepIndex + 1} OF 12</span>
            <button
              onClick={() => setCurrentStepIndex(Math.min(SEQUENCE_STEPS.length - 1, currentStepIndex + 1))}
              disabled={currentStepIndex === SEQUENCE_STEPS.length - 1}
              className="flex items-center space-x-1 text-zinc-400 hover:text-amber-300 disabled:opacity-30 cursor-pointer"
            >
              <span>NEXT</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Model Selector Bar */}
        <div className="relative z-30 w-full max-w-xl mx-auto flex items-center justify-center gap-2 p-2 rounded-xl bg-zinc-950/90 border border-zinc-800 backdrop-blur-md font-mono text-xs">
          {[
            { id: 'a-01', name: 'A-01 OBSIDIAN' },
            { id: 'a-02', name: 'A-02 AUREUM' },
            { id: 'a-03', name: 'A-03 NERO TOURBILLON' }
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => setActiveWatchId(m.id)}
              className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${
                activeWatchId === m.id
                  ? 'bg-amber-400 text-black font-semibold shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {m.name}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
