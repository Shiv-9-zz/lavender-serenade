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
import ValentineProposalPage from '@/components/valentine/ValentineProposalPage';
import CatchHeartsGame from '@/components/game/CatchHeartsGame';
import ThemeTransition from '@/components/ThemeTransition';
import ValentineDedication from '@/components/valentine/ValentineDedication';
import FullscreenVideo from '@/components/valentine/FullscreenVideo';
import AuroraBackground from '@/components/AuroraBackground';

type PageState = 'main' | 'game' | 'transition' | 'video' | 'proposal' | 'valentine';

const Index = () => {
  const { theme } = useTheme();
  const [pageState, setPageState] = useState<PageState>('main');

  const handleGameTrigger = useCallback(() => { setPageState('game'); }, []);
  const handleGameComplete = useCallback(() => { setPageState('transition'); }, []);
  const handleTransitionComplete = useCallback(() => { setPageState('video'); }, []);
  const handleVideoEnd = useCallback(() => { setPageState('proposal'); }, []);
  const handleProposalComplete = useCallback(() => { setPageState('valentine'); }, []);

  return (
    <AnimatePresence mode="wait">
      {pageState === 'main' && (
        <motion.div
          key="main"
          className="theme-lavender relative min-h-screen overflow-x-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <AuroraBackground />
          <FloatingPetals />
          <Sparkles />
          <InteractiveHearts />
          <FloatingMusicPlayer songSrc="/audio/raat-bhar.mp3" songName="Raat Bhar" />
          <HiddenGameTrigger onTrigger={handleGameTrigger} />

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
      )}

      {pageState === 'game' && (
        <CatchHeartsGame key="game" onGameComplete={handleGameComplete} />
      )}

      {pageState === 'transition' && (
        <ThemeTransition key="transition" onComplete={handleTransitionComplete} />
      )}

      {pageState === 'video' && (
        <FullscreenVideo key="video" onVideoEnd={handleVideoEnd} />
      )}

      {pageState === 'proposal' && (
        <ValentineProposalPage key="proposal" onComplete={handleProposalComplete} />
      )}

      {pageState === 'valentine' && (
        <motion.div key="valentine" className="theme-valentine" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <ValentineDedication />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Index;
