import React from 'react';
import { motion } from 'motion/react';
import { Language, GameScreen, GameStats } from '../types';
import { ReflectionCard } from '../components/ReflectionCard';

// ==========================================
// NASKAH TEKS LOKAL (GABUNGAN DI DALAM FILE)
// ==========================================
const LOCAL_TEXTS: Record<string, any> = {
  // Rangkuman Kartu Refleksi Berdasarkan Chapter ID
  filtered_defense: {
    title: { id: "KARTU REFLEKSI: PENJAGA GERBANG INFORMASI", en: "REFLECTION CARD: THE INFORMATION GATEKEEPER" },
    subtitle: { id: "Kamu berhasil menahan diri dan menyaring informasi sebelum membagikannya.", en: "You successfully held back and filtered information before sharing it." },
    question: { id: "Bagaimana perasaanmu setelah tahu keputusanmu menyelamatkan banyak orang dari penipuan? Tulis opinimu di sini:", en: "How do you feel knowing your decision saved many people from scams? Write your opinion here:" }
  },
  chaos_catalyst: {
    title: { id: "KARTU REFLEKSI: KORBAN TRAFFIC INSTAN", en: "REFLECTION CARD: THE INSTANT TRAFFIC VICTIM" },
    subtitle: { id: "Pelajaran berharga tentang bahaya menyebarkan berita demi ketenaran semata.", en: "A valuable lesson about the dangers of spreading news purely for fame." },
    question: { id: "Apa yang akan kamu lakukan di dunia nyata jika terlanjur membagikan berita yang ternyata hoaks? Tulis refleksimu:", en: "What would you do in the real world if you accidentally shared news that turned out to be hoaxes? Write your reflection:" }
  },
  sensational_truth: {
    title: { id: "KARTU REFLEKSI: SANG PENGEMAS SENSASI", en: "REFLECTION CARD: THE SENSATION PACKAGER" },
    subtitle: { id: "Infonya benar, tapi cara mengemasnya yang bikin orang panik dan salah paham.", en: "The info was true, but the way it was packaged caused panic and misunderstanding." },
    question: { id: "Kenapa cara menyampaikan informasi bisa sama pentingnya dengan kebenaran informasi itu sendiri? Tulis refleksimu:", en: "Why can how you deliver information be just as important as the information's truth itself? Write your reflection:" }
  },
  pristine_anchor: {
    title: { id: "KARTU REFLEKSI: JANGKAR KEBENARAN", en: "REFLECTION CARD: THE ANCHOR OF TRUTH" },
    subtitle: { id: "Standar emas literasi digital: objektif, terverifikasi, dan dipercaya banyak orang.", en: "The gold standard of digital literacy: objective, verified, and trusted by many." },
    question: { id: "Pertumbuhanmu lambat tapi kepercayaan orang ke kamu tinggi. Menurutmu, kenapa itu lebih berharga? Tulis refleksimu:", en: "Your growth was slow but people's trust in you was high. Why do you think that's more valuable? Write your reflection:" }
  }
};

interface FinalReflectionPageProps {
  lang: Language;
  setScreen: (screen: GameScreen) => void;
  selectedChapterId: string;
  stats: GameStats;
  handleSaveReflection: (text: string) => void;
}

export const FinalReflectionPage: React.FC<FinalReflectionPageProps> = ({
  lang,
  setScreen,
  selectedChapterId,
  stats,
  handleSaveReflection
}) => {
  
  // Ambil data teks lokal berdasarkan chapter aktif, beri backup jika id tidak terdaftar
  const chapterData = LOCAL_TEXTS[selectedChapterId] || LOCAL_TEXTS['filtered_defense'];

  // Ekstrak teks sesuai bahasa yang aktif (id/en)
  const cardTitle = chapterData.title[lang];
  const cardSubtitle = chapterData.subtitle[lang];
  const cardQuestion = chapterData.question[lang];

  return (
    <motion.div
      key="final_reflection"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full"
    >
      {/* Mengirimkan data teks lokal langsung ke komponen kartu */}
      <ReflectionCard
        lang={lang}
        chapterId={selectedChapterId}
        title={cardTitle}
        subtitle={cardSubtitle}
        question={cardQuestion}
        stats={stats}
        onSave={handleSaveReflection}
        onBackToHome={() => setScreen('home')}
      />
    </motion.div>
  );
};