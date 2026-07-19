import { ChapterDetails, FeedComment } from '../types';

export const gameplayResultsTranslations = {
  id: {
    continuePrompt: "MAU LANJUT ATAU ENGGA NIH..",
    btnContinue: "Lanjutin aja deh, nanggung",
    btnRepent: "Ganti deh, udah cukup kapoknya",
    btnStop: "Berhenti aja deh",
    reflectionTitle: "Digital Reflection Card",
    reflectionBtnBack: "Kembali ke Menu",
    reflectionSaved: "Refleksi kamu berhasil disimpan di Diary Kreator!",
  },
  en: {
    continuePrompt: "DO YOU WANT TO CONTINUE OR NOT?",
    btnContinue: "Keep going, almost there",
    btnRepent: "Change course, learned my lesson",
    btnStop: "Stop posting for now",
    reflectionTitle: "Digital Reflection Card",
    reflectionBtnBack: "Back to Home",
    reflectionSaved: "Your reflection has been saved to your Creator Diary!",
  }
};

export const commentsData: Record<string, FeedComment[]> = {
  chaos_catalyst: [
    { user: "@user_bingung", text: { id: "EH INI BENERAN GAK SIHHH??!!?", en: "IS THIS REALLY LEGIT??!!?" } },
    { user: "@loker_seeker99", text: { id: "aku udah coba daftar...tapi kok aku jadi kurang yakin ya....", en: "I tried registering... but why do I feel unsure now...." } },
    { user: "@korban_php", text: { id: "Boong ih, aku kemaren udah pernah daftar beginian ges tapi nihil", en: "Fake guys, I registered for something like this yesterday and got nothing" }, isNegative: true },
    { user: "@butuh_duit_bgt", text: { id: "aku lagi butuh duit banget,,semoga rejeki deh.....", en: "I really need money right now,, hope this is my luck....." } }
  ],
  sensational_truth: [
    { user: "@clickbait_hunter", text: { id: "apaan dah si etmin haus clickbait", en: "what's up with the admin being so clickbaity" }, isNegative: true },
    { user: "@pelajar_santai", text: { id: "haruskah kucuba daftar...", en: "should I try registering..." } },
    { user: "@netizen_kritis", text: { id: "hati-hati ya ges jangan asal daftar, cek dulu", en: "be careful guys, don't just register, double check first" } },
    { user: "@mikir_keras", text: { id: "hmmmmm", en: "hmmmmm" } }
  ],
  filtered_defense: [
    { user: "@netizen_bijak", text: { id: "ges ini kayaknya better deh daripada loker di sebelah", en: "guys this one looks way better than the job ad next door" } },
    { user: "@follower_setia", text: { id: "sudah aku follow ya min! jangan lupa update terus", en: "already followed, keep updating admin!" } },
    { user: "@active_commenter", text: { id: "already followed (komen 2 in)", en: "already followed (replying to support)" } }
  ],
  pristine_anchor: [
    { user: "@tanya_dong", text: { id: "min ini deadline pendaftarannya sampe kapan?", en: "admin, when is the application deadline?" } },
    { user: "@pejuang_magang", text: { id: "semoga rejeki deh kali ini", en: "hope this is my lucky shot this time" } },
    { user: "@sma_bisa", text: { id: "min ada minimal pendidikan ga?", en: "admin, is there a minimum education requirement?" } },
    { user: "@mahasiswa_kepopo", text: { id: "ini buat mahasiswa ongoing bisa ga ya?", en: "is this available for ongoing university students?" } }
  ]
};

