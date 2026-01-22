import HeartIcon from '../HeartIcon';

const ApologySection = () => {
  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-3xl mx-auto">
        <div className="glass-card p-8 md:p-12 lg:p-16 relative overflow-hidden">
          {/* Decorative corner */}
          <div className="absolute top-0 right-0 w-32 h-32 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-bl from-primary/40 to-transparent rounded-bl-full" />
          </div>

          {/* Section title */}
          <div className="flex items-center gap-3 mb-8">
            <HeartIcon className="w-6 h-6 text-primary" />
            <h2 className="font-romantic text-3xl md:text-4xl text-foreground">My Apology to You</h2>
          </div>

          {/* Letter content */}
          <div className="font-elegant text-lg md:text-xl leading-relaxed text-foreground/90 space-y-6">
            <p className="first-letter:text-5xl first-letter:font-romantic first-letter:text-primary first-letter:float-left first-letter:mr-3 first-letter:mt-1">
              Dearest Parisikha,
            </p>
            
            <p>
              I've been carrying these words in my heart, searching for the courage to let them out. 
              I know I've hurt you, and I want you to know that I see it—every moment where I fell short, 
              every time my actions didn't match the love I feel for you.
            </p>

            <p>
              I'm not here to make excuses or justify anything. I'm here to own my mistakes fully and 
              completely. You deserved better from me, and I failed to give you that. For that, I am 
              deeply and truly sorry.
            </p>

            <p>
              The pain I've caused you weighs heavily on my heart. If I could go back and choose 
              differently, I would. But since I can't, I want you to know that I'm choosing to 
              learn from this. I'm choosing to grow. I'm choosing to become someone worthy of 
              your beautiful heart.
            </p>

            <p>
              You mean more to me than my pride, more than being right, more than anything else 
              I thought mattered. I see that now with painful clarity.
            </p>

            <p className="italic text-primary/80">
              Please know that this apology isn't about asking for anything in return. It's simply 
              about telling you the truth: I was wrong, I am sorry, and you matter to me more 
              than words could ever express.
            </p>
          </div>

          {/* Signature */}
          <div className="mt-10 text-right">
            <p className="font-romantic text-2xl text-primary">With all my heart,</p>
            <p className="font-romantic text-3xl text-foreground mt-2">— Yours, always</p>
          </div>

          {/* Bottom decorative element */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 opacity-40">
            <HeartIcon className="w-3 h-3 text-lilac" />
            <HeartIcon className="w-4 h-4 text-primary" />
            <HeartIcon className="w-3 h-3 text-rose" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApologySection;
