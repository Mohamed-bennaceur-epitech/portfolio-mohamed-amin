import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GravityPlayground from "../components/GravityPlayground";
import AiMoodBoard from "../components/AiMoodBoard";
import MiniSandbox from "../components/MiniSandbox";
import DevStatsDashboard from "../components/DevStatsDashboard";
import OrbitPlanets from "../components/OrbitPlanets";
import ParticleMood from "../components/ParticleMood";

export default function Playground() {
  const components = [
    { id: 0, element: <GravityPlayground />, title: "Gravity Playground" },
    { id: 1, element: <AiMoodBoard />, title: "AI Mood Board" },
    { id: 2, element: <MiniSandbox />, title: "Mini Creative Sandbox" },
    { id: 3, element: <OrbitPlanets />, title: "Orbit Planets" },
    { id: 4, element: <ParticleMood />, title: "Particle Mood" },
    { id: 5, element: <DevStatsDashboard />, title: "Dev Stats Dashboard" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const next = () => setCurrentIndex((prev) => (prev + 1) % components.length);
  const prev = () =>
    setCurrentIndex((prev) => (prev - 1 + components.length) % components.length);

  const current = components[currentIndex];

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white p-4 sm:p-8 overflow-x-hidden overflow-y-auto">
      <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">Playground</h1>
      <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8 text-center max-w-xl">
        Bienvenue dans mon petit espace d’expérimentation front-end 🎨 <br />
        Ici, je teste des idées visuelles, des animations et des interactions amusantes.
      </p>

      {/* Carrousel */}
      <div className="relative w-full max-w-[950px] rounded-2xl border border-slate-700 shadow-2xl overflow-hidden bg-slate-800/30 backdrop-blur-md flex items-center justify-center h-[540px] sm:h-[640px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className="w-full h-full flex items-center justify-center overflow-y-auto p-4 sm:p-6"
          >
            {current.element}
          </motion.div>
        </AnimatePresence>

        {/* Flèche gauche */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-indigo-500/30 hover:bg-indigo-500/50 border border-indigo-300/30 rounded-full p-2 sm:p-3 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Flèche droite */}
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-indigo-500/30 hover:bg-indigo-500/50 border border-indigo-300/30 rounded-full p-2 sm:p-3 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <h2 className="mt-6 sm:mt-8 text-xl sm:text-2xl font-semibold text-indigo-300">{current.title}</h2>

      {/* Indicateurs */}
      <div className="flex gap-2 mt-3">
        {components.map((_, i) => (
          <div
            key={i}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i === currentIndex ? "bg-indigo-400 scale-125" : "bg-slate-500"
            }`}
          />
        ))}
      </div>
    </main>
  );
}
