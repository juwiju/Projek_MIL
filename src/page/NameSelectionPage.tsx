import React from 'react';
import { motion } from 'motion/react';
import { Language, MiloExpression, GameScreen } from '../types';
import { TranslationSet } from '../data/gameContent';
import { MiloOtter } from '../components/MiloOtter';
import { DialogBubble } from '../components/DialogBubble';
import { PhoneMockup } from '../components/PhoneMockup';

interface NameSelectionPageProps {
  lang: Language;
  t: TranslationSet;
  playSynthSound: (type: 'click' | 'success' | 'fail' | 'slide') => void;
  setScreen: (screen: GameScreen) => void;
  currentMiloExpression: MiloExpression;
  currentUsername: string;
  handleUsernameToggle: (dir: 'left' | 'right') => void;
}

export const NameSelectionPage: React.FC<NameSelectionPageProps> = ({
  lang,
  t,
  playSynthSound,
  setScreen,
  currentMiloExpression,
  currentUsername,
  handleUsernameToggle
}) => {
  return (
    <motion.div
      key="name_selection"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full max-w-5xl"
    >
      <div className="lg:col-span-7 space-y-6">
        <MiloOtter expression={currentMiloExpression} size={160} className="mx-auto lg:mx-0" />
        <DialogBubble text={t.nameSelectionText} variant="green" />
        
        <div className="flex gap-4">
          <button
            onClick={() => { playSynthSound('click'); setScreen('milo_intro'); }}
            className="px-6 py-3 bg-white text-[#1E1915] font-sans font-bold text-sm rounded-2xl border-2 border-[#1E1915] shadow-[3px_3px_0px_0px_#1E1915] hover:bg-[#FAF6F0] transition cursor-pointer"
            id="btn-name-back"
          >
            {t.btnPrev}
          </button>
          <button
            onClick={() => { playSynthSound('success'); setScreen('post_intro'); }}
            className="px-8 py-3 bg-[#E36633] text-white font-sans font-extrabold text-sm rounded-2xl border-2 border-[#1E1915] shadow-[3px_3px_0px_0px_#1E1915] hover:bg-[#D15525] transition cursor-pointer flex items-center gap-2"
            id="btn-name-confirm"
          >
            {t.btnConfirmName} <span>🎉</span>
          </button>
        </div>
      </div>

      <div className="lg:col-span-5 flex justify-center">
        {/* Smartphone with username selection callback */}
        <PhoneMockup
          lang={lang}
          username={currentUsername}
          onUsernameChange={handleUsernameToggle}
          followers={12}
          trust={100}
        />
      </div>
    </motion.div>
  );
};
