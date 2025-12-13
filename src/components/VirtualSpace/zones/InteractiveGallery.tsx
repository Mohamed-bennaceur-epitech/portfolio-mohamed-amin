import { useEffect, useMemo, useState } from "react";
import { Cpu, Globe, Sparkles, Zap, X } from "lucide-react";

interface InteractiveGalleryProps {
  isActive: boolean;
  onPopupChange?: (open: boolean) => void;
}

type GalleryItem = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: any;
};

const InteractiveGallery = ({ isActive, onPopupChange }: InteractiveGalleryProps) => {
  const items = useMemo<GalleryItem[]>(
    () => [
      {
        id: "neural",
        title: "Neural Interface",
        subtitle: "Connecting minds through quantum entanglement.",
        description:
          "Experience seamless data transfer between organic and digital systems.",
        icon: Cpu,
      },
      {
        id: "cosmic",
        title: "Cosmic Gateway",
        subtitle: "Portal to infinite dimensions.",
        description:
          "Navigate through space-time with precision calibrated coordinates.",
        icon: Globe,
      },
      {
        id: "energy",
        title: "Energy Core",
        subtitle: "Harnessing zero-point energy fields.",
        description: "Sustainable power for a new era.",
        icon: Zap,
      },
      {
        id: "dream",
        title: "Dream Weaver",
        subtitle: "Materializing imagination into reality.",
        description: "Advanced neuro-VR synthesis for creative simulation.",
        icon: Sparkles,
      },
    ],
    []
  );

  const [selected, setSelected] = useState<GalleryItem | null>(null);

  useEffect(() => {
    onPopupChange?.(!!selected);
  }, [selected, onPopupChange]);

  useEffect(() => {
    if (!isActive) setSelected(null);
  }, [isActive]);

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center px-4 pb-10 pt-28">
      <div className="w-full max-w-4xl rounded-3xl border border-cyan-400/15 bg-black/30 backdrop-blur-xl p-6 shadow-[0_0_40px_rgba(34,211,238,0.10)]">
        <h2 className="text-center font-semibold tracking-widest text-3xl sm:text-5xl text-cyan-200 drop-shadow-[0_0_25px_rgba(34,211,238,0.25)]">
          INTERACTIVE GALLERY
        </h2>
        <p className="mt-3 text-center text-white/70">
          Hover to explore • Click to discover
        </p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map((it) => {
            const Icon = it.icon;
            return (
              <button
                key={it.id}
                type="button"
                onClick={() => setSelected(it)}
                className={[
                  "text-left rounded-2xl border border-white/10 bg-white/5 p-5 transition",
                  "hover:bg-white/8 hover:border-cyan-400/20",
                ].join(" ")}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/15 bg-black/30">
                    <Icon className="text-cyan-200" size={20} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-white/90 font-semibold text-lg">
                      {it.title}
                    </div>
                    <div className="mt-2 text-white/60 text-sm leading-relaxed">
                      {it.subtitle}
                      <br />
                      {it.description}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Popup */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <button
            type="button"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          />

          <div className="relative w-full max-w-lg rounded-3xl border border-cyan-400/20 bg-black/45 backdrop-blur-xl p-6 shadow-[0_0_55px_rgba(34,211,238,0.14)]">
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
              aria-label="Close"
            >
              <X className="text-white/80" size={18} />
            </button>

            <div className="flex items-start gap-3 pr-10">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/15 bg-black/30">
                <selected.icon className="text-cyan-200" size={22} />
              </div>
              <div>
                <div className="text-white/95 font-semibold text-2xl">
                  {selected.title}
                </div>
                <div className="mt-2 text-white/70 leading-relaxed">
                  {selected.subtitle} {selected.description}
                </div>
                <div className="mt-4 text-white/60 text-sm">
                  Interactive element • Virtual Space Experience
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default InteractiveGallery;
