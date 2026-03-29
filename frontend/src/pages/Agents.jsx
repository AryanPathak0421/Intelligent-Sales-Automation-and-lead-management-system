import React, { useEffect, useState } from 'react';
import { Users, Mail, MapPin, Award, Trash2, ShieldCheck, UserCheck, UserPlus, Search } from 'lucide-react';
import Api from '../services/api';
import AgentModal from '../components/AgentModal';

const Agents = () => {
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');

    const fetchAgents = async () => {
        try {
            const { data } = await Api.get('/users/agents');
            setAgents(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAgents();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('PROTOCOL: Are you sure you want to decommission this agent?')) {
            try {
                await Api.deleteAgent(id);
                fetchAgents();
            } catch (err) {
                alert('DECOMMISSION FAILED: ACCESS DENIED');
            }
        }
    };

    const filteredAgents = agents.filter(agent =>
        agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-8 ml-64 min-h-screen bg-[#f8fafc]">
            <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Sales Force</h1>
                    <p className="text-slate-500 font-medium">Managing assignments and performance of your sales agents.</p>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Locate operative..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all font-medium"
                        />
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-6 py-2.5 bg-sky-600 text-white rounded-xl font-bold font-black text-[10px] uppercase tracking-widest shadow-lg shadow-sky-600/30 hover:bg-sky-700 hover:scale-105 active:scale-95 transition-all whitespace-nowrap"
                    >
                        <UserPlus size={18} /> Recruit
                    </button>
                </div>
            </header>

            {loading ? (
                <div className="shimmer h-64 w-full rounded-3xl"></div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {filteredAgents.map(agent => (
                        <div key={agent._id} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/50 group hover:border-sky-200 transition-all">
                            <div className="flex items-start justify-between mb-8">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center font-black text-xl shadow-sm group-hover:bg-sky-600 group-hover:text-white transition-all">
                                        {agent.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                            {agent.name}
                                            {agent.role === 'Admin' && <ShieldCheck size={18} className="text-sky-500" />}
                                        </h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Mail size={14} className="text-slate-400" />
                                            <span className="text-sm font-medium text-slate-500">{agent.email}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100 bg-emerald-50 text-emerald-600`}>
                                    Active Force
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 mb-8">
                                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Region</span>
                                    <div className="flex items-center gap-1.5 font-bold text-slate-700 text-sm">
                                        <MapPin size={14} /> {agent.region}
                                    </div>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Expertise</span>
                                    <div className="flex items-center gap-1.5 font-bold text-slate-700 text-sm">
                                        <Award size={14} /> {agent.expertise?.[0] || 'Gen Sales'}
                                    </div>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Workload</span>
                                    <div className="flex items-center gap-1.5 font-bold text-slate-700 text-sm">
                                        <UserCheck size={14} /> {agent.workload} Active
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => alert(`COLLECTING METRICS: ${agent.name}\nStatus: ALPHA\nPerformance: OPTIMIZED`)}
                                    className="flex-1 py-3 bg-slate-50 text-slate-700 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-100 transition-all border border-slate-100"
                                >
                                    Performance Details
                                </button>
                                <button
                                    onClick={() => handleDelete(agent._id)}
                                    className="p-3 bg-rose-50 text-rose-500 border border-rose-100 rounded-xl hover:bg-rose-500 hover:text-white transition-all active:scale-95 shadow-sm"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <AgentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onRefresh={fetchAgents}
            />
        </div>
    );
};

export default Agents;
