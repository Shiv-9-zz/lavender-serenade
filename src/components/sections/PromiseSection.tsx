import HeartIcon from '../HeartIcon';

const promises = [
  "To listen more and assume less",
  "To choose patience over pride",
  "To show up, even when it's hard",
  "To communicate with kindness",
  "To keep choosing you, every single day"
];

const PromiseSection = () => {
  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-3xl mx-auto">
        <div className="glass-card p-8 md:p-12 lg:p-16 relative overflow-hidden">
          {/* Shimmer effect */}
          <div className="absolute inset-0 animate-shimmer opacity-50" />
          
          {/* Content */}
          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-12">
              <HeartIcon className="w-10 h-10 text-primary mx-auto mb-4 animate-heartbeat" />
              <h2 className="font-romantic text-4xl md:text-5xl text-foreground mb-4">
                My Promise to You
              </h2>
              <p className="font-elegant text-lg text-muted-foreground max-w-lg mx-auto">
                I can't promise perfection, but I can promise growth. I can promise to try harder, 
                love deeper, and be more present.
              </p>
            </div>

            {/* Promise list */}
            <div className="space-y-6">
              {promises.map((promise, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/30 backdrop-blur-sm border border-white/20 hover:bg-white/40 transition-all duration-300 group"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                    <HeartIcon className="w-4 h-4 text-primary" />
                  </div>
                  <p className="font-elegant text-lg md:text-xl text-foreground">
                    {promise}
                  </p>
                </div>
              ))}
            </div>

            {/* Footer message */}
            <div className="mt-12 text-center">
              <p className="font-elegant text-xl text-muted-foreground italic">
                "I'm not perfect, but for you, Parisikha, I'll always try."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromiseSection;
