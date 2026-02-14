import { motion } from 'framer-motion';
import HeartIcon from '../HeartIcon';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const impacts = [
  "You make the ordinary feel magical",
  "Your laugh is my favorite sound in the world",
  "You see the good in everyone, including me",
  "Life feels more colorful when you're in it",
  "You make me want to be a better person",
  "Your love feels like coming home"
];

const ImpactSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section className="py-24 px-4 relative overflow-hidden will-change-transform" ref={ref}>
      {/* Subtle background glow */}
      <motion.div 
        className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, hsla(38, 65%, 55%, 0.06) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.3, 1], x: [0, 40, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.p 
            className="font-elegant text-xs text-muted-foreground mb-4 tracking-[0.4em] uppercase"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Because of you
          </motion.p>
          <motion.h2 
            className="font-romantic text-4xl md:text-5xl lg:text-6xl text-foreground text-glow"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            My World is <span className="text-primary italic">Brighter</span>
          </motion.h2>
        </motion.div>

        {/* Impact statements */}
        <div className="space-y-6">
          {impacts.map((impact, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-6 group cursor-pointer py-3 border-b border-white/5 last:border-0"
              initial={{ opacity: 0, x: -40 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              whileHover={{ x: 16 }}
            >
              <motion.div 
                className="flex-shrink-0 w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center"
                whileHover={{ scale: 1.2, borderColor: 'hsl(38, 65%, 60%)' }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
              >
                <HeartIcon className="w-3.5 h-3.5 text-primary opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
              <motion.p 
                className="font-elegant text-xl md:text-2xl lg:text-3xl text-foreground/70 group-hover:text-foreground transition-colors duration-300 italic"
                whileHover={{ scale: 1.01 }}
              >
                "{impact}"
              </motion.p>
            </motion.div>
          ))}
        </div>

        {/* Decorative stars */}
        <motion.div 
          className="mt-16 flex justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.8, 1.1, 0.8] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.15 }}
            >
              <svg width={i === 2 ? "10" : "6"} height={i === 2 ? "10" : "6"} viewBox="0 0 24 24" fill="hsl(38, 65%, 60%)">
                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
              </svg>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactSection;
