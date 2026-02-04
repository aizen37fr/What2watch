import { useState } from 'react';
import ReactPlayer from 'react-player';
import { ArrowLeft, Lightbulb, LightbulbOff, Link as LinkIcon, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Force cast to avoid strict type issues with the library
const Player = ReactPlayer as unknown as React.ComponentType<any>;

interface StreamRoomProps {
    onBack: () => void;
}

// Helper to convert various platform URLs to embed format
function convertToEmbedUrl(url: string): string {
    const trimmedUrl = url.trim();

    // YouTube (regular videos and shorts)
    const youtubePatterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
        /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/
    ];

    for (const pattern of youtubePatterns) {
        const match = trimmedUrl.match(pattern);
        if (match && match[1]) {
            return `https://www.youtube.com/embed/${match[1]}`;
        }
    }

    // Twitch (videos and clips)
    const twitchVideoMatch = trimmedUrl.match(/twitch\.tv\/videos\/(\d+)/);
    if (twitchVideoMatch && twitchVideoMatch[1]) {
        return `https://player.twitch.tv/?video=${twitchVideoMatch[1]}&parent=${window.location.hostname}`;
    }

    const twitchClipMatch = trimmedUrl.match(/twitch\.tv\/\w+\/clip\/([a-zA-Z0-9_-]+)/);
    if (twitchClipMatch && twitchClipMatch[1]) {
        return `https://clips.twitch.tv/embed?clip=${twitchClipMatch[1]}&parent=${window.location.hostname}`;
    }

    // Vimeo
    const vimeoMatch = trimmedUrl.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch && vimeoMatch[1]) {
        return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    }

    // TikTok
    const tiktokMatch = trimmedUrl.match(/tiktok\.com\/@[\w.-]+\/video\/(\d+)/);
    if (tiktokMatch && tiktokMatch[1]) {
        return `https://www.tiktok.com/embed/v2/${tiktokMatch[1]}`;
    }

    // Dailymotion
    const dailymotionMatch = trimmedUrl.match(/dailymotion\.com\/video\/([a-zA-Z0-9]+)/);
    if (dailymotionMatch && dailymotionMatch[1]) {
        return `https://www.dailymotion.com/embed/video/${dailymotionMatch[1]}`;
    }

    return trimmedUrl; // Return original if no conversion needed
}

