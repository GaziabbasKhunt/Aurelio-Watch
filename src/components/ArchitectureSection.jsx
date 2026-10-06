import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export function ArchitectureSection() {
  const layers = [
    {
      step: '01',
      title: 'THE CASE',
      subtitle: 'TITANIUM HOUSING & CUSHION BEZEL',
      desc: 'Structural Grade 5 titanium housing engineered to withstand 100 meters of hydrostatic pressure while isolating kinetic vibrations.'
    },
    {
      step: '02',
      title: 'THE DIAL',
      subtitle: 'SKELETONIZED SAPPHIRE LAYER',
      desc: 'Open-worked chapter ring with applied diamond-cut indices creating an optical illusion of floating horological metrics.'
    },
    {
      step: '03',
      title: 'THE MOVEMENT',
      subtitle: 'CALIBRE A-01 ARCHITECTURE',
      desc: '312 hand-finished components arranged in vertical symmetrical bridges with hand-chamfered Anglage edges.'
    },
    {
      step: '04',
      title: 'THE ESCAPEMENT',
      subtitle: 'SWISS ANCHOR IMPULSE SYSTEM',
      desc: 'Precision impulse pallet jewels transferring kinetic energy from mainspring barrel to impulse roller.'
    },
    {
      step: '05',
      title: 'THE BALANCE',
      subtitle: '28,800 VPH KINETIC REGULATOR',
      desc: 'Variable inertia balance wheel with gold poise adjustment screws pulsing at 4 Hz frequency.'
    },
    {
      step: '06',
      title: 'TIME',
      subtitle: 'THE HARMONIC SUM OF PARTS',
      desc: 'The ultimate synthesis of mechanical engineering, aerospace materials, and Swiss horological art.'
    }
  ];

  return (
    <section id="architecture" className="relative w-full py-28 bg-[#050608] text-slate-100 border-t border-zinc-900 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        
        <div className="text-center space-y-4 mb-20">
          <span className="font-mono text-xs tracking-[0.4em] text-amber-400 uppercase font-semibold">
            03 • STRUCTURAL METROLOGY
          </span>
          <h2 className="text-4xl md:text-7xl font-serif tracking-[0.25em] font-light uppercase">
            THE ARCHITECTURE
          </h2>
          <p className="font-sans text-sm md:text-base text-zinc-400 max-w-xl mx-auto tracking-widest font-light uppercase">
            A vertical hierarchy from housing to temporal precision.
          </p>
        </div>

        {/* Vertical Flow Diagram */}
        <div className="space-y-6 relative">
          {/* Vertical Connecting Guide Line */}
          <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-amber-400/80 via-zinc-800 to-amber-400/80 -translate-x-1/2" />

          {layers.map((layer, idx) => (
            <motion.div
              key={layer.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`relative flex flex-col sm:flex-row items-center justify-between gap-8 ${
                idx % 2 === 0 ? 'sm:flex-row-reverse' : ''
              }`}
            >
              {/* Content Box */}
              <div className="w-full sm:w-[45%] p-8 rounded-3xl bg-zinc-950/80 border border-zinc-800 hover:border-amber-400/50 transition-all duration-300 shadow-2xl space-y-3">
                <div className="flex items-center space-x-3 font-mono text-xs text-amber-400 tracking-widest">
                  <span className="font-bold">{layer.step}</span>
                  <span>•</span>
                  <span>{layer.subtitle}</span>
                </div>
                <h3 className="font-serif text-2xl md:text-3xl tracking-widest text-slate-100 uppercase font-light">
                  {layer.title}
                </h3>
                <p className="font-sans text-xs md:text-sm text-zinc-400 leading-relaxed font-light">
                  {layer.desc}
                </p>
              </div>

              {/* Central Node Circle */}
              <div className="relative z-10 w-12 h-12 rounded-full bg-zinc-950 border-2 border-amber-400 flex items-center justify-center font-mono text-xs text-amber-300 font-bold shadow-lg shadow-amber-400/20 my-2 sm:my-0">
                {layer.step}
              </div>

              {/* Empty Spacer */}
              <div className="hidden sm:block w-[45%]" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
