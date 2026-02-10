import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Music, Volume2, VolumeX } from 'lucide-react';

const FloatingMusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      setProgress(0);
    });

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <>
      <audio ref={audioRef} src="/audio/background-music.mp3" loop />
      
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <motion.div
          className="relative"
          onHoverStart={() => setIsExpanded(true)}
          onHoverEnd={() => setIsExpanded(false)}
        >
          {/* Glowing background effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-primary/30 blur-xl"
            animate={{
              scale: isPlaying ? [1, 1.2, 1] : 1,
              opacity: isPlaying ? [0.3, 0.6, 0.3] : 0.3,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Main player container */}
          <motion.div
            className="relative glass-card border border-primary/20 overflow-hidden"
            animate={{
              borderRadius: isExpanded ? 24 : 50,
              width: isExpanded ? 200 : 56,
              height: 56,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Progress bar */}
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary via-accent to-primary"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />

            <div className="flex items-center h-full px-3 gap-3">
              {/* Play/Pause button */}
              <motion.button
                onClick={togglePlay}
                className="relative w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/30 transition-colors"
                whileTap={{ scale: 0.9 }}
              >
                {/* Spinning music note when playing */}
                <AnimatePresence mode="wait">
                  {isPlaying ? (
                    <motion.div
                      key="pause"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Pause className="w-4 h-4 text-primary" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="play"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Play className="w-4 h-4 text-primary ml-0.5" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Rotating ring when playing */}
                {isPlaying && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-primary/40 border-t-primary"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                )}
              </motion.button>

              {/* Expanded content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    className="flex items-center gap-2 overflow-hidden"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Music icon with animation */}
                    <motion.div
                      animate={isPlaying ? { y: [0, -3, 0] } : {}}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    >
                      <Music className="w-4 h-4 text-muted-foreground" />
                    </motion.div>

                    {/* Song title */}
                    <span className="text-xs text-foreground/80 whitespace-nowrap font-romantic">
                      Raat Bhar
                    </span>

                    {/* Mute button */}
                    <motion.button
                      onClick={toggleMute}
                      className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors"
                      whileTap={{ scale: 0.9 }}
                    >
                      {isMuted ? (
                        <VolumeX className="w-3 h-3 text-muted-foreground" />
                      ) : (
                        <Volume2 className="w-3 h-3 text-muted-foreground" />
                      )}
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Floating hearts when playing */}
          <AnimatePresence>
            {isPlaying && (
              <>
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-primary/60 pointer-events-none"
                    initial={{ 
                      opacity: 0, 
                      scale: 0,
                      x: 28,
                      y: 28,
                    }}
                    animate={{ 
                      opacity: [0, 1, 0], 
                      scale: [0.5, 1, 0.5],
                      x: [28, 28 + (i - 1) * 20, 28 + (i - 1) * 30],
                      y: [28, -20 - i * 15, -50 - i * 20],
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.7,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                  >
                    ♥
                  </motion.div>
                ))}
              </>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </>
  );
};

export default FloatingMusicPlayer;
