import { useState, useCallback, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import FloatingPetals from '@/components/FloatingPetals';
import Sparkles from '@/components/Sparkles';
import InteractiveHearts from '@/components/InteractiveHearts';
import FloatingMusicPlayer from '@/components/FloatingMusicPlayer';
import HiddenGameTrigger from '@/components/HiddenGameTrigger';
import HeroSection from '@/components/sections/HeroSection';
import ApologySection from '@/components/sections/ApologySection';
import AdmireSection from '@/components/sections/AdmireSection';
import ImpactSection from '@/components/sections/ImpactSection';
import PromiseSection from '@/components/sections/PromiseSection';
import ClosingSection from '@/components/sections/ClosingSection';
import ValentineProposalPage from '@/components/valentine/ValentineProposalPage';
import CatchHeartsGame from '@/components/game/CatchHeartsGame';
import ThemeTransition from '@/components/ThemeTransition';
import ValentineDedication from '@/components/valentine/ValentineDedication';
import FullscreenVideo from '@/components/valentine/FullscreenVideo';
import AuroraBackground from '@/components/AuroraBackground';
import ThreeBackground from '@/components/ThreeBackground';

type PageState = 'intro' | 'main' | 'game' | 'transition' | 'video' | 'proposal' | 'valentine';

const pageTransition = {
  initial: { opacity: 0, scale: 1.02, filter: 'blur(8px)' },
  animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
  exit: { opacity: 0, scale: 0.98, filter: 'blur(8px)' },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
};

const Index = () => {
  const { theme } = useTheme();
  const [pageState, setPageState] = useState<PageState>('intro');
  const [showPlayButton, setShowPlayButton] = useState(false);
  const introVideoRef = useRef<HTMLVideoElement>(null);

  const handleGameTrigger = useCallback(() => { setPageState('game'); }, []);
  const handleGameComplete = useCallback(() => { setPageState('transition'); }, []);
  const handleTransitionComplete = useCallback(() => { setPageState('video'); }, []);
  const handleVideoEnd = useCallback(() => { setPageState('proposal'); }, []);
  const handleProposalComplete = useCallback(() => { setPageState('valentine'); }, []);

  const handleIntroEnd = useCallback(() => {
    if (introVideoRef.current) {
      introVideoRef.current.pause();
      introVideoRef.current.src = '';
      introVideoRef.current.load();
    }
    setPageState('main');
  }, []);

  // Attempt autoplay; show play button if blocked
  useEffect(() => {
    if (pageState !== 'intro') return;
    const video = introVideoRef.current;
    if (!video) return;

    const tryPlay = async () => {
      try {
        video.muted = true;
        await video.play();
        // Autoplay worked (muted). Now try unmuting — browser may re-block.
        video.muted = false;
        // If unmuting caused a pause, keep it muted but playing
        if (video.paused) {
          video.muted = true;
          await video.play();
        }
      } catch {
        // Autoplay completely blocked — need user gesture
        setShowPlayButton(true);
      }
    };

    tryPlay();
  }, [pageState]);




  return (
    <AnimatePresence mode="wait">
      {pageState === 'intro' && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[300] bg-black flex items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <video
            ref={introVideoRef}
            src="/videos/intro-video.mp4"
            playsInline
            preload="auto"
            onEnded={handleIntroEnd}
            className="w-full h-full object-contain"
          />
          {showPlayButton && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 cursor-pointer"
              onClick={() => {
                if (introVideoRef.current) {
                  introVideoRef.current.muted = false;
                  introVideoRef.current.play();
                  setShowPlayButton(false);
                }
              }}
            >
              <span className="text-7xl mb-4">▶️</span>
              <span className="text-white/80 font-elegant text-xl">Tap to play</span>
            </motion.button>
          )}
          <button
            onClick={() => handleIntroEnd()}
            className="absolute bottom-8 right-8 z-10 text-white/60 hover:text-white text-sm font-elegant transition-colors"
          >
            Skip →
          </button>
        </motion.div>
      )}


      {pageState === 'main' && (
        <>
          <FloatingMusicPlayer songSrc="/audio/raat-bhar.mp3" songName="Raat Bhar" />
          <HiddenGameTrigger onTrigger={handleGameTrigger} />
          <motion.div
            key="main"
            className="theme-lavender relative min-h-screen overflow-x-hidden"
            {...pageTransition}
          >
            <ThreeBackground />
            <FloatingPetals />
            <Sparkles />
            <InteractiveHearts />

            <div className="fixed inset-0 bg-gradient-to-b from-primary/5 via-transparent to-accent/5 -z-5 pointer-events-none" />

            <main className="relative z-10">
              <HeroSection />
              <ApologySection />
              <AdmireSection />
              <ImpactSection />
              <PromiseSection />
              <ClosingSection />
            </main>
          </motion.div>
        </>
      )}

      {pageState === 'game' && (
        <motion.div key="game" {...pageTransition}>
          <CatchHeartsGame onGameComplete={handleGameComplete} />
        </motion.div>
      )}

      {pageState === 'transition' && (
        <motion.div key="transition" {...pageTransition}>
          <ThemeTransition onComplete={handleTransitionComplete} />
        </motion.div>
      )}

      {pageState === 'video' && (
        <motion.div
          key="video"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <FullscreenVideo onVideoEnd={handleVideoEnd} />
        </motion.div>
      )}

      {pageState === 'proposal' && (
        <motion.div key="proposal" {...pageTransition}>
          <ValentineProposalPage onComplete={handleProposalComplete} />
        </motion.div>
      )}

      {pageState === 'valentine' && (
        <motion.div key="valentine" className="theme-valentine" {...pageTransition}>
          <ValentineDedication />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Index;
