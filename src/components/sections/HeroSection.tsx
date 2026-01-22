import HeartIcon from '../HeartIcon';

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative px-4 py-20">
      <div className="text-center max-w-4xl mx-auto">
        {/* Decorative hearts */}
        <div className="flex justify-center gap-3 mb-8 opacity-0 animate-fade-in-up">
          <HeartIcon className="w-6 h-6 text-rose animate-float" />
          <HeartIcon className="w-8 h-8 text-primary animate-float delay-200" />
          <HeartIcon className="w-6 h-6 text-lilac animate-float delay-400" />
        </div>

        {/* Main title */}
        <h1 
          className="font-romantic text-5xl md:text-7xl lg:text-8xl text-foreground mb-6 opacity-0 animate-fade-in-up delay-200 text-glow"
        >
          Parisikha, I'm Truly Sorry
        </h1>

        {/* Decorative line */}
        <div className="flex items-center justify-center gap-4 mb-8 opacity-0 animate-fade-in-up delay-300">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/50" />
          <HeartIcon className="w-4 h-4 text-primary animate-heartbeat" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/50" />
        </div>

        {/* Subtitle */}
        <p 
          className="font-elegant text-xl md:text-2xl lg:text-3xl text-muted-foreground italic max-w-2xl mx-auto leading-relaxed opacity-0 animate-fade-in-up delay-400"
        >
          This is me, trying to say what my heart feels but my words couldn't.
        </p>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in delay-700">
          <div className="flex flex-col items-center gap-2 text-muted-foreground/60">
            <span className="font-elegant text-sm tracking-widest uppercase">Scroll with love</span>
            <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
              <div className="w-1 h-2 bg-primary/60 rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
