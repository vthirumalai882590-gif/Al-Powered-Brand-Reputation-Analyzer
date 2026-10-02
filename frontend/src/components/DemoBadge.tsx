import React, { useState, useEffect } from 'react';
import { Shield, Sparkles, Play, CheckCircle2, Cpu, UserCheck, Briefcase, ShieldAlert } from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserRole } from '../types';

export const DemoBadge: React.FC = () => {
  const [freshness, setFreshness] = useState<any>(null);
  const { user, switchRoleDemo } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    api.getDataFreshness()
      .then((res) => setFreshness(res.data))
      .catch(() => null);
  }, []);

  const reviewCount = freshness?.total_feedback_records || 19053;
  const isStandalone = api.isStandaloneMode();

  const handleRoleSwitch = (role: UserRole, targetPath: string) => {
    switchRoleDemo(role);
    navigate(targetPath);
  };

  return (
    <div className="bg-slate-900 text-white border-b border-slate-800 px-4 py-2 text-xs font-medium flex flex-wrap items-center justify-between gap-3 shadow-md">
      <div className="flex flex-wrap items-center gap-2">
        <span className="bg-[#007a6e] text-white px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider uppercase flex items-center gap-1 shadow-xs">
          <Shield className="w-3 h-3" /> BrandPulse AI
        </span>

        <span className="bg-emerald-950/80 text-emerald-400 border border-emerald-800 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide font-mono flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          {isStandalone ? "ZERO-SERVER EMBEDDED DEMO" : "LIVE BACKEND SYNC"}
        </span>

        <span className="text-slate-400 text-[11px] hidden md:inline">
          Corpus: <strong className="text-slate-200">{reviewCount.toLocaleString('en-IN')} Verified Indian Reviews</strong> across 14 categories
        </span>
      </div>

      {/* 1-Click Interactive Role Switcher for Demonstrations */}
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-mono text-slate-400 uppercase hidden sm:inline">Demo Switcher:</span>
        <div className="bg-slate-800 p-0.5 rounded-lg flex items-center gap-1 border border-slate-700">
          <button
            onClick={() => handleRoleSwitch('customer', '/')}
            className={`px-2 py-0.5 rounded text-[11px] font-bold flex items-center gap-1 transition-all ${
              user?.role === 'customer'
                ? 'bg-[#007a6e] text-white'
                : 'text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
          >
            <UserCheck className="w-3 h-3" /> Customer
          </button>
          <button
            onClick={() => handleRoleSwitch('owner', '/owner/overview')}
            className={`px-2 py-0.5 rounded text-[11px] font-bold flex items-center gap-1 transition-all ${
              user?.role === 'owner'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
          >
            <Briefcase className="w-3 h-3" /> Brand Owner
          </button>
          <button
            onClick={() => handleRoleSwitch('admin', '/admin')}
            className={`px-2 py-0.5 rounded text-[11px] font-bold flex items-center gap-1 transition-all ${
              user?.role === 'admin'
                ? 'bg-purple-600 text-white'
                : 'text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
          >
            <ShieldAlert className="w-3 h-3" /> Admin Console
          </button>
        </div>
      </div>
    </div>
  );
};
