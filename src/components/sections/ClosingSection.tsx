import { motion } from 'framer-motion';
import HeartIcon from '../HeartIcon';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const ClosingSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section className="py-24 px-4 relative will-change-transform" ref={ref}>
      <div className="max-w-4xl mx-auto text-center">
        {/* Decorative hearts wave */}
        <motion.div 
          className="flex justify-center gap-4 mb-8"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          {[...Array(7)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                y: [0, -15, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                delay: i * 0.1,
                ease: "easeInOut"
              }}
            >
              <HeartIcon
                className={`text-primary ${
                  i === 3 ? 'w-8 h-8' : i === 2 || i === 4 ? 'w-6 h-6 opacity-70' : 'w-4 h-4 opacity-40'
                }`}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Main closing message */}
        <motion.h2 
          className="font-romantic text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 text-glow"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Parisikha, you matter to me
          <br />
          <motion.span 
            className="text-primary"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.8 }}
          >
            more than my pride.
          </motion.span>
        </motion.h2>

        {/* Subtext */}
        <motion.p 
          className="font-elegant text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto italic"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Whenever you need reassurance, warmth, or comfort—come back here. 
          This space will always be yours.
        </motion.p>

        {/* Animated divider */}
        <motion.div 
          className="flex items-center justify-center gap-4 mb-12"
          initial={{ scale: 0 }}
          animate={isVisible ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <motion.div 
            className="h-px w-24 bg-gradient-to-r from-transparent via-primary/50 to-transparent"
            initial={{ width: 0 }}
            animate={isVisible ? { width: 96 } : {}}
            transition={{ duration: 1, delay: 0.8 }}
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <HeartIcon className="w-6 h-6 text-rose" />
          </motion.div>
          <motion.div 
            className="h-px w-24 bg-gradient-to-r from-transparent via-primary/50 to-transparent"
            initial={{ width: 0 }}
            animate={isVisible ? { width: 96 } : {}}
            transition={{ duration: 1, delay: 0.8 }}
          />
        </motion.div>

        {/* Signature card */}
        <motion.div 
          className="glass-card inline-block px-12 py-8 glow-soft"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          whileHover={{ scale: 1.05, boxShadow: '0 0 60px -10px hsla(270, 60%, 60%, 0.5)' }}
        >
          <motion.p 
            className="font-elegant text-lg text-muted-foreground mb-2"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ delay: 1.2 }}
          >
            Always choosing you,
          </motion.p>
          <motion.p 
            className="font-romantic text-4xl md:text-5xl gradient-text"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ delay: 1.4 }}
          >
            — With love, always
          </motion.p>
        </motion.div>

        {/* Final hearts pulse */}
        <motion.div 
          className="mt-16 flex justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 1.6 }}
        >
          {['lilac', 'primary', 'rose', 'primary', 'lilac'].map((color, i) => (
            <motion.div
              key={i}
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                delay: i * 0.15 
              }}
            >
              <HeartIcon 
                className={`${i === 2 ? 'w-6 h-6' : 'w-4 h-4'} text-${color}`}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Footer note */}
        <motion.p 
          className="mt-16 font-elegant text-sm text-muted-foreground/60"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 2 }}
        >
          Made with love, just for you 💜
        </motion.p>
      </div>
    </section>
  );
};

export default ClosingSection;
