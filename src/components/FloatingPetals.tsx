import { useEffect, useState } from 'react';

interface Petal {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
  type: 'petal' | 'glow' | 'star';
}

const FloatingPetals = () => {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const items: Petal[] = [];
    // Rose petals
    for (let i = 0; i < 12; i++) {
      items.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: 18 + Math.random() * 15,
        size: 14 + Math.random() * 18,
        opacity: 0.4 + Math.random() * 0.4,
        type: 'petal',
      });
    }
    // Floating glowing orbs
    for (let i = 12; i < 18; i++) {
      items.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 20 + Math.random() * 15,
        size: 4 + Math.random() * 8,
        opacity: 0.3 + Math.random() * 0.5,
        type: 'glow',
      });
    }
    // Twinkling stars
    for (let i = 18; i < 35; i++) {
      items.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 6,
        duration: 2 + Math.random() * 4,
        size: 1 + Math.random() * 3,
        opacity: 0.2 + Math.random() * 0.6,
        type: 'star',
      });
    }
    setPetals(items);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {petals.map((item) => {
        if (item.type === 'petal') {
          return (
            <div
              key={item.id}
              className="absolute animate-petal"
              style={{
                left: `${item.left}%`,
                animationDelay: `${item.delay}s`,
                animationDuration: `${item.duration}s`,
              }}
            >
              <svg
                width={item.size}
                height={item.size * 1.3}
                viewBox="0 0 20 26"
                style={{ opacity: item.opacity }}
              >
                <defs>
                  <linearGradient id={`pg${item.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(340, 65%, 60%)" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="hsl(15, 60%, 65%)" stopOpacity="0.6" />
                  </linearGradient>
                </defs>
                <ellipse cx="10" cy="13" rx="8" ry="12" fill={`url(#pg${item.id})`} transform="rotate(-20 10 13)" />
                <ellipse cx="10" cy="13" rx="5" ry="10" fill="hsla(340, 50%, 70%, 0.3)" transform="rotate(-20 10 13)" />
              </svg>
            </div>
          );
        }

        if (item.type === 'glow') {
          return (
            <div
              key={item.id}
              className="absolute animate-float-up"
              style={{
                left: `${item.left}%`,
                animationDelay: `${item.delay}s`,
                animationDuration: `${item.duration}s`,
              }}
            >
              <div
                className="rounded-full"
                style={{
                  width: item.size,
                  height: item.size,
                  background: `radial-gradient(circle, hsla(15, 60%, 65%, ${item.opacity}) 0%, hsla(340, 65%, 55%, ${item.opacity * 0.5}) 50%, transparent 100%)`,
                  boxShadow: `0 0 ${item.size * 2}px hsla(15, 60%, 60%, ${item.opacity * 0.4})`,
                }}
              />
            </div>
          );
        }

        // Stars
        return (
          <div
            key={item.id}
            className="absolute rounded-full animate-twinkle"
            style={{
              left: `${item.left}%`,
              top: `${(item.id * 37) % 100}%`,
              width: item.size,
              height: item.size,
              backgroundColor: `hsla(30, 50%, 85%, ${item.opacity})`,
              animationDelay: `${item.delay}s`,
              animationDuration: `${item.duration}s`,
              boxShadow: `0 0 ${item.size * 3}px hsla(30, 50%, 85%, ${item.opacity * 0.5})`,
            }}
          />
        );
      })}

      {/* Large ambient glowing orbs */}
      <div
        className="absolute rounded-full animate-glow-breathe"
        style={{
          left: '10%', top: '20%',
          width: 300, height: 300,
          background: 'radial-gradient(circle, hsla(340, 65%, 50%, 0.06) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute rounded-full animate-glow-breathe"
        style={{
          right: '5%', top: '50%',
          width: 400, height: 400,
          background: 'radial-gradient(circle, hsla(15, 60%, 55%, 0.05) 0%, transparent 70%)',
          animationDelay: '2.5s',
        }}
      />
      <div
        className="absolute rounded-full animate-glow-breathe"
        style={{
          left: '30%', bottom: '10%',
          width: 350, height: 350,
          background: 'radial-gradient(circle, hsla(280, 40%, 50%, 0.04) 0%, transparent 70%)',
          animationDelay: '5s',
        }}
      />
    </div>
  );
};

export default FloatingPetals;
