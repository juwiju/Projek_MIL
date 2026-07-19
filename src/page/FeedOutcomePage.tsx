import React from 'react';
import { motion } from 'motion/react';
import { Language, MiloExpression, GameScreen, GameStats } from '../types';
import { TranslationSet, headlineOptions, commentsData, chaptersDetails } from '../data/gameContent';
import { MiloOtter } from '../components/MiloOtter';
import { DialogBubble } from '../components/DialogBubble';
import { PhoneMockup } from '../components/PhoneMockup';

interface FeedOutcomePageProps {
  lang: Language;
  t: TranslationSet;
  playSynthSound: (type: 'click' | 'success' | 'fail' | 'slide') => void;
  setScreen: (screen: GameScreen) => void;
  currentMiloExpression: MiloExpression;
  currentUsername: string;
  stats: GameStats;
  headlineChoice: 'A' | 'B' | null;
  sourceChoice: 'A' | 'B' | null;
  selectedChapterId: string;
  selectConsequenceChoice: (choice: 'continue' | 'repent' | 'stop') => void;
}

export const FeedOutcomePage: React.FC<FeedOutcomePageProps> = ({
  lang,
  t,
  playSynthSound,
  setScreen,
  currentMiloExpression,
  currentUsername,
  stats,
  headlineChoice,
  sourceChoice,
  selectedChapterId,
  selectConsequenceChoice
}) => {
  return (
    <motion.div
      key="feed_outcome"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full max-w-5xl"
    >
      {/* Left Column: Outcome reactions and Choices */}
      <div className="lg:col-span-7 space-y-6">
        <MiloOtter expression={currentMiloExpression} size={150} className="mx-auto lg:mx-0" />
        
        {/* Otter dialogue feedback */}
        <DialogBubble
          text={
            selectedChapterId === 'chaos_catalyst' ? t.chaosMiloText :
            selectedChapterId === 'sensational_truth' ? t.sensationalMiloText :
            selectedChapterId === 'filtered_defense' ? t.filteredMiloText :
            t.pristineMiloText
          }
          variant={selectedChapterId === 'chaos_catalyst' ? 'orange' : 'green'}
        />

        {/* Sub prompt */}
        <div className="bg-white border-2 border-[#1E1915] rounded-2xl p-5 shadow-[4px_4px_0px_0px_#1E1915]">
          <p className="font-display font-extrabold text-base text-[#1E1915] mb-4">
            {t.continuePrompt}
          </p>

          <div className="flex flex-col gap-3">
            {chaptersDetails[selectedChapterId]?.options[lang].map((opt, i) => (
              <button
                key={i}
                onClick={() => selectConsequenceChoice(opt.action)}
                className={`w-full py-3 px-5 text-left font-sans font-extrabold text-xs md:text-sm rounded-xl border-2 border-[#1E1915] shadow-[3px_3px_0px_0px_#1E1915] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#1E1915] transition-all cursor-pointer ${
                  opt.action === 'continue' 
                    ? 'bg-[#E36633] text-white hover:bg-[#D15525]' 
                    : opt.action === 'repent'
                    ? 'bg-[#B4C285]/20 text-[#242D13] hover:bg-[#B4C285]/40'
                    : 'bg-[#FAF1E6] text-[#8C7662] hover:bg-[#EAD4C3]/50'
                }`}
                id={`btn-conseq-${opt.action}`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: Interactive feed mockup showing live followers/comments */}
      <div className="lg:col-span-5 flex justify-center">
        <PhoneMockup
          lang={lang}
          username={currentUsername}
          followers={stats.followers}
          trust={stats.trust}
          postTitle={headlineChoice === 'A' ? headlineOptions[0].text[lang] : headlineOptions[1].text[lang]}
          postSource={sourceChoice === 'A' ? "FYP TikTok" : "Platform Resmi Toko Online"}
          postVerified={headlineChoice === 'B'}
          comments={commentsData[selectedChapterId]?.map((c) => ({
            user: c.user,
            text: c.text[lang],
            isNegative: c.isNegative
          }))}
          isOutcomeScreen={true}
          hasRedCross={selectedChapterId === 'filtered_defense'}
        />
      </div>
    </motion.div>
  );
};
