import { motion } from 'framer-motion';
import HeartIcon from '../HeartIcon';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const ClosingSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section className="py-28 px-4 relative will-change-transform" ref={ref}>
      <div className="max-w-4xl mx-auto text-center">
        {/* Vertical line */}
        <motion.div
          className="w-px h-16 bg-gradient-to-b from-transparent via-primary/40 to-transparent mx-auto mb-8"
          initial={{ scaleY: 0 }}
          animate={isVisible ? { scaleY: 1 } : {}}
          transition={{ duration: 0.8 }}
        />

        {/* Main closing message */}
        <motion.h2 
          className="font-romantic text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 text-glow leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Parisikha, you matter to me
          <br />
          <motion.span 
            className="text-primary italic"
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
          <motion.div className="h-px w-20 bg-gradient-to-r from-transparent to-primary/30" />
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <HeartIcon className="w-5 h-5 text-primary" />
          </motion.div>
          <motion.div className="h-px w-20 bg-gradient-to-l from-transparent to-primary/30" />
        </motion.div>

        {/* Signature card */}
        <motion.div 
          className="glass-card inline-block px-12 py-8 glow-soft"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          whileHover={{ scale: 1.03 }}
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

        {/* Footer note */}
        <motion.p 
          className="mt-20 font-elegant text-sm text-muted-foreground/40"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 2 }}
        >
          Made with love, just for you ✦
        </motion.p>
      </div>
    </section>
  );
};

export default ClosingSection;
