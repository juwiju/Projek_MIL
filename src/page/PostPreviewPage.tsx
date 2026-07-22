import React from 'react';
import { motion } from 'motion/react';
import { Language, GameScreen, MiloExpression } from '../types';
import { DialogBubble } from '../components/DialogBubble';
import MiloHeadImg from '../asset/gambar/Filtered Defense.png';

// ==========================================
// NASKAH DIALOG CONDITIONAL & HEADLINE
// ==========================================
const LOCAL_TEXTS = {
  id: {
    actionA_Milo: "SEKARANG KAMU TINGGAL NGOPI AJA DEH SAMBIL LIAT POSTINGANNYA NANTI WELL",
    actionB_Milo: "WOW, KEREN BANGET NIH POSTINGANNYA. PASTI VIRAL SIH INI KEKEKEKEKE",
    btnSeeReaction: "Lihat Reaksi Netizen 💬",
    draftBadge: "DRAF POSTINGAN"
  },
  en: {
    actionA_Milo: "NOW YOU CAN JUST CHILL AND DRINK COFFEE WHILE WATCHING THE POST LATER WELL",
    actionB_Milo: "WOW, THIS POST LOOKS AMAZING. IT'S DEFINITELY GOING VIRAL HEHEHEHE",
    btnSeeReaction: "See Netizen Reactions 💬",
    draftBadge: "DRAFT POST"
  }
};

const LOCAL_HEADLINES = [
  { text: { id: "KERJA ONLINE: Sambil Rebahan! Cuma Like Video YouTube Dibayar 50 Ribu/Tugas. Butuh 100 Orang Gercep!", en: "ONLINE WORK: While Relaxing! Just Like YouTube Videos Get Paid 50k/Task. Need 100 People Fast!" } },
  { text: { id: "WASPADA! Penipuan Berkedok Loker Like-and-Share YouTube Mulai Memakan Korban. Ini Faktanya!", en: "BEWARE! YouTube Like-and-Share Job Scams Start Claiming Victims. Here Are the Facts!" } }
];

interface PostPreviewPageProps {
  lang: Language;
  playSynthSound: (type: 'click' | 'success' | 'fail' | 'slide') => void;
  setScreen: (screen: GameScreen) => void;
  currentMiloExpression?: MiloExpression;
  currentUsername: string;
  headlineChoice: 'A' | 'B' | null;
  sourceChoice?: 'A' | 'B' | null;
  actionChoice: 'A' | 'B' | null;
  goToFeedOutcome?: () => void;
  onSeeReactionsClick?: () => void;
}

export const PostPreviewPage: React.FC<PostPreviewPageProps> = ({
  lang,
  playSynthSound,
  setScreen,
  currentUsername,
  headlineChoice,
  sourceChoice,
  actionChoice,
  goToFeedOutcome,
  onSeeReactionsClick
}) => {
  const t = LOCAL_TEXTS[lang];

  // Pilih teks dialog Milo sesuai actionChoice
  const miloText = actionChoice === 'A' ? t.actionA_Milo : t.actionB_Milo;

  // Ambil teks headline berdasarkan pilihan pemain
  const selectedHeadlineText = headlineChoice === 'A' 
    ? LOCAL_HEADLINES[0].text[lang] 
    : LOCAL_HEADLINES[1].text[lang];

  const handleNext = () => {
    playSynthSound('slide');
    if (onSeeReactionsClick) {
      onSeeReactionsClick();
    } else if (goToFeedOutcome) {
      goToFeedOutcome();
    } else {
      setScreen('feed_outcome');
    }
  };

  return (
    <motion.div
      key="post_preview"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full max-w-5xl"
    >
      {/* Kolom Kiri: Dialog Dinamis Milo */}
      <div className="lg:col-span-6 space-y-6">
        <div className="relative pb-6">
          {/* Dialog Bubble Hijau Milo */}
          <DialogBubble 
            text={miloText} 
            variant="green" 
            className="!pl-16 sm:!pl-20 md:!pl-24 !py-4" 
          />

          {/* Kepala Milo Pop-out Pojok Kiri Atas */}
          <img 
            src={MiloHeadImg} 
            alt="Milo Otter" 
            className="absolute -top-10 -left-6 w-[90px] sm:w-[110px] md:w-[120px] h-auto object-contain z-20 pointer-events-none drop-shadow-md -rotate-6"
          />
        </div>

        {/* Tombol Lanjut ke Reaksi Netizen */}
        <div className="flex justify-start pt-2">
          <button
            onClick={handleNext}
            className="px-8 py-3 bg-[#1E1915] text-white font-sans font-extrabold text-sm md:text-base rounded-2xl border-2 border-[#1E1915] shadow-[4px_4px_0px_0px_#8C7662] hover:bg-[#2D2823] transition cursor-pointer flex items-center gap-2"
            id="btn-see-reactions"
          >
            {t.btnSeeReaction}
          </button>
        </div>
      </div>

      {/* Kolom Kanan: Tampilan Card Draf Postingan Tanpa Profil/Stats */}
      <div className="lg:col-span-6 flex justify-center">
        <div className="w-full max-w-md bg-[#FFFDF9] border-3 border-[#1E1915] rounded-3xl p-6 shadow-[6px_6px_0px_0px_#1E1915] space-y-4 relative">
          
          {/* Badge Atas */}
          <div className="flex items-center justify-between border-b-2 border-[#1E1915]/10 pb-3">
            <span className="font-mono text-xs font-extrabold bg-[#E36633]/20 text-[#E36633] border border-[#E36633] px-3 py-0.5 rounded-full uppercase tracking-wider">
              {t.draftBadge}
            </span>
            <span className="text-xs font-mono font-bold text-[#8C7662]">
              @{currentUsername}
            </span>
          </div>

          {/* Isi Konten Postingan */}
          <div className="space-y-3 pt-2">
            <h3 className="font-sans font-extrabold text-base md:text-lg text-[#1E1915] leading-snug">
              "{selectedHeadlineText}"
            </h3>

            {/* Sumber Berita */}
            <div className="flex items-center gap-2 pt-2">
              <span className="text-xs font-mono font-extrabold text-[#8C7662] uppercase bg-[#FAF1E6] px-2.5 py-1 rounded border border-[#1E1915]">
                Sumber: {sourceChoice === 'A' ? "FYP TikTok" : "Portal Berita / Official"}
              </span>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
};