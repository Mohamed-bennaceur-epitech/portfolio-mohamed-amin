import { useState } from "react";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";

interface NavigationProps {
  currentZone: number;
  onNavigate: (zone: number) => void;
}

const zones = [
  { id: 0, name: "Hall", icon: "🏛️" },
  { id: 1, name: "Gallery", icon: "🎨" },
  { id: 2, name: "Console", icon: "🎛️" },
];

const Navigation = ({ currentZone, onNavigate }: NavigationProps) => {
  const [teleportOpen, setTeleportOpen] = useState(false);

  const goPrev = () => currentZone > 0 && onNavigate(currentZone - 1);
  const goNext = () =>
    currentZone < zones.length - 1 && onNavigate(currentZone + 1);

  return (
    <>
      {/* TOP NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/40 backdrop-blur-xl border-b border-white/5 shadow-[0_0_20px_rgba(0,0,0,0.4)]">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">

          {/* LOGO */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
            <span className="font-display text-lg tracking-wider text-primary/90">
              VIRTUAL SPACE
            </span>
          </div>

          {/* NAV BUTTONS */}
          <div className="hidden md:flex items-center gap-3">
            {zones.map((z) => (
              <button
                key={z.id}
                onClick={() => onNavigate(z.id)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
                  transition-all duration-300
                  ${
                    currentZone === z.id
                      ? "bg-primary/20 text-primary neon-border shadow-[0_0_12px_var(--primary)]"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  }
                `}
              >
                <span>{z.icon}</span>
                {z.name}
              </button>
            ))}
          </div>

          {/* TELEPORT */}
          <div className="relative">
            <button
              onClick={() => setTeleportOpen(!teleportOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/40 bg-primary/10 text-primary hover:bg-primary/20 transition-all"
            >
              <MapPin size={16} />
              Teleport
            </button>

            {teleportOpen && (
              <div className="absolute right-0 mt-2 glass-panel p-2 min-w-[180px] animate-scale-in shadow-lg">
                {zones.map((z) => (
                  <button
                    key={z.id}
                    onClick={() => {
                      onNavigate(z.id);
                      setTeleportOpen(false);
                    }}
                    className={`
                      w-full flex items-center gap-3 px-4 py-2 rounded-lg
                      transition-all duration-200
                      ${
                        currentZone === z.id
                          ? "bg-primary/20 text-primary"
                          : "hover:bg-white/5 text-foreground"
                      }
                    `}
                  >
                    <span>{z.icon}</span>
                    {z.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* LEFT ARROW */}
      <button
        onClick={goPrev}
        disabled={currentZone === 0}
        className={`
          fixed left-6 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full glass-panel
          transition-all duration-300
          ${
            currentZone === 0
              ? "opacity-20 cursor-not-allowed"
              : "hover:bg-primary/20 hover:neon-glow"
          }
        `}
      >
        <ChevronLeft className="w-6 h-6 text-primary" />
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={goNext}
        disabled={currentZone === zones.length - 1}
        className={`
          fixed right-6 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full glass-panel
          transition-all duration-300
          ${
            currentZone === zones.length - 1
              ? "opacity-20 cursor-not-allowed"
              : "hover:bg-primary/20 hover:neon-glow"
          }
        `}
      >
        <ChevronRight className="w-6 h-6 text-primary" />
      </button>

      {/* BOTTOM DOTS */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-4">
        {zones.map((z) => (
          <button
            key={z.id}
            onClick={() => onNavigate(z.id)}
            className={`
              w-3 h-3 rounded-full transition-all duration-300
              ${
                currentZone === z.id
                  ? "bg-primary shadow-[0_0_12px_var(--primary)] scale-125"
                  : "bg-muted hover:bg-primary/50"
              }
            `}
          />
        ))}
      </div>
    </>
  );
};

export default Navigation;
