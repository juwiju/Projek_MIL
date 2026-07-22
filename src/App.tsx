import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { Globe, Volume2, VolumeX } from 'lucide-react';

import { 
  Language, 
  GameStats, 
  MiloExpression, 
  GameScreen, 
  SavedReflection 
} from './types';

// Hanya mengimpor naskah translasi navbar global jika masih ada di gameContent
import { translations } from './data/gameContent';

// IMPORT ASET GAMBAR DARI PENGEMBANGAN TEMAN
import badgeImage from './asset/gambar/2.png';

// IMPORT SEMUA HALAMAN DARI FOLDER PAGE (MODULAR)
import { HomePage } from './page/HomePage';
import { MiloIntroPage } from './page/MiloIntroPage';
import { NameSelectionPage } from './page/NameSelectionPage';
import { PostIntroPage } from './page/PostIntroPage';
import { ChooseHeadlinePage } from './page/ChooseHeadlinePage';
import { ChooseSourcePage } from './page/ChooseSourcePage';
import { ChooseActionPage } from './page/ChooseActionPage';
import { FeedOutcomePage } from './page/FeedOutcomePage';
import { SecondChoicePage } from './page/SecondChoicePage';
import { FinalReflectionPage } from './page/FinalReflectionPage';
import { ChaptersPage } from './page/ChaptersPage';
import { PostPreviewPage } from './page/PostPreviewPage';

const USERNAME_OPTIONS = ['LambuKetupat', 'RealNews', 'SobatRebahan', 'InfoGercep', 'FaktaLokal'];

