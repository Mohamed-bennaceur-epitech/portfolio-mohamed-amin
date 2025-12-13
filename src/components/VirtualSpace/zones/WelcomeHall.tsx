import { useEffect, useState } from "react";

interface WelcomeHallProps {
  isActive: boolean;
}

const WelcomeHall = ({ isActive }: WelcomeHallProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section className="zone-section virtualspace-scope relative flex justify-center overflow-hidden px-4 py-16">
      <div className="welcome-panel max-w-xl w-full text-center">
        <h1
          className="welcome-title"
          style={{
            fontSize: isMobile ? "2.5rem" : undefined,
            lineHeight: isMobile ? "1.1" : undefined,
          }}
        >
          WELCOME
        </h1>

        <p
          className="welcome-sub"
          style={{
            fontSize: isMobile ? "1rem" : undefined,
          }}
        >
          to the Mini Virtual Space
        </p>

        <p
          className="welcome-desc"
          style={{
            fontSize: isMobile ? "0.9rem" : undefined,
          }}
        >
          Exploring immersive interactions on the Web — just for fun.
          <br />
          <span className="text-muted-foreground/60 text-sm">
            Scroll or use navigation to explore →
          </span>
        </p>

        <div className="glass-panel inline-flex items-center gap-4 px-5 py-3 mx-auto mt-6">
          <span
            className="text-muted-foreground font-medium"
            style={{
              fontSize: isMobile ? "0.85rem" : undefined,
            }}
          >
            System initialized • Ready to explore
          </span>
        </div>
      </div>
    </section>
  );
};

export default WelcomeHall;