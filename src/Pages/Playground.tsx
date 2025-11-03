import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GravityPlayground from "../components/GravityPlayground";
import AiMoodBoard from "../components/AiMoodBoard";
import MiniSandbox from "../components/MiniSandbox";
import MoodOrb from "../components/MoodOrb";
import OrbitPlanets from "../components/OrbitPlanets";
import ParticleMood from "../components/ParticleMood";
import DevStatsDashboard from "../components/DevStatsDashboard";

export default function Playground() {
  const components = [
    { id: 0, element: <GravityPlayground />, title: "Gravity Playground" },
    { id: 1, element: <AiMoodBoard />, title: "AI Mood Board" },
    { id: 2, element: <MiniSandbox />, title: "Mini Creative Sandbox" },
    { id: 3, element: <MoodOrb />, title: "Mood Orb" },
    { id: 4, element: <OrbitPlanets />, title: "Orbit Planets" },
    { id: 5, element: <ParticleMood />, title: "Particle Mood" },
    { id: 6, element: <DevStatsDashboard />, title: "Dev Stats Dashboard" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % components.length);
  const prev = () =>
    setCurrentIndex((prev) => (prev - 1 + components.length) % components.length);

  const currentComponent = components[currentIndex];

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white p-8 overflow-hidden">
      <h1 className="text-4xl font-bold mb-4">Playground</h1>
      <p className="text-lg text-gray-300 mb-8 text-center max-w-xl">
        Bienvenue dans mon petit espace d’expérimentation front-end 🎨 <br />
        Ici, je teste des idées visuelles, des animations et des interactions amusantes.
      </p>

      {/* Carrousel principal */}
      <div className="relative w-full max-w-5xl h-[600px] bg-slate-800/40 backdrop-blur-md rounded-2xl border border-slate-700 shadow-2xl overflow-hidden flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentComponent.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full h-full flex items-center justify-center p-8"
          >
            {currentComponent.element}
          </motion.div>
        </AnimatePresence>

        {/* Flèche gauche (SVG stylée) */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full border border-indigo-400 text-indigo-300 hover:text-white hover:border-indigo-300 hover:shadow-[0_0_15px_rgba(99,102,241,0.7)] transition-all duration-300"
          aria-label="Précédent"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.2}
            stroke="currentColor"
            className="w-7 h-7"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Flèche droite (SVG stylée) */}
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full border border-indigo-400 text-indigo-300 hover:text-white hover:border-indigo-300 hover:shadow-[0_0_15px_rgba(99,102,241,0.7)] transition-all duration-300"
          aria-label="Suivant"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.2}
            stroke="currentColor"
            className="w-7 h-7"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Nom de la slide */}
      <h2 className="mt-8 text-2xl font-semibold text-indigo-300">
        {currentComponent.title}
      </h2>

      {/* Petits indicateurs de position */}
      <div className="flex gap-2 mt-4">
        {components.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all ${i === currentIndex
                ? "bg-indigo-400 scale-125 shadow-[0_0_8px_rgba(99,102,241,0.7)]"
                : "bg-slate-500 scale-100"
              }`}
          />
        ))}
      </div>
    </main>
  );
}