import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import HeartIcon from '../HeartIcon';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const letters = [
  {
    title: "My Apology to You",
    greeting: "Dearest Parisikha,",
    paragraphs: [
      "I know tum naraz ho I know tumhe bura lga h i know ki tum merese baat nhi Krna chahhogi and i understand that..I have realised my mistake mujhe apni khamiyan pta h aur hn i know ki mai bhot slow hu unpr kaam krne k liye but trust me when I say this you mean world to me every day every second is where I think of is only you i know tum ye padh k bologi ki sb thik h sort h but mujhe pta chal jata h kya sort h kya nhi mujhe nhi pta tum ye msg pura padhogi ya nhi but I hope you do",
      "Tum merese upset ho aur hona bhi chahiye i should have stood up at that moment and its killing me every second that I didn't mai kitni bhi sorry bol lu kitna bhi justification dedu I won't matter much but what I can say is I am ready to change i am ready to adapt for you..",
      "Mujhe nhi pta tha ye aaisi situation itni jaldi aajayegi aaisa sb hoga i thought ki sb acha chal rha h koi dikkat kahi nhi h but all of a sudden ye sb hua mai koi bahana nhi dena chata hu ki mai ye tha wo tha .... I just simply accept meri galti and I can assure you that its the last time this happened...",
      "I just wanted to ask you for a fresh start over everything that happened har galti har argument hrr chiz k liye I am genuinely sorry form bottom of my heart i promise you to never let you down and i promise you will see this",
      "Please know that this apology isn't about asking for anything in return. It's simply about telling you the truth: I was wrong, I am sorry, and you matter to me more than words could ever express.",
      "If you forgive me for everything and tumhe Mera ye fresh start Krna thik lge toh give me a call..mujhe bulana and give me a tight hug ."
    ],
    closing: "With all my heart I will be waiting,",
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
  const [flipDirection, setFlipDirection] = useState(1);

  const nextLetter = () => {
    setFlipDirection(1);
    setCurrentLetter((prev) => (prev + 1) % letters.length);
  };

  const prevLetter = () => {
    setFlipDirection(-1);
    setCurrentLetter((prev) => (prev - 1 + letters.length) % letters.length);
  };

  const letter = letters[currentLetter];

  const flipVariants = {
    enter: (direction: number) => ({
      rotateY: direction > 0 ? 90 : -90,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      rotateY: direction > 0 ? -90 : 90,
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <section className="py-24 px-4 relative will-change-transform" ref={ref}>
      {/* Section label */}
      <motion.div
        className="flex items-center justify-center gap-4 mb-6"
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/30" />
        <span className="font-elegant text-xs tracking-[0.4em] uppercase text-muted-foreground">From My Heart</span>
        <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/30" />
      </motion.div>

      <div className="max-w-3xl mx-auto relative" style={{ perspective: '1500px' }}>
        {/* Navigation arrows */}
        <div className="absolute left-0 md:-left-6 top-1/2 -translate-y-1/2 z-30">
          <motion.button
            onClick={prevLetter}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-muted/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-primary hover:bg-muted/80 transition-colors"
            whileHover={{ scale: 1.1, x: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </motion.button>
        </div>
        <div className="absolute right-0 md:-right-6 top-1/2 -translate-y-1/2 z-30">
          <motion.button
            onClick={nextLetter}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-muted/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-primary hover:bg-muted/80 transition-colors"
            whileHover={{ scale: 1.1, x: 3 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </motion.button>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <AnimatePresence mode="wait" custom={flipDirection}>
            <motion.div
              key={currentLetter}
              custom={flipDirection}
              variants={flipVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="glass-card p-8 md:p-12 lg:p-16 relative overflow-hidden"
              style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
            >
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-24 h-24">
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-primary/10 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 w-24 h-24">
                <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-tr from-accent/10 to-transparent" />
              </div>

              {/* Card shine effect on flip */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                initial={{ x: '-100%', opacity: 0 }}
                animate={{ x: '100%', opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />

              {/* Letter indicator dots */}
              <div className="flex justify-center gap-2 mb-6">
                {letters.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => {
                      setFlipDirection(index > currentLetter ? 1 : -1);
                      setCurrentLetter(index);
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === currentLetter 
                        ? 'bg-primary w-8' 
                        : 'bg-primary/20 hover:bg-primary/40 w-1.5'
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>

              {/* Section title */}
              <motion.div 
                className="flex items-center gap-3 mb-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <HeartIcon className="w-5 h-5 text-primary" />
                </motion.div>
                <h2 className="font-romantic text-3xl md:text-4xl text-foreground">{letter.title}</h2>
              </motion.div>

              {/* Letter content */}
              <div className="font-elegant text-lg md:text-xl leading-relaxed text-foreground/80 space-y-6 px-2 md:px-6">
                <motion.p 
                  className="first-letter:text-5xl first-letter:font-romantic first-letter:text-primary first-letter:float-left first-letter:mr-3 first-letter:mt-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {letter.greeting}
                </motion.p>
                
                {letter.paragraphs.map((paragraph, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.08 }}
                    className={index === letter.paragraphs.length - 1 ? "italic text-primary/70" : ""}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>

              {/* Signature */}
              <motion.div 
                className="mt-10 text-right px-2 md:px-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <motion.p className="font-romantic text-2xl text-primary" whileHover={{ scale: 1.05 }}>
                  {letter.closing}
                </motion.p>
                <motion.p className="font-romantic text-3xl text-foreground mt-2" whileHover={{ scale: 1.02, x: 5 }}>
                  {letter.signature}
                </motion.p>
              </motion.div>

              {/* Flip hint */}
              <motion.div 
                className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-muted-foreground/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <span className="font-elegant text-xs tracking-wider">Flip to read more</span>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default ApologySection;
