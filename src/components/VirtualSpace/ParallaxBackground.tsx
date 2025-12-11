import { useEffect, useState } from "react";

const ParallaxBackground = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">

      {/* GRID BACKGROUND */}
      <div className="grid-bg absolute inset-0 opacity-30" />

      {/* ORB 1 */}
      <div
        className="parallax-shape w-96 h-96 absolute top-1/4 -left-20 bg-primary"
        style={{
          transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`,
        }}
      />

      {/* ORB 2 */}
      <div
        className="parallax-shape w-80 h-80 absolute bottom-1/4 right-10 bg-secondary animate-float-delayed"
        style={{
          transform: `translate(${mousePos.x * -0.3}px, ${mousePos.y * -0.3}px)`,
        }}
      />

      {/* ORB 3 */}
      <div
        className="parallax-shape w-64 h-64 absolute top-1/2 left-1/3 bg-neon-pink animate-float"
        style={{
          transform: `translate(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px)`,
        }}
      />

      {/* FLOATING PARTICLES */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-primary/40 animate-float"
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 3) * 25}%`,
            animationDelay: `${i * 0.5}s`,
            transform: `translate(${mousePos.x * (0.2 + i * 0.1)}px, ${mousePos.y * (0.2 + i * 0.1)
              }px)`,
          }}
        />
      ))}

      {/* SCANLINE */}
      <div className="scan-line" />
    </div>
  );
};

export default ParallaxBackground;