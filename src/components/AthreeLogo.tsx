import React from 'react';
import { Link } from 'react-router-dom';

interface AthreeLogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const AthreeLogo: React.FC<AthreeLogoProps> = ({
  variant = 'light',
  className = '',
  size = 'md'
}) => {
  const logoPath = "/assets/aistudio/ChatGPT_Image_Oct_22__2026__03_52_56_PM_bde6a733.jpg";

  // Responsive size presets tailored for header and footer prominence
  const sizeClasses = {
    sm: "h-8 xs:h-9 sm:h-10 md:h-11 max-w-[180px] xs:max-w-[210px] sm:max-w-[240px]",
    md: "h-10 xs:h-12 sm:h-14 md:h-15 lg:h-16 xl:h-17 max-w-[210px] xs:max-w-[250px] sm:max-w-[300px] md:max-w-[330px] lg:max-w-[370px]",
    lg: "h-12 xs:h-14 sm:h-16 md:h-18 lg:h-20 max-w-[240px] xs:max-w-[280px] sm:max-w-[340px] md:max-w-[400px]"
  };

  return (
    <Link
      to="/"
      className={`inline-flex items-center shrink-0 group transition-all duration-200 hover:opacity-95 ${className}`}
      aria-label="Athree Hospital - Experience The Excellence"
    >
      <div
        className={`flex items-center justify-center transition-all ${
          variant === 'dark'
            ? 'bg-white rounded-xl p-2 sm:p-2.5 shadow-sm border border-slate-200/60'
            : 'py-0.5'
        }`}
      >
        <img
          src={logoPath}
          alt="Athree Hospital – Experience The Excellence, A Unit of Sri Srinivasa Therapeutic Services Pvt Ltd"
          decoding="async"
          loading="eager"
          width="370"
          height="92"
          className={`w-auto object-contain transition-transform duration-200 group-hover:scale-[1.01] ${sizeClasses[size]}`}
          style={{ aspectRatio: '370 / 92' }}
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.currentTarget;
            target.onerror = null;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent) {
              const textNode = document.createElement('div');
              textNode.className = 'font-extrabold text-base sm:text-xl text-blue-900 tracking-tight whitespace-nowrap flex flex-col';
              textNode.innerHTML = `
                <span class="text-blue-900 font-black tracking-wider text-sm sm:text-lg">ATHREE HOSPITAL</span>
                <span class="text-cyan-600 font-semibold text-[10px] sm:text-xs tracking-normal">Experience The Excellence</span>
              `;
              parent.appendChild(textNode);
            }
          }}
        />
      </div>
    </Link>
  );
};
