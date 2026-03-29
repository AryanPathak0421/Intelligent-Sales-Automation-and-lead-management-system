import React, { useEffect, useState } from 'react';
import { MoreHorizontal, Search, UserPlus, Filter, Download, ArrowUpRight, ShieldAlert, Trash2 } from 'lucide-react';
import Api from '../services/api';
import LeadModal from '../components/LeadModal';
import LeadDrawer from '../components/LeadDrawer';

const Leads = () => {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLead, setSelectedLead] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');

    const fetchLeads = async () => {
        try {
            const { data } = await Api.get('/leads');
            setLeads(data);
        } catch (err) {
            setError('Failed to fetch lead data. Connect to infrastructure.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeads();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('EVISCERATE LEAD: Are you sure? Data will be purged.')) {
            try {
                await Api.deleteLead(id);
                fetchLeads();
            } catch (err) {
                alert('PURGE FAILED: BUFFER OVERFLOW');
            }
        }
    };

    const downloadCSV = () => {
        const headers = ['Name', 'Email', 'Phone', 'Source', 'Status', 'Score', 'Classification'];
        const csvContent = [
            headers.join(','),
            ...leads.map(l => [l.name, l.email, l.phone, l.source, l.status, l.score, l.classification].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', 'leads_intel_export.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const filteredLeads = leads.filter(l =>
        l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-8 ml-64 min-h-screen bg-[#f8fafc]">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Lead Database</h1>
                    <p className="text-slate-500 font-medium">Centralized dashboard for all incoming and managed leads.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={downloadCSV}
                        className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:text-sky-600 hover:border-sky-200 transition-all shadow-sm"
                    >
                        <Download size={20} />
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-700 font-bold shadow-sm hover:shadow-md transition-all font-black text-[10px] uppercase tracking-widest">
                        <Filter size={18} /> Filter
                    </button>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-6 py-2.5 bg-sky-600 text-white rounded-xl font-bold shadow-lg shadow-sky-600/30 hover:bg-sky-700 transition-all"
                    >
                        <UserPlus size={18} /> New Lead
                    </button>
                    <LeadModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onRefresh={fetchLeads}
                    />
                </div>
            </header>

            {loading ? (
                <div className="flex flex-col items-center justify-center p-20 bg-white rounded-3xl border border-slate-100 shadow-xl">
                    <div className="w-16 h-16 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-slate-500 font-bold uppercase tracking-widest text-xs">Accessing lead infrastructure...</p>
                </div>
            ) : error ? (
                <div className="p-20 bg-white rounded-3xl border border-rose-100 shadow-xl flex flex-col items-center">
                    <ShieldAlert size={64} className="text-rose-500 mb-6" />
                    <h2 className="text-xl font-bold text-slate-900 mb-2 font-mono">ENCOUNTERED SYSTEM FAULT</h2>
                    <p className="text-slate-500 font-medium mb-6">{error}</p>
                    <button onClick={fetchLeads} className="px-6 py-2 bg-slate-900 text-white rounded-xl font-bold hover:bg-sky-600 transition-all">Retry Secure Connection</button>
                </div>
            ) : (
                <div className="bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
                    <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                        <div className="relative w-80">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input
                                type="text"
                                placeholder="Search system database..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all font-medium"
                            />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-[#fcfdfe] border-b border-slate-100">
                                <tr>
                                    <th className="p-5 font-bold text-xs uppercase text-slate-500 tracking-widest">Target Intel</th>
                                    <th className="p-5 font-bold text-xs uppercase text-slate-500 tracking-widest">Score & Logic</th>
                                    <th className="p-5 font-bold text-xs uppercase text-slate-500 tracking-widest">Active Phase</th>
                                    <th className="p-5 font-bold text-xs uppercase text-slate-500 tracking-widest">Recency</th>
                                    <th className="p-5"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredLeads.map(lead => (
                                    <tr key={lead._id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="p-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-sky-600 font-black text-xs shadow-inner group-hover:bg-sky-600 group-hover:text-white transition-all shadow-sm">
                                                    {lead.name.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-slate-900 group-hover:text-sky-600 transition-colors">{lead.name}</span>
                                                    <span className="text-[10px] text-slate-500 font-black uppercase tracking-tighter">Source: {lead.source}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-5">
                                            <div className="flex items-center gap-2">
                                                <span className={`px-2.5 py-1 rounded-lg text-xs font-black border tracking-tighter shadow-sm ${lead.classification === 'Hot'
                                                    ? 'bg-rose-50 text-rose-600 border-rose-100'
                                                    : 'bg-amber-50 text-amber-600 border-amber-100'
                                                    }`}>
                                                    {lead.score || 0}
                                                </span>
                                                <span className={`text-[10px] font-black uppercase tracking-widest ${lead.classification === 'Hot' ? 'text-rose-400' : 'text-amber-400'
                                                    }`}>
                                                    {lead.classification}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-5">
                                            <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm ${lead.status === 'Qualified'
                                                ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                                : lead.status === 'New Lead'
                                                    ? 'bg-sky-50 text-sky-600 border-sky-100'
                                                    : 'bg-slate-50 text-slate-600 border-slate-100'
                                                }`}>
                                                {lead.status}
                                            </span>
                                        </td>
                                        <td className="p-5 text-[11px] text-slate-500 font-bold uppercase tracking-tight">
                                            {new Date(lead.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="p-5">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => {
                                                        setSelectedLead(lead);
                                                        setIsDrawerOpen(true);
                                                    }}
                                                    className="p-2 hover:bg-white border border-transparent hover:border-sky-200 rounded-lg text-slate-400 hover:text-sky-600 transition-all active:scale-95 flex items-center gap-2 group/btn"
                                                >
                                                    <span className="text-[10px] font-black uppercase tracking-widest opacity-0 group-hover/btn:opacity-100 transition-opacity">Pulse</span>
                                                    <ArrowUpRight size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(lead._id)}
                                                    className="p-2 hover:bg-rose-50 border border-transparent hover:border-rose-100 rounded-lg text-slate-400 hover:text-rose-600 transition-all active:scale-95"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            <div className="p-5 border-t border-slate-100 bg-slate-50/30 flex justify-between items-center">
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Showing {filteredLeads.length} of {leads.length} system nodes</p>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 shadow-sm transition-all disabled:opacity-50">Back</button>
                    <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 shadow-sm transition-all">Forward</button>
                </div>
            </div>
            <LeadDrawer
                isOpen={isDrawerOpen}
                lead={selectedLead}
                onClose={() => setIsDrawerOpen(false)}
            />
        </div>
    );
};

export default Leads;
