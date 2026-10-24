import React from 'react';

export const LiquidMorphHeroBlobs: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Liquid Blob 1: Cyan/Teal Morphing Sphere */}
      <div
        className="absolute -top-10 -left-10 w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-tr from-cyan-500/25 via-sky-400/20 to-blue-600/15 blur-2xl animate-liquid-morph opacity-80"
        style={{ filter: 'blur(40px)' }}
      ></div>

      {/* Liquid Blob 2: Deep Blue/Indigo Morphing Fluid */}
      <div
        className="absolute top-1/3 -right-20 w-80 h-80 sm:w-[480px] sm:h-[480px] bg-gradient-to-br from-blue-600/20 via-indigo-500/20 to-cyan-400/15 blur-3xl animate-liquid-morph-slow opacity-75"
        style={{ filter: 'blur(50px)' }}
      ></div>

      {/* Liquid Blob 3: Center Accent Liquid Pulse */}
      <div
        className="absolute bottom-5 left-1/3 w-64 h-64 sm:w-80 sm:h-80 bg-gradient-to-r from-teal-400/15 via-blue-500/15 to-purple-600/10 blur-2xl animate-liquid-morph opacity-60"
        style={{ filter: 'blur(45px)' }}
      ></div>
    </div>
  );
};
