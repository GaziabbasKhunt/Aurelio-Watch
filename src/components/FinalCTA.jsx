import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';

export function FinalCTA() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <section id="story" className="relative w-full py-32 bg-[#030304] text-slate-100 border-t border-zinc-900 overflow-hidden text-center">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 space-y-8 relative z-10">
        <span className="font-mono text-xs tracking-[0.4em] text-amber-400 uppercase font-semibold">
          PRIVATE ALLOCATION INQUIRY
        </span>

        <h2 className="text-5xl sm:text-7xl md:text-8xl font-serif tracking-[0.3em] font-light uppercase text-slate-100">
          AURELIO<span className="text-amber-400 font-normal">™</span>
        </h2>

        <p className="font-sans text-lg md:text-2xl tracking-[0.4em] text-zinc-300 font-light uppercase">
          THE ARCHITECTURE OF TIME.
        </p>

        <p className="font-serif italic text-2xl md:text-3xl text-amber-300 font-light tracking-widest pt-4">
          "TIME, REASSEMBLED."
        </p>

        <p className="font-mono text-xs md:text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
          Each Aurelio timepiece is limited to 18 pieces worldwide per reference. Request a private allocation appointment with our master horologist in Genève.
        </p>

        {/* Inquiry Form */}
        <div className="pt-8 max-w-md mx-auto">
          {submitted ? (
            <div className="p-6 rounded-2xl bg-zinc-950 border border-amber-400/50 flex items-center justify-center space-x-3 text-amber-300 font-mono text-xs tracking-widest">
              <CheckCircle className="w-5 h-5 text-amber-400" />
              <span>ALLOCATION DOSSIER DISPATCHED TO GENÈVE</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                placeholder="ENTER YOUR EMAIL FOR DOSSIER..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 rounded-xl bg-zinc-950 border border-zinc-800 text-slate-100 font-mono text-xs placeholder:text-zinc-600 focus:outline-none focus:border-amber-400 transition-colors"
              />
              <button
                type="submit"
                className="px-8 py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-mono text-xs tracking-[0.25em] font-semibold transition-colors cursor-pointer flex items-center justify-center space-x-2 shrink-0"
              >
                <span>REQUEST</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
