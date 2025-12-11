import { useEffect, useRef, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  hue: number;
}

const ParticleSystem = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePos, setMousePos] = useState({ x: -9999, y: -9999 });
  const animationRef = useRef<number | null>(null);

  const PARTICLE_COUNT = 50;

  // Initialize particles
  useEffect(() => {
    const arr: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      arr.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 4 + 2,
        opacity: Math.random() * 0.5 + 0.3,
        hue: Math.random() * 60 + 180, // cyan > purple shades
      });
    }
    setParticles(arr);
  }, []);

  // Track mouse
  useEffect(() => {
    const handle = (e: MouseEvent) =>
      setMousePos({ x: e.clientX, y: e.clientY });

    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  // Animate
  useEffect(() => {
    const animate = () => {
      setParticles((prev) =>
        prev.map((p) => {
          let { x, y, vx, vy } = p;

          const dx = mousePos.x - x;
          const dy = mousePos.y - y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150 && dist > 0) {
            const force = (150 - dist) / 150;
            const angle = Math.atan2(dy, dx);
            vx -= Math.cos(angle) * force * 0.25;
            vy -= Math.sin(angle) * force * 0.25;
          }

          vx *= 0.98;
          vy *= 0.98;
          vx += (Math.random() - 0.5) * 0.05;
          vy += (Math.random() - 0.5) * 0.05;

          vx = Math.max(-2, Math.min(2, vx));
          vy = Math.max(-2, Math.min(2, vy));

          x += vx;
          y += vy;

          if (x < -20) x = window.innerWidth + 20;
          if (x > window.innerWidth + 20) x = -20;
          if (y < -20) y = window.innerHeight + 20;
          if (y > window.innerHeight + 20) y = -20;

          return { ...p, x, y, vx, vy };
        })
      );

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mousePos]);


  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {particles.map((p) => {
        const dist = Math.sqrt(
          (mousePos.x - p.x) ** 2 + (mousePos.y - p.y) ** 2
        );
        const glow = dist < 150 ? 1 + (150 - dist) / 120 : 1;

        return (
          <div
            key={p.id}
            className="absolute rounded-full transition-all duration-100"
            style={{
              left: p.x,
              top: p.y,
              width: p.size * glow,
              height: p.size * glow,
              transform: "translate(-50%, -50%)",
              backgroundColor: `hsla(${p.hue}, 100%, 70%, ${p.opacity})`,
              boxShadow: `
                0 0 ${6 * glow}px hsla(${p.hue}, 100%, 70%, ${p.opacity}),
                0 0 ${12 * glow}px hsla(${p.hue}, 100%, 60%, ${p.opacity * 0.5
                }),
                0 0 ${20 * glow}px hsla(${p.hue}, 100%, 50%, ${p.opacity * 0.3
                })
              `,
            }}
          />
        );
      })}
    </div>
  );
};

export default ParticleSystem;