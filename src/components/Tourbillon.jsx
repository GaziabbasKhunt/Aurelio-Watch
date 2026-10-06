import React from 'react';
import { motion } from 'framer-motion';

export function Tourbillon() {
  const annotations = [
    { label: 'WEIGHT', value: '0.28 GRAMS' },
    { label: 'ROTATION', value: '60 SECONDS' },
    { label: 'MATERIAL', value: 'TITANIUM GRADE 5' },
    { label: 'COMPENSATION', value: 'GRAVITATIONAL ANOMALY' }
  ];

  return (
    <section id="tourbillon" className="relative w-full min-h-screen bg-[#030304] text-slate-100 flex flex-col justify-between p-8 md:p-16 overflow-hidden border-t border-zinc-900">
      
      {/* Background Volumetric Dark Lighting Radial */}
      <div className="absolute inset-0 bg-radial from-amber-500/15 via-transparent to-transparent pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4 pt-12">
        <span className="font-mono text-xs tracking-[0.4em] text-amber-400 uppercase font-semibold">
          HOROLOGICAL CROWN JEWEL
        </span>
        <h2 className="text-4xl md:text-7xl font-serif tracking-[0.3em] font-light uppercase text-slate-100 drop-shadow-2xl">
          THE HEART OF TIME.
        </h2>
        <p className="font-sans text-base md:text-xl tracking-[0.4em] text-zinc-400 font-light uppercase">
          A CHOREOGRAPHY OF PRECISION.
        </p>
      </div>

      {/* Center Motion Tourbillon Spotlight Viewport */}
      <div className="relative z-10 w-full max-w-5xl mx-auto h-[480px] my-8 flex items-center justify-center rounded-3xl overflow-hidden border border-zinc-900 bg-zinc-950/60 shadow-2xl group">
        
        {/* Motion Tourbillon Image */}
        <motion.img
          initial={{ scale: 1.1, opacity: 0.8 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
          src="./images/tourbillon-spotlight.jpg"
          alt="60-Second Flying Tourbillon Spotlight"
          className="w-full h-full object-cover filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] transition-transform duration-1000 group-hover:scale-105"
        />

        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030304] via-transparent to-[#030304]/80 pointer-events-none" />

        {/* Pulse Pin */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center space-x-3">
          <span className="w-3.5 h-3.5 rounded-full bg-amber-400 ring-4 ring-amber-400/30 animate-pulse" />
          <span className="px-4 py-1.5 rounded-full bg-zinc-950/90 border border-amber-400/50 font-mono text-xs text-amber-300 tracking-[0.2em] uppercase backdrop-blur-md">
            60-SECOND TITANIUM FLYING TOURBILLON
          </span>
        </div>
      </div>

      {/* Technical Annotations Footer */}
      <div className="relative z-10 max-w-5xl mx-auto w-full grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 backdrop-blur-md">
        {annotations.map((ann) => (
          <div key={ann.label} className="text-center space-y-1">
            <span className="font-mono text-[10px] tracking-[0.25em] text-zinc-500 uppercase block">
              {ann.label}
            </span>
            <span className="font-serif text-lg md:text-xl tracking-widest text-amber-300 font-light block">
              {ann.value}
            </span>
          </div>
        ))}
      </div>

    </section>
  );
}
