import React from 'react';
import { AlertTriangle } from 'lucide-react';

export function WebGLFallback() {
  return (
    <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center p-8 bg-zinc-950 border border-zinc-800 rounded-3xl text-center space-y-4">
      <AlertTriangle className="w-10 h-10 text-amber-400" />
      <div className="space-y-1">
        <h3 className="font-serif text-xl text-slate-100 tracking-widest uppercase">
          INTERACTIVE 3D EXPERIENCE UNAVAILABLE
        </h3>
        <p className="font-mono text-xs text-zinc-500 max-w-sm mx-auto">
          Your browser or device does not currently support WebGL rendering. Complete functional horology specifications remain accessible below.
        </p>
      </div>
      <img
        src="./images/hero-watch.jpg"
        alt="Aurelio A-01 High Resolution Visual"
        className="w-64 h-64 object-contain rounded-2xl border border-zinc-800"
      />
    </div>
  );
}
