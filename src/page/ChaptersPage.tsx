import React from 'react';
import { motion } from 'motion/react';
import { RefreshCw } from 'lucide-react';
import { Language, GameScreen, SavedReflection } from '../types';
import { ChapterSelection } from '../components/ChapterSelection';

// ==========================================
// NASKAH TEKS LOKAL (GABUNGAN DI DALAM FILE)
// ==========================================
const LOCAL_TEXTS = {
  id: {
    resetBtn: "Hapus Progress & Lencana"
  },
  en: {
    resetBtn: "Reset Badges & Progress"
  }
};

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
  // Ambil naskah lokalisasi tombol reset progress
  const t = LOCAL_TEXTS[lang];

  return (
    <motion.div
      key="chapters"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full"
    >
      {/* Menampilkan menu galeri chapter dan lencana */}
      <ChapterSelection
        lang={lang}
        savedReflections={savedReflections}
        onBackToHome={() => {
          playSynthSound('click');
          setScreen('home');
        }}
        onSelectSavedReflection={(ref) => {
          playSynthSound('click');
          setActiveDiaryReflection(ref);
        }}
      />

      {/* Footer Pemicu Reset Progress (Hanya muncul jika sudah ada progress yang tersimpan) */}
      {savedReflections.length > 0 && (
        <div className="max-w-4xl mx-auto px-4 mt-8 flex justify-end">
          <button
            onClick={() => {
              playSynthSound('fail'); // Menggunakan sound effect gagal/peringatan untuk aksi destruktif
              handleResetProgress();
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-300 transition-colors cursor-pointer"
            id="btn-reset-progress"
          >
            <RefreshCw size={12} />
            {t.resetBtn}
          </button>
        </div>
      )}
    </motion.div>
  );
};