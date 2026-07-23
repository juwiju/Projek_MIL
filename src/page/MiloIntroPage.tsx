import React from 'react';
import { motion } from 'motion/react';
import { Language, MiloExpression, GameScreen } from '../types';
import { DialogBubble } from '../components/DialogBubble';
import MiloStatisImg from '../asset/gambar/1.png'; 

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
  currentMiloExpression?: MiloExpression; // Dibuat opsional agar aman jika nanti tidak dioper
}

export const MiloIntroPage: React.FC<MiloIntroPageProps> = ({
  lang,
  playSynthSound,
  setScreen
}) => {
  // Ambil teks lokalisasi sesuai bahasa aktif dari objek lokal
  const t = LOCAL_TEXTS[lang];

  return (
    <motion.div
      key="milo_intro"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      /* ⚡ Diperbarui: Tambahkan landscape:flex-row agar tata letak menyamping di HP Miring ⚡ */
      className="flex flex-col landscape:flex-row md:flex-row items-center justify-center gap-6 landscape:gap-8 md:gap-12 w-full max-w-4xl mx-auto px-2"
    >
      {/* Visual Karakter Milo (Gambar Statis dari Teman) */}
      <img 
        src={MiloStatisImg} 
        alt="Milo Otter Statis" 
        /* ⚡ Diperbarui: Ukuran dinamis untuk landscape HP agar tidak memakan ruang tinggi ⚡ */
        className="w-[180px] landscape:w-[140px] md:w-[250px] max-h-[35vh] landscape:max-h-[60vh] object-contain flex-shrink-0" 
      />
      
      {/* Balon Percakapan dan Tombol Aksi */}
      <div className="space-y-4 landscape:space-y-4 md:space-y-6 flex-1 w-full max-w-lg">
        <DialogBubble 
          text={t.miloIntroText} 
          variant="green"
        />
        
        <div className="flex gap-3 md:gap-4 justify-center landscape:justify-start">
          <button
            onClick={() => { 
              playSynthSound('click'); 
              setScreen('home'); 
            }}
            className="px-5 py-2.5 md:px-6 md:py-3 bg-white text-[#1E1915] font-sans font-bold text-xs md:text-base rounded-xl md:rounded-2xl border-2 border-[#1E1915] shadow-[3px_3px_0px_0px_#1E1915] hover:bg-[#FAF6F0] transition-all cursor-pointer"
            id="btn-intro-back"
          >
            {t.btnPrev}
          </button>
          
          <button
            onClick={() => { 
              playSynthSound('click'); 
              setScreen('name_selection'); 
            }}
            className="px-6 py-2.5 md:px-8 md:py-3 bg-[#1E1915] text-white font-sans font-extrabold text-xs md:text-base rounded-xl md:rounded-2xl border-2 border-[#1E1915] shadow-[3px_3px_0px_0px_#8C7662] hover:bg-[#2D2823] transition-all cursor-pointer flex items-center gap-2"
            id="btn-intro-next"
          >
            {t.btnNext} <span>→</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};