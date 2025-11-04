import { useEffect, useState } from "react";

export default function AiMoodBoard() {
  const [keyword, setKeyword] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const generate = () => {
    if (!keyword.trim()) return;
    setLoading(true);
    const seed = keyword.replace(/\s+/g, "-").toLowerCase();
    const urls = Array.from({ length: 6 }).map(
      (_, i) => `https://picsum.photos/seed/${seed}-${i}/800/800`
    );
    setTimeout(() => {
      setImages(urls);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-start overflow-y-auto">
      <h3 className="text-center text-lg sm:text-xl font-semibold mb-3 text-indigo-300">
        ✨ AI Mood Board
      </h3>
      <p className="text-gray-400 text-center mb-4 text-sm sm:text-base px-4">
        Tape un mot-clé (ex: <span className="text-indigo-400">design</span>,{" "}
        <span className="text-indigo-400">nature</span>...) et découvre une ambiance inspirée.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-2 w-full max-w-2xl mb-4">
        <input
          className="flex-1 rounded-lg bg-white/10 border border-white/20 px-3 py-2 outline-none focus:ring-2 ring-indigo-400 text-sm sm:text-base"
          placeholder="Entre un mot-clé..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button
          className="rounded-lg bg-indigo-500 hover:bg-indigo-600 px-4 py-2 font-semibold transition text-sm sm:text-base"
          onClick={generate}
        >
          Générer
        </button>
      </div>

      {loading && <p className="text-gray-400 mt-6 animate-pulse">Chargement...</p>}

      {!loading && images.length === 0 && (
        <p className="text-gray-400 mt-6">🔍 Entrez un mot-clé pour générer des images !</p>
      )}

      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3 mt-4 px-2 overflow-y-auto">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt="Mood"
            className="rounded-xl w-full h-52 sm:h-56 object-cover"
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
}