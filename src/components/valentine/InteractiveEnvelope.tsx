import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface InteractiveEnvelopeProps {
  letterContent: string;
  onLetterOpened?: () => void;
}

const InteractiveEnvelope = ({ letterContent, onLetterOpened }: InteractiveEnvelopeProps) => {
  const [traceProgress, setTraceProgress] = useState(0);
  const [isOpened, setIsOpened] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  const envelopePath = "M50,20 L150,20 L200,80 L200,150 L0,150 L0,80 Z";
  const targetProgress = 85; // Need to trace 85% to open

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isOpened) return;
    
    const svg = svgRef.current;
    const path = pathRef.current;
    if (!svg || !path) return;

    const rect = svg.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 200;
    const y = ((e.clientY - rect.top) / rect.height) * 170;

    // Check if point is near the path
    const point = svg.createSVGPoint();
    point.x = x;
    point.y = y;

    // Simple distance check from envelope outline
    const isNearPath = isPointNearEnvelopePath(x, y);
    
    if (isNearPath && lastPointRef.current) {
      const dx = x - lastPointRef.current.x;
      const dy = y - lastPointRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance > 5) {
        setTraceProgress(prev => {
          const newProgress = Math.min(prev + distance * 0.5, 100);
          return newProgress;
        });
        lastPointRef.current = { x, y };
      }
    } else if (isNearPath) {
      lastPointRef.current = { x, y };
    }
  };

  const isPointNearEnvelopePath = (x: number, y: number): boolean => {
    const threshold = 20;
    
    // Top edge
    if (y >= 15 && y <= 25 && x >= 45 && x <= 155) return true;
    // Left diagonal
    if (x >= 0 && x <= 55 && y >= 15 && y <= 85) {
      const expectedY = 20 + (x / 50) * 60;
      if (Math.abs(y - expectedY) < threshold) return true;
    }
    // Right diagonal
    if (x >= 145 && x <= 205 && y >= 15 && y <= 85) {
      const expectedY = 20 + ((200 - x) / 50) * 60;
      if (Math.abs(y - expectedY) < threshold) return true;
    }
    // Left edge
    if (x >= -5 && x <= 10 && y >= 75 && y <= 155) return true;
    // Right edge
    if (x >= 190 && x <= 205 && y >= 75 && y <= 155) return true;
    // Bottom edge
    if (y >= 145 && y <= 160 && x >= -5 && x <= 205) return true;
    
    return false;
  };

  useEffect(() => {
    if (traceProgress >= targetProgress && !isOpened) {
      setIsOpened(true);
      setTimeout(() => setShowLetter(true), 800);
      onLetterOpened?.();
    }
  }, [traceProgress, isOpened, onLetterOpened]);

  // Typewriter effect for letter
  useEffect(() => {
    if (!showLetter) return;
    
    let index = 0;
    const interval = setInterval(() => {
      if (index <= letterContent.length) {
        setDisplayedText(letterContent.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [showLetter, letterContent]);

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <AnimatePresence mode="wait">
        {!showLetter ? (
          <motion.div
            key="envelope"
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            {/* Instructions */}
            <motion.p
              className="text-center font-romantic text-lg md:text-xl text-primary mb-4"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {isOpened ? "Opening..." : "Trace around the envelope to open 💌"}
            </motion.p>

            {/* Progress bar */}
            <div className="w-full h-2 bg-muted rounded-full mb-6 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary via-accent to-primary rounded-full"
                style={{ width: `${traceProgress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            {/* Envelope SVG */}
            <motion.div
              className="relative mx-auto"
              style={{ maxWidth: '300px' }}
              animate={isOpened ? { rotateX: -180, y: -50, opacity: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <svg
                ref={svgRef}
                viewBox="0 0 200 170"
                className="w-full cursor-crosshair touch-none"
                onPointerMove={handlePointerMove}
                onPointerDown={(e) => {
                  lastPointRef.current = null;
                  handlePointerMove(e);
                }}
              >
                <defs>
                  <linearGradient id="envelopeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(var(--primary) / 0.3)" />
                    <stop offset="50%" stopColor="hsl(var(--accent) / 0.3)" />
                    <stop offset="100%" stopColor="hsl(var(--secondary) / 0.3)" />
                  </linearGradient>
                  <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="hsl(var(--primary))" floodOpacity="0.3" />
                  </filter>
                </defs>

                {/* Envelope body */}
                <rect
                  x="10"
                  y="50"
                  width="180"
                  height="110"
                  rx="5"
                  fill="url(#envelopeGradient)"
                  stroke="hsl(var(--primary))"
                  strokeWidth="2"
                  filter="url(#shadow)"
                />

                {/* Envelope flap (triangle) */}
                <motion.path
                  d="M10,50 L100,110 L190,50 L100,10 Z"
                  fill="hsl(var(--primary) / 0.4)"
                  stroke="hsl(var(--primary))"
                  strokeWidth="2"
                  animate={isOpened ? { d: "M10,50 L100,10 L190,50 L100,50 Z" } : {}}
                  transition={{ duration: 0.5 }}
                />

                {/* Heart seal */}
                <motion.g
                  animate={isOpened ? { scale: 0, opacity: 0 } : { scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: isOpened ? 0 : Infinity }}
                  style={{ transformOrigin: '100px 70px' }}
                >
                  <circle cx="100" cy="70" r="15" fill="hsl(var(--accent))" />
                  <text x="100" y="76" textAnchor="middle" fontSize="16" fill="white">♥</text>
                </motion.g>

                {/* Trace path (invisible, for interaction) */}
                <path
                  ref={pathRef}
                  d={envelopePath}
                  fill="none"
                  stroke="transparent"
                  strokeWidth="30"
                />

                {/* Progress indicator on path */}
                <motion.path
                  d="M10,160 L10,50 L100,110 L190,50 L190,160 L10,160"
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="3"
                  strokeDasharray="600"
                  strokeDashoffset={600 - (traceProgress / 100) * 600}
                  strokeLinecap="round"
                />
              </svg>

              {/* Sparkle effects */}
              {traceProgress > 0 && (
                <>
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-primary rounded-full"
                      style={{
                        left: `${20 + Math.random() * 60}%`,
                        top: `${20 + Math.random() * 60}%`,
                      }}
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 1,
                        delay: i * 0.2,
                        repeat: Infinity,
                      }}
                    />
                  ))}
                </>
              )}
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="letter"
            className="space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Letter */}
            <motion.div
              className="glass-card p-6 md:p-10"
              initial={{ opacity: 0, y: 50, rotateX: 90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
            >
              <div className="flex justify-center mb-6">
                <motion.span
                  className="text-4xl"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  💕
                </motion.span>
              </div>

              <div className="font-elegant text-lg md:text-xl leading-relaxed text-foreground/90 whitespace-pre-line">
                {displayedText}
                <motion.span
                  className="inline-block w-0.5 h-5 bg-primary ml-1"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                />
              </div>

              {displayedText.length === letterContent.length && (
                <motion.div
                  className="mt-8 text-right"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="font-romantic text-2xl text-primary">
                    With all my love,
                  </p>
                  <p className="font-romantic text-3xl text-primary mt-2">
                    Forever Yours 💖
                  </p>
                </motion.div>
              )}
            </motion.div>

            {/* Video - appears after letter finishes typing */}
            {displayedText.length === letterContent.length && (
              <motion.div
                className="glass-card p-4 overflow-hidden rounded-2xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <video
                  src="/videos/valentine-video.mp4"
                  autoPlay
                  loop
                  playsInline
                  controls
                  className="w-full rounded-xl"
                />
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveEnvelope;
