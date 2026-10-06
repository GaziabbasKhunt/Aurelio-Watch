import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail } from 'lucide-react';

export function BoutiquesSection() {
  const boutiques = [
    {
      city: 'GENÈVE',
      address: 'Rue du Rhône 42, 1204 Genève, Switzerland',
      phone: '+41 22 819 9000',
      type: 'WORLD FLAGSHIP & MANUFACTURE ATELIER'
    },
    {
      city: 'NEW YORK',
      address: '48 East 57th Street, New York, NY 10022',
      phone: '+1 (212) 719-5887',
      type: 'NORTH AMERICAN FLAGSHIP SALON'
    },
    {
      city: 'PARIS',
      address: 'Place Vendôme 18, 75001 Paris, France',
      phone: '+33 1 42 61 58 87',
      type: 'HAUTE HORLOGERIE SALON'
    },
    {
      city: 'DUBAI',
      address: 'The Dubai Mall, Fashion Avenue, Dubai, UAE',
      phone: '+971 4 330 8888',
      type: 'MIDDLE EAST FLAGSHIP BOUTIQUE'
    }
  ];

  return (
    <section id="boutiques" className="relative w-full py-28 bg-[#050608] text-slate-100 border-t border-zinc-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <span className="font-mono text-xs tracking-[0.4em] text-amber-400 uppercase font-semibold">
            GLOBAL PRESENCE
          </span>
          <h2 className="text-4xl md:text-6xl font-serif tracking-[0.25em] font-light uppercase">
            FLAGSHIP BOUTIQUES
          </h2>
          <p className="font-sans text-sm md:text-base text-zinc-400 max-w-2xl mx-auto tracking-widest font-light">
            Experience our master complications in person at our world flagships.
          </p>
        </div>

        {/* Grid Layout: Geneva Flagship Exterior Photo + Boutique List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Geneva Boutique Facade */}
          <div className="lg:col-span-6 h-[480px] rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-950 relative group shadow-2xl">
            <img
              src="./images/boutique-geneva.jpg"
              alt="Geneva Flagship Boutique Exterior"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 font-mono text-xs text-zinc-300 space-y-1">
              <span className="text-amber-400 tracking-widest block uppercase font-semibold">GENÈVE FLAGSHIP & MANUFACTURE</span>
              <p className="text-zinc-400 text-[11px] font-sans">
                Located on the iconic Rue du Rhône, featuring private horological consultation suites.
              </p>
            </div>
          </div>

          {/* Right Column: Boutique List Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {boutiques.map((b) => (
              <div
                key={b.city}
                className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 hover:border-amber-400/40 transition-all duration-300 space-y-3"
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-serif text-2xl tracking-widest text-slate-100 uppercase font-light">
                    {b.city}
                  </h3>
                  <MapPin className="w-4 h-4 text-amber-400" />
                </div>
                <span className="font-mono text-[10px] text-amber-400 tracking-widest uppercase block font-semibold">
                  {b.type}
                </span>
                <p className="font-mono text-xs text-zinc-400 leading-relaxed">
                  {b.address}
                </p>
                <div className="pt-2 flex items-center space-x-2 font-mono text-xs text-zinc-500">
                  <Phone className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{b.phone}</span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
