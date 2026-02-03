import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import CatchHeartsGame from '@/components/game/CatchHeartsGame';
import RomanticTransition from '@/components/game/RomanticTransition';
import ValentineDedication from '@/components/valentine/ValentineDedication';

type GameState = 'game' | 'transition' | 'dedication';

const Index = () => {
  const [gameState, setGameState] = useState<GameState>('game');

  const handleGameComplete = () => {
    setGameState('transition');
  };

  const handleTransitionComplete = () => {
    setGameState('dedication');
  };

  return (
    <AnimatePresence mode="wait">
      {gameState === 'game' && (
        <CatchHeartsGame 
          key="game"
          onGameComplete={handleGameComplete} 
        />
      )}
      
      {gameState === 'transition' && (
        <RomanticTransition 
          key="transition"
          onComplete={handleTransitionComplete} 
        />
      )}
      
      {gameState === 'dedication' && (
        <ValentineDedication key="dedication" />
      )}
    </AnimatePresence>
  );
};

export default Index;
