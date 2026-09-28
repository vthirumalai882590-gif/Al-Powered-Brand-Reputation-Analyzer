import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Activity, AlertTriangle, Layers, ArrowUpRight } from 'lucide-react';

export const OwnerReputationCommand: React.FC = () => {
  const [issues, setIssues] = useState<any[]>([]);

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const res = await api.getOwnerIssues();
      setIssues(res.data);
    } catch (e) {
      setIssues([
        {
          id: 'iss_001',
          product_id: 'prd_001',
          title: 'Battery Thermal Throttling on v2.1 Update',
          description: 'Increased complaint volume regarding phone warming and accelerated battery drain following software update v2.1.',
          category: 'Battery & Heating',
          severity: 'high',
          frequency: 42,
          trend: 'increasing',
          status: 'in_progress'
        }
      ]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="border-b border-slate-900 pb-6">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Activity className="w-6 h-6 text-cyan-400" /> Reputation Command Center & Issue Mapper
        </h1>
        <p className="text-xs text-slate-400">Root-cause complaint mapping to product versions, regions, and feature groups</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="font-bold text-white text-base">Clustered Issue Intelligence</h3>
          {issues.map((iss) => (
            <div key={iss.id} className="p-5 bg-slate-900/90 border border-slate-800 rounded-xl space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] bg-slate-800 text-cyan-400 px-2 py-0.5 rounded font-mono">{iss.category}</span>
                  <h4 className="font-bold text-white text-base mt-1">{iss.title}</h4>
                </div>
                <span className="px-2.5 py-1 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold uppercase">
                  {iss.severity} Severity
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{iss.description}</p>
              <div className="flex justify-between items-center text-xs text-slate-400 pt-2 border-t border-slate-800">
                <span>Observed Frequency: {iss.frequency} reviews</span>
                <span className="text-amber-400 font-medium">Trend: {iss.trend}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="font-bold text-white text-base">Root Cause Isolation</h3>
          <div className="p-4 bg-slate-900 rounded-xl text-xs space-y-2 border border-slate-800">
            <span className="font-semibold text-indigo-400">Version Correlation</span>
            <p className="text-slate-300">92% of thermal complaints correlate directly to software build v2.1 in firmware release channel.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
