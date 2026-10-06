import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function CategoryBanners() {
  const categories = [
    {
      title: 'HIGH HORLOGERIE TIMEPIECES',
      subtitle: 'Complicated skeleton movements & grand complications',
      image: './images/hero-watch.jpg',
      cta: 'DISCOVER TIMEPIECES',
      href: '#collection'
    },
    {
      title: 'HYPERCAR PARTNERSHIPS',
      subtitle: 'Engineered in collaboration with hypercar constructors',
      image: './images/partnership-hypercar.jpg',
      cta: 'DISCOVER PARTNERSHIPS',
      href: '#partnerships'
    }
  ];

  return (
    <section className="relative w-full py-16 bg-[#050608] space-y-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((cat, idx) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: idx * 0.2 }}
            className="relative h-[480px] rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-950 group cursor-pointer"
            onClick={() => {
              const el = document.querySelector(cat.href);
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {/* Background Image with Zoom on Hover */}
            <img
              src={cat.image}
              alt={cat.title}
              className="w-full h-full object-cover opacity-80 transition-transform duration-1000 group-hover:scale-108"
            />

            {/* Dark Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-black/40 to-transparent" />

            {/* Banner Text Overlay */}
            <div className="absolute bottom-8 left-8 right-8 space-y-3 z-10">
              <span className="font-mono text-xs text-amber-400 tracking-[0.3em] uppercase block font-semibold">
                CATEGORY {idx + 1}
              </span>
              <h3 className="font-serif text-3xl md:text-4xl text-slate-100 uppercase tracking-wider font-light">
                {cat.title}
              </h3>
              <p className="font-sans text-xs md:text-sm text-zinc-400 font-light">
                {cat.subtitle}
              </p>

              <div className="pt-2 flex items-center space-x-3 text-amber-300 font-mono text-xs tracking-[0.2em] group-hover:text-amber-200">
                <span>{cat.cta}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
