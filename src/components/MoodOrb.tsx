import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";

export default function MoodOrb() {
  const moods = [
    { name: "Calm", color: "#3b82f6", glow: "rgba(59,130,246,0.6)", pulse: 3 },
    { name: "Happy", color: "#facc15", glow: "rgba(250,204,21,0.6)", pulse: 2 },
    { name: "Angry", color: "#ef4444", glow: "rgba(239,68,68,0.6)", pulse: 1 },
    { name: "Zen", color: "#10b981", glow: "rgba(16,185,129,0.6)", pulse: 4 },
  ];

  const [index, setIndex] = useState(0);
  const color = useMotionValue(moods[0].color);
  const scale = useMotionValue(1);

  // anime la couleur à chaque changement d’humeur
  useEffect(() => {
    animate(color, moods[index].color, { duration: 0.8 });
  }, [index]);

  // petit effet de respiration continue
  useEffect(() => {
    const controls = animate(scale, [1, 1.1, 1], {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    });
    return controls.stop;
  }, []);

  const orbColor = useTransform(color, (c) => c);

  const nextMood = () => setIndex((prev) => (prev + 1) % moods.length);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full gap-8">
      <motion.div
        style={{
          backgroundColor: orbColor,
          boxShadow: `0 0 60px ${moods[index].glow}`,
          scale,
        }}
        transition={{
          duration: moods[index].pulse,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="w-56 h-56 rounded-full"
      />

      <div className="flex flex-col items-center gap-4">
        <p className="text-xl font-semibold text-indigo-200">
          Mood : <span className="text-white">{moods[index].name}</span>
        </p>
        <button
          onClick={nextMood}
          className="bg-indigo-500 hover:bg-indigo-600 px-5 py-2 rounded-lg shadow-lg transition-all duration-300"
        >
          Change Mood
        </button>
      </div>
    </div>
  );
}