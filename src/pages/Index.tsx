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

type PageState = 'intro' | 'loading' | 'main' | 'game' | 'transition' | 'video' | 'proposal' | 'valentine';

const pageTransition = {
  initial: { opacity: 0, scale: 1.02, filter: 'blur(8px)' },
  animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
  exit: { opacity: 0, scale: 0.98, filter: 'blur(8px)' },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
};

const Index = () => {
  const { theme } = useTheme();
  const [pageState, setPageState] = useState<PageState>('intro');
  const introVideoRef = useRef<HTMLVideoElement>(null);

  const handleGameTrigger = useCallback(() => { setPageState('game'); }, []);
  const handleGameComplete = useCallback(() => { setPageState('transition'); }, []);
  const handleTransitionComplete = useCallback(() => { setPageState('video'); }, []);
  const handleVideoEnd = useCallback(() => { setPageState('proposal'); }, []);
  const handleProposalComplete = useCallback(() => { setPageState('valentine'); }, []);

  const handleIntroEnd = useCallback(() => { setPageState('loading'); }, []);

  useEffect(() => {
    if (pageState === 'loading') {
      const timer = setTimeout(() => setPageState('main'), 3500);
      return () => clearTimeout(timer);
    }
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
            autoPlay
            playsInline
            onEnded={handleIntroEnd}
            className="w-full h-full object-contain"
            onClick={() => setPageState('loading')}
          />
          <button
            onClick={() => setPageState('loading')}
            className="absolute bottom-8 right-8 text-white/60 hover:text-white text-sm font-elegant transition-colors"
          >
            Skip →
          </button>
        </motion.div>
      )}

      {pageState === 'loading' && (
        <motion.div
          key="loading"
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
          style={{ background: 'linear-gradient(135deg, hsl(340, 40%, 6%), hsl(340, 30%, 10%), hsl(330, 35%, 8%))' }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: 'blur(12px)' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as const }}
        >
          {/* Ambient glow - layered */}
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, hsla(340, 70%, 50%, 0.18) 0%, transparent 70%)' }}
            animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.div
            className="absolute w-[300px] h-[300px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, hsla(350, 80%, 60%, 0.12) 0%, transparent 60%)' }}
            animate={{ scale: [1.2, 0.9, 1.2], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
          />

          {/* Pulsing heart with glow ring */}
          <div className="relative mb-10">
            <motion.div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, hsla(340, 80%, 55%, 0.3) 0%, transparent 60%)', width: 160, height: 160, top: -30, left: -30 }}
              animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="text-8xl md:text-9xl relative z-10"
              animate={{ scale: [0.75, 1.15, 0.75] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ filter: 'drop-shadow(0 0 25px hsla(340, 80%, 55%, 0.5))' }}
            >
              💖
            </motion.div>
          </div>

          {/* Title with staggered letters effect */}
          <motion.h1
            className="font-romantic text-4xl md:text-6xl text-center mb-3"
            style={{ color: 'hsl(340, 70%, 65%)', textShadow: '0 0 40px hsla(340, 70%, 55%, 0.6), 0 0 80px hsla(340, 70%, 55%, 0.2)' }}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
          >
            Made with Love
          </motion.h1>

          <motion.p
            className="font-elegant text-lg md:text-xl text-center italic mb-2"
            style={{ color: 'hsla(340, 40%, 70%, 0.7)' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            just for you...
          </motion.p>

          {/* Heartbeat line */}
          <motion.div
            className="w-40 h-px mt-6 mb-8"
            style={{ background: 'linear-gradient(90deg, transparent, hsl(340, 70%, 55%), transparent)' }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: [0, 0.6, 0.3] }}
            transition={{ delay: 1, duration: 1.2, opacity: { duration: 2, repeat: Infinity } }}
          />

          {/* Loading dots */}
          <div className="flex gap-3 mt-2">
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: 'hsl(340, 70%, 60%)', boxShadow: '0 0 8px hsla(340, 70%, 55%, 0.5)' }}
                animate={{ opacity: [0.3, 1, 0.3], scale: [0.7, 1.3, 0.7] }}
                transition={{ duration: 1, delay: i * 0.25, repeat: Infinity }}
              />
            ))}
          </div>

          {/* Floating emoji - more variety and spread */}
          {[...Array(14)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute pointer-events-none select-none"
              style={{
                left: `${8 + Math.random() * 84}%`,
                top: `${5 + Math.random() * 90}%`,
                fontSize: `${16 + Math.random() * 16}px`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.5, 0],
                scale: [0.4, 1.1, 0.4],
                y: [0, -50 - Math.random() * 60, -100 - Math.random() * 40],
                x: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 40],
                rotate: [0, (Math.random() - 0.5) * 40],
              }}
              transition={{ duration: 3 + Math.random() * 3, delay: Math.random() * 3, repeat: Infinity }}
            >
              {['💕', '💗', '✨', '🌹', '💖', '💘', '🌸', '❤️', '💝', '🥀', '💫', '🦋', '🌺', '💐'][i]}
            </motion.div>
          ))}
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
