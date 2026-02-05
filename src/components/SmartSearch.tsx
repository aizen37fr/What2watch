import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles, X } from 'lucide-react';
import { parseSearchQuery } from '../services/deepseek';
import { searchMoviesByTitle, searchTVByTitle } from '../services/tmdb';

interface SmartSearchProps {
    onSearch?: (query: string, results: any[]) => void;
}

export default function SmartSearch({ onSearch }: SmartSearchProps) {
    const [query, setQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [results, setResults] = useState<any[]>([]);
    const [showResults, setShowResults] = useState(false);

    const handleSearch = async () => {
        if (!query.trim()) return;

        setIsSearching(true);
        setShowResults(true);

        try {
            // Parse query with AI
            console.log('🔍 Smart Search: Parsing query...');
            const parsed = await parseSearchQuery(query);

            if (parsed) {
                console.log('✅ Parsed:', parsed);

                // Search based on parsed data
                const allResults = [];

                // Search movies and TV shows
                for (const term of parsed.searchTerms) {
                    const [movies, shows] = await Promise.all([
                        searchMoviesByTitle(term),
                        searchTVByTitle(term)
                    ]);

                    allResults.push(...movies.slice(0, 3), ...shows.slice(0, 3));
                }

                // Filter by type if specified
                const filtered = parsed.filters.type
                    ? allResults.filter(r => {
                        if (parsed.filters.type === 'movie') return r.title;
                        if (parsed.filters.type === 'tv') return r.name;
                        return true;
                    })
                    : allResults;

                setResults(filtered.slice(0, 6));
                onSearch?.(query, filtered);
            } else {
                // Fallback: simple search
                const [movies, shows] = await Promise.all([
                    searchMoviesByTitle(query),
                    searchTVByTitle(query)
                ]);

                const allResults = [...movies.slice(0, 3), ...shows.slice(0, 3)];
                setResults(allResults);
                onSearch?.(query, allResults);
            }
        } catch (error) {
            console.error('Search error:', error);
        } finally {
            setIsSearching(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="relative">
            {/* Search Bar */}
            <div className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Try: 'Find movies like Inception' or 'Korean dramas like Squid Game'"
                    className="w-full bg-slate-900/50 border border-cyan-900/30 rounded-xl px-4 py-3 pl-12 pr-24 text-cyan-100 placeholder-cyan-700 focus:outline-none focus:border-cyan-700 transition-colors"
                />

                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-600" />

                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
                    {isSearching && (
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                            <Sparkles className="w-5 h-5 text-cyan-400" />
                        </motion.div>
                    )}

                    {query && (
                        <button
                            onClick={() => {
                                setQuery('');
                                setResults([]);
                                setShowResults(false);
                            }}
                            className="p-1 hover:bg-cyan-900/20 rounded-lg transition-colors text-cyan-600"
                        >
                            <X size={18} />
                        </button>
                    )}

                    <button
                        onClick={handleSearch}
                        disabled={!query.trim() || isSearching}
                        className="bg-gradient-to-r from-cyan-600 to-purple-600 text-white px-4 py-1 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
                    >
                        {isSearching ? 'Thinking...' : 'Search'}
                    </button>
                </div>
            </div>

            {/* Results Dropdown */}
            {showResults && results.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full mt-2 w-full bg-slate-950/95 border border-cyan-900/30 rounded-xl shadow-2xl shadow-cyan-900/20 overflow-hidden z-50 max-h-96 overflow-y-auto"
                >
                    <div className="p-2 bg-cyan-950/30 border-b border-cyan-900/30">
                        <p className="text-xs text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                            <Sparkles size={14} />
                            AI-Powered Results
                        </p>
                    </div>

                    <div className="divide-y divide-cyan-900/20">
                        {results.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="p-3 hover:bg-cyan-900/10 cursor-pointer transition-colors flex gap-3"
                            >
                                {item.poster_path && (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}
                                        alt={item.title || item.name}
                                        className="w-12 h-16 object-cover rounded-lg"
                                    />
                                )}

                                <div className="flex-1">
                                    <h4 className="text-cyan-100 font-semibold text-sm">
                                        {item.title || item.name}
                                    </h4>
                                    <p className="text-cyan-600 text-xs">
                                        {item.release_date?.substring(0, 4) || item.first_air_date?.substring(0, 4)}
                                    </p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-xs text-cyan-700 px-2 py-0.5 bg-cyan-950/30 rounded">
                                            {item.title ? 'Movie' : 'TV'}
                                        </span>
                                        {item.vote_average && (
                                            <span className="text-xs text-yellow-400">
                                                ⭐ {item.vote_average.toFixed(1)}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}
        </div>
    );
}
