import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

export default function MiniSandbox() {
  const [gradient, setGradient] = useState({
    x: 50,
    y: 50,
  });

  // Le fond suit la position de la souris
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGradient({ x, y });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      style={{
        background: `radial-gradient(circle at ${gradient.x}% ${gradient.y}%, rgba(99,102,241,0.3), rgba(147,51,234,0.2) 50%, rgba(30,27,75,1) 100%)`,
        transition: "background 0.1s ease-out",
      }}
      className="flex flex-col items-center justify-center w-full text-white rounded-2xl overflow-hidden p-12"
    >
      <h2 className="text-3xl font-bold mb-8">🧩 Mini Creative Sandbox</h2>
      <p className="text-gray-300 mb-10 text-center max-w-2xl">
        Une collection de petites expériences front-end interactives — juste pour
        le plaisir de créer, tester et s’amuser 🎨
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
        <EscapeButton />
        <BouncingBox />
        <LivingLoader />
      </div>
    </motion.div>
  );
}

/* ---------------------------------------------- */
/* 1️⃣ Bouton fuyant amélioré */
function EscapeButton() {
  const controls = useAnimation();
  const [position, setPosition] = useState({ top: 50, left: 50 });
  const [clicked, setClicked] = useState(false);

  const moveRandomly = () => {
    if (clicked) return;
    const minDistance = 50;
    const maxDistance = 300;
    const distance = Math.random() * (maxDistance - minDistance) + minDistance;
    const angle = Math.random() * 2 * Math.PI;

    let newX = position.left + Math.cos(angle) * (distance / 5);
    let newY = position.top + Math.sin(angle) * (distance / 5);

    if (newX < 10) newX = 10;
    if (newX > 90) newX = 90;
    if (newY < 10) newY = 10;
    if (newY > 90) newY = 90;

    setPosition({ top: newY, left: newX });

    controls.start({
      top: `${newY}%`,
      left: `${newX}%`,
      transition: { type: "spring", stiffness: 120, damping: 12 },
    });
  };

  const handleClick = () => {
    setClicked(true);
  };

  return (
    <div className="relative w-full h-60 bg-slate-800/60 backdrop-blur-md rounded-xl flex items-center justify-center overflow-hidden">
      {!clicked ? (
        <motion.button
          animate={controls}
          style={{
            position: "absolute",
            top: `${position.top}%`,
            left: `${position.left}%`,
            transform: "translate(-50%, -50%)",
          }}
          onMouseEnter={moveRandomly}
          onClick={handleClick}
          className="bg-indigo-500 text-white font-semibold px-5 py-2 rounded-lg shadow-lg select-none"
        >
          Click here !
        </motion.button>
      ) : (
        <GlitchText text="💀 Congratulations! All your data has been leaked! 💀" />
      )}
    </div>
  );
}

/* ---------------------------------------------- */
/* 🔥 Composant effet GLITCH */
function GlitchText({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: [0.6, 1, 0.8, 1],
        scale: [1, 1.02, 0.98, 1],
        x: [0, -1, 1, 0],
      }}
      transition={{
        repeat: Infinity,
        repeatType: "loop",
        duration: 0.5,
        ease: "easeInOut",
      }}
      className="relative text-red-400 font-bold text-xl text-center px-4 glitch"
    >
      {text}
      <span className="glitch-layer text-cyan-400">{text}</span>
      <span className="glitch-layer text-purple-500">{text}</span>
    </motion.div>
  );
}

/* ---------------------------------------------- */
/* 2️⃣ Carré rebondissant */
function BouncingBox() {
  const controls = useAnimation();
  const [color, setColor] = useState("bg-purple-500");

  const handleClick = async () => {
    setColor(getRandomColor());
    await controls.start({
      y: [0, -80, 0],
      transition: { duration: 0.6, ease: "easeInOut" },
    });
  };

  const getRandomColor = () => {
    const colors = [
      "bg-purple-500",
      "bg-indigo-500",
      "bg-pink-500",
      "bg-teal-500",
      "bg-yellow-500",
      "bg-red-500",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="relative w-full h-60 bg-slate-800/60 backdrop-blur-md rounded-xl flex items-center justify-center overflow-hidden">
      <motion.div
        className={`w-20 h-20 rounded-lg ${color} cursor-pointer shadow-lg`}
        animate={controls}
        whileHover={{ scale: 1.1 }}
        onClick={handleClick}
      />
    </div>
  );
}

/* ---------------------------------------------- */
/* 3️⃣ Loader vivant */
function LivingLoader() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative w-full h-60 bg-slate-800/60 backdrop-blur-md rounded-xl flex items-center justify-center overflow-hidden">
      <motion.div
        className="w-16 h-16 rounded-full border-4 border-indigo-400 border-t-transparent"
        animate={{
          rotate: 360,
          scale: hovered ? 1.3 : 1,
        }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "linear",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      />
    </div>
  );
}