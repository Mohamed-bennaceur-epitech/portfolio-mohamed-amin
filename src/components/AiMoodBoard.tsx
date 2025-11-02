import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sampleImages: Record<string, string[]> = {
    innovation: [
        `https://picsum.photos/seed/innovation1/600/400`,
        `https://picsum.photos/seed/innovation2/600/400`,
        `https://picsum.photos/seed/innovation3/600/400`,
    ],
    design: [
        `https://picsum.photos/seed/design1/600/400`,
        `https://picsum.photos/seed/design2/600/400`,
        `https://picsum.photos/seed/design3/600/400`,
    ],
    code: [
        `https://picsum.photos/seed/code1/600/400`,
        `https://picsum.photos/seed/code2/600/400`,
        `https://picsum.photos/seed/code3/600/400`,
    ],
    nature: [
        `https://picsum.photos/seed/nature1/600/400`,
        `https://picsum.photos/seed/nature2/600/400`,
        `https://picsum.photos/seed/nature3/600/400`,
    ],
};

export default function AiMoodBoard() {
    const [keyword, setKeyword] = useState("");
    const [images, setImages] = useState<string[]>([]);

    const handleSearch = () => {
        const key = keyword.toLowerCase();
        if (sampleImages[key]) {
            setImages(sampleImages[key]);
        } else {
            const random = Array.from({ length: 3 }, () =>
                `https://picsum.photos/seed/${Math.random()}/600/400`
            );
            setImages(random);

        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-full w-full p-6 text-white">
            <h2 className="text-3xl font-bold mb-4">🧠 AI Mood Board</h2>
            <p className="text-gray-300 mb-6 text-center max-w-lg">
                Tape un mot-clé (ex : <span className="text-indigo-400">design</span>,{" "}
                <span className="text-indigo-400">code</span>,{" "}
                <span className="text-indigo-400">nature</span>…) et découvre une
                ambiance visuelle aléatoire inspirée de ce thème.
            </p>

            <div className="flex gap-2 mb-8">
                <input
                    type="text"
                    placeholder="Entre un mot-clé..."
                    className="px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <button
                    onClick={handleSearch}
                    className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg font-semibold transition"
                >
                    Générer
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-4xl">
                <AnimatePresence>
                    {images.map((img, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.4 }}
                            className="rounded-lg overflow-hidden shadow-lg"
                        >
                            <img
                                src={img}
                                alt="Mood"
                                className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}
