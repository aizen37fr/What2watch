import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, RefreshCw, Loader } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getHybridRecommendations, convertToContentItem } from '../services/recommendations';
import type { RecommendationResult } from '../types/recommendations';

export default function SmartRecommendations() {
    const { watchlist } = useAuth();
    const [recommendations, setRecommendations] = useState<RecommendationResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        loadRecommendations();
    }, [watchlist]);

    const loadRecommendations = async () => {
        if (watchlist.length === 0) {
            setRecommendations([]);
            return;
        }

        setLoading(true);
        setError('');

        try {
            const results = await getHybridRecommendations(watchlist, 20);
            setRecommendations(results);
        } catch (err) {
            console.error('Recommendation error:', err);
            setError('Failed to load recommendations. Try again later.');
        } finally {
            setLoading(false);
        }
    };

    if (watchlist.length === 0) {
        return (
            <div className="p-8 text-center bg-white/5 rounded-2xl border border-white/10">
                <Sparkles className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                <h3 className="text-xl font-bold mb-2">Build Your Watchlist</h3>
                <p className="text-gray-400">
                    Add some movies or shows to your watchlist to get personalized recommendations!
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">Recommended for You</h2>
                        <p className="text-sm text-gray-400">
                            Based on your watchlist ({watchlist.length} items)
                        </p>
                    </div>
                </div>

                <button
                    onClick={loadRecommendations}
                    disabled={loading}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors disabled:opacity-50"
                >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    <span className="hidden md:inline">Refresh</span>
                </button>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="flex items-center justify-center py-20">
                    <Loader className="w-8 h-8 animate-spin text-purple-400" />
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-200">
                    {error}
                </div>
            )}

            {/* Recommendations Grid */}
            {!loading && !error && recommendations.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {recommendations.map((rec, index) => (
                        <RecommendationCard key={index} recommendation={rec} />
                    ))}
                </div>
            )}

            {/* Empty State */}
            {!loading && !error && recommendations.length === 0 && (
                <div className="p-8 text-center bg-white/5 rounded-2xl border border-white/10">
                    <p className="text-gray-400">
                        No recommendations found. Try adding more variety to your watchlist!
                    </p>
                </div>
            )}
        </div>
    );
}

function RecommendationCard({ recommendation }: { recommendation: RecommendationResult }) {
    const content = convertToContentItem(recommendation.content, recommendation.content.media_type === 'tv' ? 'tv' : 'movie');

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative"
        >
            <div className="relative rounded-xl overflow-hidden bg-surface border border-white/10 hover:border-purple-500/50 transition-all">
                {/* Image */}
                <div className="aspect-[2/3] relative overflow-hidden">
                    {content.image ? (
                        <img
                            src={content.image}
                            alt={content.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                            <Sparkles className="w-12 h-12 text-white/30" />
                        </div>
                    )}

                    {/* Score Badge */}
                    <div className="absolute top-2 right-2 px-2 py-1 bg-black/80 rounded-lg backdrop-blur-sm">
                        <span className="text-xs font-bold text-purple-400">
                            {Math.round(recommendation.score)}%
                        </span>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                        <h3 className="font-bold text-sm mb-2 line-clamp-2">{content.title}</h3>

                        {/* Reason Chips */}
                        <div className="flex flex-wrap gap-1 mb-2">
                            {recommendation.reasons.slice(0, 2).map((reason, idx) => (
                                <span
                                    key={idx}
                                    className="text-[10px] px-2 py-0.5 bg-purple-500/30 border border-purple-500/50 rounded-full"
                                >
                                    {reason}
                                </span>
                            ))}
                        </div>

                        {/* Rating */}
                        {content.rating > 0 && (
                            <div className="flex items-center gap-1">
                                <span className="text-yellow-400 text-xs">★</span>
                                <span className="text-xs">{content.rating.toFixed(1)}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
