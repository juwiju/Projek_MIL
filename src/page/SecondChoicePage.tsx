import React from 'react';
import { motion } from 'motion/react';
import { Language, MiloExpression, GameScreen, GameStats } from '../types';
import { MiloOtter } from '../components/MiloOtter';
import { DialogBubble } from '../components/DialogBubble';
import { PhoneMockup } from '../components/PhoneMockup';

// ==========================================
// NASKAH TEKS LOKAL LENGKAP BERSAMA KOMENTAR HP
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

  // 1. CHAOS CATALYST (Menyebar Hoaks / Loker Palsu)
  chaos_catalyst: {
    continue: {
      milo: { id: "Kamu memilih lanjut? Waduh, netizen makin brutal loh komentarnya!", en: "You chose to continue? Oh no, the netizens' comments are getting even more brutal!" },
      question: { id: "Apakah popularitas instan sebanding dengan rusaknya kepercayaan orang lain?", en: "Is instant popularity worth destroying other people's trust?" },
      comments: [
        { user: "@budi_gamer", text: { id: "WOI INI PENIPUAN! Duit deposit gua hilang!!", en: "HEY THIS IS A SCAM! My deposit money is gone!!" }, isNegative: true },
        { user: "@siti.rahma", text: { id: "Penyebar hoaks parah banget, unfol rame-rame guys!", en: "Terrible hoax spreader, let's unfollow together guys!" }, isNegative: true }
      ]
    },
    repent: {
      milo: { id: "Nggak langsung rame lagi sih.. Tapi ini terasa lebih plong nggak?", en: "It's not instantly viral anymore.. But doesn't this feel much lighter?" },
      question: { id: "Mengakui kesalahan di media sosial butuh keberanian besar. Kamu keren!", en: "Admitting mistakes on social media takes great courage. Kudos to you!" },
      comments: [
        { user: "@doni_akbar", text: { id: "Syukurlah sadar dan mau minta maaf...", en: "Glad you realized and apologised..." }, isNegative: false },
        { user: "@lina_m", text: { id: "Hapus postingannya langkah bagus min.", en: "Deleting the post is a good step admin." }, isNegative: false }
      ]
    },
    stop: {
      milo: { id: "Memilih berhenti total.. Kadang mundur sejenak itu pilihan paling bijak untuk evaluasi.", en: "Choosing to stop completely.. Sometimes stepping back is the wisest choice for evaluation." },
      question: { id: "Saat suasana makin keruh, apakah rehat dari dunia maya lebih baik daripada menambah kebisingan?", en: "When things get messy, is taking a break from social media better than adding to the noise?" },
      comments: [
        { user: "@netizen_kritis", text: { id: "Akunnya mendadak sepi, semoga kapok nyebar hoaks.", en: "The account suddenly went quiet, hope they learned their lesson." }, isNegative: true }
      ]
    }
  },

  // 2. FILTERED DEFENSE (Menyaring Informasi / Tidak Posting Hoaks)
  filtered_defense: {
    continue: {
      milo: { id: "HEHE UNTUNG AJA GAK JADI POSTING!", en: "HEHE LUCKY THING I DIDN'T POST IT!" },
      question: { id: "MENYARING INFORMASI MENYELAMATKANMU DARI FITNAH DIGITAL.", en: "FILTERING INFORMATION SAVES YOU FROM DIGITAL SLANDER." },
    },
    repent: {
      milo: { id: "Kamu memilih mengevaluasi ulang langkahmu. Keputusan yang bijak!", en: "You chose to re-evaluate your steps. A wise decision!" },
      question: { id: "Mencegah kebohongan sebelum terjadi jauh lebih mudah daripada memperbaiki nama baik.", en: "Preventing lie before it happens is much easier than fixing reputation." },
      comments: [
        { user: "@edukasi_pinter", text: { id: "Kreator mantap selalu verifikasi fakta dulu!", en: "Awesome creator always verifies facts first!" }, isNegative: false }
      ]
    },
    stop: {
      milo: { id: "LOH, KENAPA BERHENTI? PADAHAL UDAH ON THE RIGHT TRACK.", en: "WAIT, WHY STOP? YOU WERE ALREADY ON THE RIGHT TRACK." },
      question: { id: "GROWTH-NYA EMAANG PELAN. TAPI COBA PIKIR, APA YANG LO DAPET DARI CARA INI YANG NGGAK BISA DIDAPAT DARI JALAN PINTAS?", en: "THE GROWTH MIGHT BE SLOW. BUT THINK ABOUT IT, WHAT DO YOU GET FROM THIS METHOD THAT CAN'T BE OBTAINED FROM A SHORTCUT?" },
      comments: [
        { user: "@penonton_setia", text: { id: "Kok jarang posting lagi min? Ditunggu konten edukasinya!", en: "Why rarely post now admin? Looking forward to educational content!" }, isNegative: false }
      ]
    }
  },

  // 3. SENSATIONAL TRUTH (Informasi Benar tapi Judul Bombastis/Clickbait)
  sensational_truth: {
    continue: {
      milo: { id: "Kamu tetap pakai gaya judul yang sama.. Makin banyak yang salah paham meski info dasarnya valid.", en: "You kept the same headline style.. More people are getting the wrong idea even though the core info is valid." },
      question: { id: "Kalau info yang benar aja bisa bikin salah paham gara-gara judulnya, apa itu masih bisa disebut komunikasi yang bertanggung jawab?", en: "If even true information can cause misunderstanding because of its headline, can that still be called responsible communication?" },
      comments: [
        { user: "@WargaResah", text: { id: "Jadi ini beneran loker resmi ya? Judulnya bikin kaget doang tadi.", en: "So this is really an official vacancy? The headline just startled me for nothing." }, isNegative: true },
        { user: "@anti_clickbait", text: { id: "Judulnya lebay banget asli, padahal isinya biasa aja.", en: "The headline is so dramatic, content is pretty normal." }, isNegative: true }
      ]
    },
    repent: {
      milo: { id: "Kamu ganti judulnya jadi lebih netral. Linimasa mulai tenang, kepercayaan pelan-pelan pulih.", en: "You changed the headline to be more neutral. The timeline is calming down, trust is slowly recovering." },
      question: { id: "Ternyata info yang sama bisa diterima jauh lebih baik hanya dengan mengubah cara penyampaiannya. Apa pelajarannya buat kamu?", en: "It turns out the same info can be received much better just by changing how it's framed. What's the lesson here for you?" },
      comments: [
        { user: "@pembaca_adem", text: { id: "Nah begini kan enak dibaca, jelas dan gak bikin panik.", en: "Now this is pleasant to read, clear and doesn't cause panic." }, isNegative: false }
      ]
    },
    stop: {
      milo: { id: "Kamu memilih berhenti dulu dari hiruk pikuk konten sensational.", en: "You chose to take a break from the hustle of sensational content." },
      question: { id: "Menghentikan tren clickbait butuh komitmen. Bagaimana kamu melihat kualitas kontenmu nanti saat kembali?", en: "Stopping clickbait trends takes commitment. How do you see your content quality when you return?" },
      comments: [
        { user: "@media_literasi", text: { id: "Semoga balik lagi dengan penyampaian berita yang lebih dewasa.", en: "Hope to see you back with more mature news delivery." }, isNegative: false }
      ]
    }
  },

  // 4. PRISTINE ANCHOR (Berita Resmi & Edukatif)
  pristine_anchor: {
    continue: {
      milo: { id: "Kamu lanjut berbagi konten positif dengan gaya yang sama. Followers tumbuh lambat tapi organik dan stabil.", en: "You kept sharing positive content the same way. Followers grow slowly but organically and steadily." },
      question: { id: "Pertumbuhan yang lambat tapi tepercaya vs viral instan tapi rapuh -- menurutmu mana yang lebih bertahan lama?", en: "Slow but trustworthy growth vs. instant but fragile virality -- which one do you think lasts longer?" },
      comments: [
        { user: "@PencariKerja2", text: { id: "Semoga masih ada info kayak gini lagi ke depannya, sangat membantu!", en: "Hope there's more info like this in the future, really helpful!" }, isNegative: false },
        { user: "@dosen_literasi", text: { id: "Keren, pertahankan integritas informasinya!", en: "Awesome, maintain the info's integrity!" }, isNegative: false }
      ]
    },
    repent: {
      milo: { id: "Meski sudah benar, kamu tetap mengevaluasi penyampaianmu agar lebih relevan.", en: "Even though you were right, you still evaluated your delivery to stay relevant." },
      question: { id: "Proses belajar tiada henti adalah kunci utama seorang pembuat konten yang matang.", en: "Never ending learning process is the main key for a mature content creator." },
      comments: [
        { user: "@fans_konten", text: { id: "Makin ke sini bahasanya makin enak dipahami min!", en: "The language gets easier to understand over time admin!" }, isNegative: false }
      ]
    },
    stop: {
      milo: { id: "Kamu berhenti dulu di sini. Padahal akunmu udah jadi referensi yang meredam hoaks lain di linimasa lho.", en: "You decided to pause here. Your account had actually become a reference that helped calm other hoaxes on the timeline." },
      question: { id: "Kadang dampak baik itu nggak langsung kelihatan. Menurutmu, apa manfaat yang tetap tertinggal meski kamu berhenti posting?", en: "Sometimes good impact isn't immediately visible. What benefit do you think remains even after you stop posting?" },
      comments: [
        { user: "@pembaca_setia", text: { id: "Terima kasih infonya selama ini min, sukses selalu!", en: "Thank you for all the info so far admin, all the best!" }, isNegative: false }
      ]
    }
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
  
  // Ambil data spesifik berdasarkan pilihan kedua (continue / repent / stop)
  const actionData = chapterData[currentAction] || chapterData['continue'];
  
  const miloText = actionData?.milo?.[lang] || "Terus belajar dan bijak ber-media sosial ya!";
  const questionText = actionData?.question?.[lang] || "Apa pelajaran terbesar yang kamu dapatkan dari simulasi ini?";
  const mockComments = actionData?.comments || [];

  const displayTitle = headlineChoice ? LOCAL_TEXTS.headlines[headlineChoice][lang] : "";

  return (
    <motion.div
      key="second_choice"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      /* ⚡ Diperbarui: Ditambahkan landscape:grid-cols-12 ⚡ */
      className="grid grid-cols-1 landscape:grid-cols-12 lg:grid-cols-12 gap-6 landscape:gap-6 lg:gap-8 items-center w-full max-w-5xl mx-auto px-2"
    >
      {/* Kolom Kiri: Dialog & Pertanyaan Refleksi Milo */}
      {/* ⚡ Diperbarui: Ditambahkan landscape:col-span-7 ⚡ */}
      <div className="landscape:col-span-7 lg:col-span-7 space-y-4 landscape:space-y-4 md:space-y-6">
        <MiloOtter 
          expression={currentMiloExpression} 
          size={120} 
          className="mx-auto landscape:mx-0 lg:mx-0 landscape:scale-90" 
        />

        <DialogBubble
          text={miloText}
          variant={secondChoice === 'continue' ? 'orange' : 'green'}
        />

        <div className="bg-[#1E1915] text-[#FAF6F0] rounded-xl md:rounded-2xl p-4 landscape:p-4 md:p-5 border border-[#1E1915] font-sans font-bold text-xs landscape:text-xs md:text-base leading-relaxed tracking-normal select-text">
          <span className="text-[#E36633] text-xl md:text-2xl font-serif mr-1 block">&ldquo;</span>
          {questionText}
        </div>

        <div className="flex justify-center landscape:justify-start pt-1 md:pt-2">
          <button
            onClick={() => { playSynthSound('success'); setScreen('final_reflection'); }}
            className="px-6 py-3 landscape:px-6 landscape:py-2.5 md:px-8 md:py-3.5 bg-[#E36633] text-white font-sans font-extrabold text-xs md:text-base rounded-xl md:rounded-2xl border-2 border-[#1E1915] shadow-[4px_4px_0px_0px_#1E1915] hover:bg-[#D15525] transition-all cursor-pointer flex items-center gap-2"
            id="btn-conseq-next-reflection"
          >
            {lang === 'id' ? "Buka Kartu Refleksi" : "Open Reflection Card"} <span>🛡️</span>
          </button>
        </div>
      </div>

      {/* Kolom Kanan: Mockup Layar HP yang Menampilkan Komentar Hasil Pilihan */}
      {/* ⚡ Diperbarui: Ditambahkan landscape:col-span-5 ⚡ */}
      <div className="landscape:col-span-5 lg:col-span-5 flex justify-center">
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
          hasRedCross={selectedChapterId === 'filtered_defense'}
        />
      </div>
    </motion.div>
  );
};