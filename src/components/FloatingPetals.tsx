import { useEffect, useState } from 'react';

interface Star {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
  top: number;
}

const FloatingPetals = () => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generated: Star[] = [];
    for (let i = 0; i < 20; i++) {
      generated.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 3 + Math.random() * 5,
        size: 1 + Math.random() * 3,
        opacity: 0.2 + Math.random() * 0.6,
      });
    }
    setStars(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Twinkling stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full animate-twinkle"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: `hsla(38, ${50 + Math.random() * 30}%, ${65 + Math.random() * 25}%, ${star.opacity})`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}
      
      {/* Ambient glow spots */}
      {[...Array(3)].map((_, i) => (
        <div
          key={`glow-${i}`}
          className="absolute rounded-full animate-gentle-pulse"
          style={{
            left: `${15 + i * 30}%`,
            top: `${25 + (i % 2) * 40}%`,
            width: `${120 + i * 40}px`,
            height: `${120 + i * 40}px`,
            background: `radial-gradient(circle, hsla(38, 65%, 55%, 0.04) 0%, transparent 70%)`,
            animationDelay: `${i * 1.5}s`,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingPetals;
