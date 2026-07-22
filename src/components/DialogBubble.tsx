import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface DialogBubbleProps {
  text: string;
  variant?: 'green' | 'orange' | 'dark';
  className?: string;
  onComplete?: () => void;
}

export const DialogBubble: React.FC<DialogBubbleProps> = ({
  text = '',
  variant = 'green',
  className = '',
  onComplete
}) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    // Safety check jika text kosong
    if (!text) {
      setDisplayedText('');
      return;
    }

    // Reset teks langsung ke string kosong saat teks baru masuk
    setDisplayedText('');
    let index = 0;

    const interval = setInterval(() => {
      index++;
      // ✅ Solusi: Menggunakan .slice(0, index) agar selalu mengambil dari huruf pertama (indeks 0)
      setDisplayedText(text.slice(0, index));

      if (index >= text.length) {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, 15); // Snappy 15ms per char

    return () => clearInterval(interval);
  }, [text, onComplete]);

  const bgClasses = {
    green: 'bg-[#B4C285] text-[#242D13] border-[#1E1915]',
    orange: 'bg-[#E36633] text-white border-[#1E1915]',
    dark: 'bg-[#2E2823] text-white border-[#1E1915]',
  };

  const shadowClasses = {
    green: 'shadow-[4px_4px_0px_0px_#242D13]',
    orange: 'shadow-[4px_4px_0px_0px_#1E1915]',
    dark: 'shadow-[4px_4px_0px_0px_#000000]',
  };

  return (
    <motion.div
      initial={{ scale: 0.92, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`relative p-5 md:p-6 rounded-2xl border-3 font-sans font-bold text-lg md:text-xl tracking-normal leading-relaxed ${bgClasses[variant]} ${shadowClasses[variant]} ${className}`}
    >
      {/* Grid Pattern overlay for green/orange bubbles */}
      {variant === 'green' && (
        <div 
          className="absolute inset-0 opacity-[0.08] pointer-events-none rounded-2xl" 
          style={{
            backgroundImage: `radial-gradient(#000 1px, transparent 1px), radial-gradient(#000 1px, transparent 1px)`,
            backgroundSize: '16px 16px',
            backgroundPosition: '0 0, 8px 8px'
          }} 
        />
      )}
      
      {variant === 'orange' && (
        <div 
          className="absolute inset-0 opacity-[0.08] pointer-events-none rounded-2xl" 
          style={{
            backgroundImage: `linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)`,
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 10px 10px'
          }} 
        />
      )}

      {/* Bubble tail */}
      <div 
        className={`absolute -left-3 top-10 w-0 h-0 border-t-[12px] border-t-transparent border-r-[16px] border-b-[12px] border-b-transparent pointer-events-none
        ${variant === 'green' ? 'border-r-[#B4C285]' : variant === 'orange' ? 'border-r-[#E36633]' : 'border-r-[#2E2823]'}`}
      />
      
      {/* Outer black outline tail offset */}
      <div className="absolute -left-[16px] top-[39px] w-0 h-0 border-t-[13px] border-t-transparent border-r-[17px] border-r-[#1E1915] border-b-[13px] border-b-transparent -z-10 pointer-events-none" />

      {/* Text rendering with an elegant typing block cursor */}
      <div className="relative z-10 whitespace-pre-line">
        {displayedText}
        {displayedText.length < text.length && (
          <span className="inline-block w-2 h-5 ml-1 bg-current animate-pulse align-middle" />
        )}
      </div>
    </motion.div>
  );
};