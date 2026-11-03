import React from 'react';
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  SlidersHorizontal,
} from 'lucide-react';
import { CompanyConfig, CustomizerTab, ServiceItem } from '../types/site';
import { BrandMark } from './BrandMark';

interface FooterProps {
  config: CompanyConfig;
  services: ServiceItem[];
  onSelectService: (service: ServiceItem) => void;
  onOpenCustomizer: (tab: CustomizerTab) => void;
}

const QUICK_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Industries', href: '#industries' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export const Footer: React.FC<FooterProps> = ({
  config,
  services,
  onSelectService,
  onOpenCustomizer,
}) => {
  const handleSmoothNav = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const socialItems = [
    {
      label: 'LinkedIn',
      url: config.linkedinUrl,
      icon: Linkedin,
    },
    {
      label: 'Facebook',
      url: config.facebookUrl,
      icon: Facebook,
    },
    {
      label: 'Instagram',
      url: config.instagramUrl,
      icon: Instagram,
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#0A1929] text-slate-300 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Column 1: Brand & Description */}
          <div className="lg:col-span-4">
            <a
              href="#home"
              onClick={(e) => handleSmoothNav(e, '#home')}
              className="inline-block focus-visible:outline-2 focus-visible:outline-[#F28C28]"
            >
              <BrandMark variant="light" showSubtitle={true} />
            </a>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
              Industrial and commercial roofing solutions provider based in
              Talwade, Pimpri-Chinchwad, Maharashtra. Supporting factories,
              warehouses, and commercial structures.
            </p>

            {/* Configurable Social Media Icons */}
            <div className="mt-6 flex items-center gap-3">
              {socialItems.map((social) => {
                const IconComponent = social.icon;
                if (social.url) {
                  return (
                    <a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${config.companyName} on ${social.label}`}
                      className="flex h-9 w-9 items-center justify-center rounded-md border border-white/12 bg-white/5 text-slate-300 transition-colors hover:border-[#F28C28] hover:text-[#F28C28]"
                    >
                      <IconComponent className="h-4 w-4" />
                    </a>
                  );
                }
                return (
                  <button
                    key={social.label}
                    type="button"
                    onClick={() => onOpenCustomizer('contact')}
                    title={`Configure ${social.label} link in Demo Customizer`}
                    aria-label={`Configure ${social.label} profile URL`}
                    className="flex h-9 w-9 items-center justify-center rounded-md border border-white/12 bg-white/5 text-slate-400 transition-colors hover:border-[#F28C28] hover:text-[#F28C28]"
                  >
                    <IconComponent className="h-4 w-4" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-sm font-bold text-white">
              Quick Navigation
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {QUICK_LINKS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => handleSmoothNav(e, item.href)}
                    className="text-slate-400 transition-colors hover:text-[#F28C28]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Roofing Solutions */}
          <div className="lg:col-span-3">
            <h3 className="font-display text-sm font-bold text-white">
              Roofing Solutions
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {services.map((service) => (
                <li key={service.id}>
                  <button
                    type="button"
                    onClick={() => onSelectService(service)}
                    className="text-left text-slate-400 transition-colors hover:text-[#F28C28]"
                  >
                    {service.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Verified Address & Editable Contact Placeholders */}
          <div className="lg:col-span-3">
            <h3 className="font-display text-sm font-bold text-white">
              Contact Details
            </h3>
            <div className="mt-4 space-y-3.5 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-[#F28C28]" />
                <span className="leading-relaxed text-slate-400">
                  {config.verifiedAddress}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-[#F28C28]" />
                {config.phone ? (
                  <a
                    href={`tel:${config.phone.replace(/\s+/g, '')}`}
                    className="text-slate-300 hover:text-[#F28C28] tabular-nums"
                  >
                    {config.phone}
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => onOpenCustomizer('contact')}
                    className="text-left text-xs text-slate-400 underline decoration-dotted underline-offset-4 hover:text-white"
                  >
                    [Phone Placeholder — Click to Set]
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-[#F28C28]" />
                {config.email ? (
                  <a
                    href={`mailto:${config.email}`}
                    className="text-slate-300 hover:text-[#F28C28]"
                  >
                    {config.email}
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => onOpenCustomizer('contact')}
                    className="text-left text-xs text-slate-400 underline decoration-dotted underline-offset-4 hover:text-white"
                  >
                    [Email Placeholder — Click to Set]
                  </button>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onOpenCustomizer('contact')}
                  className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:border-[#F28C28] hover:text-[#F28C28]"
                >
                  <SlidersHorizontal className="h-3.5 w-3.5 text-[#F28C28]" />
                  <span>Customize Demo Content</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Row */}
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-7 text-xs text-slate-400 sm:flex-row sm:items-center">
          <p>© 2026 Kaustubh Roofing Industries Pvt. Ltd. All Rights Reserved.</p>
          <p className="text-slate-500">
            Corporate Website Presentation Demo · Verify Editable Placeholders Before Publishing
          </p>
        </div>
      </div>

      {/* Subtle Bottom Design Element Inspired by Industrial Sawtooth Roof Trusses */}
      <div className="w-full overflow-hidden opacity-25" aria-hidden="true">
        <svg
          viewBox="0 0 1440 36"
          fill="none"
          preserveAspectRatio="none"
          className="block h-6 w-full"
        >
          <path
            d="M0 36L120 8L240 36L360 8L480 36L600 8L720 36L840 8L960 36L1080 8L1200 36L1320 8L1440 36"
            stroke="#F28C28"
            strokeWidth="1.5"
          />
          <path d="M0 35H1440" stroke="#8B969F" strokeWidth="1" />
        </svg>
      </div>
    </footer>
  );
};
