import { useEffect, useState } from "react";
import { X, Sparkles, Zap, Globe, Cpu } from "lucide-react";

interface InteractiveGalleryProps {
  isActive: boolean;
}

const galleryItems = [
  {
    id: 1,
    title: "Neural Interface",
    description:
      "Connecting minds through quantum entanglement. Experience seamless data transfer between organic and digital systems.",
    icon: Cpu,
  },
  {
    id: 2,
    title: "Cosmic Gateway",
    description:
      "Portal to infinite dimensions. Navigate through space-time with precision calibrated coordinates.",
    icon: Globe,
  },
  {
    id: 3,
    title: "Energy Core",
    description:
      "Harnessing zero-point energy fields. Sustainable power for a new era.",
    icon: Zap,
  },
  {
    id: 4,
    title: "Dream Weaver",
    description:
      "Materializing imagination into reality with advanced neuro-VR synthesis.",
    icon: Sparkles,
  },
];

const InteractiveGallery = ({ isActive }: InteractiveGalleryProps) => {
  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  useEffect(() => {
    if (isActive) {
      const t = setTimeout(() => setVisible(true), 150);
      return () => clearTimeout(t);
    } else {
      setVisible(false);
    }
  }, [isActive]);

  return (
    <section className="zone-section virtualspace-scope flex items-center justify-center">
      <div className="panel">
        {/* HEADER */}
        <div
          className={`panel-title text-center transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          INTERACTIVE GALLERY
        </div>

        <div
          className={`text-muted-foreground text-center mb-10 transition-all duration-700 ${
            visible ? "opacity-100" : "opacity-0 translate-y-4"
          }`}
        >
          Hover to explore • Click to discover
        </div>

        {/* GRID */}
        <div className="panel-grid mt-6">
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              className={`card transition-all duration-700 cursor-pointer ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${index * 120}ms` }}
              onClick={() => setSelectedItem(item)}
            >
              <div className="card-title flex items-center gap-3">
                <item.icon className="w-5 h-5" />
                {item.title}
              </div>

              <div className="card-body">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="panel max-w-lg relative animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 mb-6">
              <selectedItem.icon className="w-10 h-10 text-primary" />
              <h3 className="text-2xl font-bold">{selectedItem.title}</h3>
            </div>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              {selectedItem.description}
            </p>

            <div className="flex items-center gap-2 text-sm text-muted-foreground/60">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              <span>Interactive element • Virtual Space Experience</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default InteractiveGallery;