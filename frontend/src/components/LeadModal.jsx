import React, { useState } from 'react';
import { X, User, Mail, Phone, MapPin, Target, Send } from 'lucide-react';
import Api from '../services/api';

const LeadModal = ({ isOpen, onClose, onRefresh }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        source: 'Website',
        region: 'North America',
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await Api.post('/leads', formData);
            onRefresh();
            onClose();
            setFormData({ name: '', email: '', phone: '', source: 'Website', region: 'North America' });
        } catch (error) {
            alert('Failed to create lead');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
            <div className="w-full max-w-[600px] bg-white rounded-[32px] overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-300">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 bg-slate-100 rounded-full text-slate-400 hover:text-slate-900 transition-all hover:bg-slate-200"
                >
                    <X size={20} />
                </button>

                <div className="bg-sky-600 p-10 flex items-center gap-6 text-white overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full translate-x-12 -translate-y-12"></div>
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 shadow-2xl">
                        <Send size={32} />
                    </div>
                    <div className="relative">
                        <h2 className="text-3xl font-bold tracking-tight">Capture Lead</h2>
                        <p className="text-sky-100 font-medium">Inject a new potential opportunity into the pipeline.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-10 grid grid-cols-2 gap-6 bg-[#fcfdfe]">
                    <div className="space-y-2 col-span-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Target Name</label>
                        <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-600 transition-colors" size={18} />
                            <input
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:bg-white focus:border-sky-500 transition-all font-medium text-slate-700"
                                placeholder="E.g. Elon Musk"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Contact Email</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-600 transition-colors" size={18} />
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:bg-white focus:border-sky-500 transition-all font-medium text-slate-700"
                                placeholder="elon@test.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Mobile Access</label>
                        <div className="relative group">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-600 transition-colors" size={18} />
                            <input
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:bg-white focus:border-sky-500 transition-all font-medium text-slate-700"
                                placeholder="+1 (555) 000-0000"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Capture Source</label>
                        <div className="relative group">
                            <Target className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-600 transition-colors" size={18} />
                            <select
                                value={formData.source}
                                onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:bg-white focus:border-sky-500 transition-all font-medium text-slate-700 appearance-none"
                            >
                                <option>Website</option>
                                <option>Social Media</option>
                                <option>Form</option>
                                <option>Referral</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Operation Region</label>
                        <div className="relative group">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-600 transition-colors" size={18} />
                            <select
                                value={formData.region}
                                onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:bg-white focus:border-sky-500 transition-all font-medium text-slate-700 appearance-none"
                            >
                                <option>North America</option>
                                <option>Europe</option>
                                <option>Asia</option>
                                <option>Global</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-span-2 pt-6 flex gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-4 bg-slate-100 text-slate-700 rounded-2xl font-bold hover:bg-slate-200 transition-all active:scale-95"
                        >
                            Cancel
                        </button>
                        <button
                            disabled={loading}
                            type="submit"
                            className="flex-[2] py-4 bg-sky-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-sky-600/30 hover:bg-sky-700 active:scale-[0.98] transition-all disabled:bg-slate-300"
                        >
                            {loading ? 'Creating...' : 'Inject Opportunity'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LeadModal;
