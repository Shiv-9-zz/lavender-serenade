import { motion } from 'framer-motion';
import HeartIcon from '../HeartIcon';

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative px-4 py-20 overflow-hidden will-change-transform">
      {/* Large radial glow behind title */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsla(340, 65%, 50%, 0.08) 0%, hsla(15, 60%, 55%, 0.04) 40%, transparent 70%)',
        }}
      />

      {/* Floating light streaks */}
      <motion.div
        className="absolute top-[15%] left-[5%] w-[400px] h-[2px] rounded-full"
        style={{ background: 'linear-gradient(90deg, transparent, hsla(15, 60%, 65%, 0.15), transparent)' }}
        animate={{ x: [0, 200, 0], opacity: [0, 0.6, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[25%] right-[10%] w-[300px] h-[1px] rounded-full"
        style={{ background: 'linear-gradient(90deg, transparent, hsla(340, 65%, 55%, 0.12), transparent)' }}
        animate={{ x: [0, -150, 0], opacity: [0, 0.5, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />

      <div className="text-center max-w-4xl mx-auto relative z-10">
        {/* Thin gold decorative line */}
        <motion.div
          className="w-px h-24 mx-auto mb-8"
          style={{ background: 'linear-gradient(to bottom, transparent, hsl(15, 60%, 65%), transparent)' }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 0.6 }}
          transition={{ duration: 1.2 }}
        />

        {/* Small hearts */}
        <motion.div 
          className="flex justify-center gap-4 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
            >
              <HeartIcon 
                className={`${i === 1 ? 'w-7 h-7 text-primary' : 'w-5 h-5'} ${i === 0 ? 'text-accent' : i === 2 ? 'text-lilac' : ''}`}
                style={{ filter: `drop-shadow(0 0 6px ${i === 1 ? 'hsla(15, 60%, 65%, 0.5)' : 'hsla(340, 65%, 55%, 0.3)'})` }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Main title */}
        <motion.h1 
          className="font-romantic text-6xl md:text-8xl lg:text-9xl text-foreground mb-4 text-glow tracking-wide"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          <motion.span
            className="block"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Parisikha,
          </motion.span>
          <motion.span
            className="block text-primary mt-2"
            style={{ textShadow: '0 0 60px hsla(15, 60%, 60%, 0.4), 0 0 120px hsla(340, 65%, 55%, 0.15)' }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            I'm Truly Sorry
          </motion.span>
        </motion.h1>

        {/* Ornate divider */}
        <motion.div 
          className="flex items-center justify-center gap-4 my-8"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.3 }}
        >
          <motion.div 
            className="h-px w-20 rounded-full"
            style={{ background: 'linear-gradient(to right, transparent, hsl(15, 60%, 65%))' }}
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 1, delay: 1.5 }}
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ filter: 'drop-shadow(0 0 8px hsl(15, 60%, 65%))' }}>
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" fill="hsl(15, 60%, 65%)" />
            </svg>
          </motion.div>
          <motion.div 
            className="h-px w-20 rounded-full"
            style={{ background: 'linear-gradient(to left, transparent, hsl(15, 60%, 65%))' }}
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 1, delay: 1.5 }}
          />
        </motion.div>

        {/* Subtitle */}
        <motion.p 
          className="font-elegant text-xl md:text-2xl lg:text-3xl text-muted-foreground italic max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          This is me, trying to say what my heart feels but my words couldn't.
        </motion.p>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          <motion.div 
            className="flex flex-col items-center gap-2 text-muted-foreground/40"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <span className="font-elegant text-xs tracking-[0.3em] uppercase">Scroll with love</span>
            <div className="w-5 h-9 rounded-full border border-primary/20 flex justify-center pt-2">
              <motion.div 
                className="w-1 h-2 rounded-full"
                style={{ background: 'hsl(15, 60%, 65%)' }}
                animate={{ y: [0, 14, 0], opacity: [1, 0, 1] }}
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
