import React from 'react';

export function Footer() {
  return (
    <footer className="w-full py-16 bg-[#020203] text-zinc-500 border-t border-zinc-900 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
        
        <div className="space-y-2 text-center md:text-left">
          <div className="font-serif text-2xl tracking-[0.25em] text-slate-200">
            AURELIO<span className="text-amber-400">™</span>
          </div>
          <div className="text-[10px] tracking-[0.2em] text-zinc-600 uppercase">
            MANUFACTURE DE HAUTE HORLOGERIE • GENÈVE
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-[11px] tracking-widest text-zinc-400">
          <a href="#collection" className="hover:text-amber-300 transition-colors">COLLECTION</a>
          <a href="#movement" className="hover:text-amber-300 transition-colors">CALIBRE A-01</a>
          <a href="#architecture" className="hover:text-amber-300 transition-colors">ARCHITECTURE</a>
          <a href="#craft" className="hover:text-amber-300 transition-colors">CRAFT</a>
          <a href="#tourbillon" className="hover:text-amber-300 transition-colors">TOURBILLON</a>
        </div>

        <div className="text-center md:text-right text-[10px] tracking-widest text-zinc-600 space-y-1">
          <div>© {new Date().getFullYear()} AURELIO S.A. ALL RIGHTS RESERVED.</div>
          <div>SWISS MADE • HAUTE HORLOGERIE</div>
        </div>

      </div>
    </footer>
  );
}
