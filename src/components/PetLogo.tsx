import React from 'react';

interface PetLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
  variant?: 'encontrado' | 'found';
}

export const PetLogo: React.FC<PetLogoProps> = ({
  size = 'md',
  showTagline = true,
  className = '',
  variant = 'encontrado'
}) => {
  const iconSize = size === 'sm' ? 28 : size === 'lg' ? 46 : 36;

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* SVG Icon matching the Canva pin logo with dog/cat profile & paw */}
      <div 
        className="relative flex-shrink-0 flex items-center justify-center shadow-xs"
        style={{ width: iconSize, height: iconSize }}
      >
        <svg
          viewBox="0 0 100 115"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          {/* Outer Pin Shape */}
          <path
            d="M50 0C22.3858 0 0 22.3858 0 50C0 76.5 44 110 50 114C56 110 100 76.5 100 50C100 22.3858 77.6142 0 50 0Z"
            fill="url(#pin_gradient)"
          />
          {/* Inner Circle Glow */}
          <circle cx="50" cy="48" r="38" fill="#FDFBF7" />
          
          {/* Cute Pet Silhouette (Dog + Cat) in Natural Tones */}
          {/* Dog head silhouette */}
          <path
            d="M32 32C32 26 38 24 45 28C48 30 52 30 55 28C62 24 68 26 68 32C68 40 64 45 64 54C64 62 58 68 50 68C42 68 36 62 36 54C36 45 32 40 32 32Z"
            fill="#7A9D8C"
          />
          {/* Dog Floppy Ear left */}
          <path
            d="M32 32C28 35 24 44 26 50C28 54 32 52 34 46C35 42 34 36 32 32Z"
            fill="#658877"
          />
          {/* Dog Floppy Ear right */}
          <path
            d="M68 32C72 35 76 44 74 50C72 54 68 52 66 46C65 42 66 36 68 32Z"
            fill="#658877"
          />
          {/* Cat silhouette overlap in terracotta */}
          <path
            d="M52 46C52 42 56 38 60 40C62 41 65 39 67 43C69 47 68 52 68 56C68 62 64 66 58 66C54 66 52 61 52 56V46Z"
            fill="#E6B89C"
          />
          {/* Small Heart / Paw in center */}
          <circle cx="50" cy="49" r="4.5" fill="#E6B89C" />
          <circle cx="43" cy="43" r="2" fill="#FDFBF7" />
          <circle cx="57" cy="43" r="2" fill="#FDFBF7" />

          {/* Gradients */}
          <defs>
            <linearGradient id="pin_gradient" x1="0" y1="0" x2="100" y2="114" gradientUnits="userSpaceOnUse">
              <stop stopColor="#7A9D8C" />
              <stop offset="1" stopColor="#5F8271" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col justify-center text-left leading-tight">
        <div className="flex items-center gap-1 font-extrabold tracking-tight">
          <span 
            className={`font-black text-[#7A9D8C] ${
              size === 'sm' ? 'text-base' : size === 'lg' ? 'text-2xl' : 'text-xl'
            }`}
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            Pet
          </span>
          <span 
            className={`font-black text-[#E6B89C] ${
              size === 'sm' ? 'text-base' : size === 'lg' ? 'text-2xl' : 'text-xl'
            }`}
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            {variant === 'found' ? 'Found' : 'Encontrado'}
          </span>
        </div>
        {showTagline && (
          <span className="text-[10px] sm:text-[11px] font-medium text-[#5C5C5C] -mt-0.5 flex items-center gap-1">
            Juntos reunimos quem ama <span className="text-[#E6B89C] text-xs">🐾</span>
          </span>
        )}
      </div>
    </div>
  );
};
