import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Lock, Calendar, Award, BookOpen } from 'lucide-react';
import { Language, SavedReflection } from '../types';
import ChaosCatalystImg from '../asset/gambar/The Chaos Catalyst.png';
import FilteredDefenseImg from '../asset/gambar/Filtered Defense.png';
import PristineAnchorImg from '../asset/gambar/Pristine Anchor.png';
import SensationalTruthImg from '../asset/gambar/Sensationalized Truth.png';

interface ChapterSelectionProps {
  lang: Language;
  savedReflections: SavedReflection[];
  onBackToHome: () => void;
  onSelectSavedReflection?: (reflection: SavedReflection) => void;
}

interface ChapterMetadata {
  id: string;
  name: Record<Language, string>;
  subtitle: Record<Language, string>;
  icon: string;
  color: string;
  borderColor: string;
} 

const chaptersMeta: ChapterMetadata[] = [
  {
    id: 'chaos_catalyst',
    name: { id: "The Chaos Catalyst", en: "The Chaos Catalyst" },
    subtitle: { id: "Chapter 1: Menyebarkan Hoax/Scam", en: "Chapter 1: Spreading Hoax/Scam" },
    icon: ChaosCatalystImg, // Menggunakan variabel import yang benar
    color: "bg-[#FAD2E1]",
    borderColor: "border-[#E85D04]"
  },
  {
    id: 'sensational_truth',
    name: { id: "Sensationalized Truth", en: "Sensationalized Truth" },
    subtitle: { id: "Chapter 2: Clickbait Berujung Ribut", en: "Chapter 2: Clickbait Causes Drama" },
    icon: SensationalTruthImg, // Menggunakan variabel import yang benar
    color: "bg-[#FFF1C5]",
    borderColor: "border-[#F4A261]"
  },
  {
    id: 'filtered_defense',
    name: { id: "Filtered Defense", en: "Filtered Defense" },
    subtitle: { id: "Chapter 3: Saring Sebelum Sharing", en: "Chapter 3: Filter Before Sharing" },
    icon: FilteredDefenseImg, // Menggunakan variabel import yang benar
    color: "bg-[#E2F0CB]",
    borderColor: "border-[#7BA65C]"
  },
  {
    id: 'pristine_anchor',
    name: { id: "Pristine Anchor", en: "Pristine Anchor" },
    subtitle: { id: "Chapter 4: Jurnalis Kredibel Jujur", en: "Chapter 4: Credible & Honest Creator" },
    icon: PristineAnchorImg, // Menggunakan variabel import yang benar
    color: "bg-[#C5D3E8]",
    borderColor: "border-[#3A86C8]"
  }
];

