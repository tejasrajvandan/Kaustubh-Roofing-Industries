import React, { useEffect, useState } from 'react';
import { ArrowUp, MessageCircle, PhoneCall } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { CustomizerTab } from '../types/site';

interface FloatingActionsProps {
  whatsappNumber: string;
  onNavigateToContact: () => void;
  onOpenCustomizer: (tab: CustomizerTab) => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  whatsappNumber,
  onNavigateToContact,
  onOpenCustomizer,
}) => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showWhatsappPrompt, setShowWhatsappPrompt] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 480);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sanitizedWhatsapp = whatsappNumber.replace(/[^\d]/g, '');
  const whatsappHref = sanitizedWhatsapp
    ? `https://wa.me/${sanitizedWhatsapp}?text=${encodeURIComponent(
        'Hello Kaustubh Roofing Industries Pvt. Ltd., I would like to discuss an industrial roofing requirement.'
      )}`
    : '';

  return (
    <div className="fixed bottom-4 right-4 z-30 flex flex-col items-end gap-2.5 sm:bottom-6 sm:right-6">
      {/* Unconfigured WhatsApp Helper Popover */}
      <AnimatePresence>
        {showWhatsappPrompt && !sanitizedWhatsapp && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.16 }}
            className="mb-1 w-72 rounded-lg border border-slate-200 bg-white p-4 shadow-xl"
          >
            <p className="font-display text-xs font-bold text-[#10263D]">
              WhatsApp Number Configurable
            </p>
            <p className="mt-1 text-xs leading-relaxed text-[#52606D]">
              No WhatsApp number has been invented for this demo. Configure the
              official number to activate live WhatsApp chat.
            </p>
            <div className="mt-3 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowWhatsappPrompt(false)}
                className="rounded px-2.5 py-1 text-xs font-medium text-[#52606D] hover:bg-slate-100"
              >
                Dismiss
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowWhatsappPrompt(false);
                  onOpenCustomizer('contact');
                }}
                className="rounded bg-[#10263D] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#183654]"
              >
                Set Number
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-2.5">
        {/* Back to Top Button */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              type="button"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.16 }}
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="flex h-11 w-11 items-center justify-center rounded-md border border-slate-200 bg-white text-[#10263D] shadow-md transition-colors hover:bg-[#F4F6F8] focus-visible:outline-2 focus-visible:outline-[#F28C28]"
            >
              <ArrowUp className="h-4 w-4" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Mobile-Friendly Fixed Contact CTA (Compact, <15% Sticky Viewport Budget) */}
        <button
          type="button"
          onClick={onNavigateToContact}
          className="inline-flex sm:hidden h-11 items-center gap-1.5 rounded-md bg-[#10263D] px-3.5 text-xs font-bold text-white shadow-md whitespace-nowrap shrink-0"
        >
          <PhoneCall className="h-3.5 w-3.5 text-[#F28C28]" />
          <span>Enquire</span>
        </button>

        {/* Floating WhatsApp Enquiry Button */}
        {sanitizedWhatsapp ? (
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="inline-flex h-11 items-center gap-2 rounded-md bg-[#15803d] px-4 text-xs font-bold text-white shadow-md whitespace-nowrap shrink-0 transition-colors hover:bg-[#166534] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#15803d]"
          >
            <MessageCircle className="h-4 w-4" />
            <span className="hidden sm:inline">WhatsApp Enquiry</span>
          </a>
        ) : (
          <button
            type="button"
            onClick={() => setShowWhatsappPrompt((prev) => !prev)}
            aria-label="WhatsApp Enquiry — Configure official WhatsApp number"
            className="inline-flex h-11 items-center gap-2 rounded-md bg-[#15803d] px-4 text-xs font-bold text-white shadow-md whitespace-nowrap shrink-0 transition-colors hover:bg-[#166534] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#15803d]"
          >
            <MessageCircle className="h-4 w-4" />
            <span className="hidden sm:inline">WhatsApp Enquiry</span>
          </button>
        )}
      </div>
    </div>
  );
};
