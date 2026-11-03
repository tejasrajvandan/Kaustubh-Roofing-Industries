import React from 'react';
import { ArrowUpRight, PencilLine } from 'lucide-react';
import { motion } from 'motion/react';
import { CustomizerTab, ServiceItem } from '../types/site';
import { IndustrialImage } from './IndustrialImage';

interface SolutionsSectionProps {
  services: ServiceItem[];
  showVerificationNotes: boolean;
  onSelectService: (service: ServiceItem) => void;
  onOpenCustomizer: (tab: CustomizerTab) => void;
}

export const SolutionsSection: React.FC<SolutionsSectionProps> = ({
  services,
  showVerificationNotes,
  onSelectService,
  onOpenCustomizer,
}) => {
  return (
    <section
      id="solutions"
      aria-labelledby="solutions-heading"
      className="bg-[#F4F6F8] py-20 lg:py-28 border-t border-slate-200/80"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 text-xs font-semibold text-[#52606D]">
              <span className="font-mono text-[#de7a18] tabular-nums">02</span>
              <span aria-hidden="true">·</span>
              <span>Proposed Service Portfolio</span>
            </div>

            <h2
              id="solutions-heading"
              className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#10263D]"
            >
              Our Roofing Solutions
            </h2>

            <p className="mt-3 text-base text-[#3E4C59]">
              Explore roofing solutions designed for industrial and commercial
              applications.
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2">
            <button
              type="button"
              onClick={() => onOpenCustomizer('services')}
              className="inline-flex min-h-10 items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-[#10263D] whitespace-nowrap shrink-0 transition-colors hover:border-[#10263D] hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-[#F28C28]"
            >
              <PencilLine className="h-3.5 w-3.5 text-[#de7a18]" />
              <span>Edit Service Cards</span>
            </button>
            {showVerificationNotes && (
              <p className="text-xs text-[#616E7C]">
                Proposed categories · Confirm actual offerings before publication
              </p>
            )}
          </div>
        </div>

        {/* 6 Service Cards Grid */}
        <div className="mt-12 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, idx) => (
            <motion.article
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.45,
                delay: idx * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              onClick={() => onSelectService(service)}
              className="group flex cursor-pointer flex-col overflow-hidden rounded-lg border border-slate-200/90 bg-white transition-transform duration-200 hover:-translate-y-1"
            >
              {/* Card Image with Hover Zoom */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#10263D]">
                <IndustrialImage
                  src={service.image}
                  alt={service.imageAlt}
                  fallbackLabel={service.title}
                  className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#0A1929]/50 via-transparent to-transparent"
                  aria-hidden="true"
                />
                <span className="absolute bottom-3 left-4 font-mono text-xs font-semibold text-white/90 tabular-nums">
                  {service.number}.
                </span>
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-lg font-bold text-[#10263D] group-hover:text-[#de7a18] transition-colors">
                      {service.title}
                    </h3>
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#F4F6F8] text-[#10263D] transition-colors duration-150 group-hover:bg-[#F28C28] group-hover:text-[#10263D]"
                      aria-hidden="true"
                    >
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>

                  <p className="mt-2.5 text-sm leading-relaxed text-[#52606D]">
                    {service.description}
                  </p>
                </div>

                <div className="mt-6 border-t border-slate-100 pt-4">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectService(service);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#10263D] group-hover:text-[#de7a18] whitespace-nowrap shrink-0 transition-colors focus-visible:outline-2 focus-visible:outline-[#F28C28]"
                  >
                    <span>Explore Service</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
