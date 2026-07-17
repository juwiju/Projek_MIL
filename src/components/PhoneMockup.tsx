import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, User, Heart, MessageCircle, Send, Bookmark } from 'lucide-react';
import { Language } from '../types';

interface PhoneMockupProps {
  lang: Language;
  username: string;
  onUsernameChange?: (dir: 'left' | 'right') => void;
  followers: number;
  trust: number;
  postTitle?: string;
  postSource?: string;
  postVerified?: boolean;
  comments?: { user: string; text: string; isNegative?: boolean }[];
  isOutcomeScreen?: boolean;
  hasRedCross?: boolean;
}

export const PhoneMockup: React.FC<PhoneMockupProps> = ({
  lang,
  username,
  onUsernameChange,
  followers,
  trust,
  postTitle,
  postSource,
  postVerified,
  comments,
  isOutcomeScreen = false,
  hasRedCross = false
}) => {
  const isId = lang === 'id';

  return (
    <div className="relative mx-auto w-[280px] h-[520px] md:w-[310px] md:h-[570px] bg-[#FAF6F0] rounded-[40px] border-[8px] border-[#2D2A26] shadow-[12px_12px_0px_0px_rgba(30,25,21,0.15)] flex flex-col overflow-hidden">
      {/* Phone Notch/Speaker */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-5 bg-[#2D2A26] rounded-b-xl z-20 flex items-center justify-center">
        <div className="w-10 h-1 bg-[#4A453F] rounded-full" />
      </div>

      {/* Screen Content Wrapper */}
      <div className="flex-1 flex flex-col pt-7 px-4 pb-4 overflow-y-auto custom-scrollbar select-none">
        
        {/* Profile Card Section (Top half, only shown if not full screen feed or if needed) */}
        {!isOutcomeScreen && (
          <div className="bg-white border-2 border-[#1E1915] rounded-2xl p-4 shadow-[3px_3px_0px_0px_#1E1915] mb-4">
            <h3 className="text-center font-bold text-[#1E1915] text-sm uppercase tracking-wide border-b-2 border-[#EAD4C3] pb-2 mb-3">
              {isId ? "Profil Kreator" : "Creator Profile"}
            </h3>

            <div className="flex flex-col items-center">
              {/* Profile Avatar Grid */}
              <div className="w-16 h-16 rounded-full bg-[#EAD4C3] border-2 border-[#1E1915] flex items-center justify-center shadow-inner mb-2 relative">
                <User size={32} className="text-[#5C4D3F]" />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#7BA65C] border-2 border-[#1E1915] rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                </div>
              </div>

              {/* Username selector with arrows */}
              <div className="flex items-center gap-2 mb-3">
                {onUsernameChange ? (
                  <button 
                    onClick={() => onUsernameChange('left')}
                    className="p-1 rounded-lg border border-[#1E1915] bg-[#EAD4C3] hover:bg-[#DBC1AF] active:scale-95 transition"
                    id="btn-prev-username"
                  >
                    <ChevronLeft size={16} className="text-[#1E1915]" />
                  </button>
                ) : (
                  <div className="w-4" />
                )}

                <span className="font-mono font-bold text-xs bg-[#1E1915] text-[#F3EFE9] px-2.5 py-1 rounded-full text-center min-w-[110px] truncate">
                  @{username}
                </span>

                {onUsernameChange ? (
                  <button 
                    onClick={() => onUsernameChange('right')}
                    className="p-1 rounded-lg border border-[#1E1915] bg-[#EAD4C3] hover:bg-[#DBC1AF] active:scale-95 transition"
                    id="btn-next-username"
                  >
                    <ChevronRight size={16} className="text-[#1E1915]" />
                  </button>
                ) : (
                  <div className="w-4" />
                )}
              </div>

              {/* Live Statistics with Progress bars */}
              <div className="w-full space-y-2">
                {/* Followers */}
                <div>
                  <div className="flex justify-between font-bold text-xs text-[#5C4D3F] mb-1">
                    <span>{isId ? "Pengikut" : "Followers"}</span>
                    <span className="font-mono text-[#1E1915]">{followers}</span>
                  </div>
                  <div className="w-full h-2.5 bg-[#F0EBE3] border border-[#1E1915] rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-[#E36633]"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((followers / 500) * 100, 100)}%` }}
                      transition={{ duration: 0.8 }}
                    />
                  </div>
                </div>

                {/* Public Trust */}
                <div>
                  <div className="flex justify-between font-bold text-xs text-[#5C4D3F] mb-1">
                    <span>{isId ? "Kepercayaan Publik" : "Public Trust"}</span>
                    <span className="font-mono text-[#1E1915]">{trust}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-[#F0EBE3] border border-[#1E1915] rounded-full overflow-hidden">
                    <motion.div 
                      className={`h-full ${trust >= 80 ? 'bg-[#7BA65C]' : trust >= 45 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${trust}%` }}
                      transition={{ duration: 0.8 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Current Post display / Social Media Feed Mockup */}
        {(postTitle || comments) && (
          <div className="flex-1 flex flex-col">
            <div className={`bg-white border-2 border-[#1E1915] rounded-2xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(30,25,21,0.1)] flex flex-col relative ${hasRedCross ? 'bg-red-50/70 border-red-500' : ''}`}>
              
              {/* Instagram/TikTok Header layout */}
              <div className="flex items-center gap-2 p-3 border-b-2 border-[#EAD4C3]">
                <div className="w-8 h-8 rounded-full bg-[#EAD4C3] border border-[#1E1915] flex items-center justify-center font-bold text-xs text-[#5C4D3F]">
                  {username ? username.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-xs text-[#1E1915] truncate">@{username}</div>
                  <div className="text-[10px] text-[#A08875] font-semibold">
                    {postVerified ? (isId ? '✓ Terverifikasi resmi' : '✓ Officially Verified') : (isId ? 'Sponsor / Viral' : 'Sponsor / Viral')}
                  </div>
                </div>
              </div>

              {/* POST CONTENT TEXT BODY */}
              <div className="p-3 bg-[#FAF6F0] min-h-[90px] border-b border-[#EAD4C3] flex flex-col justify-between relative">
                <p className="font-sans font-bold text-xs text-[#2E2823] leading-relaxed select-text">
                  {postTitle}
                </p>
                {postSource && (
                  <div className="mt-2 text-[10px] font-mono font-bold bg-[#EAD4C3]/40 border border-[#1E1915]/20 text-[#5C4D3F] px-1.5 py-0.5 rounded self-start">
                    Sumber: {postSource}
                  </div>
                )}

                {/* Big Red Cross for Filtered Canceled posts (Page 13) */}
                {hasRedCross && (
                  <motion.div 
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1.1, rotate: 0 }}
                    className="absolute inset-0 bg-red-100/85 flex flex-col items-center justify-center z-10 p-2 text-center"
                  >
                    <span className="text-red-600 font-extrabold text-5xl tracking-widest animate-pulse">✕</span>
                    <span className="text-red-700 font-bold text-xs uppercase tracking-wide mt-1">
                      {isId ? "POSTINGAN DIBATALKAN" : "POST CANCELED"}
                    </span>
                  </motion.div>
                )}
              </div>

              {/* Interaction Bar icons */}
              <div className="flex justify-between items-center px-3 py-2 border-b border-[#EAD4C3]">
                <div className="flex items-center gap-2.5">
                  <Heart size={16} className={`text-red-500 fill-red-500 cursor-pointer hover:scale-110 active:scale-95 transition-transform`} />
                  <MessageCircle size={16} className="text-[#1E1915] cursor-pointer hover:scale-110 transition-transform" />
                  <Send size={15} className="text-[#1E1915] cursor-pointer hover:scale-110 transition-transform" />
                </div>
                <Bookmark size={16} className="text-[#1E1915] cursor-pointer" />
              </div>

              {/* OUTCOME / LIVE COMMENTS FEED SECTION */}
              {comments && comments.length > 0 && (
                <div className="p-3 bg-[#FAF6F0] flex-1 max-h-[160px] md:max-h-[190px] overflow-y-auto custom-scrollbar flex flex-col gap-2">
                  <span className="font-bold text-[10px] text-[#8C7662] uppercase tracking-wider block mb-1">
                    {isId ? "Komentar Netizen" : "Netizen Comments"}
                  </span>
                  
                  <AnimatePresence>
                    {comments.map((comment, index) => (
                      <motion.div
                        key={index}
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.15 }}
                        className={`p-2 rounded-xl border border-[#1E1915]/10 text-[11px] leading-snug shadow-sm ${
                          comment.isNegative 
                            ? 'bg-red-50 text-red-900 border-red-200' 
                            : 'bg-white text-[#2D2A26]'
                        }`}
                      >
                        <span className="font-bold font-mono text-[#5C4D3F] mr-1 block sm:inline">
                          {comment.user}
                        </span>
                        <span className="font-medium select-text">{comment.text}</span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
            
            {/* Live Changing Stats Banner for outcomes (Page 11/12) */}
            {isOutcomeScreen && (
              <div className="mt-3 bg-[#1E1915] text-[#FAF6F0] p-2.5 rounded-xl border border-[#1E1915] flex justify-between items-center text-xs font-bold font-mono">
                <div className="flex items-center gap-1">
                  <span className="text-[#B4C285]">👥</span>
                  <span>{followers}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[#E36633]">❤️</span>
                  <span>{trust}%</span>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
      
      {/* Home Indicator line */}
      <div className="h-4 flex items-center justify-center pb-2 bg-[#FAF6F0]">
        <div className="w-24 h-1 bg-[#2D2A26] rounded-full" />
      </div>
    </div>
  );
};
