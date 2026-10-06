import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Menu, X } from 'lucide-react';

export function Navbar({ isScrolled, isAudioPlaying, toggleAudio }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: '01 TIMEPIECES', href: '#collection' },
    { label: '02 HIGH HORLOGERIE', href: '#movement' },
    { label: '03 PARTNERSHIPS', href: '#partnerships' },
    { label: '04 CRAFT', href: '#craft' },
    { label: '05 BOUTIQUES', href: '#boutiques' }
  ];

  const handleLinkClick = (href) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isScrolled
            ? 'py-3 bg-[#050608]/90 backdrop-blur-md border-b border-white/5 shadow-2xl'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center space-x-2 group cursor-pointer"
          >
            <span className="font-serif text-xl md:text-2xl tracking-[0.25em] text-slate-100 font-light group-hover:text-amber-300 transition-colors">
              AURELIO<span className="text-amber-400 font-normal">™</span>
            </span>
          </a>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="font-mono text-xs tracking-[0.2em] text-zinc-400 hover:text-amber-300 transition-colors relative py-1 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-amber-400 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action Items */}
          <div className="flex items-center space-x-4">
            {/* Audio Toggle */}
            <button
              onClick={toggleAudio}
              title="Toggle Mechanical Audio"
              className="p-2 rounded-full border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 hover:text-amber-300 transition-all cursor-pointer"
            >
              {isAudioPlaying ? (
                <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>

            {/* CTA Button */}
            <button
              onClick={() => handleLinkClick('#story')}
              className="hidden md:inline-flex items-center px-5 py-2 rounded-full border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-200 text-xs font-mono tracking-[0.2em] transition-all cursor-pointer hover:border-amber-400"
            >
              INQUIRE
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-zinc-300 hover:text-white cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.77, 0, 0.175, 1] }}
            className="fixed inset-0 z-40 bg-[#050608] flex flex-col justify-between p-8 pt-28 font-serif"
          >
            <div className="flex flex-col space-y-6">
              <span className="font-mono text-xs tracking-[0.3em] text-amber-400 uppercase">
                AURELIO NAVIGATION
              </span>
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className="text-2xl md:text-3xl font-light tracking-[0.2em] text-zinc-200 hover:text-amber-300 transition-colors py-2 border-b border-zinc-900"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-8 border-t border-zinc-900 flex justify-between items-center text-xs font-mono text-zinc-500 tracking-widest">
              <span>AURELIO™ HAUTE HORLOGERIE</span>
              <span>GENÈVE</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
