import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, X, Send } from 'lucide-react';
import type { StreamScoreReview } from '../types/streamScore';
import { useAuth } from '../context/AuthContext';

interface StreamScoreModalProps {
    isOpen: boolean;
    onClose: () => void;
    contentTitle: string;
    contentId: string;
    onSubmit: (review: StreamScoreReview) => void;
}

const EMOTIONAL_VIBES = [
    { label: 'Mind-blowing', emoji: '🤯', color: 'bg-purple-500' },
    { label: 'Heart-breaking', emoji: '💔', color: 'bg-blue-500' },
    { label: 'Feel-good', emoji: '🥰', color: 'bg-yellow-500' },
    { label: 'Terrifying', emoji: '😱', color: 'bg-red-600' },
    { label: 'Adrenaline', emoji: '🔥', color: 'bg-orange-500' },
    { label: 'Thought-provoking', emoji: '🤔', color: 'bg-emerald-500' },
] as const;

export default function StreamScoreModal({ isOpen, onClose, contentTitle, contentId, onSubmit }: StreamScoreModalProps) {
    const { user } = useAuth();
    const [storyScore, setStoryScore] = useState(5);
    const [actingScore, setActingScore] = useState(5);
    const [visualsScore, setVisualsScore] = useState(5);
    const [endingScore, setEndingScore] = useState(5); // The unique "Ending" score
    const [selectedVibe, setSelectedVibe] = useState<string>('');
    const [comment, setComment] = useState('');
    const [spoilerFree, setSpoilerFree] = useState(true);

    const handleSubmit = () => {
        if (!user) return; // Should handle auth check

        const review: StreamScoreReview = {
            id: crypto.randomUUID(),
            userId: user.id || 'guest',
            userName: user.name || 'Anonymous',
            contentId,
            storyScore,
            actingScore,
            visualsScore,
            endingScore,
            emotionalVibe: selectedVibe as any,
            comment,
            createdAt: new Date().toISOString(),
            spoilerFree
        };

        onSubmit(review);
        onClose();
        // Reset form
        setStoryScore(5);
        setActingScore(5);
        setVisualsScore(5);
        setEndingScore(5);
        setComment('');
    };

    const calculateTotal = () => Math.round((storyScore + actingScore + visualsScore + endingScore) / 4 * 10) / 10;

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="w-full max-w-lg bg-surface border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="p-6 bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-b border-white/5 flex justify-between items-start">
                        <div>
                            <h2 className="text-xl font-bold text-white">Rate "{contentTitle}"</h2>
                            <p className="text-sm text-gray-400">Add your StreamScore</p>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                        {/* 1. The 4 Pillars Scoring */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">The 4 Pillars</h3>
                            <ScoreSlider label="Story & Plot" value={storyScore} onChange={setStoryScore} color="text-blue-400" />
                            <ScoreSlider label="Acting & Cast" value={actingScore} onChange={setActingScore} color="text-purple-400" />
                            <ScoreSlider label="Visuals & Audio" value={visualsScore} onChange={setVisualsScore} color="text-pink-400" />
                            <ScoreSlider label="The Ending" value={endingScore} onChange={setEndingScore} color="text-emerald-400" />

                            <div className="mt-4 flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/10">
                                <span className="font-bold text-gray-200">Your StreamScore</span>
                                <div className="flex items-center gap-2">
                                    <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                                    <span className="text-3xl font-black text-white">{calculateTotal()}</span>
                                </div>
                            </div>
                        </div>

                        {/* 2. Emotional Vibe */}
                        <div className="space-y-3">
                            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Emotional Vibe</h3>
                            <div className="grid grid-cols-2 gap-2">
                                {EMOTIONAL_VIBES.map((vibe) => (
                                    <button
                                        key={vibe.label}
                                        onClick={() => setSelectedVibe(vibe.label)}
                                        className={`flex items-center gap-2 p-3 rounded-xl border transition-all ${selectedVibe === vibe.label
                                            ? `${vibe.color} border-transparent text-white shadow-lg`
                                            : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                                            }`}
                                    >
                                        <span className="text-xl">{vibe.emoji}</span>
                                        <span className="text-sm font-medium">{vibe.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 3. Comment */}
                        <div className="space-y-3">
                            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Verdict</h3>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="What did you think? (Optional)"
                                className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-purple-500/50 min-h-[100px]"
                            />
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={spoilerFree}
                                    onChange={(e) => setSpoilerFree(e.target.checked)}
                                    className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-purple-600 focus:ring-purple-500"
                                />
                                <span className="text-sm text-gray-400">This review is Spoiler-free</span>
                            </label>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-6 border-t border-white/5 bg-black/20">
                        <button
                            onClick={handleSubmit}
                            disabled={!selectedVibe}
                            className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold text-lg transition-all ${selectedVibe
                                ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-lg hover:shadow-purple-600/20 text-white'
                                : 'bg-white/10 text-gray-500 cursor-not-allowed'
                                }`}
                        >
                            <span>Submit StreamScore</span>
                            <Send size={20} />
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

function ScoreSlider({ label, value, onChange, color }: { label: string, value: number, onChange: (val: number) => void, color: string }) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between items-end">
                <span className="text-sm text-gray-400">{label}</span>
                <span className={`text-xl font-bold ${color}`}>{value}</span>
            </div>
            <input
                type="range"
                min="1"
                max="10"
                step="0.5"
                value={value}
                onChange={(e) => onChange(parseFloat(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
            />
        </div>
    );
}
