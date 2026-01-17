import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import CylinderDeck from '../components/CylinderDeck';
import MatchCelebration from '../components/MatchCelebration';
import { fetchTMDB } from '../services/tmdb';
import { fetchAniList } from '../services/anilist';
import type { ContentItem } from '../data/db';
import { Users, ArrowLeft } from 'lucide-react';

interface MatchModeProps {
    onBack: () => void;
}

export default function MatchMode({ onBack }: MatchModeProps) {
    const [items, setItems] = useState<ContentItem[]>([]);
    const [matchItem, setMatchItem] = useState<ContentItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [botStatus, setBotStatus] = useState("Waiting for friend...");

    // Initial Load
    useEffect(() => {
        const loadContent = async () => {
            setLoading(true);
            setBotStatus("CinemaBot is joining...");

            // Fetch a mix for the session
            const movies = await fetchTMDB('movie', 'Excited', 'English');
            const anime = await fetchAniList('Excited');

            // Shuffle
            const mixed = [...movies, ...anime].sort(() => Math.random() - 0.5);
            setItems(mixed);

            setTimeout(() => {
                setLoading(false);
                setBotStatus("CinemaBot is ready!");
            }, 1500);
        };
        loadContent();
    }, []);

    // Mock "Socket" listener
    // In a real app, this would listen for the other user's swipes
    // Here, we simulate the Bot matching every 3rd or 4th item you like
    const [swipeCount, setSwipeCount] = useState(0);

    const handleDeckClose = () => {
        onBack();
    };

    // We need to intercept the "Like" action from CylinderDeck
    // Since CylinderDeck handles logic internally, we might need to modify it to accept an onSwipe callback
    // OR, for this demo, we can just assume if the user is viewing it, they might match.

    // Actually, CylinderDeck is self-contained. To make this work properly without refactoring CylinderDeck too much,
    // let's wrap it.
    // BUT CylinderDeck doesn't emit 'onLike'.

    // PLAN B: We'll modify CylinderDeck to accept an optional `onSwipe` prop in a separate step.
    // For now, let's assume we pass a modified version or just proceed and I will update CylinderDeck next.

    // For the compilation to pass, I will define the handler, and then update CylinderDeck props.
    const handleSwipe = (item: ContentItem, direction: 'like' | 'nope') => {
        if (direction === 'like') {
            setSwipeCount(prev => prev + 1);

            // Random chance to match, increased by swipe count to ensure a match happens soon
            const chance = 0.3;
            if (Math.random() < chance || swipeCount > 4) {
                setTimeout(() => {
                    setMatchItem(item);
                    setSwipeCount(0); // Reset
                }, 500);
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-black text-white font-sans overflow-hidden">
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-50 p-4 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
                <button onClick={onBack} className="p-2 rounded-full bg-white/10 backdrop-blur-md">
                    <ArrowLeft size={24} />
                </button>

                <div className="flex items-center gap-2 bg-pink-500/20 px-4 py-2 rounded-full backdrop-blur-md border border-pink-500/30">
                    <Users size={16} className="text-pink-400" />
                    <span className="font-bold text-sm text-pink-100">{botStatus}</span>
                </div>

                <div className="w-10" /> {/* Spacer */}
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center h-full">
                    <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mb-4" />
                    <p className="text-pink-400 font-bold animate-pulse">Setting up lobby...</p>
                </div>
            ) : (
                <CylinderDeck
                    items={items}
                    onClose={handleDeckClose}
                    onSwipe={handleSwipe} // We need to add this prop to CylinderDeck!
                />
            )}

            <AnimatePresence>
                {matchItem && (
                    <MatchCelebration
                        item={matchItem}
                        onClose={() => setMatchItem(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
