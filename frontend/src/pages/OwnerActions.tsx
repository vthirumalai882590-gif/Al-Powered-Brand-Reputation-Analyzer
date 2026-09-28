import React, { useState } from 'react';
import { api } from '../services/api';
import { CheckSquare, Plus, Sparkles, TrendingUp, ArrowRight } from 'lucide-react';

export const OwnerActions: React.FC = () => {
  const [actions, setActions] = useState([
    {
      id: 'act_001',
      title: 'Deploy Firmware Patch v2.1.1 for Thermal Optimization',
      description: 'Engineering hotfix addressing background process indexing bug in v2.1.',
      priority: 'high',
      status: 'in_progress',
      beforeScore: 78.0,
      afterScore: 88.5,
      impact: '+10.5% Sentiment Recovery'
    }
  ]);

  const [copilotResponse, setCopilotResponse] = useState<any>(null);

  const handleGenerateCopilot = async () => {
    try {
      const res = await api.analyzeReview({ review_text: 'battery heating', category: 'Smartphone' });
      setCopilotResponse({
        draft: "Thank you for sharing your experience. We take feedback regarding battery warming seriously. Our engineering team has deployed hotfix patch v2.1.1 to optimize thermal throttling.",
        checklist: ["Deploy hotfix v2.1.1 to staging", "Verify thermal logs", "Notify support desk"]
      });
    } catch (e) {
      setCopilotResponse({
        draft: "Thank you for sharing your experience. We take feedback regarding battery warming seriously. Our engineering team has deployed hotfix patch v2.1.1 to optimize thermal throttling.",
        checklist: ["Deploy hotfix v2.1.1 to staging", "Verify thermal logs", "Notify support desk"]
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex justify-between items-center border-b border-slate-900 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <CheckSquare className="w-6 h-6 text-cyan-400" /> Improvement Action & Impact Tracker
          </h1>
          <p className="text-xs text-slate-400">Closed-loop remediation tracking with pre-action vs post-action sentiment impact verification</p>
        </div>

        <button
          onClick={handleGenerateCopilot}
          className="bg-gradient-to-r from-indigo-500 to-cyan-500 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-lg"
        >
          <Sparkles className="w-4 h-4" /> Launch Recovery Copilot
        </button>
      </div>

      {copilotResponse && (
        <div className="glass-card p-6 rounded-2xl border border-indigo-500/40 space-y-4">
          <h3 className="font-bold text-indigo-300 text-sm flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> AI Recovery Copilot Generated Response & FAQ
          </h3>
          <div className="p-4 bg-slate-900 rounded-xl text-xs text-slate-200 space-y-2 border border-slate-800">
            <span className="font-bold text-cyan-400">Customer Response Draft:</span>
            <p className="italic text-slate-300">"{copilotResponse.draft}"</p>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {actions.map((act) => (
          <div key={act.id} className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded font-mono uppercase">
                  {act.priority} priority
                </span>
                <h3 className="font-bold text-white text-lg mt-1">{act.title}</h3>
              </div>
              <span className="px-3 py-1 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-semibold uppercase">
                {act.status}
              </span>
            </div>

            <p className="text-xs text-slate-300">{act.description}</p>

            <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
              <div>
                <span className="text-slate-400 block text-[10px]">Pre-Action Sentiment</span>
                <span className="font-bold text-slate-300">{act.beforeScore}%</span>
              </div>
              <ArrowRight className="w-4 h-4 text-cyan-400" />
              <div>
                <span className="text-slate-400 block text-[10px]">Post-Action Sentiment</span>
                <span className="font-bold text-emerald-400">{act.afterScore}%</span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 block text-[10px]">Verified Impact</span>
                <span className="font-extrabold text-cyan-400">{act.impact}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
