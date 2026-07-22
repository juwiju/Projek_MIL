import React from 'react';
import { motion } from 'motion/react';
import { Language, MiloExpression, GameScreen, GameStats } from '../types';
import { MiloOtter } from '../components/MiloOtter';
import { DialogBubble } from '../components/DialogBubble';
import { PhoneMockup } from '../components/PhoneMockup';

// ==========================================
// NASKAH TEKS LOKAL (SESUAI DIALOG ASLI GAME)
// ==========================================
const LOCAL_TEXTS: Record<string, any> = {
  headlines: {
    A: { 
      id: "Informasi Lowongan Magang/Paruh Waktu Resmi Administrasi Toko Online untuk Pelajar SMA.", 
      en: "Official Online Store Administration Part-Time/Internship Vacancy Information for High School Students." 
    },
    B: { 
      id: "Hati-hati Penipuan Berkedok Lowongan Kerja Paruh Waktu, Yuk Cek Faktanya!", 
      en: "Beware of Scams Disguised as Part-Time Job Vacancies, Let's Check the Facts!" 
    }
  },
  // Contoh penyesuaian teks asli pada chapter pertahanan (filtered_defense / lainnya)
  filtered_defense: {
    continue: {
      milo: { id: "HEHE UNTUNG AJA GAK JADI POSTING!", en: "HEHE LUCKY THING I DIDN'T POST IT!" },
      question: { id: "MENYARING INFORMASI MENYELAMATKANMU DARI FITNAH DIGITAL.", en: "FILTERING INFORMATION SAVES YOU FROM DIGITAL SLANDER." }
    },
    stop: {
      milo: { id: "LOH, KENAPA BERHENTI? PADAHAL UDAH ON THE RIGHT TRACK.", en: "WAIT, WHY STOP? YOU WERE ALREADY ON THE RIGHT TRACK." },
      question: { id: "GROWTH-NYA EMAANG PELAN. TAPI COBA PIKIR, APA YANG LO DAPET DARI CARA INI YANG NGGAK BISA DIDAPAT DARI JALAN PINTAS?", en: "THE GROWTH MIGHT BE SLOW. BUT THINK ABOUT IT, WHAT DO YOU GET FROM THIS METHOD THAT CAN'T BE OBTAINED FROM A SHORTCUT?" }
    },
    comments: [
      { user: "@tanya_dong", text: { id: "min ini deadline pendaftarannya sampe kapan?", en: "admin, when is the registration deadline?" }, isNegative: false },
      { user: "@pejuang_magang", text: { id: "semoga rejeki deh kali ini", en: "hope this is my luck this time" }, isNegative: false },
      { user: "@sma_bisa", text: { id: "min ada minimal pendidikan ga?", en: "admin, is there a minimum education requirement?" }, isNegative: false }
    ]
  },
  // Kunci data backup jika selectedChapterId bernilai lain agar game tidak blank
  chaos_catalyst: {
    continue: {
      milo: { id: "Kamu memilih lanjut? Waduh, netizen makin brutal loh komentarnya!", en: "You chose to continue? Oh no, the netizens' comments are getting even more brutal!" },
      question: { id: "Apakah popularitas instan sebanding dengan rusaknya kepercayaan orang lain?", en: "Is instant popularity worth destroying other people's trust?" }
    },
    repent: {
      milo: { id: "Nggak langsung rame lagi sih.. Tapi ini terasa lebih plong nggak?", en: "It's not instantly viral anymore.. But doesn't this feel much lighter?" },
      question: { id: "Mengakui kesalahan di media sosial butuh keberanian besar. Kamu keren!", en: "Admitting mistakes on social media takes great courage. Kudos to you!" }
    },
    stop: {
      milo: { id: "LOH, KENAPA BERHENTI? PADAHAL UDAH ON THE RIGHT TRACK.", en: "WAIT, WHY STOP? YOU WERE ALREADY ON THE RIGHT TRACK." },
      question: { id: "GROWTH-NYA EMAANG PELAN. TAPI COBA PIKIR, APA YANG LO DAPET DARI CARA INI YANG NGGAK BISA DIDAPAT DARI JALAN PINTAS?", en: "THE GROWTH MIGHT BE SLOW. BUT THINK ABOUT IT, WHAT DO YOU GET FROM THIS METHOD THAT CAN'T BE OBTAINED FROM A SHORTCUT?" }
    },
    comments: [
      { user: "akun_samaran", text: { id: "Bener kan drama doang ini mah!", en: "See! I knew this was all just drama!" }, isNegative: true }
    ]
  },
  sensational_truth: {
    continue: {
      milo: { id: "Kamu tetap pakai gaya judul yang sama.. Makin banyak yang salah paham meski info dasarnya valid.", en: "You kept the same headline style.. More people are getting the wrong idea even though the core info is valid." },
      question: { id: "Kalau info yang benar aja bisa bikin salah paham gara-gara judulnya, apa itu masih bisa disebut komunikasi yang bertanggung jawab?", en: "If even true information can cause misunderstanding because of its headline, can that still be called responsible communication?" }
    },
    repent: {
      milo: { id: "Kamu ganti judulnya jadi lebih netral. Linimasa mulai tenang, kepercayaan pelan-pelan pulih.", en: "You changed the headline to be more neutral. The timeline is calming down, trust is slowly recovering." },
      question: { id: "Ternyata info yang sama bisa diterima jauh lebih baik hanya dengan mengubah cara penyampaiannya. Apa pelajarannya buat kamu?", en: "It turns out the same info can be received much better just by changing how it's framed. What's the lesson here for you?" }
    },
    comments: [
      { user: "WargaResah", text: { id: "Jadi ini beneran loker resmi ya? Judulnya bikin kaget doang tadi.", en: "So this is really an official vacancy? The headline just startled me for nothing." }, isNegative: true }
    ]
  },
  pristine_anchor: {
    continue: {
      milo: { id: "Kamu lanjut berbagi konten positif dengan gaya yang sama. Followers tumbuh lambat tapi organik dan stabil.", en: "You kept sharing positive content the same way. Followers grow slowly but organically and steadily." },
      question: { id: "Pertumbuhan yang lambat tapi tepercaya vs viral instan tapi rapuh -- menurutmu mana yang lebih bertahan lama?", en: "Slow but trustworthy growth vs. instant but fragile virality -- which one do you think lasts longer?" }
    },
    stop: {
      milo: { id: "Kamu berhenti dulu di sini. Padahal akunmu udah jadi referensi yang meredam hoaks lain di linimasa lho.", en: "You decided to pause here. Your account had actually become a reference that helped calm other hoaxes on the timeline." },
      question: { id: "Kadang dampak baik itu nggak langsung kelihatan. Menurutmu, apa manfaat yang tetap tertinggal meski kamu berhenti posting?", en: "Sometimes good impact isn't immediately visible. What benefit do you think remains even after you stop posting?" }
    },
    comments: [
      { user: "PencariKerja2", text: { id: "Semoga masih ada info kayak gini lagi ke depannya, sangat membantu!", en: "Hope there's more info like this in the future, really helpful!" }, isNegative: false }
    ]
  }
};

