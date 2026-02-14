import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Heart {
  id: number;
  x: number;
  y: number;
}

const InteractiveHearts = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  const handleClick = (e: MouseEvent) => {
    const newHeart: Heart = { id: Date.now(), x: e.clientX, y: e.clientY };
    setHearts(prev => [...prev, newHeart]);
  };

  useEffect(() => {
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute"
            style={{ left: heart.x, top: heart.y }}
            initial={{ scale: 0, opacity: 1, y: 0 }}
            animate={{ scale: [0, 1.8, 1.2], opacity: [1, 1, 0], y: -120, x: (Math.random() - 0.5) * 120 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            onAnimationComplete={() => { setHearts(prev => prev.filter(h => h.id !== heart.id)); }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" className="drop-shadow-lg" style={{ filter: 'drop-shadow(0 0 8px hsla(340, 65%, 55%, 0.6))' }}>
              <defs>
                <linearGradient id="hgRose" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(340, 65%, 60%)" />
                  <stop offset="50%" stopColor="hsl(15, 60%, 65%)" />
                  <stop offset="100%" stopColor="hsl(340, 55%, 55%)" />
                </linearGradient>
              </defs>
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="url(#hgRose)" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveHearts;
