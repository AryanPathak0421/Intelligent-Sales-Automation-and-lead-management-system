import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, ShieldCheck } from 'lucide-react';
import { useAuth } from '../store/AuthContext';
import Api from '../services/api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await Api.post('/users/login', { email, password });
            login(data);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please check credentials.');
        }
    };

    return (
        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-sky-900/40 via-transparent to-transparent">
            <div className="w-full max-w-[450px] bg-white rounded-3xl p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 rounded-full translate-x-16 -translate-y-16"></div>

                <header className="mb-10 relative">
                    <div className="w-12 h-12 bg-sky-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-xl shadow-sky-600/30">
                        <ShieldCheck size={28} />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 leading-tight">Secure Login</h1>
                    <p className="text-slate-500 font-medium">Access your intelligent sales command center.</p>
                </header>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-bold border border-red-100 flex items-center gap-3">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Business Email</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-600 transition-colors" size={20} />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:bg-white focus:border-sky-500 transition-all font-medium text-slate-700"
                                placeholder="name@company.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between pl-1">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Access Key</label>
                            <a href="#" className="text-xs font-bold text-sky-600 hover:text-sky-700 transition-colors">Forgot Access?</a>
                        </div>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-600 transition-colors" size={20} />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:bg-white focus:border-sky-500 transition-all font-medium text-slate-700"
                                placeholder="••••••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-5 bg-sky-600 text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-sky-600/30 hover:bg-sky-700 active:scale-[0.98] transition-all text-lg"
                    >
                        <LogIn size={20} /> Authenticate
                    </button>
                </form>

                <footer className="mt-10 text-center">
                    <p className="text-sm font-medium text-slate-400 tracking-tight">Need a secure environment for your team?</p>
                    <button className="mt-2 text-sm font-bold text-slate-900 hover:text-sky-600 transition-colors">Request Admin Access</button>
                </footer>
            </div>
        </div>
    );
};

export default Login;
