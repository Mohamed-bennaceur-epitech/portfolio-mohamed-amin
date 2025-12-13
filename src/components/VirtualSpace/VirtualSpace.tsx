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
  const [isMobile, setIsMobile] = useState(false);
  const [overlayOpen, setOverlayOpen] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const navigateToZone = (zone: number) => {
    if (overlayOpen) return;

    setCurrentZone(zone);

    if (!isMobile && containerRef.current) {
      containerRef.current.scrollTo({
        left: zone * window.innerWidth,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (isMobile) return;
    const container = containerRef.current;
    if (!container) return;

    const onScroll = () => {
      const newZone = Math.round(container.scrollLeft / window.innerWidth);
      if (newZone !== currentZone) setCurrentZone(newZone);
    };

    container.addEventListener("scroll", onScroll);
    return () => container.removeEventListener("scroll", onScroll);
  }, [currentZone, isMobile]);

  return (
    <div className="virtualspace-scope relative min-h-screen overflow-x-hidden">
      <ParallaxBackground />
      <ParticleSystem />

      <Navigation
        currentZone={currentZone}
        onNavigate={navigateToZone}
        disabled={overlayOpen}
      />

      {!isMobile && (
        <div
          ref={containerRef}
          className="flex h-screen overflow-x-auto overflow-y-hidden scrollbar-hide"
          style={{ scrollSnapType: "x mandatory" }}
        >
          <div className="zone-section">
            <WelcomeHall isActive={currentZone === 0} />
          </div>

          <div className="zone-section">
            <InteractiveGallery
              isActive={currentZone === 1}
              onPopupChange={setOverlayOpen}
            />
          </div>

          <div className="zone-section">
            <ControlConsole
              isActive={currentZone === 2}
              onPopupChange={setOverlayOpen}
            />
          </div>
        </div>
      )}

      {isMobile && (
        <div className="h-screen overflow-y-auto">
          {currentZone === 0 && <WelcomeHall isActive />}
          {currentZone === 1 && (
            <InteractiveGallery isActive onPopupChange={setOverlayOpen} />
          )}
          {currentZone === 2 && (
            <ControlConsole isActive onPopupChange={setOverlayOpen} />
          )}
        </div>
      )}
    </div>
  );
};

export default VirtualSpace;
