import GravityPlayground from "../components/GravityPlayground";

export default function Playground() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-4">Playground</h1>
      <p className="text-lg text-gray-300 mb-8 text-center max-w-xl">
        Bienvenue dans mon petit espace d’expérimentation front-end 🎨  
        Ici, je teste des idées visuelles, des animations et des interactions amusantes.
      </p>

      <div className="w-full max-w-4xl h-[500px] bg-slate-800/40 backdrop-blur-md rounded-2xl border border-slate-700 shadow-xl overflow-hidden">
        <GravityPlayground />
      </div>
    </main>
  );
}