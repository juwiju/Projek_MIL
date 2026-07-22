import React from 'react';
import { motion } from 'motion/react';
import { Language, MiloExpression, GameScreen, GameStats } from '../types';
import { MiloOtter } from '../components/MiloOtter';
import { DialogBubble } from '../components/DialogBubble';
import { PhoneMockup } from '../components/PhoneMockup';

// ==========================================
// DATA & NASKAH LOKAL (GABUNGAN DI DALAM FILE)
// ==========================================

const LOCAL_DIALOGS = {
  id: {
    chaosMiloText: "WADUH! Liat tuh kolom komentarmu! Demi meraih followers instan, kamu menyebarkan berita palsu yang merugikan banyak orang. Kepercayaan (Trust) kamu merosot tajam!",
    sensationalMiloText: "Hmm, informasinya memang benar, tapi caramu mengemas judul terlalu bombastis dan menggiring opini demi klik semata.",
    filteredMiloText: "KEREN! Kamu memilih untuk menyaring berita dan tidak menyebarkan hoaks lowongan kerja palsu itu. Kamu menyelamatkan banyak orang!",
    pristineMiloText: "Kerja bagus dalam menjaga integritas akun tokomu!",
    continuePrompt: "Apa langkah yang akan kamu ambil selanjutnya di media sosial?"
  },
  en: {
    chaosMiloText: "OH NO! Look at your comment section! For the sake of instant followers, you spread fake news that harms many people. Your Trust has plummeted!",
    sensationalMiloText: "Hmm, the information is correct, but the way you packaged the headline was too bombastic just for clicks.",
    filteredMiloText: "AWESOME! You chose to filter the news and did not spread that fake job vacancy hoax. You saved many people!",
    pristineMiloText: "Good job maintaining your account's integrity!",
    continuePrompt: "What step will you take next on social media?"
  }
};

const LOCAL_HEADLINES = [
  { text: { id: "KERJA ONLINE: Sambil Rebahan! Cuma Like Video YouTube Dibayar 50 Ribu/Tugas. Butuh 100 Orang Gercep!", en: "ONLINE WORK: While Relaxing! Just Like YouTube Videos Get Paid 50k/Task. Need 100 People Fast!" } },
  { text: { id: "WASPADA! Penipuan Berkedok Loker Like-and-Share YouTube Mulai Memakan Korban. Ini Faktanya!", en: "BEWARE! YouTube Like-and-Share Job Scams Start Claiming Victims. Here Are the Facts!" } }
];

const LOCAL_CHAPTERS_DETAILS: Record<string, { options: Record<Language, Array<{ label: string; action: 'continue' | 'repent' | 'stop' }>> }> = {
  chaos_catalyst: {
    options: {
      id: [
        { label: "Biarin Aja, yang Penting Viral! 🔥", action: "continue" },
        { label: "Hapus Postingan & Minta Maaf 📝", action: "repent" }
      ],
      en: [
        { label: "Leave It, As Long As It Goes Viral! 🔥", action: "continue" },
        { label: "Delete Post & Apologize 📝", action: "repent" }
      ]
    }
  },
  filtered_defense: {
    options: {
      id: [
        { label: "Lanjut Edukasi Bahaya Hoaks 🛡️", action: "continue" },
        { label: "Istirahat Dulu dari Medsos ☕", action: "stop" }
      ],
      en: [
        { label: "Continue Educating on Hoax Dangers 🛡️", action: "continue" },
        { label: "Take a Break from Social Media ☕", action: "stop" }
      ]
    }
  },
  sensational_truth: {
    options: {
      id: [
        { label: "Terus Posting dengan Gaya Sama 📢", action: "continue" },
        { label: "Ganti Judul Jadi Lebih Netral 📝", action: "repent" }
      ],
      en: [
        { label: "Keep Posting the Same Style 📢", action: "continue" },
        { label: "Change to a More Neutral Headline 📝", action: "repent" }
      ]
    }
  },
  pristine_anchor: {
    options: {
      id: [
        { label: "Lanjutkan Berbagi Konten Positif 🌟", action: "continue" },
        { label: "Cukupkan Sampai di Sini Dulu ☕", action: "stop" }
      ],
      en: [
        { label: "Keep Sharing Positive Content 🌟", action: "continue" },
        { label: "Take a Pause Here for Now ☕", action: "stop" }
      ]
    }
  }
};