export const secondaryComments: Record<string, FeedComment[]> = {
  chaos_double_down: [
    { user: "@ibu_khawatir", text: { id: "Dek, abangmu ketipu loker bodong dari internet..", en: "Son, your brother got scammed by a fake job ad from the internet.." }, isNegative: true },
    { user: "@adek_shock", text: { id: "Yang bener aja mah?", en: "Are you serious, mom?" } },
    { user: "@paman_korban", text: { id: "Iya, pamanmu ketipu juga.", en: "Yes, your uncle got scammed too." }, isNegative: true }
  ],
  chaos_repent: [
    { user: "@mantan_fans", text: { id: "males ah, loker dari akun ini ga ada yang bener", en: "annoying, none of the job ads from this account are legit" }, isNegative: true },
    { user: "@kritik_tajam", text: { id: "etmin gimana sih kurasi lokernya", en: "admin, how on earth do you curate your jobs?" }, isNegative: true },
    { user: "@ilang_feeling", text: { id: "eh akun ini udah jarang lewat di timeline ku, padahal dulu sering", en: "huh, this account rarely shows up on my timeline now, used to be active" } }
  ],
  sensational_double_down: [
    { user: "@netizen_kecewa", text: { id: "informasinya yang jelas dong", en: "provide clear info next time please" }, isNegative: true },
    { user: "@scam_alert", text: { id: "ini pasti skem yaaaa", en: "this must be a scam guys" }, isNegative: true }
  ],
  sensational_repent: [
    { user: "@fans_baru", text: { id: "keren nih etmin bisa pilih judul wisely", en: "great job admin choosing the headline wisely now" } },
    { user: "@pendaftar_senang", text: { id: "aku mau daftar minn", en: "I want to apply admin!" } },
    { user: "@penanya_baru", text: { id: "ini sampe kapan bukanya?", en: "until when is this open?" } }
  ],
  filtered_double_down: [
    { user: "@ibu_khawatir", text: { id: "Dek, abangmu ketipu loker bodong dari internet..", en: "Son, your brother got scammed by a fake job ad from the internet.." }, isNegative: true },
    { user: "@adek_shock", text: { id: "Yang bener aja mah?", en: "Are you serious, mom?" } },
    { user: "@paman_korban", text: { id: "Iya, pamanmu ketipu juga.", en: "Yes, your uncle got scammed too." }, isNegative: true }
  ],
  pristine_double_down: [
    { user: "@netizen_support", text: { id: "makasih min infonya!! update terus pls", en: "thanks for the info admin! please keep updating" } },
    { user: "@tag_kawan", text: { id: "ges ada loker nihh @temen", en: "hey check this vacancy out @friend" } },
    { user: "@berkah_malam", text: { id: "woww bismillah ah coba", en: "wow, in the name of God let's try" } }
  ]
};

