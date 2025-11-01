import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PlaygroundPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const showTimer = setTimeout(() => setIsVisible(true), 1500);
    const hideTimer = setTimeout(() => setIsVisible(false), 16000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const handleClick = () => {
    navigate("/playground");
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={
          isVisible
            ? { opacity: 1, x: 0 }
            : { opacity: 0, x: 100 }
        }
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-4 rounded-xl shadow-2xl cursor-pointer hover:scale-105 transition-transform"
        onClick={handleClick}
      >
        <p className="font-semibold">🎮 Tu veux voir mon terrain de jeux ?</p>
      </motion.div>
    </>
  );
}
