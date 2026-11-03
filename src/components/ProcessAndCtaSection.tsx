import React from 'react';
import { ArrowRight, PhoneCall } from 'lucide-react';
import { motion } from 'motion/react';
import { SITE_IMAGES, WORK_PROCESS_STEPS } from '../data/siteData';
import { IndustrialImage } from './IndustrialImage';

interface ProcessAndCtaSectionProps {
  onRequestQuote: () => void;
  onContactTeam: () => void;
}

export const ProcessAndCtaSection: React.FC<ProcessAndCtaSectionProps> = ({
  onRequestQuote,
  onContactTeam,
}) => {
  return (
    <>
      {/* Section 10: Our Work Process */}
      <section
        id="process"
        aria-labelledby="process-heading"
        className="bg-white py-20 lg:py-28 border-t border-slate-200/80"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 text-xs font-semibold text-[#52606D]">
              <span className="font-mono text-[#de7a18] tabular-nums">06</span>
              <span aria-hidden="true">·</span>
              <span>Structured Engagement Workflow</span>
            </div>

            <h2
              id="process-heading"
              className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#10263D]"
            >
              Our Work Process
            </h2>

            <p className="mt-3 text-base text-[#3E4C59]">
              A straightforward four-stage workflow from initial requirement
              discussion to site execution.
            </p>
          </div>

          {/* Horizontal Four-Step Process Timeline */}
          <div className="relative mt-14">
            {/* Desktop Connecting Line */}
            <div
              className="pointer-events-none absolute top-7 left-0 right-0 hidden h-[1px] bg-slate-200 lg:block"
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {WORK_PROCESS_STEPS.map((step, idx) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{
                    duration: 0.45,
                    delay: idx * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative flex flex-col"
                >
                  {/* Step Number Node */}
                  <div className="relative z-10 flex items-center gap-4">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-[#10263D] font-mono text-base font-semibold text-[#F28C28] tabular-nums shadow-xs">
                      {step.number}
                    </span>
                    <span className="h-[2px] flex-1 bg-slate-200 lg:hidden" aria-hidden="true" />
                  </div>

                  {/* Step Content Card */}
                  <div className="mt-6 flex-1 rounded-lg border border-slate-200 bg-[#F4F6F8]/70 p-6">
                    <h3 className="font-display text-lg font-bold text-[#10263D]">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#52606D]">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 11: Strong Full-Width Call-to-Action */}
      <section
        aria-labelledby="cta-banner-heading"
        className="relative overflow-hidden bg-[#10263D] py-20 lg:py-24"
      >
        {/* Background Industrial Roofing Image + Measured Navy Scrim */}
        <div className="absolute inset-0 z-0">
          <IndustrialImage
            src={SITE_IMAGES.warehouse}
            alt="Long-span steel warehouse roofing structure"
            className="h-full w-full object-cover object-center"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#0A1929]/95 via-[#10263D]/90 to-[#10263D]/80"
            aria-hidden="true"
          />
        </div>

        {/* Architectural Top Orange Accent Bar */}
        <div
          className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#F28C28] via-[#F28C28]/70 to-transparent"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-[0.14em] text-[#F28C28]">
                INDUSTRIAL &amp; COMMERCIAL ENQUIRIES
              </p>
              <h2
                id="cta-banner-heading"
                className="mt-3 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white"
              >
                Planning a New Roofing Project?
              </h2>
              <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-200 tracking-[0.01em]">
                Let&apos;s discuss your industrial roofing requirements and
                explore the right solution for your facility.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <button
                type="button"
                onClick={onRequestQuote}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#F28C28] px-6 py-3.5 text-sm font-bold text-[#10263D] whitespace-nowrap shrink-0 transition-all duration-150 hover:bg-[#ffa042] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F28C28]"
              >
                <span>Request a Quote</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={onContactTeam}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-white/35 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white whitespace-nowrap shrink-0 backdrop-blur-xs transition-colors duration-150 hover:border-white/70 hover:bg-white/18 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <PhoneCall className="h-4 w-4 text-[#F28C28]" />
                <span>Contact Our Team</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
