import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Award, BookOpen, AlertCircle, RefreshCw, Volume2, VolumeX, HelpCircle, ArrowLeft } from 'lucide-react';

import { 
  Language, 
  GameStats, 
  MiloExpression, 
  GameScreen, 
  SavedReflection 
} from './types';
import { 
  translations, 
  headlineOptions, 
  sourceOptions, 
  actionOptions, 
  commentsData, 
  secondaryComments, 
  chaptersDetails 
} from './data/gameContent';
import { MiloOtter } from './components/MiloOtter';
import { DialogBubble } from './components/DialogBubble';
import { PhoneMockup } from './components/PhoneMockup';
import { ReflectionCard } from './components/ReflectionCard';
import { ChapterSelection } from './components/ChapterSelection';
import badgeImage from './asset/gambar/2.png';

const USERNAME_OPTIONS = [
  'LambuKetupat',
  'RealNews',
  'SobatRebahan',
  'InfoGercep',
  'FaktaLokal'
];

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
      try {
        setSavedReflections(JSON.parse(raw));
      } catch (e) {
        // Safe fallback
      }
    }
  }, []);

  // Sync state when entering different screens to adjust Milo's animation expression
  useEffect(() => {
    if (screen === 'home') {
      setCurrentMiloExpression('waving');
      // Reset game choices for a fresh run
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
    } else if (screen === 'choose_headline') {
      setCurrentMiloExpression('thinking');
    } else if (screen === 'choose_source') {
      setCurrentMiloExpression('thinking');
    } else if (screen === 'choose_action') {
      setCurrentMiloExpression('thinking');
    }
  }, [screen]);

  // Play audio synth notes using the Web Audio API
  const playSynthSound = (type: 'click' | 'success' | 'fail' | 'slide') => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'click') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(400, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      } else if (type === 'success') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, ctx.currentTime); // A4
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      } else if (type === 'fail') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, ctx.currentTime); // A3
        osc.frequency.linearRampToValueAtTime(110, ctx.currentTime + 0.25); // A2
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } else if (type === 'slide') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      }
    } catch (e) {
      // Ignored if browser policy blocks Audio Context until user interaction
    }
  };

  const t = translations[lang];

  // Cycles through usernames list
  const handleUsernameToggle = (dir: 'left' | 'right') => {
    playSynthSound('click');
    if (dir === 'left') {
      setUsernameIndex((prev) => (prev === 0 ? USERNAME_OPTIONS.length - 1 : prev - 1));
    } else {
      setUsernameIndex((prev) => (prev === USERNAME_OPTIONS.length - 1 ? 0 : prev + 1));
    }
  };

  // Evaluation algorithm based on choice combination
  const evaluateChoicesAndDetermineChapter = (head: 'A' | 'B', src: 'A' | 'B', act: 'A' | 'B') => {
    let finalChapter = '';
    let newFollowers = 12;
    let newTrust = 100;

    if (head === 'A' && src === 'A' && act === 'A') {
      // Sensational clickbait headline + Unverified social source + share directly
      finalChapter = 'chaos_catalyst';
      newFollowers = 300; // Large surge
      newTrust = 20; // Massive drop
      setCurrentMiloExpression('shocked');
    } else if (head === 'B' && src === 'B' && act === 'B') {
      // Official title + official source + verify first
      finalChapter = 'pristine_anchor';
      newFollowers = 412; // Solid slow growth
      newTrust = 100; // Perfect reputation
      setCurrentMiloExpression('happy');
    } else if (head === 'A' && act === 'B') {
      // Clickbait headline but they decided to verify and cancel/hold back!
      finalChapter = 'filtered_defense';
      newFollowers = 12; // Stays low
      newTrust = 120; // Exceptional public trust
      setCurrentMiloExpression('wink');
    } else {
      // Mixed paths (e.g. true info with clickbait heading or unverified platform shared anyway)
      finalChapter = 'sensational_truth';
      newFollowers = 412; // High sensational engagement
      newTrust = 60; // Skepticism
      setCurrentMiloExpression('thinking');
    }

    setStats({ followers: newFollowers, trust: Math.min(newTrust, 100) });
    setSelectedChapterId(finalChapter);
    setScreen('feed_outcome');
    
    if (newTrust < 60) {
      playSynthSound('fail');
    } else {
      playSynthSound('success');
    }
  };

  // Proceed with option selection transitions
  const selectHeadline = (id: 'A' | 'B') => {
    playSynthSound('click');
    setHeadlineChoice(id);
    setTimeout(() => {
      setScreen('choose_source');
    }, 300);
  };

  const selectSource = (id: 'A' | 'B') => {
    playSynthSound('click');
    setSourceChoice(id);
    setTimeout(() => {
      setScreen('choose_action');
    }, 300);
  };

  const selectAction = (id: 'A' | 'B') => {
    playSynthSound('click');
    setActionChoice(id);
    
    // Evaluate right away upon final decision!
    if (headlineChoice && sourceChoice) {
      setTimeout(() => {
        evaluateChoicesAndDetermineChapter(headlineChoice, sourceChoice, id);
      }, 300);
    }
  };

  // Handle outcome sub-choices (Mau lanjut, Perbaiki, atau Berhenti)
  const selectConsequenceChoice = (choice: 'continue' | 'repent' | 'stop') => {
    playSynthSound('click');
    setSecondChoice(choice);

    // Adjust final stats and expressions based on path & sub-decisions
    let fDelta = 0;
    let tDelta = 0;

    if (selectedChapterId === 'chaos_catalyst') {
      if (choice === 'continue') {
        fDelta = 0; // Stagnant or saturated
        tDelta = -20; // trust hits zero!
        setCurrentMiloExpression('crying');
      } else if (choice === 'repent') {
        fDelta = -10; // loses angry clickbaiters
        tDelta = +30; // regains trust
        setCurrentMiloExpression('sad');
      } else {
        fDelta = 0;
        tDelta = +10;
        setCurrentMiloExpression('sad');
      }
    } else if (selectedChapterId === 'sensational_truth') {
      if (choice === 'continue') {
        fDelta = +38;
        tDelta = -20;
        setCurrentMiloExpression('shocked');
      } else if (choice === 'repent') {
        fDelta = -2;
        tDelta = +30;
        setCurrentMiloExpression('happy');
      } else {
        fDelta = -2;
        tDelta = +10;
        setCurrentMiloExpression('sad');
      }
    } else if (selectedChapterId === 'filtered_defense') {
      if (choice === 'continue') {
        fDelta = +388; // finally gets organic growth on right track
        tDelta = -20; // minor correction
        setCurrentMiloExpression('happy');
      } else {
        fDelta = 0;
        tDelta = -5;
        setCurrentMiloExpression('sad');
      }
    } else if (selectedChapterId === 'pristine_anchor') {
      if (choice === 'continue') {
        fDelta = +48;
        tDelta = 0; // already maxed
        setCurrentMiloExpression('happy');
      } else {
        fDelta = -12;
        tDelta = -10;
        setCurrentMiloExpression('sad');
      }
    }

    setStats((prev) => ({
      followers: Math.max(12, prev.followers + fDelta),
      trust: Math.max(0, Math.min(100, prev.trust + tDelta))
    }));

    setScreen('second_choice');
  };

  // Save Reflection Entry to LocalStorage
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
      date: new Date().toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    };

    const updated = [...savedReflections.filter((r) => r.chapterId !== selectedChapterId), entry];
    setSavedReflections(updated);
    localStorage.setItem('aware_saved_reflections', JSON.stringify(updated));
  };

  // Reset the game progress/diary completely if they want
  const handleResetProgress = () => {
    if (window.confirm(lang === 'id' ? "Hapus semua lencana dan buku harian?" : "Delete all badges and diary progress?")) {
      playSynthSound('fail');
      localStorage.removeItem('aware_saved_reflections');
      setSavedReflections([]);
    }
  };

  // Determine current active chapter's dialog texts based on sub-choices
  const getSecondChoiceText = () => {
    const details = chaptersDetails[selectedChapterId];
    if (!details) return '';

    if (secondChoice === 'continue') {
      return details.secondMiloText ? details.secondMiloText[lang] : '';
    } else if (secondChoice === 'repent') {
      const repentKey = 'secondMiloText_repent' as keyof typeof details;
      return details[repentKey] ? (details[repentKey] as any)[lang] : '';
    } else if (secondChoice === 'stop') {
      const stopKey = 'secondMiloText_stop' as keyof typeof details;
      return details[stopKey] ? (details[stopKey] as any)[lang] : '';
    }
    return '';
  };

  const getSecondQuestionText = () => {
    const details = chaptersDetails[selectedChapterId];
    if (!details) return '';

    if (secondChoice === 'continue') {
      return details.secondQuestion ? details.secondQuestion[lang] : '';
    } else if (secondChoice === 'repent') {
      const repentKey = 'secondQuestion_repent' as keyof typeof details;
      return details[repentKey] ? (details[repentKey] as any)[lang] : '';
    } else if (secondChoice === 'stop') {
      const stopKey = 'secondMiloText_stop' as keyof typeof details; // fallbacks
      return details.secondQuestion ? details.secondQuestion[lang] : '';
    }
    return '';
  };

  const getReflectionCardTitle = () => {
    const details = chaptersDetails[selectedChapterId];
    if (!details) return '';

    if (secondChoice === 'continue') {
      return details.secondReflectionTitle ? details.secondReflectionTitle[lang] : details.reflectionCardTitle[lang];
    } else if (secondChoice === 'repent') {
      const key = 'secondReflectionTitle_repent' as keyof typeof details;
      return details[key] ? (details[key] as any)[lang] : details.reflectionCardTitle[lang];
    } else if (secondChoice === 'stop') {
      const key = 'secondReflectionTitle_stop' as keyof typeof details;
      return details[key] ? (details[key] as any)[lang] : details.reflectionCardTitle[lang];
    }
    return details.reflectionCardTitle[lang];
  };

  const getReflectionCardSubtitle = () => {
    const details = chaptersDetails[selectedChapterId];
    if (!details) return '';

    if (secondChoice === 'continue') {
      return details.secondReflectionSubtitle ? details.secondReflectionSubtitle[lang] : details.reflectionCardSubtitle[lang];
    } else if (secondChoice === 'repent') {
      const key = 'secondReflectionSubtitle_repent' as keyof typeof details;
      return details[key] ? (details[key] as any)[lang] : details.reflectionCardSubtitle[lang];
    } else if (secondChoice === 'stop') {
      const key = 'secondReflectionSubtitle_stop' as keyof typeof details;
      return details[key] ? (details[key] as any)[lang] : details.reflectionCardSubtitle[lang];
    }
    return details.reflectionCardSubtitle[lang];
  };

  const getReflectionQuestion = () => {
    const details = chaptersDetails[selectedChapterId];
    if (!details) return '';

    if (secondChoice === 'continue') {
      return details.secondReflectionQuestion ? details.secondReflectionQuestion[lang] : details.reflectionQuestion[lang];
    } else if (secondChoice === 'repent') {
      const key = 'secondReflectionQuestion_repent' as keyof typeof details;
      return details[key] ? (details[key] as any)[lang] : details.reflectionQuestion[lang];
    } else if (secondChoice === 'stop') {
      const key = 'secondReflectionQuestion_stop' as keyof typeof details;
      return details[key] ? (details[key] as any)[lang] : details.reflectionQuestion[lang];
    }
    return details.reflectionQuestion[lang];
  };

  return (
    <div className="min-h-screen bg-[#F4ECE1] text-[#1E1915] font-sans antialiased relative overflow-x-hidden pb-12 flex flex-col justify-between">
      {/* GLOBAL HUD / NAVBAR */}
      <header className="px-6 py-4 flex justify-between items-center max-w-7xl mx-auto w-full border-b-2 border-[#1E1915]/10 mb-6">
        {/* Brand */}
        <div 
          onClick={() => { playSynthSound('click'); setScreen('home'); }} 
          className="flex items-center gap-2 cursor-pointer group"
          id="brand-logo"
        >
          <div className="w-10 h-10 rounded-xl bg-[#E36633] border-2 border-[#1E1915] flex items-center justify-center font-display font-extrabold text-white text-xl shadow-[2.5px_2.5px_0px_0px_#1E1915] group-hover:translate-x-[0.5px] group-hover:translate-y-[0.5px] group-hover:shadow-[2px_2px_0px_0px_#1E1915] transition-all">
            A
          </div>
          <span className="font-display font-extrabold text-2xl tracking-tight text-[#1E1915] group-hover:text-[#E36633] transition-colors">
            AWARE
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Sound toggle button */}
          <button
            onClick={() => { setSoundEnabled(!soundEnabled); playSynthSound('click'); }}
            className="p-2 rounded-xl border-2 border-[#1E1915] bg-[#FFFDF9] shadow-[2.5px_2.5px_0px_0px_#1E1915] hover:bg-[#FAF6F0] transition active:scale-95"
            title={soundEnabled ? "Disable Sound" : "Enable Sound"}
            id="btn-sound-toggle"
          >
            {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>

          {/* Language Toggle Button */}
          <button
            onClick={() => { playSynthSound('slide'); setLang(lang === 'id' ? 'en' : 'id'); }}
            className="px-4 py-2 text-xs md:text-sm font-sans font-extrabold rounded-xl border-2 border-[#1E1915] bg-[#FFFDF9] shadow-[2.5px_2.5px_0px_0px_#1E1915] hover:bg-[#FAF6F0] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1.5px_1.5px_0px_0px_#1E1915] transition-all flex items-center gap-1.5 cursor-pointer"
            id="btn-lang-toggle"
          >
            <Globe size={14} />
            <span>{t.langBtn}</span>
          </button>
        </div>
      </header>

      {/* CORE SCREENS ROUTER CONTAINER */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 flex items-center justify-center">
        <AnimatePresence mode="wait">
          
          {/* 1. SPLASH / HOME SCREEN */}
          {screen === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full"
            >
              <div className="lg:col-span-7 space-y-6 md:space-y-8">
                {/* Otter Badge with text */}
                <div className="inline-flex items-center gap-2 bg-[#B4C285]/20 border-2 border-[#B4C285] px-3.5 py-1.5 rounded-full">
                  <img src={badgeImage} alt="Milo badge" className="w-6 h-6 object-contain rounded-full bg-white p-0.5" />
                  <span className="font-mono text-xs font-bold text-[#242D13] tracking-wide uppercase">
                    Literacy Adventure with Milo
                  </span>
                </div>

                <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-[#1E1915] leading-tight select-text">
                  Postingan pertama kamu, <span className="text-[#E36633] underline decoration-[#1E1915] decoration-4 md:decoration-6 underline-offset-4 md:underline-offset-8">taruhannya</span> kepercayaan orang.
                </h1>

                <p className="font-sans font-semibold text-base md:text-lg text-[#5C4D3F] leading-relaxed max-w-xl select-text">
                  {t.subTagline}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <button
                    onClick={() => { playSynthSound('success'); setScreen('milo_intro'); }}
                    className="px-8 py-4 bg-[#1E1915] text-white hover:bg-[#2D2823] font-sans font-extrabold text-base md:text-lg rounded-2xl border-2 border-[#1E1915] shadow-[5px_5px_0px_0px_#8C7662] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0px_0px_#8C7662] transition-all flex items-center justify-center gap-2 cursor-pointer"
                    id="btn-play-now"
                  >
                    <span>🚀</span> {t.btnPlay}
                  </button>

                  <button
                    onClick={() => { playSynthSound('click'); setScreen('chapters'); }}
                    className="px-8 py-4 bg-[#FFFDF9] text-[#1E1915] hover:bg-[#FAF6F0] font-sans font-extrabold text-base md:text-lg rounded-2xl border-2 border-[#1E1915] shadow-[5px_5px_0px_0px_#1E1915] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0px_0px_#1E1915] transition-all flex items-center justify-center gap-2 cursor-pointer"
                    id="btn-chapters-gallery"
                  >
                    <Award size={20} className="text-[#E36633]" />
                    {t.btnChapters}
                  </button>
                </div>
              </div>

              {/* Right Side: Showcase Smartphone preview */}
              <div className="lg:col-span-5 flex justify-center">
                <PhoneMockup
                  lang={lang}
                  username="LambuKetupat"
                  followers={12}
                  trust={100}
                  postTitle="KAMU PELAJAR PENGANGGURAN? KERJA ONLINE: Sambil Rebahan! Cuma Like Video YouTube Dibayar 50 Ribu/Tugas. Butuh 100 Orang Gercep!"
                  postVerified={false}
                />
              </div>
            </motion.div>
          )}

          {/* 2. MILO THE OTTER INTRO SCREEN */}
          {screen === 'milo_intro' && (
            <motion.div
              key="milo_intro"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 w-full max-w-4xl"
            >
              <MiloOtter expression={currentMiloExpression} size={250} />
              
              <div className="space-y-6 flex-1">
                <DialogBubble 
                  text={t.miloIntroText} 
                  variant="green"
                />
                
                <div className="flex gap-4">
                  <button
                    onClick={() => { playSynthSound('click'); setScreen('home'); }}
                    className="px-6 py-3 bg-white text-[#1E1915] font-sans font-bold text-sm md:text-base rounded-2xl border-2 border-[#1E1915] shadow-[3px_3px_0px_0px_#1E1915] hover:bg-[#FAF6F0] transition-all cursor-pointer"
                    id="btn-intro-back"
                  >
                    {t.btnPrev}
                  </button>
                  <button
                    onClick={() => { playSynthSound('click'); setScreen('name_selection'); }}
                    className="px-8 py-3 bg-[#1E1915] text-white font-sans font-extrabold text-sm md:text-base rounded-2xl border-2 border-[#1E1915] shadow-[3px_3px_0px_0px_#8C7662] hover:bg-[#2D2823] transition-all cursor-pointer flex items-center gap-2"
                    id="btn-intro-next"
                  >
                    {t.btnNext} <span>→</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* 3. NAME / PROFILE SELECTION */}
          {screen === 'name_selection' && (
            <motion.div
              key="name_selection"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full max-w-5xl"
            >
              <div className="lg:col-span-7 space-y-6">
                <MiloOtter expression={currentMiloExpression} size={160} className="mx-auto lg:mx-0" />
                <DialogBubble text={t.nameSelectionText} variant="green" />
                
                <div className="flex gap-4">
                  <button
                    onClick={() => { playSynthSound('click'); setScreen('milo_intro'); }}
                    className="px-6 py-3 bg-white text-[#1E1915] font-sans font-bold text-sm rounded-2xl border-2 border-[#1E1915] shadow-[3px_3px_0px_0px_#1E1915] hover:bg-[#FAF6F0] transition cursor-pointer"
                    id="btn-name-back"
                  >
                    {t.btnPrev}
                  </button>
                  <button
                    onClick={() => { playSynthSound('success'); setScreen('post_intro'); }}
                    className="px-8 py-3 bg-[#E36633] text-white font-sans font-extrabold text-sm rounded-2xl border-2 border-[#1E1915] shadow-[3px_3px_0px_0px_#1E1915] hover:bg-[#D15525] transition cursor-pointer flex items-center gap-2"
                    id="btn-name-confirm"
                  >
                    {t.btnConfirmName} <span>🎉</span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 flex justify-center">
                {/* Smartphone with username selection callback */}
                <PhoneMockup
                  lang={lang}
                  username={currentUsername}
                  onUsernameChange={handleUsernameToggle}
                  followers={12}
                  trust={100}
                />
              </div>
            </motion.div>
          )}

          {/* 4. POST PLANNING INTRO */}
          {screen === 'post_intro' && (
            <motion.div
              key="post_intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full max-w-5xl"
            >
              <div className="lg:col-span-7 space-y-6">
                <MiloOtter expression={currentMiloExpression} size={180} className="mx-auto lg:mx-0" />
                
                <DialogBubble text={t.postIntroText} variant="orange" />

                <div className="flex gap-4">
                  <button
                    onClick={() => { playSynthSound('click'); setScreen('name_selection'); }}
                    className="px-6 py-3 bg-white text-[#1E1915] font-sans font-bold text-sm rounded-2xl border-2 border-[#1E1915] shadow-[3px_3px_0px_0px_#1E1915] hover:bg-[#FAF6F0] transition cursor-pointer"
                    id="btn-post-intro-back"
                  >
                    {t.btnPrev}
                  </button>
                  <button
                    onClick={() => { playSynthSound('slide'); setScreen('choose_headline'); }}
                    className="px-8 py-3 bg-[#1E1915] text-white font-sans font-extrabold text-sm rounded-2xl border-2 border-[#1E1915] shadow-[3px_3px_0px_0px_#8C7662] hover:bg-[#2D2823] transition cursor-pointer flex items-center gap-2"
                    id="btn-post-intro-gas"
                  >
                    {t.btnGas} <span>📱</span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 flex justify-center">
                <PhoneMockup
                  lang={lang}
                  username={currentUsername}
                  followers={12}
                  trust={100}
                />
              </div>
            </motion.div>
          )}

          {/* 5. INTERACTIVE DECISION STEP 1: CHOOSE HEADLINE */}
          {screen === 'choose_headline' && (
            <motion.div
              key="choose_headline"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-4xl space-y-8"
            >
              <div className="text-center space-y-3">
                <span className="font-mono text-xs font-extrabold bg-[#E36633]/20 text-[#E36633] border border-[#E36633] px-3.5 py-1 rounded-full uppercase tracking-widest">
                  {lang === 'id' ? "LANGKAH 1 DARI 3" : "STEP 1 OF 3"}
                </span>
                <h2 className="font-display font-extrabold text-2xl md:text-3xl text-[#1E1915] tracking-tight">
                  {t.selectHeadlineHeader}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {headlineOptions.map((opt) => (
                  <motion.div
                    key={opt.id}
                    whileHover={{ scale: 1.015, y: -2 }}
                    onClick={() => selectHeadline(opt.id)}
                    className="p-6 md:p-8 rounded-3xl border-3 border-[#1E1915] bg-[#FFFDF9] shadow-[5px_5px_0px_0px_#1E1915] hover:bg-[#FAF6F0] cursor-pointer flex flex-col justify-between transition-all min-h-[160px] active:translate-x-[2px] active:translate-y-[2px]"
                    id={`opt-headline-${opt.id}`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <span className="font-mono font-extrabold text-xs text-[#8C7662] uppercase bg-[#FAF1E6] px-2.5 py-1 rounded border border-[#1E1915]">
                        Opsi {opt.id}
                      </span>
                      <span className="text-sm font-bold text-[#E36633]">
                        {opt.id === 'A' ? '🔥 Viral Clickbait' : '⭐ Credible'}
                      </span>
                    </div>
                    <p className="font-sans font-extrabold text-sm md:text-base text-[#1E1915] leading-relaxed select-text">
                      "{opt.text[lang]}"
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-center pt-4">
                <button
                  onClick={() => { playSynthSound('click'); setScreen('post_intro'); }}
                  className="px-6 py-2.5 bg-white text-[#1E1915] font-sans font-bold text-sm rounded-2xl border-2 border-[#1E1915] shadow-[3px_3px_0px_0px_#1E1915] hover:bg-[#FAF6F0] flex items-center gap-2 cursor-pointer"
                  id="btn-headline-back"
                >
                  <span>←</span> {t.btnPrev}
                </button>
              </div>
            </motion.div>
          )}

          {/* 6. INTERACTIVE DECISION STEP 2: CHOOSE SOURCE */}
          {screen === 'choose_source' && (
            <motion.div
              key="choose_source"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-4xl space-y-8"
            >
              <div className="text-center space-y-3">
                <span className="font-mono text-xs font-extrabold bg-[#E36633]/20 text-[#E36633] border border-[#E36633] px-3.5 py-1 rounded-full uppercase tracking-widest">
                  {lang === 'id' ? "LANGKAH 2 DARI 3" : "STEP 2 OF 3"}
                </span>
                <h2 className="font-display font-extrabold text-2xl md:text-3xl text-[#1E1915] tracking-tight">
                  {t.selectSourceHeader}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sourceOptions.map((opt) => (
                  <motion.div
                    key={opt.id}
                    whileHover={{ scale: 1.015, y: -2 }}
                    onClick={() => selectSource(opt.id)}
                    className="p-6 md:p-8 rounded-3xl border-3 border-[#1E1915] bg-[#FFFDF9] shadow-[5px_5px_0px_0px_#1E1915] hover:bg-[#FAF6F0] cursor-pointer flex flex-col justify-between transition-all min-h-[160px] active:translate-x-[2px] active:translate-y-[2px]"
                    id={`opt-source-${opt.id}`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <span className="font-mono font-extrabold text-xs text-[#8C7662] uppercase bg-[#FAF1E6] px-2.5 py-1 rounded border border-[#1E1915]">
                        Opsi {opt.id}
                      </span>
                      <span className="text-sm font-bold text-[#7BA65C]">
                        {opt.id === 'A' ? '📱 Social Media FYP' : '🌐 Official Agency'}
                      </span>
                    </div>
                    <p className="font-sans font-extrabold text-sm md:text-base text-[#1E1915] leading-relaxed select-text">
                      "{opt.text[lang]}"
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-center pt-4">
                <button
                  onClick={() => { playSynthSound('click'); setScreen('choose_headline'); }}
                  className="px-6 py-2.5 bg-white text-[#1E1915] font-sans font-bold text-sm rounded-2xl border-2 border-[#1E1915] shadow-[3px_3px_0px_0px_#1E1915] hover:bg-[#FAF6F0] flex items-center gap-2 cursor-pointer"
                  id="btn-source-back"
                >
                  <span>←</span> {t.btnPrev}
                </button>
              </div>
            </motion.div>
          )}

          {/* 7. INTERACTIVE DECISION STEP 3: CHOOSE ACTION */}
          {screen === 'choose_action' && (
            <motion.div
              key="choose_action"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-4xl space-y-8"
            >
              <div className="text-center space-y-3">
                <span className="font-mono text-xs font-extrabold bg-[#E36633]/20 text-[#E36633] border border-[#E36633] px-3.5 py-1 rounded-full uppercase tracking-widest">
                  {lang === 'id' ? "LANGKAH 3 DARI 3" : "STEP 3 OF 3"}
                </span>
                <h2 className="font-display font-extrabold text-2xl md:text-3xl text-[#1E1915] tracking-tight">
                  {t.selectActionHeader}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {actionOptions.map((opt) => (
                  <motion.div
                    key={opt.id}
                    whileHover={{ scale: 1.015, y: -2 }}
                    onClick={() => selectAction(opt.id)}
                    className="p-6 md:p-8 rounded-3xl border-3 border-[#1E1915] bg-[#FFFDF9] shadow-[5px_5px_0px_0px_#1E1915] hover:bg-[#FAF6F0] cursor-pointer flex flex-col justify-between transition-all min-h-[160px] active:translate-x-[2px] active:translate-y-[2px]"
                    id={`opt-action-${opt.id}`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <span className="font-mono font-extrabold text-xs text-[#8C7662] uppercase bg-[#FAF1E6] px-2.5 py-1 rounded border border-[#1E1915]">
                        Opsi {opt.id}
                      </span>
                      <span className="text-sm font-bold text-[#E36633]">
                        {opt.id === 'A' ? '⚡ Immediate Share' : '🔍 Verification Checks'}
                      </span>
                    </div>
                    <p className="font-sans font-extrabold text-sm md:text-base text-[#1E1915] leading-relaxed select-text">
                      "{opt.text[lang]}"
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-center pt-4">
                <button
                  onClick={() => { playSynthSound('click'); setScreen('choose_source'); }}
                  className="px-6 py-2.5 bg-white text-[#1E1915] font-sans font-bold text-sm rounded-2xl border-2 border-[#1E1915] shadow-[3px_3px_0px_0px_#1E1915] hover:bg-[#FAF6F0] flex items-center gap-2 cursor-pointer"
                  id="btn-action-back"
                >
                  <span>←</span> {t.btnPrev}
                </button>
              </div>
            </motion.div>
          )}

          {/* 8. FEED OUTCOME SCREEN */}
          {screen === 'feed_outcome' && (
            <motion.div
              key="feed_outcome"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full max-w-5xl"
            >
              {/* Left Column: Outcome reactions and Choices */}
              <div className="lg:col-span-7 space-y-6">
                <MiloOtter expression={currentMiloExpression} size={150} className="mx-auto lg:mx-0" />
                
                {/* Otter dialogue feedback */}
                <DialogBubble
                  text={
                    selectedChapterId === 'chaos_catalyst' ? t.chaosMiloText :
                    selectedChapterId === 'sensational_truth' ? t.sensationalMiloText :
                    selectedChapterId === 'filtered_defense' ? t.filteredMiloText :
                    t.pristineMiloText
                  }
                  variant={selectedChapterId === 'chaos_catalyst' ? 'orange' : 'green'}
                />

                {/* Sub prompt */}
                <div className="bg-white border-2 border-[#1E1915] rounded-2xl p-5 shadow-[4px_4px_0px_0px_#1E1915]">
                  <p className="font-display font-extrabold text-base text-[#1E1915] mb-4">
                    {t.continuePrompt}
                  </p>

                  <div className="flex flex-col gap-3">
                    {chaptersDetails[selectedChapterId]?.options[lang].map((opt, i) => (
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

              {/* Right Column: Interactive feed mockup showing live followers/comments */}
              <div className="lg:col-span-5 flex justify-center">
                <PhoneMockup
                  lang={lang}
                  username={currentUsername}
                  followers={stats.followers}
                  trust={stats.trust}
                  postTitle={headlineChoice === 'A' ? headlineOptions[0].text[lang] : headlineOptions[1].text[lang]}
                  postSource={sourceChoice === 'A' ? "FYP TikTok" : "Platform Resmi Toko Online"}
                  postVerified={headlineChoice === 'B'}
                  comments={commentsData[selectedChapterId]?.map((c) => ({
                    user: c.user,
                    text: c.text[lang],
                    isNegative: c.isNegative
                  }))}
                  isOutcomeScreen={true}
                  hasRedCross={selectedChapterId === 'filtered_defense'}
                />
              </div>
            </motion.div>
          )}

          {/* 9. DEEP CONSEQUENCE SCREEN (Double down, repent, or take break) */}
          {screen === 'second_choice' && (
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
                  text={getSecondChoiceText()}
                  variant={secondChoice === 'continue' ? 'orange' : 'green'}
                />

                {/* Moral reflection quote container */}
                <div className="bg-[#1E1915] text-[#FAF6F0] rounded-2xl p-5 border border-[#1E1915] font-sans font-bold text-sm md:text-base leading-relaxed tracking-normal select-text">
                  <span className="text-[#E36633] text-2xl font-serif mr-1 block">“</span>
                  {getSecondQuestionText()}
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

              {/* Consequence Phone Comments updates */}
              <div className="lg:col-span-5 flex justify-center">
                <PhoneMockup
                  lang={lang}
                  username={currentUsername}
                  followers={stats.followers}
                  trust={stats.trust}
                  postTitle={headlineChoice === 'A' ? headlineOptions[0].text[lang] : headlineOptions[1].text[lang]}
                  postSource={sourceChoice === 'A' ? "FYP TikTok" : "Platform Resmi Toko Online"}
                  postVerified={headlineChoice === 'B'}
                  comments={secondaryComments[`${selectedChapterId}_${secondChoice}`]?.map((c) => ({
                    user: c.user,
                    text: c.text[lang],
                    isNegative: c.isNegative
                  })) || commentsData[selectedChapterId]?.map((c) => ({
                    user: c.user,
                    text: c.text[lang],
                    isNegative: c.isNegative
                  }))}
                  isOutcomeScreen={true}
                  hasRedCross={selectedChapterId === 'filtered_defense' && secondChoice === 'stop'}
                />
              </div>
            </motion.div>
          )}

          {/* 10. FINAL DIARY REFLECTION CARD SCREEN */}
          {screen === 'final_reflection' && (
            <motion.div
              key="final_reflection"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              <ReflectionCard
                lang={lang}
                chapterId={selectedChapterId}
                title={getReflectionCardTitle()}
                subtitle={getReflectionCardSubtitle()}
                question={getReflectionQuestion()}
                stats={stats}
                onSave={handleSaveReflection}
                onBackToHome={() => setScreen('home')}
              />
            </motion.div>
          )}

          {/* 11. UNLOCKED CHAPTERS GALLERY / DIARY LIST */}
          {screen === 'chapters' && (
            <motion.div
              key="chapters"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              <ChapterSelection
                lang={lang}
                savedReflections={savedReflections}
                onBackToHome={() => setScreen('home')}
                onSelectSavedReflection={(ref) => setActiveDiaryReflection(ref)}
              />

              {/* Reset Progress trigger at the footer of chapters */}
              {savedReflections.length > 0 && (
                <div className="max-w-4xl mx-auto px-4 mt-8 flex justify-end">
                  <button
                    onClick={handleResetProgress}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-300 transition-colors cursor-pointer"
                    id="btn-reset-progress"
                  >
                    <RefreshCw size={12} />
                    {lang === 'id' ? "Hapus Progress & Lencana" : "Reset Badges & Progress"}
                  </button>
                </div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* GLOBAL FOOTER */}
      <footer className="text-center mt-12 text-xs font-mono font-semibold text-[#8C7662] max-w-7xl mx-auto w-full px-6 border-t border-[#1E1915]/5 pt-4">
        <div>
          © {new Date().getFullYear()} AWARE Game. {lang === 'id' ? "Dibuat untuk Literasi Keamanan Informasi Digital." : "Built for Digital Information Security Literacy."}
        </div>
      </footer>

      {/* Interactive Modal View for selected diary reflections */}
      {activeDiaryReflection && (
        <div className="fixed inset-0 bg-[#1E1915]/60 flex items-center justify-center p-4 z-50 animate-fade-in backdrop-blur-xs">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl border-3 border-[#1E1915] p-6 max-w-md w-full shadow-[8px_8px_0px_0px_#1E1915] relative"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-mono font-bold bg-[#E36633]/20 text-[#E36633] px-2.5 py-1 rounded-full uppercase">
                {lang === 'id' ? "Refleksi Disimpan" : "Saved Reflection"}
              </span>
              <button
                onClick={() => { playSynthSound('click'); setActiveDiaryReflection(null); }}
                className="text-[#8C7662] hover:text-[#1E1915] font-sans font-extrabold text-base p-1"
                id="btn-close-diary-modal"
              >
                ✕
              </button>
            </div>

            <h3 className="font-sans font-extrabold text-xl text-[#1E1915] mb-2">
              {chaptersDetails[activeDiaryReflection.chapterId]?.name[lang]}
            </h3>
            
            <p className="text-xs font-semibold text-[#8C7662] mb-4">
              {lang === 'id' ? "Ditulis oleh" : "Written by"} @{activeDiaryReflection.username} | {activeDiaryReflection.date}
            </p>

            <div className="bg-[#FAF6F0] p-4 rounded-2xl border-2 border-[#1E1915] mb-5 font-sans font-bold text-sm text-[#1E1915] leading-relaxed">
              "{activeDiaryReflection.reflectionText}"
            </div>

            <div className="flex gap-2 font-mono text-[10px] text-[#8C7662] font-extrabold uppercase justify-center bg-[#B4C285]/10 border border-[#B4C285]/30 p-2.5 rounded-xl">
              <span>👥 {activeDiaryReflection.stats.followers} {lang === 'id' ? "Pengikut" : "Followers"}</span>
              <span className="text-[#EAD4C3]">|</span>
              <span>❤️ {activeDiaryReflection.stats.trust}% Trust</span>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
