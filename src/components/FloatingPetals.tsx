import { useEffect, useState } from 'react';

interface Petal {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
}

const FloatingPetals = () => {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const generatePetals = () => {
      const newPetals: Petal[] = [];
      for (let i = 0; i < 10; i++) {
        newPetals.push({
          id: i,
          left: Math.random() * 100,
          delay: Math.random() * 10,
          duration: 15 + Math.random() * 20,
          size: 10 + Math.random() * 20,
          opacity: 0.3 + Math.random() * 0.5,
        });
      }
      setPetals(newPetals);
    };

    generatePetals();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute animate-petal"
          style={{
            left: `${petal.left}%`,
            animationDelay: `${petal.delay}s`,
            animationDuration: `${petal.duration}s`,
          }}
        >
          <svg
            width={petal.size}
            height={petal.size}
            viewBox="0 0 24 24"
            fill="none"
            style={{ opacity: petal.opacity }}
          >
            <ellipse
              cx="12"
              cy="12"
              rx="8"
              ry="12"
              fill="url(#petalGradient)"
              transform="rotate(-30 12 12)"
            />
            <defs>
              <linearGradient id="petalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(280, 60%, 85%)" />
                <stop offset="100%" stopColor="hsl(270, 50%, 75%)" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      ))}
      
      {/* Ambient glow particles */}
      {[...Array(4)].map((_, i) => (
        <div
          key={`glow-${i}`}
          className="absolute rounded-full animate-gentle-pulse"
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 3) * 30}%`,
            width: `${100 + i * 30}px`,
            height: `${100 + i * 30}px`,
            background: `radial-gradient(circle, hsla(270, 60%, 80%, 0.15) 0%, transparent 70%)`,
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingPetals;
