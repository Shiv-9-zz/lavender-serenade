import { motion } from 'framer-motion';
import HeartIcon from '../HeartIcon';

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative px-4 py-20 overflow-hidden will-change-transform">
      {/* Starfield background */}
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-twinkle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${1 + Math.random() * 3}px`,
            height: `${1 + Math.random() * 3}px`,
            backgroundColor: `hsla(38, ${50 + Math.random() * 30}%, ${70 + Math.random() * 20}%, ${0.3 + Math.random() * 0.5})`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${2 + Math.random() * 4}s`,
          }}
        />
      ))}

      {/* Warm ambient orbs */}
      <motion.div
        className="absolute top-20 -left-20 w-96 h-96 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, hsla(38, 65%, 55%, 0.08) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 -right-20 w-[500px] h-[500px] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, hsla(340, 40%, 50%, 0.06) 0%, transparent 70%)' }}
        animate={{ scale: [1.1, 1, 1.1], x: [0, -40, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="text-center max-w-4xl mx-auto relative z-10">
        {/* Gold line accent */}
        <motion.div
          className="w-px h-20 bg-gradient-to-b from-transparent via-primary/60 to-transparent mx-auto mb-8"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1 }}
        />

        {/* Small decorative hearts */}
        <motion.div 
          className="flex justify-center gap-3 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
            >
              <HeartIcon 
                className={`${i === 1 ? 'w-6 h-6 text-primary' : 'w-4 h-4'} ${i === 0 ? 'text-accent' : i === 2 ? 'text-lilac' : ''}`} 
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Main title */}
        <motion.h1 
          className="font-romantic text-5xl md:text-7xl lg:text-8xl text-foreground mb-6 text-glow tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.span
            className="block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Parisikha,
          </motion.span>
          <motion.span
            className="block italic text-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            I'm Truly Sorry
          </motion.span>
        </motion.h1>

        {/* Decorative divider */}
        <motion.div 
          className="flex items-center justify-center gap-4 mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <motion.div 
            className="h-px w-16 bg-gradient-to-r from-transparent to-primary/40"
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          />
          <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" fill="hsl(38, 65%, 60%)" />
            </svg>
          </motion.div>
          <motion.div 
            className="h-px w-16 bg-gradient-to-l from-transparent to-primary/40"
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          />
        </motion.div>

        {/* Subtitle */}
        <motion.p 
          className="font-elegant text-xl md:text-2xl lg:text-3xl text-muted-foreground italic max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          This is me, trying to say what my heart feels but my words couldn't.
        </motion.p>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <motion.div 
            className="flex flex-col items-center gap-2 text-muted-foreground/50"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="font-elegant text-xs tracking-[0.3em] uppercase">Scroll down</span>
            <div className="w-5 h-9 rounded-full border border-muted-foreground/20 flex justify-center pt-2">
              <motion.div 
                className="w-1 h-2 bg-primary/50 rounded-full"
                animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
