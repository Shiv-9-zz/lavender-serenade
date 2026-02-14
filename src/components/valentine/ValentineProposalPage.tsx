import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeartIcon from '@/components/HeartIcon';
import FloatingPetals from '@/components/FloatingPetals';
import Sparkles from '@/components/Sparkles';
import AuroraBackground from '@/components/AuroraBackground';

const warningMessages = [
  "Are you sure? 😢",
  "Think again! 💔",
  "Please don't! 🥺",
  "You're breaking my heart! 😭",
  "Not that button! 😰",
  "Try the other one! 💕",
  "Come on! Say Yes! 🙏",
  "I'll be sad forever! 😿",
  "Really?! No way! 😱",
  "My heart can't take this! 💝",
];

const photos = [
  '/images/photo1.jpeg',
  '/images/photo2.jpeg',
  '/images/photo3.jpeg',
  '/images/photo4.jpeg',
  '/images/photo5.jpeg',
];

interface FallingItem {
  id: number;
  x: number;
  delay: number;
  duration: number;
  type: 'text' | 'photo';
  photoIndex?: number;
  size: number;
  rotation: number;
}

const ValentineProposalPage = ({ onComplete }: { onComplete: () => void }) => {
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [noAttempts, setNoAttempts] = useState(0);
  const [warning, setWarning] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [showHeartPop, setShowHeartPop] = useState(false);
  const [showRain, setShowRain] = useState(false);
  const [fallingItems, setFallingItems] = useState<FallingItem[]>([]);

  const handleNoHover = useCallback(() => {
    const maxX = 250;
    const maxY = 200;
    setNoPos({ x: (Math.random() - 0.5) * maxX * 2, y: (Math.random() - 0.5) * maxY * 2 });
    setNoAttempts(prev => prev + 1);
    setWarning(warningMessages[Math.floor(Math.random() * warningMessages.length)]);
  }, []);

  const handleYes = useCallback(() => {
    setAccepted(true);
    setShowHeartPop(true);
    setTimeout(() => {
      setShowHeartPop(false);
      setShowRain(true);
    }, 2000);
  }, []);

  const handleRainClose = useCallback(() => {
    setShowRain(false);
    setTimeout(onComplete, 500);
  }, [onComplete]);

  useEffect(() => {
    if (!showRain) return;
    const items: FallingItem[] = [];
    for (let i = 0; i < 50; i++) {
      const isPhoto = Math.random() > 0.6;
      items.push({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 4 + Math.random() * 4,
        type: isPhoto ? 'photo' : 'text',
        photoIndex: isPhoto ? Math.floor(Math.random() * photos.length) : undefined,
        size: isPhoto ? 60 + Math.random() * 40 : 16 + Math.random() * 18,
        rotation: Math.random() * 360,
      });
    }
    setFallingItems(items);
  }, [showRain]);

  return (
    <motion.div
      key="proposal"
      className="relative min-h-screen overflow-hidden flex items-center justify-center"
      style={{ background: 'linear-gradient(to bottom, hsl(340, 40%, 6%), hsl(340, 30%, 10%), hsl(340, 40%, 6%))' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <AuroraBackground />
      <FloatingPetals />
      <Sparkles />

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsla(340, 70%, 50%, 0.1) 0%, transparent 70%)' }}
      />

      <div className="max-w-3xl mx-auto text-center relative z-10 px-4">
        {/* Decorative hearts */}
        <div className="flex justify-center gap-3 mb-8">
          {[...Array(5)].map((_, i) => (
            <motion.div key={i}
              animate={{ y: [0, -8, 0], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2.5, delay: i * 0.15, repeat: Infinity }}
            >
              <HeartIcon className="w-4 h-4 text-primary/40" />
            </motion.div>
          ))}
        </div>

        <motion.h1
          className="font-romantic text-5xl md:text-7xl lg:text-8xl text-foreground mb-4 text-glow"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0, scale: [1, 1.02, 1] }}
          transition={{ duration: 0.8, scale: { duration: 3, repeat: Infinity } }}
        >
          Will You Be My
          <br />
          <span className="text-primary" style={{ textShadow: '0 0 40px hsla(340, 70%, 55%, 0.5)' }}>
            Valentine? 💝
          </span>
        </motion.h1>

        <motion.p className="font-elegant text-lg text-muted-foreground mb-16 italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Choose wisely... there's only one right answer 😏
        </motion.p>

        {/* Buttons */}
        {!accepted && (
          <motion.div
            className="flex items-center justify-center gap-8 relative"
            style={{ minHeight: 150 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <motion.button
              className="px-12 py-6 rounded-full font-romantic text-3xl text-primary-foreground shadow-lg relative z-10"
              style={{
                background: 'linear-gradient(135deg, hsl(340, 70%, 50%), hsl(15, 60%, 55%))',
                boxShadow: '0 0 30px hsla(340, 70%, 50%, 0.4)',
              }}
              whileHover={{ scale: 1.15, boxShadow: '0 0 50px hsla(340, 70%, 50%, 0.6)' }}
              whileTap={{ scale: 0.95 }}
              onClick={handleYes}
              animate={noAttempts > 2 ? { scale: [1, 1.08, 1] } : {}}
              transition={noAttempts > 2 ? { duration: 1, repeat: Infinity } : {}}
            >
              Yes! 💕
            </motion.button>

            <motion.button
              className="px-12 py-6 rounded-full font-elegant text-2xl border border-muted-foreground/30 text-muted-foreground relative z-10"
              style={{ background: 'hsla(340, 20%, 15%, 0.5)' }}
              animate={{ x: noPos.x, y: noPos.y }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              onMouseEnter={handleNoHover}
              onTouchStart={handleNoHover}
              whileHover={{ scale: 0.9 }}
            >
              No 😅
            </motion.button>
          </motion.div>
        )}

        {/* Warning */}
        <AnimatePresence mode="wait">
          {warning && !accepted && noAttempts > 0 && (
            <motion.p
              key={warning}
              className="mt-10 font-romantic text-3xl text-primary"
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              style={{ textShadow: '0 0 20px hsla(340, 70%, 55%, 0.4)' }}
            >
              {warning}
            </motion.p>
          )}
        </AnimatePresence>

        {noAttempts > 3 && !accepted && (
          <motion.p className="mt-4 font-elegant text-sm text-muted-foreground/50" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            Failed attempts: {noAttempts} 😂
          </motion.p>
        )}
      </div>

      {/* Heart Pop */}
      <AnimatePresence>
        {showHeartPop && (
          <motion.div className="fixed inset-0 z-[90] flex items-center justify-center pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="text-[200px] md:text-[300px]" initial={{ scale: 0 }} animate={{ scale: [0, 1.5, 1.8, 0], opacity: [1, 1, 1, 0] }} transition={{ duration: 2, times: [0, 0.4, 0.7, 1] }}>
              ❤️
            </motion.div>
            {[...Array(12)].map((_, i) => (
              <motion.div key={i} className="absolute text-3xl" initial={{ scale: 0, x: 0, y: 0 }}
                animate={{ scale: [0, 1.5, 0], x: Math.cos((i / 12) * Math.PI * 2) * 250, y: Math.sin((i / 12) * Math.PI * 2) * 250, opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, delay: 0.5 }}
              >
                {i % 3 === 0 ? '💕' : i % 3 === 1 ? '✨' : '🌹'}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rain */}
      <AnimatePresence>
        {showRain && (
          <motion.div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden cursor-pointer"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}
            onClick={handleRainClose}
          >
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, hsl(340, 50%, 8%), hsl(340, 40%, 12%), hsl(340, 50%, 8%))' }} />
            <motion.div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 40%, hsla(340, 70%, 50%, 0.2) 0%, transparent 60%)' }}
              animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 3, repeat: Infinity }} />

            {fallingItems.map((item) => (
              <motion.div key={item.id} className="absolute select-none pointer-events-none"
                style={{ left: `${item.x}%`, top: -100, fontSize: item.type === 'text' ? item.size : undefined }}
                initial={{ y: -100, opacity: 0, rotate: item.rotation }}
                animate={{ y: '110vh', opacity: [0, 1, 1, 0.8], rotate: item.rotation + 180 }}
                transition={{ duration: item.duration, delay: item.delay, repeat: Infinity, ease: 'linear' }}
              >
                {item.type === 'photo' ? (
                  <img src={photos[item.photoIndex!]} alt="memory" className="rounded-lg shadow-lg object-cover"
                    style={{ width: item.size, height: item.size, boxShadow: '0 0 20px hsla(340, 70%, 50%, 0.4)', border: '2px solid hsla(340, 70%, 60%, 0.3)' }} />
                ) : (
                  <span className="font-romantic font-bold whitespace-nowrap"
                    style={{ color: `hsl(${340 + Math.random() * 20}, ${70 + Math.random() * 20}%, ${55 + Math.random() * 15}%)`, textShadow: '0 0 12px hsla(340, 70%, 50%, 0.4)' }}>
                    I Love You
                  </span>
                )}
              </motion.div>
            ))}

            <motion.div className="relative z-10 text-center px-4" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}>
              <motion.div className="text-7xl md:text-8xl mb-6" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2, repeat: Infinity }}>💖</motion.div>
              <h2 className="font-romantic text-5xl md:text-7xl font-bold" style={{ color: 'hsl(340, 70%, 60%)', textShadow: '0 0 30px hsla(340, 70%, 55%, 0.5)' }}>She Said Yes!</h2>
              <motion.p className="mt-4 font-romantic text-2xl" style={{ color: 'hsla(340, 60%, 70%, 0.8)' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                I Love You Forever & Always 💕
              </motion.p>
              <motion.p className="mt-8 font-elegant text-sm" style={{ color: 'hsla(0, 0%, 100%, 0.3)' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
                tap anywhere to continue
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ValentineProposalPage;
