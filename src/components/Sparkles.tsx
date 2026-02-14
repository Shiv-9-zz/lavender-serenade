import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

const colors = [
  'hsl(38, 65%, 65%)',
  'hsl(38, 55%, 75%)',
  'hsl(190, 35%, 60%)',
  'hsl(340, 40%, 60%)',
];

const Sparkles = () => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newSparkle: Sparkle = {
        id: Date.now(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 4 + Math.random() * 6,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
      
      setSparkles(prev => [...prev.slice(-6), newSparkle]);
    }, 700);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <AnimatePresence>
        {sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={{ opacity: [0, 0.8, 0], scale: [0, 1, 0], rotate: 180 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            className="absolute"
            style={{ left: `${sparkle.x}%`, top: `${sparkle.y}%` }}
          >
            <svg width={sparkle.size} height={sparkle.size} viewBox="0 0 24 24" fill={sparkle.color}>
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Sparkles;
