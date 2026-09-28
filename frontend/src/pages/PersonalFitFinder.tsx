import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { api } from '../services/api';

export const PersonalFitFinder: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [budget, setBudget] = useState('7000');
  const [useCase, setUseCase] = useState('Daily Heavy Duty Masala & Idli Batter Grinding');
  const [nonNegotiable, setNonNegotiable] = useState('Motor Power, Jar Durability, Low Noise');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await api.getProducts({ page_size: 50, has_reviews_only: true });
      const prods = res.data || [];
      setProducts(prods);
      if (prods.length > 0) {
        setSelectedProductId(prods[0].id);
      }
    } catch (e) {
      console.error('Error loading products for personal fit:', e);
    }
  };

  const handleComputeFit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProductId) return;

    setLoading(true);
    setError(null);
    try {
      const res = await api.getPersonalFit({
        product_id: selectedProductId,
        budget: parseFloat(budget) || undefined,
        primary_use_case: useCase,
        non_negotiable_features: nonNegotiable.split(',').map((s) => s.trim()).filter(Boolean)
      });
      setResult(res.data);
    } catch (e: any) {
      console.error('Error calculating personal fit:', e);
      setError('Unable to compute fit for the selected product.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e6f4f2] border border-[#b2dfdb] text-[#007a6e] text-xs font-bold font-mono">
          <Sparkles className="w-3.5 h-3.5 text-[#007a6e]" /> AI Evidence Match Engine
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Personal Fit Finder</h1>
        <p className="text-xs text-slate-500">
          Evaluates your personal use-case and non-negotiables directly against real customer review aspect evidence
        </p>
      </div>

      <form onSubmit={handleComputeFit} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Target Product to Evaluate</label>
          <select
            value={selectedProductId}
            onChange={(e) => setSelectedProductId(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#007a6e]"
          >
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.category})
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Target Budget (₹ INR)</label>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#007a6e]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Primary Use Case</label>
            <input
              type="text"
              value={useCase}
              onChange={(e) => setUseCase(e.target.value)}
              placeholder="e.g. Daily Heavy Duty Grinding, Hair Fall Reduction, 4K Gaming..."
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#007a6e]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Non-Negotiable Priorities (Comma separated)</label>
          <input
            type="text"
            value={nonNegotiable}
            onChange={(e) => setNonNegotiable(e.target.value)}
            placeholder="e.g. Motor Power, Fragrance, Noise Level, Battery..."
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#007a6e]"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !selectedProductId}
          className="w-full bg-[#007a6e] hover:bg-[#006258] text-white font-bold py-3 rounded-xl text-xs shadow-xs transition-all flex items-center justify-center gap-1.5"
        >
          {loading ? 'Evaluating Verified Evidence...' : <><Sparkles className="w-4 h-4" /> Compute Evidence Fit Score</>}
        </button>
      </form>

      {error && (
        <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl text-rose-800 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {result && (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-200 pb-5 gap-3">
            <div>
              <span className="text-xs text-slate-500 font-mono">Evaluated: {result.product_name}</span>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{result.suitability}</h3>
            </div>
            {result.fit_score !== null && (
              <div className="bg-[#e6f4f2] border border-[#b2dfdb] px-4 py-2 rounded-2xl flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-[#007a6e]" />
                <div>
                  <span className="text-[10px] text-slate-500 font-mono block uppercase">Fit Match Score</span>
                  <span className="text-2xl font-black text-[#007a6e]">{result.fit_score}%</span>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {/* Matching Aspects */}
            {result.matching_aspects && result.matching_aspects.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" /> Evidence Strengths
                </span>
                <div className="space-y-1.5">
                  {result.matching_aspects.map((pro: string, i: number) => (
                    <div key={i} className="text-xs text-emerald-800 bg-emerald-50 border border-emerald-100 p-3 rounded-xl flex items-start gap-2">
                      <span className="font-bold">•</span>
                      <span>{pro}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Limitations */}
            {result.potential_limitations && result.potential_limitations.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-600" /> Potential Limitations Recorded in Reviews
                </span>
                <div className="space-y-1.5">
                  {result.potential_limitations.map((con: string, i: number) => (
                    <div key={i} className="text-xs text-amber-800 bg-amber-50 border border-amber-100 p-3 rounded-xl flex items-start gap-2">
                      <span className="font-bold">•</span>
                      <span>{con}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pre-purchase Questions */}
            {result.recommended_pre_purchase_questions && (
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider">
                  Recommended Pre-Purchase Clarification Questions
                </span>
                <ul className="list-disc list-inside text-xs text-slate-600 space-y-1 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  {result.recommended_pre_purchase_questions.map((q: string, i: number) => (
                    <li key={i}>{q}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
