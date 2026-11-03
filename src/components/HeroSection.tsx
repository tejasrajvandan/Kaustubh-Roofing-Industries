import React from 'react';
import { ArrowRight, MapPin, SlidersHorizontal } from 'lucide-react';
import { motion } from 'motion/react';
import { SITE_IMAGES } from '../data/siteData';
import { CustomizerTab } from '../types/site';
import { IndustrialImage } from './IndustrialImage';

interface HeroSectionProps {
  shortLocation: string;
  onExploreSolutions: () => void;
  onRequestConsultation: () => void;
  onOpenCustomizer: (tab?: CustomizerTab) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  shortLocation,
  onExploreSolutions,
  onRequestConsultation,
  onOpenCustomizer,
}) => {
  return (
    <section
      id="home"
      aria-label="Hero Introduction"
      className="relative flex min-h-[88vh] lg:min-h-[92vh] flex-col justify-between overflow-hidden bg-[#0A1929]"
    >
      {/* Background Architectural Image with Subtle Entrance Scale */}
      <motion.div
        initial={{ scale: 1.05, opacity: 0.85 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0"
      >
        <IndustrialImage
          src={SITE_IMAGES.hero}
          alt="Modern industrial manufacturing warehouse featuring standing-seam metal roofing and structural steel framing"
          priority={true}
          className="h-full w-full object-cover object-center"
        />
        {/* Measured Contrast Scrim for Guaranteed WCAG AA+ Readability */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#0A1929]/95 via-[#10263D]/82 to-[#10263D]/45"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#0A1929] via-transparent to-[#0A1929]/50"
          aria-hidden="true"
        />
      </motion.div>

      {/* Main Hero Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-center px-4 pt-28 pb-16 sm:px-6 lg:px-8 lg:pt-36">
        <div className="max-w-3xl">
          {/* Supporting Label — Clean Unboxed Architectural Kicker with Orange Accent Line */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 flex items-center gap-3.5"
          >
            <span className="h-[2px] w-10 bg-[#F28C28] shrink-0" aria-hidden="true" />
            <p className="text-xs sm:text-[13px] font-semibold tracking-[0.14em] text-slate-200">
              INDUSTRIAL ROOFING SOLUTIONS <span className="mx-1.5 text-[#F28C28]">|</span> TALWADE, PUNE
            </p>
          </motion.div>

          {/* Primary Display Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(2.35rem,4.6vw,4rem)] font-extrabold leading-[1.08] tracking-tight text-white"
          >
            Reliable Roofing Solutions.{' '}
            <span className="text-white/95">Built for Industry.</span>
          </motion.h1>

          {/* Supporting Description */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-200/95 tracking-[0.01em]"
          >
            Smart, durable and professional roofing solutions designed to protect
            industrial spaces and support long-term business performance.
          </motion.p>

          {/* Dual CTA Actions */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <button
              type="button"
              onClick={onRequestConsultation}
              className="group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-md bg-[#F28C28] px-6 py-3.5 text-sm font-bold text-[#10263D] whitespace-nowrap shrink-0 transition-all duration-150 hover:bg-[#ffa042] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F28C28]"
            >
              <span>Request a Consultation</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" />
            </button>

            <button
              type="button"
              onClick={onExploreSolutions}
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/30 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white whitespace-nowrap shrink-0 backdrop-blur-xs transition-colors duration-150 hover:border-white/60 hover:bg-white/12 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Explore Our Solutions
            </button>
          </motion.div>
        </div>
      </div>

      {/* Bottom Architectural Metadata Strip */}
      <div className="relative z-10 border-t border-white/12 bg-[#0A1929]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-300">
            <span className="inline-flex items-center gap-1.5 font-medium text-white">
              <MapPin className="h-3.5 w-3.5 text-[#F28C28]" aria-hidden="true" />
              {shortLocation}
            </span>
            <span className="hidden sm:inline text-white/25" aria-hidden="true">
              ·
            </span>
            <span>Factories, Warehouses &amp; Commercial Structures</span>
          </div>

          <button
            type="button"
            onClick={() => onOpenCustomizer('contact')}
            className="inline-flex items-center gap-2 self-start sm:self-auto text-xs font-semibold text-slate-300 transition-colors hover:text-[#F28C28] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#F28C28]"
          >
            <SlidersHorizontal className="h-3.5 w-3.5 text-[#F28C28]" aria-hidden="true" />
            <span>Configure Demo Details</span>
          </button>
        </div>
      </div>
    </section>
  );
};
