import React from 'react';
import { motion } from 'motion/react';
import { Award, RotateCcw, Heart, Repeat, Send, Bookmark, User } from 'lucide-react';
import { Language, GameScreen } from '../types';
import badgeImage from '../asset/gambar/2.png';

// ==========================================
// NASKAH TEKS LOKAL
// ==========================================
const LOCAL_TEXTS = {
  id: {
    subTagline: "Bikin konten, kejar followers tapi tiap keputusan kecil bakal balik nentuin siapa yang percaya, dan siapa yang kena.",
    btnPlay: "Mulai Bermain",
    btnChapters: "LIHAT CHAPTER",
    rotateTitle: "Miringkan HP-mu!",
    rotateDesc: "Game ini dirancang untuk dimainkan dalam posisi Landscape (Miring) agar lebih seru.",
    cardContent: "KAMU PELAJAR PENGANGGURAN?\nKERJA ONLINE :\nSambil Rebahan! Cuma Like Video YouTube Dibayar 50 Ribu/Tugas. Butuh 100 Orang Gercep!\""
  },
  en: {
    subTagline: "Create content, chase followers, but every small decision will determine who trusts you and who gets tricked.",
    btnPlay: "Start Game",
    btnChapters: "VIEW CHAPTERS",
    rotateTitle: "Rotate Your Phone!",
    rotateDesc: "This game is designed to be played in Landscape (Horizontal) mode for the best experience.",
    cardContent: "ARE YOU AN UNEMPLOYED STUDENT?\nONLINE WORK:\nWhile Relaxing! Just Like YouTube Videos Get Paid 50k/Task. Need 100 People Fast!\""
  }
};

