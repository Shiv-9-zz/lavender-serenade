import { motion } from 'framer-motion';
import { useEffect } from 'react';
import HeartIcon from './HeartIcon';
import { useTheme } from '@/contexts/ThemeContext';

interface ThemeTransitionProps {
  onComplete: () => void;
}

const ThemeTransition = ({ onComplete }: ThemeTransitionProps) => {
  const { setTheme } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => { setTheme('valentine'); }, 1500);
    const completeTimer = setTimeout(onComplete, 4000);
    return () => { clearTimeout(timer); clearTimeout(completeTimer); };
  }, [setTheme, onComplete]);

  return (
    <motion.div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      {/* Transition gradient */}
      <motion.div className="absolute inset-0"
        initial={{ background: 'linear-gradient(135deg, hsl(330, 40%, 5%) 0%, hsl(340, 30%, 8%) 50%, hsl(320, 25%, 6%) 100%)' }}
        animate={{ background: 'linear-gradient(135deg, hsl(350, 45%, 5%) 0%, hsl(350, 40%, 10%) 50%, hsl(340, 30%, 8%) 100%)' }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
      />
      
      {/* Radial pulse */}
      <motion.div className="absolute inset-0"
        style={{ background: 'radial-gradient(circle at 50% 50%, hsla(350, 70%, 50%, 0.15) 0%, transparent 60%)' }}
        animate={{ scale: [1, 1.8, 1], opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Floating hearts */}
      {[...Array(20)].map((_, i) => (
        <motion.div key={i} className="absolute"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          initial={{ opacity: 0, scale: 0, y: 100 }}
          animate={{ opacity: [0, 0.7, 0], scale: [0.5, 1.2, 0.5], y: [-50, -250], x: (Math.random() - 0.5) * 120 }}
          transition={{ duration: 3 + Math.random() * 2, delay: Math.random() * 2, repeat: Infinity }}
        >
          <HeartIcon className="w-6 h-6" style={{ color: `hsl(${345 + Math.random() * 25}, 70%, ${50 + Math.random() * 20}%)`, filter: `drop-shadow(0 0 8px hsla(350, 70%, 55%, 0.4))` }} />
        </motion.div>
      ))}

      {/* Center content */}
      <motion.div className="relative z-10 text-center px-4"
        initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 0.8 }}
      >
        <motion.div className="text-8xl mb-8" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
          💖
        </motion.div>
        <motion.h1 className="font-romantic text-5xl md:text-7xl mb-4 text-foreground"
          style={{ textShadow: '0 0 50px hsla(350, 70%, 50%, 0.6)' }}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
        >
          Unlocking Something Special
        </motion.h1>
        <motion.p className="font-elegant text-xl md:text-2xl text-foreground/60"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        >
          Just for you, my Valentine...
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default ThemeTransition;
