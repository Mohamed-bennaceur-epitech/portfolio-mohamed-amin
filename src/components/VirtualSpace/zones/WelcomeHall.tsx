import { useEffect, useState } from "react";

interface WelcomeHallProps {
  isActive: boolean;
}

const WelcomeHall = ({ isActive }: WelcomeHallProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isActive) {
      const t = setTimeout(() => setVisible(true), 200);
      return () => clearTimeout(t);
    } else {
      setVisible(false);
    }
  }, [isActive]);

  return (
    <section className="zone-section virtualspace-scope relative flex items-center justify-center overflow-hidden">

      <div className="welcome-panel">
        <h1 className="welcome-title">WELCOME</h1>

        <p className="welcome-sub">
          to the Mini Virtual Space
        </p>

        <p className="welcome-desc">
          Exploring immersive interactions on the Web — just for fun.
          <br />
          <span className="text-muted-foreground/60 text-sm">
            Scroll or use navigation to explore →
          </span>
        </p>

        <div className="glass-panel inline-flex items-center gap-4 px-6 py-4 mx-auto">
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-primary animate-bounce" />
            <div className="w-2 h-2 rounded-full bg-secondary animate-bounce" />
            <div className="w-2 h-2 rounded-full bg-neon-pink animate-bounce" />
          </div>

          <span className="text-muted-foreground font-medium">
            System initialized • Ready to explore
          </span>
        </div>
      </div>

    </section>
  );
};

export default WelcomeHall;