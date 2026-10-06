import React from 'react';
import { motion } from 'framer-motion';

export function BrandStatement() {
  return (
    <section className="relative w-full py-24 bg-[#050608] text-slate-100 border-t border-b border-zinc-900 overflow-hidden text-center">
      {/* Background Radial Gold Sheen */}
      <div className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 space-y-8 relative z-10">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-xs tracking-[0.4em] text-amber-400 uppercase font-semibold block"
        >
          THE MANUFACTURE PHILOSOPHY
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl md:text-6xl font-serif font-light tracking-[0.2em] text-slate-100 uppercase leading-tight"
        >
          INSPIRED BY THE IMPOSSIBLE.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-sans text-sm md:text-base text-zinc-300 max-w-3xl mx-auto leading-relaxed font-light tracking-wide"
        >
          AURELIO™ is driven by radical mechanical creativity and inspired by the impossible. Since our earliest beginnings in high horology, our master artisans have designed the industry's most iconic and daring mechanical complications. Today, AURELIO™ reflects an insatiable desire to produce works of art the world has never seen before.
        </motion.p>

        <div className="pt-4 flex justify-center items-center space-x-6 font-mono text-xs text-zinc-500 tracking-widest uppercase">
          <span>GENÈVE</span>
          <span className="text-amber-400">•</span>
          <span>NEW YORK</span>
          <span className="text-amber-400">•</span>
          <span>PARIS</span>
          <span className="text-amber-400">•</span>
          <span>DUBAI</span>
        </div>
      </div>
    </section>
  );
}
