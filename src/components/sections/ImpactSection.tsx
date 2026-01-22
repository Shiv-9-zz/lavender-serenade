import HeartIcon from '../HeartIcon';

const impacts = [
  "You make the ordinary feel magical",
  "Your laugh is my favorite sound in the world",
  "You see the good in everyone, including me",
  "Life feels more colorful when you're in it",
  "You make me want to be a better person",
  "Your love feels like coming home"
];

const ImpactSection = () => {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="font-elegant text-lg text-muted-foreground mb-4 tracking-widest uppercase">
            Because of you
          </p>
          <h2 className="font-romantic text-4xl md:text-5xl lg:text-6xl text-foreground text-glow">
            My World is Brighter
          </h2>
        </div>

        {/* Impact statements */}
        <div className="space-y-8">
          {impacts.map((impact, index) => (
            <div
              key={index}
              className="flex items-center gap-6 group"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex-shrink-0">
                <HeartIcon 
                  className="w-6 h-6 text-primary opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" 
                />
              </div>
              <p className="font-elegant text-xl md:text-2xl lg:text-3xl text-foreground/80 group-hover:text-foreground transition-colors duration-300 italic">
                "{impact}"
              </p>
            </div>
          ))}
        </div>

        {/* Decorative element */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <HeartIcon 
                key={i}
                className="w-4 h-4 text-primary/40 animate-gentle-pulse"
                style={{ animationDelay: `${i * 200}ms` }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
