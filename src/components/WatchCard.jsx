import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Info, CheckCircle2 } from 'lucide-react';

export function WatchCard({ watch, onSelect, activeWatchId }) {
  const [isHovered, setIsHovered] = useState(false);
  const [showSpecsModal, setShowSpecsModal] = useState(false);

  const isSelected = activeWatchId === watch.id;

  return (
    <>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative rounded-3xl overflow-hidden bg-zinc-950 border transition-all duration-500 flex flex-col justify-between p-8 group ${
          isSelected
            ? 'border-amber-400/80 ring-1 ring-amber-400/30 shadow-2xl shadow-amber-400/10'
            : 'border-zinc-800/80 hover:border-amber-400/40'
        }`}
      >
        {/* Top Reference Header */}
        <div className="flex justify-between items-start z-10">
          <div>
            <span className="font-mono text-[10px] tracking-[0.3em] text-amber-400 uppercase font-semibold block">
              {watch.ref}
            </span>
            <h3 className="font-serif text-2xl md:text-3xl text-slate-100 uppercase tracking-wider font-light mt-1">
              {watch.name}
            </h3>
            <span className="font-mono text-xs text-zinc-400 tracking-widest uppercase">
              {watch.subtitle}
            </span>
          </div>

          <button
            onClick={() => setShowSpecsModal(true)}
            className="p-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-amber-300 transition-colors cursor-pointer"
            title="View Technical Specifications"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>

        {/* Center Watch Visual with Subtle Hover Rotation */}
        <div className="relative w-full h-80 my-6 flex items-center justify-center overflow-hidden">
          <motion.img
            src={watch.image}
            alt={watch.name}
            animate={{
              scale: isHovered ? 1.08 : 1,
              rotate: isHovered ? 3 : 0
            }}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            className="h-full object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
          />
        </div>

        {/* Quick Spec Highlights */}
        <div className="space-y-3 z-10 border-t border-zinc-900 pt-6 font-mono text-xs">
          <div className="flex justify-between text-zinc-400">
            <span className="text-zinc-500">MATERIAL</span>
            <span className="text-zinc-200 text-right max-w-[180px]">{watch.material}</span>
          </div>
          <div className="flex justify-between text-zinc-400">
            <span className="text-zinc-500">MOVEMENT</span>
            <span className="text-zinc-200">{watch.movement}</span>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex items-center space-x-3">
            <button
              onClick={() => onSelect(watch.id)}
              className={`w-full py-3 rounded-xl font-mono text-xs tracking-[0.25em] transition-all cursor-pointer flex items-center justify-center space-x-2 ${
                isSelected
                  ? 'bg-amber-400 text-black font-semibold shadow-lg shadow-amber-400/20'
                  : 'bg-zinc-900 hover:bg-amber-400/20 border border-zinc-800 text-slate-200 hover:text-amber-300 hover:border-amber-400/40'
              }`}
            >
              <span>{isSelected ? 'ACTIVE MODEL' : 'EXAMINE 3D MODEL'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Specifications Modal Overlay */}
      <AnimatePresence>
        {showSpecsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-zinc-950 border border-zinc-800 rounded-3xl max-w-lg w-full p-8 space-y-6 text-slate-100 relative shadow-2xl"
            >
              <div className="flex justify-between items-start border-b border-zinc-800 pb-4">
                <div>
                  <span className="font-mono text-xs text-amber-400 tracking-widest">{watch.ref}</span>
                  <h3 className="font-serif text-3xl tracking-widest font-light">{watch.name}</h3>
                </div>
                <button
                  onClick={() => setShowSpecsModal(false)}
                  className="text-zinc-500 hover:text-white font-mono text-xl cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <p className="font-sans text-xs md:text-sm text-zinc-300 leading-relaxed font-light">
                {watch.description}
              </p>

              <div className="space-y-3 font-mono text-xs">
                <div className="text-amber-400 tracking-widest uppercase font-semibold">HOROLOGICAL SPECIFICATIONS</div>
                {watch.specs.map((s) => (
                  <div key={s.label} className="flex justify-between py-1.5 border-b border-zinc-900 text-zinc-400">
                    <span>{s.label}</span>
                    <span className="text-slate-100 font-medium">{s.value}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  setShowSpecsModal(false);
                  onSelect(watch.id);
                  const el = document.getElementById('sequence-experience');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-3.5 rounded-xl bg-amber-400 text-black font-mono text-xs font-semibold tracking-[0.25em] hover:bg-amber-300 transition-colors cursor-pointer"
              >
                LOAD INTO 3D EXHIBITION
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
