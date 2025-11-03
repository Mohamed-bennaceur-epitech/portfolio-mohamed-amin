import { motion, useAnimationFrame } from "framer-motion";
import { useRef } from "react";

export default function OrbitPlanets() {
  const ref = useRef<HTMLDivElement>(null);
  const planets = [
    { size: 40, color: "#60a5fa", radius: 100, speed: 0.6 }, // bleue
    { size: 50, color: "#f59e0b", radius: 160, speed: 0.4 }, // jaune
    { size: 35, color: "#10b981", radius: 220, speed: 0.3 }, // verte
    { size: 45, color: "#ef4444", radius: 280, speed: 0.25 }, // rouge
  ];

  // Utilisation de Framer Motion pour une rotation continue
  useAnimationFrame((t) => {
    if (!ref.current) return;
    const elapsed = t / 1000; // temps écoulé en secondes
    const children = Array.from(ref.current.children) as HTMLElement[];

    planets.forEach((planet, i) => {
      const angle = elapsed * planet.speed * Math.PI;
      const x = Math.cos(angle + i) * planet.radius;
      const y = Math.sin(angle + i) * planet.radius;
      children[i].style.transform = `translate(${x}px, ${y}px)`;
    });
  });

  return (
    <div className="relative flex items-center justify-center h-full w-full">
      {/* Centre lumineux */}
      <motion.div
        className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 shadow-[0_0_50px_rgba(99,102,241,0.8)]"
        animate={{
          scale: [1, 1.1, 1],
          boxShadow: [
            "0 0 50px rgba(99,102,241,0.8)",
            "0 0 80px rgba(147,51,234,0.9)",
            "0 0 50px rgba(99,102,241,0.8)",
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Orbits */}
      <div ref={ref} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {planets.map((planet, i) => (
          <div
            key={i}
            className="absolute rounded-full shadow-lg"
            style={{
              width: planet.size,
              height: planet.size,
              backgroundColor: planet.color,
              boxShadow: `0 0 20px ${planet.color}`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
