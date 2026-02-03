import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import FloatingPetals from '@/components/FloatingPetals';
import Sparkles from '@/components/Sparkles';
import InteractiveHearts from '@/components/InteractiveHearts';
import FloatingMusicPlayer from '@/components/FloatingMusicPlayer';
import InteractiveEnvelope from './InteractiveEnvelope';
import PhotoGallery from './PhotoGallery';
import HeartIcon from '@/components/HeartIcon';

const ValentineDedication = () => {
  const [letterOpened, setLetterOpened] = useState(false);
  const musicStartedRef = useRef(false);

  // Auto-start music when dedication page loads
  useEffect(() => {
    if (!musicStartedRef.current) {
      musicStartedRef.current = true;
      // Music player handles its own state, just marking that we're ready
    }
  }, []);

  const loveLetterContent = `My Dearest Love,

From the moment our paths crossed, my world transformed into something magical. Every smile you share lights up my darkest days, and every moment with you feels like a beautiful dream I never want to wake from.

You are my sunshine on cloudy days, my calm in the storm, and the reason my heart beats with such joy. Your kindness, your laughter, your presence - they are the greatest gifts I've ever received.

I promise to cherish you, to stand by you through every season of life, and to love you more with each passing day. You make me want to be the best version of myself, and for that, I am eternally grateful.

Thank you for being you - for being mine.

Happy Valentine's Day, my love. Today and always, you have my heart.`;

  // Placeholder photos - user can replace with actual photos
  const photos = [
    { id: 1, src: '/placeholder.svg', caption: 'Our first memory' },
    { id: 2, src: '/placeholder.svg', caption: 'That special day' },
    { id: 3, src: '/placeholder.svg', caption: 'Together forever' },
    { id: 4, src: '/placeholder.svg', caption: 'My favorite smile' },
    { id: 5, src: '/placeholder.svg', caption: 'Adventures await' },
    { id: 6, src: '/placeholder.svg', caption: 'Love in bloom' },
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Background effects */}
      <FloatingPetals />
      <Sparkles />
      <InteractiveHearts />
      <FloatingMusicPlayer />

      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-primary/10 via-background to-accent/10 -z-10" />

      {/* Main content */}
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
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
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

          {/* Interactive Envelope */}
          <InteractiveEnvelope 
            letterContent={loveLetterContent}
            onLetterOpened={() => setLetterOpened(true)}
          />

          {/* Scroll indicator */}
          {letterOpened && (
            <motion.div
              className="mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <p className="font-elegant text-muted-foreground text-center">
                Scroll down for more surprises
              </p>
              <div className="text-2xl text-center mt-2">↓</div>
            </motion.div>
          )}
        </section>

        {/* Photo Gallery Section */}
        {letterOpened && (
          <motion.section
            className="py-16 md:py-24"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <PhotoGallery photos={photos} />
          </motion.section>
        )}

        {/* Final Message Section */}
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
              {/* Floating hearts decoration */}
              <div className="flex justify-center gap-4 mb-8">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{ 
                      duration: 2,
                      delay: i * 0.2,
                      repeat: Infinity 
                    }}
                  >
                    <HeartIcon className="w-6 h-6 text-primary/60" />
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
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px hsl(var(--primary) / 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  animate={{ 
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{ 
                    backgroundPosition: { duration: 3, repeat: Infinity }
                  }}
                  style={{ backgroundSize: '200% 200%' }}
                >
                  Will you always stay with me? 💕
                </motion.button>
              </motion.div>

              {/* Signature */}
              <motion.p
                className="mt-8 font-romantic text-2xl text-primary/80"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1 }}
              >
                Forever & Always Yours 💖
              </motion.p>
            </motion.div>

            {/* Bottom decoration */}
            <motion.div
              className="mt-16 text-6xl"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              💑
            </motion.div>
          </motion.section>
        )}
      </main>
    </div>
  );
};

export default ValentineDedication;
