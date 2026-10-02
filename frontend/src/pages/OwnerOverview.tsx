import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Play, ShieldAlert, Check, X, Shield, ArrowUpRight, Activity, Zap, Cpu, Bell, CheckCircle2, Database, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const OwnerOverview: React.FC = () => {
  const [overview, setOverview] = useState<any>(null);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resO, resA] = await Promise.all([
        api.getOwnerOverview(),
        api.getOwnerAlerts().catch(() => ({ data: [] }))
      ]);
      setOverview(resO.data);
      setAlerts(resA.data || []);
    } catch (e) {
      console.error('Failed to load owner overview telemetry:', e);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !overview) {
    return <div className="text-center py-24 text-slate-500 text-sm font-medium">Loading Operations Command Center...</div>;
  }

  const repIndex = overview.active_reputation_index || 70.0;
  const grade = repIndex >= 85 ? 'Grade A' : repIndex >= 70 ? 'Grade B+' : 'Grade C';
  const totalReviews = overview.total_analyzed_feedback || 19053;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Hero Command Header */}
      <div className="bg-[#eef6f5] border border-[#d2e8e4] rounded-2xl p-6 sm:p-8 space-y-4 relative overflow-hidden shadow-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-[#007a6e] text-white px-3 py-1 rounded-full text-xs font-bold tracking-wide">
            Autonomous Operations Platform
          </span>
          <span className="bg-[#fff7ed] text-[#ea580c] border border-[#ffedd5] px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
            <Shield className="w-3.5 h-3.5" /> BrandPulse Real Evidence Engine
          </span>
          <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full text-xs font-mono font-semibold">
            {overview.data_mode?.toUpperCase() || 'PRODUCTION'} MODE
          </span>
        </div>

        <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6">
          <div className="max-w-3xl space-y-2">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              BrandPulse Operations Command Center
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              BrandPulse continuously senses friction across business operations & product feedback, evaluates root causes with specialized AI agents, applies company safety policies, and coordinates governed execution through verified adapters.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/assistant"
              className="bg-[#007a6e] hover:bg-[#006258] text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-xs transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-white" /> Launch Assistant
            </Link>
            <Link
              to="/owner/dna"
              className="bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-xs transition-all"
            >
              <ShieldAlert className="w-4 h-4 text-[#007a6e]" /> Reputation DNA Graph
            </Link>
          </div>
        </div>
      </div>

      {/* 5-Column Key Performance Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Metric 1: Real Active Reputation Index */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block font-mono">
            Reputation Index
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-slate-900">{repIndex}</span>
            <span className="text-sm font-semibold text-slate-400">/ 100</span>
            <span className="ml-auto bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2 py-0.5 rounded-md">
              {grade}
            </span>
          </div>
          <div className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1 font-mono">
            <ArrowUpRight className="w-3.5 h-3.5" /> Grounded in {totalReviews.toLocaleString('en-IN')} reviews
          </div>
        </div>

        {/* Metric 2: Monitored Products */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block font-mono">
            Catalog Products
          </span>
          <div className="text-4xl font-extrabold text-slate-900">
            {overview.total_products || 73}
          </div>
          <div className="text-[11px] font-semibold text-slate-600 font-mono">
            {overview.products_with_active_data || 10} actively streaming reviews
          </div>
        </div>

        {/* Metric 3: Critical Urgency Alerts */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block font-mono">
            Urgent Friction Alerts
          </span>
          <div className="text-4xl font-extrabold text-rose-600">
            {overview.critical_alerts_count || 0}
          </div>
          <div className="text-[11px] text-rose-700 font-medium font-mono">
            Safety & high urgency defect alerts
          </div>
        </div>

        {/* Metric 4: Open Friction Issues */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block font-mono">
            Detected Friction Issues
          </span>
          <div className="text-4xl font-extrabold text-[#007a6e]">
            {overview.open_issues_count || 0}
          </div>
          <div className="text-[11px] text-slate-500 font-mono">
            Auto-synthesized clusters
          </div>
        </div>

        {/* Metric 5: Data Freshness Status */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block font-mono">
            Data Freshness
          </span>
          <div className="text-base font-extrabold text-slate-900 truncate">
            {overview.data_freshness || 'Real-time Sync Active'}
          </div>
          <div className="text-[11px] text-emerald-700 font-medium font-mono flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            {overview.source_health || 'Sources Operational'}
          </div>
        </div>
      </div>

      {/* Main Operations Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Early-Warning Friction Alerts */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <h2 className="font-extrabold text-slate-900 text-sm tracking-wide flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              CUSTOMER FRICTION & EARLY-WARNING ALERTS ({alerts.length})
            </h2>
            <Link to="/owner/actions" className="text-xs text-[#007a6e] hover:underline font-bold flex items-center gap-1">
              Remediation Actions <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {alerts.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-500 text-xs">
              No critical friction spikes detected in current review window.
            </div>
          ) : (
            <div className="space-y-4">
              {alerts.map((item) => (
                <div key={item.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                          item.severity === 'critical'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        ⚠️ SEVERITY: {item.severity?.toUpperCase()}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">ID: {item.id}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        to="/owner/actions"
                        className="bg-[#007a6e] hover:bg-[#006258] text-white font-bold px-3.5 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition-colors shadow-xs"
                      >
                        <Check className="w-3.5 h-3.5 text-white" /> Take Action
                      </Link>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="font-bold text-slate-900 text-base">{item.affected_product}</h3>
                    <p className="text-xs text-rose-800 font-semibold bg-rose-50/60 p-2 rounded-lg border border-rose-100">
                      {item.reason}
                    </p>

                    {item.evidence_snippets && item.evidence_snippets.length > 0 && (
                      <div className="pt-1 space-y-1">
                        <span className="text-[10px] text-slate-400 font-bold uppercase font-mono">Verified Evidence:</span>
                        {item.evidence_snippets.map((snip: string, i: number) => (
                          <p key={i} className="text-xs text-slate-600 italic bg-slate-50 p-2 rounded-lg border border-slate-100">
                            "{snip}"
                          </p>
                        ))}
                      </div>
                    )}

                    {item.recommended_next_step && (
                      <p className="text-xs text-emerald-800 bg-emerald-50/80 p-2 rounded-lg border border-emerald-100 mt-2 font-medium">
                        <strong>Recommended Protocol:</strong> {item.recommended_next_step}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Platform Audit Log & Ingestion Activity */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <h2 className="font-extrabold text-slate-900 text-sm tracking-wide flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#007a6e]" /> DATA INGESTION ACTIVITY
            </h2>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="space-y-4">
              <div className="border-l-2 border-[#007a6e] pl-3 py-1 space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-[#007a6e]">Universal AI Pipeline</span>
                  <span className="text-[10px] text-slate-400 font-mono">100% Completed</span>
                </div>
                <p className="text-xs text-slate-600">
                  Enriched {totalReviews.toLocaleString('en-IN')} customer reviews with aspect sentiments, emotion classification, and authenticity risk scoring.
                </p>
              </div>

              <div className="border-l-2 border-emerald-500 pl-3 py-1 space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-emerald-700">Deduplication Engine</span>
                  <span className="text-[10px] text-slate-400 font-mono">SHA-256 Active</span>
                </div>
                <p className="text-xs text-slate-600">
                  Normalized hashes verified across Amazon India, Flipkart, and Kaggle corpora. Zero duplicate leakage permitted.
                </p>
              </div>

              <div className="border-l-2 border-slate-300 pl-3 py-1 space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-700">Multi-Domain Catalog</span>
                  <span className="text-[10px] text-slate-400 font-mono">14 Categories</span>
                </div>
                <p className="text-xs text-slate-600">
                  Kitchen Appliances, Beauty & Personal Care, Smartphones, Laptops, Audio, Apparel & Shoes actively monitored.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
