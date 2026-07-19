import React from 'react';
import { motion } from 'motion/react';
import { MiloExpression } from '../types';

// Import murni dari aset gambar PNG kamu
import miloWavingImg from '../asset/gambar/1.png';
import miloWinkImg from '../asset/gambar/2.png';
import miloHoldingPhoneImg from '../asset/gambar/3.png';

interface MiloOtterProps {
  expression: MiloExpression;
  className?: string;
  size?: number;
}

export const MiloOtter: React.FC<MiloOtterProps> = ({
  expression,
  className = '',
  size = 220,
}) => {
  // Pemetaan ekspresi langsung ke file gambar aset PNG
  const expressionAssetImages: Record<string, string> = {
    waving: miloWavingImg,         // Menggunakan 1.png
    wink: miloWinkImg,             // Menggunakan 2.png
    holding_phone: miloHoldingPhoneImg, // Menggunakan 3.png
  };

  // Tentukan gambar yang aktif. Jika ekspresi tidak ada di map, otomatis pakai miloWavingImg (1.png) sebagai fallback
  const activeAsset = expressionAssetImages[expression] || miloWavingImg;

  // Animasi transisi preset disesuaikan berdasarkan ekspresi
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
      {/* Hanya merender tag img dari aset gambar saja */}
      <img
        src={activeAsset}
        alt={`Milo Otter - ${expression}`}
        className="w-full h-full object-contain"
        draggable={false}
      />
    </motion.div>
  );
};