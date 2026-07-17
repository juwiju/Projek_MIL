import React from 'react';
import { motion } from 'motion/react';
import { MiloExpression } from '../types';

interface MiloOtterProps {
  expression: MiloExpression;
  className?: string;
  size?: number;
}

export const MiloOtter: React.FC<MiloOtterProps> = ({
  expression,
  className = '',
  size = 220
}) => {
  // Common visual variables
  const primaryBrown = "#9E7256";
  const lightBeige = "#EAD4C3";
  const hatGreen = "#7BA65C";
  const hatDarkGreen = "#4A6E31";
  
  // Animation presets
  const waveAnimation = {
    rotate: [0, -15, 10, -15, 10, 0],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
  };

  const happyBounce = {
    y: [0, -8, 0],
    transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
  };

  const shakeAnimation = {
    x: [0, -3, 3, -3, 3, 0],
    transition: { duration: 0.5, repeat: Infinity }
  };

  const thinkingFloat = {
    y: [0, -4, 0],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
  };

  return (
    <motion.div
      className={`relative select-none flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      animate={
        expression === 'happy' || expression === 'wink'
          ? happyBounce
          : expression === 'shocked' || expression === 'crying'
          ? shakeAnimation
          : expression === 'thinking'
          ? thinkingFloat
          : {}
      }
    >
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        {/* TAIL (Except if hidden, let's draw it on bottom right) */}
        <motion.path
          d="M135 150 C165 140, 185 100, 175 75 C165 55, 140 85, 135 110"
          stroke={primaryBrown}
          strokeWidth="16"
          strokeLinecap="round"
          fill="none"
          animate={{
            rotate: [0, 8, -8, 8, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ originX: "135px", originY: "150px" }}
        />

        {/* EARS */}
        {/* Left Ear */}
        <path
          d="M60 65 C45 55, 35 75, 45 85 C48 88, 55 88, 60 85 Z"
          fill={primaryBrown}
          stroke="#1E1915"
          strokeWidth="4"
        />
        <path
          d="M57 70 C49 65, 44 75, 49 80"
          fill="#D49970"
        />

        {/* Right Ear */}
        <path
          d="M140 65 C155 55, 165 75, 155 85 C152 88, 145 88, 140 85 Z"
          fill={primaryBrown}
          stroke="#1E1915"
          strokeWidth="4"
        />
        <path
          d="M143 70 C151 65, 156 75, 151 80"
          fill="#D49970"
        />

        {/* MAIN BODY (Rounded chubby otter!) */}
        <rect
          x="50"
          y="70"
          width="100"
          height="110"
          rx="50"
          fill={primaryBrown}
          stroke="#1E1915"
          strokeWidth="4"
        />

        {/* BELLY PANEL */}
        <rect
          x="65"
          y="110"
          width="70"
          height="60"
          rx="30"
          fill={lightBeige}
          stroke="#1E1915"
          strokeWidth="3"
        />

        {/* CHEEKS BLUSH */}
        {(expression === 'happy' || expression === 'wink' || expression === 'waving') && (
          <>
            <circle cx="68" cy="112" r="8" fill="#F8A4A4" opacity="0.8" />
            <circle cx="132" cy="112" r="8" fill="#F8A4A4" opacity="0.8" />
          </>
        )}

        {/* EYES */}
        {expression === 'happy' && (
          <>
            {/* Happy curved lines */}
            <path d="M60 102 Q68 94 76 102" stroke="#1E1915" strokeWidth="4.5" strokeLinecap="round" fill="none" />
            <path d="M124 102 Q132 94 140 102" stroke="#1E1915" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          </>
        )}

        {expression === 'wink' && (
          <>
            {/* Left curved, right winking star or flat line */}
            <path d="M60 102 Q68 94 76 102" stroke="#1E1915" strokeWidth="4.5" strokeLinecap="round" fill="none" />
            <path d="M124 100 L140 100" stroke="#1E1915" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          </>
        )}

        {expression === 'sad' && (
          <>
            {/* Sad downward slopes */}
            <path d="M60 104 Q68 98 76 106" stroke="#1E1915" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M124 106 Q132 98 140 104" stroke="#1E1915" strokeWidth="4" strokeLinecap="round" fill="none" />
            {/* Eyebrows */}
            <path d="M58 92 Q68 96 76 90" stroke="#1E1915" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M124 90 Q132 96 142 92" stroke="#1E1915" strokeWidth="3" strokeLinecap="round" fill="none" />
          </>
        )}

        {expression === 'crying' && (
          <>
            {/* Closed eyes with flowing tears */}
            <path d="M60 104 Q68 98 76 104" stroke="#1E1915" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M124 104 Q132 98 140 104" stroke="#1E1915" strokeWidth="4" strokeLinecap="round" fill="none" />
            {/* Tears */}
            <path d="M64 106 Q64 135 60 135" stroke="#68BBE3" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M136 106 Q136 135 140 135" stroke="#68BBE3" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M68 110 Q68 122 70 120" stroke="#90E0EF" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          </>
        )}

        {expression === 'shocked' && (
          <>
            {/* Big circles */}
            <circle cx="68" cy="102" r="7" fill="#1E1915" />
            <circle cx="132" cy="102" r="7" fill="#1E1915" />
            <circle cx="66" cy="100" r="2.5" fill="white" />
            <circle cx="130" cy="100" r="2.5" fill="white" />
            {/* Surprised eyebrows */}
            <path d="M58 90 Q68 84 76 90" stroke="#1E1915" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path d="M124 90 Q132 84 142 90" stroke="#1E1915" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          </>
        )}

        {expression === 'thinking' && (
          <>
            {/* Glancing up */}
            <circle cx="68" cy="100" r="6" fill="#1E1915" />
            <circle cx="132" cy="100" r="6" fill="#1E1915" />
            <circle cx="70" cy="98" r="2" fill="white" />
            <circle cx="134" cy="98" r="2" fill="white" />
            {/* Thinking eyebrows */}
            <path d="M58 94 Q68 88 76 94" stroke="#1E1915" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M124 90 Q132 94 142 90" stroke="#1E1915" strokeWidth="3" strokeLinecap="round" fill="none" />
          </>
        )}

        {(expression === 'waving' || expression === 'holding_phone') && (
          <>
            {/* Regular nice looking eyes */}
            <circle cx="68" cy="102" r="6" fill="#1E1915" />
            <circle cx="132" cy="102" r="6" fill="#1E1915" />
            <circle cx="66" cy="100" r="2" fill="white" />
            <circle cx="130" cy="100" r="2" fill="white" />
          </>
        )}

        {/* MUZZLE & NOSE (Very cute) */}
        <ellipse cx="100" cy="112" rx="14" ry="10" fill="#FCECE2" stroke="#1E1915" strokeWidth="3" />
        
        {/* Nose */}
        <polygon points="94,107 106,107 100,113" fill="#3D291C" stroke="#1E1915" strokeWidth="1.5" />
        
        {/* Mouth */}
        {expression === 'shocked' || expression === 'crying' ? (
          // Open mouth
          <circle cx="100" cy="117" r="5" fill="#C54B4B" stroke="#1E1915" strokeWidth="2.5" />
        ) : (
          // Happy cat-like mouth (3)
          <path d="M92 113 Q96 117 100 113 Q104 117 108 113" stroke="#1E1915" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        )}

        {/* Cute teeth */}
        {expression === 'happy' && (
          <path d="M98 113 L99 116 L100 113 M100 113 L101 116 L102 113" stroke="#1E1915" strokeWidth="1.5" fill="white" />
        )}

        {/* WHISKERS */}
        <path d="M42 110 L28 108 M40 115 L26 115 M42 120 L30 124" stroke="#1E1915" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M158 110 L172 108 M160 115 L174 115 M158 120 L170 124" stroke="#1E1915" strokeWidth="2.5" strokeLinecap="round" />

        {/* ARMS / PAWS */}
        {expression === 'waving' ? (
          <>
            {/* Left arm waving */}
            <motion.g
              animate={waveAnimation}
              style={{ originX: "50px", originY: "130px" }}
            >
              <path
                d="M50 130 C30 120, 20 90, 32 82 C42 75, 52 100, 52 115"
                fill={primaryBrown}
                stroke="#1E1915"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <circle cx="30" cy="84" r="5" fill={lightBeige} />
            </motion.g>

            {/* Right arm normal */}
            <path
              d="M150 130 C165 135, 175 150, 168 158 C160 165, 145 150, 148 135"
              fill={primaryBrown}
              stroke="#1E1915"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </>
        ) : expression === 'holding_phone' ? (
          <>
            {/* Both arms holding a phone */}
            <path
              d="M50 140 C65 140, 85 145, 82 155 C80 162, 60 160, 50 148"
              fill={primaryBrown}
              stroke="#1E1915"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            <path
              d="M150 140 C135 140, 115 145, 118 155 C120 162, 140 160, 150 148"
              fill={primaryBrown}
              stroke="#1E1915"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            {/* Phone */}
            <rect
              x="82"
              y="136"
              width="36"
              height="24"
              rx="4"
              fill="#2D3748"
              stroke="#1E1915"
              strokeWidth="3.5"
            />
            {/* Glowing screen */}
            <rect
              x="86"
              y="139"
              width="28"
              height="18"
              rx="2"
              fill="#63B3ED"
              opacity="0.9"
            />
          </>
        ) : expression === 'thinking' ? (
          <>
            {/* Right paw on chin */}
            <path
              d="M50 135 C42 145, 45 160, 52 158"
              fill={primaryBrown}
              stroke="#1E1915"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M150 135 C140 130, 115 115, 112 125 C110 132, 130 148, 148 140"
              fill={primaryBrown}
              stroke="#1E1915"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </>
        ) : (
          <>
            {/* Default arms resting or celebrating */}
            <path
              d="M50 130 C35 135, 25 150, 32 158 C40 165, 55 150, 52 135"
              fill={primaryBrown}
              stroke="#1E1915"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M150 130 C165 135, 175 150, 168 158 C160 165, 145 150, 148 135"
              fill={primaryBrown}
              stroke="#1E1915"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </>
        )}

        {/* MILO'S GREEN TOP HAT (Iconic!) */}
        <g id="milo-hat">
          {/* Hat base brim */}
          <ellipse cx="100" cy="62" rx="28" ry="6" fill={hatDarkGreen} stroke="#1E1915" strokeWidth="4" />
          
          {/* Hat cylinder */}
          <path
            d="M80 60 L83 30 C83 25, 117 25, 117 30 L120 60"
            fill={hatGreen}
            stroke="#1E1915"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          {/* Hat cylinder top shine ellipse */}
          <ellipse cx="100" cy="30" rx="17" ry="4" fill="#9CD17D" />

          {/* Black ribbon band */}
          <path
            d="M81 53 Q100 56 119 53 L120 59 Q100 62 80 59 Z"
            fill="#1E1915"
          />
          {/* Gold buckle */}
          <rect x="96" y="51" width="8" height="8" rx="1" fill="#F6AD55" stroke="#1E1915" strokeWidth="1.5" />
        </g>

        {/* SHADOW BASE */}
        <ellipse cx="100" cy="192" rx="45" ry="6" fill="#1E1915" opacity="0.15" />
      </svg>
    </motion.div>
  );
};
