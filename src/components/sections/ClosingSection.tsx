import { motion } from 'framer-motion';
import HeartIcon from '../HeartIcon';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const ClosingSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section className="py-32 px-4 relative will-change-transform" ref={ref}>
      {/* Large ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsla(15, 60%, 55%, 0.06) 0%, hsla(340, 65%, 50%, 0.03) 40%, transparent 70%)' }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Vertical accent */}
        <motion.div
          className="w-px h-20 mx-auto mb-10"
          style={{ background: 'linear-gradient(to bottom, transparent, hsl(15, 60%, 65%), transparent)' }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={isVisible ? { scaleY: 1, opacity: 0.5 } : {}}
          transition={{ duration: 1 }}
        />

        <motion.h2 className="font-romantic text-5xl md:text-6xl lg:text-7xl text-foreground mb-6 text-glow leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Parisikha, you matter to me
          <br />
          <motion.span className="text-primary"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.8 }}
            style={{ textShadow: '0 0 40px hsla(15, 60%, 60%, 0.4)' }}
          >
            more than my pride.
          </motion.span>
        </motion.h2>

        <motion.p className="font-elegant text-xl md:text-2xl text-muted-foreground mb-14 max-w-2xl mx-auto italic leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Whenever you need reassurance, warmth, or comfort—come back here. 
          This space will always be yours.
        </motion.p>

        {/* Divider */}
        <motion.div className="flex items-center justify-center gap-4 mb-14"
          initial={{ scale: 0 }}
          animate={isVisible ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <div className="h-px w-20" style={{ background: 'linear-gradient(to right, transparent, hsla(15, 60%, 65%, 0.3))' }} />
          <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }}>
            <HeartIcon className="w-5 h-5 text-primary" style={{ filter: 'drop-shadow(0 0 10px hsl(15, 60%, 65%))' }} />
          </motion.div>
          <div className="h-px w-20" style={{ background: 'linear-gradient(to left, transparent, hsla(15, 60%, 65%, 0.3))' }} />
        </motion.div>

        {/* Signature card */}
        <motion.div className="glass-card inline-block px-14 py-10 glow-soft"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          whileHover={{ scale: 1.03 }}
        >
          <motion.p className="font-elegant text-lg text-muted-foreground mb-3">
            Always choosing you,
          </motion.p>
          <motion.p className="font-romantic text-5xl md:text-6xl gradient-text">
            With love, always
          </motion.p>
        </motion.div>

        <motion.p className="mt-24 font-elegant text-sm text-muted-foreground/30"
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