interface SecondChoicePageProps {
  lang: Language;
  playSynthSound: (type: 'click' | 'success' | 'fail' | 'slide') => void;
  setScreen: (screen: GameScreen) => void;
  currentMiloExpression: MiloExpression;
  currentUsername: string;
  stats: GameStats;
  headlineChoice: 'A' | 'B' | null;
  sourceChoice: 'A' | 'B' | null;
  secondChoice: 'continue' | 'repent' | 'stop' | null;
  selectedChapterId: string;
}

export const SecondChoicePage: React.FC<SecondChoicePageProps> = ({
  lang,
  playSynthSound,
  setScreen,
  currentMiloExpression,
  currentUsername,
  stats,
  headlineChoice,
  sourceChoice,
  secondChoice,
  selectedChapterId
}) => {
  
  const currentAction = secondChoice || 'continue';
  // Ambil data berdasarkan ID chapter yang dipilih pemain aktif
  const chapterData = LOCAL_TEXTS[selectedChapterId] || LOCAL_TEXTS['chaos_catalyst'];
  
  const miloText = chapterData[currentAction]?.milo[lang] || chapterData['continue']?.milo[lang];
  const questionText = chapterData[currentAction]?.question[lang] || chapterData['continue']?.question[lang];
  
  const displayTitle = headlineChoice ? LOCAL_TEXTS.headlines[headlineChoice][lang] : "";
  const mockComments = chapterData.comments || [];

  return (
    <motion.div
      key="second_choice"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full max-w-5xl"
    >
      <div className="lg:col-span-7 space-y-6">
        <MiloOtter expression={currentMiloExpression} size={150} className="mx-auto lg:mx-0" />

        <DialogBubble
          text={miloText}
          variant={secondChoice === 'continue' ? 'orange' : 'green'}
        />

        <div className="bg-[#1E1915] text-[#FAF6F0] rounded-2xl p-5 border border-[#1E1915] font-sans font-bold text-sm md:text-base leading-relaxed tracking-normal select-text">
          <span className="text-[#E36633] text-2xl font-serif mr-1 block">&ldquo;</span>
          {questionText}
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={() => { playSynthSound('success'); setScreen('final_reflection'); }}
            className="px-8 py-3.5 bg-[#E36633] text-white font-sans font-extrabold rounded-2xl border-2 border-[#1E1915] shadow-[4px_4px_0px_0px_#1E1915] hover:bg-[#D15525] transition-all cursor-pointer"
            id="btn-conseq-next-reflection"
          >
            {lang === 'id' ? "Buka Kartu Refleksi" : "Open Reflection Card"} <span>🛡️</span>
          </button>
        </div>
      </div>

      <div className="lg:col-span-5 flex justify-center">
        <PhoneMockup
          lang={lang}
          username={currentUsername}
          followers={stats.followers}
          trust={stats.trust}
          postTitle={displayTitle}
          postSource={sourceChoice === 'A' ? "FYP TikTok" : (lang === 'id' ? "Platform Resmi Toko Online" : "Official Online Store Platform")}
          postVerified={headlineChoice === 'B'}
          comments={mockComments.map((c: any) => ({
            user: c.user,
            text: c.text[lang],
            isNegative: c.isNegative
          }))}
          isOutcomeScreen={true}
          hasRedCross={selectedChapterId === 'filtered_defense' && secondChoice === 'stop'}
        />
      </div>
    </motion.div>
  );
};