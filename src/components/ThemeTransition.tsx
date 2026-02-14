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
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Dark to crimson gradient transition */}
      <motion.div
        className="absolute inset-0"
        initial={{ background: 'linear-gradient(135deg, hsl(230, 35%, 8%) 0%, hsl(230, 30%, 12%) 50%, hsl(230, 25%, 15%) 100%)' }}
        animate={{ background: 'linear-gradient(135deg, hsl(350, 40%, 8%) 0%, hsl(350, 45%, 12%) 50%, hsl(340, 35%, 15%) 100%)' }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
      />
      
      {/* Radial glow */}
      <motion.div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(circle at 50% 50%, hsla(350, 70%, 50%, 0.2) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating hearts */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          initial={{ opacity: 0, scale: 0, y: 100 }}
          animate={{ opacity: [0, 0.6, 0], scale: [0.5, 1 + Math.random(), 0.5], y: [-50, -200 - Math.random() * 200], x: (Math.random() - 0.5) * 100 }}
          transition={{ duration: 3 + Math.random() * 2, delay: Math.random() * 2, repeat: Infinity, ease: "easeOut" }}
        >
          <HeartIcon className="w-6 h-6" style={{ color: `hsl(${350 + Math.random() * 20}, 70%, ${50 + Math.random() * 20}%)` }} />
        </motion.div>
      ))}

      {/* Sparkle dots */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`s-${i}`}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: `hsla(${38 + Math.random() * 20}, 65%, 65%, 0.8)`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
          transition={{ duration: 1.5 + Math.random(), delay: Math.random() * 3, repeat: Infinity }}
        />
      ))}

      {/* Center content */}
      <motion.div
        className="relative z-10 text-center px-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <motion.div
          className="text-7xl mb-8"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          💖
        </motion.div>
        
        <motion.h1 
          className="font-romantic text-4xl md:text-6xl mb-4 text-foreground"
          style={{ textShadow: '0 0 40px hsla(350, 70%, 50%, 0.6)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          Unlocking Something Special
        </motion.h1>
        
        <motion.p
          className="font-elegant text-xl md:text-2xl text-foreground/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          Just for you, my Valentine...
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default ThemeTransition;
