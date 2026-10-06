import React from 'react';
import { motion } from 'framer-motion';

export function CraftSection() {
  return (
    <section id="craft" className="relative w-full py-28 bg-[#050608] text-slate-100 border-t border-zinc-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Editorial Title */}
        <div className="max-w-4xl space-y-6 mb-20">
          <span className="font-mono text-xs tracking-[0.4em] text-amber-400 uppercase font-semibold">
            04 • MANUFACTURE & ARTISANRY
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif tracking-[0.25em] font-light uppercase text-slate-100">
            CRAFTED BY HAND.
          </h2>
          <blockquote className="font-serif italic text-xl md:text-3xl text-zinc-300 font-light leading-relaxed border-l-2 border-amber-400/60 pl-6 my-6">
            "Every surface exists for a reason. Every component is finished with intention. Every movement is assembled around one idea: precision without compromise."
          </blockquote>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Large Artisan Image */}
          <div className="md:col-span-7 rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-950 relative group">
            <img
              src="./images/watchmaker.jpg"
              alt="Master Swiss horologist at work"
              className="w-full h-[540px] object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 font-mono text-xs text-zinc-300 space-y-1">
              <span className="text-amber-400 tracking-widest block uppercase font-semibold">MASTER HOROLOGIST ASSEMBLY</span>
              <p className="text-zinc-400 text-[11px] font-sans">
                Each Calibre A-01 is built, adjusted, and disassembled twice by a single master watchmaker.
              </p>
            </div>
          </div>

          {/* Side Editorial Details */}
          <div className="md:col-span-5 flex flex-col justify-between space-y-6">
            <div className="p-8 rounded-3xl bg-zinc-950/80 border border-zinc-800 space-y-4">
              <span className="font-mono text-xs text-amber-400 tracking-widest uppercase">ANGLAGE & POLISHING</span>
              <h3 className="font-serif text-2xl text-slate-100 uppercase tracking-wider font-light">
                THE ART OF HAND-FINISHING
              </h3>
              <p className="font-sans text-xs md:text-sm text-zinc-400 leading-relaxed font-light">
                No automated tool can match the subtle touch of a master artisan. Bevels are filed by hand, burnished with gentian wood sourced from the Swiss Alps, achieving flawless mirror reflection.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-zinc-950/80 border border-zinc-800 space-y-4">
              <span className="font-mono text-xs text-amber-400 tracking-widest uppercase">TESTING & TOLERANCES</span>
              <h3 className="font-serif text-2xl text-slate-100 uppercase tracking-wider font-light">
                1,000 HOUR HOROLOGICAL TESTING
              </h3>
              <p className="font-sans text-xs md:text-sm text-zinc-400 leading-relaxed font-light">
                Before casing, every Aurelio timepiece undergoes 1,000 consecutive hours of chronometric testing across 6 positions and 3 temperature variances.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
