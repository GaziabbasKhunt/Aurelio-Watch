import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MapPin, CheckCircle, Volume2, VolumeX, Menu, X, Send } from 'lucide-react';
import { WATCHES } from '../data/watches';

export function PhotoScrollExhibition({ isAudioPlaying, toggleAudio }) {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedWatchModal, setSelectedWatchModal] = useState(null);
  const [activeBoutique, setActiveBoutique] = useState('GENÈVE');
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sectionsRef = useRef([]);

  const stages = [
    { id: 'hero', title: 'INSPIRED BY THE IMPOSSIBLE', category: '01 • INTRO' },
    { id: 'manifesto', title: 'THE MANUFACTURE PHILOSOPHY', category: '02 • MANIFESTO' },
    { id: 'a01', title: 'AURELIO A-01 OBSIDIAN', category: '03 • TIMEPIECE 01' },
    { id: 'a02', title: 'AURELIO A-02 AUREUM', category: '04 • TIMEPIECE 02' },
    { id: 'a03', title: 'AURELIO A-03 NERO TOURBILLON', category: '05 • TIMEPIECE 03' },
    { id: 'exploded', title: '312 COMPONENTS EXPLOSION', category: '06 • KINETICS' },
    { id: 'tourbillon', title: '60-SECOND FLYING TOURBILLON', category: '07 • THE HEART' },
    { id: 'partnership', title: 'HYPERCAR V12 COLLABORATION', category: '08 • ALLIANCE' },
    { id: 'macro', title: 'SUB-MICRON HAND FINISHING', category: '09 • CRAFT' },
    { id: 'boutiques', title: 'BOUTIQUES & PRIVATE ALLOCATION', category: '10 • ALLOCATION' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 2;
      sectionsRef.current.forEach((sec, idx) => {
        if (sec) {
          const top = sec.offsetTop;
          const height = sec.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(idx);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToStage = (idx) => {
    setMobileMenuOpen(false);
    if (sectionsRef.current[idx]) {
      sectionsRef.current[idx].scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  const boutiquesData = {
    GENÈVE: { address: 'Rue du Rhône 42, 1204 Genève, Switzerland', phone: '+41 22 819 9000', type: 'WORLD MANUFACTURE ATELIER' },
    'NEW YORK': { address: '48 East 57th Street, New York, NY 10022', phone: '+1 (212) 719-5887', type: 'NORTH AMERICAN FLAGSHIP' },
    PARIS: { address: 'Place Vendôme 18, 75001 Paris, France', phone: '+33 1 42 61 58 87', type: 'HAUTE HORLOGERIE SALON' },
    DUBAI: { address: 'The Dubai Mall, Fashion Avenue, Dubai, UAE', phone: '+971 4 330 8888', type: 'MIDDLE EAST FLAGSHIP' }
  };

  // Stagger variants for motion text reveals
  const textRevealVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: i * 0.12, ease: [0.25, 1, 0.5, 1] }
    })
  };

  return (
    <div className="relative w-full bg-[#050608] text-slate-100 selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* Top Fixed Header without borders */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 left-0 right-0 z-50 py-5 px-6 md:px-12 bg-[#050608]/85 backdrop-blur-md flex items-center justify-between shadow-2xl"
      >
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            scrollToStage(0);
          }}
          className="font-serif text-2xl tracking-[0.25em] font-light text-slate-100 hover:text-amber-300 transition-colors flex items-center space-x-2"
        >
          <span>AURELIO</span>
          <span className="text-amber-400 font-normal">™</span>
        </a>

        {/* Dynamic Stage Indicator (Desktop) */}
        <div className="hidden lg:flex items-center space-x-6 font-mono text-xs text-zinc-400">
          <motion.span
            key={stages[activeSection]?.category}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-amber-400 tracking-widest font-semibold"
          >
            {stages[activeSection]?.category}
          </motion.span>
          <span className="text-zinc-600">|</span>
          <motion.span
            key={stages[activeSection]?.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="tracking-widest uppercase text-slate-200"
          >
            {stages[activeSection]?.title}
          </motion.span>
        </div>

        {/* Right Controls */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleAudio}
            title="Toggle Mechanical Audio"
            className="p-2 rounded-full border border-zinc-800 bg-zinc-900/80 text-zinc-300 hover:text-amber-300 transition-all cursor-pointer"
          >
            {isAudioPlaying ? <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={() => scrollToStage(9)}
            className="hidden md:inline-flex items-center px-5 py-2 rounded-full border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-200 text-xs font-mono tracking-[0.2em] transition-all cursor-pointer hover:border-amber-400 shadow-lg"
          >
            ALLOCATION DOSSIER
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-zinc-300 hover:text-white cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      {/* Clean Stage Indicator Dots without vertical line track */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center space-y-4 font-mono text-[10px]">
        {stages.map((st, idx) => (
          <button
            key={st.id}
            onClick={() => scrollToStage(idx)}
            className={`flex items-center space-x-2 transition-all cursor-pointer group ${
              activeSection === idx ? 'text-amber-300 font-bold' : 'text-zinc-600 hover:text-zinc-300'
            }`}
          >
            <motion.span
              animate={{
                scale: activeSection === idx ? [1, 1.3, 1] : 1,
                backgroundColor: activeSection === idx ? '#F59E0B' : '#27272A'
              }}
              transition={{ duration: 0.4 }}
              className="w-2.5 h-2.5 rounded-full"
            />
            <span className="opacity-0 group-hover:opacity-100 transition-opacity tracking-widest uppercase">
              {st.category.split('•')[1]?.trim()}
            </span>
          </button>
        ))}
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 bg-[#050608] flex flex-col justify-between p-8 pt-28 font-serif"
          >
            <div className="flex flex-col space-y-3">
              <span className="font-mono text-xs tracking-[0.3em] text-amber-400 uppercase">
                EXHIBITION STAGES
              </span>
              {stages.map((st, idx) => (
                <button
                  key={st.id}
                  onClick={() => scrollToStage(idx)}
                  className="text-left text-lg font-light tracking-[0.15em] py-2 transition-colors text-zinc-300 hover:text-white"
                >
                  {st.category} — {st.title}
                </button>
              ))}
            </div>
            <div className="pt-6 flex justify-between items-center font-mono text-xs text-zinc-500">
              <span>AURELIO™ GENÈVE</span>
              <span>INSPIRED BY THE IMPOSSIBLE</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 10 STAGE CONTINUOUS VERTICAL PHOTO SCROLL (UNIFORM #050608 OBSIDIAN FADE) */}
      {/* ========================================================================= */}

      {/* STAGE 01: HERO PHOTO SCROLL */}
      <section
        ref={(el) => (sectionsRef.current[0] = el)}
        className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-[#050608]"
      >
        <motion.div
          initial={{ scale: 1.15, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.4, ease: [0.25, 1, 0.5, 1] }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src="./images/watch-hero-full.jpg"
            alt="Aurelio Inspired By The Impossible"
            className="w-full h-full object-cover filter drop-shadow-2xl"
          />
        </motion.div>
        
        {/* Soft Blended Top & Bottom Gradient Mask */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050608] via-transparent to-[#050608] pointer-events-none z-10" />

        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center space-y-6 pt-24">
          <motion.span
            custom={0}
            variants={textRevealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="font-mono text-xs md:text-sm tracking-[0.4em] text-amber-400 uppercase font-medium block"
          >
            GENÈVE • MANUFACTURE HORLOGÈRE
          </motion.span>

          <motion.h1
            custom={1}
            variants={textRevealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="text-5xl sm:text-7xl md:text-9xl font-serif font-light tracking-[0.2em] text-slate-100 uppercase drop-shadow-2xl leading-tight"
          >
            INSPIRED BY THE IMPOSSIBLE<span className="text-amber-400 font-normal">.</span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={textRevealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="font-sans text-base sm:text-xl tracking-[0.5em] text-zinc-300 uppercase font-light"
          >
            AURELIO™ — THE ARCHITECTURE OF TIME.
          </motion.p>
        </div>
      </section>

      {/* STAGE 02: MANIFESTO PHOTO SCROLL */}
      <section
        ref={(el) => (sectionsRef.current[1] = el)}
        className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-[#050608]"
      >
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.5 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src="./images/watchmaker.jpg"
            alt="Master Horologist Atelier"
            className="w-full h-full object-cover filter grayscale"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#050608] via-[#050608]/90 to-[#050608] pointer-events-none z-10" />

        <div className="relative z-20 max-w-4xl mx-auto px-6 text-center space-y-8">
          <motion.span
            custom={0}
            variants={textRevealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="font-mono text-xs tracking-[0.4em] text-amber-400 uppercase font-semibold block"
          >
            02 • THE MANUFACTURE MANIFESTO
          </motion.span>

          <motion.h2
            custom={1}
            variants={textRevealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="text-3xl sm:text-5xl md:text-6xl font-serif font-light tracking-[0.2em] text-slate-100 uppercase leading-tight"
          >
            "WE DO NOT MEASURE SECONDS. WE ARCHITECT ETERNITY."
          </motion.h2>

          <motion.p
            custom={2}
            variants={textRevealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="font-sans text-sm md:text-base text-zinc-300 leading-relaxed font-light tracking-wide max-w-2xl mx-auto"
          >
            AURELIO™ is driven by radical mechanical creativity and inspired by the impossible. From our master atelier in Genève, we engineer the industry's most daring complications—uniting aerospace materials, flying tourbillons, and skeletonized architecture into works of art the world has never seen before.
          </motion.p>
        </div>
      </section>

      {/* STAGE 03: TIMEPIECE 01 — AURELIO A-01 OBSIDIAN */}
      <section
        ref={(el) => (sectionsRef.current[2] = el)}
        className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-[#050608]"
      >
        <motion.div
          initial={{ scale: 1.15, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.85 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src="./images/watch-a01.jpg"
            alt="AURELIO A-01 Obsidian"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#050608] via-transparent to-[#050608] pointer-events-none z-10" />

        <div className="relative z-20 max-w-6xl mx-auto px-6 w-full flex flex-col md:flex-row justify-between items-end pb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="space-y-3 max-w-xl"
          >
            <span className="font-mono text-xs tracking-[0.3em] text-amber-400 uppercase font-semibold">
              REF. A01-OBS-88 • GRADE 5 TITANIUM
            </span>
            <h2 className="text-4xl sm:text-6xl font-serif tracking-[0.2em] text-slate-100 uppercase font-light">
              AURELIO A-01
            </h2>
            <span className="font-mono text-sm text-zinc-400 tracking-widest uppercase block">
              OBSIDIAN SKELETON
            </span>
            <p className="font-sans text-xs md:text-sm text-zinc-300 font-light leading-relaxed">
              Forged in high-density Grade 5 titanium with an obsidian carbon bezel. Exposing every moving tooth of the open-worked skeleton gear train.
            </p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            onClick={() => setSelectedWatchModal(WATCHES[0])}
            className="mt-6 md:mt-0 px-8 py-4 rounded-full bg-amber-400 text-black font-mono text-xs font-semibold tracking-[0.25em] hover:bg-amber-300 transition-colors cursor-pointer flex items-center space-x-2 shrink-0 shadow-2xl"
          >
            <span>EXAMINE SPECS</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </motion.button>
        </div>
      </section>

      {/* STAGE 04: TIMEPIECE 02 — AURELIO A-02 AUREUM */}
      <section
        ref={(el) => (sectionsRef.current[3] = el)}
        className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-[#050608]"
      >
        <motion.div
          initial={{ scale: 1.15, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.85 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src="./images/watch-a02.jpg"
            alt="AURELIO A-02 Aureum"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#050608] via-transparent to-[#050608] pointer-events-none z-10" />

        <div className="relative z-20 max-w-6xl mx-auto px-6 w-full flex flex-col md:flex-row justify-between items-end pb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="space-y-3 max-w-xl"
          >
            <span className="font-mono text-xs tracking-[0.3em] text-amber-400 uppercase font-semibold">
              REF. A02-AUR-18K • 18K HONEY GOLD
            </span>
            <h2 className="text-4xl sm:text-6xl font-serif tracking-[0.2em] text-slate-100 uppercase font-light">
              AURELIO A-02
            </h2>
            <span className="font-mono text-sm text-zinc-400 tracking-widest uppercase block">
              AUREUM CHAMPAGNE
            </span>
            <p className="font-sans text-xs md:text-sm text-zinc-300 font-light leading-relaxed">
              Sculpted from custom 18K Aureum gold alloy. Marrying classical hand-beveling with avant-garde mechanical architecture and champagne-toned movement plates.
            </p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            onClick={() => setSelectedWatchModal(WATCHES[1])}
            className="mt-6 md:mt-0 px-8 py-4 rounded-full bg-amber-400 text-black font-mono text-xs font-semibold tracking-[0.25em] hover:bg-amber-300 transition-colors cursor-pointer flex items-center space-x-2 shrink-0 shadow-2xl"
          >
            <span>EXAMINE SPECS</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </motion.button>
        </div>
      </section>

      {/* STAGE 05: TIMEPIECE 03 — AURELIO A-03 NERO TOURBILLON */}
      <section
        ref={(el) => (sectionsRef.current[4] = el)}
        className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-[#050608]"
      >
        <motion.div
          initial={{ scale: 1.15, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.85 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src="./images/watch-a03.jpg"
            alt="AURELIO A-03 Nero Tourbillon"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#050608] via-transparent to-[#050608] pointer-events-none z-10" />

        <div className="relative z-20 max-w-6xl mx-auto px-6 w-full flex flex-col md:flex-row justify-between items-end pb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="space-y-3 max-w-xl"
          >
            <span className="font-mono text-xs tracking-[0.3em] text-amber-400 uppercase font-semibold">
              REF. A03-TRB-01 • BLACK CERAMIC
            </span>
            <h2 className="text-4xl sm:text-6xl font-serif tracking-[0.2em] text-slate-100 uppercase font-light">
              AURELIO A-03
            </h2>
            <span className="font-mono text-sm text-zinc-400 tracking-widest uppercase block">
              NERO FLYING TOURBILLON
            </span>
            <p className="font-sans text-xs md:text-sm text-zinc-300 font-light leading-relaxed">
              Monobloc black ceramic housing enclosing a 60-second titanium flying tourbillon cage floating above a sapphire baseplate.
            </p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            onClick={() => setSelectedWatchModal(WATCHES[2])}
            className="mt-6 md:mt-0 px-8 py-4 rounded-full bg-amber-400 text-black font-mono text-xs font-semibold tracking-[0.25em] hover:bg-amber-300 transition-colors cursor-pointer flex items-center space-x-2 shrink-0 shadow-2xl"
          >
            <span>EXAMINE SPECS</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </motion.button>
        </div>
      </section>

      {/* STAGE 06: KINETIC COMPONENT EXPLOSION */}
      <section
        ref={(el) => (sectionsRef.current[5] = el)}
        className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-[#050608]"
      >
        <motion.div
          initial={{ scale: 1.2, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.4, ease: [0.25, 1, 0.5, 1] }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src="./images/exploded-components.jpg"
            alt="312 Components Exploded Photography"
            className="w-full h-full object-cover filter drop-shadow-2xl"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#050608] via-transparent to-[#050608] pointer-events-none z-10" />

        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center space-y-4 pt-16">
          <motion.span
            custom={0}
            variants={textRevealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="font-mono text-xs tracking-[0.4em] text-amber-400 uppercase font-semibold block"
          >
            06 • HOROLOGICAL METROLOGY
          </motion.span>
          <motion.h2
            custom={1}
            variants={textRevealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="text-4xl sm:text-6xl font-serif tracking-[0.2em] text-slate-100 uppercase font-light"
          >
            312 COMPONENTS EXPLOSION
          </motion.h2>
          <motion.p
            custom={2}
            variants={textRevealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="font-sans text-xs md:text-sm text-zinc-300 font-light max-w-xl mx-auto"
          >
            Vertical axial separation isolations exposing mainplates, twin barrels, gear train wheels, synthetic rubies, and the flying tourbillon cage.
          </motion.p>
        </div>

        {/* Animated Floating Callout Pins */}
        <div className="absolute inset-0 z-20 pointer-events-none hidden md:block">
          {[
            { label: 'GRADE 5 MAINPLATE', x: '50%', y: '22%' },
            { label: 'TWIN BARREL ASSEMBLY', x: '28%', y: '42%' },
            { label: 'GEAR TRAIN WHEELS', x: '65%', y: '52%' },
            { label: 'SYNTHETIC RUBIES', x: '50%', y: '62%' },
            { label: 'FLYING TOURBILLON CAGE', x: '70%', y: '72%' }
          ].map((pin, i) => (
            <motion.div
              key={pin.label}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              style={{ top: pin.y, left: pin.x }}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center space-x-2"
            >
              <span className="w-3.5 h-3.5 rounded-full bg-amber-400 ring-4 ring-amber-400/25 animate-ping" />
              <span className="px-3.5 py-1.5 rounded bg-zinc-950/90 border border-amber-400/50 font-mono text-[10px] text-slate-100 tracking-widest uppercase backdrop-blur-md shadow-2xl">
                {pin.label}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* STAGE 07: THE HEART — 60-SECOND FLYING TOURBILLON */}
      <section
        ref={(el) => (sectionsRef.current[6] = el)}
        className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-[#050608]"
      >
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src="./images/tourbillon-spotlight.jpg"
            alt="60-Second Flying Tourbillon Spotlight"
            className="w-full h-full object-cover filter drop-shadow-2xl"
          />
        </motion.div>
        {/* Soft Gradient Mask matching #050608 */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050608] via-transparent to-[#050608] pointer-events-none z-10" />

        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center space-y-4 pt-16">
          <motion.span
            custom={0}
            variants={textRevealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="font-mono text-xs tracking-[0.4em] text-amber-400 uppercase font-semibold block"
          >
            07 • CROWN JEWEL COMPLICATION
          </motion.span>

          <motion.h2
            custom={1}
            variants={textRevealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="text-4xl sm:text-7xl font-serif tracking-[0.25em] text-slate-100 uppercase font-light"
          >
            THE HEART OF TIME.
          </motion.h2>

          <motion.p
            custom={2}
            variants={textRevealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="font-sans text-xs md:text-sm text-zinc-300 font-light max-w-xl mx-auto"
          >
            A 0.28-gram titanium flying tourbillon cage rotating continuously on its central axis to compensate for gravitational variances.
          </motion.p>
        </div>
      </section>

      {/* STAGE 08: HYPERCAR PARTNERSHIP */}
      <section
        ref={(el) => (sectionsRef.current[7] = el)}
        className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-[#050608]"
      >
        <motion.div
          initial={{ scale: 1.15, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.85 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src="./images/partnership-hypercar.jpg"
            alt="Hypercar Horology Partnership"
            className="w-full h-full object-cover"
          />
        </motion.div>
        {/* Soft Gradient Mask matching #050608 */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050608] via-transparent to-[#050608] pointer-events-none z-10" />

        <div className="relative z-20 max-w-6xl mx-auto px-6 w-full flex flex-col md:flex-row justify-between items-end pb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="space-y-3 max-w-xl"
          >
            <span className="font-mono text-xs tracking-[0.3em] text-amber-400 uppercase font-semibold">
              08 • HYPERCAR ENGINEERING ALLIANCE
            </span>
            <h2 className="text-4xl sm:text-6xl font-serif tracking-[0.2em] text-slate-100 uppercase font-light">
              CHRONOS V12 EDITION
            </h2>
            <p className="font-sans text-xs md:text-sm text-zinc-300 font-light leading-relaxed">
              Featuring a miniature 16-piston sapphire engine block operating in real-time kinetic synchronization with the flying tourbillon.
            </p>
          </motion.div>
        </div>
      </section>

      {/* STAGE 09: SUB-MICRON MACRO CRAFT */}
      <section
        ref={(el) => (sectionsRef.current[8] = el)}
        className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-[#050608]"
      >
        <motion.div
          initial={{ scale: 1.15, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.85 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src="./images/movement-macro.jpg"
            alt="Sub-micron Macro Craft"
            className="w-full h-full object-cover"
          />
        </motion.div>
        {/* Soft Gradient Mask matching #050608 */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050608] via-transparent to-[#050608] pointer-events-none z-10" />

        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center space-y-4 pt-16">
          <motion.span
            custom={0}
            variants={textRevealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="font-mono text-xs tracking-[0.4em] text-amber-400 uppercase font-semibold block"
          >
            09 • HAND-FINISHED ANGLAGE
          </motion.span>
          <motion.h2
            custom={1}
            variants={textRevealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="text-4xl sm:text-6xl font-serif tracking-[0.2em] text-slate-100 uppercase font-light"
          >
            SUB-MICRON METROLOGY
          </motion.h2>
          <motion.p
            custom={2}
            variants={textRevealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="font-sans text-xs md:text-sm text-zinc-300 font-light max-w-xl mx-auto"
          >
            Every edge chamfered by hand and burnished with gentian wood sourced from the Swiss Alps under 20x magnification.
          </motion.p>
        </div>
      </section>

      {/* STAGE 10: BOUTIQUES & ALLOCATION DOSSIER */}
      <section
        ref={(el) => (sectionsRef.current[9] = el)}
        className="relative w-full min-h-screen py-24 flex items-center justify-center bg-[#050608]"
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.35 }}
          viewport={{ once: false }}
          transition={{ duration: 1 }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src="./images/boutique-geneva.jpg"
            alt="Geneva Flagship Boutique"
            className="w-full h-full object-cover filter grayscale"
          />
        </motion.div>
        {/* Soft Gradient Mask matching #050608 */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050608] via-[#050608]/90 to-[#050608] pointer-events-none z-10" />

        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center space-y-8 w-full">
          <motion.span
            custom={0}
            variants={textRevealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="font-mono text-xs tracking-[0.4em] text-amber-400 uppercase font-semibold block"
          >
            10 • PRIVATE ALLOCATION DOSSIER
          </motion.span>

          <motion.h2
            custom={1}
            variants={textRevealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="text-4xl sm:text-7xl font-serif tracking-[0.25em] text-slate-100 uppercase font-light"
          >
            TIME, REASSEMBLED.
          </motion.h2>

          <motion.p
            custom={2}
            variants={textRevealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="font-sans text-xs md:text-sm text-zinc-400 max-w-lg mx-auto leading-relaxed"
          >
            Each Aurelio timepiece is limited to 18 pieces worldwide per reference. Request a private allocation appointment at our world flagships.
          </motion.p>

          {/* Boutique City Selector */}
          <div className="flex flex-wrap justify-center gap-3 pt-4 font-mono text-xs">
            {Object.keys(boutiquesData).map((city) => (
              <button
                key={city}
                onClick={() => setActiveBoutique(city)}
                className={`px-5 py-2.5 rounded-full border transition-all cursor-pointer ${activeBoutique === city ? 'bg-amber-400 text-black font-semibold border-amber-400 shadow-lg shadow-amber-400/20' : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'}`}
              >
                {city}
              </button>
            ))}
          </div>

          <motion.div
            key={activeBoutique}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800 max-w-md mx-auto font-mono text-xs space-y-2 text-zinc-300 shadow-2xl"
          >
            <div className="text-amber-400 font-semibold">{boutiquesData[activeBoutique].type}</div>
            <div>{boutiquesData[activeBoutique].address}</div>
            <div className="text-zinc-500">{boutiquesData[activeBoutique].phone}</div>
          </motion.div>

          {/* Dossier Form */}
          <div className="pt-6 max-w-md mx-auto">
            {submitted ? (
              <div className="p-6 rounded-2xl bg-zinc-950 border border-amber-400/50 flex items-center justify-center space-x-3 text-amber-300 font-mono text-xs tracking-widest shadow-2xl">
                <CheckCircle className="w-5 h-5 text-amber-400 animate-bounce" />
                <span>ALLOCATION DOSSIER DISPATCHED TO GENÈVE</span>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  placeholder="ENTER EMAIL FOR ALLOCATION DOSSIER..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-4 rounded-xl bg-zinc-950 border border-zinc-800 text-slate-100 font-mono text-xs placeholder:text-zinc-600 focus:outline-none focus:border-amber-400 transition-colors"
                />
                <button
                  type="submit"
                  className="px-8 py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-mono text-xs tracking-[0.25em] font-semibold transition-colors cursor-pointer flex items-center justify-center space-x-2 shrink-0 shadow-2xl"
                >
                  <span>REQUEST</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* TIMEPIECE SPECIFICATIONS MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedWatchModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-zinc-950 border border-zinc-800 rounded-3xl max-w-lg w-full p-8 space-y-6 text-slate-100 relative shadow-2xl"
            >
              <div className="flex justify-between items-start border-b border-zinc-800 pb-4">
                <div>
                  <span className="font-mono text-xs text-amber-400 tracking-widest">{selectedWatchModal.ref}</span>
                  <h3 className="font-serif text-3xl tracking-widest font-light">{selectedWatchModal.name}</h3>
                </div>
                <button
                  onClick={() => setSelectedWatchModal(null)}
                  className="text-zinc-500 hover:text-white font-mono text-xl cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <p className="font-sans text-xs md:text-sm text-zinc-300 leading-relaxed font-light">
                {selectedWatchModal.description}
              </p>

              <div className="space-y-3 font-mono text-xs">
                <div className="text-amber-400 tracking-widest uppercase font-semibold">HOROLOGICAL SPECIFICATIONS</div>
                {selectedWatchModal.specs.map((s) => (
                  <div key={s.label} className="flex justify-between py-1.5 border-b border-zinc-900 text-zinc-400">
                    <span>{s.label}</span>
                    <span className="text-slate-100 font-medium">{s.value}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setSelectedWatchModal(null)}
                className="w-full py-3.5 rounded-xl bg-amber-400 text-black font-mono text-xs font-semibold tracking-[0.25em] hover:bg-amber-300 transition-colors cursor-pointer shadow-lg"
              >
                CLOSE DOSSIER
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
