import React from 'react';
import { motion } from 'motion/react';
import { Language, GameScreen } from '../types';

// ==========================================
// DATA & NASKAH LOKAL (GABUNGAN DI DALAM FILE)
// ==========================================
const LOCAL_TEXTS = {
  id: {
    selectSourceHeader: "Cantumkan Sumber: Dari mana kamu mendapatkan informasi ini?",
    btnPrev: "Kembali ke Judul"
  },
  en: {
    selectSourceHeader: "Cite Source: Where did you get this information from?",
    btnPrev: "Back to Headline"
  }
};

const LOCAL_SOURCE_OPTIONS = [
  {
    id: 'A' as const,
    text: {
      id: "Dapat dari rekaman layar video yang viral di FYP TikTok. Katanya sih infonya valid karena yang komen ramai banget!",
      en: "Got it from a screen recording video that went viral on TikTok FYP. They said it's valid because the comment section is crowded!"
    }
  },
  {
    id: 'B' as const,
    text: {
      id: "Melihat langsung dari halaman pengumuman karir di website resmi Toko Online yang bersangkutan.",
      en: "Saw it directly from the official career announcement page on the respective Online Store website."
    }
  }
];

interface ChooseSourcePageProps {
  lang: Language;
  playSynthSound: (type: 'click' | 'success' | 'fail' | 'slide') => void;
  setScreen: (screen: GameScreen) => void;
  selectSource: (id: 'A' | 'B') => void;
}

export const ChooseSourcePage: React.FC<ChooseSourcePageProps> = ({
  lang,
  playSynthSound,
  setScreen,
  selectSource
}) => {
  // Ambil teks lokalisasi dari objek lokal di atas
  const t = LOCAL_TEXTS[lang];

  return (
    <motion.div
      key="choose_source"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-4xl space-y-8"
    >
      {/* Indikator Langkah & Judul Halaman */}
      <div className="text-center space-y-3">
        <span className="font-mono text-xs font-extrabold bg-[#E36633]/20 text-[#E36633] border border-[#E36633] px-3.5 py-1 rounded-full uppercase tracking-widest">
          {lang === 'id' ? "LANGKAH 2 DARI 3" : "STEP 2 OF 3"}
        </span>
        <h2 className="font-display font-extrabold text-2xl md:text-3xl text-[#1E1915] tracking-tight">
          {t.selectSourceHeader}
        </h2>
      </div>

      {/* Grid Pilihan Kartu Sumber */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {LOCAL_SOURCE_OPTIONS.map((opt) => (
          <motion.div
            key={opt.id}
            whileHover={{ scale: 1.015, y: -2 }}
            onClick={() => selectSource(opt.id)}
            className="p-6 md:p-8 rounded-3xl border-3 border-[#1E1915] bg-[#FFFDF9] shadow-[5px_5px_0px_0px_#1E1915] hover:bg-[#FAF6F0] cursor-pointer flex flex-col justify-between transition-all min-h-[160px] active:translate-x-[2px] active:translate-y-[2px]"
            id={`opt-source-${opt.id}`}
          >
            <div className="flex justify-between items-start mb-4">
              <span className="font-mono font-extrabold text-xs text-[#8C7662] uppercase bg-[#FAF1E6] px-2.5 py-1 rounded border border-[#1E1915]">
                Opsi {opt.id}
              </span>
              <span className="text-sm font-bold text-[#7BA65C]">
                {opt.id === 'A' ? '📱 Social Media FYP' : '🌐 Official Agency'}
              </span>
            </div>
            <p className="font-sans font-extrabold text-sm md:text-base text-[#1E1915] leading-relaxed select-text">
              "{opt.text[lang]}"
            </p>
          </motion.div>
        ))}
      </div>

      {/* Tombol Mundur ke Halaman Judul */}
      <div className="flex justify-center pt-4">
        <button
          onClick={() => { playSynthSound('click'); setScreen('choose_headline'); }}
          className="px-6 py-2.5 bg-white text-[#1E1915] font-sans font-bold text-sm rounded-2xl border-2 border-[#1E1915] shadow-[3px_3px_0px_0px_#1E1915] hover:bg-[#FAF6F0] flex items-center gap-2 cursor-pointer"
          id="btn-source-back"
        >
          <span>←</span> {t.btnPrev}
        </button>
      </div>
    </motion.div>
  );
};