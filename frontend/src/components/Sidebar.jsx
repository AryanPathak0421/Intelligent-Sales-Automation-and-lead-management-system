import { LayoutDashboard, Users, GitMerge, BarChart3, Settings, MessageSquare, LogOut, ShieldCheck } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../store/AuthContext';

const Sidebar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    const menuItems = [
        { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
        { name: 'Leads', icon: <Users size={20} />, path: '/leads' },
        { name: 'Pipeline', icon: <GitMerge size={20} />, path: '/pipeline' },
        { name: 'Sales Force', icon: <ShieldCheck size={20} />, path: '/agents' },
        { name: 'Settings', icon: <Settings size={20} />, path: '/settings' },
    ];

    return (
        <aside className="w-64 h-screen bg-[#0f172a] text-white flex flex-col fixed left-0 top-0 border-r border-slate-800">
            <div className="p-6 text-2xl font-bold tracking-tight text-sky-500 flex items-center gap-2">
                <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center text-white">
                    <GitMerge size={20} />
                </div>
                Sales<span className="text-white font-light underline decoration-sky-500/30">Auto</span>
            </div>

            <nav className="flex-1 px-4 space-y-2 mt-4">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
                                ? 'bg-sky-600 text-white shadow-lg shadow-sky-900/50'
                                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                            }`
                        }
                    >
                        {item.icon}
                        <span className="font-medium">{item.name}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-800">
                <div className="flex items-center gap-3 px-4 py-3 mb-4 rounded-lg bg-slate-800/50">
                    <div className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center font-bold uppercase tracking-tighter">
                        {user?.name?.[0] || 'U'}
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-sm font-semibold truncate">{user?.name || 'User'}</p>
                        <p className="text-[10px] text-slate-500 truncate uppercase font-bold tracking-widest">{user?.role || 'Agent'}</p>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-slate-400 hover:bg-red-500/10 hover:text-red-500 transition-colors"
                >
                    <LogOut size={20} />
                    <span className="font-medium">Logout System</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
