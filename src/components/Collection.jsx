import React from 'react';
import { WATCHES } from '../data/watches';
import { WatchCard } from './WatchCard';

export function Collection({ activeWatchId, setActiveWatchId }) {
  return (
    <section id="collection" className="relative w-full py-28 bg-[#050608] text-slate-100 border-t border-zinc-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-20">
          <span className="font-mono text-xs tracking-[0.4em] text-amber-400 uppercase font-semibold">
            01 • FLAGSHIP HOROLOGY
          </span>
          <h2 className="text-4xl md:text-7xl font-serif tracking-[0.25em] font-light uppercase">
            THE COLLECTION
          </h2>
          <p className="font-sans text-sm md:text-base text-zinc-400 max-w-2xl mx-auto tracking-widest font-light uppercase">
            Three studies in mechanical skeletonization & structural titanium.
          </p>
        </div>

        {/* 3 Watch Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WATCHES.map((watch) => (
            <WatchCard
              key={watch.id}
              watch={watch}
              activeWatchId={activeWatchId}
              onSelect={(id) => {
                setActiveWatchId(id);
                const el = document.getElementById('sequence-experience');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
