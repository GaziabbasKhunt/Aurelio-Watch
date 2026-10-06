import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function MacroSection() {
  const [activeHotspot, setActiveHotspot] = useState(0);

  const hotspots = [
    {
      id: 0,
      x: '38%',
      y: '45%',
      title: 'JEWEL BEARING',
      desc: 'Synthetic ruby jewel bearing counter-sunk with diamond-polished sink bevels to eliminate friction on main arbor pivots.'
    },
    {
      id: 1,
      x: '64%',
      y: '52%',
      title: 'BLUED STEEL SCREW',
      desc: 'Thermally blued steel screw heads hand-polished to a mirror mirror-finish before flame-bluing at 300°C.'
    },
    {
      id: 2,
      x: '52%',
      y: '28%',
      title: 'POLISHED BEVEL (ANGLAGE)',
      desc: 'Hand-chamfered bridge edges featuring internal 45-degree angles hand-burnished with gentian wood sticks.'
    },
    {
      id: 3,
      x: '25%',
      y: '68%',
      title: 'PRECISION GEAR TEETH',
      desc: 'Involute profile gear teeth wire-EDM cut to sub-micron accuracy for flawless torque transmission.'
    }
  ];

  return (
    <section id="macro" className="relative w-full py-28 bg-[#050608] text-slate-100 border-t border-zinc-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-16">
          <span className="font-mono text-xs tracking-[0.4em] text-amber-400 uppercase font-semibold">
            SUB-MICRON METROLOGY
          </span>
          <h2 className="text-4xl md:text-6xl font-serif tracking-[0.25em] font-light uppercase">
            MACRO ARCHITECTURE
          </h2>
          <p className="font-sans text-sm md:text-base text-zinc-400 max-w-xl mx-auto tracking-widest font-light">
            Every surface finished by hand under 20x magnification.
          </p>
        </div>

        {/* Interactive Macro Canvas Viewport */}
        <div className="relative w-full h-[520px] rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-950 shadow-2xl">
          {/* Background Macro Image */}
          <img
            src="./images/movement-macro.jpg"
            alt="Macro watch movement finishing"
            className="w-full h-full object-cover opacity-85 transition-transform duration-700 hover:scale-105"
          />

          {/* Dark Lighting Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-transparent to-black/60 pointer-events-none" />

          {/* Hotspot Pulse Pins */}
          {hotspots.map((spot, idx) => (
            <button
              key={spot.id}
              onClick={() => setActiveHotspot(idx)}
              style={{ top: spot.y, left: spot.x }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                activeHotspot === idx
                  ? 'bg-amber-400 text-black scale-125 z-30 shadow-lg shadow-amber-400/50'
                  : 'bg-zinc-900/90 border border-amber-400/60 text-amber-300 hover:scale-110 z-20'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-current animate-ping" />
            </button>
          ))}

          {/* Active Hotspot Detail Card Overlay */}
          <div className="absolute bottom-6 left-6 right-6 md:left-8 md:right-auto md:max-w-md p-6 rounded-2xl bg-zinc-950/85 backdrop-blur-md border border-white/10 text-slate-100 z-30 shadow-2xl space-y-2">
            <div className="flex items-center space-x-2 font-mono text-xs text-amber-400 tracking-widest uppercase">
              <span>FEATURE 0{activeHotspot + 1}</span>
              <span>•</span>
              <span>{hotspots[activeHotspot].title}</span>
            </div>
            <p className="font-sans text-sm text-zinc-300 leading-relaxed font-light">
              {hotspots[activeHotspot].desc}
            </p>
          </div>
        </div>

        {/* Technical Label Badges */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 font-mono text-xs text-zinc-400">
          {['POLISHED BEVEL', 'HAND-FINISHED', 'MICRO-ENGINEERED', 'PRECISION CUT', 'JEWEL BEARING'].map((tag) => (
            <span key={tag} className="px-4 py-2 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-300 tracking-widest">
              {tag}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
}
