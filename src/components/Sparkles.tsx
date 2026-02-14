import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  type: 'star' | 'ring' | 'dot';
}

const colors = [
  'hsl(15, 60%, 70%)',
  'hsl(340, 55%, 65%)',
  'hsl(280, 35%, 65%)',
  'hsl(30, 50%, 80%)',
  'hsl(350, 60%, 70%)',
];

const Sparkles = () => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const types: Sparkle['type'][] = ['star', 'ring', 'dot'];
      const newSparkle: Sparkle = {
        id: Date.now() + Math.random(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 5 + Math.random() * 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: types[Math.floor(Math.random() * types.length)],
      };
      setSparkles(prev => [...prev.slice(-10), newSparkle]);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <AnimatePresence>
        {sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={{ opacity: [0, 0.9, 0], scale: [0, 1.2, 0], rotate: sparkle.type === 'star' ? 180 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute"
            style={{ left: `${sparkle.x}%`, top: `${sparkle.y}%` }}
          >
            {sparkle.type === 'star' && (
              <svg width={sparkle.size} height={sparkle.size} viewBox="0 0 24 24" fill={sparkle.color}>
                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
              </svg>
            )}
            {sparkle.type === 'ring' && (
              <div
                style={{
                  width: sparkle.size,
                  height: sparkle.size,
                  borderRadius: '50%',
                  border: `1.5px solid ${sparkle.color}`,
                  boxShadow: `0 0 ${sparkle.size}px ${sparkle.color}`,
                }}
              />
            )}
            {sparkle.type === 'dot' && (
              <div
                style={{
                  width: sparkle.size * 0.5,
                  height: sparkle.size * 0.5,
                  borderRadius: '50%',
                  backgroundColor: sparkle.color,
                  boxShadow: `0 0 ${sparkle.size * 2}px ${sparkle.color}`,
                }}
              />
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Sparkles;
