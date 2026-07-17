import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Sparkles, Send, RefreshCw } from 'lucide-react';
import { Language, GameStats } from '../types';

interface ReflectionCardProps {
  lang: Language;
  chapterId: string;
  title: string;
  subtitle: string;
  question: string;
  stats: GameStats;
  onSave: (text: string) => void;
  onBackToHome: () => void;
}

export const ReflectionCard: React.FC<ReflectionCardProps> = ({
  lang,
  chapterId,
  title,
  subtitle,
  question,
  stats,
  onSave,
  onBackToHome
}) => {
  const [response, setResponse] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const isId = lang === 'id';

  // Synth sounds using standard Web Audio API - no third-party assets needed!
  const playSaveChime = () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Node 1: High success ding
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc1.frequency.exponentialRampToValueAtTime(1046.50, ctx.currentTime + 0.35); // C6
      
      gain1.gain.setValueAtTime(0.12, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start();
      osc1.stop(ctx.currentTime + 0.5);

      // Node 2: Warm fundamental major third
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(659.25, ctx.currentTime + 0.08); // E5
      
      gain2.gain.setValueAtTime(0.10, ctx.currentTime + 0.08);
      gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.45);
      
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(ctx.currentTime + 0.08);
      osc2.stop(ctx.currentTime + 0.5);
    } catch (e) {
      // Audio context disabled
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!response.trim()) return;
    
    playSaveChime();
    onSave(response);
    setIsSaved(true);
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="max-w-xl mx-auto bg-[#FFFDF9] border-3 border-[#1E1915] rounded-3xl p-6 md:p-8 shadow-[8px_8px_0px_0px_#1E1915] relative overflow-hidden"
    >
      {/* Decorative top strip */}
      <div className="absolute top-0 left-0 right-0 h-3 bg-[#E36633]" />

      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-xl bg-[#FAF1E6] border border-[#1E1915]">
          <BookOpen size={20} className="text-[#E36633]" />
        </div>
        <span className="font-mono text-xs uppercase tracking-widest text-[#8C7662] font-bold">
          {isId ? "Kartu Refleksi Digital" : "Digital Reflection Card"}
        </span>
      </div>

      <h2 className="font-sans font-extrabold text-2xl md:text-3xl text-[#1E1915] tracking-tight leading-tight mb-2">
        {title}
      </h2>
      
      <p className="font-sans font-bold text-sm text-[#8C7662] border-b-2 border-[#FAF1E6] pb-4 mb-5">
        {subtitle}
      </p>

      {/* Stats Achieved */}
      <div className="bg-[#FAF6F0] border-2 border-[#1E1915] rounded-2xl p-4 mb-6 flex justify-around items-center text-center shadow-[3px_3px_0px_0px_#1E1915]">
        <div>
          <div className="text-xs font-mono font-bold text-[#8C7662] uppercase mb-0.5">
            {isId ? "Pengikut Akhir" : "Final Followers"}
          </div>
          <div className="font-mono font-extrabold text-xl text-[#E36633]">
            {stats.followers}
          </div>
        </div>
        <div className="w-px h-8 bg-[#EAD4C3]" />
        <div>
          <div className="text-xs font-mono font-bold text-[#8C7662] uppercase mb-0.5">
            {isId ? "Kepercayaan Publik" : "Public Trust"}
          </div>
          <div className="font-mono font-extrabold text-xl text-[#7BA65C]">
            {stats.trust}%
          </div>
        </div>
      </div>

      {/* The Question Prompt */}
      <div className="bg-[#B4C285]/20 border-2 border-[#B4C285] rounded-2xl p-4 md:p-5 mb-6 relative">
        <div className="absolute -top-3 left-4 bg-[#B4C285] text-[#242D13] text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-full border border-[#1E1915]">
          MILO'S CHALLENGE
        </div>
        <p className="font-sans font-extrabold text-[#242D13] text-base md:text-lg leading-relaxed select-text">
          "{question}"
        </p>
      </div>

      {/* Text Area form */}
      {!isSaved ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-xs font-mono font-bold text-[#5C4D3F] uppercase">
            {isId ? "Tuliskan refleksi jujurmu di sini:" : "Type your honest reflection here:"}
          </label>
          <textarea
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            required
            rows={4}
            maxLength={300}
            placeholder={
              isId
                ? "Tulis pendapatmu... (Max 300 karakter)"
                : "Type your thoughts... (Max 300 characters)"
            }
            className="w-full border-2 border-[#1E1915] rounded-2xl p-4 bg-[#FAF6F0] focus:bg-white focus:ring-0 focus:outline-none focus:border-[#E36633] transition font-sans font-semibold text-[#1E1915] shadow-inner text-sm md:text-base leading-relaxed"
          />

          <div className="flex justify-between items-center text-xs font-mono text-[#8C7662]">
            <span>{response.length}/300 {isId ? "karakter" : "characters"}</span>
            <span>{isId ? "Tersimpan otomatis" : "Autosaved"}</span>
          </div>

          <button
            type="submit"
            disabled={!response.trim()}
            className={`w-full py-3.5 px-6 font-sans font-extrabold rounded-2xl border-2 border-[#1E1915] flex items-center justify-center gap-2 text-base shadow-[4px_4px_0px_0px_#1E1915] hover:shadow-[2px_2px_0px_0px_#1E1915] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer ${
              response.trim()
                ? 'bg-[#E36633] text-white hover:bg-[#D15525]'
                : 'bg-[#FAF1E6] text-[#A08875] border-[#DBC1AF] shadow-none cursor-not-allowed hover:translate-x-0 hover:translate-y-0'
            }`}
          >
            <Send size={18} />
            {isId ? "Simpan Refleksi & Klaim Lencana" : "Save Reflection & Claim Badge"}
          </button>
        </form>
      ) : (
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center py-6 space-y-5"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#B4C285]/20 border-2 border-[#B4C285] text-[#242D13] animate-bounce">
            <Sparkles size={28} />
          </div>
          
          <div className="space-y-1">
            <h3 className="font-sans font-extrabold text-xl text-[#242D13]">
              {isId ? "Refleksi Berhasil Disimpan!" : "Reflection Successfully Saved!"}
            </h3>
            <p className="font-sans font-semibold text-sm text-[#8C7662] max-w-sm mx-auto">
              {isId
                ? "Hebat! Kamu telah menyelesaikan petualangan ini dan mengamankan lencana barumu di galeri!"
                : "Awesome! You have completed this adventure and secured your new badge in the gallery!"}
            </p>
          </div>

          <button
            onClick={onBackToHome}
            className="px-8 py-3.5 bg-[#1E1915] text-[#FAF6F0] font-sans font-extrabold rounded-2xl border-2 border-[#1E1915] shadow-[4px_4px_0px_0px_#8C7662] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#8C7662] transition-all cursor-pointer"
          >
            {isId ? "Kembali ke Menu Utama" : "Return to Main Menu"}
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};
