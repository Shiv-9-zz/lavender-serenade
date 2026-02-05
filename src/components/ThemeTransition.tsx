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
    // Switch to valentine theme during transition
    const timer = setTimeout(() => {
      setTheme('valentine');
    }, 1500);

    // Complete transition
    const completeTimer = setTimeout(onComplete, 4000);

    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [setTheme, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Lavender to Red gradient transition */}
      <motion.div
        className="absolute inset-0"
        initial={{ 
          background: 'linear-gradient(135deg, hsl(270, 50%, 85%) 0%, hsl(280, 40%, 88%) 50%, hsl(340, 50%, 90%) 100%)'
        }}
        animate={{ 
          background: 'linear-gradient(135deg, hsl(340, 60%, 70%) 0%, hsl(350, 70%, 75%) 50%, hsl(0, 65%, 80%) 100%)'
        }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
      />
      
      {/* Animated radial glow */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, hsla(350, 70%, 60%, 0.4) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating hearts - transforming from lavender to red */}
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          initial={{ 
            opacity: 0, 
            scale: 0,
            y: 100,
          }}
          animate={{ 
            opacity: [0, 0.8, 0],
            scale: [0.5, 1 + Math.random(), 0.5],
            y: [-50, -200 - Math.random() * 200],
            x: (Math.random() - 0.5) * 100,
          }}
          transition={{ 
            duration: 3 + Math.random() * 2,
            delay: Math.random() * 2,
            repeat: Infinity,
            ease: "easeOut"
          }}
        >
          <HeartIcon 
            className="w-8 h-8" 
            style={{ 
              color: `hsl(${350 + Math.random() * 20}, 70%, ${60 + Math.random() * 20}%)` 
            }} 
          />
        </motion.div>
      ))}

      {/* Sparkles */}
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: `hsla(${340 + Math.random() * 40}, 80%, 85%, 0.9)`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{ 
            duration: 1.5 + Math.random(),
            delay: Math.random() * 3,
            repeat: Infinity,
          }}
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
          className="text-8xl mb-8"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          💖
        </motion.div>
        
        <motion.h1 
          className="font-romantic text-4xl md:text-6xl mb-4"
          style={{ color: 'white', textShadow: '0 0 40px hsla(350, 70%, 50%, 0.8)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          Unlocking Something Special
        </motion.h1>
        
        <motion.p
          className="font-elegant text-xl md:text-2xl"
          style={{ color: 'hsla(0, 0%, 100%, 0.9)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          Just for you, my Valentine...
        </motion.p>
      </motion.div>

      {/* Bottom wave */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
      >
        <svg viewBox="0 0 1440 120" className="w-full h-full" preserveAspectRatio="none">
          <motion.path
            d="M0,40 C320,100 640,0 960,60 C1280,120 1440,40 1440,40 L1440,120 L0,120 Z"
            fill="hsla(350, 70%, 60%, 0.4)"
            animate={{
              d: [
                "M0,40 C320,100 640,0 960,60 C1280,120 1440,40 1440,40 L1440,120 L0,120 Z",
                "M0,60 C320,0 640,100 960,40 C1280,0 1440,60 1440,60 L1440,120 L0,120 Z",
                "M0,40 C320,100 640,0 960,60 C1280,120 1440,40 1440,40 L1440,120 L0,120 Z",
              ]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default ThemeTransition;
