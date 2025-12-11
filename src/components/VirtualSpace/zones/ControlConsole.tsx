import { useEffect, useState } from "react";
import { Power, Activity, Wifi, Shield, Terminal, Gauge } from "lucide-react";

interface ControlConsoleProps {
  isActive: boolean;
}

const ControlConsole = ({ isActive }: ControlConsoleProps) => {
  const [visible, setVisible] = useState(false);
  const [systemLogs, setSystemLogs] = useState<string[]>([]);
  const [effectsEnabled, setEffectsEnabled] = useState(true);
  const [powerLevel, setPowerLevel] = useState(75);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (isActive) {
      const t = setTimeout(() => setVisible(true), 200);
      return () => clearTimeout(t);
    } else {
      setVisible(false);
    }
  }, [isActive]);

  const addLog = (msg: string) => {
    const ts = new Date().toLocaleTimeString("en-US", { hour12: false });
    setSystemLogs((prev) => [`[${ts}] ${msg}`, ...prev.slice(0, 5)]);
  };

  useEffect(() => {
    if (isActive && systemLogs.length === 0) {
      addLog("CONSOLE: Interface initialized");
      addLog("SYSTEM: Awaiting user input…");
    }
  }, [isActive]);

  const toggleEffects = () => {
    const enabled = !effectsEnabled;
    setEffectsEnabled(enabled);
    addLog(enabled ? "EFFECTS_MODULE: Activated" : "EFFECTS_MODULE: Disabled");
  };

  const boostPower = () => {
    const newPower = Math.min(powerLevel + 10, 100);
    setPowerLevel(newPower);
    addLog(`POWER_CORE: Increased to ${newPower}%`);
  };

  const runSystemCheck = () => {
    setShowPopup(true);
    addLog("SYSTEM_CHECK: Running diagnostics…");
    setTimeout(() => addLog("SYSTEM_CHECK: All systems nominal ✓"), 900);
  };

  return (
    <section className="virtualspace-scope zone-section">

      {/* Outer wrapper */}
      <div className={`console-wrapper ${!effectsEnabled ? "console-grayscale" : ""}`}>

        {/* Header */}
        <div className={`console-header ${visible ? "" : "hidden"}`}>
          <h2 className="console-title">CONTROL CONSOLE</h2>
          <p className="console-subtitle">
            System control interface • Interactive commands
          </p>
        </div>

        {/* GRID */}
        <div className="console-grid">

          {/* STATUS PANEL */}
          <div className={`status-panel ${visible ? "" : "hidden"}`}>
            <div className="status-title">
              <Activity size={18} /> System Status
            </div>

            <div className="status-row">
              <span className="status-label"><Wifi size={14}/> Neural Link</span>
              <span className="status-value">Connected</span>
            </div>

            <div className="status-row">
              <span className="status-label"><Shield size={14}/> Security</span>
              <span className="status-value">Active</span>
            </div>

            <div className="status-row">
              <span className="status-label"><Gauge size={14}/> Power Core</span>
              <span className="status-value">{powerLevel}%</span>
            </div>

            {/* POWER BAR */}
            <div className="power-bar-labels">
              <span>Power Level</span>
              <span>{powerLevel}%</span>
            </div>
            <div className="power-bar-track">
              <div
                className="power-bar-fill"
                style={{ width: `${powerLevel}%` }}
              />
            </div>
          </div>

          {/* CONTROL PANEL */}
          <div className={`control-panel ${visible ? "" : "hidden"}`}>
            <div className="control-title">
              <Power size={18}/> Controls
            </div>

            {/* TOGGLE EFFECTS */}
            <div
              className={`toggle-btn ${effectsEnabled ? "" : "off"}`}
              onClick={toggleEffects}
            >
              <span>Visual Effects</span>

              <div className={`toggle-switch ${effectsEnabled ? "" : "off"}`}>
                <div className={`toggle-knob ${effectsEnabled ? "on" : ""}`} />
              </div>
            </div>

            {/* BOOST BUTTON */}
            <button
              onClick={boostPower}
              disabled={powerLevel >= 100}
              className="boost-btn"
            >
              Boost Power +10%
            </button>

            {/* SYSTEM CHECK */}
            <button
              onClick={runSystemCheck}
              className="syscheck-btn"
            >
              Run System Check
            </button>
          </div>

          {/* TERMINAL LOG */}
          <div className={`terminal-panel ${visible ? "" : "hidden"}`}>
            <div className="terminal-title">
              <Terminal size={18}/> System Log
            </div>

            <div className="terminal-logbox">
              {systemLogs.map((msg, i) => (
                <div key={i} className={i === 0 ? "log-latest" : ""}>
                  {msg}
                </div>
              ))}

              <div style={{ display: "flex", alignItems: "center" }}>
                › <div className="terminal-cursor" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* POPUP */}
      {showPopup && (
        <div className="popup-backdrop" onClick={() => setShowPopup(false)}>
          <div className="popup-panel" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">System Diagnostic</h3>

            <div className="popup-status-row">
              <span>Core Systems</span>
              <span className="popup-status-value">Operational</span>
            </div>

            <div className="popup-status-row">
              <span>Memory Banks</span>
              <span className="popup-status-value">98% Available</span>
            </div>

            <div className="popup-status-row">
              <span>Network Status</span>
              <span className="popup-status-value">Secure</span>
            </div>

            <div className="popup-status-row">
              <span>Power Grid</span>
              <span className="popup-status-value">Stable</span>
            </div>

            <button
              className="popup-close-btn"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

    </section>
  );
};

export default ControlConsole;