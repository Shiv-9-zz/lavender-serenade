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
    <section className="py-20 px-4 relative overflow-hidden" ref={ref}>
      {/* Animated background orbs */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -60, 0],
          y: [0, 40, 0],
        }}
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
            className="font-elegant text-lg text-muted-foreground mb-4 tracking-widest uppercase"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Because of you
          </motion.p>
          <motion.h2 
            className="font-romantic text-4xl md:text-5xl lg:text-6xl text-foreground text-glow"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            My World is Brighter
          </motion.h2>
        </motion.div>

        {/* Impact statements */}
        <div className="space-y-8">
          {impacts.map((impact, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-6 group cursor-pointer"
              initial={{ opacity: 0, x: -50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              whileHover={{ x: 20 }}
            >
              <motion.div 
                className="flex-shrink-0"
                whileHover={{ scale: 1.3, rotate: 15 }}
                animate={{ 
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
              >
                <HeartIcon 
                  className="w-6 h-6 text-primary opacity-60 group-hover:opacity-100 transition-opacity duration-300" 
                />
              </motion.div>
              <motion.p 
                className="font-elegant text-xl md:text-2xl lg:text-3xl text-foreground/80 group-hover:text-foreground transition-colors duration-300 italic"
                whileHover={{ scale: 1.02 }}
              >
                "{impact}"
              </motion.p>
            </motion.div>
          ))}
        </div>

        {/* Decorative hearts */}
        <motion.div 
          className="mt-16 flex justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                y: [0, -8, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                delay: i * 0.15 
              }}
            >
              <HeartIcon 
                className={`w-4 h-4 ${i === 2 ? 'text-primary' : 'text-primary/40'}`}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactSection;
