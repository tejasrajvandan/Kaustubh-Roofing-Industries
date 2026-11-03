import React from 'react';
import { Factory, Handshake, Layers, Wrench } from 'lucide-react';
import { motion } from 'motion/react';
import { WHY_CHOOSE_US_ITEMS } from '../data/siteData';

const ICONS = [Layers, Wrench, Factory, Handshake];

export const WhyChooseUsSection: React.FC = () => {
  return (
    <section
      id="why-us"
      aria-labelledby="why-us-heading"
      className="relative overflow-hidden bg-[#10263D] py-20 lg:py-28 text-white"
    >
      {/* Subtle Architectural Roofline SVG Accent in Top-Right Corner */}
      <svg
        viewBox="0 0 420 140"
        fill="none"
        className="pointer-events-none absolute top-0 right-0 h-36 w-auto opacity-10"
        aria-hidden="true"
      >
        <path
          d="M0 140L110 40L210 110L340 16L420 75"
          stroke="#F28C28"
          strokeWidth="2"
        />
        <path
          d="M40 140L150 40L250 110L380 16"
          stroke="#FFFFFF"
          strokeWidth="1"
        />
      </svg>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 text-xs font-semibold text-slate-300">
            <span className="font-mono text-[#F28C28] tabular-nums">03</span>
            <span aria-hidden="true">·</span>
            <span>Core Operational Principles</span>
          </div>

          <h2
            id="why-us-heading"
            className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight text-white"
          >
            Why Businesses Choose Professional Roofing Solutions
          </h2>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300 tracking-[0.01em]">
            Industrial roofs safeguard production machinery, raw materials, and
            workforce operations. A structured approach helps align roof selection
            with practical facility needs.
          </p>
        </div>

        {/* Four Feature Blocks — Architectural Hairline Matrix */}
        <div className="mt-14 grid grid-cols-1 divide-y divide-white/12 rounded-lg border border-white/12 bg-[#0A1929]/45 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
          {WHY_CHOOSE_US_ITEMS.map((item, idx) => {
            const IconComponent = ICONS[idx % ICONS.length];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.45,
                  delay: idx * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative flex flex-col justify-between p-7 sm:p-8 transition-colors duration-200 hover:bg-white/[0.04]"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span
                      className="flex h-11 w-11 items-center justify-center rounded-md border border-white/15 bg-white/5 text-[#F28C28] transition-colors duration-200 group-hover:border-[#F28C28]/50 group-hover:bg-[#F28C28]/15"
                      aria-hidden="true"
                    >
                      <IconComponent className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-xs font-medium text-slate-400 tabular-nums">
                      {item.index}
                    </span>
                  </div>

                  <h3 className="mt-7 font-display text-lg font-bold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-slate-300 tracking-[0.01em]">
                    {item.description}
                  </p>
                </div>

                <div
                  className="mt-7 h-[2px] w-8 bg-white/15 transition-all duration-200 group-hover:w-14 group-hover:bg-[#F28C28]"
                  aria-hidden="true"
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
