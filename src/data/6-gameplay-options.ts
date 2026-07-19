import { ChoiceOption } from '../types';

export const gameplayOptionsTranslations = {
  id: {
    selectHeadlineHeader: "PILIH JUDUL KONTEN YANG AKAN KAMU POSTING!",
    selectSourceHeader: "SUMBERNYA DARI MANA NIH YA??",
    selectActionHeader: "APA YANG AKAN KAMU LAKUKAN?",
  },
  en: {
    selectHeadlineHeader: "CHOOSE THE CONTENT HEADLINE TO POST!",
    selectSourceHeader: "WHERE IS THE SOURCE FROM??",
    selectActionHeader: "WHAT ARE YOU GOING TO DO?",
  }
};

export const headlineOptions: ChoiceOption[] = [
  {
    id: 'A',
    text: {
      id: "KAMU PELAJAR PENGANGGURAN? KERJA ONLINE AJA: Sambil Rebahan! Cuma Like Video YouTube Dibayar 50 Ribu/Tugas. Butuh 100 Orang Gercep!",
      en: "ARE YOU AN UNEMPLOYED STUDENT? WORK ONLINE: Just chill! Simply Like YouTube Videos and Get Paid 50k/Task. Need 100 Fast Responders!"
    }
  },
  {
    id: 'B',
    text: {
      id: "Informasi Lowongan Magang/Paruh Waktu Resmi Administrasi Toko Online untuk Pelajar SMA.",
      en: "Official Internship/Part-time Administrative Vacancy Information at an Online Store for High School Students."
    }
  }
];

export const sourceOptions: ChoiceOption[] = [
  {
    id: 'A',
    text: {
      id: "Hm, dari fyp tiktik yang like nya udah 500k sih, banyak like berarti bener kan?",
      en: "Hmm, it's from a TikTok FYP with 500k likes, lots of likes means it's true, right?"
    }
  },
  {
    id: 'B',
    text: {
      id: "Platform resmi dong biar kredible, tapi jarang dilirik sih",
      en: "From an official platform to stay credible, even though it rarely gets attention"
    }
  }
];

export const actionOptions: ChoiceOption[] = [
  {
    id: 'A',
    text: {
      id: "Langsung share aja deh, biar langsung viral",
      en: "Just share it directly to go viral instantly"
    }
  },
  {
    id: 'B',
    text: {
      id: "Eh eh bentar, cek dulu dong",
      en: "Wait a second, let me verify first"
    }
  }
];