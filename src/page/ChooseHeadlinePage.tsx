import React from 'react';
import { motion } from 'motion/react';
import { Language, GameScreen } from '../types';

// ==========================================
// DATA & NASKAH LOKAL (GABUNGAN DI DALAM FILE)
// ==========================================
const LOCAL_TEXTS = {
  id: {
    selectHeadlineHeader: "Pilih Judul: Bagaimana kamu akan mengemas berita ini?",
    btnPrev: "Kembali ke Pengantar"
  },
  en: {
    selectHeadlineHeader: "Choose Headline: How will you package this news?",
    btnPrev: "Back to Intro"
  }
};

const LOCAL_HEADLINE_OPTIONS = [
  {
    id: 'A' as const,
    text: {
      id: "KERJA ONLINE: Sambil Rebahan! Cuma Like Video YouTube Dibayar 50 Ribu/Tugas. Butuh 100 Orang Gercep!",
      en: "ONLINE WORK: While Relaxing! Just Like YouTube Videos Get Paid 50k/Task. Need 100 People Fast!"
    }
  },
  {
    id: 'B' as const,
    text: {
      id: "WASPADA! Penipuan Berkedok Loker Like-and-Share YouTube Mulai Memakan Korban. Ini Faktanya!",
      en: "BEWARE! YouTube Like-and-Share Job Scams Start Claiming Victims. Here Are the Facts!"
    }
  }
];

interface ChooseHeadlinePageProps {
  lang: Language;
  playSynthSound: (type: 'click' | 'success' | 'fail' | 'slide') => void;
  setScreen: (screen: GameScreen) => void;
  selectHeadline: (id: 'A' | 'B') => void;
}

export const ChooseHeadlinePage: React.FC<ChooseHeadlinePageProps> = ({
  lang,
  playSynthSound,
  setScreen,
  selectHeadline
}) => {
  // Ambil teks lokalisasi sesuai bahasa aktif
  const t = LOCAL_TEXTS[lang];

  return (
    <motion.div
      key="choose_headline"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      /* ⚡ Diperbarui: space-y disesuaikan untuk layar landscape ⚡ */
      className="w-full max-w-4xl space-y-4 landscape:space-y-4 md:space-y-8 mx-auto px-2"
    >
      {/* Indikator Langkah & Header Halaman */}
      <div className="text-center space-y-2 landscape:space-y-1 md:space-y-3">
        <span className="font-mono text-[10px] md:text-xs font-extrabold bg-[#E36633]/20 text-[#E36633] border border-[#E36633] px-3 py-0.5 md:py-1 rounded-full uppercase tracking-widest inline-block">
          {lang === 'id' ? "LANGKAH 1 DARI 3" : "STEP 1 OF 3"}
        </span>
        <h2 className="font-display font-extrabold text-lg landscape:text-xl md:text-3xl text-[#1E1915] tracking-tight">
          {t.selectHeadlineHeader}
        </h2>
      </div>

      {/* Grid Opsi Kartu Judul Konten */}
      {/* ⚡ Diperbarui: Ditambahkan landscape:grid-cols-2 ⚡ */}
      <div className="grid grid-cols-1 landscape:grid-cols-2 md:grid-cols-2 gap-4 md:gap-6">
        {LOCAL_HEADLINE_OPTIONS.map((opt) => (
          <motion.div
            key={opt.id}
            whileHover={{ scale: 1.015, y: -2 }}
            onClick={() => selectHeadline(opt.id)}
            /* ⚡ Diperbarui: Padding & min-height disesuaikan agar pas di HP miring ⚡ */
            className="p-4 landscape:p-5 md:p-8 rounded-2xl md:rounded-3xl border-3 border-[#1E1915] bg-[#FFFDF9] shadow-[4px_4px_0px_0px_#1E1915] md:shadow-[5px_5px_0px_0px_#1E1915] hover:bg-[#FAF6F0] cursor-pointer flex flex-col justify-between transition-all min-h-[130px] md:min-h-[160px] active:translate-x-[2px] active:translate-y-[2px]"
            id={`opt-headline-${opt.id}`}
          >
            <div className="flex justify-between items-start mb-2 md:mb-4">
              <span className="font-mono font-extrabold text-[10px] md:text-xs text-[#8C7662] uppercase bg-[#FAF1E6] px-2 py-0.5 md:py-1 rounded border border-[#1E1915]">
                Opsi {opt.id}
              </span>
              <span className="text-xs md:text-sm font-bold text-[#E36633]">
                {opt.id === 'A' ? '🔥 Viral Clickbait' : '⭐ Credible'}
              </span>
            </div>
            <p className="font-sans font-extrabold text-xs landscape:text-xs md:text-base text-[#1E1915] leading-relaxed select-text">
              "{opt.text[lang]}"
            </p>
          </motion.div>
        ))}
      </div>

      {/* Tombol Mundur ke Briefing Awal */}
      <div className="flex justify-center pt-2 md:pt-4">
        <button
          onClick={() => { playSynthSound('click'); setScreen('post_intro'); }}
          className="px-5 py-2 md:px-6 md:py-2.5 bg-white text-[#1E1915] font-sans font-bold text-xs md:text-sm rounded-xl md:rounded-2xl border-2 border-[#1E1915] shadow-[3px_3px_0px_0px_#1E1915] hover:bg-[#FAF6F0] flex items-center gap-2 cursor-pointer"
          id="btn-headline-back"
        >
          <span>←</span> {t.btnPrev}
        </button>
      </div>
    </motion.div>
  );
};