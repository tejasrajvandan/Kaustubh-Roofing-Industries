import React, { useState } from 'react';

interface IndustrialImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
  priority?: boolean;
}

export const IndustrialImage: React.FC<IndustrialImageProps> = ({
  src,
  alt,
  className = '',
  fallbackLabel = 'Industrial Roofing Architecture',
  priority = false,
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#10263D] via-[#183654] to-[#202A35] p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <svg
          viewBox="0 0 120 60"
          fill="none"
          className="mb-3 h-12 w-24 opacity-60"
          aria-hidden="true"
        >
          <path
            d="M6 46L38 18L64 38L102 10L114 20"
            stroke="#F28C28"
            strokeWidth="3"
          />
          <path
            d="M6 52H114"
            stroke="#8B969F"
            strokeWidth="2"
          />
        </svg>
        <span className="text-xs font-medium tracking-wide text-slate-300">
          {fallbackLabel}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      onError={() => setHasError(true)}
      className={className}
    />
  );
};
