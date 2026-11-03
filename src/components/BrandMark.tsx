import React from 'react';

interface BrandMarkProps {
  variant?: 'light' | 'dark';
  showSubtitle?: boolean;
}

export const BrandMark: React.FC<BrandMarkProps> = ({
  variant = 'light',
  showSubtitle = false,
}) => {
  const isLightText = variant === 'light';

  return (
    <span className="inline-flex items-center gap-3 whitespace-nowrap shrink-0 select-none">
      {/* Architectural Industrial Roofline Monogram */}
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-md border transition-colors ${
          isLightText
            ? 'border-white/20 bg-white/10'
            : 'border-[#10263D]/15 bg-[#10263D]'
        }`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
        >
          {/* Precision Double-Pitch Industrial Roofline */}
          <path
            d="M4 21L14.5 11.5L21.5 17.5L32 8.5"
            stroke="#F28C28"
            strokeWidth="2.75"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
          {/* Structural Truss & Base Chord */}
          <path
            d="M4 26.5H32M9.5 26.5V16.5M18 26.5V15M26.5 26.5V13.5"
            stroke="#FFFFFF"
            strokeWidth="1.75"
            strokeLinecap="square"
          />
        </svg>
      </span>

      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[15px] sm:text-base font-extrabold tracking-tight transition-colors ${
            isLightText ? 'text-white' : 'text-[#10263D]'
          }`}
        >
          KAUSTUBH ROOFING
        </span>
        {showSubtitle && (
          <span
            className={`mt-1 text-[10px] font-semibold tracking-[0.16em] ${
              isLightText ? 'text-slate-300' : 'text-[#52606D]'
            }`}
          >
            INDUSTRIES PVT. LTD.
          </span>
        )}
      </span>
    </span>
  );
};
