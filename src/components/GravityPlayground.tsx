import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Ball {
  id: number;
  x: number;
  y: number;
  vy: number;
  vx: number;
  color: string;
}

export default function GravityPlayground() {
  const [balls, setBalls] = useState<Ball[]>([]);
  const gravity = 0.6;
  const bounce = 0.7;

  const createBall = (x: number, y: number) => {
    setBalls((prev) => [
      ...prev,
      {
        id: Date.now(),
        x,
        y,
        vy: Math.random() * -10 - 5,
        vx: (Math.random() - 0.5) * 10,
        color: `hsl(${Math.random() * 360}, 80%, 60%)`,
      },
    ]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setBalls((prev) =>
        prev.map((b) => {
          let newY = b.y + b.vy;
          let newVy = b.vy + gravity;
          let newX = b.x + b.vx;

          if (newY > 450) {
            newY = 450;
            newVy *= -bounce;
          }

          return { ...b, x: newX, y: newY, vy: newVy };
        })
      );
    }, 16);

    return () => clearInterval(interval);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    createBall(x, y);
  };

  return (
    <div
      onClick={handleClick}
      className="w-full h-full relative cursor-pointer overflow-hidden"
    >
      {balls.map((b) => (
        <motion.div
          key={b.id}
          className="absolute rounded-full shadow-lg"
          style={{
            left: b.x,
            top: b.y,
            width: 30,
            height: 30,
            backgroundColor: b.color,
          }}
          animate={{
            y: b.y,
            x: b.x,
            rotate: 360,
          }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 20,
            repeat: Infinity,
            repeatType: "reverse",
            duration: 4,
          }}
        />
      ))}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-gray-400 text-sm">
        Clique n’importe où pour créer des bulles ✨
      </div>
    </div>
  );
}
