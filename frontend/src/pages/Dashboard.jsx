import React, { useEffect, useState } from 'react';
import { Users, GitMerge, BarChart3, Settings, TrendingUp, Search, ShieldAlert } from 'lucide-react';
import StatCard from '../components/StatCard';
import Api from '../services/api';
import { Line, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({ total: 0, qualified: 0, revenue: 0, convRate: 0, hot: 0, warm: 0, cold: 0 });
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const [leadsRes, agentsRes] = await Promise.all([
                    Api.get('/leads'),
                    Api.get('/users/agents')
                ]);

                const data = leadsRes.data;
                const qualified = data.filter(l => l.status === 'Qualified' || l.status === 'Converted').length;
                const converted = data.filter(l => l.status === 'Converted').length;

                setStats({
                    total: data.length,
                    qualified: qualified,
                    convRate: data.length ? ((converted / data.length) * 100).toFixed(1) : 0,
                    revenue: converted * 5000,
                    hot: data.filter(l => l.classification === 'Hot').length,
                    warm: data.filter(l => l.classification === 'Warm').length,
                    cold: data.filter(l => l.classification === 'Cold').length,
                });
                setAgents(agentsRes.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchAllData();
    }, []);

    const activities = [
        { id: 1, type: 'Lead', msg: 'New inbound lead from Website (Alpha Node)', time: '2m ago', color: 'text-sky-500' },
        { id: 2, type: 'Agent', msg: 'Agent John Doe reassigned to High-Value target', time: '15m ago', color: 'text-emerald-500' },
        { id: 3, type: 'Score', msg: 'Global conversion rate increased by 2.4%', time: '1h ago', color: 'text-amber-500' },
        { id: 4, type: 'System', msg: 'Protocol synchronization complete in EU Region', time: '3h ago', color: 'text-rose-500' },
    ];

    const chartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Projected Revenue',
                data: [33000, 42000, 39000, 56000, 48000, 72000],
                borderColor: '#0ea5e9',
                backgroundColor: 'rgba(14, 165, 233, 0.1)',
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const barData = {
        labels: ['Hot', 'Warm', 'Cold'],
        datasets: [
            {
                label: 'Leads per Category',
                data: [stats.hot, stats.warm, stats.cold],
                backgroundColor: ['#ef4444', '#f59e0b', '#3b82f6'],
                borderRadius: 8,
            },
        ],
    };

    if (loading) return (
        <div className="p-8 ml-64 min-h-screen flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-sky-500 border-t-transparent rounded-full animate-spin shadow-xl"></div>
        </div>
    );

    return (
        <div className="p-8 ml-64 min-h-screen bg-[#f8fafc]">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
                        System Overview <span className="bg-emerald-500 w-2 h-2 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]"></span>
                    </h1>
                    <p className="text-slate-500 font-medium tracking-tight">Monitoring your sales velocity and lead qualification performance.</p>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <StatCard title="Total Leads" value={stats.total} growth="+Live" icon={<Users className="text-sky-500" />} onClick={() => navigate('/leads')} />
                <StatCard title="Qualified" value={stats.qualified} growth="+Stats" icon={<GitMerge className="text-emerald-500" />} onClick={() => navigate('/leads')} />
                <StatCard title="Pipeline" value={`${stats.convRate}%`} growth="+Realtime" icon={<TrendingUp className="text-amber-500" />} onClick={() => navigate('/pipeline')} />
                <StatCard title="Sales Force" value={stats.total ? agents.length : '3'} growth="+Force" icon={<BarChart3 className="text-rose-500" />} onClick={() => navigate('/agents')} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50">
                    <div className="flex justify-between items-center mb-10">
                        <h3 className="text-lg font-bold">Revenue Forecasting</h3>
                    </div>
                    <div className="h-[300px]">
                        <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col">
                    <h3 className="text-lg font-bold mb-8">Lead Score Distribution</h3>
                    <div className="h-[250px] flex-grow">
                        <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
                    </div>
                    <div className="mt-6 pt-6 border-t border-slate-100 space-y-4">
                        <div className="flex justify-between">
                            <span className="text-slate-500 text-sm font-medium uppercase font-black text-[10px] tracking-widest">Hot Leads</span>
                            <span className="text-red-500 text-sm font-bold">{stats.hot}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500 text-sm font-medium uppercase font-black text-[10px] tracking-widest">Warm Leads</span>
                            <span className="text-amber-500 text-sm font-bold">{stats.warm}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500 text-sm font-medium uppercase font-black text-[10px] tracking-widest">Cold Leads</span>
                            <span className="text-sky-500 text-sm font-bold">{stats.cold}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 bg-white p-8 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/50">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Live System Pulse</h3>
                    <span className="text-[10px] font-black text-sky-600 bg-sky-50 px-3 py-1 rounded-lg uppercase tracking-widest border border-sky-100">Synchronized</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {activities.map(activity => (
                        <div key={activity.id} className="p-5 bg-slate-50 border border-slate-100 rounded-2xl hover:border-sky-300 hover:bg-white transition-all group">
                            <div className="flex justify-between items-start mb-3">
                                <span className={`text-[10px] font-black uppercase tracking-widest ${activity.color}`}>{activity.type}</span>
                                <span className="text-[9px] font-bold text-slate-400">{activity.time}</span>
                            </div>
                            <p className="text-xs font-bold text-slate-700 leading-relaxed">{activity.msg}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
