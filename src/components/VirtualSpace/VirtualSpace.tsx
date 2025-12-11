import { useRef, useState, useEffect } from "react";
import ParallaxBackground from "./ParallaxBackground";
import ParticleSystem from "./ParticleSystem";
import Navigation from "./Navigation";
import WelcomeHall from "./zones/WelcomeHall";
import InteractiveGallery from "./zones/InteractiveGallery";
import ControlConsole from "./zones/ControlConsole";
import "./VirtualSpace.css";

const VirtualSpace = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentZone, setCurrentZone] = useState(0);

  const navigateToZone = (zone: number) => {
    const container = containerRef.current;
    if (!container) return;

    container.scrollTo({
      left: zone * window.innerWidth,
      behavior: "smooth",
    });

    setCurrentZone(zone);
  };

  // Scroll detection
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onScroll = () => {
      const newZone = Math.round(container.scrollLeft / window.innerWidth);
      if (newZone !== currentZone) setCurrentZone(newZone);
    };

    container.addEventListener("scroll", onScroll);
    return () => container.removeEventListener("scroll", onScroll);
  }, [currentZone]);

  // Arrow keys
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && currentZone < 2) navigateToZone(currentZone + 1);
      if (e.key === "ArrowLeft" && currentZone > 0) navigateToZone(currentZone - 1);
    };

    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [currentZone]);

  return (
    <div className="virtualspace-scope relative h-screen overflow-hidden">
      <ParallaxBackground />
      <ParticleSystem />
      <Navigation currentZone={currentZone} onNavigate={navigateToZone} />

      <div
        ref={containerRef}
        className="flex h-screen overflow-x-auto overflow-y-hidden scrollbar-hide"
        style={{
          scrollSnapType: "x mandatory",
          scrollBehavior: "smooth",
        }}
      >
        <div className="zone-section">
          <WelcomeHall isActive={currentZone === 0} />
        </div>

        <div className="zone-section">
          <InteractiveGallery isActive={currentZone === 1} />
        </div>

        <div className="zone-section">
          <ControlConsole isActive={currentZone === 2} />
        </div>
      </div>
    </div>
  );
};

export default VirtualSpace;