interface HomePageProps {
  lang: Language;
  playSynthSound: (type: 'click' | 'success' | 'fail' | 'slide') => void;
  setScreen: (screen: GameScreen) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  lang,
  playSynthSound,
  setScreen
}) => {
  const t = LOCAL_TEXTS[lang];

  // FUNKSI JAVASCRIPT UNTUK LOCK KE LANDSCAPE
  const handleStartGame = async () => {
    playSynthSound('success');

    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      }
      
      if (window.screen && window.screen.orientation && 'lock' in window.screen.orientation) {
        // @ts-ignore
        await window.screen.orientation.lock('landscape');
      }
    } catch (error) {
      console.log("Auto-landscape tidak didukung di perangkat/browser ini:", error);
    }

    setScreen('milo_intro');
  };

  return (
    <>
      {/* OVERLAY PERINGATAN ROTASI (Hanya di HP posisi Portrait) */}
      <div className="block landscape:hidden fixed inset-0 bg-[#1E1915]/95 backdrop-blur-md text-white z-50 flex flex-col items-center justify-center p-6 text-center select-none">
        <motion.div 
          animate={{ rotate: [0, -90, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="mb-4 bg-[#E36633] p-4 rounded-full text-white shadow-lg"
        >
          <RotateCcw size={40} />
        </motion.div>
        <h2 className="font-display font-black text-xl md:text-2xl text-[#FAF6F0] mb-2">
          {t.rotateTitle}
        </h2>
        <p className="font-sans text-xs md:text-sm text-[#D1C2B0] max-w-xs leading-relaxed">
          {t.rotateDesc}
        </p>
      </div>

      {/* TAMPILAN UTAMA HOMEPAGE (2 KOLOM) */}
      <motion.div
        key="home"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="grid grid-cols-1 landscape:grid-cols-12 lg:grid-cols-12 gap-6 landscape:gap-6 lg:gap-10 items-center w-full max-w-5xl mx-auto px-4 py-2"
      >
        {/* KOLOM KIRI: Header & Navigasi Utama */}
        <div className="landscape:col-span-7 lg:col-span-7 space-y-4 landscape:space-y-3 md:space-y-6 text-left">
          
          {/* Otter Badge */}
          <div className="inline-flex items-center gap-2 bg-[#B4C285]/20 border-2 border-[#B4C285] px-3 py-1 md:px-3.5 md:py-1 rounded-full">
            <img 
              src={badgeImage} 
              alt="Milo badge" 
              className="w-5 h-5 md:w-6 md:h-6 object-contain rounded-full bg-white p-0.5" 
            />
            <span className="font-mono text-[10px] md:text-xs font-bold text-[#242D13] tracking-wide uppercase">
              Literacy Adventure with Milo
            </span>
          </div>

          {/* Judul Utama */}
          <h1 className="font-display font-extrabold text-3xl landscape:text-2xl md:text-5xl lg:text-5xl text-[#1E1915] leading-[1.15] select-text">
            Postingan pertama kamu, <span className="text-[#E36633]">taruhannya kepercayaan orang.</span>
          </h1>

          {/* Sub-Tagline */}
          <p className="font-sans font-medium text-xs landscape:text-xs md:text-base text-[#5C4D3F] leading-relaxed max-w-lg select-text">
            {t.subTagline}
          </p>

          {/* Tombol Navigasi Menu */}
          <div className="flex flex-row items-center gap-3 md:gap-4 pt-1">
            <button
              onClick={handleStartGame}
              className="px-6 py-3 md:px-8 md:py-3.5 bg-[#1E1915] text-white hover:bg-[#2D2823] font-sans font-extrabold text-xs landscape:text-xs md:text-sm rounded-xl md:rounded-2xl border-2 border-[#1E1915] shadow-[4px_4px_0px_0px_#8C7662] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#8C7662] transition-all cursor-pointer"
              id="btn-play-now"
            >
              {t.btnPlay}
            </button>

            <button
              onClick={() => { playSynthSound('click'); setScreen('chapters'); }}
              className="px-4 py-3 md:px-6 md:py-3.5 bg-transparent text-[#1E1915] hover:opacity-80 font-sans font-black text-xs landscape:text-xs md:text-sm transition-all flex items-center gap-2 cursor-pointer uppercase tracking-wider"
              id="btn-chapters-gallery"
            >
              {t.btnChapters}
            </button>
          </div>
        </div>

        {/* KOLOM KANAN: Card Postingan Medsos Manual (Tanpa PhoneMockup) */}
        <div className="landscape:col-span-5 lg:col-span-5 flex justify-center">
          <div className="w-full max-w-xs md:max-w-sm bg-[#FFFDF9] border-3 border-[#1E1915] rounded-[28px] p-4 md:p-5 shadow-[6px_6px_0px_0px_#1E1915] relative flex flex-col justify-between space-y-4 select-none">
            
            {/* Header Card: Tombol Kamera & 3 Titik */}
            <div className="flex items-center justify-between">
              <div className="w-6 h-6 rounded-full border-2 border-[#1E1915] flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-[#1E1915]" />
              </div>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-[#1E1915]" />
                <div className="w-2 h-2 rounded-full bg-[#1E1915]" />
                <div className="w-2 h-2 rounded-full bg-[#1E1915]" />
              </div>
            </div>

            {/* Kotak Inner Konten Postingan */}
            <div className="border-2 border-[#1E1915] rounded-xl p-3 md:p-4 bg-white space-y-3">
              {/* Profil User Avatar */}
              <div className="w-7 h-7 rounded-full bg-stone-200 border border-[#1E1915] flex items-center justify-center">
                <User size={16} className="text-[#1E1915]" />
              </div>

              {/* Teks Isi Postingan */}
              <p className="font-sans font-black text-xs landscape:text-[11px] md:text-sm text-[#1E1915] leading-snug whitespace-pre-line uppercase">
                {t.cardContent}
              </p>

              {/* Action Icons Dalam Postingan */}
              <div className="flex items-center gap-3 pt-1 text-[#E36633]">
                <Heart size={16} className="fill-[#E36633] stroke-[#E36633]" />
                <Repeat size={16} className="stroke-[#1E1915]" />
                <Send size={16} className="stroke-[#1E1915]" />
              </div>
            </div>

            {/* Bottom Bar Icons (Outside Inner Frame) */}
            <div className="flex items-center justify-between px-1 pt-1">
              <div className="flex items-center gap-4 text-[#1E1915]">
                <Heart size={22} className="stroke-[2.5px]" />
                <div className="w-6 h-6 rounded-full border-2 border-[#1E1915] flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full border-2 border-[#1E1915]" />
                </div>
                <Send size={22} className="stroke-[2.5px]" />
              </div>
              <Bookmark size={22} className="stroke-[2.5px] text-[#1E1915]" />
            </div>

          </div>
        </div>

      </motion.div>
    </>
  );
};