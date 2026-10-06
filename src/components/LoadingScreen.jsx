import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const duration = 2200; // Fast & responsive (approx 2s)
    const intervalTime = 30;
    const steps = duration / intervalTime;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsDone(true);
            setTimeout(() => {
              if (onComplete) onComplete();
            }, 800);
          }, 400);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.9, ease: [0.65, 0, 0.35, 1] } }}
          className="fixed inset-0 z-[9999] bg-[#050608] flex flex-col items-center justify-between p-8 md:p-16 select-none font-serif"
        >
          <div className="w-full flex justify-between items-center text-xs tracking-[0.3em] font-mono text-zinc-500 uppercase">
            <span>HORLOGERIE D'AVANT-GARDE</span>
            <span>GENÈVE, SUISSE</span>
          </div>

          <div className="flex flex-col items-center text-center space-y-6 max-w-xl">
            {/* Ticking Mechanical Gear Ring */}
            <div className="relative w-24 h-24 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-amber-500/20 border-t-amber-400 animate-spin" style={{ animationDuration: '3s' }} />
              <div className="absolute inset-2 rounded-full border border-dashed border-zinc-700 animate-spin" style={{ animationDuration: '6s', animationDirection: 'reverse' }} />
              <span className="font-mono text-xs tracking-widest text-amber-400/90 font-semibold">
                {Math.floor(progress).toString().padStart(2, '0')}
              </span>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl md:text-5xl tracking-[0.3em] font-light text-slate-100 uppercase">
                AURELIO<span className="text-amber-400 font-normal">™</span>
              </h1>
              <p className="text-xs md:text-sm font-sans tracking-[0.4em] text-zinc-400 uppercase">
                THE ARCHITECTURE OF TIME.
              </p>
            </div>

            <div className="w-48 bg-zinc-900 h-[2px] rounded-full overflow-hidden relative">
              <div
                className="bg-amber-400 h-full transition-all ease-out duration-75"
                style={{ width: `${progress}%` }}
              />
            </div>

            <span className="font-mono text-[11px] tracking-[0.2em] text-zinc-500 uppercase">
              Loading mechanical system...
            </span>
          </div>

          <div className="text-[10px] font-mono tracking-[0.2em] text-zinc-600 uppercase">
            CALIBRE A-01 / SKELETON TOURBILLON
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
