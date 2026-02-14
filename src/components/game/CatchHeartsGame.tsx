import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import HeartIcon from '@/components/HeartIcon';

interface FallingHeart {
  id: number;
  x: number;
  speed: number;
  y: number;
  size: number;
}

interface CatchHeartsGameProps {
  onGameComplete: () => void;
}

const CatchHeartsGame = ({ onGameComplete }: CatchHeartsGameProps) => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(18);
  const [hearts, setHearts] = useState<FallingHeart[]>([]);
  const [basketX, setBasketX] = useState(50);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [encouragement, setEncouragement] = useState('');
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const heartIdRef = useRef(0);
  const targetScore = 10;

  const encouragements = ["You're doing great! 💕", "Keep catching! 💖", "Amazing! 💗", "So close! 💝", "Beautiful catch! 💘"];

  const handleMove = useCallback((clientX: number) => {
    if (!gameAreaRef.current) return;
    const rect = gameAreaRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setBasketX(Math.max(10, Math.min(90, x)));
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => { handleMove(e.clientX); }, [handleMove]);
  const handleTouchMove = useCallback((e: React.TouchEvent) => { e.preventDefault(); handleMove(e.touches[0].clientX); }, [handleMove]);

  useEffect(() => {
    if (!gameStarted || gameWon) return;
    const spawnInterval = setInterval(() => {
      const newHeart: FallingHeart = { id: heartIdRef.current++, x: Math.random() * 80 + 10, speed: 2 + Math.random() * 2, y: -10, size: 30 + Math.random() * 20 };
      setHearts(prev => [...prev, newHeart]);
    }, 600);
    return () => clearInterval(spawnInterval);
  }, [gameStarted, gameWon]);

  const basketXRef = useRef(basketX);
  basketXRef.current = basketX;

  useEffect(() => {
    if (!gameStarted || gameWon) return;
    let animId: number;
    let lastTime = performance.now();
    const tick = (now: number) => {
      const delta = (now - lastTime) / 16;
      lastTime = now;
      setHearts(prev => {
        const updated: FallingHeart[] = [];
        prev.forEach(heart => {
          const newY = heart.y + heart.speed * delta;
          if (newY >= 75 && newY <= 90) {
            const distance = Math.abs(heart.x - basketXRef.current);
            if (distance < 15) {
              setScore(s => {
                const newScore = s + 1;
                if (newScore % 3 === 0) {
                  setEncouragement(encouragements[Math.floor(Math.random() * encouragements.length)]);
                  setTimeout(() => setEncouragement(''), 1500);
                }
                return newScore;
              });
              return;
            }
          }
          if (newY > 110) return;
          updated.push({ ...heart, y: newY });
        });
        return updated;
      });
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [gameStarted, gameWon]);

  useEffect(() => {
    if (!gameStarted || gameWon) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { if (score >= targetScore) setGameWon(true); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [gameStarted, gameWon, score]);

  useEffect(() => { if (score >= targetScore && !gameWon) setGameWon(true); }, [score, gameWon]);
  useEffect(() => { if (gameWon) { const timer = setTimeout(() => onGameComplete(), 3000); return () => clearTimeout(timer); } }, [gameWon, onGameComplete]);

  if (!gameStarted) {
    return (
      <motion.div className="min-h-screen flex flex-col items-center justify-center p-4" style={{ background: 'linear-gradient(180deg, hsl(230, 35%, 6%) 0%, hsl(230, 30%, 10%) 50%, hsl(230, 25%, 8%) 100%)' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <motion.div className="glass-card p-8 md:p-12 text-center max-w-md mx-auto" initial={{ scale: 0.8, y: 50 }} animate={{ scale: 1, y: 0 }} transition={{ type: "spring", damping: 15 }}>
          <motion.div className="text-6xl md:text-7xl mb-6" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>💝</motion.div>
          <h1 className="font-romantic text-3xl md:text-4xl text-primary mb-4">Catch the Hearts</h1>
          <p className="text-foreground/60 font-elegant text-lg mb-6">Catch {targetScore} hearts to unlock something special...</p>
          <motion.button onClick={() => setGameStarted(true)} className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-romantic text-xl shadow-lg hover:shadow-xl transition-all" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            Start Game 💕
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  if (gameWon) {
    return (
      <motion.div className="min-h-screen flex flex-col items-center justify-center p-4" style={{ background: 'linear-gradient(180deg, hsl(230, 35%, 6%) 0%, hsl(230, 30%, 10%) 50%, hsl(230, 25%, 8%) 100%)' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <motion.div className="glass-card p-8 md:p-12 text-center max-w-md mx-auto" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", damping: 12 }}>
          <motion.div className="text-7xl mb-6" animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }} transition={{ duration: 1, repeat: Infinity }}>🎉</motion.div>
          <h1 className="font-romantic text-3xl md:text-4xl text-primary mb-4">Level Complete!</h1>
          <p className="text-foreground/70 font-elegant text-xl mb-2">You caught {score} hearts!</p>
          <motion.p className="text-accent font-romantic text-2xl" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>Something special is waiting for you…</motion.p>
        </motion.div>
        {[...Array(15)].map((_, i) => (
          <motion.div key={i} className="absolute text-primary/40 pointer-events-none" initial={{ x: '50%', y: '50%', scale: 0 }} animate={{ x: `${Math.random() * 100}%`, y: `${Math.random() * 100}%`, scale: [0, 1.5, 0], rotate: Math.random() * 360 }} transition={{ duration: 2 + Math.random(), delay: Math.random() * 0.5, repeat: Infinity, repeatDelay: Math.random() }}>
            <HeartIcon className="w-6 h-6" />
          </motion.div>
        ))}
      </motion.div>
    );
  }

  return (
    <div ref={gameAreaRef} className="min-h-screen relative overflow-hidden select-none" style={{ touchAction: 'none', background: 'linear-gradient(180deg, hsl(230, 35%, 6%) 0%, hsl(230, 30%, 10%) 50%, hsl(230, 25%, 8%) 100%)' }} onMouseMove={handleMouseMove} onTouchMove={handleTouchMove}>
      {/* Stars background */}
      {[...Array(20)].map((_, i) => (
        <div key={`star-${i}`} className="absolute rounded-full animate-twinkle" style={{
          left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
          width: `${1 + Math.random() * 2}px`, height: `${1 + Math.random() * 2}px`,
          backgroundColor: `hsla(38, 60%, 70%, ${0.2 + Math.random() * 0.4})`,
          animationDelay: `${Math.random() * 5}s`,
        }} />
      ))}

      {/* HUD */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20">
        <motion.div className="glass-card px-4 py-2 flex items-center gap-2" animate={{ scale: score > 0 ? [1, 1.1, 1] : 1 }} transition={{ duration: 0.3 }}>
          <HeartIcon className="w-5 h-5 text-primary" />
          <span className="font-romantic text-xl text-foreground">{score}/{targetScore}</span>
        </motion.div>
        <motion.div className="glass-card px-4 py-2" animate={{ scale: timeLeft <= 5 ? [1, 1.1, 1] : 1 }} transition={{ duration: 0.5, repeat: timeLeft <= 5 ? Infinity : 0 }}>
          <span className="font-romantic text-xl text-foreground">{timeLeft}s</span>
        </motion.div>
      </div>

      {encouragement && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20 animate-fade-in">
          <span className="font-romantic text-2xl text-primary text-glow">{encouragement}</span>
        </div>
      )}

      {hearts.map(heart => (
        <div key={heart.id} className="absolute text-primary pointer-events-none" style={{ left: `${heart.x}%`, top: `${heart.y}%`, transform: 'translate(-50%, -50%)', willChange: 'top' }}>
          <HeartIcon className="drop-shadow-lg" style={{ width: heart.size, height: heart.size }} />
        </div>
      ))}

      {/* Basket */}
      <div className="absolute bottom-[10%] z-10" style={{ left: `${basketX}%`, transform: 'translateX(-50%)' }}>
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-150" />
          <div className="relative w-20 h-14 md:w-24 md:h-16">
            <svg viewBox="0 0 100 70" className="w-full h-full">
              <defs>
                <linearGradient id="basketGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="100%" stopColor="hsl(var(--accent))" />
                </linearGradient>
              </defs>
              <path d="M10 20 Q10 60 50 65 Q90 60 90 20 L80 20 Q80 50 50 55 Q20 50 20 20 Z" fill="url(#basketGrad)" stroke="hsl(var(--primary))" strokeWidth="2" />
              <ellipse cx="50" cy="20" rx="40" ry="10" fill="url(#basketGrad)" stroke="hsl(var(--primary))" strokeWidth="2" />
              <path d="M30 20 Q50 -15 70 20" fill="none" stroke="hsl(var(--primary))" strokeWidth="4" strokeLinecap="round" />
            </svg>
            <motion.div className="absolute -top-2 -right-2 bg-accent text-accent-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.3 }} key={score}>
              {score}
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center" initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 0.5 }}>
        <p className="text-sm text-muted-foreground font-elegant">Move your finger or mouse to catch hearts! 💕</p>
      </motion.div>
    </div>
  );
};

export default CatchHeartsGame;
