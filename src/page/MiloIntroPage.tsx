import React from 'react';
import { motion } from 'motion/react';
import { Language, MiloExpression, GameScreen } from '../types';
import { MiloOtter } from '../components/MiloOtter';
import { DialogBubble } from '../components/DialogBubble';

// ==========================================
// NASKAH TEKS LOKAL (GABUNGAN DI DALAM FILE)
// ==========================================
const LOCAL_TEXTS = {
  id: {
    miloIntroText: "HALO! AKU MILO. AKU AKAN MENEMANI PETUALANGANMU MENJADI CONTENT CREATOR DI GAME INI! SIAP UNTUK MEMULAI?",
    btnPrev: "Kembali",
    btnNext: "Lanjut"
  },
  en: {
    miloIntroText: "HELLO! I'M MILO. I WILL ACCOMPANY YOUR ADVENTURE TO BECOME A CONTENT CREATOR IN THIS GAME! READY TO START?",
    btnPrev: "Back",
    btnNext: "Next"
  }
};

interface MiloIntroPageProps {
  lang: Language;
  playSynthSound: (type: 'click' | 'success' | 'fail' | 'slide') => void;
  setScreen: (screen: GameScreen) => void;
  currentMiloExpression: MiloExpression;
}

export const MiloIntroPage: React.FC<MiloIntroPageProps> = ({
  lang,
  playSynthSound,
  setScreen,
  currentMiloExpression
}) => {
  // Ambil teks lokalisasi sesuai bahasa yang sedang aktif
  const t = LOCAL_TEXTS[lang];

  return (
    <motion.div
      key="milo_intro"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 w-full max-w-4xl"
    >
      {/* Visual Karakter Milo */}
      <MiloOtter expression={currentMiloExpression} size={250} />
      
      {/* Balon Percakapan dan Tombol Aksi */}
      <div className="space-y-6 flex-1">
        <DialogBubble 
          text={t.miloIntroText} 
          variant="green"
        />
        
        <div className="flex gap-4">
          <button
            onClick={() => { playSynthSound('click'); setScreen('home'); }}
            className="px-6 py-3 bg-white text-[#1E1915] font-sans font-bold text-sm md:text-base rounded-2xl border-2 border-[#1E1915] shadow-[3px_3px_0px_0px_#1E1915] hover:bg-[#FAF6F0] transition-all cursor-pointer"
            id="btn-intro-back"
          >
            {t.btnPrev}
          </button>
          <button
            onClick={() => { playSynthSound('click'); setScreen('name_selection'); }}
            className="px-8 py-3 bg-[#1E1915] text-white font-sans font-extrabold text-sm md:text-base rounded-2xl border-2 border-[#1E1915] shadow-[3px_3px_0px_0px_#8C7662] hover:bg-[#2D2823] transition-all cursor-pointer flex items-center gap-2"
            id="btn-intro-next"
          >
            {t.btnNext} <span>→</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};