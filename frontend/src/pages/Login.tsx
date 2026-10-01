import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Activity, Lock, Mail, UserCheck, ShieldCheck, Briefcase } from 'lucide-react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('customer@brandpulse.ai');
  const [password, setPassword] = useState('customer123');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
    if (email.includes('owner')) navigate('/owner/overview');
    else if (email.includes('admin')) navigate('/admin');
    else navigate('/');
  };

  const handleQuickLogin = async (quickEmail: string, quickPass: string, redirectPath: string) => {
    setEmail(quickEmail);
    setPassword(quickPass);
    await login(quickEmail, quickPass);
    navigate(redirectPath);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl border border-slate-200 space-y-6 shadow-xl">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#007a6e] flex items-center justify-center text-white mx-auto shadow-sm">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900">Sign In to BrandPulse AI</h2>
          <p className="text-xs text-slate-500 font-medium">Access customer, owner, or administrative intelligence</p>
        </div>

        {/* 1-Click Demo Buttons for Staff */}
        <div className="space-y-2 p-4 bg-slate-50 rounded-2xl border border-slate-200">
          <p className="text-xs font-bold text-slate-700 text-center">Quick 1-Click Staff Demo Access:</p>
          <div className="grid grid-cols-3 gap-2 pt-1">
            <button
              type="button"
              onClick={() => handleQuickLogin('customer@brandpulse.ai', 'customer123', '/')}
              className="bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 rounded-xl p-2 text-center transition-all flex flex-col items-center gap-1 shadow-2xs"
            >
              <UserCheck className="w-4 h-4 text-[#007a6e]" />
              <span className="text-[11px] font-bold">Customer</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('owner@brandpulse.ai', 'owner123', '/owner/overview')}
              className="bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 rounded-xl p-2 text-center transition-all flex flex-col items-center gap-1 shadow-2xs"
            >
              <Briefcase className="w-4 h-4 text-indigo-600" />
              <span className="text-[11px] font-bold">Owner</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('admin@brandpulse.ai', 'admin123', '/admin')}
              className="bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 rounded-xl p-2 text-center transition-all flex flex-col items-center gap-1 shadow-2xs"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="text-[11px] font-bold">Admin</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl py-2.5 pl-10 pr-3 text-xs text-slate-900 focus:outline-none focus:border-[#007a6e]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl py-2.5 pl-10 pr-3 text-xs text-slate-900 focus:outline-none focus:border-[#007a6e]"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#007a6e] hover:bg-[#006258] text-white font-bold py-3 rounded-xl text-xs shadow-xs transition-all"
          >
            Sign In with Credentials
          </button>
        </form>
      </div>
    </div>
  );
};