const LOCAL_COMMENTS: Record<string, Array<{ user: string; text: Record<Language, string>; isNegative: boolean }>> = {
  chaos_catalyst: [
    { user: "Budi_Gamer", text: { id: "WOI INI PENIPUAN! Duit deposit gua ilang 500 ribu!! Tanggung jawab lu!", en: "HEY THIS IS A SCAM! My 500k deposit money is gone!! You are responsible!" }, isNegative: true },
    { user: "Siti.Rahma", text: { id: "Ih kirain beneran kerjaan halal, ternyata akun penyebar hoaks. Unfollow!", en: "Thought it was a real honest job, turned out to be a hoax account. Unfollow!" }, isNegative: true }
  ],
  filtered_defense: [
    { user: "Agus_Santoso", text: { id: "Makasih min infonya! Hampir aja sepupu saya kena tipu modelan gini.", en: "Thanks for the info! My cousin almost got scammed by this kind of stuff." }, isNegative: false },
    { user: "Rina_Marlina", text: { id: "Kreator cerdas! Sukses terus mengedukasi masyarakat ya.", en: "Smart creator! Keep up the good work educating the public." }, isNegative: false }
  ],
  sensational_truth: [
    { user: "BudiUtomo", text: { id: "Infonya sih bener loker resmi, tapi judul lu lebay banget bikin panik rebutan.", en: "The info is right, it's a real vacancy, but your headline is way too dramatic, caused a panic." }, isNegative: true },
    { user: "AntiClickbait", text: { id: "Konten bagus tapi dibikin clickbait murahan. Kurang-kurangin lah bro.", en: "Good content but turned into cheap clickbait. Tone it down, bro." }, isNegative: true }
  ],
  pristine_anchor: [
    { user: "DosenLiterasi", text: { id: "Ini baru konten kreator berkualitas. Informatif, datanya valid, gak pake drama clickbait.", en: "Now this is quality creator content. Informative, valid data, no clickbait drama." }, isNegative: false },
    { user: "PencariKerja", text: { id: "Terima kasih infonya sangat membantu dan menyelamatkan kami dari penipuan.", en: "Thank you, this info really helped and saved us from a scam." }, isNegative: false }
  ]
};

interface FeedOutcomePageProps {
  lang: Language;
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
  // Ambil data dialog dan naskah terjemahan
  const t = LOCAL_DIALOGS[lang];
  
  // Mengambil opsi pilihan konsekuensi (dengan fallback jika chapter tidak terdaftar)
  const currentChapterOptions = LOCAL_CHAPTERS_DETAILS[selectedChapterId]?.options[lang] || 
    LOCAL_CHAPTERS_DETAILS['chaos_catalyst'].options[lang];

  return (
    <motion.div
      key="feed_outcome"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full max-w-5xl"
    >
      {/* Kolom Kiri: Reaksi Milo & Tombol Pilihan Tindakan */}
      <div className="lg:col-span-7 space-y-6">
        <MiloOtter expression={currentMiloExpression} size={150} className="mx-auto lg:mx-0" />
        
        {/* Balon Dialog Dinamis sesuai Chapter Akun */}
        <DialogBubble
          text={
            selectedChapterId === 'chaos_catalyst' ? t.chaosMiloText :
            selectedChapterId === 'sensational_truth' ? t.sensationalMiloText :
            selectedChapterId === 'filtered_defense' ? t.filteredMiloText :
            t.pristineMiloText
          }
          variant={selectedChapterId === 'chaos_catalyst' ? 'orange' : 'green'}
        />

        {/* Kotak Pilihan Konsekuensi */}
        <div className="bg-white border-2 border-[#1E1915] rounded-2xl p-5 shadow-[4px_4px_0px_0px_#1E1915]">
          <p className="font-display font-extrabold text-base text-[#1E1915] mb-4">
            {t.continuePrompt}
          </p>

          <div className="flex flex-col gap-3">
            {currentChapterOptions.map((opt, i) => (
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

      {/* Kolom Kanan: Tampilan Layar HP berisi Hasil Skor & Serbuan Komentar */}
      <div className="lg:col-span-5 flex justify-center">
        <PhoneMockup
          lang={lang}
          username={currentUsername}
          followers={stats.followers}
          trust={stats.trust}
          postTitle={headlineChoice === 'A' ? LOCAL_HEADLINES[0].text[lang] : LOCAL_HEADLINES[1].text[lang]}
          postSource={sourceChoice === 'A' ? "FYP TikTok" : "Platform Resmi Toko Online"}
          postVerified={headlineChoice === 'B'}
          comments={(LOCAL_COMMENTS[selectedChapterId] || []).map((c) => ({
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