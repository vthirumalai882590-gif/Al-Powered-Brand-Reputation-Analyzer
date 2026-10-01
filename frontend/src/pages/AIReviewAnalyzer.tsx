import React, { useState } from 'react';
import { api } from '../services/api';
import { ReviewAnalysisResult } from '../services/embeddedAI';
import {
  BrainCircuit,
  Sparkles,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Smile,
  Frown,
  Meh,
  Activity,
  Zap,
  Globe,
  Gauge,
  CheckCircle2,
  HelpCircle,
  Play
} from 'lucide-react';

const PRESET_EXAMPLES = [
  {
    label: "Positive (Hinglish Slang)",
    category: "Headphones",
    text: "Sound quality is absolutely mast and noise cancellation in Delhi metro is pure paisa vasool! Battery lasts for 5 full days easily. Best headphones ever!"
  },
  {
    label: "Thermal Overheating Complaint",
    category: "Smartphone",
    text: "Phone heats up dangerously during BGMI gaming sessions and battery drains in 3 hours! Screen started lagging and camera app crashed twice. Extremely disappointed."
  },
  {
    label: "Suspicious Fake Astroturfing Review",
    category: "Smartphone",
    text: "superb amazing product five stars best in the market guaranteed 100% genuine recommend to all dont think just buy blindly go for it!!!!!"
  },
  {
    label: "Kitchen Grinder Safety Risk",
    category: "Kitchen Appliances",
    text: "Motor started sparking and smoke came out during dry masala grinding! Burning smell filled the kitchen. Severe safety hazard."
  }
];

