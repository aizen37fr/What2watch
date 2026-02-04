import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, ChevronLeft, MoreVertical, Phone, Video, UserPlus, FileText, Activity, Dna } from 'lucide-react';
import { GROUPS } from '../data/socialMock';
import { useAuth } from '../context/AuthContext';
import TasteMatch from './TasteMatch';

interface Message {
    id: string;
    text: string;
    senderId: string; // 'me' or other
    timestamp: string;
}

export default function SocialView({ onClose }: { onClose: () => void }) {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState<'groups' | 'chats' | 'match'>('groups');
    const [selectedChat, setSelectedChat] = useState<any | null>(null);
    const [showAddFriend, setShowAddFriend] = useState(false);
    const [friendIdInput, setFriendIdInput] = useState('');

    // Default chats
    const [chats, setChats] = useState([
        { id: 'u2', name: 'Dr. Sarah', lastMessage: 'Patient stabilized.', time: 'Now' },
        { id: 'u3', name: 'Nurse Mike', lastMessage: 'Vitals spiking in Ward 4', time: '1h ago' }
    ]);

    const [messages, setMessages] = useState<Message[]>([
        { id: '1', text: 'Subject exhibiting high cortisol levels. Recommend calming visuals.', senderId: 'u2', timestamp: '0830' },
    ]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;
        const newMsg: Message = {
            id: Date.now().toString(),
            text: input,
            senderId: 'me',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
        };
        setMessages([...messages, newMsg]);
        setInput('');

        // Simulate reply
        setTimeout(() => {
            const reply: Message = {
                id: (Date.now() + 1).toString(),
                text: 'Acknowledged. Updating charts.',
                senderId: 'other',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
            };
            setMessages(prev => [...prev, reply]);
        }, 1500);
    };

    const handleAddFriend = () => {
        if (!friendIdInput.trim()) return;
        // Simulate adding a friend
        const newFriend = {
            id: friendIdInput,
            name: `Patient ${friendIdInput}`,
            lastMessage: 'New admission',
            time: 'Just now'
        };
        setChats([newFriend, ...chats]);
        setFriendIdInput('');
        setShowAddFriend(false);
        // Switch to DMs tab
        setActiveTab('chats');
    };

    return (
        <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-slate-900/95 z-[60] flex flex-col md:max-w-md md:left-auto md:border-l md:border-cyan-900/30 text-cyan-50 font-mono"
        >
            <AnimatePresence mode="wait">
                {!selectedChat ? (
                    // Chat List View
                    <motion.div
                        key="list"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex-1 flex flex-col h-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 to-slate-900"
                    >
                        {/* Header */}
                        <header className="p-6 border-b border-cyan-900/30 bg-slate-900/50 backdrop-blur-md">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold uppercase tracking-widest flex items-center gap-2 text-cyan-400">
                                    <FileText size={20} /> Patient Logs
                                </h2>
                                <button onClick={onClose} className="p-2 bg-cyan-900/20 rounded-lg hover:bg-cyan-900/40 text-cyan-400">
                                    <ChevronLeft size={20} />
                                </button>
                            </div>

                            {/* User ID Display */}
                            <div className="flex items-center justify-between p-3 bg-black/40 rounded-sm border border-cyan-900/30">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-sm bg-cyan-900/50 flex items-center justify-center font-bold text-lg border border-cyan-500/30 text-cyan-300">
                                        {user?.name?.[0]?.toUpperCase() || 'U'}
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm uppercase tracking-wider text-cyan-200">{user?.name}</p>
                                        <p className="text-[10px] text-cyan-600 font-mono uppercase">ID: {user?.email?.split('@')[0] || 'GUEST-01'}</p>
                                    </div>
                                </div>
                                <Activity size={18} className="text-green-500 animate-pulse" />
                            </div>
                        </header>

                        {/* Tabs */}
                        <div className="flex p-4 gap-2">
                            <button
                                onClick={() => setActiveTab('groups')}
                                className={`flex-1 py-3 rounded-sm text-xs font-bold uppercase tracking-wider transition-all border ${activeTab === 'groups' ? 'bg-cyan-900/40 border-cyan-500/50 text-cyan-300' : 'bg-transparent border-cyan-900/30 text-cyan-700 hover:bg-cyan-900/10'}`}
                            >
                                Wards
                            </button>
                            <button
                                onClick={() => setActiveTab('chats')}
                                className={`flex-1 py-3 rounded-sm text-xs font-bold uppercase tracking-wider transition-all border ${activeTab === 'chats' ? 'bg-cyan-900/40 border-cyan-500/50 text-cyan-300' : 'bg-transparent border-cyan-900/30 text-cyan-700 hover:bg-cyan-900/10'}`}
                            >
                                Consults
                            </button>
                            <button
                                onClick={() => setActiveTab('match')}
                                className={`flex-1 py-3 rounded-sm text-xs font-bold uppercase tracking-wider transition-all border flex items-center justify-center gap-1 ${activeTab === 'match' ? 'bg-purple-900/40 border-purple-500/50 text-purple-300' : 'bg-transparent border-cyan-900/30 text-cyan-700 hover:bg-cyan-900/10'}`}
                            >
                                <Dna size={12} /> Genetics
                            </button>
                        </div>

                        {/* List */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-2">
                            {activeTab === 'match' ? (
                                <TasteMatch />
                            ) : activeTab === 'groups' ? (
                                GROUPS.map(group => (
                                    <motion.div
                                        key={group.id}
                                        layoutId={group.id}
                                        onClick={() => setSelectedChat(group)}
                                        className="p-4 bg-black/20 rounded-sm flex items-center gap-4 hover:bg-cyan-900/10 cursor-pointer border border-cyan-900/20 group"
                                    >
                                        <div className="w-12 h-12 rounded-sm bg-cyan-900/20 flex items-center justify-center text-sm font-bold text-cyan-400 border border-cyan-900/50 group-hover:border-cyan-400/50 transition-colors">
                                            {group.name[0]}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-center mb-1">
                                                <h3 className="font-bold text-sm uppercase tracking-wide text-cyan-100">{group.name}</h3>
                                                <span className="text-[10px] text-cyan-700 font-mono">{group.time}</span>
                                            </div>
                                            <p className="text-cyan-600 text-xs truncate font-mono">{group.lastMessage}</p>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <>
                                    {/* Add Friend Trigger */}
                                    <button
                                        onClick={() => setShowAddFriend(!showAddFriend)}
                                        className="w-full py-3 border border-dashed border-cyan-900/40 rounded-sm hover:bg-cyan-900/10 text-cyan-600 flex items-center justify-center gap-2 mb-4 text-xs font-bold uppercase tracking-wider"
                                    >
                                        <UserPlus size={16} /> Admit New Patient
                                    </button>

                                    {/* Add Friend Input */}
                                    <AnimatePresence>
                                        {showAddFriend && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden mb-4"
                                            >
                                                <div className="flex gap-2">
                                                    <input
                                                        type="text"
                                                        placeholder="Enter patient ID"
                                                        value={friendIdInput}
                                                        onChange={(e) => setFriendIdInput(e.target.value)}
                                                        className="flex-1 bg-black/40 border border-cyan-900/30 rounded-sm px-4 py-2 text-cyan-100 focus:outline-none focus:border-cyan-500 font-mono text-sm"
                                                    />
                                                    <button
                                                        onClick={handleAddFriend}
                                                        disabled={!friendIdInput.trim()}
                                                        className="bg-cyan-900/50 border border-cyan-500/30 text-cyan-300 px-4 rounded-sm font-bold disabled:opacity-50 text-xs uppercase"
                                                    >
                                                        Admit
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {chats.map(chat => (
                                        <motion.div
                                            key={chat.id}
                                            onClick={() => setSelectedChat(chat)}
                                            className="p-4 bg-black/20 rounded-sm flex items-center gap-4 hover:bg-cyan-900/10 cursor-pointer border border-cyan-900/20 group"
                                        >
                                            <div className="w-12 h-12 rounded-sm bg-green-900/20 flex items-center justify-center text-sm font-bold text-green-400 border border-green-900/50 group-hover:border-green-400/50 transition-colors">
                                                {chat.name[0]}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-center mb-1">
                                                    <h3 className="font-bold text-sm uppercase tracking-wide text-cyan-100">{chat.name}</h3>
                                                    <span className="text-[10px] text-cyan-700 font-mono">{chat.time}</span>
                                                </div>
                                                <p className="text-cyan-600 text-xs truncate font-mono">{chat.lastMessage}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </>
                            )}
                        </div>
                    </motion.div>
                ) : (
                    // Active Chat View
                    <motion.div
                        key="chat"
                        initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }}
                        className="flex-1 flex flex-col h-full bg-slate-900"
                    >
                        {/* Header */}
                        <header className="p-4 border-b border-cyan-900/30 flex items-center justify-between bg-black/40 backdrop-blur-md">
                            <div className="flex items-center gap-3">
                                <button onClick={() => setSelectedChat(null)} className="p-2 hover:bg-cyan-900/20 rounded-lg text-cyan-400">
                                    <ChevronLeft size={20} />
                                </button>
                                <div className="w-10 h-10 rounded-sm bg-cyan-900/20 flex items-center justify-center text-sm font-bold text-cyan-400 border border-cyan-900/50">
                                    {selectedChat.name[0]}
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm uppercase tracking-wide text-cyan-100">{selectedChat.name}</h3>
                                    <span className="text-[10px] text-green-500 flex items-center gap-1 font-mono uppercase">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Vitals Stable
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-2 text-cyan-700">
                                <button className="p-2 hover:bg-cyan-900/20 rounded-lg"><Phone size={18} /></button>
                                <button className="p-2 hover:bg-cyan-900/20 rounded-lg"><Video size={18} /></button>
                                <button className="p-2 hover:bg-cyan-900/20 rounded-lg"><MoreVertical size={18} /></button>
                            </div>
                        </header>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map(msg => (
                                <div key={msg.id} className={`flex ${msg.senderId === 'me' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[85%] p-3 rounded-sm border ${msg.senderId === 'me'
                                        ? 'bg-cyan-900/20 border-cyan-500/30 text-cyan-100'
                                        : 'bg-black/40 border-cyan-900/30 text-gray-300'
                                        }`}>
                                        <p className="text-sm leading-relaxed">{msg.text}</p>
                                        <span className="text-[9px] opacity-50 mt-1 block text-right font-mono tracking-wider">{msg.timestamp}</span>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 bg-black/60 backdrop-blur-md border-t border-cyan-900/30">
                            <div className="flex gap-2 items-center">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Enter log entry..."
                                    className="flex-1 bg-slate-900/80 border border-cyan-900/30 rounded-sm px-4 py-3 text-cyan-100 placeholder-cyan-800 focus:outline-none focus:border-cyan-500/50 outline-none transition-all font-mono text-sm"
                                />
                                <button
                                    onClick={handleSend}
                                    className="p-3 bg-cyan-900/40 border border-cyan-500/30 rounded-sm hover:bg-cyan-900/60 transition-colors text-cyan-400"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
