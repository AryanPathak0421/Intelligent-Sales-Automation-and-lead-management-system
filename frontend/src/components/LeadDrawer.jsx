import React from 'react';
import { X, Mail, Phone, MessageSquare, Clock, ArrowUpRight, ShieldCheck, Zap, User } from 'lucide-react';

const LeadDrawer = ({ isOpen, lead, onClose }) => {
    if (!lead) return null;

    const activities = lead.activityLogs || [
        { action: 'Lead Captured', createdAt: lead.createdAt },
        { action: 'AI Scoring Initialized', createdAt: lead.createdAt },
    ];

    const handleMockAction = (action) => {
        alert(`PROTOCOL: Initializing ${action} for ${lead.name}...`);
    };

    return (
        <>
            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] animate-in fade-in duration-300"
                    onClick={onClose}
                />
            )}

            {/* Drawer */}
            <div className={`fixed right-0 top-0 h-screen w-[450px] bg-white z-[70] shadow-[-20px_0_40px_rgba(0,0,0,0.1)] transform transition-transform duration-500 ease-out border-l border-slate-100 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full bg-[#fcfdfe]">
                    {/* Header */}
                    <header className="p-8 pb-12 bg-slate-900 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/20 rounded-full translate-x-12 -translate-y-12"></div>

                        <div className="flex justify-between items-start relative z-10">
                            <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl">
                                {lead.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-all"><X size={24} /></button>
                        </div>

                        <div className="mt-6 relative z-10">
                            <h2 className="text-3xl font-black tracking-tighter uppercase">{lead.name}</h2>
                            <div className="flex items-center gap-2 mt-2 opacity-60">
                                <Mail size={14} />
                                <span className="text-sm font-medium">{lead.email}</span>
                            </div>
                        </div>

                        <div className="absolute -bottom-6 right-8 flex gap-3">
                            <div className="px-5 py-3 bg-white rounded-2xl shadow-xl flex flex-col items-center min-w-[100px] border border-slate-100 group hover:border-sky-500 transition-all">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Score</span>
                                <span className="text-2xl font-black text-slate-900 group-hover:text-sky-600 transition-colors tracking-tighter">{lead.score || 0}</span>
                            </div>
                        </div>
                    </header>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-8 pt-16">
                        {/* Quick Actions */}
                        <section className="mb-10">
                            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                                < Zap size={14} className="text-amber-500" /> Operational Shortcuts
                            </h3>
                            <div className="grid grid-cols-3 gap-4">
                                <button onClick={() => handleMockAction('Email Uplink')} className="flex flex-col items-center gap-3 p-4 bg-white border border-slate-100 rounded-2xl hover:border-sky-500 hover:shadow-lg transition-all group">
                                    <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-sky-50 group-hover:text-sky-600 transition-colors"><Mail size={20} /></div>
                                    <span className="text-[10px] font-black uppercase text-slate-500">Email</span>
                                </button>
                                <button onClick={() => handleMockAction('Voice Comms')} className="flex flex-col items-center gap-3 p-4 bg-white border border-slate-100 rounded-2xl hover:border-emerald-500 hover:shadow-lg transition-all group">
                                    <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors"><Phone size={20} /></div>
                                    <span className="text-[10px] font-black uppercase text-slate-500">Call</span>
                                </button>
                                <button onClick={() => handleMockAction('WhatsApp Sync')} className="flex flex-col items-center gap-3 p-4 bg-white border border-slate-100 rounded-2xl hover:border-emerald-600 hover:shadow-lg transition-all group">
                                    <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-colors"><MessageSquare size={20} /></div>
                                    <span className="text-[10px] font-black uppercase text-slate-500">Sync</span>
                                </button>
                            </div>
                        </section>

                        {/* Timeline */}
                        <section>
                            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                                <Clock size={14} className="text-sky-500" /> Activity Pulse
                            </h3>
                            <div className="space-y-6 relative pl-4 border-l border-slate-200">
                                {activities.map((activity, i) => (
                                    <div key={i} className="relative">
                                        <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-white border-2 border-sky-500 group-hover:scale-125 transition-transform" />
                                        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                                            <p className="text-sm font-bold text-slate-800">{activity.action}</p>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">
                                                {new Date(activity.createdAt).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Assignments */}
                        <section className="mt-10 pt-10 border-t border-slate-100">
                            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Assigned Operative</h3>
                            <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100">
                                <div className="w-10 h-10 bg-sky-50 text-sky-600 rounded-xl flex items-center justify-center font-black">AD</div>
                                <div>
                                    <p className="text-sm font-bold text-slate-900">Alpha Director (Admin)</p>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase">System Overseer</p>
                                </div>
                                <button className="ml-auto p-2 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-all">
                                    <ArrowUpRight size={18} />
                                </button>
                            </div>
                        </section>
                    </div>

                    {/* Footer */}
                    <footer className="p-8 border-t border-slate-100 bg-white">
                        <button
                            disabled
                            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-[12px] uppercase tracking-widest opacity-50 cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            <ShieldCheck size={18} /> Pulse Optimized
                        </button>
                    </footer>
                </div>
            </div>
        </>
    );
};

export default LeadDrawer;
