import { motion } from 'framer-motion';
import HeartIcon from '../HeartIcon';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const promises = [
  "To listen more and assume less",
  "To choose patience over pride",
  "To show up, even when it's hard",
  "To communicate with kindness",
  "To keep choosing you, every single day"
];

const PromiseSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section className="py-28 px-4 relative will-change-transform" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <motion.div 
          className="glass-card p-8 md:p-14 lg:p-18 relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Decorative corner accents */}
          <div className="absolute top-0 left-0 w-16 h-16">
            <div className="absolute top-4 left-4 w-8 h-px bg-primary/20" />
            <div className="absolute top-4 left-4 w-px h-8 bg-primary/20" />
          </div>
          <div className="absolute bottom-0 right-0 w-16 h-16">
            <div className="absolute bottom-4 right-4 w-8 h-px bg-primary/20" />
            <div className="absolute bottom-4 right-4 w-px h-8 bg-primary/20" />
          </div>

          {/* Shimmer */}
          <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent"
            animate={{ x: ['-200%', '200%'] }}
            transition={{ duration: 5, repeat: Infinity, repeatDelay: 4 }}
          />
          
          <div className="relative z-10">
            <motion.div className="text-center mb-12">
              <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2.5, repeat: Infinity }}>
                <HeartIcon className="w-9 h-9 text-primary mx-auto mb-4" style={{ filter: 'drop-shadow(0 0 12px hsl(15, 60%, 65%))' }} />
              </motion.div>
              <h2 className="font-romantic text-5xl md:text-6xl text-foreground mb-4 text-glow">My Promise to You</h2>
              <p className="font-elegant text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
                I can't promise perfection, but I can promise growth. I can promise to try harder, love deeper, and be more present.
              </p>
            </motion.div>

            <div className="space-y-3">
              {promises.map((promise, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] cursor-pointer group"
                  initial={{ opacity: 0, x: -30 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.04)', x: 8 }}
                >
                  <motion.div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/15 group-hover:border-primary/40 transition-colors duration-500"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <HeartIcon className="w-3.5 h-3.5 text-primary/60 group-hover:text-primary transition-colors duration-500" />
                  </motion.div>
                  <p className="font-elegant text-lg md:text-xl text-foreground/70 group-hover:text-primary transition-colors duration-500">
                    {promise}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div className="mt-12 text-center" initial={{ opacity: 0 }} animate={isVisible ? { opacity: 1 } : {}} transition={{ delay: 1 }}>
              <motion.p className="font-elegant text-xl text-muted-foreground italic">
                "I'm not perfect, but for you, Parisikha, I'll always try."
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PromiseSection;
