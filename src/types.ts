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
