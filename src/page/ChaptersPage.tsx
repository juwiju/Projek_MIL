import React from 'react';
import { motion } from 'motion/react';
import { RefreshCw } from 'lucide-react';
import { Language, GameScreen, SavedReflection } from '../types';
import { ChapterSelection } from '../components/ChapterSelection';

interface ChaptersPageProps {
  lang: Language;
  playSynthSound: (type: 'click' | 'success' | 'fail' | 'slide') => void;
  setScreen: (screen: GameScreen) => void;
  savedReflections: SavedReflection[];
  setActiveDiaryReflection: (ref: SavedReflection) => void;
  handleResetProgress: () => void;
}

export const ChaptersPage: React.FC<ChaptersPageProps> = ({
  lang,
  playSynthSound,
  setScreen,
  savedReflections,
  setActiveDiaryReflection,
  handleResetProgress
}) => {
  return (
    <motion.div
      key="chapters"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full"
    >
      <ChapterSelection
        lang={lang}
        savedReflections={savedReflections}
        onBackToHome={() => setScreen('home')}
        onSelectSavedReflection={(ref) => setActiveDiaryReflection(ref)}
      />

      {/* Reset Progress trigger at the footer of chapters */}
      {savedReflections.length > 0 && (
        <div className="max-w-4xl mx-auto px-4 mt-8 flex justify-end">
          <button
            onClick={handleResetProgress}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-300 transition-colors cursor-pointer"
            id="btn-reset-progress"
          >
            <RefreshCw size={12} />
            {lang === 'id' ? "Hapus Progress & Lencana" : "Reset Badges & Progress"}
          </button>
        </div>
      )}
    </motion.div>
  );
};
