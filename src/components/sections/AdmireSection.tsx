import HeartIcon from '../HeartIcon';

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
  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-romantic text-4xl md:text-5xl lg:text-6xl text-foreground mb-4 text-glow">
            What I Adore About You, Parisikha
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-primary/50" />
            <HeartIcon className="w-5 h-5 text-primary animate-heartbeat" />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-primary/50" />
          </div>
        </div>

        {/* Quality cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {qualities.map((quality, index) => (
            <div
              key={quality.title}
              className="glass-card p-6 md:p-8 group hover:scale-[1.02] transition-all duration-500 relative overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Icon */}
              <div className="text-4xl mb-4 animate-float" style={{ animationDelay: `${index * 200}ms` }}>
                {quality.icon}
              </div>

              {/* Title */}
              <h3 className="font-romantic text-2xl text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                {quality.title}
              </h3>

              {/* Description */}
              <p className="font-elegant text-muted-foreground leading-relaxed">
                {quality.description}
              </p>

              {/* Corner decoration */}
              <div className="absolute bottom-2 right-2 opacity-20 group-hover:opacity-40 transition-opacity">
                <HeartIcon className="w-8 h-8 text-primary" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdmireSection;
