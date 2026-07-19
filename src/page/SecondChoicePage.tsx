import React from 'react';
import { motion } from 'motion/react';
import { Language, MiloExpression, GameScreen, GameStats } from '../types';
import { headlineOptions, secondaryComments, commentsData } from '../data/gameContent';
import { MiloOtter } from '../components/MiloOtter';
import { DialogBubble } from '../components/DialogBubble';
import { PhoneMockup } from '../components/PhoneMockup';

interface SecondChoicePageProps {
  lang: Language;
  playSynthSound: (type: 'click' | 'success' | 'fail' | 'slide') => void;
  setScreen: (screen: GameScreen) => void;
  currentMiloExpression: MiloExpression;
  currentUsername: string;
  stats: GameStats;
  headlineChoice: 'A' | 'B' | null;
  sourceChoice: 'A' | 'B' | null;
  secondChoice: 'continue' | 'repent' | 'stop' | null;
  selectedChapterId: string;
  getSecondChoiceText: () => string;
  getSecondQuestionText: () => string;
}

export const SecondChoicePage: React.FC<SecondChoicePageProps> = ({
  lang,
  playSynthSound,
  setScreen,
  currentMiloExpression,
  currentUsername,
  stats,
  headlineChoice,
  sourceChoice,
  secondChoice,
  selectedChapterId,
  getSecondChoiceText,
  getSecondQuestionText
}) => {
  return (
    <motion.div
      key="second_choice"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full max-w-5xl"
    >
      <div className="lg:col-span-7 space-y-6">
        <MiloOtter expression={currentMiloExpression} size={150} className="mx-auto lg:mx-0" />

        <DialogBubble
          text={getSecondChoiceText()}
          variant={secondChoice === 'continue' ? 'orange' : 'green'}
        />

        {/* Moral reflection quote container */}
        <div className="bg-[#1E1915] text-[#FAF6F0] rounded-2xl p-5 border border-[#1E1915] font-sans font-bold text-sm md:text-base leading-relaxed tracking-normal select-text">
          <span className="text-[#E36633] text-2xl font-serif mr-1 block">&ldquo;</span>
          {getSecondQuestionText()}
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={() => { playSynthSound('success'); setScreen('final_reflection'); }}
            className="px-8 py-3.5 bg-[#E36633] text-white font-sans font-extrabold rounded-2xl border-2 border-[#1E1915] shadow-[4px_4px_0px_0px_#1E1915] hover:bg-[#D15525] transition-all cursor-pointer"
            id="btn-conseq-next-reflection"
          >
            {lang === 'id' ? "Buka Kartu Refleksi" : "Open Reflection Card"} <span>🛡️</span>
          </button>
        </div>
      </div>

      {/* Consequence Phone Comments updates */}
      <div className="lg:col-span-5 flex justify-center">
        <PhoneMockup
          lang={lang}
          username={currentUsername}
          followers={stats.followers}
          trust={stats.trust}
          postTitle={headlineChoice === 'A' ? headlineOptions[0].text[lang] : headlineOptions[1].text[lang]}
          postSource={sourceChoice === 'A' ? "FYP TikTok" : "Platform Resmi Toko Online"}
          postVerified={headlineChoice === 'B'}
          comments={secondaryComments[`${selectedChapterId}_${secondChoice}`]?.map((c) => ({
            user: c.user,
            text: c.text[lang],
            isNegative: c.isNegative
          })) || commentsData[selectedChapterId]?.map((c) => ({
            user: c.user,
            text: c.text[lang],
            isNegative: c.isNegative
          }))}
          isOutcomeScreen={true}
          hasRedCross={selectedChapterId === 'filtered_defense' && secondChoice === 'stop'}
        />
      </div>
    </motion.div>
  );
};
