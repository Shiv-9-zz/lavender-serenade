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
    <section className="py-28 px-4 relative overflow-hidden will-change-transform" ref={ref}>
      {/* Moving light beam */}
      <motion.div
        className="absolute top-0 left-0 w-full h-[1px]"
        style={{ background: 'linear-gradient(90deg, transparent 0%, hsla(15, 60%, 65%, 0.3) 50%, transparent 100%)' }}
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <motion.p className="font-elegant text-xs text-primary/50 mb-4 tracking-[0.5em] uppercase">Because of you</motion.p>
          <motion.h2 className="font-romantic text-5xl md:text-6xl lg:text-7xl text-foreground text-glow">
            My World is Brighter
          </motion.h2>
        </motion.div>

        <div className="space-y-5">
          {impacts.map((impact, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-6 group cursor-pointer py-4 px-6 rounded-xl transition-all duration-500 hover:bg-white/[0.02]"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 + index * 0.1 }}
              whileHover={{ x: index % 2 === 0 ? 12 : -12 }}
            >
              <motion.div 
                className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center relative"
                whileHover={{ scale: 1.2 }}
              >
                <div className="absolute inset-0 rounded-full border border-primary/15 group-hover:border-primary/40 transition-colors duration-500" />
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ boxShadow: '0 0 20px hsla(15, 60%, 60%, 0.2)' }}
                />
                <HeartIcon className="w-4 h-4 text-primary/40 group-hover:text-primary transition-all duration-500" />
              </motion.div>
              <motion.p className="font-elegant text-xl md:text-2xl lg:text-3xl text-foreground/60 group-hover:text-foreground transition-colors duration-500 italic">
                "{impact}"
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
