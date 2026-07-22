import React from 'react';
import { motion } from 'motion/react';
import { Award } from 'lucide-react';
import { Language, GameScreen } from '../types';
import { PhoneMockup } from '../components/PhoneMockup';
import badgeImage from '../asset/gambar/2.png';

// ==========================================
// NASKAH TEKS LOKAL (GABUNGAN DI DALAM FILE)
// ==========================================
const LOCAL_TEXTS = {
  id: {
    subTagline: "Masuki simulasi menjadi kreator konten. Setiap pilihanmu menentukan apakah kamu akan menjadi pelindung kebenaran atau agen kekacauan digital.",
    btnPlay: "Main Sekarang",
    btnChapters: "Koleksi Chapter"
  },
  en: {
    subTagline: "Enter the content creator simulation. Every choice you make determines whether you become a defender of truth or an agent of digital chaos.",
    btnPlay: "Play Now",
    btnChapters: "Chapter Collection"
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
  // Ambil teks sesuai bahasa aktif dari objek lokal di atas
  const t = LOCAL_TEXTS[lang];

  return (
    <motion.div
      key="home"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full"
    >
      <div className="lg:col-span-7 space-y-6 md:space-y-8">
        {/* Otter Badge with text */}
        <div className="inline-flex items-center gap-2 bg-[#B4C285]/20 border-2 border-[#B4C285] px-3.5 py-1.5 rounded-full">
          {/* Ditambahkan rounded-full, w-6, h-6, dan bg-white agar kontras ikon 2.png menjadi bulat rapi */}
          <img 
            src={badgeImage} 
            alt="Milo badge" 
            className="w-6 h-6 object-contain rounded-full bg-white p-0.5" 
          />
          <span className="font-mono text-xs font-bold text-[#242D13] tracking-wide uppercase">
            Literacy Adventure with Milo
          </span>
        </div>

        {/* Judul Game */}
        <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-[#1E1915] leading-tight select-text">
          Postingan pertama kamu, <span className="text-[#E36633] underline decoration-[#1E1915] decoration-4 md:decoration-6 underline-offset-4 md:underline-offset-8">taruhannya</span> kepercayaan orang.
        </h1>

        {/* Sub-Tagline Deskripsi */}
        <p className="font-sans font-semibold text-base md:text-lg text-[#5C4D3F] leading-relaxed max-w-xl select-text">
          {t.subTagline}
        </p>

        {/* Tombol Navigasi Menu Utama */}
        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <button
            onClick={() => { playSynthSound('success'); setScreen('milo_intro'); }}
            className="px-8 py-4 bg-[#1E1915] text-white hover:bg-[#2D2823] font-sans font-extrabold text-base md:text-lg rounded-2xl border-2 border-[#1E1915] shadow-[5px_5px_0px_0px_#8C7662] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0px_0px_#8C7662] transition-all flex items-center justify-center gap-2 cursor-pointer"
            id="btn-play-now"
          >
            <span>🚀</span> {t.btnPlay}
          </button>

          <button
            onClick={() => { playSynthSound('click'); setScreen('chapters'); }}
            className="px-8 py-4 bg-[#FFFDF9] text-[#1E1915] hover:bg-[#FAF6F0] font-sans font-extrabold text-base md:text-lg rounded-2xl border-2 border-[#1E1915] shadow-[5px_5px_0px_0px_#1E1915] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0px_0px_#1E1915] transition-all flex items-center justify-center gap-2 cursor-pointer"
            id="btn-chapters-gallery"
          >
            <Award size={20} className="text-[#E36633]" />
            {t.btnChapters}
          </button>
        </div>
      </div>

      {/* Right Side: Showcase Smartphone preview */}
      <div className="lg:col-span-5 flex justify-center">
        <PhoneMockup
          lang={lang}
          username="LambuKetupat"
          followers={12}
          trust={100}
          postTitle="KAMU PELAJAR PENGANGGURAN? KERJA ONLINE: Sambil Rebahan! Cuma Like Video YouTube Dibayar 50 Ribu/Tugas. Butuh 100 Orang Gercep!"
          postVerified={false}
        />
      </div>
    </motion.div>
  );
};