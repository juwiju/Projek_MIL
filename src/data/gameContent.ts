import { Language, TranslationSet } from '../types';
import { landingPageTranslations } from './1-landing-page';
import { chapterSelectTranslations } from './2-chapter-select';
import { miloIntroTranslations } from './3-milo-intro';
import { nameSelectionTranslations } from './4-name-selection';
import { postIntroTranslations } from './5-post-intro';
import { gameplayOptionsTranslations } from './6-gameplay-options';
import { gameplayResultsTranslations } from './7-gameplay-results';

// Satukan semua objek terjemahan halaman ke objek global translations lama
// Satukan semua objek terjemahan halaman ke objek global translations lama
export const translations: Record<Language, TranslationSet> = {
  id: {
    ...landingPageTranslations.id,
    ...chapterSelectTranslations.id,
    ...miloIntroTranslations.id,
    ...nameSelectionTranslations.id,
    ...postIntroTranslations.id,
    ...gameplayOptionsTranslations.id,
    ...gameplayResultsTranslations.id,
    // Menggunakan key string mapping agar TypeScript tidak protes 'does not exist'
    chaosMiloText: (gameplayResultsTranslations.id as any)["chaosMiloText"] || "WADUH, VIRAL SIH...TAPI TERNYATA BANYAK YG KETIPU DAN JADI KORBAN.",
    sensationalMiloText: (gameplayResultsTranslations.id as any)["sensationalMiloText"] || "INFONYA BENER SIH.. TAPI JUDULNYA BIKIN RIBUT.",
    filteredMiloText: (gameplayResultsTranslations.id as any)["filteredMiloText"] || "HEHE UNTUNG AJA GAK JADI POSTING!",
    pristineMiloText: (gameplayResultsTranslations.id as any)["pristineMiloText"] || "BANYAK YANG TERBANTU LOH DENGAN POSTINGAN KAMU, KEREN!"
  },
  en: {
    ...landingPageTranslations.en,
    ...chapterSelectTranslations.en,
    ...miloIntroTranslations.en,
    ...nameSelectionTranslations.en,
    ...postIntroTranslations.en,
    ...gameplayOptionsTranslations.en,
    ...gameplayResultsTranslations.en,
    chaosMiloText: (gameplayResultsTranslations.en as any)["chaosMiloText"] || "OH NO, IT WENT VIRAL... BUT IT TURNS OUT A LOT OF PEOPLE WERE SCAMMED.",
    sensationalMiloText: (gameplayResultsTranslations.en as any)["sensationalMiloText"] || "THE INFO IS TRUE.. BUT THE TITLE IS STIRRING UP CHAOS.",
    filteredMiloText: (gameplayResultsTranslations.en as any)["filteredMiloText"] || "HEHE LUCKY THING I DIDN'T POST IT!",
    pristineMiloText: (gameplayResultsTranslations.en as any)["pristineMiloText"] || "MANY PEOPLE WERE HELPED BY YOUR POST, AWESOME!"
  }
};
// Re-export option & data chapter dari file modularnya masing-masing
export { headlineOptions, sourceOptions, actionOptions } from './6-gameplay-options';
export { commentsData, secondaryComments, chaptersDetails } from './7-gameplay-results';