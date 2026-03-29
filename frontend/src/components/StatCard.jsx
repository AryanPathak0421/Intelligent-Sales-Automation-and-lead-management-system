import React from 'react';

const StatCard = ({ title, value, growth, icon, onClick }) => (
    <div
        onClick={onClick}
        className={`bg-white p-6 rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50 hover:scale-[1.02] transition-transform duration-300 ${onClick ? 'cursor-pointer' : ''}`}
    >
        <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-slate-50 rounded-xl shadow-sm">
                {icon}
            </div>
            <span className={`text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-widest ${growth.startsWith('+') ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
                {growth}
            </span>
        </div>
        <h3 className="text-slate-400 font-black text-[10px] mb-1 uppercase tracking-widest">{title}</h3>
        <p className="text-2xl font-black text-slate-900 tracking-tighter">{value}</p>
    </div>
);

export default StatCard;
