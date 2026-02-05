import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { chatWithAI } from '../services/deepseek';

interface Message {
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

export default function AIChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'assistant',
            content: "Hi! I'm CineBot 🤖 Ask me anything about movies, TV shows, or anime!",
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            role: 'user',
            content: input,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            // Build conversation history
            const history = messages.map(m => ({
                role: m.role,
                content: m.content
            }));

            const response = await chatWithAI(input, history);

            if (response) {
                setMessages(prev => [...prev, {
                    role: 'assistant',
                    content: response,
                    timestamp: new Date()
                }]);
            } else {
                setMessages(prev => [...prev, {
                    role: 'assistant',
                    content: "Sorry, I'm having trouble connecting right now. Try again!",
                    timestamp: new Date()
                }]);
            }
        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: "Oops! Something went wrong. Please try again.",
                timestamp: new Date()
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <>
            {/* Floating Chat Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-cyan-500 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-cyan-500/50 transition-all"
                    >
                        <MessageCircle size={28} />
                        <motion.div
                            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <Sparkles size={12} />
                        </motion.div>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.8 }}
                        className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-2 border-cyan-900/30 rounded-2xl shadow-2xl shadow-cyan-900/50 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-cyan-950/50 to-purple-950/50 p-4 border-b border-cyan-900/30 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-cyan-900/30 rounded-lg">
                                    <Sparkles className="w-5 h-5 text-cyan-400" />
                                </div>
                                <div>
                                    <h3 className="text-cyan-100 font-bold">CineBot</h3>
                                    <p className="text-xs text-cyan-600">AI Movie Expert</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-cyan-900/20 rounded-lg transition-colors text-cyan-400"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((message, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] rounded-2xl p-3 ${message.role === 'user'
                                                ? 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white'
                                                : 'bg-slate-800/50 border border-cyan-900/30 text-cyan-100'
                                            }`}
                                    >
                                        <p className="text-sm">{message.content}</p>
                                        <p className="text-xs opacity-60 mt-1">
                                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}

                            {isLoading && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex justify-start"
                                >
                                    <div className="bg-slate-800/50 border border-cyan-900/30 rounded-2xl p-3">
                                        <div className="flex gap-2">
                                            <motion.div
                                                className="w-2 h-2 bg-cyan-400 rounded-full"
                                                animate={{ scale: [1, 1.5, 1] }}
                                                transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                                            />
                                            <motion.div
                                                className="w-2 h-2 bg-cyan-400 rounded-full"
                                                animate={{ scale: [1, 1.5, 1] }}
                                                transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                                            />
                                            <motion.div
                                                className="w-2 h-2 bg-cyan-400 rounded-full"
                                                animate={{ scale: [1, 1.5, 1] }}
                                                transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="bg-slate-950/50 p-4 border-t border-cyan-900/30">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Ask about movies, shows, anime..."
                                    className="flex-1 bg-slate-900/50 border border-cyan-900/30 rounded-lg px-4 py-2 text-cyan-100 placeholder-cyan-700 focus:outline-none focus:border-cyan-700 transition-colors"
                                    disabled={isLoading}
                                />
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={sendMessage}
                                    disabled={!input.trim() || isLoading}
                                    className="bg-gradient-to-r from-cyan-600 to-purple-600 text-white p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Send size={20} />
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
