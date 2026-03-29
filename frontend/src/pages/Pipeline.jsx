import { useEffect, useState } from 'react';
import { MoreHorizontal, GripVertical, Plus, User, Mail, Phone, Clock } from 'lucide-react';
import Api from '../services/api';
import LeadModal from '../components/LeadModal';

const Pipeline = () => {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchLeads = async () => {
            try {
                const { data } = await Api.get('/leads');
                setLeads(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchLeads();
    }, []);

    const getStageItems = (status) => {
        return leads.filter(l => l.status === status).map(l => ({
            id: l._id,
            name: l.name,
            company: l.email, // using email as company for now or source
            score: l.score,
            source: l.source,
            updatedAt: l.updatedAt
        }));
    };

    const stages = [
        { id: 'New Lead', name: 'New Lead', color: 'bg-sky-500', items: getStageItems('New Lead') },
        { id: 'Contacted', name: 'Contacted', color: 'bg-indigo-500', items: getStageItems('Contacted') },
        { id: 'Qualified', name: 'Qualified', color: 'bg-amber-500', items: getStageItems('Qualified') },
        { id: 'Converted', name: 'Converted', color: 'bg-emerald-500', items: getStageItems('Converted') },
    ];

    if (loading) return (
        <div className="p-8 ml-64 min-h-screen flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-sky-500 border-t-transparent rounded-full animate-spin shadow-xl"></div>
        </div>
    );

    return (
        <div className="p-8 ml-64 min-h-screen bg-[#f8fafc]">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Sales Pipeline</h1>
                    <p className="text-slate-500 font-medium">Visualizing lead progression and opportunity health.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => alert('HISTORICAL INTELLIGENCE: Synchronizing with archival nodes...')}
                        className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-700 shadow-sm hover:shadow-md transition-all active:scale-95"
                    >
                        History
                    </button>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-6 py-2.5 bg-sky-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-sky-600/30 hover:bg-sky-700 transition-all active:scale-95"
                    >
                        <Plus size={18} /> Opportunity
                    </button>
                </div>
            </header>

            <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide min-h-[calc(100vh-250px)]">
                {stages.map(stage => (
                    <div key={stage.id} className="min-w-[300px] w-80 bg-slate-100/40 rounded-2xl border border-slate-200/40 flex flex-col shadow-sm">
                        <div className="p-4 flex items-center justify-between border-b border-slate-200/40 bg-[#fefeff] rounded-t-2xl">
                            <div className="flex items-center gap-2">
                                <div className={`w-2.5 h-2.5 rounded-full ${stage.color} animate-pulse`}></div>
                                <h3 className="font-bold text-slate-700 text-sm uppercase tracking-widest">{stage.name}</h3>
                                <span className="bg-slate-200/50 px-2 py-0.5 rounded text-[10px] font-black text-slate-500">{stage.items.length}</span>
                            </div>
                            <button className="text-slate-400 hover:text-sky-600"><MoreHorizontal size={18} /></button>
                        </div>

                        <div className="p-3 space-y-4 flex-grow overflow-y-auto">
                            {stage.items.map(lead => (
                                <div key={lead.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-sky-300 transition-all duration-300 cursor-grab group">
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] uppercase font-black text-slate-400 tracking-widest leading-none mb-1">{lead.source}</span>
                                            <p className="font-bold text-slate-900 group-hover:text-sky-600 transition-colors">{lead.name}</p>
                                        </div>
                                        <GripVertical className="text-slate-300 group-hover:text-slate-400" size={16} />
                                    </div>

                                    <div className="mb-4">
                                        <p className="text-xs text-slate-500 font-medium truncate">{lead.company}</p>
                                    </div>

                                    <div className="flex justify-between items-center pt-3 border-t border-slate-50">
                                        <div className="flex gap-2">
                                            <button className="w-7 h-7 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400 hover:bg-sky-50 hover:text-sky-600 transition-colors">
                                                <Mail size={14} />
                                            </button>
                                            <button className="w-7 h-7 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400 hover:bg-sky-50 hover:text-sky-600 transition-colors">
                                                <Phone size={14} />
                                            </button>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className={`text-[10px] font-black uppercase tracking-tighter ${lead.score > 80 ? 'text-red-500' : 'text-amber-500'}`}>Score: {lead.score || 0}</span>
                                            <div className="flex items-center gap-1 text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                                                <Clock size={10} /> {new Date(lead.updatedAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 hover:text-sky-500 hover:border-sky-200 hover:bg-white flex items-center justify-center gap-2 transition-all font-black text-[10px] uppercase tracking-widest"
                            >
                                <Plus size={16} /> Add Opportunity
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <LeadModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onRefresh={() => {
                    const fetchLeads = async () => {
                        const { data } = await Api.get('/leads');
                        setLeads(data);
                    };
                    fetchLeads();
                }}
            />
        </div>
    );
};

export default Pipeline;
