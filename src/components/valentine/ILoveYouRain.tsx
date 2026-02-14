import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RainDrop {
  id: number;
  x: number;
  delay: number;
  duration: number;
  type: 'text' | 'rose';
  size: number;
  rotation: number;
}

const ILoveYouRain = ({ onClose }: { onClose?: () => void }) => {
  const [drops, setDrops] = useState<RainDrop[]>([]);

  useEffect(() => {
    const initial: RainDrop[] = [];
    for (let i = 0; i < 60; i++) {
      initial.push({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 4,
        duration: 3 + Math.random() * 4,
        type: Math.random() > 0.4 ? 'text' : 'rose',
        size: 14 + Math.random() * 20,
        rotation: Math.random() * 360,
      });
    }
    setDrops(initial);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden cursor-pointer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      onClick={onClose}
    >
      {/* Deep dark background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a15] via-[#2d0f1f] to-[#1a0a15]" />

      {/* Glow overlay */}
      <motion.div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(circle at 50% 40%, rgba(200,50,80,0.2) 0%, transparent 60%)' }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Raining elements */}
      {drops.map((drop) => (
        <motion.div
          key={drop.id}
          className="absolute select-none pointer-events-none"
          style={{ left: `${drop.x}%`, top: -60, fontSize: drop.size }}
          initial={{ y: -80, opacity: 0, rotate: drop.rotation }}
          animate={{ y: '110vh', opacity: [0, 1, 1, 0.8], rotate: drop.rotation + (Math.random() > 0.5 ? 180 : -180) }}
          transition={{ duration: drop.duration, delay: drop.delay, repeat: Infinity, ease: 'linear' }}
        >
          {drop.type === 'rose' ? (
            <span>🌹</span>
          ) : (
            <span
              className="font-romantic font-bold whitespace-nowrap"
              style={{
                color: `hsl(${340 + Math.random() * 20}, ${70 + Math.random() * 20}%, ${55 + Math.random() * 15}%)`,
                textShadow: '0 0 12px rgba(200,50,80,0.4)',
              }}
            >
              I Love You
            </span>
          )}
        </motion.div>
      ))}

      {/* Center message */}
      <motion.div
        className="relative z-10 text-center px-4"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
      >
        <motion.div
          className="text-7xl md:text-8xl mb-6"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ❤️
        </motion.div>
        <h1
          className="font-romantic text-5xl md:text-7xl font-bold"
          style={{ color: '#e8506a', textShadow: '0 0 30px rgba(232,80,106,0.5)' }}
        >
          I Love You
        </h1>
        <motion.p
          className="mt-4 font-elegant text-lg text-white/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          Forever & Always 💕
        </motion.p>
        <motion.p
          className="mt-8 font-elegant text-sm text-white/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          tap anywhere to close
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default ILoveYouRain;
