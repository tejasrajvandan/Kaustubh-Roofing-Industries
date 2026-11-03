import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { BrandMark } from './BrandMark';

interface NavbarProps {
  onNavigateToContact: (servicePreselect?: string) => void;
}

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Industries', href: '#industries' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ onNavigateToContact }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 32);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-200 ${
        isScrolled || mobileMenuOpen
          ? 'border-b border-slate-200 bg-white/98 shadow-xs backdrop-blur-md'
          : 'border-b border-white/10 bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-14 md:h-20 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand Lockup */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F28C28] rounded-sm shrink-0"
          aria-label="Kaustubh Roofing Industries Pvt. Ltd. — Home"
        >
          <BrandMark
            variant={isScrolled || mobileMenuOpen ? 'dark' : 'light'}
            showSubtitle={true}
          />
        </a>

        {/* Zone 2: Primary Desktop Navigation */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-7"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`relative py-1 text-sm font-semibold whitespace-nowrap shrink-0 transition-colors duration-150 after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] after:origin-left after:scale-x-0 after:bg-[#F28C28] after:transition-transform after:duration-200 hover:after:scale-x-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F28C28] ${
                isScrolled
                  ? 'text-[#202A35] hover:text-[#10263D]'
                  : 'text-white/90 hover:text-white'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onNavigateToContact()}
            className="hidden sm:inline-flex items-center justify-center rounded-md bg-[#F28C28] px-5 py-2.5 text-sm font-bold text-[#10263D] whitespace-nowrap shrink-0 transition-all duration-150 hover:bg-[#ffa042] active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F28C28]"
          >
            Get a Free Consultation
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-md lg:hidden transition-colors focus-visible:outline-2 focus-visible:outline-[#F28C28] ${
              isScrolled || mobileMenuOpen
                ? 'text-[#10263D] hover:bg-slate-100'
                : 'text-white hover:bg-white/10'
            }`}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="border-b border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl lg:hidden"
          >
            <nav aria-label="Mobile Navigation" className="flex flex-col divide-y divide-slate-100">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="flex min-h-11 items-center justify-between py-2.5 text-base font-semibold text-[#10263D] hover:text-[#de7a18] transition-colors"
                >
                  <span>{item.label}</span>
                </a>
              ))}
            </nav>

            <div className="mt-5 pt-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateToContact();
                }}
                className="flex w-full min-h-12 items-center justify-center rounded-md bg-[#F28C28] px-5 py-3 text-sm font-bold text-[#10263D] transition-colors hover:bg-[#ffa042]"
              >
                Get a Free Consultation
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
