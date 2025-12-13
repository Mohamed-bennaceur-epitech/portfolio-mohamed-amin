import { useEffect, useState } from "react";
import { Activity, Power, Terminal, X } from "lucide-react";

interface ControlConsoleProps {
  isActive: boolean;
  onPopupChange?: (open: boolean) => void;
}

const ControlConsole = ({ isActive, onPopupChange }: ControlConsoleProps) => {
  const [effectsOn, setEffectsOn] = useState(true);
  const [power, setPower] = useState(75);
  const [logs, setLogs] = useState<string[]>([
    "[16:10:14] SYSTEM: Awaiting user input…",
    "[16:10:14] CONSOLE: Interface initialized",
    ">",
  ]);

  const [diagnosticOpen, setDiagnosticOpen] = useState(false);

  useEffect(() => {
    onPopupChange?.(diagnosticOpen);
  }, [diagnosticOpen, onPopupChange]);

  useEffect(() => {
    if (!isActive) setDiagnosticOpen(false);
  }, [isActive]);

  const pushLog = (line: string) => setLogs((prev) => [...prev, line]);

  const boost = () => {
    const next = Math.min(100, power + 10);
    setPower(next);
    pushLog(`[${new Date().toLocaleTimeString()}] POWER_CORE: Boost applied (+10%)`);
  };

  const runCheck = () => {
    pushLog(`[${new Date().toLocaleTimeString()}] SYSTEM_CHECK: Running diagnostics…`);
    setDiagnosticOpen(true);
    setTimeout(() => {
      pushLog(`[${new Date().toLocaleTimeString()}] SYSTEM_CHECK: All systems nominal ✓`);
    }, 600);
  };

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center px-4 pb-10 pt-28">
      <div className="w-full max-w-5xl">
        <h2 className="text-center font-semibold tracking-widest text-3xl sm:text-5xl text-cyan-200 drop-shadow-[0_0_25px_rgba(34,211,238,0.25)]">
          CONTROL CONSOLE
        </h2>
        <p className="mt-3 text-center text-white/60">
          System control interface • Interactive commands
        </p>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* System status */}
          <div className="rounded-3xl border border-cyan-400/15 bg-black/30 backdrop-blur-xl p-5 shadow-[0_0_40px_rgba(34,211,238,0.08)]">
            <div className="flex items-center gap-2 text-cyan-200 font-semibold">
              <Activity size={18} />
              <span>System Status</span>
            </div>

            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between text-white/70">
                <span>Neural Link</span>
                <span className="text-cyan-200 font-semibold">Connected</span>
              </div>
              <div className="flex items-center justify-between text-white/70">
                <span>Security</span>
                <span className="text-cyan-200 font-semibold">Active</span>
              </div>
              <div className="flex items-center justify-between text-white/70">
                <span>Power Core</span>
                <span className="text-cyan-200 font-semibold">{power}%</span>
              </div>

              <div className="pt-2">
                <div className="flex items-center justify-between text-white/50 text-xs">
                  <span>Power Level</span>
                  <span>{power}%</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-indigo-400 to-fuchsia-500"
                    style={{ width: `${power}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="rounded-3xl border border-cyan-400/15 bg-black/30 backdrop-blur-xl p-5 shadow-[0_0_40px_rgba(34,211,238,0.08)]">
            <div className="flex items-center gap-2 text-cyan-200 font-semibold">
              <Power size={18} />
              <span>Controls</span>
            </div>

            <div className="mt-5 space-y-4">
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <span className="text-white/80">Visual Effects</span>
                <button
                  type="button"
                  onClick={() => {
                    const next = !effectsOn;
                    setEffectsOn(next);
                    pushLog(
                      `[${new Date().toLocaleTimeString()}] EFFECTS_MODULE: ${
                        next ? "Activated" : "Disabled"
                      }`
                    );
                  }}
                  className={[
                    "relative h-7 w-12 rounded-full transition",
                    effectsOn ? "bg-cyan-400/90" : "bg-white/20",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "absolute top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-black/60 border border-white/10 transition",
                      effectsOn ? "left-6" : "left-1",
                    ].join(" ")}
                  />
                </button>
              </div>

              <button
                type="button"
                onClick={boost}
                className="w-full rounded-2xl border border-indigo-400/20 bg-indigo-500/15 px-4 py-3 text-indigo-200 font-semibold hover:bg-indigo-500/20 transition"
              >
                Boost Power +10%
              </button>

              <button
                type="button"
                onClick={runCheck}
                className="w-full rounded-2xl border border-fuchsia-400/20 bg-fuchsia-500/15 px-4 py-3 text-fuchsia-200 font-semibold hover:bg-fuchsia-500/20 transition"
              >
                Run System Check
              </button>
            </div>
          </div>

          {/* System log */}
          <div className="rounded-3xl border border-cyan-400/15 bg-black/30 backdrop-blur-xl p-5 shadow-[0_0_40px_rgba(34,211,238,0.08)]">
            <div className="flex items-center gap-2 text-cyan-200 font-semibold">
              <Terminal size={18} />
              <span>System Log</span>
            </div>

            <div className="mt-4 h-56 overflow-auto rounded-2xl border border-white/10 bg-black/40 p-4 font-mono text-xs text-cyan-200/90">
              {logs.map((l, i) => (
                <div key={i} className="whitespace-pre-wrap leading-relaxed">
                  {l}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Diagnostic popup */}
      {diagnosticOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <button
            type="button"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setDiagnosticOpen(false)}
          />

          <div className="relative w-full max-w-xl rounded-3xl border border-cyan-400/20 bg-black/45 backdrop-blur-xl p-6 shadow-[0_0_55px_rgba(34,211,238,0.14)]">
            <button
              type="button"
              onClick={() => setDiagnosticOpen(false)}
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
              aria-label="Close"
            >
              <X className="text-white/80" size={18} />
            </button>

            <h3 className="text-3xl font-semibold text-cyan-200 drop-shadow-[0_0_18px_rgba(34,211,238,0.18)]">
              System Diagnostic
            </h3>

            <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
              <div className="text-white/60">
                <div>Core Systems</div>
                <div>Data Banks</div>
                <div>Network Status</div>
                <div>Power Grid</div>
              </div>
              <div className="text-cyan-200 font-semibold text-right">
                <div>Operational</div>
                <div>98% Available</div>
                <div>Secure</div>
                <div>Stable</div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setDiagnosticOpen(false)}
              className="mt-8 w-full rounded-2xl bg-cyan-400 px-4 py-3 font-semibold text-black hover:bg-cyan-300 transition"
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
