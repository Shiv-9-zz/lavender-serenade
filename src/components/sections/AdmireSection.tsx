import { motion } from 'framer-motion';
import HeartIcon from '../HeartIcon';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const qualities = [
  { title: "Your Kindness", description: "The way you treat everyone with such warmth and compassion, even when the world doesn't always return it.", icon: "✨" },
  { title: "Your Patience", description: "How you give time and space with such grace, never rushing, always understanding.", icon: "🌸" },
  { title: "Your Smile", description: "That beautiful smile that lights up every room and makes everything feel a little softer, a little safer.", icon: "💫" },
  { title: "Your Strength", description: "The quiet courage you carry within, facing each day with a resilience that inspires me endlessly.", icon: "🦋" },
  { title: "Your Presence", description: "Just being near you makes the world feel calmer. You have a peace about you that's rare and precious.", icon: "🌙" },
  { title: "Your Beautiful Heart", description: "Inside and out, you are beautiful. Your heart is gentle, pure, and filled with love.", icon: "🌹" },
];

const AdmireSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section className="py-28 px-4 relative will-change-transform" ref={ref}>
      {/* Section glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsla(340, 65%, 50%, 0.04) 0%, transparent 70%)' }}
      />

      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <motion.p className="font-elegant text-xs tracking-[0.5em] uppercase text-primary/60 mb-4">Everything I adore</motion.p>
          <motion.h2 className="font-romantic text-5xl md:text-6xl lg:text-7xl text-foreground mb-6 text-glow">
            What I Adore About You
          </motion.h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16" style={{ background: 'linear-gradient(to right, transparent, hsl(15, 60%, 65%))' }} />
            <HeartIcon className="w-4 h-4 text-primary" style={{ filter: 'drop-shadow(0 0 6px hsl(15, 60%, 65%))' }} />
            <div className="h-px w-16" style={{ background: 'linear-gradient(to left, transparent, hsl(15, 60%, 65%))' }} />
          </div>
        </motion.div>

        {/* Cards - staggered bento grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
        >
          {qualities.map((quality, index) => (
            <motion.div
              key={quality.title}
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
              whileHover={{ scale: 1.03, y: -8 }}
              className={`glass-card p-7 relative overflow-hidden cursor-pointer group ${index === 0 || index === 5 ? 'lg:col-span-1' : ''}`}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'radial-gradient(circle at 50% 50%, hsla(15, 60%, 60%, 0.08) 0%, transparent 70%)' }}
              />
              
              <motion.div className="text-3xl mb-4 relative z-10" animate={{ y: [0, -5, 0] }} transition={{ duration: 4, repeat: Infinity, delay: index * 0.3 }}>
                {quality.icon}
              </motion.div>

              <h3 className="font-romantic text-2xl text-foreground mb-3 relative z-10 group-hover:text-primary transition-colors duration-500">
                {quality.title}
              </h3>

              <p className="font-elegant text-sm text-muted-foreground leading-relaxed relative z-10">
                {quality.description}
              </p>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AdmireSection;
