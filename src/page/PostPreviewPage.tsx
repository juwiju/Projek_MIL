import React from 'react';
import { motion } from 'motion/react';
import { Heart, Repeat, Send, Bookmark, User } from 'lucide-react';
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
      className="grid grid-cols-1 landscape:grid-cols-12 lg:grid-cols-12 gap-6 landscape:gap-6 lg:gap-8 items-center w-full max-w-5xl mx-auto px-2"
    >
      {/* Kolom Kiri: Dialog Dinamis Milo */}
      <div className="landscape:col-span-6 lg:col-span-6 space-y-4 landscape:space-y-4 md:space-y-6">
        <div className="relative pt-6">
          {/* Dialog Bubble Hijau Milo */}
          <DialogBubble 
            text={miloText} 
            variant="green" 
            className="!pl-16 landscape:!pl-16 sm:!pl-20 md:!pl-24 !py-4" 
          />

          {/* Kepala Milo Pop-out Pojok Kiri Atas */}
          <img 
            src={MiloHeadImg} 
            alt="Milo Otter" 
            className="absolute -top-10 landscape:-top-6 -left-6 landscape:-left-4 w-[80px] landscape:w-[70px] sm:w-[110px] md:w-[120px] h-auto object-contain z-20 pointer-events-none drop-shadow-md -rotate-6"
          />
        </div>

        {/* Tombol Lanjut ke Reaksi Netizen */}
        <div className="flex justify-center landscape:justify-start pt-1 md:pt-2">
          <button
            onClick={handleNext}
            className="px-6 py-2.5 md:px-8 md:py-3 bg-[#1E1915] text-white font-sans font-extrabold text-xs md:text-base rounded-xl md:rounded-2xl border-2 border-[#1E1915] shadow-[4px_4px_0px_0px_#8C7662] hover:bg-[#2D2823] transition cursor-pointer flex items-center gap-2"
            id="btn-see-reactions"
          >
            {t.btnSeeReaction}
          </button>
        </div>
      </div>

      {/* Kolom Kanan: Card Postingan Medsos Identik Dengan HomePage */}
      <div className="landscape:col-span-6 lg:col-span-6 flex justify-center">
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
            
            {/* Header Inner: Badge Draf & Username */}
            <div className="flex items-center justify-between border-b border-[#1E1915]/10 pb-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-stone-200 border border-[#1E1915] flex items-center justify-center">
                  <User size={14} className="text-[#1E1915]" />
                </div>
                <span className="text-[11px] md:text-xs font-mono font-bold text-[#1E1915]">
                  @{currentUsername || 'username'}
                </span>
              </div>
              <span className="font-mono text-[9px] md:text-[10px] font-extrabold bg-[#E36633]/20 text-[#E36633] border border-[#E36633] px-2 py-0.5 rounded-full uppercase tracking-wider">
                {t.draftBadge}
              </span>
            </div>

            {/* Teks Isi Headline Postingan */}
            <p className="font-sans font-black text-xs landscape:text-[11px] md:text-sm text-[#1E1915] leading-snug uppercase">
              "{selectedHeadlineText}"
            </p>

            {/* Sumber Berita */}
            <div className="pt-1">
              <span className="text-[9px] md:text-[10px] font-mono font-extrabold text-[#8C7662] uppercase bg-[#FAF1E6] px-2 py-0.5 rounded border border-[#1E1915]">
                Sumber: {sourceChoice === 'A' ? "FYP TikTok" : "Portal Berita / Official"}
              </span>
            </div>

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
  );
};