import { useState, useCallback } from 'react';
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
import CatchHeartsGame from '@/components/game/CatchHeartsGame';
import ThemeTransition from '@/components/ThemeTransition';
import ValentineDedication from '@/components/valentine/ValentineDedication';
import FullscreenVideo from '@/components/valentine/FullscreenVideo';

type PageState = 'main' | 'game' | 'transition' | 'video' | 'valentine';

const Index = () => {
  const { theme } = useTheme();
  const [pageState, setPageState] = useState<PageState>('main');

  const handleGameTrigger = useCallback(() => {
    setPageState('game');
  }, []);

  const handleGameComplete = useCallback(() => {
    setPageState('transition');
  }, []);

  const handleTransitionComplete = useCallback(() => {
    setPageState('video');
  }, []);

  const handleVideoEnd = useCallback(() => {
    setPageState('valentine');
  }, []);

  return (
    <AnimatePresence mode="wait">
      {/* Main Apology Page (Lavender theme) */}
      {pageState === 'main' && (
        <motion.div
          key="main"
          className="theme-lavender relative min-h-screen overflow-x-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Background effects */}
          <FloatingPetals />
          <Sparkles />
          <InteractiveHearts />
          <FloatingMusicPlayer songSrc="/audio/raat-bhar.mp3" songName="Raat Bhar" />

          {/* Hidden game trigger */}
          <HiddenGameTrigger onTrigger={handleGameTrigger} />

          {/* Background gradient */}
          <div className="fixed inset-0 bg-gradient-to-b from-primary/10 via-background to-accent/10 -z-10" />

          {/* Main sections */}
          <main className="relative z-10">
            <HeroSection />
            <ApologySection />
            <AdmireSection />
            <ImpactSection />
            <PromiseSection />
            <ClosingSection />
          </main>
        </motion.div>
      )}

      {/* Hidden Game */}
      {pageState === 'game' && (
        <CatchHeartsGame 
          key="game"
          onGameComplete={handleGameComplete} 
        />
      )}

      {/* Theme Transition (Lavender to Valentine) */}
      {pageState === 'transition' && (
        <ThemeTransition 
          key="transition"
          onComplete={handleTransitionComplete} 
        />
      )}

      {/* Fullscreen Video after transition */}
      {pageState === 'video' && (
        <FullscreenVideo
          key="video"
          onVideoEnd={handleVideoEnd}
        />
      )}

      {/* Valentine Dedication Page (Red theme) */}
      {pageState === 'valentine' && (
        <motion.div
          key="valentine"
          className="theme-valentine"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <ValentineDedication />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Index;
