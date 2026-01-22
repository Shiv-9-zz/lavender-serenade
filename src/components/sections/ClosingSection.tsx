import HeartIcon from '../HeartIcon';

const ClosingSection = () => {
  return (
    <section className="py-24 px-4 relative">
      <div className="max-w-4xl mx-auto text-center">
        {/* Decorative hearts */}
        <div className="flex justify-center gap-4 mb-8">
          {[...Array(7)].map((_, i) => (
            <HeartIcon
              key={i}
              className={`text-primary animate-float ${
                i === 3 ? 'w-8 h-8' : i === 2 || i === 4 ? 'w-6 h-6 opacity-70' : 'w-4 h-4 opacity-40'
              }`}
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>

        {/* Main closing message */}
        <h2 className="font-romantic text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 text-glow">
          Parisikha, you matter to me
          <br />
          <span className="text-primary">more than my pride.</span>
        </h2>

        {/* Subtext */}
        <p className="font-elegant text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto italic">
          Whenever you need reassurance, warmth, or comfort—come back here. 
          This space will always be yours.
        </p>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <HeartIcon className="w-6 h-6 text-rose animate-heartbeat" />
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        </div>

        {/* Signature */}
        <div className="glass-card inline-block px-12 py-8 glow-soft">
          <p className="font-elegant text-lg text-muted-foreground mb-2">Always choosing you,</p>
          <p className="font-romantic text-4xl md:text-5xl gradient-text">— With love, always</p>
        </div>

        {/* Final hearts */}
        <div className="mt-16 flex justify-center gap-2">
          <HeartIcon className="w-4 h-4 text-lilac animate-gentle-pulse" />
          <HeartIcon className="w-5 h-5 text-primary animate-gentle-pulse delay-200" />
          <HeartIcon className="w-6 h-6 text-rose animate-gentle-pulse delay-400" />
          <HeartIcon className="w-5 h-5 text-primary animate-gentle-pulse delay-600" />
          <HeartIcon className="w-4 h-4 text-lilac animate-gentle-pulse delay-800" />
        </div>

        {/* Copyright / footer note */}
        <p className="mt-16 font-elegant text-sm text-muted-foreground/60">
          Made with love, just for you 💜
        </p>
      </div>
    </section>
  );
};

export default ClosingSection;
