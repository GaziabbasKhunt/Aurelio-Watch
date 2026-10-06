import React from 'react';
import { motion } from 'framer-motion';

export function PartnershipsSection() {
  const highlights = [
    { title: 'CHRONOS V12 HYPERCAR ENGINE', desc: 'Miniature kinetic V12 engine block integrated directly into the calibre with 16 moving pistons.' },
    { title: 'MONOBLOC SAPPHIRE HOUSING', desc: 'Single crystal sapphire case machined from a 120kg raw crystal boule after 2,000 hours of 5-axis milling.' },
    { title: 'TITANIUM FLYING TOURBILLON', desc: 'Multi-axis 60-second tourbillon cage floating over a subterranean carbon baseplate.' }
  ];

  return (
    <section id="partnerships" className="relative w-full py-28 bg-[#050608] text-slate-100 border-t border-zinc-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <span className="font-mono text-xs tracking-[0.4em] text-amber-400 uppercase font-semibold">
            ENGINEERING ALLIANCES
          </span>
          <h2 className="text-4xl md:text-6xl font-serif tracking-[0.25em] font-light uppercase">
            LEGENDARY PARTNERSHIPS
          </h2>
          <p className="font-sans text-sm md:text-base text-zinc-400 max-w-2xl mx-auto tracking-widest font-light">
            Uniting hypercar mechanics with grand complications in haute horlogerie.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hypercar Graphic */}
          <div className="lg:col-span-7 h-[500px] rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-950 relative group shadow-2xl">
            <img
              src="./images/partnership-hypercar.jpg"
              alt="Hypercar Horology Partnership"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 font-mono text-xs text-zinc-300 space-y-1">
              <span className="text-amber-400 tracking-widest block uppercase font-semibold">CHRONOS V12 HYPERCAR EDITION</span>
              <p className="text-zinc-400 text-[11px] font-sans">
                A 16-piston sapphire engine block operating in real-time synchronization with the flying tourbillon.
              </p>
            </div>
          </div>

          {/* Right Column: Spec Highlights */}
          <div className="lg:col-span-5 space-y-6">
            {highlights.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 hover:border-amber-400/40 transition-all duration-300 space-y-2"
              >
                <span className="font-mono text-[10px] text-amber-400 tracking-widest uppercase">
                  INNOVATION 0{idx + 1}
                </span>
                <h3 className="font-serif text-xl text-slate-100 tracking-wider font-light uppercase">
                  {item.title}
                </h3>
                <p className="font-sans text-xs text-zinc-400 leading-relaxed font-light">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
