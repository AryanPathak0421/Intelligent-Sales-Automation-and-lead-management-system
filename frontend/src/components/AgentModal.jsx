import React, { useState } from 'react';
import { X, UserPlus, Mail, Lock, MapPin, Award, Loader2 } from 'lucide-react';
import Api from '../services/api';

const AgentModal = ({ isOpen, onClose, onRefresh }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        region: 'Global',
        role: 'Sales Agent',
        expertise: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const dataToSubmit = {
                ...formData,
                expertise: formData.expertise.split(',').map(item => item.trim()).filter(item => item !== '')
            };
            await Api.post('/users', dataToSubmit);
            onRefresh();
            onClose();
            setFormData({ name: '', email: '', password: '', region: 'Global', role: 'Sales Agent', expertise: '' });
        } catch (err) {
            setError(err.response?.data?.message || 'RECRUITMENT FAILED: Protocol breach.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-[550px] rounded-[40px] shadow-2xl overflow-hidden relative border border-white/20">
                <div className="absolute top-0 right-0 w-40 h-40 bg-sky-50 rounded-full translate-x-20 -translate-y-20 -z-10"></div>

                <header className="p-10 pb-6 flex justify-between items-start">
                    <div>
                        <div className="w-12 h-12 bg-sky-600 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg shadow-sky-600/30">
                            <UserPlus size={24} />
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">Recruit Operative</h2>
                        <p className="text-slate-500 font-medium tracking-tight">Onboarding new sales intelligence to the force.</p>
                    </div>
                    <button onClick={onClose} className="p-3 hover:bg-slate-100 rounded-2xl transition-all"><X size={24} className="text-slate-400" /></button>
                </header>

                <form onSubmit={handleSubmit} className="p-10 pt-0 space-y-6">
                    {error && (
                        <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 text-xs font-black uppercase tracking-widest flex items-center gap-3">
                            <div className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse"></div>
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Full Name</label>
                            <div className="relative group">
                                <UserPlus className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-600 transition-colors" size={18} />
                                <input
                                    required
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all font-bold text-slate-700"
                                    placeholder="Operative Name"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Business Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-600 transition-colors" size={18} />
                                <input
                                    required
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all font-bold text-slate-700"
                                    placeholder="id@salesauto.com"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Access Key (Password)</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-600 transition-colors" size={18} />
                            <input
                                required
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all font-bold text-slate-700"
                                placeholder="••••••••••••"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Deployment Region</label>
                            <div className="relative group">
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-600 transition-colors" size={18} />
                                <input
                                    required
                                    type="text"
                                    value={formData.region}
                                    onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all font-bold text-slate-700"
                                    placeholder="e.g. North America"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Specialization (Expertise)</label>
                            <div className="relative group">
                                <Award className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-600 transition-colors" size={18} />
                                <input
                                    type="text"
                                    value={formData.expertise}
                                    onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
                                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all font-bold text-slate-700"
                                    placeholder="e.g. Tech, Retail"
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-5 bg-slate-900 text-white rounded-[24px] font-black text-[12px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-2xl shadow-slate-900/30 hover:bg-sky-600 hover:shadow-sky-600/30 active:scale-[0.98] transition-all mt-4 disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <UserPlus size={20} />}
                        {loading ? 'PROCESSING ONBOARDING...' : 'CONFIRM RECRUITMENT'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AgentModal;
