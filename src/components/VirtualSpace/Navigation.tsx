import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";

export interface NavigationProps {
  currentZone: number;
  onNavigate: (zone: number) => void;
  disabled?: boolean;
}

const ZONES = [
  { label: "Hall", icon: "🏛️" },
  { label: "Gallery", icon: "🎨" },
  { label: "Console", icon: "🧩" },
];

const Navigation = ({ currentZone, onNavigate, disabled = false }: NavigationProps) => {
  const canGoPrev = currentZone > 0;
  const canGoNext = currentZone < ZONES.length - 1;

  const goPrev = () => {
    if (disabled || !canGoPrev) return;
    onNavigate(currentZone - 1);
  };

  const goNext = () => {
    if (disabled || !canGoNext) return;
    onNavigate(currentZone + 1);
  };

  return (
    <>
      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-40">
        <div className="mx-auto max-w-6xl px-4 py-3">
          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl px-4 py-3 shadow-[0_0_30px_rgba(0,255,255,0.08)]">
            <div className="flex items-center gap-2 text-white/90 font-semibold tracking-wide">
              <span className="inline-block h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.9)]" />
              <span>VIRTUAL SPACE</span>
            </div>

            <nav className="hidden sm:flex items-center gap-2">
              {ZONES.map((z, idx) => {
                const active = idx === currentZone;
                return (
                  <button
                    key={z.label}
                    type="button"
                    onClick={() => !disabled && onNavigate(idx)}
                    className={[
                      "flex items-center gap-2 rounded-full px-4 py-2 text-sm transition",
                      "border border-white/10 bg-white/5 hover:bg-white/10",
                      active
                        ? "bg-cyan-500/15 border-cyan-400/30 shadow-[0_0_18px_rgba(34,211,238,0.25)]"
                        : "text-white/80",
                      disabled ? "opacity-70" : "",
                    ].join(" ")}
                  >
                    <span className="opacity-90">{z.icon}</span>
                    <span className="font-medium">{z.label}</span>
                  </button>
                );
              })}
            </nav>

            <button
              type="button"
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/85 hover:bg-white/10 transition"
            >
              <MapPin size={16} className="opacity-90" />
              Teleport
            </button>
          </div>
        </div>
      </header>

      {/* Side arrows (these are the ones that must disappear on popup) */}
      <div
        className={[
          "fixed left-0 right-0 top-1/2 -translate-y-1/2 z-30 pointer-events-none",
          disabled ? "opacity-0" : "opacity-100",
        ].join(" ")}
        aria-hidden={disabled}
      >
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={goPrev}
              disabled={disabled || !canGoPrev}
              className={[
                "pointer-events-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl",
                "border border-cyan-400/20 bg-black/35 backdrop-blur-xl",
                "shadow-[0_0_22px_rgba(34,211,238,0.12)] transition",
                "hover:bg-black/45",
                (disabled || !canGoPrev) ? "opacity-30 cursor-not-allowed" : "opacity-100",
              ].join(" ")}
            >
              <ChevronLeft className="text-cyan-200" />
            </button>

            <button
              type="button"
              onClick={goNext}
              disabled={disabled || !canGoNext}
              className={[
                "pointer-events-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl",
                "border border-cyan-400/20 bg-black/35 backdrop-blur-xl",
                "shadow-[0_0_22px_rgba(34,211,238,0.12)] transition",
                "hover:bg-black/45",
                (disabled || !canGoNext) ? "opacity-30 cursor-not-allowed" : "opacity-100",
              ].join(" ")}
            >
              <ChevronRight className="text-cyan-200" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;