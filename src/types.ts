export type Language = 'id' | 'en';

export interface GameStats {
  followers: number;
  trust: number;
}

export type MiloExpression =
  | 'happy'
  | 'waving'
  | 'wink'
  | 'shocked'
  | 'sad'
  | 'holding_phone'
  | 'crying'
  | 'thinking';

export interface Chapter {
  id: string;
  title: string;
  description: string;
  badge: string;
}

export type GameScreen =
  | 'home'
  | 'chapters'
  | 'milo_intro'
  | 'name_selection'
  | 'post_intro'
  | 'choose_headline'
  | 'choose_source'
  | 'choose_action'
  | 'post_preview'
  | 'day_night_transition'
  | 'feed_outcome'
  | 'second_choice'
  | 'final_reflection'
  | 'diary_gallery';

export interface SavedReflection {
  chapterId: string;
  username: string;
  headlineChoice: string;
  sourceChoice: string;
  actionChoice: string;
  secondAction: string; // e.g., 'continue', 'repent', 'stop'
  reflectionText: string;
  stats: GameStats;
  date: string;
}

// --- Tambahan baru untuk sistem lokalisasi halaman ---

export interface ChoiceOption {
  id: 'A' | 'B';
  text: {
    id: string;
    en: string;
  };
}

export interface FeedComment {
  user: string;
  text: {
    id: string;
    en: string;
  };
  isNegative?: boolean;
}

export interface ChapterDetails {
  id: string;
  name: { id: string; en: string };
  title: { id: string; en: string };
  miloReaction: { id: string; en: string };
  followersDelta: number;
  trustDelta: number;
  reflectionCardTitle: { id: string; en: string };
  reflectionCardSubtitle: { id: string; en: string };
  reflectionQuestion: { id: string; en: string };
  options: {
    id: Array<{ label: string; action: string }>;
    en: Array<{ label: string; action: string }>;
  };
  
  // Dialog dan refleksi setelah memilih 'continue' (jalur utama)
  secondMiloText: { id: string; en: string };
  secondQuestion: { id: string; en: string };
  secondReflectionTitle: { id: string; en: string };
  secondReflectionSubtitle: { id: string; en: string };
  secondReflectionQuestion: { id: string; en: string };

  // Tambahan opsional (?) untuk menampung jalur 'repent' dan 'stop' agar tidak error
  secondMiloText_repent?: { id: string; en: string };
  secondQuestion_repent?: { id: string; en: string };
  secondReflectionTitle_repent?: { id: string; en: string };
  secondReflectionSubtitle_repent?: { id: string; en: string };
  secondReflectionQuestion_repent?: { id: string; en: string };

  secondMiloText_stop?: { id: string; en: string };
  secondReflectionTitle_stop?: { id: string; en: string };
  secondReflectionSubtitle_stop?: { id: string; en: string };
  secondReflectionQuestion_stop?: { id: string; en: string };
}

// Menampung semua key dinamis dari gabungan halaman 1 sampai 7
export interface TranslationSet {
  [key: string]: any;
}