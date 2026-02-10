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
    <section className="py-20 px-4 relative will-change-transform" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <motion.div 
          className="glass-card p-8 md:p-12 lg:p-16 relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Animated shimmer */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ x: ['-200%', '200%'] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
          />
          
          {/* Content */}
          <div className="relative z-10">
            {/* Header */}
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <HeartIcon className="w-10 h-10 text-primary mx-auto mb-4" />
              </motion.div>
              <h2 className="font-romantic text-4xl md:text-5xl text-foreground mb-4">
                My Promise to You
              </h2>
              <p className="font-elegant text-lg text-muted-foreground max-w-lg mx-auto">
                I can't promise perfection, but I can promise growth. I can promise to try harder, 
                love deeper, and be more present.
              </p>
            </motion.div>

            {/* Promise list */}
            <div className="space-y-4">
              {promises.map((promise, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/30 backdrop-blur-sm border border-white/20 cursor-pointer group"
                  initial={{ opacity: 0, x: -30 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  whileHover={{ 
                    scale: 1.02, 
                    backgroundColor: 'rgba(255,255,255,0.5)',
                    x: 10
                  }}
                >
                  <motion.div 
                    className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <HeartIcon className="w-4 h-4 text-primary" />
                  </motion.div>
                  <p className="font-elegant text-lg md:text-xl text-foreground group-hover:text-primary transition-colors">
                    {promise}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Footer message */}
            <motion.div 
              className="mt-12 text-center"
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ delay: 1 }}
            >
              <motion.p 
                className="font-elegant text-xl text-muted-foreground italic"
                whileHover={{ scale: 1.02 }}
              >
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
