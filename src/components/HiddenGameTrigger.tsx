import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeartIcon from './HeartIcon';

interface HiddenGameTriggerProps {
  onTrigger: () => void;
}

const HiddenGameTrigger = ({ onTrigger }: HiddenGameTriggerProps) => {
  const [clickCount, setClickCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const requiredClicks = 5;

  const handleClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    
    if (newCount === 3) {
      setShowHint(true);
      setTimeout(() => setShowHint(false), 2000);
    }
    
    if (newCount >= requiredClicks) {
      onTrigger();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {/* Hint tooltip */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-primary/90 text-primary-foreground rounded-lg text-sm font-elegant whitespace-nowrap"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
          >
            Keep clicking... ✨
            <div className="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-primary/90" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Secret trigger button */}
      <motion.button
        onClick={handleClick}
        className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center hover:bg-white/40 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={clickCount > 0 ? { 
          rotate: [0, -10, 10, 0],
          scale: [1, 1.1, 1]
        } : {}}
      >
        <motion.div
          animate={clickCount >= 3 ? {
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0]
          } : {}}
          transition={{ duration: 0.5, repeat: clickCount >= 3 ? Infinity : 0 }}
        >
          <HeartIcon className="w-5 h-5 text-primary" />
        </motion.div>
      </motion.button>

      {/* Progress indicator (subtle) */}
      {clickCount > 0 && clickCount < requiredClicks && (
        <motion.div
          className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent flex items-center justify-center text-[10px] font-bold text-accent-foreground"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          {clickCount}
        </motion.div>
      )}
    </div>
  );
};

export default HiddenGameTrigger;
