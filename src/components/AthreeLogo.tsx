import React from 'react';
import { Link } from 'react-router-dom';

interface AthreeLogoProps {
  variant?: 'light' | 'dark';
  className?: string;
}

export const AthreeLogo: React.FC<AthreeLogoProps> = ({
  variant = 'light',
  className = ''
}) => {
  const logoPath = "/assets/aistudio/ChatGPT_Image_Oct_22__2026__03_52_56_PM_bde6a733.jpg";

  return (
    <Link
      to="/"
      className={`inline-flex items-center shrink group transition-opacity hover:opacity-95 ${className}`}
      aria-label="Athree Hospital Home"
    >
      <div className={`p-0.5 sm:p-1 rounded-lg transition-colors ${variant === 'dark' ? 'bg-white/95 p-1.5 shadow-sm' : ''}`}>
        <img
          src={logoPath}
          alt="Athree Hospital - Experience The Excellence"
          decoding="async"
          loading="eager"
          className="h-7 xs:h-9 sm:h-11 md:h-12 w-auto object-contain max-w-[150px] xs:max-w-[200px] sm:max-w-[260px] md:max-w-[280px] aspect-logo"
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.currentTarget;
            target.onerror = null;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent) {
              const textNode = document.createElement('div');
              textNode.className = 'font-bold text-sm sm:text-lg text-blue-900 tracking-tight whitespace-nowrap';
              textNode.innerText = 'ATHREE HOSPITAL';
              parent.appendChild(textNode);
            }
          }}
        />
      </div>
    </Link>
  );
};
