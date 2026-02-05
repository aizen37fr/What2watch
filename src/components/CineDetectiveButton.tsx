import { useState } from 'react';
import { motion } from 'framer-motion';
import { Scan, Film, Sparkles } from 'lucide-react';
import CineDetective from './CineDetective';

export default function CineDetectiveButton() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Floating 3D Button */}
            <motion.button
                onClick={() => setIsOpen(true)}
                className="fixed left-6 bottom-6 z-40 group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
                {/* 3D Container */}
                <div
                    className="relative"
                    style={{
                        transformStyle: 'preserve-3d',
                        perspective: '1000px'
                    }}
                >
                    {/* Main Button with 3D Effect */}
                    <motion.div
                        className="relative w-16 h-16 bg-gradient-to-br from-cyan-500 via-purple-600 to-pink-600 rounded-2xl shadow-2xl shadow-cyan-500/50"
                        animate={{
                            rotateX: [0, 5, 0, -5, 0],
                            rotateY: [0, 5, 0, -5, 0],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        style={{
                            transformStyle: 'preserve-3d',
                        }}
                    >
                        {/* Inner glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl" />

                        {/* Icon */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Scan className="w-8 h-8 text-white drop-shadow-lg" />
                        </div>

                        {/* Animated rings */}
                        <motion.div
                            className="absolute inset-0 border-2 border-cyan-400/50 rounded-2xl"
                            animate={{
                                scale: [1, 1.3, 1],
                                opacity: [0.5, 0, 0.5]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeOut"
                            }}
                        />

                        <motion.div
                            className="absolute inset-0 border-2 border-purple-400/50 rounded-2xl"
                            animate={{
                                scale: [1, 1.3, 1],
                                opacity: [0.5, 0, 0.5]
                            }}
                            transition={{
                                duration: 2,
                                delay: 0.5,
                                repeat: Infinity,
                                ease: "easeOut"
                            }}
                        />
                    </motion.div>

                    {/* 3D Depth Shadow */}
                    <div
                        className="absolute inset-0 bg-gradient-to-br from-cyan-600 to-purple-700 rounded-2xl blur-xl opacity-50"
                        style={{
                            transform: 'translateZ(-20px)',
                        }}
                    />

                    {/* Floating Badge */}
                    <motion.div
                        className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-1 shadow-lg"
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 10, -10, 0]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <Sparkles className="w-4 h-4 text-white" />
                    </motion.div>
                </div>

                {/* Label on hover */}
                <motion.div
                    className="absolute left-full ml-4 top-1/2 -translate-y-1/2 bg-slate-950/95 border border-cyan-900/30 rounded-lg px-4 py-2 whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none"
                    initial={{ x: -10 }}
                    whileHover={{ x: 0 }}
                >
                    <div className="flex items-center gap-2">
                        <Film className="w-4 h-4 text-cyan-400" />
                        <span className="text-cyan-100 font-semibold">CineDetective AI</span>
                    </div>
                    <p className="text-xs text-cyan-600 mt-0.5">Identify any scene instantly</p>
                </motion.div>
            </motion.button>

            {/* CineDetective Modal */}
            {isOpen && <CineDetective onClose={() => setIsOpen(false)} />}
        </>
    );
}
