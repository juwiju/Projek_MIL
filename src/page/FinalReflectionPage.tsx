import React from 'react';
import { motion } from 'motion/react';
import { Language, GameScreen, GameStats } from '../types';
import { ReflectionCard } from '../components/ReflectionCard';

interface FinalReflectionPageProps {
  lang: Language;
  setScreen: (screen: GameScreen) => void;
  selectedChapterId: string;
  stats: GameStats;
  getReflectionCardTitle: () => string;
  getReflectionCardSubtitle: () => string;
  getReflectionQuestion: () => string;
  handleSaveReflection: (text: string) => void;
}

export const FinalReflectionPage: React.FC<FinalReflectionPageProps> = ({
  lang,
  setScreen,
  selectedChapterId,
  stats,
  getReflectionCardTitle,
  getReflectionCardSubtitle,
  getReflectionQuestion,
  handleSaveReflection
}) => {
  return (
    <motion.div
      key="final_reflection"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full"
    >
      <ReflectionCard
        lang={lang}
        chapterId={selectedChapterId}
        title={getReflectionCardTitle()}
        subtitle={getReflectionCardSubtitle()}
        question={getReflectionQuestion()}
        stats={stats}
        onSave={handleSaveReflection}
        onBackToHome={() => setScreen('home')}
      />
    </motion.div>
  );
};
