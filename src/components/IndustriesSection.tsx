import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { INDUSTRIES_SERVED } from '../data/siteData';
import { IndustrialImage } from './IndustrialImage';

interface IndustriesSectionProps {
  onDiscussSector: (sectorTitle: string) => void;
}

export const IndustriesSection: React.FC<IndustriesSectionProps> = ({
  onDiscussSector,
}) => {
  return (
    <section
      id="industries"
      aria-labelledby="industries-heading"
      className="bg-white py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 text-xs font-semibold text-[#52606D]">
              <span className="font-mono text-[#de7a18] tabular-nums">04</span>
              <span aria-hidden="true">·</span>
              <span>Sectors &amp; Applications</span>
            </div>

            <h2
              id="industries-heading"
              className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#10263D]"
            >
              Industries We Serve
            </h2>
          </div>

          <p className="max-w-md text-sm leading-relaxed text-[#52606D]">
            Supporting manufacturing plants, logistics facilities, commercial
            developments, and industrial construction teams across Pune and
            Maharashtra.
          </p>
        </div>

        {/* Asymmetric Bento Visual Grid */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-12">
          {INDUSTRIES_SERVED.map((sector, idx) => {
            const colSpanClass = sector.featured
              ? 'lg:col-span-6 h-72 sm:h-80'
              : 'lg:col-span-3 h-64 sm:h-72';

            return (
              <motion.div
                key={sector.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.45,
                  delay: idx * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onClick={() => onDiscussSector(sector.title)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onDiscussSector(sector.title);
                  }
                }}
                aria-label={`Discuss roofing requirements for ${sector.title}`}
                className={`group relative cursor-pointer overflow-hidden rounded-lg bg-[#10263D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F28C28] ${colSpanClass}`}
              >
                <IndustrialImage
                  src={sector.image}
                  alt={sector.imageAlt}
                  fallbackLabel={sector.title}
                  className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                />

                {/* Measured Dark Navy Contrast Scrim */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#0A1929]/92 via-[#10263D]/40 to-[#0A1929]/15 transition-opacity duration-200 group-hover:opacity-95"
                  aria-hidden="true"
                />

                <div className="absolute inset-0 flex flex-col justify-between p-6">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-white/80 tabular-nums">
                      {sector.index}
                    </span>
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-md bg-white/10 text-white backdrop-blur-xs transition-colors duration-150 group-hover:bg-[#F28C28] group-hover:text-[#10263D]"
                      aria-hidden="true"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-white">
                      {sector.title}
                    </h3>
                    <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-200/90">
                      {sector.subtitle}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
