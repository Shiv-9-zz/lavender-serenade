import { motion } from 'framer-motion';
import HeartIcon from '../HeartIcon';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const qualities = [
  {
    title: "Your Kindness",
    description: "The way you treat everyone with such warmth and compassion, even when the world doesn't always return it.",
    icon: "✨"
  },
  {
    title: "Your Patience",
    description: "How you give time and space with such grace, never rushing, always understanding.",
    icon: "🌸"
  },
  {
    title: "Your Smile",
    description: "That beautiful smile that lights up every room and makes everything feel a little softer, a little safer.",
    icon: "💫"
  },
  {
    title: "Your Strength",
    description: "The quiet courage you carry within, facing each day with a resilience that inspires me endlessly.",
    icon: "🦋"
  },
  {
    title: "Your Presence",
    description: "Just being near you makes the world feel calmer. You have a peace about you that's rare and precious.",
    icon: "🌙"
  },
  {
    title: "Your Beautiful Heart",
    description: "Inside and out, you are beautiful. Your heart is gentle, pure, and filled with love.",
    icon: "💜"
  }
];

const AdmireSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-20 px-4 relative" ref={ref}>
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="font-romantic text-4xl md:text-5xl lg:text-6xl text-foreground mb-4 text-glow"
            whileHover={{ scale: 1.02 }}
          >
            What I Adore About You, Parisikha
          </motion.h2>
          <motion.div 
            className="flex items-center justify-center gap-3"
            initial={{ scale: 0 }}
            animate={isVisible ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.div 
              className="h-px w-20 bg-gradient-to-r from-transparent to-primary/50"
              initial={{ width: 0 }}
              animate={isVisible ? { width: 80 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <HeartIcon className="w-5 h-5 text-primary" />
            </motion.div>
            <motion.div 
              className="h-px w-20 bg-gradient-to-l from-transparent to-primary/50"
              initial={{ width: 0 }}
              animate={isVisible ? { width: 80 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
          </motion.div>
        </motion.div>

        {/* Quality cards */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {qualities.map((quality, index) => (
            <motion.div
              key={quality.title}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.03, 
                y: -8,
                transition: { duration: 0.3 }
              }}
              className="glass-card p-6 md:p-8 relative overflow-hidden cursor-pointer group"
            >
              {/* Hover glow effect */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Animated icon */}
              <motion.div 
                className="text-4xl mb-4 relative z-10"
                animate={{ 
                  y: [0, -8, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  delay: index * 0.3 
                }}
              >
                {quality.icon}
              </motion.div>

              {/* Title */}
              <h3 className="font-romantic text-2xl text-foreground mb-3 relative z-10 group-hover:text-primary transition-colors duration-300">
                {quality.title}
              </h3>

              {/* Description */}
              <p className="font-elegant text-muted-foreground leading-relaxed relative z-10">
                {quality.description}
              </p>

              {/* Corner heart */}
              <motion.div 
                className="absolute bottom-2 right-2"
                initial={{ opacity: 0.2, scale: 1 }}
                whileHover={{ opacity: 0.6, scale: 1.2, rotate: 15 }}
                transition={{ duration: 0.3 }}
              >
                <HeartIcon className="w-8 h-8 text-primary" />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AdmireSection;
