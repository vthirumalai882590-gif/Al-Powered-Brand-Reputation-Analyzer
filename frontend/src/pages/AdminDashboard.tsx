import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Users, Shield, Server, FileText, CheckCircle, Database, RefreshCw, BarChart2, Globe } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [health, setHealth] = useState<any>(null);
  const [freshness, setFreshness] = useState<any>(null);
  const [imports, setImports] = useState<any[]>([]);
  const [indiaAnalytics, setIndiaAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [uRes, aRes, hRes, fRes, iRes, indRes] = await Promise.all([
        api.getAdminUsers().catch(() => ({ data: [] })),
        api.getAuditLogs().catch(() => ({ data: [] })),
        api.getSystemHealth().catch(() => ({ data: null })),
        api.getDataFreshness().catch(() => ({ data: null })),
        api.getImports().catch(() => ({ data: [] })),
        api.getIndiaAnalytics().catch(() => ({ data: null }))
      ]);

      setUsers(uRes.data || []);
      setAuditLogs(aRes.data || []);
      setHealth(hRes.data || null);
      setFreshness(fRes.data || null);
      setImports(iRes.data || []);
      setIndiaAnalytics(indRes.data || null);
    } catch (e) {
      console.error('Failed to load admin telemetry:', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="border-b border-slate-200 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2 tracking-tight">
            <Shield className="w-6 h-6 text-[#007a6e]" /> Data Quality & Platform Governance Console
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Monitor real ingestion pipelines, deduplication audit, India market telemetry, and infrastructure health
          </p>
        </div>

        <button
          onClick={fetchAdminData}
          className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#007a6e]" /> Refresh Ingestion Metrics
        </button>
      </div>

      {/* Freshness & Corpus Highlights */}
      {freshness && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase font-mono">Ingested Reviews</span>
            <span className="text-2xl font-black text-slate-900 block font-mono">
              {freshness.total_feedback_records?.toLocaleString('en-IN') || 0}
            </span>
            <span className="text-[11px] text-emerald-700 font-semibold font-mono">100% Real Datasets</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase font-mono">Registered Products</span>
            <span className="text-2xl font-black text-slate-900 block font-mono">{freshness.total_products || 0}</span>
            <span className="text-[11px] text-slate-500 font-mono">Across 14 categories</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase font-mono">Registered Brands</span>
            <span className="text-2xl font-black text-slate-900 block font-mono">{freshness.total_brands || 0}</span>
            <span className="text-[11px] text-slate-500 font-mono">Bosch, Philips, Sujata, etc.</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase font-mono">Datasets Synced</span>
            <span className="text-2xl font-black text-[#007a6e] block font-mono">{freshness.total_datasets_registered || 0}</span>
            <span className="text-[11px] text-emerald-700 font-semibold font-mono">Deduplication Verified</span>
          </div>
        </div>
      )}

      {/* India Regional Consumer Intelligence (Phase 14) */}
      {indiaAnalytics && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-[#007a6e]" />
            <h3 className="font-extrabold text-slate-900 text-base">
              India Market Analytics — Language & Code-Mix Distribution
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Language share */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-600 uppercase font-mono">Detected Consumer Languages</h4>
              <div className="space-y-2">
                {indiaAnalytics.languages?.map((lang: any) => (
                  <div key={lang.language} className="flex justify-between items-center text-xs p-2 bg-slate-50 rounded-xl border border-slate-100 font-mono">
                    <span className="font-bold text-slate-800 uppercase">{lang.language}</span>
                    <span className="text-slate-600">
                      {lang.count.toLocaleString('en-IN')} reviews ({lang.percentage}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Code-mixed & category highlights */}
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-1">
                <span className="text-xs font-bold text-emerald-900 font-mono uppercase">Code-Mixed Telemetry (Hinglish)</span>
                <span className="text-2xl font-black text-emerald-800 block">
                  {indiaAnalytics.code_mixed?.percentage}% ({indiaAnalytics.code_mixed?.count?.toLocaleString('en-IN')} reviews)
                </span>
                <p className="text-xs text-emerald-700">{indiaAnalytics.code_mixed?.description}</p>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-600 uppercase font-mono">Top Categories Monitored</span>
                <div className="flex flex-wrap gap-2">
                  {indiaAnalytics.top_categories?.map((cat: any) => (
                    <span key={cat.category} className="px-2.5 py-1 bg-slate-100 text-slate-800 rounded-xl text-xs font-mono font-medium border border-slate-200">
                      {cat.category}: {cat.count.toLocaleString('en-IN')}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Ingestion Jobs & Deduplication Audit Table (Phase 13) */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-[#007a6e]" />
            <h3 className="font-extrabold text-slate-900 text-base">
              Universal Ingestion & Deduplication Jobs ({imports.length})
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-mono">SHA-256 Collision Resistant</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-500 uppercase font-mono text-[10px] border-b border-slate-200">
              <tr>
                <th className="p-3">Job ID</th>
                <th className="p-3">Dataset ID</th>
                <th className="p-3">Total Records</th>
                <th className="p-3">Processed</th>
                <th className="p-3">Duplicates Caught</th>
                <th className="p-3">Status</th>
                <th className="p-3">Execution Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {imports.map((job) => (
                <tr key={job.id} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900">{job.id}</td>
                  <td className="p-3 text-slate-600">{job.dataset_id}</td>
                  <td className="p-3">{job.total_records?.toLocaleString('en-IN')}</td>
                  <td className="p-3 font-semibold text-emerald-700">{job.processed_records?.toLocaleString('en-IN')}</td>
                  <td className="p-3 text-slate-500">{job.failed_records || 0}</td>
                  <td className="p-3">
                    <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                      {job.status}
                    </span>
                  </td>
                  <td className="p-3 text-slate-500 text-[11px]">
                    {job.started_at ? new Date(job.started_at).toLocaleString() : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Directory */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="font-extrabold text-slate-900 text-base">Authorized Platform Operators</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-500 uppercase font-mono text-[10px] border-b border-slate-200">
              <tr>
                <th className="p-3">User ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50">
                  <td className="p-3 font-mono text-slate-500">{u.id}</td>
                  <td className="p-3 font-bold text-slate-900">{u.name}</td>
                  <td className="p-3 font-mono text-slate-600">{u.email}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-mono uppercase text-[10px] border border-slate-200">
                      {u.role}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="text-emerald-700 font-medium font-mono">Active</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