export const AIReviewAnalyzer: React.FC = () => {
  const [reviewText, setReviewText] = useState(PRESET_EXAMPLES[0].text);
  const [category, setCategory] = useState(PRESET_EXAMPLES[0].category);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ReviewAnalysisResult | null>(null);

  // Auto-run first example on mount
  React.useEffect(() => {
    handleAnalyze();
  }, []);

  const handleAnalyze = async () => {
    if (!reviewText.trim()) return;
    setLoading(true);
    try {
      const res = await api.analyzeReview({ review_text: reviewText, category });
      setResult(res.data);
    } catch (e) {
      console.error('Error running AI review analysis:', e);
    } finally {
      setLoading(false);
    }
  };

  const loadPreset = (preset: typeof PRESET_EXAMPLES[0]) => {
    setReviewText(preset.text);
    setCategory(preset.category);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e6f4f2] border border-[#b2dfdb] text-[#007a6e] text-xs font-bold font-mono">
          <BrainCircuit className="w-4 h-4 text-[#007a6e]" /> Vercel Real-Time AI Model Execution
        </div>
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Live AI Review & Sentiment Inference Engine
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-2xl mt-1">
              Test any customer feedback directly. The embedded model runs NLP token sentiment scoring, fine-grained emotion mapping, category aspect sentiment, fake review detection, and urgency triage live in your browser.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Model: Active v2.4 (Vercel Ready)
            </span>
          </div>
        </div>

        {/* Quick Test Presets */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-500 font-bold">1-Click Test Scenarios:</span>
          {PRESET_EXAMPLES.map((p, idx) => (
            <button
              key={idx}
              onClick={() => loadPreset(p)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-3 py-1 rounded-lg transition-colors border border-slate-200"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="sm:col-span-3 space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Customer Review / Feedback Text</label>
            <textarea
              rows={3}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Enter any customer review in English or Hinglish..."
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-xs text-slate-900 focus:outline-none focus:border-[#007a6e] font-sans"
            />
          </div>

          <div className="space-y-3 flex flex-col justify-between">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Product Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#007a6e]"
              >
                <option value="Headphones">Headphones</option>
                <option value="Smartphone">Smartphone</option>
                <option value="Laptop">Laptop</option>
                <option value="Kitchen Appliances">Kitchen Appliances</option>
                <option value="Shoes">Shoes</option>
                <option value="Beauty products">Beauty products</option>
                <option value="General">General E-Commerce</option>
              </select>
            </div>

            <button
              onClick={handleAnalyze}
              disabled={loading || !reviewText.trim()}
              className="w-full bg-[#007a6e] hover:bg-[#006258] disabled:opacity-50 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs"
            >
              {loading ? (
                <>
                  <Activity className="w-4 h-4 animate-spin" /> Analyzing with Model...
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-white" /> Run Live AI Inference
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Model Analysis Results */}
      {result && (
        <div className="space-y-6">
          {/* Top Score Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Polarity Sentiment */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <div className="flex justify-between items-center text-xs text-slate-500 font-semibold">
                <span>Sentiment Score</span>
                {result.sentiment === 'positive' ? (
                  <Smile className="w-4 h-4 text-emerald-600" />
                ) : result.sentiment === 'negative' ? (
                  <Frown className="w-4 h-4 text-rose-600" />
                ) : (
                  <Meh className="w-4 h-4 text-amber-500" />
                )}
              </div>
              <div className="flex items-baseline gap-2">
                <span className={`text-2xl font-black ${
                  result.sentiment === 'positive' ? 'text-emerald-600' :
                  result.sentiment === 'negative' ? 'text-rose-600' : 'text-amber-600'
                }`}>
                  {result.sentiment_score > 0 ? `+${result.sentiment_score}` : result.sentiment_score}
                </span>
                <span className="text-xs uppercase font-extrabold tracking-wider text-slate-500">
                  {result.sentiment}
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden flex">
                <div
                  className={`h-full ${
                    result.sentiment === 'positive' ? 'bg-emerald-500' :
                    result.sentiment === 'negative' ? 'bg-rose-500' : 'bg-amber-400'
                  }`}
                  style={{ width: `${Math.round(((result.sentiment_score + 1) / 2) * 100)}%` }}
                ></div>
              </div>
              <p className="text-[10px] text-slate-400 font-mono">Range: -1.0 (Worst) to +1.0 (Best)</p>
            </div>

            {/* Fine-Grained Emotion */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <div className="flex justify-between items-center text-xs text-slate-500 font-semibold">
                <span>Classified Emotion</span>
                <Sparkles className="w-4 h-4 text-purple-600" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-slate-900 capitalize">
                  {result.emotion}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-600 font-medium">
                <span>Confidence:</span>
                <span className="font-mono font-bold text-[#007a6e]">
                  {Math.round(result.emotion_confidence * 100)}%
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono">Mapped via fine-grained lexicon</p>
            </div>

            {/* Authenticity / Fake Risk */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <div className="flex justify-between items-center text-xs text-slate-500 font-semibold">
                <span>Authenticity Risk</span>
                {result.is_flagged_fake ? (
                  <ShieldAlert className="w-4 h-4 text-rose-500" />
                ) : (
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                )}
              </div>
              <div className="flex items-baseline gap-2">
                <span className={`text-2xl font-black ${
                  result.is_flagged_fake ? 'text-rose-600' : 'text-emerald-600'
                }`}>
                  {Math.round(result.authenticity_risk * 100)}%
                </span>
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                  result.is_flagged_fake ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {result.is_flagged_fake ? 'Fake / Astroturf' : 'Authentic'}
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full ${result.is_flagged_fake ? 'bg-rose-500' : 'bg-emerald-500'}`}
                  style={{ width: `${Math.round(result.authenticity_risk * 100)}%` }}
                ></div>
              </div>
              <p className="text-[10px] text-slate-400 font-mono">Boilerplate & syntax checks</p>
            </div>

            {/* Complaint Triage & Urgency */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <div className="flex justify-between items-center text-xs text-slate-500 font-semibold">
                <span>Complaint Urgency</span>
                {result.is_safety_hazard ? (
                  <AlertTriangle className="w-4 h-4 text-red-600 animate-bounce" />
                ) : (
                  <Activity className="w-4 h-4 text-slate-400" />
                )}
              </div>
              <div className="flex items-baseline gap-2">
                <span className={`text-2xl font-black uppercase ${
                  result.urgency === 'critical' ? 'text-red-600' :
                  result.urgency === 'high' ? 'text-amber-600' : 'text-slate-700'
                }`}>
                  {result.urgency}
                </span>
                {result.is_safety_hazard && (
                  <span className="text-[10px] font-extrabold bg-red-100 text-red-800 px-2 py-0.5 rounded">
                    SAFETY HAZARD
                  </span>
                )}
              </div>
              <div className="text-[11px] text-slate-600 font-medium truncate">
                {result.complaint_type || "No critical friction"}
              </div>
              <p className="text-[10px] text-slate-400 font-mono">Automated escalation routing</p>
            </div>
          </div>

          {/* Aspects & Language Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Extracted Category Aspects */}
            <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                  <Gauge className="w-4 h-4 text-[#007a6e]" /> Extracted Aspect-Level Sentiments
                </h3>
                <span className="text-xs font-mono text-slate-500 font-medium">
                  {Object.keys(result.aspects).length} Aspects Identified
                </span>
              </div>

              <div className="space-y-3">
                {Object.entries(result.aspects).map(([aspectName, asp]) => (
                  <div
                    key={aspectName}
                    className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row justify-between sm:items-center gap-2 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{aspectName}</span>
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded uppercase ${
                          asp.sentiment === 'positive' ? 'bg-emerald-100 text-emerald-800' :
                          asp.sentiment === 'negative' ? 'bg-rose-100 text-rose-800' : 'bg-slate-200 text-slate-700'
                        }`}>
                          {asp.sentiment}
                        </span>
                      </div>
                      {asp.snippet && (
                        <p className="text-slate-500 text-[11px] italic">"{asp.snippet}"</p>
                      )}
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-slate-400 text-[10px] font-mono">
                        Polarity: {asp.score > 0 ? `+${asp.score}` : asp.score}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Language & Signals Inspector */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#007a6e]" /> Language & Signal Telemetry
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-slate-500 text-[10px] font-bold uppercase">Detected Language & Code-Mix</span>
                  <div className="font-bold text-slate-800 flex items-center justify-between">
                    <span>{result.language}</span>
                    <span className="font-mono text-[#007a6e]">{Math.round(result.language_confidence * 100)}%</span>
                  </div>
                  {result.is_code_mixed && (
                    <span className="inline-block bg-teal-50 text-teal-800 text-[10px] px-2 py-0.5 rounded font-medium mt-1">
                      Hinglish Colloquialisms Parsed
                    </span>
                  )}
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-slate-500 text-[10px] font-bold uppercase">Authenticity Reasons</span>
                  {result.authenticity_signals.reasons.length > 0 ? (
                    <ul className="list-disc list-inside space-y-1 text-slate-700 text-[11px]">
                      {result.authenticity_signals.reasons.map((r, idx) => (
                        <li key={idx}>{r}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-emerald-700 font-medium text-[11px] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> High experiential specificity and organic syntax
                    </p>
                  )}
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-slate-500 text-[10px] font-bold uppercase">Model Inference Summary</span>
                  <p className="text-slate-700 text-[11px] leading-relaxed">
                    {result.explanation}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
