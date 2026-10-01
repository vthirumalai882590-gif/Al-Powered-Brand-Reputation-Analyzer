import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import { Activity, Search, Scale, Sparkles, LayoutDashboard, LogOut, ShieldCheck, Compass, SlidersHorizontal, User, BrainCircuit } from 'lucide-react';
import { UserRole } from '../types';

export const Navbar: React.FC = () => {
  const { user, logout, switchRoleDemo } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-[#007a6e] flex items-center justify-center shadow-sm text-white group-hover:bg-[#006258] transition-colors">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-tight text-slate-900">BrandPulse AI</span>
            <span className="block text-[10px] text-slate-500 font-bold tracking-wider -mt-1 font-mono">BUSINESS REPUTATION EXECUTION</span>
          </div>
        </Link>

        {/* Navigation Links based on active User Role */}
        <nav className="hidden md:flex items-center gap-1.5">
          {user?.role === 'customer' && (
            <>
              <Link
                to="/"
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  isActive('/')
                    ? 'bg-[#007a6e] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Compass className="w-3.5 h-3.5" /> Directory
              </Link>
              <Link
                to="/search"
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  isActive('/search')
                    ? 'bg-[#007a6e] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Search className="w-3.5 h-3.5" /> Explore Products
              </Link>
              <Link
                to="/compare"
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  isActive('/compare')
                    ? 'bg-[#007a6e] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Scale className="w-3.5 h-3.5" /> Compare
              </Link>
              <Link
                to="/fit-finder"
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  isActive('/fit-finder')
                    ? 'bg-[#007a6e] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Personal Fit
              </Link>
              <Link
                to="/assistant"
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  isActive('/assistant')
                    ? 'bg-[#007a6e] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                AI Assistant
              </Link>
              <Link
                to="/ai-analyzer"
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  isActive('/ai-analyzer')
                    ? 'bg-purple-700 text-white shadow-xs'
                    : 'text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200'
                }`}
              >
                <BrainCircuit className="w-3.5 h-3.5 text-purple-600" /> Live AI Model
              </Link>
            </>
          )}

          {user?.role === 'owner' && (
            <>
              <Link
                to="/owner/overview"
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  isActive('/owner/overview')
                    ? 'bg-[#007a6e] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" /> Operations Overview
              </Link>
              <Link
                to="/owner/command"
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  isActive('/owner/command')
                    ? 'bg-[#007a6e] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Reputation Command Center
              </Link>
              <Link
                to="/owner/dna"
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  isActive('/owner/dna')
                    ? 'bg-[#007a6e] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                DNA Graph
              </Link>
              <Link
                to="/owner/actions"
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  isActive('/owner/actions')
                    ? 'bg-[#007a6e] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Action Tracker
              </Link>
              <Link
                to="/ai-analyzer"
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  isActive('/ai-analyzer')
                    ? 'bg-purple-700 text-white shadow-xs'
                    : 'text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200'
                }`}
              >
                <BrainCircuit className="w-3.5 h-3.5 text-purple-600" /> Live AI Model
              </Link>
            </>
          )}

          {user?.role === 'admin' && (
            <>
              <Link
                to="/admin"
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  isActive('/admin')
                    ? 'bg-[#007a6e] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" /> Admin Console
              </Link>
              <Link
                to="/ai-analyzer"
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  isActive('/ai-analyzer')
                    ? 'bg-purple-700 text-white shadow-xs'
                    : 'text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200'
                }`}
              >
                <BrainCircuit className="w-3.5 h-3.5 text-purple-600" /> Live AI Model
              </Link>
            </>
          )}
        </nav>

        {/* Demo Role Switcher & User Profile Controls */}
        <div className="flex items-center gap-3">
          {/* Role Switcher Pill */}
          <div className="bg-slate-100 border border-slate-200 rounded-full p-1 flex items-center text-[11px]">
            <span className="text-slate-500 px-2 font-mono hidden sm:inline text-[10px] font-bold">ROLE:</span>
            {(['customer', 'owner', 'admin'] as UserRole[]).map((r) => (
              <button
                key={r}
                onClick={() => switchRoleDemo(r)}
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase transition-all ${
                  user?.role === r
                    ? 'bg-[#007a6e] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-700 font-semibold hidden lg:inline flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-[#007a6e]" /> {user.name}
              </span>
              <button
                onClick={logout}
                title="Logout"
                className="p-1.5 text-slate-500 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-[#007a6e] hover:bg-[#006258] text-white font-semibold px-4 py-1.5 rounded-full text-xs transition-colors shadow-xs"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
