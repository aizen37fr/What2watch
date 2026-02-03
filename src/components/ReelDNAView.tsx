import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Dna, Share2, Activity, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { calculateReelDNA, type DNAProfile } from '../services/reelDNA';

interface ReelDNAViewProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ReelDNAView({ isOpen, onClose }: ReelDNAViewProps) {
    const { watchlist } = useAuth();
    const [profile, setProfile] = useState<DNAProfile | null>(null);
    const [calculating, setCalculating] = useState(true);

    useEffect(() => {
        if (isOpen) {
            setCalculating(true);
            // Simulate calculation delay for effect
            setTimeout(() => {
                const dna = calculateReelDNA(watchlist);
                setProfile(dna);
                setCalculating(false);
            }, 1500);
        }
    }, [isOpen, watchlist]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-[90] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            >
                <div className="w-full max-w-4xl bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">

                    {/* Left Panel: Spirit Animal & Summary */}
                    <div className="md:w-1/3 bg-gradient-to-br from-purple-900/40 to-blue-900/40 p-8 flex flex-col items-center justify-center text-center border-r border-white/5 relative overflow-hidden">
                        {/* Animated background particles */}
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                        </div>

                        {calculating ? (
                            <div className="flex flex-col items-center">
                                <Dna className="w-16 h-16 text-purple-400 animate-spin-slow" />
                                <p className="mt-4 text-purple-200 animate-pulse">Sequencing your Cine-Genome...</p>
                            </div>
                        ) : profile && (
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="relative z-10"
                            >
                                <div className="text-sm font-bold tracking-widest text-purple-400 uppercase mb-2">Reel DNA</div>
                                <div className="text-8xl mb-4 drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]">
                                    {profile.spiritAnimal.split(' ')[0]} {/* Emoji */}
                                </div>
                                <h2 className="text-3xl font-bold text-white mb-2">{profile.spiritAnimal.split(' ').slice(1).join(' ')}</h2>
                                <p className="text-purple-200/80 italic mb-8">"{profile.tagline}"</p>

                                <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                                    <div className="text-xs text-gray-400 uppercase mb-1">Watch Time</div>
                                    <div className="text-2xl font-mono text-white">{(profile.totalWatchTime / 60).toFixed(1)}h</div>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Right Panel: Traits & Stats */}
                    <div className="md:w-2/3 p-8 flex flex-col relative">
                        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full z-20">
                            <X size={24} />
                        </button>

                        {!calculating && profile && (
                            <motion.div
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="h-full flex flex-col"
                            >
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <Activity className="text-green-400" />
                                    Taste Composition
                                </h3>

                                <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                                    {profile.traits.map((trait, idx) => (
                                        <div key={trait.label} className="group">
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="flex items-center gap-2 text-gray-300">
                                                    <span>{trait.icon}</span> {trait.label}
                                                </span>
                                                <span className="font-mono font-bold text-white">{trait.score}%</span>
                                            </div>
                                            <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${trait.score}%` }}
                                                    transition={{ duration: 1, delay: 0.3 + (idx * 0.1) }}
                                                    className={`h-full ${trait.color} shadow-[0_0_10px_currentColor]`}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                        <div className="text-xs text-gray-500 mb-1">Dominant Genre</div>
                                        <div className="text-lg font-bold text-white truncate">{profile.dominantGenre}</div>
                                    </div>
                                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                        <div className="text-xs text-gray-500 mb-1">Adventurousness</div>
                                        <div className="flex items-center gap-2">
                                            <div className="text-lg font-bold text-white">{profile.adventurousness}/100</div>
                                            {profile.adventurousness > 70 && <Sparkles size={16} className="text-yellow-400" />}
                                        </div>
                                    </div>
                                </div>

                                <button className="mt-6 w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                                    <Share2 size={18} />
                                    Share My DNA
                                </button>
                            </motion.div>
                        )}
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
