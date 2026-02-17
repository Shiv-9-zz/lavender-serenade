import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Heart {
  id: number;
  x: number;
  y: number;
  message: string;
}

const loveMessages = [
  "You're my everything 💕",
  "Forever yours 💗",
  "My heart beats for you 💖",
  "You make me smile 🥰",
  "I adore you 💘",
  "You're so special ✨",
  "My sunshine ☀️",
  "Always & forever 💞",
  "You light up my world 🌟",
  "Can't stop loving you 💝",
  "You're perfect 🌹",
  "My favorite person 💫",
  "Dream come true 🦋",
  "Endlessly yours 🌸",
  "You're magical ✨",
];

const InteractiveHearts = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [clickCount, setClickCount] = useState(0);
  const [showSecret, setShowSecret] = useState(false);

  const handleClick = useCallback((e: MouseEvent) => {
    const message = loveMessages[Math.floor(Math.random() * loveMessages.length)];
    const newHeart: Heart = { id: Date.now(), x: e.clientX, y: e.clientY, message };
    setHearts(prev => [...prev, newHeart]);
    
    setClickCount(prev => {
      const next = prev + 1;
      if (next === 10 && !showSecret) {
        setShowSecret(true);
        setTimeout(() => setShowSecret(false), 4000);
      }
      return next;
    });
  }, [showSecret]);

  useEffect(() => {
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [handleClick]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute flex flex-col items-center"
            style={{ left: heart.x, top: heart.y }}
            initial={{ scale: 0, opacity: 1, y: 0 }}
            animate={{ scale: [0, 1.8, 1.2], opacity: [1, 1, 0], y: -140, x: (Math.random() - 0.5) * 120 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            onAnimationComplete={() => { setHearts(prev => prev.filter(h => h.id !== heart.id)); }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" style={{ filter: 'drop-shadow(0 0 8px hsla(340, 65%, 55%, 0.6))' }}>
              <defs>
                <linearGradient id={`hgRose-${heart.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(340, 65%, 60%)" />
                  <stop offset="50%" stopColor="hsl(15, 60%, 65%)" />
                  <stop offset="100%" stopColor="hsl(340, 55%, 55%)" />
                </linearGradient>
              </defs>
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill={`url(#hgRose-${heart.id})`} />
            </svg>
            <motion.span
              className="text-xs font-elegant whitespace-nowrap mt-1 px-2 py-0.5 rounded-full"
              style={{
                color: 'hsl(340, 70%, 75%)',
                background: 'hsla(340, 40%, 10%, 0.7)',
                backdropFilter: 'blur(4px)',
                textShadow: '0 0 10px hsla(340, 70%, 60%, 0.5)',
              }}
              initial={{ opacity: 0, y: 5, scale: 0.8 }}
              animate={{ opacity: [0, 1, 1, 0], y: 0, scale: 1 }}
              transition={{ duration: 1.8, times: [0, 0.15, 0.7, 1] }}
            >
              {heart.message}
            </motion.span>
          </motion.div>
        ))}

        {/* Secret message after 10 clicks */}
        {showSecret && (
          <motion.div
            key="secret-msg"
            className="fixed inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="px-8 py-5 rounded-2xl text-center font-romantic"
              style={{
                background: 'hsla(340, 40%, 10%, 0.85)',
                backdropFilter: 'blur(12px)',
                border: '1px solid hsla(340, 60%, 50%, 0.3)',
                boxShadow: '0 0 60px hsla(340, 70%, 50%, 0.3), inset 0 0 30px hsla(340, 60%, 50%, 0.1)',
              }}
            >
              <motion.p
                className="text-2xl md:text-3xl mb-2"
                style={{ color: 'hsl(340, 70%, 70%)', textShadow: '0 0 20px hsla(340, 70%, 55%, 0.5)' }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                💖 You found a secret! 💖
              </motion.p>
              <p className="text-sm font-elegant" style={{ color: 'hsla(340, 40%, 75%, 0.8)' }}>
                Every click is a beat of my heart for you...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveHearts;
