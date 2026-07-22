import React from 'react';
import { motion } from 'motion/react';
import { Language, MiloExpression, GameScreen } from '../types';
import { DialogBubble } from '../components/DialogBubble';
import { PhoneMockup } from '../components/PhoneMockup';
import MiloEkspresiTiga from '../asset/gambar/Filtered Defense.png';

// ==========================================
// NASKAH TEKS LOKAL (GABUNGAN DI DALAM FILE)
// ==========================================
const LOCAL_TEXTS = {
  id: {
    nameSelectionText: "SEBELUM MEMULAI PETUALANGANMU, YUK PILIH USERNAME YANG MAU KAMU GUNAKAN DI MEDIA SOSIAL KAMU!",
    btnPrev: "Kembali",
    btnConfirmName: "Konfirmasi Nama"
  },
  en: {
    nameSelectionText: "BEFORE STARTING YOUR ADVENTURE, LET'S CHOOSE THE USERNAME YOU WANT TO USE ON YOUR SOCIAL MEDIA!",
    btnPrev: "Back",
    btnConfirmName: "Confirm Name"
  }
};

interface NameSelectionPageProps {
  lang: Language;
  playSynthSound: (type: 'click' | 'success' | 'fail' | 'slide') => void;
  setScreen: (screen: GameScreen) => void;
  currentMiloExpression?: MiloExpression;
  currentUsername: string;
  handleUsernameToggle: (dir: 'left' | 'right') => void;
}

export const NameSelectionPage: React.FC<NameSelectionPageProps> = ({
  lang,
  playSynthSound,
  setScreen,
  currentUsername,
  handleUsernameToggle
}) => {
  const t = LOCAL_TEXTS[lang];

  return (
    <motion.div
      key="name_selection"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full max-w-5xl"
    >
      {/* Kolom Kiri: Instruksi Milo */}
      <div className="lg:col-span-7 space-y-6">
        
        {/* ============================================================ */}
        {/* CONTAINER POP-OUT MILO x DIALOG BUBBLE (TAMPILAN MIRIP CANVA) */}
        {/* ============================================================ */}
        <div className="relative pt-6">
          {/* Gambar Milo menumpuk persis di pojok kiri atas kotak hijau */}
          <img 
            src={`${MiloEkspresiTiga}?v=3`} 
            alt="Milo Otter" 
            className="absolute -top-10 left-[-10px] w-[130px] md:w-[150px] h-auto object-contain z-20 -rotate-6 pointer-events-none drop-shadow-md" 
          />
          
          {/* Kotak Bubble Hijau */}
          <div className="relative z-10">
            <DialogBubble 
              text={t.nameSelectionText} 
              variant="green" 
              className="!pl-24 md:!pl-28 !pt-8" 
            />
          </div>
        </div>
        
        {/* Tombol Aksi Navigasi */}
        <div className="flex gap-4 pt-2">
          <button
            onClick={() => { 
              playSynthSound('click'); 
              setScreen('milo_intro'); 
            }}
            className="px-6 py-3 bg-white text-[#1E1915] font-sans font-bold text-sm rounded-2xl border-2 border-[#1E1915] shadow-[3px_3px_0px_0px_#1E1915] hover:bg-[#FAF6F0] transition cursor-pointer"
            id="btn-name-back"
          >
            {t.btnPrev}
          </button>
          
          <button
            onClick={() => { 
              playSynthSound('success'); 
              setScreen('post_intro'); 
            }}
            className="px-8 py-3 bg-[#E36633] text-white font-sans font-extrabold text-sm rounded-2xl border-2 border-[#1E1915] shadow-[3px_3px_0px_0px_#1E1915] hover:bg-[#D15525] transition cursor-pointer flex items-center gap-2"
            id="btn-name-confirm"
          >
            {t.btnConfirmName} <span>🎉</span>
          </button>
        </div>
      </div>

      {/* Kolom Kanan: Tampilan HP Pilihan Username */}
      <div className="lg:col-span-5 flex justify-center">
        <PhoneMockup
          lang={lang}
          username={currentUsername}
          onUsernameChange={handleUsernameToggle}
          followers={12}
          trust={100}
        />
      </div>
    </motion.div>
  );
};