import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Language } from '../types';

const TEXTS = {
  id: {
    headline: '7 Hari Kemudian...',
    subtitle: 'kita lihat reaksi dari netizen netizen sekalian setelah 7 hari kemudian',
  },
  en: {
    headline: '7 Days Later...',
    subtitle: 'From day to night, the story dimmed and kept moving forward.',
  }
};

interface DayNightTransitionPageProps {
  lang: Language;
  playSynthSound: (type: 'click' | 'success' | 'fail' | 'slide') => void;
  onTransitionEnd: () => void;
}

const STAR_COUNT = 18;

export const DayNightTransitionPage: React.FC<DayNightTransitionPageProps> = ({ lang, playSynthSound, onTransitionEnd }) => {
  const t = TEXTS[lang];

  useEffect(() => {
    playSynthSound('slide');
    const timer = window.setTimeout(() => {
      onTransitionEnd();
    }, 3200);
    return () => window.clearTimeout(timer);
  }, [onTransitionEnd, playSynthSound]);

  return (
    <motion.div
      key="day_night_transition"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      /* ⚡ Diperbarui: Px & Py disesuaikan untuk layar landscape ⚡ */
      className="relative min-h-screen w-full overflow-hidden bg-[#84c1ff] text-[#0f2646] px-4 py-4 md:px-6 md:py-8 flex items-center justify-center"
    >
      {/* Background Animasi Langit */}
      <motion.div
        initial={{ backgroundColor: '#84c1ff' }}
        animate={{ backgroundColor: ['#84c1ff', '#0a1f3d'] }}
        transition={{ duration: 3.2, ease: 'easeInOut' }}
        className="absolute inset-0"
      />

      {/* Animasi Bintang */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: STAR_COUNT }).map((_, index) => {
          const size = Math.random() * 2 + 1.2;
          const left = Math.random() * 100;
          const top = 10 + Math.random() * 35;
          const delay = Math.random() * 1.4;
          return (
            <motion.span
              key={index}
              className="absolute rounded-full bg-white"
              style={{ width: size, height: size, left: `${left}%`, top: `${top}%`, opacity: 0 }}
              animate={{ opacity: [0, 0.85, 0], y: [0, -8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, delay, ease: 'easeInOut' }}
            />
          );
        })}
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.75),_transparent_20%)] opacity-90 pointer-events-none" />
      <div className="absolute inset-x-0 top-[10%] h-[220px] bg-[radial-gradient(circle,_rgba(255,255,255,0.85),_transparent_35%)] blur-3xl pointer-events-none" />

      {/* Container Utama */}
      {/* ⚡ Diperbarui: Gap disesuaikan (gap-4 di landscape, gap-12 di desktop) ⚡ */}
      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-4 landscape:gap-4 md:gap-12 z-10 my-auto">
        
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative flex items-center justify-center w-full max-w-5xl"
        >
          {/* Animasi Matahari */}
          {/* ⚡ Diperbarui: Ukuran & Posisi Matahari lebih adaptif ⚡ */}
          <motion.div
            className="absolute left-4 top-2 md:left-10 md:top-16 h-16 w-16 md:h-32 md:w-32 rounded-full bg-[#ffe87f] shadow-[0_0_60px_rgba(255,232,127,0.5)]"
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: [1, 0.7, 0.2], opacity: [1, 0.8, 0] }}
            transition={{ duration: 3.2, ease: 'easeInOut' }}
          />

          {/* Animasi Bulan */}
          {/* ⚡ Diperbarui: Ukuran & Posisi Bulan lebih adaptif ⚡ */}
          <motion.div
            className="absolute right-4 top-2 md:right-16 md:top-20 h-14 w-14 md:h-24 md:w-24 rounded-full bg-[#f7f1e2] border border-[#ffffff80] shadow-[0_0_40px_rgba(255,255,255,0.35)]"
            initial={{ scale: 0.2, opacity: 0, y: 20 }}
            animate={{ scale: [0.2, 0.8, 1], opacity: [0, 0.6, 1], y: [20, 8, 0] }}
            transition={{ duration: 3.2, delay: 0.4, ease: 'easeOut' }}
          />

          <motion.div
            className="absolute inset-x-0 top-[45%] h-48 bg-gradient-to-b from-transparent via-[#ffffff]/20 to-[#0a1f3d] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 1] }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
          />

          {/* Card Teks Utama */}
          {/* ⚡ Diperbarui: Padding & Rounded dibuat responsive ⚡ */}
          <div className="relative z-10 flex flex-col gap-2 landscape:gap-2 md:gap-4 rounded-2xl landscape:rounded-2xl md:rounded-[36px] border border-white/10 bg-white/80 px-6 py-6 landscape:px-6 landscape:py-4 md:px-10 md:py-12 shadow-[0_0_80px_rgba(25,49,92,0.16)] backdrop-blur-xl text-center">
            <span className="mx-auto inline-flex rounded-full border border-[#0f2646]/20 bg-[#edf6ff]/90 px-3 py-1 text-[10px] md:text-xs uppercase tracking-[0.32em] text-[#1b3a69] shadow-[0_0_20px_rgba(255,255,255,0.44)] font-bold">
              jeda waktu: 7 hari
            </span>
            <h1 className="text-2xl landscape:text-3xl md:text-6xl font-display font-extrabold tracking-tight text-[#0f2646] drop-shadow-[0_8px_30px_rgba(255,255,255,0.24)]">
              {t.headline}
            </h1>
            <p className="max-w-2xl mx-auto text-xs landscape:text-xs md:text-lg text-[#2f4d7e]/90 leading-relaxed font-sans font-medium">
              {t.subtitle}
            </p>
          </div>
        </motion.div>

        {/* Skeleton Card Dekorasi Bawah */}
        {/* ⚡ Diperbarui: Sembunyi secara halus jika tinggi layar sangat sempit/landscape rapat ⚡ */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="relative flex w-full max-w-4xl items-center justify-between gap-3 landscape:gap-4 md:gap-6"
        >
          <div className="flex-1 rounded-2xl md:rounded-3xl border border-white/10 bg-white/70 p-3 md:p-5 shadow-[0_0_40px_rgba(23,54,101,0.14)] backdrop-blur-xl">
            <div className="h-2.5 md:h-4 w-full rounded-full bg-[#dbe6f4] mb-2 md:mb-3" />
            <div className="h-2.5 md:h-4 w-3/4 rounded-full bg-[#c6d7f0]" />
          </div>
          <div className="flex-1 rounded-2xl md:rounded-3xl border border-white/10 bg-[#e7effc]/80 p-3 md:p-5 shadow-[0_0_40px_rgba(23,54,101,0.14)] backdrop-blur-xl">
            <div className="h-2.5 md:h-4 w-5/6 rounded-full bg-[#dbe6f4] mb-2 md:mb-3" />
            <div className="h-2.5 md:h-4 w-1/2 rounded-full bg-[#c6d7f0]" />
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
};