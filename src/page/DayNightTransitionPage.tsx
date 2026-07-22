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
      className="min-h-screen w-full overflow-hidden bg-[#84c1ff] text-[#0f2646] px-6 py-8"
    >
      <motion.div
        initial={{ backgroundColor: '#84c1ff' }}
        animate={{ backgroundColor: ['#84c1ff', '#0a1f3d'] }}
        transition={{ duration: 3.2, ease: 'easeInOut' }}
        className="absolute inset-0"
      />

      <div className="absolute inset-0 overflow-hidden">
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

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.75),_transparent_20%)] opacity-90" />
      <div className="absolute inset-x-0 top-[10%] h-[220px] bg-[radial-gradient(circle,_rgba(255,255,255,0.85),_transparent_35%)] blur-3xl" />

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center gap-12">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative flex items-center justify-center w-full max-w-5xl"
        >
          <motion.div
            className="absolute left-10 top-16 h-32 w-32 rounded-full bg-[#ffe87f] shadow-[0_0_60px_rgba(255,232,127,0.5)]"
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: [1, 0.7, 0.2], opacity: [1, 0.8, 0] }}
            transition={{ duration: 3.2, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute right-16 top-20 h-24 w-24 rounded-full bg-[#f7f1e2] border border-[#ffffff80] shadow-[0_0_40px_rgba(255,255,255,0.35)]"
            initial={{ scale: 0.2, opacity: 0, y: 20 }}
            animate={{ scale: [0.2, 0.8, 1], opacity: [0, 0.6, 1], y: [20, 8, 0] }}
            transition={{ duration: 3.2, delay: 0.4, ease: 'easeOut' }}
          />
          <motion.div
            className="absolute inset-x-0 top-[45%] h-48 bg-gradient-to-b from-transparent via-[#ffffff]/20 to-[#0a1f3d]"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 1] }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
          />

          <div className="relative z-10 flex flex-col gap-4 rounded-[36px] border border-white/10 bg-white/80 px-10 py-12 shadow-[0_0_80px_rgba(25,49,92,0.16)] backdrop-blur-xl">
            <span className="mx-auto inline-flex rounded-full border border-[#0f2646]/20 bg-[#edf6ff]/90 px-4 py-2 text-xs uppercase tracking-[0.32em] text-[#1b3a69] shadow-[0_0_20px_rgba(255,255,255,0.44)]">
              jeda waktu: 7 hari</span>
            <h1 className="text-5xl md:text-6xl font-display font-extrabold tracking-tight text-[#0f2646] drop-shadow-[0_8px_30px_rgba(255,255,255,0.24)]">
              {t.headline}
            </h1>
            <p className="max-w-2xl text-center text-base text-[#2f4d7e]/90 leading-relaxed md:text-lg">
              {t.subtitle}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="relative flex w-full max-w-4xl items-center justify-between gap-6"
        >
          <div className="flex-1 rounded-3xl border border-white/10 bg-white/70 p-5 shadow-[0_0_40px_rgba(23,54,101,0.14)] backdrop-blur-xl">
            <div className="h-4 w-full rounded-full bg-[#dbe6f4] mb-3" />
            <div className="h-4 w-3/4 rounded-full bg-[#c6d7f0]" />
          </div>
          <div className="flex-1 rounded-3xl border border-white/10 bg-[#e7effc]/80 p-5 shadow-[0_0_40px_rgba(23,54,101,0.14)] backdrop-blur-xl">
            <div className="h-4 w-5/6 rounded-full bg-[#dbe6f4] mb-3" />
            <div className="h-4 w-1/2 rounded-full bg-[#c6d7f0]" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};


