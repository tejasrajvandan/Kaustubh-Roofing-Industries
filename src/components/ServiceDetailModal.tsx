import React, { useEffect } from 'react';
import { ArrowRight, Check, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { ServiceItem } from '../types/site';
import { IndustrialImage } from './IndustrialImage';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onEnquireService: (serviceTitle: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onEnquireService,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (service) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [service, onClose]);

  return (
    <AnimatePresence>
      {service && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="service-modal-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0A1929]/75 backdrop-blur-xs"
            aria-hidden="true"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 12 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-slate-200 bg-white shadow-2xl"
          >
            <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-[#10263D]">
              <IndustrialImage
                src={service.image}
                alt={service.imageAlt}
                fallbackLabel={service.title}
                className="h-full w-full object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#0A1929]/85 via-[#0A1929]/30 to-transparent"
                aria-hidden="true"
              />
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-md bg-[#0A1929]/70 text-white transition-colors hover:bg-[#0A1929] focus-visible:outline-2 focus-visible:outline-[#F28C28]"
                aria-label="Close service details"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="absolute bottom-4 left-6 right-6">
                <p className="text-xs font-mono text-[#F28C28] tabular-nums">
                  {service.number}. Proposed Service Category
                </p>
                <h3
                  id="service-modal-title"
                  className="mt-1 font-display text-2xl font-bold text-white"
                >
                  {service.title}
                </h3>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <p className="text-base leading-relaxed text-[#202A35]">
                {service.description}
              </p>

              <div className="mt-6 border-t border-slate-200 pt-5">
                <p className="text-xs font-semibold text-[#52606D]">
                  Typical Facility Applications
                </p>
                <p className="mt-1 text-sm font-semibold text-[#10263D]">
                  {service.suitableSpaces}
                </p>
              </div>

              <div className="mt-5">
                <p className="text-xs font-semibold text-[#52606D]">
                  Illustrative Consultation &amp; Planning Points
                </p>
                <ul className="mt-3 space-y-2.5">
                  {service.proposedScopePoints.map((point, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-sm text-[#3E4C59]"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#de7a18]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-6 rounded-md bg-[#F4F6F8] p-3.5 text-xs text-[#616E7C]">
                Note: Service descriptions and scope items shown here are proposed
                placeholders for review and confirmation by Kaustubh Roofing
                Industries Pvt. Ltd. before publishing.
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="min-h-11 rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-[#202A35] hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const title = service.title;
                    onClose();
                    onEnquireService(title);
                  }}
                  className="inline-flex min-h-11 items-center gap-2 rounded-md bg-[#F28C28] px-5 py-2.5 text-sm font-bold text-[#10263D] hover:bg-[#ffa042] transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Enquire About {service.title}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
