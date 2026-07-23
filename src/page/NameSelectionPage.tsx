import React from 'react';
import { motion } from 'motion/react';
import { Language, MiloExpression, GameScreen } from '../types';
import { DialogBubble } from '../components/DialogBubble';
import { PhoneMockup } from '../components/PhoneMockup';
import MiloEkspresiTiga from '../asset/gambar/Filtered Defense.png';

// ==========================================
// NASKAH TEKS LOKAL
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
      /* ⚡ Mengurangi vertical gap dan margin teratas agar rapat ke Navbar ⚡ */
      className="grid grid-cols-1 landscape:grid-cols-12 lg:grid-cols-12 gap-4 items-center w-full max-w-5xl mx-auto px-2 -mt-2 landscape:-mt-4"
    >
      {/* Kolom Kiri: Dialog Milo */}
      <div className="landscape:col-span-7 lg:col-span-7 space-y-3 landscape:space-y-2 md:space-y-4">
        
        {/* CONTAINER POP-OUT MILO x DIALOG BUBBLE */}
        <div className="relative pt-4">
          <img 
            src={`${MiloEkspresiTiga}?v=3`} 
            alt="Milo Otter" 
            className="absolute -top-10 landscape:-top-10 md:-top-16 left-[-16px] md:left-[-24px] w-[150px] landscape:w-[120px] md:w-[200px] h-auto object-contain z-20 -rotate-6 pointer-events-none drop-shadow-md" 
          />
          
          <div className="relative z-10">
            <DialogBubble 
              text={t.nameSelectionText} 
              variant="green" 
              className="!pl-16 landscape:!pl-16 md:!pl-24 !pt-4 md:!pt-6 !py-3 md:!py-4" 
            />
          </div>
        </div>
        
        {/* Tombol Navigasi */}
        <div className="flex gap-3 md:gap-4 pt-1 justify-center landscape:justify-start">
          <button
            onClick={() => { 
              playSynthSound('click'); 
              setScreen('milo_intro'); 
            }}
            className="px-4 py-2 md:px-6 md:py-2.5 bg-white text-[#1E1915] font-sans font-bold text-xs md:text-sm rounded-xl md:rounded-2xl border-2 border-[#1E1915] shadow-[3px_3px_0px_0px_#1E1915] hover:bg-[#FAF6F0] transition cursor-pointer"
            id="btn-name-back"
          >
            {t.btnPrev}
          </button>
          
          <button
            onClick={() => { 
              playSynthSound('success'); 
              setScreen('post_intro'); 
            }}
            className="px-5 py-2.5 md:px-7 md:py-2.5 bg-[#E36633] text-white font-sans font-extrabold text-xs md:text-sm rounded-xl md:rounded-2xl border-2 border-[#1E1915] shadow-[3px_3px_0px_0px_#1E1915] hover:bg-[#D15525] transition cursor-pointer flex items-center gap-2"
            id="btn-name-confirm"
          >
            {t.btnConfirmName} <span>🎉</span>
          </button>
        </div>
      </div>

      {/* Kolom Kanan: PhoneMockup (Murni membatasi lebar max tanpa scale CSS) */}
      <div className="landscape:col-span-5 lg:col-span-5 flex justify-center items-start">
        <div className="w-full max-w-[240px] landscape:max-w-[210px] md:max-w-[280px]">
          <PhoneMockup
            lang={lang}
            username={currentUsername}
            onUsernameChange={handleUsernameToggle}
            followers={12}
            trust={100}
          />
        </div>
      </div>
    </motion.div>
  );
};