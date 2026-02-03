import { motion } from 'framer-motion';
import type { ContentItem } from '../data/db';
import { Play, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

interface MatchCelebrationProps {
    item: ContentItem;
    onClose: () => void;
}

const PARTICLES = Array.from({ length: 20 });

export default function MatchCelebration({ item, onClose }: MatchCelebrationProps) {
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        setShowConfetti(true);
        // Clean up or auto-close logic could go here
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-6 text-center overflow-hidden"
        >
            {/* Background Pulse */}
            <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-gradient-radial from-pink-900/40 to-transparent pointer-events-none"
            />

            {/* Particle Explosion */}
            {showConfetti && PARTICLES.map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ x: 0, y: 0, scale: 0 }}
                    animate={{
                        x: (Math.random() - 0.5) * window.innerWidth,
                        y: (Math.random() - 0.5) * window.innerHeight,
                        scale: [0, 1.5, 0],
                        rotate: Math.random() * 360
                    }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute w-4 h-4 rounded-full pointer-events-none"
                    style={{
                        backgroundColor: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'][Math.floor(Math.random() * 5)]
                    }}
                />
            ))}

            {/* Main Text */}
            <motion.div
                initial={{ scale: 0.5, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="relative z-10 mb-8"
            >
                <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 drop-shadow-[0_0_20px_rgba(236,72,153,0.8)] italic tracking-tighter transform -rotate-3">
                    MATCH!
                </h1>
                <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 0.5 }}
                    className="absolute -top-4 -right-8 text-4xl"
                >
                    🔥
                </motion.div>
            </motion.div>

            {/* Card Reveal */}
            <motion.div
                initial={{ rotateX: 90, opacity: 0 }}
                animate={{ rotateX: 0, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="relative w-72 h-[450px] rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(236,72,153,0.6)] mb-8 border-4 border-pink-500 group"
            >
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <h2 className="text-3xl font-bold text-white mb-2 leading-none">{item.title}</h2>
                    <div className="flex items-center justify-center gap-2 text-pink-300 font-bold">
                        <Sparkles size={16} />
                        <span>98% Vibe Match</span>
                    </div>
                </div>
            </motion.div>

            {/* Actions */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col w-full max-w-sm gap-3 relative z-10"
            >
                <p className="text-gray-300 mb-4 animate-pulse">
                    Prepare the popcorn. It's happening.
                </p>

                {item.trailerUrl && (
                    <a href={item.trailerUrl} target="_blank" rel="noreferrer" className="bg-white text-black py-4 rounded-xl font-black text-xl hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                        <Play size={24} fill="currentColor" /> WATCH NOW
                    </a>
                )}

                <button onClick={onClose} className="bg-white/10 text-white py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-colors backdrop-blur-md">
                    Keep Swiping
                </button>
            </motion.div>
        </motion.div>
    );
}
