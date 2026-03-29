import React, { useState } from 'react';
import { User, Bell, Shield, Settings as SettingsIcon, LogOut, Save, RefreshCcw, Smartphone } from 'lucide-react';
import { useAuth } from '../store/AuthContext';

const Settings = () => {
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');
    const [saving, setSaving] = useState(false);

    const handleSave = () => {
        setSaving(true);
        setTimeout(() => {
            setSaving(false);
            alert('SYSTEM UPDATE: Configuration matrix synchronized successfully.');
        }, 1500);
    };

    const tabs = [
        { id: 'profile', name: 'Profile Intel', icon: <User size={18} /> },
        { id: 'notifications', name: 'Alert Feeds', icon: <Bell size={18} /> },
        { id: 'team', name: 'Access Controls', icon: <Shield size={18} /> },
        { id: 'system', name: 'Sales Core', icon: <SettingsIcon size={18} /> },
    ];

    return (
        <div className="p-8 ml-64 min-h-screen bg-[#f8fafc]">
            <header className="mb-10">
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
                    Protocol Settings <span className="text-sky-500 bg-sky-50 px-3 py-1 rounded-lg text-xs font-black uppercase tracking-widest border border-sky-100">v4.0.2-BETA</span>
                </h1>
                <p className="text-slate-500 font-medium">Fine-tune your sales operations and security parameters.</p>
            </header>

            <div className="flex bg-white rounded-[32px] border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden min-h-[600px]">
                {/* Left Sidebar inside settings */}
                <div className="w-72 bg-slate-50 border-r border-slate-100 p-8 flex flex-col justify-between">
                    <nav className="space-y-2">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all duration-300 ${activeTab === tab.id
                                        ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30 -translate-y-0.5'
                                        : 'text-slate-400 hover:bg-white hover:text-slate-700'
                                    }`}
                            >
                                {tab.icon} {tab.name}
                            </button>
                        ))}
                    </nav>

                    <button
                        onClick={logout}
                        className="flex items-center gap-2 px-5 py-4 text-rose-500 hover:bg-rose-50 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all"
                    >
                        <LogOut size={18} /> Terminate Session
                    </button>
                </div>

                {/* Right Content */}
                <div className="flex-1 p-12 bg-white relative overflow-y-auto">
                    {activeTab === 'profile' && (
                        <div className="max-w-xl animate-in fade-in slide-in-from-right-4 duration-500">
                            <h2 className="text-2xl font-black text-slate-900 mb-8 uppercase tracking-tighter">Profile Configuration</h2>
                            <div className="space-y-8">
                                <div className="flex items-center gap-6 mb-10">
                                    <div className="w-24 h-24 bg-sky-500 rounded-3xl flex items-center justify-center text-white text-3xl font-black shadow-xl shadow-sky-500/30">
                                        {user?.name?.[0] || 'U'}
                                    </div>
                                    <button className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-sky-600 transition-all">
                                        Upload Avatar
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Operational Name</label>
                                        <input type="text" defaultValue={user?.name || 'Admin User'} className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-xl font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Business ID</label>
                                        <input type="email" defaultValue={user?.email || 'admin@salesauto.com'} disabled className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-xl font-bold text-slate-400 cursor-not-allowed" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Regional Jurisdiction</label>
                                        <input type="text" defaultValue={user?.region || 'Global'} className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-xl font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Operational Role</label>
                                        <input type="text" defaultValue={user?.role || 'Admin'} disabled className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-xl font-bold text-slate-400 cursor-not-allowed" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div className="max-w-xl animate-in fade-in slide-in-from-right-4 duration-500">
                            <h2 className="text-2xl font-black text-slate-900 mb-8 uppercase tracking-tighter">Alert Matrix</h2>
                            <div className="space-y-6">
                                {[
                                    { name: 'Lead Acquisition Alerts', desc: 'Instant notification on new lead ingestion.', icon: <Smartphone size={20} /> },
                                    { name: 'System Heartbeat', desc: 'Diagnostic alerts for server status.', icon: <RefreshCcw size={20} /> },
                                    { name: 'High-Score Intelligence', desc: 'Alerts for leads scoring above 90.', icon: <Shield size={20} /> }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center justify-between p-6 bg-slate-50 border border-slate-100 rounded-[28px] hover:border-sky-200 hover:bg-white transition-all group">
                                        <div className="flex gap-4 items-center">
                                            <div className="p-3 bg-white rounded-2xl group-hover:text-sky-600 transition-colors shadow-sm">{item.icon}</div>
                                            <div>
                                                <h4 className="font-bold text-slate-900">{item.name}</h4>
                                                <p className="text-xs text-slate-500">{item.desc}</p>
                                            </div>
                                        </div>
                                        <div className="w-12 h-6 bg-sky-600 rounded-full relative cursor-pointer">
                                            <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1 shadow-sm"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'system' && (
                        <div className="max-w-xl animate-in fade-in slide-in-from-right-4 duration-500">
                            <h2 className="text-2xl font-black text-slate-900 mb-8 uppercase tracking-tighter">Sales Core Config</h2>
                            <p className="text-slate-500 mb-8 text-sm">Automated lead assignment logic and scoring parameters.</p>

                            <div className="space-y-6">
                                <div className="p-8 border-2 border-dashed border-slate-200 rounded-[32px] flex flex-col items-center justify-center text-center">
                                    <SettingsIcon size={48} className="text-slate-200 mb-4" />
                                    <h4 className="font-black text-[10px] uppercase tracking-widest text-slate-400">Advanced Matrix Pending</h4>
                                    <p className="text-slate-400 text-xs mt-2">Connecting to AI scoring node...</p>
                                    <button className="mt-6 px-6 py-2 bg-slate-100 text-slate-600 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-sky-50 hover:text-sky-600 transition-all">Initialize Connection</button>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="absolute bottom-12 right-12">
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="flex items-center gap-3 px-10 py-4 bg-sky-600 text-white rounded-[24px] font-black text-[11px] uppercase tracking-widest shadow-2xl shadow-sky-600/30 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                        >
                            {saving ? <RefreshCcw className="animate-spin" size={18} /> : <Save size={18} />}
                            {saving ? 'Syncing...' : 'Apply Config'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
