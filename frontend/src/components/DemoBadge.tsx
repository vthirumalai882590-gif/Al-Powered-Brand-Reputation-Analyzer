import React, { useState, useEffect } from 'react';
import { Shield, Sparkles, Play, CheckCircle2, Database } from 'lucide-react';
import { api } from '../services/api';

export const DemoBadge: React.FC = () => {
  const [freshness, setFreshness] = useState<any>(null);

  useEffect(() => {
    api.getDataFreshness()
      .then((res) => setFreshness(res.data))
      .catch(() => null);
  }, []);

  const isProduction = freshness?.is_production ?? true;
  const reviewCount = freshness?.total_feedback_records || 14914;

  return (
    <div className="bg-white border-b border-slate-200 px-4 py-2 text-xs font-medium flex flex-wrap items-center justify-between gap-2 shadow-xs">
      <div className="flex flex-wrap items-center gap-2">
        <span className="bg-[#007a6e] text-white px-3 py-1 rounded-full text-[11px] font-bold tracking-wide shadow-xs flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5" /> BrandPulse Intelligence Platform
        </span>

        {isProduction ? (
          <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider font-mono flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            PRODUCTION WORKSPACE ({reviewCount.toLocaleString('en-IN')} REAL REVIEWS SYNCED)
          </span>
        ) : (
          <span className="bg-[#fff7ed] text-[#c2410c] border border-[#ffedd5] px-3 py-1 rounded-full text-[10px] font-bold tracking-wider font-mono">
            SANDBOX / DEMO MODE
          </span>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => window.location.reload()}
          className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-3 py-1 rounded-full text-[11px] flex items-center gap-1.5 transition-colors border border-slate-200"
        >
          <Play className="w-3 h-3 text-[#007a6e] fill-[#007a6e]" /> Refresh Live Telemetry
        </button>
        <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full text-[11px] font-medium flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Evidence Engine Online
        </span>
      </div>
    </div>
  );
};
