import React, { useState } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles } from 'lucide-react';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [messages, setMessages] = useState([
        { id: 1, type: 'bot', text: 'Hi! I am your AI Sales Assistant. How can I help you today?', time: 'Just now' }
    ]);

    const handleSend = () => {
        if (!query.trim()) return;

        const userMsg = { id: Date.now(), type: 'user', text: query, time: 'Just now' };
        setMessages([...messages, userMsg]);
        setQuery("");

        // Simulated AI response
        setTimeout(() => {
            const botMsg = {
                id: Date.now() + 1,
                type: 'bot',
                text: "I'll help you with that! Are you interested in our premium lead management features?",
                time: 'Just now'
            };
            setMessages(prev => [...prev, botMsg]);
        }, 1000);
    };

    return (
        <div className="fixed bottom-8 right-8 z-[100] group">
            {!isOpen && (
                <div className="absolute -top-12 right-0 bg-white px-3 py-1.5 rounded-xl shadow-lg text-slate-700 text-xs font-bold border border-slate-100 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    Need help? Ask me!
                </div>
            )}

            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ${isOpen ? 'bg-slate-900 rotate-90' : 'bg-sky-600 hover:bg-sky-700'
                    } text-white`}
            >
                {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
            </button>

            {isOpen && (
                <div className="absolute bottom-20 right-0 w-80 md:w-96 bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col h-[500px] animate-in slide-in-from-bottom-5 duration-300">
                    <div className="bg-sky-600 p-5 flex items-center gap-4 border-b border-sky-500/20">
                        <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl text-white">
                            <Bot size={24} className="animate-pulse" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-white text-lg tracking-tight">AI Assistant</span>
                            <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></span>
                                <span className="text-[10px] text-sky-100 uppercase font-black tracking-widest">Active Intelligence</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 p-5 overflow-y-auto bg-slate-50/50 space-y-4 custom-scrollbar">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex gap-3 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${msg.type === 'bot' ? 'bg-sky-100 text-sky-600' : 'bg-slate-900 text-white'}`}>
                                    {msg.type === 'bot' ? <Bot size={16} /> : <User size={16} />}
                                </div>
                                <div className={`max-w-[75%] p-3.5 rounded-2xl text-sm font-medium shadow-sm transition-all ${msg.type === 'bot'
                                        ? 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'
                                        : 'bg-sky-600 text-white rounded-tr-none'
                                    }`}>
                                    <p className="leading-relaxed">{msg.text}</p>
                                    <span className="text-[10px] mt-2 block opacity-60 uppercase font-black tracking-tighter">{msg.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-4 bg-white border-t border-slate-100">
                        <div className="relative flex items-center bg-slate-50 rounded-2xl px-4 py-2 border border-slate-200 focus-within:border-sky-400 focus-within:ring-2 focus-within:ring-sky-500/10 transition-all">
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Type a message..."
                                className="flex-1 bg-transparent border-none text-sm font-medium focus:outline-none placeholder:text-slate-400 text-slate-700 h-10"
                            />
                            <button
                                onClick={handleSend}
                                className="flex items-center gap-2 p-2 bg-sky-600 text-white rounded-xl hover:bg-sky-700 transition-all active:scale-95 shadow-lg shadow-sky-600/30"
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
