import { motion } from 'framer-motion';
import type { ContentItem } from '../data/db';
import { Play } from 'lucide-react';

interface MatchCelebrationProps {
    item: ContentItem;
    onClose: () => void;
}

export default function MatchCelebration({ item, onClose }: MatchCelebrationProps) {
    // Auto-close sound or confetti triggering could happen here

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-6 text-center"
        >
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, -5, 5, 0]
                }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 mb-8 tracking-tighter"
            >
                IT'S A MATCH!
            </motion.div>

            <div className="relative w-64 h-96 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(236,72,153,0.6)] mb-8 border-4 border-pink-500 transform rotate-3">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-4 left-0 right-0">
                    <h2 className="text-2xl font-bold text-white shadow-black drop-shadow-lg">{item.title}</h2>
                </div>
            </div>

            <p className="text-xl text-gray-300 mb-8 max-w-md">
                You and <span className="text-pink-400 font-bold">CinemaBot</span> both want to watch this!
            </p>

            <div className="flex flex-col w-full max-w-sm gap-3">
                {item.trailerUrl && (
                    <a href={item.trailerUrl} target="_blank" rel="noreferrer" className="bg-white text-black py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform flex items-center justify-center gap-2">
                        <Play size={24} fill="currentColor" /> Watch Now
                    </a>
                )}

                <button onClick={onClose} className="bg-gray-800 text-white py-4 rounded-full font-bold text-lg hover:bg-gray-700 transition-colors">
                    Keep Swiping
                </button>
            </div>
        </motion.div>
    );
}
