import { motion, AnimatePresence } from 'framer-motion';
import { X, Share2, Star, User } from 'lucide-react';
import type { ContentItem } from '../data/db';

interface TheaterModalProps {
    item: ContentItem | null;
    onClose: () => void;
}

export default function TheaterModal({ item, onClose }: TheaterModalProps) {
    if (!item) return null;

    const handleShare = () => {
        if (!item) return;
        const text = `Check out "${item.title}"!`;
        navigator.clipboard.writeText(text);
        alert("Copied!");
    };

    return (
        <AnimatePresence>
            {item && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center">
                    {/* Backdrop Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/90 backdrop-blur-md"
                    />

                    {/* Main Content Container */}
                    <motion.div
                        layoutId={`card-${item.id}`} // Shared layout ID for seamless transition if supported
                        initial={{ opacity: 0, scale: 0.9, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 50 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-5xl h-[90vh] bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-50 p-2 bg-black/50 rounded-full text-white hover:bg-white hover:text-black transition-colors"
                        >
                            <X size={24} />
                        </button>

                        {/* LEFT: Media Section (Trailer/Backdrop) */}
                        <div className="w-full md:w-2/3 h-64 md:h-full relative bg-black">
                            {/* If we have a trailer key, embed YouTube. Else show Backdrop. */}
                            {item.trailerKey ? (
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={`https://www.youtube.com/embed/${item.trailerKey}?autoplay=1&mute=0&rel=0`}
                                    title="Trailer"
                                    frameBorder="0"
                                    allow="autoplay; encrypted-media; fullscreen"
                                    className="w-full h-full object-cover"
                                ></iframe>
                            ) : (
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover opacity-80"
                                />
                            )}
                            {/* Overlay Gradient on Mobile */}
                            <div className="absolute inset-0 md:hidden bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
                        </div>

                        {/* RIGHT: Details Section */}
                        <div className="w-full md:w-1/3 flex flex-col p-6 md:p-8 overflow-y-auto bg-zinc-900/95 backdrop-blur-xl border-l border-white/5">
                            {/* Header Info */}
                            <div className="mb-6">
                                <motion.h2
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-3xl md:text-4xl font-black text-white leading-tight mb-2"
                                >
                                    {item.title}
                                </motion.h2>
                                <div className="flex items-center gap-3 text-sm text-gray-400">
                                    <span className="flex items-center gap-1 text-yellow-400 font-bold bg-yellow-400/10 px-2 py-0.5 rounded">
                                        <Star size={14} fill="currentColor" /> {item.rating.toFixed(1)}
                                    </span>
                                    <span>{item.year}</span>
                                    <span>{item.type === 'movie' ? 'Movie' : 'Series'}</span>
                                    <span className="bg-white/10 px-2 py-0.5 rounded text-white">{item.language}</span>
                                </div>
                            </div>

                            {/* Description */}
                            <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-8">
                                {item.description}
                            </p>

                            {/* Cast Section */}
                            {item.cast && item.cast.length > 0 && (
                                <div className="mb-8">
                                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Cast</h3>
                                    <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                                        {item.cast.map((actor, idx) => (
                                            <div key={idx} className="flex flex-col items-center min-w-[60px] gap-1">
                                                <div className="w-12 h-12 rounded-full overflow-hidden bg-white/10">
                                                    {actor.image ? (
                                                        <img src={actor.image} alt={actor.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-500">
                                                            <User size={20} />
                                                        </div>
                                                    )}
                                                </div>
                                                <span className="text-[10px] text-center text-gray-400 w-16 truncate leading-tight">
                                                    {actor.name}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Watch Providers */}
                            {item.watchProviders && item.watchProviders.length > 0 && (
                                <div className="mb-auto">
                                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Where to Watch</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {item.watchProviders.map((provider) => (
                                            <a
                                                key={provider.name}
                                                href={provider.link}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 px-3 py-2 rounded-lg transition-colors group"
                                            >
                                                <img src={provider.logo} className="w-6 h-6 rounded" alt="" />
                                                <span className="text-xs font-medium text-gray-300 group-hover:text-white">
                                                    {provider.name}
                                                </span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex flex-col gap-3 mt-8">
                                <button onClick={handleShare} className="w-full bg-white/10 hover:bg-white/20 py-4 rounded-xl flex items-center justify-center gap-2 font-bold transition-colors">
                                    <Share2 size={20} /> Share with Friend
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
