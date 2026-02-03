import { motion } from 'framer-motion';
import HeartIcon from '@/components/HeartIcon';

interface RomanticTransitionProps {
  onComplete: () => void;
}

const RomanticTransition = ({ onComplete }: RomanticTransitionProps) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onAnimationComplete={() => {
        setTimeout(onComplete, 3500);
      }}
    >
      {/* Background layers */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-primary/40 via-accent/30 to-secondary/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      
      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.3) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating hearts */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-primary/50"
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
          <HeartIcon className="w-8 h-8" />
        </motion.div>
      ))}

      {/* Sparkles */}
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute w-2 h-2 rounded-full bg-white/80"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
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
          className="font-romantic text-4xl md:text-6xl text-primary text-glow mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          For You, My Love
        </motion.h1>
        
        <motion.p
          className="font-elegant text-xl md:text-2xl text-foreground/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          A special surprise awaits...
        </motion.p>
      </motion.div>

      {/* Bottom wave decoration */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
      >
        <svg viewBox="0 0 1440 120" className="w-full h-full" preserveAspectRatio="none">
          <motion.path
            d="M0,40 C320,100 640,0 960,60 C1280,120 1440,40 1440,40 L1440,120 L0,120 Z"
            fill="hsl(var(--primary) / 0.3)"
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

export default RomanticTransition;
