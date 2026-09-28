import React from 'react';
import { Activity, Shield, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 bg-white pt-10 pb-8 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-[#007a6e] flex items-center justify-center text-white">
                <Activity className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-slate-900 text-sm">BrandPulse AI</span>
            </div>
            <p className="text-slate-600 leading-relaxed mb-4">
              From Public Feedback to Trusted Execution. Universal reputation intelligence grounded in real review evidence.
            </p>
            <div className="flex items-center gap-3 text-[11px] text-slate-500">
              <span className="flex items-center gap-1 font-medium"><Shield className="w-3.5 h-3.5 text-[#007a6e]" /> Evidence-Grounded</span>
              <span className="flex items-center gap-1 font-medium"><Lock className="w-3.5 h-3.5 text-[#007a6e]" /> Verifiable Adapters</span>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-3">Customer Features</h4>
            <ul className="space-y-2">
              <li><a href="/search" className="hover:text-[#007a6e] transition-colors">Product Search & Directory</a></li>
              <li><a href="/compare" className="hover:text-[#007a6e] transition-colors">Side-by-Side Trust Comparison</a></li>
              <li><a href="/fit-finder" className="hover:text-[#007a6e] transition-colors">Personal Fit Finder</a></li>
              <li><a href="/assistant" className="hover:text-[#007a6e] transition-colors">AI Evidence Assistant</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-3">Product Owner Suite</h4>
            <ul className="space-y-2">
              <li><a href="/owner/overview" className="hover:text-[#007a6e] transition-colors">Operations Command Center</a></li>
              <li><a href="/owner/command" className="hover:text-[#007a6e] transition-colors">Reputation & Issue Mapper</a></li>
              <li><a href="/owner/dna" className="hover:text-[#007a6e] transition-colors">Reputation DNA Graph</a></li>
              <li><a href="/owner/actions" className="hover:text-[#007a6e] transition-colors">Action & Approval Tracker</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-3">Engine & Governance</h4>
            <p className="text-slate-600 leading-relaxed mb-3">
              Universal Category Taxonomy mapping active across Kitchen Appliances, Smartphones, Laptops, Audio, Smartwatches, and Smart TVs.
            </p>
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-[10px] font-mono text-slate-600">
              Engine: BrandPulse-Operations-v1.0
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-500">
          <p>© 2026 BrandPulse AI. Operations Command Center & Reputation Intelligence Platform.</p>
          <div className="flex gap-4">
            <span className="hover:text-slate-800 cursor-pointer font-medium">Privacy Policy</span>
            <span className="hover:text-slate-800 cursor-pointer font-medium">Terms of Service</span>
            <span className="hover:text-slate-800 cursor-pointer font-medium">OpenAPI Specs</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
