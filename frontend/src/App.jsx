import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './store/AuthContext';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Leads from './pages/Leads';
import Pipeline from './pages/Pipeline';
import Chatbot from './components/Chatbot';
import Login from './pages/Login';
import Agents from './pages/Agents';
import Settings from './pages/Settings';

const AppContent = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return <div className="h-screen flex items-center justify-center font-black uppercase text-xs tracking-widest text-slate-400">Loading Sales OS...</div>;

    return (
        <div className="flex bg-[#f8fafc] min-h-screen">
            {isAuthenticated && <Sidebar />}
            <main className={`flex-1 overflow-x-hidden ${isAuthenticated ? '' : 'w-full'}`}>
                <Routes>
                    <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
                    <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
                    <Route path="/leads" element={isAuthenticated ? <Leads /> : <Navigate to="/login" />} />
                    <Route path="/pipeline" element={isAuthenticated ? <Pipeline /> : <Navigate to="/login" />} />
                    <Route path="/agents" element={isAuthenticated ? <Agents /> : <Navigate to="/login" />} />
                    <Route path="/settings" element={isAuthenticated ? <Settings /> : <Navigate to="/login" />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </main>
            {isAuthenticated && <Chatbot />}
        </div>
    );
};

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <AppContent />
            </Router>
        </AuthProvider>
    );
};

export default App;
