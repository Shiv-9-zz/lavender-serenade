import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ILoveYouRain from './ILoveYouRain';
import FloatingPetals from '@/components/FloatingPetals';
import Sparkles from '@/components/Sparkles';
import InteractiveHearts from '@/components/InteractiveHearts';
import FloatingMusicPlayer from '@/components/FloatingMusicPlayer';
import InteractiveEnvelope from './InteractiveEnvelope';
import PhotoGallery from './PhotoGallery';
import HeartIcon from '@/components/HeartIcon';

const ValentineDedication = () => {
  const [letterOpened, setLetterOpened] = useState(false);
  const [showRain, setShowRain] = useState(false);
  const musicStartedRef = useRef(false);

  useEffect(() => {
    if (!musicStartedRef.current) { musicStartedRef.current = true; }
  }, []);

  const loveLetterContent = `My Dearest Love,

From the moment our paths crossed, my world transformed into something magical. Every smile you share lights up my darkest days, and every moment with you feels like a beautiful dream I never want to wake from.

You are my sunshine on cloudy days, my calm in the storm, and the reason my heart beats with such joy. Your kindness, your laughter, your presence - they are the greatest gifts I've ever received.

I promise to cherish you, to stand by you through every season of life, and to love you more with each passing day. You make me want to be the best version of myself, and for that, I am eternally grateful.

Thank you for being you - for being mine.

Happy Valentine's Day, my love. Today and always, you have my heart.`;

  const photos = [
    { id: 1, src: '/images/photo1.jpeg', caption: 'That beautiful smile' },
    { id: 2, src: '/images/photo2.jpeg', caption: 'Stunning as always' },
    { id: 3, src: '/images/photo3.jpeg', caption: 'Among the flowers' },
    { id: 4, src: '/images/photo4.jpeg', caption: 'My favorite person' },
    { id: 5, src: '/images/photo5.jpeg', caption: 'Adorable you' },
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <FloatingPetals />
      <Sparkles />
      <InteractiveHearts />
      <FloatingMusicPlayer songSrc="/audio/ishq-wala-love.mp3" songName="Ishq Wala Love" />

      <div className="fixed inset-0 bg-gradient-to-b from-primary/5 via-background to-accent/5 -z-10" />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="text-6xl md:text-7xl mb-4"
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              💝
            </motion.div>
            <h1 className="font-romantic text-4xl md:text-6xl text-primary text-glow mb-2">
              For My Valentine
            </h1>
            <p className="font-elegant text-xl text-muted-foreground">
              A little something from my heart to yours
            </p>
          </motion.div>

          <InteractiveEnvelope 
            letterContent={loveLetterContent}
            onLetterOpened={() => setLetterOpened(true)}
          />

          {letterOpened && (
            <motion.div
              className="mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <p className="font-elegant text-muted-foreground text-center">Scroll down for more surprises</p>
              <div className="text-2xl text-center mt-2">↓</div>
            </motion.div>
          )}
        </section>

        {letterOpened && (
          <motion.section className="py-16 md:py-24" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <PhotoGallery photos={photos} />
          </motion.section>
        )}

        {letterOpened && (
          <motion.section
            className="min-h-screen flex flex-col items-center justify-center px-4 py-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="glass-card p-8 md:p-12 text-center max-w-2xl mx-auto"
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-center gap-4 mb-8">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -10, 0], rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                  >
                    <HeartIcon className="w-5 h-5 text-primary/50" />
                  </motion.div>
                ))}
              </div>

              <motion.h2
                className="font-romantic text-3xl md:text-5xl text-primary mb-6 text-glow"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Thank you for being the most beautiful part of my life.
              </motion.h2>

              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <motion.button
                  className="px-8 py-4 bg-gradient-to-r from-primary via-accent to-primary text-primary-foreground rounded-full font-romantic text-xl shadow-lg"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px hsl(var(--primary) / 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowRain(true)}
                  animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                  transition={{ backgroundPosition: { duration: 3, repeat: Infinity } }}
                  style={{ backgroundSize: '200% 200%' }}
                >
                  Will you always stay with me? 💕
                </motion.button>
              </motion.div>

              <motion.p
                className="mt-8 font-romantic text-2xl text-primary/70"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1 }}
              >
                Forever & Always Yours 💖
              </motion.p>
            </motion.div>

            <motion.div
              className="mt-16 text-6xl"
              animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              💑
            </motion.div>
          </motion.section>
        )}
      </main>

      <AnimatePresence>
        {showRain && <ILoveYouRain onClose={() => setShowRain(false)} />}
      </AnimatePresence>
    </div>
  );
};

export default ValentineDedication;
