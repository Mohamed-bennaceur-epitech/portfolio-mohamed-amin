import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function DevStatsDashboard() {
  const [commitMessage, setCommitMessage] = useState("");

  const commitMessages = [
    "fix: adjusted gravity multiplier 🚀",
    "refactor: clean up ParticleMood animations ✨",
    "feat: added new power-up logic 🔋",
    "chore: optimized build times ⏱️",
    "fix: null pointer in player manager 😅",
    "feat: implemented dashboard UI 💻",
  ];

  // Génère un commit message aléatoire
  useEffect(() => {
    const interval = setInterval(() => {
      setCommitMessage(
        commitMessages[Math.floor(Math.random() * commitMessages.length)]
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const weeklyActivity = [
    { day: "Mon", commits: 5 },
    { day: "Tue", commits: 8 },
    { day: "Wed", commits: 3 },
    { day: "Thu", commits: 6 },
    { day: "Fri", commits: 9 },
    { day: "Sat", commits: 4 },
    { day: "Sun", commits: 2 },
  ];

  const focus = 78; // %
  const commitsToday = 12;
  const project = "Mirror – Multiplayer Game";

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 rounded-2xl border border-slate-700 shadow-xl p-8">
      <h2 className="text-3xl font-bold text-white mb-6">Dev Stats Dashboard</h2>

      {/* 3 stats principales */}
      <div className="grid grid-cols-3 gap-6 mb-8 w-full max-w-4xl">
        <StatCard label="Commits Today" value={commitsToday} icon="💻" />
        <StatCard label="Focus Level" value={`${focus}%`} icon="🧠" />
        <StatCard label="Active Project" value={project} icon="⚡" />
      </div>

      {/* Graphique d'activité */}
      <div className="w-full max-w-4xl h-64 bg-slate-800/40 backdrop-blur-md rounded-xl border border-slate-600 shadow-inner p-4">
        <h3 className="text-indigo-300 text-lg font-semibold mb-2">
          Weekly Commit Activity
        </h3>
        <ResponsiveContainer width="100%" height="85%">
          <LineChart data={weeklyActivity}>
            <XAxis dataKey="day" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #334155",
                color: "#fff",
              }}
            />
            <Line
              type="monotone"
              dataKey="commits"
              stroke="#818CF8"
              strokeWidth={3}
              dot={{ r: 5, fill: "#A78BFA" }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Dernier message de commit */}
      <motion.div
        key={commitMessage}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-8 text-center text-gray-300 text-sm"
      >
        <p>
          <span className="text-indigo-400 font-semibold">Last commit:</span>{" "}
          {commitMessage}
        </p>
      </motion.div>
    </div>
  );
}

/* --- Sous composant pour les stats --- */
function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-slate-800/60 backdrop-blur-md border border-slate-700 rounded-xl shadow-lg p-4 flex flex-col items-center justify-center text-white"
    >
      <div className="text-3xl mb-2">{icon}</div>
      <div className="text-xl font-bold text-indigo-300">{value}</div>
      <div className="text-sm text-gray-400">{label}</div>
    </motion.div>
  );
}