import React from 'react';
import { motion } from 'motion/react';
import { Language, MiloExpression, GameScreen } from '../types';
import { MiloOtter } from '../components/MiloOtter';
import { DialogBubble } from '../components/DialogBubble';
import { PhoneMockup } from '../components/PhoneMockup';

// ==========================================
// NASKAH TEKS LOKAL (GABUNGAN DI DALAM FILE)
// ==========================================
const LOCAL_TEXTS = {
  id: {
    postIntroText: " SEBAGAI CONTENT CREATOR BARU, KAMU BARU SAJA MENDAPATKAN INFORMASI MENARIK NIH! YUK, SEKARANG WAKTUNYA KAMU MEMBUAT POSTINGAN PERTAMAMU!",
    btnPrev: "Kembali",
    btnGas: "Gas Posting!"
  },
  en: {
    postIntroText: "AS A NEW CONTENT CREATOR, YOU JUST GOT SOME INTERESTING INFORMATION! NOW, IT'S TIME TO CREATE YOUR FIRST POST!",
    btnPrev: "Back",
    btnGas: "Let's Post!"
  }
};

interface PostIntroPageProps {
  lang: Language;
  playSynthSound: (type: 'click' | 'success' | 'fail' | 'slide') => void;
  setScreen: (screen: GameScreen) => void;
  currentMiloExpression: MiloExpression;
  currentUsername: string;
}

export const PostIntroPage: React.FC<PostIntroPageProps> = ({
  lang,
  playSynthSound,
  setScreen,
  currentMiloExpression,
  currentUsername
}) => {
  // Ambil teks sesuai bahasa aktif dari objek lokal di atas
  const t = LOCAL_TEXTS[lang];

  return (
    <motion.div
      key="post_intro"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full max-w-5xl"
    >
      {/* Kolom Kiri: Briefing dari Milo */}
      <div className="lg:col-span-7 space-y-6">
        
        {/* CONTAINER POP-OUT MILO DI POJOK KIRI BAWAH KOTAK ORANYE */}
        <div className="relative pb-6">
          {/* Kotak Bubble Oranye */}
          <DialogBubble 
            text={t.postIntroText}
            variant="orange" 
            className="!pl-14 md:!pl-16" 
          />

          {/* Gambar Milo menumpuk di pojok kiri bawah menggunakan komponen MiloOtter bawaan */}
          <div className="absolute -bottom-10 -left-6 z-20 pointer-events-none">
            <MiloOtter 
              expression={currentMiloExpression} 
              size={150} 
              className="drop-shadow-md -rotate-6" 
            />
          </div>
        </div>

        {/* Tombol Navigasi */}
        <div className="flex gap-4 pt-2">
          <button
            onClick={() => { playSynthSound('click'); setScreen('name_selection'); }}
            className="px-6 py-3 bg-white text-[#1E1915] font-sans font-bold text-sm rounded-2xl border-2 border-[#1E1915] shadow-[3px_3px_0px_0px_#1E1915] hover:bg-[#FAF6F0] transition cursor-pointer"
            id="btn-post-intro-back"
          >
            {t.btnPrev}
          </button>
          <button
            onClick={() => { playSynthSound('slide'); setScreen('choose_headline'); }}
            className="px-8 py-3 bg-[#1E1915] text-white font-sans font-extrabold text-sm rounded-2xl border-2 border-[#1E1915] shadow-[3px_3px_0px_0px_#8C7662] hover:bg-[#2D2823] transition cursor-pointer flex items-center gap-2"
            id="btn-post-intro-gas"
          >
            {t.btnGas} <span>📱</span>
          </button>
        </div>
      </div>

      {/* Kolom Kanan: Tampilan Layar HP Awal Akun Baru */}
      <div className="lg:col-span-5 flex justify-center">
        <PhoneMockup
          lang={lang}
          username={currentUsername}
          followers={12}
          trust={100}
        />
      </div>
    </motion.div>
  );
};