export default function StreamRoom({ onBack }: StreamRoomProps) {
    const [url, setUrl] = useState('');
    const [playingUrl, setPlayingUrl] = useState('');
    const [sterileMode, setSterileMode] = useState(false);
    const [error, setError] = useState('');
    const [mode, setMode] = useState<'video' | 'embed'>('video');

    const handlePlay = (e: React.FormEvent) => {
        e.preventDefault();
        if (!url.trim()) return;

        // If in Video Mode, use raw URL and let ReactPlayer handle it
        if (mode === 'video') {
            const canPlay = (ReactPlayer as any).canPlay;
            if (canPlay && !canPlay(url)) {
                setError("Signal Incompatible. Switch to 'Web Protocol'.");
                return;
            }
            setPlayingUrl(url);
        } else {
            const processedUrl = convertToEmbedUrl(url);
            setPlayingUrl(processedUrl);
        }
        setError('');
    };

    return (
        <div className={`fixed inset-0 z-50 transition-colors duration-1000 ${sterileMode ? 'bg-black' : 'bg-slate-900'} text-cyan-50 font-mono overflow-hidden flex flex-col`}>
            {/* Clinical Header */}
            <div className={`p-4 flex items-center justify-between border-b border-cyan-900/30 bg-slate-900/50 backdrop-blur-sm transition-opacity duration-500 ${sterileMode ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}>
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-2 rounded-lg border border-cyan-900/50 hover:bg-cyan-900/20 text-cyan-400 transition-colors group">
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <div>
                        <h1 className="text-xl font-bold tracking-widest uppercase text-cyan-400 flex items-center gap-2">
                            Isolation Ward <span className="text-xs bg-cyan-900/50 px-2 py-0.5 rounded text-cyan-200">UNIT-{Math.floor(Math.random() * 999)}</span>
                        </h1>
                        <div className="flex items-center gap-2 text-[10px] text-cyan-600 uppercase tracking-wider">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Bio-Sig Active
                            <span>•</span>
                            <span>O2: 98%</span>
                        </div>
                    </div>
                </div>

                <div className="flex-1 max-w-3xl mx-8 flex gap-2">
                    {/* Input Source Toggle */}
                    <div className="flex shrink-0 border border-cyan-900/50 rounded-lg overflow-hidden">
                        <button
                            onClick={() => setMode('video')}
                            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all ${mode === 'video' ? 'bg-cyan-900/50 text-cyan-300' : 'hover:bg-cyan-900/20 text-cyan-700'}`}
                        >
                            Signal A (Direct)
                        </button>
                        <div className="w-px bg-cyan-900/50" />
                        <button
                            onClick={() => setMode('embed')}
                            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all ${mode === 'embed' ? 'bg-cyan-900/50 text-cyan-300' : 'hover:bg-cyan-900/20 text-cyan-700'}`}
                        >
                            Signal B (Web)
                        </button>
                    </div>

                    <form onSubmit={handlePlay} className="relative group flex-1">
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-cyan-700">
                            <LinkIcon size={14} />
                        </div>
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder={mode === 'video' ? "Input Video Signal Source..." : "Input Web Protocol URL..."}
                            className="w-full bg-slate-950/50 border border-cyan-900/30 rounded-lg py-2 pl-10 pr-24 text-sm text-cyan-100 placeholder-cyan-900/50 focus:outline-none focus:border-cyan-500/50 transition-colors font-mono"
                        />
                        <button
                            type="submit"
                            className="absolute inset-y-1 right-1 bg-cyan-900/30 hover:bg-cyan-900/50 text-cyan-400 px-4 rounded text-xs font-bold uppercase tracking-wider transition-colors"
                        >
                            {mode === 'video' ? 'Inject' : 'Load'}
                        </button>
                    </form>
                </div>

                <button
                    onClick={() => setSterileMode(!sterileMode)}
                    className={`p-2 rounded-lg border transition-colors flex items-center gap-2 ${sterileMode ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-400' : 'border-cyan-900/30 text-cyan-700 hover:text-cyan-400'}`}
                    title={sterileMode ? "Normal Protocol" : "Sterilize Environment"}
                >
                    {sterileMode ? <LightbulbOff size={18} /> : <Lightbulb size={18} />}
                    <span className="text-xs font-bold uppercase tracking-wider hidden md:inline">
                        {sterileMode ? "Sterile" : "Normal"}
                    </span>
                </button>
            </div>

            {/* Error Message */}
            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute top-20 left-1/2 -translate-x-1/2 bg-red-900/90 border border-red-500/30 text-red-200 px-6 py-2 rounded-none flex items-center gap-2 z-10 font-mono text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(220,38,38,0.5)]"
                    >
                        <AlertCircle size={14} />
                        <span className="font-bold">System Alert: {error}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Viewport */}
            <div className="flex-1 flex items-center justify-center p-0 relative bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 to-black">
                {/* Grid Overlay */}
                <div className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${sterileMode ? 'opacity-0' : 'opacity-20'}`}
                    style={{ backgroundImage: 'linear-gradient(rgba(6,182,212,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

                {playingUrl ? (
                    <div className={`w-full h-full transition-all duration-1000 relative ${sterileMode ? 'max-w-full max-h-screen' : 'max-w-6xl max-h-[80vh] border border-cyan-900/30 shadow-[0_0_100px_rgba(6,182,212,0.1)] rounded-sm'}`}>
                        {/* Corner Markers */}
                        {!sterileMode && (
                            <>
                                <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-cyan-500/50" />
                                <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-cyan-500/50" />
                                <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-cyan-500/50" />
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-cyan-500/50" />
                            </>
                        )}

                        {mode === 'video' ? (
                            <Player
                                url={playingUrl}
                                width="100%"
                                height="100%"
                                controls
                                playing
                                light={false}
                                onError={() => setError("Signal Lost. Try 'Signal B'.")}
                            />
                        ) : (
                            <iframe
                                src={playingUrl}
                                className="w-full h-full border-none"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                sandbox="allow-same-origin allow-scripts allow-forms allow-presentation"
                            />
                        )}
                    </div>
                ) : (
                    <div className="text-center opacity-50 flex flex-col items-center">
                        <div className="w-32 h-32 mb-6 border border-cyan-900/50 rounded-full flex items-center justify-center relative animate-[spin_10s_linear_infinite]">
                            <div className="absolute inset-0 border-t border-cyan-500/50 rounded-full" />
                            <LinkIcon size={32} className="text-cyan-500 animate-[spin_10s_linear_infinite_reverse]" />
                        </div>
                        <h2 className="text-3xl font-black uppercase tracking-[0.2em] text-cyan-900">Awaiting Signal</h2>
                        <p className="text-cyan-800 font-mono text-xs mt-2 max-w-md mx-auto">
                            INITIALIZE PROTOCOL: ENTER SOURCE URL TO COMMENCE OBSERVATION.
                            <br />
                            RECOMMENDED: YT / TWITCH / DIRECT FEED
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
