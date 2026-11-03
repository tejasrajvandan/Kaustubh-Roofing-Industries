import React, { useState } from 'react';
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Compass,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { motion } from 'motion/react';
import { SITE_IMAGES } from '../data/siteData';
import { IndustrialImage } from './IndustrialImage';

interface AboutSectionProps {
  verifiedAddress: string;
  showVerificationNotes: boolean;
  onNavigateToContact: () => void;
}

const HIGHLIGHTS = [
  {
    title: 'Quality-Focused Approach',
    description: 'Attention to structural fit, durable materials, and clean roof detailing.',
    icon: ShieldCheck,
  },
  {
    title: 'Industrial Applications',
    description: 'Tailored for manufacturing sheds, storage hubs, and commercial spans.',
    icon: Building2,
  },
  {
    title: 'Professional Execution',
    description: 'Planned site coordination from initial measurement to roof completion.',
    icon: Compass,
  },
  {
    title: 'Customer-Oriented Service',
    description: 'Responsive communication aligned with operational facility schedules.',
    icon: Users,
  },
];

export const AboutSection: React.FC<AboutSectionProps> = ({
  verifiedAddress,
  showVerificationNotes,
  onNavigateToContact,
}) => {
  const [showMoreProfile, setShowMoreProfile] = useState(false);

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-white py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Architectural Project Photograph + Floating Information Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col lg:col-span-6"
          >
            <div className="relative h-80 sm:h-96 lg:h-full min-h-[380px] w-full overflow-hidden rounded-lg border border-slate-200 bg-[#10263D]">
              <IndustrialImage
                src={SITE_IMAGES.about}
                alt="Industrial building featuring galvanized steel roof trusses and ribbed metal roofing sheets"
                className="h-full w-full object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#0A1929]/55 via-transparent to-transparent"
                aria-hidden="true"
              />
            </div>

            {/* Floating Information Card: "Industrial Roofing Solutions" */}
            <div className="relative -mt-12 mx-4 sm:mx-0 sm:absolute sm:bottom-6 sm:left-6 sm:mt-0 max-w-xs rounded-md border border-white/15 bg-[#10263D] p-5 text-white shadow-xl">
              <div className="flex items-center gap-3">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-[#F28C28]/15 text-[#F28C28]"
                  aria-hidden="true"
                >
                  <Building2 className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-sm font-bold tracking-tight text-white">
                    Industrial Roofing Solutions
                  </p>
                  <p className="mt-0.5 text-xs text-slate-300">
                    Talwade · Pimpri-Chinchwad
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Company Positioning & Feature Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center lg:col-span-6"
          >
            <div className="flex items-center gap-3 text-xs font-semibold text-[#52606D]">
              <span className="font-mono text-[#de7a18] tabular-nums">01</span>
              <span aria-hidden="true">·</span>
              <span>About Kaustubh Roofing Industries Pvt. Ltd.</span>
            </div>

            <h2
              id="about-heading"
              className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#10263D]"
            >
              Engineering Protection. Delivering Confidence.
            </h2>

            <p className="mt-5 text-base leading-relaxed text-[#3E4C59]">
              Kaustubh Roofing Industries Pvt. Ltd. is an industrial roofing
              business based in Talwade, Pimpri-Chinchwad, Maharashtra. We aim to
              provide professional roofing solutions that help businesses create
              protected, functional and dependable industrial spaces.
            </p>

            {/* Four Feature Highlights — Clean 2x2 Structural Hairline Grid */}
            <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-6 border-y border-slate-200 py-7 sm:grid-cols-2">
              {HIGHLIGHTS.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div key={item.title} className="flex items-start gap-3.5">
                    <span
                      className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#F4F6F8] text-[#10263D]"
                      aria-hidden="true"
                    >
                      <IconComponent className="h-4 w-4 text-[#de7a18]" />
                    </span>
                    <div>
                      <h3 className="font-display text-sm font-bold text-[#10263D]">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-[#52606D]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {showVerificationNotes && (
              <p className="mt-4 text-xs text-[#616E7C]">
                Proposed brand positioning statements prepared for corporate review
                prior to publication.
              </p>
            )}

            {/* CTA: Know More About Us + Expandable Verified Company Brief */}
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => setShowMoreProfile((prev) => !prev)}
                aria-expanded={showMoreProfile}
                className="inline-flex min-h-11 items-center gap-2 rounded-md bg-[#10263D] px-5 py-2.5 text-sm font-semibold text-white whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#183654] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#10263D]"
              >
                <span>Know More About Us</span>
                {showMoreProfile ? (
                  <ChevronUp className="h-4 w-4 text-[#F28C28]" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-[#F28C28]" />
                )}
              </button>

              <button
                type="button"
                onClick={onNavigateToContact}
                className="inline-flex min-h-11 items-center gap-1.5 px-2 py-2 text-sm font-semibold text-[#10263D] hover:text-[#de7a18] whitespace-nowrap shrink-0 transition-colors"
              >
                <span>Schedule Site Discussion</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {showMoreProfile && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-5 rounded-md border border-slate-200 bg-[#F4F6F8] p-5 text-sm text-[#3E4C59]"
              >
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#de7a18]" />
                  <div className="space-y-2">
                    <p className="font-semibold text-[#10263D]">
                      Verified Corporate Location &amp; Service Corridor
                    </p>
                    <p className="text-xs leading-relaxed text-[#52606D]">
                      Registered Base: {verifiedAddress} Positioned within the
                      Talwade–Chakan–Pimpri-Chinchwad industrial belt to support
                      manufacturing units, warehouses, engineering contractors, and
                      commercial property owners.
                    </p>
                    <p className="text-xs text-[#616E7C]">
                      Additional credentials such as establishment year, GST/CIN
                      details, and client references can be inserted upon management
                      confirmation.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
