import { motion } from 'framer-motion';
import HeartIcon from '../HeartIcon';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const ApologySection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const paragraphs = [
    "Dearest Parisikha,",
    "I've been carrying these words in my heart, searching for the courage to let them out. I know I've hurt you, and I want you to know that I see it—every moment where I fell short, every time my actions didn't match the love I feel for you.",
    "I'm not here to make excuses or justify anything. I'm here to own my mistakes fully and completely. You deserved better from me, and I failed to give you that. For that, I am deeply and truly sorry.",
    "The pain I've caused you weighs heavily on my heart. If I could go back and choose differently, I would. But since I can't, I want you to know that I'm choosing to learn from this. I'm choosing to grow. I'm choosing to become someone worthy of your beautiful heart.",
    "You mean more to me than my pride, more than being right, more than anything else I thought mattered. I see that now with painful clarity.",
    "Please know that this apology isn't about asking for anything in return. It's simply about telling you the truth: I was wrong, I am sorry, and you matter to me more than words could ever express."
  ];

  return (
    <section className="py-20 px-4 relative" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <motion.div 
          className="glass-card p-8 md:p-12 lg:p-16 relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Animated corner glow */}
          <motion.div 
            className="absolute top-0 right-0 w-32 h-32"
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <div className="absolute inset-0 bg-gradient-to-bl from-primary/40 to-transparent rounded-bl-full" />
          </motion.div>

          {/* Section title */}
          <motion.div 
            className="flex items-center gap-3 mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <HeartIcon className="w-6 h-6 text-primary" />
            </motion.div>
            <h2 className="font-romantic text-3xl md:text-4xl text-foreground">My Apology to You</h2>
          </motion.div>

          {/* Letter content with stagger */}
          <div className="font-elegant text-lg md:text-xl leading-relaxed text-foreground/90 space-y-6">
            {paragraphs.map((paragraph, index) => (
              <motion.p
                key={index}
                className={index === 0 ? "first-letter:text-5xl first-letter:font-romantic first-letter:text-primary first-letter:float-left first-letter:mr-3 first-letter:mt-1" : index === paragraphs.length - 1 ? "italic text-primary/80" : ""}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          {/* Signature */}
          <motion.div 
            className="mt-10 text-right"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <motion.p 
              className="font-romantic text-2xl text-primary"
              whileHover={{ scale: 1.05 }}
            >
              With all my heart,
            </motion.p>
            <motion.p 
              className="font-romantic text-3xl text-foreground mt-2"
              whileHover={{ scale: 1.02, x: 5 }}
            >
              — Yours, always
            </motion.p>
          </motion.div>

          {/* Bottom decorative element */}
          <motion.div 
            className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <HeartIcon className="w-3 h-3 text-lilac" />
            <HeartIcon className="w-4 h-4 text-primary" />
            <HeartIcon className="w-3 h-3 text-rose" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ApologySection;
