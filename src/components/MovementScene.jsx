import React from 'react';
import { motion } from 'framer-motion';
import { MOVEMENT_SPECS } from '../data/movement';
import { Cpu, ShieldCheck, Zap, Gauge, Compass, Feather } from 'lucide-react';

export function MovementScene({ activeWatchId }) {
  const specs = [
    { icon: Cpu, label: 'COMPONENTS', value: '312', detail: 'Individually hand-finished' },
    { icon: Zap, label: 'POWER RESERVE', value: '72 HOURS', detail: 'Twin barrel delivery' },
    { icon: Gauge, label: 'FREQUENCY', value: '28,800 VPH', detail: '4 Hz oscillation' },
    { icon: ShieldCheck, label: 'JEWELS', value: '41 RUBIES', detail: 'Synthetic corundum' },
    { icon: Compass, label: 'WINDING', value: 'MANUAL', detail: 'Tactile ratchet click' },
    { icon: Feather, label: 'THICKNESS', value: '5.8 MM', detail: 'Ultra-thin profile' }
  ];

  return (
    <section id="movement" className="relative w-full py-28 bg-[#050608] text-slate-100 border-t border-zinc-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <span className="font-mono text-xs tracking-[0.4em] text-amber-400 uppercase font-semibold">
            IN-HOUSE MECHANICAL CALIBRE
          </span>
          <h2 className="text-4xl md:text-6xl font-serif tracking-[0.25em] font-light uppercase">
            CALIBRE A-01
          </h2>
          <p className="font-sans text-sm md:text-base text-zinc-400 max-w-2xl mx-auto tracking-widest font-light">
            {MOVEMENT_SPECS.type}
          </p>
        </div>

        {/* Grid Layout: Motion Photo Showcase + Technical Specs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Motion Macro Image Showcase */}
          <div className="lg:col-span-6 h-[480px] rounded-3xl bg-zinc-950 border border-zinc-800/80 overflow-hidden relative shadow-2xl group">
            <img
              src="./images/hero-watch.jpg"
              alt="Calibre A-01 Skeleton Movement"
              className="w-full h-full object-cover opacity-90 transition-transform duration-1000 group-hover:scale-108"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-zinc-950/85 backdrop-blur-md border border-zinc-800 flex justify-between items-center font-mono text-xs">
              <span className="text-amber-400 tracking-widest uppercase">CALIBRE A-01 SKELETON ARCHITECTURE</span>
              <span className="text-zinc-500 uppercase">SWISS MADE • GENÈVE</span>
            </div>
          </div>

          {/* Right Column: Animated Specs Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {specs.map((spec, i) => {
              const Icon = spec.icon;
              return (
                <motion.div
                  key={spec.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="p-6 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 hover:border-amber-400/40 transition-all duration-300 group"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <Icon className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
                    <span className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase">
                      {spec.label}
                    </span>
                  </div>
                  <div className="font-serif text-2xl md:text-3xl tracking-widest text-slate-100 group-hover:text-amber-300 transition-colors">
                    {spec.value}
                  </div>
                  <div className="font-mono text-[11px] text-zinc-500 mt-1 tracking-wider">
                    {spec.detail}
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

        {/* Technical Finishing List */}
        <div className="mt-16 p-8 rounded-3xl bg-zinc-950/40 border border-zinc-800/60 font-mono text-xs text-zinc-400 space-y-4">
          <div className="text-amber-400 tracking-[0.3em] uppercase text-sm font-semibold mb-2">
            HAUTE HORLOGERIE FINISHING SPECIFICATIONS
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {MOVEMENT_SPECS.finishing.map((item, idx) => (
              <div key={idx} className="flex items-start space-x-3">
                <span className="text-amber-400 font-bold">•</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
