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

const pageTransition = {
  initial: { opacity: 0, scale: 1.02, filter: 'blur(8px)' },
  animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
  exit: { opacity: 0, scale: 0.98, filter: 'blur(8px)' },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
};

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
          {...pageTransition}
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