export const ChapterSelection: React.FC<ChapterSelectionProps> = ({
  lang,
  savedReflections,
  onBackToHome,
  onSelectSavedReflection
}) => {
  const isId = lang === 'id';

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBackToHome}
          className="p-2.5 rounded-2xl border-2 border-[#1E1915] bg-[#FFFDF9] shadow-[3px_3px_0px_0px_#1E1915] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#1E1915] transition-all cursor-pointer"
          id="btn-back-chapters"
        >
          <ArrowLeft size={20} className="text-[#1E1915]" />
        </button>
        <div>
          <h1 className="font-sans font-extrabold text-3xl text-[#1E1915] tracking-tight">
            {isId ? "Koleksi Chapter" : "Chapter Collection"}
          </h1>
          <p className="font-sans font-semibold text-sm text-[#8C7662]">
            {isId
              ? "Mainkan game dengan berbagai keputusan untuk membuka semua chapter lencana!"
              : "Play the game making different decisions to unlock all chapter badges!"}
          </p>
        </div>
      </div>

      {/* Chapters Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {chaptersMeta.map((ch) => {
          const reflection = savedReflections.find((r) => r.chapterId === ch.id);
          const isUnlocked = !!reflection;

          return (
            <motion.div
              key={ch.id}
              whileHover={{ y: -4 }}
              className={`border-3 border-[#1E1915] rounded-3xl p-5 shadow-[5px_5px_0px_0px_#1E1915] flex flex-col items-center text-center relative overflow-hidden transition-all ${
                isUnlocked ? `${ch.color}` : 'bg-[#EAD4C3]/30 border-dashed border-gray-400 opacity-80'
              }`}
            >
              {/* Badge/Icon display */}
              <div className={`w-16 h-16 rounded-full border-2 border-[#1E1915] flex items-center justify-center text-3xl shadow-[3px_3px_0px_0px_#1E1915] mb-4 relative ${
                isUnlocked ? 'bg-white' : 'bg-[#DBC1AF]/50 text-gray-400'
              }`}>
                {isUnlocked ? (
                  // Cek apakah string berupa path eksternal/file asset untuk dirender sebagai gambar
                  ch.icon.includes('/') || ch.icon.includes('.') || ch.icon.startsWith('data:') ? (
                    <img 
                      src={ch.icon} 
                      alt={ch.name[lang]} 
                      className="w-16 h-16 object-contain" 
                    />
                  ) : (
                    <span>{ch.icon}</span>
                  )
                ) : (
                  <Lock size={20} className="text-[#8C7662]" />
                )}
                
                {isUnlocked && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#7BA65C] rounded-full border border-white flex items-center justify-center text-[8px] text-white">
                    ✓
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="font-sans font-extrabold text-base text-[#1E1915] leading-snug min-h-[44px] flex items-center justify-center">
                {ch.name[lang]}
              </h3>

              {/* Subtitle */}
              <p className="font-mono text-[10px] text-[#8C7662] font-bold uppercase tracking-wide mt-1">
                {ch.subtitle[lang]}
              </p>

              {/* Locked/Unlocked Action Button */}
              {isUnlocked && reflection && onSelectSavedReflection ? (
                <button
                  onClick={() => onSelectSavedReflection(reflection)}
                  className="mt-5 w-full py-2 bg-white hover:bg-[#FAF6F0] text-[#1E1915] font-sans font-bold text-xs rounded-xl border-2 border-[#1E1915] shadow-[3px_3px_0px_0px_#1E1915] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0px_0px_#1E1915] transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <BookOpen size={12} />
                  {isId ? "Buka Buku Harian" : "Open Diary"}
                </button>
              ) : (
                <div className="mt-5 w-full py-2 bg-[#FAF6F0]/40 text-[#8C7662]/70 font-mono text-[10px] font-bold rounded-xl border border-[#1E1915]/20 text-center select-none uppercase tracking-wider">
                  {isId ? "TERKUNCI" : "LOCKED"}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Diary Entry detail view if clicked */}
      {savedReflections.length > 0 && (
        <div className="bg-[#FFFDF9] border-3 border-[#1E1915] rounded-3xl p-6 md:p-8 shadow-[6px_6px_0px_0px_#1E1915] mt-8">
          <div className="flex items-center gap-2 mb-4">
            <Award className="text-[#E36633]" size={22} />
            <h2 className="font-sans font-extrabold text-xl md:text-2xl text-[#1E1915]">
              {isId ? "Buku Catatan Content Creator" : "Content Creator Diary Log"}
            </h2>
          </div>

          <p className="font-sans font-semibold text-sm text-[#8C7662] mb-6 border-b border-[#FAF1E6] pb-4">
            {isId 
              ? "Berikut adalah refleksi moral yang pernah kamu simpan sepanjang berpetualang menjadi kreator:"
              : "Here are the moral reflections you've saved along your journey as a content creator:"}
          </p>

          <div className="space-y-4">
            {savedReflections.map((ref, idx) => {
              const meta = chaptersMeta.find((c) => c.id === ref.chapterId);
              return (
                <div key={idx} className="p-4 rounded-2xl border-2 border-[#1E1915] bg-[#FAF6F0] flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      {/* Render Gambar Lencana Kecil di Buku Catatan Bawah */}
                      {meta?.icon && (meta.icon.includes('/') || meta.icon.includes('.') || meta.icon.startsWith('data:')) ? (
                        <img src={meta.icon} alt="" className="w-6 h-6 object-contain" />
                      ) : (
                        <span className="text-xl">{meta?.icon || "📝"}</span>
                      )}
                      
                      <span className="font-sans font-extrabold text-base text-[#1E1915]">
                        {meta?.name[lang] || ref.chapterId}
                      </span>
                      <span className="text-[10px] font-mono bg-[#E36633]/25 text-[#E36633] px-2 py-0.5 rounded-full font-bold">
                        @{ref.username}
                      </span>
                    </div>
                    <p className="font-sans font-bold text-xs text-[#242D13] italic bg-[#B4C285]/15 p-2.5 rounded-xl border border-[#B4C285]/30">
                      "{ref.reflectionText}"
                    </p>
                  </div>

                  <div className="flex md:flex-col items-start md:items-end justify-between md:justify-center gap-1 font-mono text-[10px] text-[#8C7662] font-semibold border-t md:border-t-0 pt-2 md:pt-0 border-[#1E1915]/10">
                    <div className="flex items-center gap-1">
                      <Calendar size={12} />
                      <span>{ref.date}</span>
                    </div>
                    <div className="font-bold">
                      👥 {ref.stats.followers} | ❤️ {ref.stats.trust}% Trust
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};