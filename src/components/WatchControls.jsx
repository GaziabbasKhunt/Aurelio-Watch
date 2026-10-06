import React from 'react';
import { RotateCcw, Layers, Crosshair } from 'lucide-react';

export function WatchControls({
  explodedMode,
  toggleExploded,
  explodedProgress,
  setExplodedProgress,
  resetView,
  activeWatchId,
  setActiveWatchId
}) {
  const models = [
    { id: 'a-01', name: 'A-01 OBSIDIAN' },
    { id: 'a-02', name: 'A-02 AUREUM' },
    { id: 'a-03', name: 'A-03 NERO' }
  ];

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-950/80 backdrop-blur-md border border-white/10 shadow-2xl text-xs font-mono text-zinc-300">
      {/* Model Selector */}
      <div className="flex items-center space-x-2">
        <span className="text-zinc-500 uppercase tracking-widest text-[10px] hidden sm:inline">VARIATION:</span>
        <div className="flex bg-zinc-900/80 p-1 rounded-lg border border-zinc-800">
          {models.map((m) => (
            <button
              key={m.id}
              onClick={() => setActiveWatchId(m.id)}
              className={`px-3 py-1.5 rounded-md tracking-wider transition-all cursor-pointer ${
                activeWatchId === m.id
                  ? 'bg-amber-400/20 text-amber-300 border border-amber-500/40'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {m.name}
            </button>
          ))}
        </div>
      </div>

      {/* Exploded View Control */}
      <div className="flex items-center space-x-3">
        <button
          onClick={toggleExploded}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all cursor-pointer ${
            explodedMode || explodedProgress > 0
              ? 'bg-amber-500/20 text-amber-200 border-amber-400/50'
              : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>{explodedProgress > 0 ? 'COLLAPSE VIEW' : 'EXPLODE VIEW'}</span>
        </button>

        {/* Range Slider for granular explosion control */}
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={explodedProgress}
          onChange={(e) => setExplodedProgress(parseFloat(e.target.value))}
          className="w-24 accent-amber-400 cursor-pointer hidden md:inline-block"
          title="Adjust Explosion Progress"
        />
      </div>

      {/* Reset View Button */}
      <button
        onClick={resetView}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-amber-300 transition-all cursor-pointer"
        title="Reset Camera & Orientation"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">RESET VIEW</span>
      </button>
    </div>
  );
}
