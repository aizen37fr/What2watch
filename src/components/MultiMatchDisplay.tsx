/**
 * Multi-Match Display Component
 * Shows top 3 AI match suggestions with confidence scores
 */

import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import type { MatchCandidate } from '../services/gemini';

interface MultiMatchDisplayProps {
    primaryMatch: MatchCandidate;
    alternatives: MatchCandidate[];
    onSelectMatch: (showName: string, isPrimary: boolean) => void;
}

export default function MultiMatchDisplay({ primaryMatch, alternatives, onSelectMatch }: MultiMatchDisplayProps) {
    const allMatches = [primaryMatch, ...alternatives];

    return (
        <div className="space-y-4">
            <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-cyan-100 mb-2">
                    🤖 AI Found Multiple Matches
                </h3>
                <p className="text-cyan-600 text-sm">
                    Click on the correct show to confirm
                </p>
            </div>

            <div className="space-y-3">
                {allMatches.map((match, index) => (
                    <MatchCard
                        key={index}
                        match={match}
                        isPrimary={index === 0}
                        rank={index + 1}
                        onSelect={() => onSelectMatch(match.showName, index === 0)}
                    />
                ))}
            </div>

            <div className="mt-6 p-4 bg-slate-800/50 rounded-xl border border-cyan-900/30">
                <p className="text-cyan-600 text-sm text-center">
                    💡 <strong>Tip:</strong> If none of these match, try uploading a different screenshot or use manual search
                </p>
            </div>
        </div>
    );
}

interface MatchCardProps {
    match: MatchCandidate;
    isPrimary: boolean;
    rank: number;
    onSelect: () => void;
}

function MatchCard({ match, isPrimary, rank, onSelect }: MatchCardProps) {
    const confidencePercent = Math.round(match.confidence * 100);

    return (
        <motion.button
            onClick={onSelect}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: rank * 0.1 }}
            className={`w-full text-left p-5 rounded-xl border-2 transition-all ${isPrimary
                    ? 'bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/50 shadow-lg shadow-purple-500/20'
                    : 'bg-slate-800/50 border-cyan-900/30 hover:border-cyan-700/50'
                }`}
        >
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        {isPrimary ? (
                            <CheckCircle2 className="w-5 h-5 text-purple-400" />
                        ) : (
                            <AlertCircle className="w-5 h-5 text-cyan-600" />
                        )}
                        <span className={`text-lg font-bold ${isPrimary ? 'text-purple-300' : 'text-cyan-300'
                            }`}>
                            {match.showName}
                        </span>
                    </div>
                    <p className="text-sm text-cyan-600 italic">
                        "{match.reason}"
                    </p>
                </div>

                <div className="text-right ml-4">
                    <div className={`text-2xl font-bold ${isPrimary ? 'text-purple-400' : 'text-cyan-400'
                        }`}>
                        {confidencePercent}%
                    </div>
                    {isPrimary && (
                        <div className="text-xs text-purple-500 font-semibold">
                            TOP MATCH
                        </div>
                    )}
                </div>
            </div>

            {/* Animated Confidence Meter */}
            <div className="relative">
                <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                    <motion.div
                        className={`h-full ${isPrimary
                                ? 'bg-gradient-to-r from-purple-600 to-pink-600'
                                : 'bg-gradient-to-r from-cyan-600 to-blue-600'
                            }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${confidencePercent}%` }}
                        transition={{ duration: 0.8, delay: rank * 0.1 + 0.2 }}
                    />
                </div>

                {/* Confidence Level Label */}
                <div className="flex justify-between mt-1">
                    <span className="text-xs text-cyan-700">
                        {confidencePercent >= 80 ? '🔥 Very Confident' :
                            confidencePercent >= 60 ? '✅ Confident' :
                                confidencePercent >= 40 ? '⚠️ Possible' :
                                    '❓ Low Confidence'}
                    </span>
                    <span className="text-xs text-cyan-700">
                        Rank #{rank}
                    </span>
                </div>
            </div>
        </motion.button>
    );
}