export const chaptersDetails: Record<string, ChapterDetails> = {
  chaos_catalyst: {
    id: 'chaos_catalyst',
    name: { id: "The Chaos Catalyst", en: "The Chaos Catalyst" },
    title: { id: "Chapter 1: The Chaos Catalyst", en: "Chapter 1: The Chaos Catalyst" },
    miloReaction: {
      id: "WADUH, VIRAL SIH...TAPI TERNYATA BANYAK YG KETIPU DAN JADI KORBAN.",
      en: "OH NO, IT WENT VIRAL... BUT IT TURNS OUT A LOT OF PEOPLE WERE SCAMMED."
    },
    followersDelta: 250,
    trustDelta: -80,
    reflectionCardTitle: {
      id: "Ketika Rame Lebih Penting dari Benar",
      en: "When Virality Matters More than Truth"
    },
    reflectionCardSubtitle: {
      id: "Tetap mempertahankan pilihan, meski sudah mengetahui dampak buruknya.",
      en: "Persisting with a choice even after learning of its harmful consequences."
    },
    reflectionQuestion: {
      id: "Pernah nggak kamu ngerasa susah ngaku salah walau udah tau salah?",
      en: "Have you ever found it hard to admit a mistake even when you knew you were wrong?"
    },
    options: {
      id: [
        { label: "Lanjutin aja dong", action: 'continue' },
        { label: "Ganti deh, udah cukup nipunya", action: 'repent' },
        { label: "Berhenti aja deh", action: 'stop' }
      ],
      en: [
        { label: "Just continue anyway", action: 'continue' },
        { label: "Change course, enough tricking", action: 'repent' },
        { label: "Stop posting altogether", action: 'stop' }
      ]
    },
    secondMiloText: {
      id: "MAKIN VIRAL SIH, TAPI TERNYATA YANG JADI KORBAN ITU ORANG TERDEKAT KAMU..",
      en: "IT BECAME EVEN MORE VIRAL, BUT TURNS OUT THE VICTIMS ARE THOSE CLOSEST TO YOU.."
    },
    secondQuestion: {
      id: "\"WAKTU LO LIHAT ORANG MAKIN KENA TIPU, KENAPA MASIH LANJUT POSTING? APA YANG LEBIH PENTING BUAT LO SAAT ITU — FOLLOWERS ATAU DAMPAKNYA?\"",
      en: "\"WHEN YOU SAW MORE PEOPLE GETTING SCAMMED, WHY DID YOU KEEP POSTING? WHAT WAS MORE IMPORTANT TO YOU — FOLLOWERS OR THE IMPACT?\""
    },
    secondReflectionTitle: {
      id: "Ketika Rame Lebih Penting dari Benar",
      en: "When Virality Matters More than Truth"
    },
    secondReflectionSubtitle: {
      id: "Tetap mempertahankan pilihan, meski sudah mengetahui dampak buruknya.",
      en: "Persisting with a choice even after learning of its harmful consequences."
    },
    secondReflectionQuestion: {
      id: "pernah nggak kamu ngerasa susah ngaku salah walau udah tau salah?",
      en: "have you ever found it hard to admit a mistake even when you knew you were wrong?"
    },
    secondMiloText_repent: {
      id: "NGGAK LANGSUNG RAME LAGI SIH... TAPI INI KERASA LEBIH PLONG NGGAK?",
      en: "IT DIDN'T GO VIRAL IMMEDIATELY... BUT DOES THIS FEEL MORE RELIEVING?"
    } as any,
    secondQuestion_repent: {
      id: "\"APA YANG BIKIN LO AKHIRNYA MAU GANTI ARAH? KIRA-KIRA, KALAU DARI AWAL LO TAU DAMPAKNYA, APA LO BAKAL LANGSUNG PILIH INI?\"",
      en: "\"WHAT FINALLY MADE YOU WANT TO CHANGE DIRECTION? IF YOU KNEW THE IMPACT FROM THE START, WOULD YOU HAVE CHOSEN THIS INSTANTLY?\""
    } as any,
    secondReflectionTitle_repent: {
      id: "Berubah Arah Itu Nggak Gampang, Tapi Bisa",
      en: "Changing Course Isn't Easy, But Possible"
    } as any,
    secondReflectionSubtitle_repent: {
      id: "Kamu berani memperbaiki pilihan setelah melihat dampak dari keputusan sebelumnya.",
      en: "You dare to correct your choices after witnessing the impact of your previous decisions."
    } as any,
    secondReflectionQuestion_repent: {
      id: "momen apa yang bikin kamu mau berubah?",
      en: "what moment made you want to change?"
    } as any,
    secondMiloText_stop: {
      id: "\"LO BERHENTI... TAPI ITU BELUM NGEBENERIN APA-APA, KAN?\"",
      en: "\"YOU STOPPED... BUT THAT DOESN'T FIX ANYTHING YET, DOES IT?\""
    } as any,
    secondReflectionTitle_stop: {
      id: "Diam Bukan Berarti Selesai",
      en: "Silence Doesn't Mean Resolved"
    } as any,
    secondReflectionSubtitle_stop: {
      id: "Berhenti bukan berarti masalah selesai. Perubahan dimulai saat kita berani memperbaikinya.",
      en: "Stopping doesn't solve the problem. Change begins when we are brave enough to make things right."
    } as any,
    secondReflectionQuestion_stop: {
      id: "apa bedanya berhenti karena sadar, sama berhenti karena kabur?",
      en: "what's the difference between stopping due to awareness vs stopping to run away?"
    } as any
  },
  sensational_truth: {
    id: 'sensational_truth',
    name: { id: "Sensationalized Truth", en: "Sensationalized Truth" },
    title: { id: "Chapter 2: Sensationalized Truth", en: "Chapter 2: Sensationalized Truth" },
    miloReaction: {
      id: "INFONYA BENER SIH.. TAPI JUDULNYA BIKIN RIBUT.",
      en: "THE INFO IS CORRECT.. BUT THE HEADLINE IS STIRRING UP AN UPROAR."
    },
    followersDelta: 400,
    trustDelta: -40,
    reflectionCardTitle: {
      id: "Benar Aja Nggak Cukup",
      en: "Just Being Correct is Not Enough"
    },
    reflectionCardSubtitle: {
      id: "Informasi yang benar akan lebih bermakna jika disampaikan dengan cara yang tepat.",
      en: "True information is far more meaningful when delivered in the right manner."
    },
    reflectionQuestion: {
      id: "Coba cari 1 contoh berita asli yang judulnya bikin salah paham — bahas di kelas",
      en: "Try to find 1 real example of a news article whose headline is misleading — share it"
    },
    options: {
      id: [
        { label: "Lanjutin aja deh, nanggung", action: 'continue' },
        { label: "Ganti deh, udah cukup ribetnya", action: 'repent' },
        { label: "Berhenti aja deh", action: 'stop' }
      ],
      en: [
        { label: "Just continue, too close to stop", action: 'continue' },
        { label: "Change course, had enough of the drama", action: 'repent' },
        { label: "Stop posting for now", action: 'stop' }
      ]
    },
    secondMiloText: {
      id: "INFONYA KAN BENER... TAPI KOK ORANG-ORANG MASIH PADA SALAH NANGKEP YA..",
      en: "THE INFO WAS TRUE... BUT WHY ARE PEOPLE STILL MISUNDERSTANDING IT?.."
    },
    secondQuestion: {
      id: "\"INFONYA KAN UDAH BENER. TAPI KENAPA MASIH BANYAK YANG SALAH PAHAM? MENURUT LO, SALAHNYA DI MANA?\"",
      en: "\"THE INFO WAS TRUE. BUT WHY ARE SO MANY PEOPLE STILL MISUNDERSTANDING IT? IN YOUR OPINION, WHERE DID IT GO WRONG?\""
    },
    secondReflectionTitle: {
      id: "Benar Aja Nggak Cukup",
      en: "Just Being Correct is Not Enough"
    },
    secondReflectionSubtitle: {
      id: "Informasi yang benar akan lebih bermakna jika disampaikan dengan cara yang tepat.",
      en: "True information is far more meaningful when delivered in the right manner."
    },
    secondReflectionQuestion: {
      id: "Coba cari 1 contoh berita asli yang judulnya bikin salah paham — bahas di kelas",
      en: "Find 1 example of a real news headline that triggers misunderstanding — discuss it"
    },
    secondMiloText_repent: {
      id: "NAH, INI ENAK DIBACA. NGGAK BIKIN ORANG PANIK DULUAN",
      en: "NOW, THIS IS PLEASANT TO READ. DOESN'T MAKE PEOPLE PANIC PREMATURELY."
    } as any,
    secondQuestion_repent: {
      id: "\"JUDUL YANG LEBIH TENANG TERNYATA BIKIN ORANG LEBIH PERCAYA YA. APA BEDANYA RASANYA NULIS KAYAK GITU?\"",
      en: "\"SOBER HEADLINES ACTUALLY MAKE PEOPLE TRUST MORE. WHAT DOES IT FEEL LIKE WRITING THAT WAY?\""
    } as any,
    secondReflectionTitle_repent: {
      id: "Cara Bicara yang Bikin Orang Percaya",
      en: "The Way of Speaking that Builds Trust"
    } as any,
    secondReflectionSubtitle_repent: {
      id: "Informasi yang benar akan lebih dipercaya jika disampaikan dengan jujur dan tidak memprovokasi.",
      en: "Accurate information is trusted more when presented honestly and without provocation."
    } as any,
    secondReflectionQuestion_repent: {
      id: "Bagikan 1 tips nulis judul yang jujur ke teman sekelas",
      en: "Share 1 tip on writing honest headlines with your peers"
    } as any,
    secondMiloText_stop: {
      id: "\"OK BREAK DULU JUGA GAPAPA. TAPI NANTI PAS BALIK, COBA DIINGET LAGI APA YANG SALAH.\"",
      en: "\"IT'S OKAY TO TAKE A BREAK. BUT WHEN YOU'RE BACK, TRY TO REMEMBER WHAT WENT WRONG.\""
    } as any,
    secondReflectionTitle_stop: {
      id: "Jeda untuk Mikir Ulang",
      en: "Pause to Reconsider"
    } as any,
    secondReflectionSubtitle_stop: {
      id: "Berhenti sejenak memberi ruang untuk berpikir, mengevaluasi, dan mempersiapkan langkah yang lebih baik.",
      en: "Pausing briefly gives room to think, evaluate, and prepare a better path ahead."
    } as any,
    secondReflectionQuestion_stop: {
      id: "Kapan waktu yang tepat buat 'istirahat' dari media sosial?",
      en: "When is the right time to take a 'break' from social media?"
    } as any
  },
  filtered_defense: {
    id: 'filtered_defense',
    name: { id: "Filtered Defense", en: "Filtered Defense" },
    title: { id: "Chapter 3: Filtered Defense", en: "Chapter 3: Filtered Defense" },
    miloReaction: {
      id: "HEHE UNTUNG AJA GAK JADI POSTING!",
      en: "HEHE LUCKY THING WE DIDN'T POST IT!"
    },
    followersDelta: 0,
    trustDelta: 20,
    reflectionCardTitle: {
      id: "Nahan Diri Itu Skill, Bukan Kebetulan",
      en: "Self-Restraint is a Skill, Not Luck"
    },
    reflectionCardSubtitle: {
      id: "Kamu memilih menahan diri untuk memastikan informasi benar sebelum membagikannya.",
      en: "You choose self-control to ensure information is true before broadcasting it."
    },
    reflectionQuestion: {
      id: "Pernah nggak kamu nahan diri buat nggak share sesuatu?",
      en: "Have you ever held yourself back from sharing something online?"
    },
    options: {
      id: [
        { label: "Lanjutin aja deh, nanggung", action: 'continue' },
        { label: "Berhenti aja deh", action: 'stop' }
      ],
      en: [
        { label: "Just continue anyway", action: 'continue' },
        { label: "Stop posting for now", action: 'stop' }
      ]
    },
    secondMiloText: {
      id: "\"NIH, CARA YANG BENER TUH EMANG GINI — PELAN TAPI MANTAP.\"",
      en: "\"SEE, THIS IS THE RIGHT WAY TO DO IT — SLOW BUT STEADY.\""
    },
    secondQuestion: {
      id: "\"LO UDAH NGERASAIN NAHAN DIRI ITU BERAT, TAPI HASILNYA JELAS. APA YANG BIKIN LO YAKIN BUAT TERUS KAYAK GINI?\"",
      en: "\"YOU'VE FELT HOW HARD SELF-RESTRAINT IS, BUT THE RESULT IS CLEAR. WHAT MAKES YOU SURE TO KEEP GOING LIKE THIS?\""
    },
    secondReflectionTitle: {
      id: "Nahan Diri Itu Skill, Bukan Kebetulan",
      en: "Self-Restraint is a Skill, Not Luck"
    },
    secondReflectionSubtitle: {
      id: "Kamu memilih menahan diri untuk memastikan informasi benar sebelum membagikannya.",
      en: "You choose self-control to ensure information is true before broadcasting it."
    },
    secondReflectionQuestion: {
      id: "pernah nggak kamu nahan diri buat nggak share sesuatu?",
      en: "have you ever held yourself back from sharing something online?"
    },
    secondMiloText_stop: {
      id: "\"LHO, KENAPA BERHENTI? PADAHAL UDAH ON THE RIGHT TRACK.\"",
      en: "\"HUH, WHY STOP? YOU ARE ALREADY ON THE RIGHT TRACK.\""
    } as any,
    secondReflectionTitle_stop: {
      id: "Dipercaya, Tapi Kok Ragu?",
      en: "Trusted, Yet Hesitant?"
    } as any,
    secondReflectionSubtitle_stop: {
      id: "Berada di jalan yang benar tidak selalu membuat rasa ragu hilang. Tetap percaya pada pilihanmu.",
      en: "Being on the right path doesn't always wash away doubts. Keep believing in your choice."
    } as any,
    secondReflectionQuestion_stop: {
      id: "kenapa kadang kita ragu walau udah melakukan hal yang benar?",
      en: "why do we sometimes feel doubtful even when we've done the right thing?"
    } as any
  },
  pristine_anchor: {
    id: 'pristine_anchor',
    name: { id: "Pristine Anchor", en: "Pristine Anchor" },
    title: { id: "Chapter 4: Pristine Anchor", en: "Chapter 4: Pristine Anchor" },
    miloReaction: {
      id: "BANYAK YANG TERBANTU LOH DENGAN POSTINGAN KAMU, KEREN!",
      en: "MANY PEOPLE WERE HELPED BY YOUR POST, AWESOME!"
    },
    followersDelta: 400,
    trustDelta: 100,
    reflectionCardTitle: {
      id: "Pelan Tapi Nggak Salah Arah",
      en: "Slow But in the Right Direction"
    },
    reflectionCardSubtitle: {
      id: "Konsistensi dalam melakukan hal yang benar akan membangun kepercayaan yang bertahan lama.",
      en: "Consistency in doing what is right builds long-lasting trust."
    },
    reflectionQuestion: {
      id: "growth cepat vs growth yang bisa dipercayai, mana yang lebih penting?",
      en: "fast growth vs trustworthy growth, which one matters more?"
    },
    options: {
      id: [
        { label: "Lanjutin aja deh, nanggung", action: 'continue' },
        { label: "Berhenti aja deh", action: 'stop' }
      ],
      en: [
        { label: "Just continue, keep it up", action: 'continue' },
        { label: "Stop posting for a break", action: 'stop' }
      ]
    },
    secondMiloText: {
      id: "\"EMANG GINI RASANYA. NGGAK INSTAN, TAPI WORTH IT.\"",
      en: "\"SEE, THIS IS HOW IT FEELS. NOT INSTANT, BUT TOTALLY WORTH IT.\""
    },
    secondQuestion: {
      id: "\"GROWTH-NYA EMANG PELAN. TAPI COBA PIKIR, APA YANG LO DAPET DARI CARA INI YANG NGGAK BISA DIDAPAT DARI JALAN PINTAS?\"",
      en: "\"THE GROWTH IS INDEED SLOW. BUT THINK, WHAT DO YOU GET FROM THIS PATH THAT YOU CAN'T GET FROM A SHORTCUT?\""
    },
    secondReflectionTitle: {
      id: "Pelan Tapi Nggak Salah Arah",
      en: "Slow But in the Right Direction"
    },
    secondReflectionSubtitle: {
      id: "Konsistensi dalam melakukan hal yang benar akan membangun kepercayaan yang bertahan lama.",
      en: "Consistency in doing what is right builds long-lasting trust."
    },
    secondReflectionQuestion: {
      id: "growth cepat vs growth yang bisa dipercayai, mana yang lebih penting?",
      en: "fast growth vs trustworthy growth, which one matters more?"
    },
    secondMiloText_stop: {
      id: "\"LHO, KENAPA BERHENTI? PADAHAL UDAH ON THE RIGHT TRACK.\"",
      en: "\"HUH, WHY STOP? YOU ARE ALREADY ON THE RIGHT TRACK.\""
    } as any,
    secondReflectionTitle_stop: {
      id: "Kalah Rame, Tapi Nggak Kalah Benar",
      en: "Less Crowded, But No Less True"
    } as any,
    secondReflectionSubtitle_stop: {
      id: "Popularitas mungkin datang lebih cepat, tetapi kepercayaan dibangun melalui pilihan yang benar dan konsisten.",
      en: "Popularity might arrive faster, but trust is carefully built through right and consistent choices."
    } as any,
    secondReflectionQuestion_stop: {
      id: "Pernah ngerasa pengen ikutan gaya orang lain biar nggak ketinggalan?",
      en: "Have you ever felt the urge to jump on someone else's trend just to not miss out?"
    } as any
  }
};