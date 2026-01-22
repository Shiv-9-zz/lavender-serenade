import { motion } from 'framer-motion';
import { useState } from 'react';
import HeartIcon from '../HeartIcon';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const letters = [
  {
    title: "My Apology to You",
    greeting: "Dearest Parisikha,",
    paragraphs: [
      "I've been carrying these words in my heart, searching for the courage to let them out. I know I've hurt you, and I want you to know that I see it—every moment where I fell short, every time my actions didn't match the love I feel for you.",
      "I'm not here to make excuses or justify anything. I'm here to own my mistakes fully and completely. You deserved better from me, and I failed to give you that. For that, I am deeply and truly sorry.",
      "The pain I've caused you weighs heavily on my heart. If I could go back and choose differently, I would. But since I can't, I want you to know that I'm choosing to learn from this. I'm choosing to grow. I'm choosing to become someone worthy of your beautiful heart.",
      "You mean more to me than my pride, more than being right, more than anything else I thought mattered. I see that now with painful clarity.",
      "Please know that this apology isn't about asking for anything in return. It's simply about telling you the truth: I was wrong, I am sorry, and you matter to me more than words could ever express."
    ],
    closing: "With all my heart,",
    signature: "— Yours, always"
  },
  {
    title: "What You Mean to Me",
    greeting: "My dear Parisikha,",
    paragraphs: [
      "I don't know if I always say things the right way, but I hope you can feel what I mean when I say this — you matter to me. More than moments, more than words, more than I sometimes manage to show.",
      "There's something about you that brings calm into my chaos. The way you exist, the way you think, the way you feel things deeply — it stays with me. You have this quiet strength and warmth that makes everything feel a little softer, a little better. Just knowing you're there changes how the world feels to me.",
      "I care about you in ways that are gentle and constant. In the small moments. In the silence. In the way I notice things that remind me of you without even trying. You've become someone my heart naturally leans toward, and that's not something I take lightly.",
      "If there were moments where I didn't express this care clearly enough, or where my actions didn't reflect what I feel — I'm sorry for that. Not in a heavy way, but in an honest one. You deserve clarity, warmth, and reassurance, and I'm learning to give that better.",
      "This isn't about perfection. It's about intention. And my intention has always been you — your peace, your smile, your comfort. I want to be someone who adds calm to your life, someone you feel safe with, someone who chooses you thoughtfully, every time.",
      "I just wanted you to know this — simply, sincerely, and without pressure. You are cared for. You are appreciated. And you mean more to me than you probably realize."
    ],
    closing: "Always,",
    signature: "— With warmth and care"
  }
];

const ApologySection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const [currentLetter, setCurrentLetter] = useState(0);

  const nextLetter = () => {
    setCurrentLetter((prev) => (prev + 1) % letters.length);
  };

  const prevLetter = () => {
    setCurrentLetter((prev) => (prev - 1 + letters.length) % letters.length);
  };

  const letter = letters[currentLetter];

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

          {/* Navigation arrows */}
          <div className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20">
            <motion.button
              onClick={prevLetter}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/50 backdrop-blur-sm border border-white/30 flex items-center justify-center text-primary hover:bg-white/70 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </motion.button>
          </div>
          <div className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20">
            <motion.button
              onClick={nextLetter}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/50 backdrop-blur-sm border border-white/30 flex items-center justify-center text-primary hover:bg-white/70 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </motion.button>
          </div>

          {/* Letter indicator dots */}
          <div className="flex justify-center gap-2 mb-6">
            {letters.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentLetter(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentLetter 
                    ? 'bg-primary w-6' 
                    : 'bg-primary/30 hover:bg-primary/50'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>

          {/* Section title */}
          <motion.div 
            className="flex items-center gap-3 mb-8"
            key={`title-${currentLetter}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <HeartIcon className="w-6 h-6 text-primary" />
            </motion.div>
            <h2 className="font-romantic text-3xl md:text-4xl text-foreground">{letter.title}</h2>
          </motion.div>

          {/* Letter content with animation */}
          <motion.div 
            className="font-elegant text-lg md:text-xl leading-relaxed text-foreground/90 space-y-6 px-4 md:px-8"
            key={`content-${currentLetter}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <p className="first-letter:text-5xl first-letter:font-romantic first-letter:text-primary first-letter:float-left first-letter:mr-3 first-letter:mt-1">
              {letter.greeting}
            </p>
            
            {letter.paragraphs.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={index === letter.paragraphs.length - 1 ? "italic text-primary/80" : ""}
              >
                {paragraph}
              </motion.p>
            ))}
          </motion.div>

          {/* Signature */}
          <motion.div 
            className="mt-10 text-right px-4 md:px-8"
            key={`signature-${currentLetter}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.p 
              className="font-romantic text-2xl text-primary"
              whileHover={{ scale: 1.05 }}
            >
              {letter.closing}
            </motion.p>
            <motion.p 
              className="font-romantic text-3xl text-foreground mt-2"
              whileHover={{ scale: 1.02, x: 5 }}
            >
              {letter.signature}
            </motion.p>
          </motion.div>

          {/* Swipe hint */}
          <motion.div 
            className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-muted-foreground/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="font-elegant text-sm">Swipe to read more</span>
            <ChevronRight className="w-4 h-4" />
          </motion.div>

          {/* Bottom decorative element */}
          <motion.div 
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2"
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