export default function App() {
  const [lang, setLang] = useState<Language>('id');
  const [screen, setScreen] = useState<GameScreen>('home');
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Profile and stats states
  const [usernameIndex, setUsernameIndex] = useState(0);
  const currentUsername = USERNAME_OPTIONS[usernameIndex];
  const [stats, setStats] = useState<GameStats>({ followers: 12, trust: 100 });

  // Player choices during decision phase
  const [headlineChoice, setHeadlineChoice] = useState<'A' | 'B' | null>(null);
  const [sourceChoice, setSourceChoice] = useState<'A' | 'B' | null>(null);
  const [actionChoice, setActionChoice] = useState<'A' | 'B' | null>(null);

  // Branch and secondary outcomes
  const [selectedChapterId, setSelectedChapterId] = useState<string>('');
  const [secondChoice, setSecondChoice] = useState<'continue' | 'repent' | 'stop' | null>(null);
  const [currentMiloExpression, setCurrentMiloExpression] = useState<MiloExpression>('waving');

  // Persistence for unlocked chapters & reflective diaries
  const [savedReflections, setSavedReflections] = useState<SavedReflection[]>([]);
  const [activeDiaryReflection, setActiveDiaryReflection] = useState<SavedReflection | null>(null);

  // Load progress from localStorage on startup
  useEffect(() => {
    const raw = localStorage.getItem('aware_saved_reflections');
    if (raw) {
      try { setSavedReflections(JSON.parse(raw)); } catch (e) {}
    }
  }, []);

  // Sync state ketika berpindah screen untuk ekspresi Milo & reset state saat pulang ke Home
  useEffect(() => {
    if (screen === 'home') {
      setCurrentMiloExpression('waving');
      setHeadlineChoice(null);
      setSourceChoice(null);
      setActionChoice(null);
      setSecondChoice(null);
      setSelectedChapterId('');
      setStats({ followers: 12, trust: 100 });
    } else if (screen === 'milo_intro') {
      setCurrentMiloExpression('waving');
    } else if (screen === 'name_selection') {
      setCurrentMiloExpression('wink');
    } else if (screen === 'post_intro') {
      setCurrentMiloExpression('holding_phone');
    } else if (['choose_headline', 'choose_source', 'choose_action'].includes(screen)) {
      setCurrentMiloExpression('thinking');
    } else if (screen === 'post_preview') {
      setCurrentMiloExpression(actionChoice === 'A' ? 'wink' : 'happy');
    }
  }, [screen, actionChoice]);

  // Audio Synth Generator (Web Audio API)
  const playSynthSound = (type: 'click' | 'success' | 'fail' | 'slide') => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);

      if (type === 'click') {
        osc.type = 'triangle'; osc.frequency.setValueAtTime(400, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.08, ctx.currentTime); gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        osc.start(); osc.stop(ctx.currentTime + 0.1);
      } else if (type === 'success') {
        osc.type = 'sine'; osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.12, ctx.currentTime); gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
        osc.start(); osc.stop(ctx.currentTime + 0.35);
      } else if (type === 'fail') {
        osc.type = 'sawtooth'; osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(110, ctx.currentTime + 0.25);
        gain.gain.setValueAtTime(0.1, ctx.currentTime); gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.start(); osc.stop(ctx.currentTime + 0.3);
      } else if (type === 'slide') {
        osc.type = 'sine'; osc.frequency.setValueAtTime(300, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.05, ctx.currentTime); gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        osc.start(); osc.stop(ctx.currentTime + 0.2);
      }
    } catch (e) {}
  };

  const t = translations?.[lang] || { langBtn: lang === 'id' ? 'EN' : 'ID' };

  const handleUsernameToggle = (dir: 'left' | 'right') => {
    playSynthSound('click');
    if (dir === 'left') {
      setUsernameIndex((prev) => (prev === 0 ? USERNAME_OPTIONS.length - 1 : prev - 1));
    } else {
      setUsernameIndex((prev) => (prev === USERNAME_OPTIONS.length - 1 ? 0 : prev + 1));
    }
  };

  // Algoritma evaluasi kombinasi pilihan 3 langkah cerita utama
  const evaluateChoicesAndDetermineChapter = (head: 'A' | 'B', src: 'A' | 'B', act: 'A' | 'B') => {
    let finalChapter = '';
    let newFollowers = 12;
    let newTrust = 100;
    const severe = head === 'A'; // A = Ragebait/Clickbait (varian lebih parah)

    if (src === 'A' && act === 'A') {
      finalChapter = 'chaos_catalyst';
      newFollowers = severe ? 300 : 180;
      newTrust = severe ? 10 : 40;
      setCurrentMiloExpression('shocked');
    } else if (src === 'B' && act === 'A') {
      finalChapter = 'sensational_truth';
      newFollowers = severe ? 150 : 100;
      newTrust = severe ? 70 : 95;
      setCurrentMiloExpression('thinking');
    } else if (src === 'A' && act === 'B') {
      finalChapter = 'filtered_defense';
      newFollowers = 12;
      newTrust = 100;
      setCurrentMiloExpression('wink');
    } else {
      finalChapter = 'pristine_anchor';
      newFollowers = 18;
      newTrust = 100;
      setCurrentMiloExpression('happy');
    }

    setStats({ followers: newFollowers, trust: Math.min(newTrust, 100) });
    setSelectedChapterId(finalChapter);
    setScreen('feed_outcome');
    playSynthSound(newTrust < 60 ? 'fail' : 'success');
  };

  // Handler navigasi pilihan langkah 1-3
  const selectHeadline = (id: 'A' | 'B') => {
    playSynthSound('click'); setHeadlineChoice(id);
    setTimeout(() => setScreen('choose_source'), 300);
  };

  const selectSource = (id: 'A' | 'B') => {
    playSynthSound('click'); setSourceChoice(id);
    setTimeout(() => setScreen('choose_action'), 300);
  };

  // Tanda aksi hanya menyimpan pilihan ke state, lalu dikirim ke PostPreviewPage
  const selectAction = (id: 'A' | 'B') => {
    setActionChoice(id);
  };

  // Pindah dari PostPreviewPage ke FeedOutcomePage
  const goToFeedOutcome = () => {
    if (headlineChoice && sourceChoice && actionChoice) {
      evaluateChoicesAndDetermineChapter(headlineChoice, sourceChoice, actionChoice);
    } else {
      setScreen('feed_outcome');
    }
  };

  // Pemicu aksi konsekuensi sekunder
  const selectConsequenceChoice = (choice: 'continue' | 'repent' | 'stop') => {
    playSynthSound('click');
    setSecondChoice(choice);

    let fDelta = 0; let tDelta = 0;
    if (selectedChapterId === 'chaos_catalyst') {
      if (choice === 'continue') { tDelta = -20; setCurrentMiloExpression('crying'); }
      else if (choice === 'repent') { fDelta = -10; tDelta = +30; setCurrentMiloExpression('sad'); }
      else { tDelta = +10; setCurrentMiloExpression('sad'); }
    } else if (selectedChapterId === 'sensational_truth') {
      if (choice === 'continue') { fDelta = +38; tDelta = -20; setCurrentMiloExpression('shocked'); }
      else if (choice === 'repent') { fDelta = -2; tDelta = +30; setCurrentMiloExpression('happy'); }
      else { fDelta = -2; tDelta = +10; setCurrentMiloExpression('sad'); }
    } else if (selectedChapterId === 'filtered_defense') {
      if (choice === 'continue') { fDelta = +388; tDelta = -20; setCurrentMiloExpression('happy'); }
      else { tDelta = -5; setCurrentMiloExpression('sad'); }
    } else if (selectedChapterId === 'pristine_anchor') {
      if (choice === 'continue') { fDelta = +48; setCurrentMiloExpression('happy'); }
      else { fDelta = -12; tDelta = -10; setCurrentMiloExpression('sad'); }
    }

    setStats((prev) => ({
      followers: Math.max(12, prev.followers + fDelta),
      trust: Math.max(0, Math.min(100, prev.trust + tDelta))
    }));
    setScreen('second_choice');
  };

  const handleSaveReflection = (text: string) => {
    const entry: SavedReflection = {
      chapterId: selectedChapterId,
      username: currentUsername,
      headlineChoice: headlineChoice === 'A' ? 'Sensational' : 'Credible',
      sourceChoice: sourceChoice === 'A' ? 'TikTok' : 'Official',
      actionChoice: actionChoice === 'A' ? 'Share' : 'Verify',
      secondAction: secondChoice || 'none',
      reflectionText: text,
      stats: stats,
      date: new Date().toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    };
    const updated = [...savedReflections.filter((r) => r.chapterId !== selectedChapterId), entry];
    setSavedReflections(updated);
    localStorage.setItem('aware_saved_reflections', JSON.stringify(updated));
  };

  const handleResetProgress = () => {
    if (window.confirm(lang === 'id' ? "Hapus semua lencana?" : "Delete all badges?")) {
      playSynthSound('fail');
      localStorage.removeItem('aware_saved_reflections');
      setSavedReflections([]);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4ECE1] text-[#1E1915] font-sans antialiased relative overflow-x-hidden pb-12 flex flex-col justify-between">
      {/* GLOBAL HEADER BANNER */}
      <header className="px-6 py-4 flex justify-between items-center max-w-7xl mx-auto w-full border-b-2 border-[#1E1915]/10 mb-6">
        <div onClick={() => { playSynthSound('click'); setScreen('home'); }} className="flex items-center gap-2 cursor-pointer group">
          <div className="w-10 h-10 rounded-xl bg-[#E36633] border-2 border-[#1E1915] flex items-center justify-center font-display font-extrabold text-white text-xl shadow-[2.5px_2.5px_0px_0px_#1E1915] group-hover:translate-x-[0.5px] group-hover:translate-y-[0.5px] transition-all">A</div>
          <span className="font-display font-extrabold text-2xl tracking-tight text-[#1E1915] group-hover:text-[#E36633] transition-colors">AWARE</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => { setSoundEnabled(!soundEnabled); playSynthSound('click'); }} className="p-2 rounded-xl border-2 border-[#1E1915] bg-[#FFFDF9] shadow-[2.5px_2.5px_0px_0px_#1E1915] hover:bg-[#FAF6F0] transition active:scale-95">
            {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
          <button onClick={() => { playSynthSound('slide'); setLang(lang === 'id' ? 'en' : 'id'); }} className="px-4 py-2 text-xs md:text-sm font-sans font-extrabold rounded-xl border-2 border-[#1E1915] bg-[#FFFDF9] shadow-[2.5px_2.5px_0px_0px_#1E1915] hover:bg-[#FAF6F0] transition-all flex items-center gap-1.5 cursor-pointer">
            <Globe size={14} /> <span>{t.langBtn}</span>
          </button>
        </div>
      </header>

      {/* ROUTER CONTAINER UTAMA */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {screen === 'home' && (
            <HomePage lang={lang} playSynthSound={playSynthSound} setScreen={setScreen} />
          )}
          {screen === 'milo_intro' && (
            <MiloIntroPage lang={lang} currentMiloExpression={currentMiloExpression} playSynthSound={playSynthSound} setScreen={setScreen} />
          )}
          {screen === 'name_selection' && (
            <NameSelectionPage lang={lang} currentUsername={currentUsername} currentMiloExpression={currentMiloExpression} handleUsernameToggle={handleUsernameToggle} playSynthSound={playSynthSound} setScreen={setScreen} />
          )}
          {screen === 'post_intro' && (
            <PostIntroPage lang={lang} currentUsername={currentUsername} currentMiloExpression={currentMiloExpression} playSynthSound={playSynthSound} setScreen={setScreen} />
          )}
          {screen === 'choose_headline' && (
            <ChooseHeadlinePage lang={lang} playSynthSound={playSynthSound} setScreen={setScreen} selectHeadline={selectHeadline} />
          )}
          {screen === 'choose_source' && (
            <ChooseSourcePage lang={lang} playSynthSound={playSynthSound} setScreen={setScreen} selectSource={selectSource} />
          )}
          {screen === 'choose_action' && (
            <ChooseActionPage lang={lang} playSynthSound={playSynthSound} setScreen={setScreen} selectAction={selectAction} />
          )}
          {screen === 'post_preview' && (
            <PostPreviewPage
              lang={lang}
              playSynthSound={playSynthSound}
              setScreen={setScreen}
              currentMiloExpression={currentMiloExpression}
              currentUsername={currentUsername}
              headlineChoice={headlineChoice}
              actionChoice={actionChoice}
              goToFeedOutcome={goToFeedOutcome}
            />
          )}
          {screen === 'feed_outcome' && (
            <FeedOutcomePage
              lang={lang}
              playSynthSound={playSynthSound}
              setScreen={setScreen}
              currentMiloExpression={currentMiloExpression}
              currentUsername={currentUsername}
              stats={stats}
              headlineChoice={headlineChoice}
              sourceChoice={sourceChoice}
              selectedChapterId={selectedChapterId}
              selectConsequenceChoice={selectConsequenceChoice}
            />
          )}
          {screen === 'second_choice' && (
            <SecondChoicePage
              lang={lang}
              playSynthSound={playSynthSound}
              setScreen={setScreen}
              currentMiloExpression={currentMiloExpression}
              currentUsername={currentUsername}
              stats={stats}
              headlineChoice={headlineChoice}
              sourceChoice={sourceChoice}
              secondChoice={secondChoice}
              selectedChapterId={selectedChapterId}
            />
          )}
          {screen === 'final_reflection' && (
            <FinalReflectionPage
              lang={lang}
              setScreen={setScreen}
              selectedChapterId={selectedChapterId}
              stats={stats}
              handleSaveReflection={handleSaveReflection}
            />
          )}
          {screen === 'chapters' && (
            <ChaptersPage 
              lang={lang} 
              playSynthSound={playSynthSound} 
              setScreen={setScreen} 
              savedReflections={savedReflections} 
              setActiveDiaryReflection={setActiveDiaryReflection} 
              handleResetProgress={handleResetProgress}
              badgeImage={badgeImage}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}