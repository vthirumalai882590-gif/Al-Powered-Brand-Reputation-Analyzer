import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { ShieldCheck, AlertTriangle, CheckCircle, HelpCircle, AlertCircle, ArrowLeft, Star, TrendingUp, TrendingDown, Minus, Clock } from 'lucide-react';

export const ProductTrustExplorer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<any>(null);
  const [timeline, setTimeline] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'lens' | 'reality' | 'timeline' | 'complaints'>('lens');

  useEffect(() => {
    if (id) {
      fetchReputation(id);
    }
  }, [id]);

  const fetchReputation = async (productId: string) => {
    setLoading(true);
    setError(null);
    try {
      const [repRes, tlRes] = await Promise.all([
        api.getProductReputation(productId),
        api.getProductTimeline(productId).catch(() => ({ data: { timeline: [] } }))
      ]);
      setProfile(repRes.data);
      setTimeline(tlRes.data.timeline || []);
    } catch (e: any) {
      console.error('Error fetching product trust profile:', e);
      setError('Product reputation profile could not be loaded. Please verify product ID.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-24 text-slate-500 font-medium">Loading verified trust intelligence...</div>;
  }

  if (error || !profile) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
        <h2 className="text-xl font-bold text-slate-900">{error || 'Product Not Found'}</h2>
        <Link to="/search" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#007a6e] hover:underline">
          <ArrowLeft className="w-4 h-4" /> Return to Trust Directory
        </Link>
      </div>
    );
  }

  const hasData = profile.has_sufficient_data;
  const ratingMetrics = profile.rating_metrics || {};
  const authenticity = profile.authenticity || {};
  const complaints = profile.complaints || {};
  const aspects = profile.aspects || {};

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb navigation */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/search" className="hover:text-[#007a6e]">Trust Directory</Link>
        <span>/</span>
        <span className="font-semibold text-slate-700">{profile.category}</span>
        <span>/</span>
        <span className="text-slate-900 font-bold truncate max-w-xs">{profile.product_name}</span>
      </div>

      {/* Product Header & Trust Badge */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#e6f4f2] text-[#007a6e] border border-[#b2dfdb] text-xs font-bold font-mono">
              {profile.category}
            </span>
            {profile.brand_name && (
              <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                Brand: {profile.brand_name}
              </span>
            )}
            <span className="text-xs text-slate-500 font-mono">{profile.data_freshness}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">{profile.product_name}</h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1 font-mono">
            {ratingMetrics.average_rating ? (
              <span className="flex items-center gap-1 font-bold text-amber-600">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" /> {ratingMetrics.average_rating.toFixed(2)} / 5.0
              </span>
            ) : null}
            <span>•</span>
            <span>{profile.review_count.toLocaleString('en-IN')} verified customer reviews</span>
            {profile.confidence_interval?.confidence && (
              <>
                <span>•</span>
                <span className="text-emerald-700 font-semibold">
                  {(profile.confidence_interval.confidence * 100).toFixed(0)}% statistical confidence
                </span>
              </>
            )}
          </div>
        </div>

        {/* Big Trust Badge */}
        {hasData && profile.trust_score ? (
          <div className="bg-[#e6f4f2] border border-[#b2dfdb] p-5 rounded-2xl flex items-center gap-4 shadow-xs shrink-0">
            <div className="text-right">
              <span className="block text-[10px] text-slate-600 uppercase tracking-wider font-mono font-bold">Evidence Trust Score</span>
              <span className="text-4xl font-black text-[#007a6e]">{profile.trust_score}%</span>
              {profile.confidence_interval?.lower && profile.confidence_interval?.upper && (
                <span className="block text-[10px] text-slate-500 font-mono">
                  95% CI: [{profile.confidence_interval.lower}% - {profile.confidence_interval.upper}%]
                </span>
              )}
            </div>
            <ShieldCheck className="w-12 h-12 text-[#007a6e]" />
          </div>
        ) : (
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-center gap-3 shrink-0 text-amber-800 text-xs">
            <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0" />
            <div>
              <span className="font-bold block">Insufficient Review Evidence</span>
              <span className="text-[11px] text-amber-700">Requires at least 5 reviews for confidence scoring.</span>
            </div>
          </div>
        )}
      </div>

      {!hasData && (
        <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl space-y-2 text-amber-900 text-xs">
          <h3 className="font-bold text-sm flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-600" /> Statistical Significance Notice
          </h3>
          <p>
            BrandPulse has collected {profile.review_count} reviews for this product. To uphold statistical integrity and prevent misleading scores,
            our transparent reputation engine requires a minimum quorum of 5 verified customer reviews before computing a production Trust Score.
          </p>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 space-x-6">
        <button
          onClick={() => setActiveTab('lens')}
          className={`pb-3 text-sm font-bold transition-all border-b-2 ${
            activeTab === 'lens' ? 'border-[#007a6e] text-[#007a6e]' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Aspect Dimensions ({Object.keys(aspects).length})
        </button>
        <button
          onClick={() => setActiveTab('reality')}
          className={`pb-3 text-sm font-bold transition-all border-b-2 ${
            activeTab === 'reality' ? 'border-[#007a6e] text-[#007a6e]' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Review Reality Check ({authenticity.suspicious_count || 0})
        </button>
        <button
          onClick={() => setActiveTab('timeline')}
          className={`pb-3 text-sm font-bold transition-all border-b-2 ${
            activeTab === 'timeline' ? 'border-[#007a6e] text-[#007a6e]' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Chronological Timeline ({timeline.length} Months)
        </button>
        <button
          onClick={() => setActiveTab('complaints')}
          className={`pb-3 text-sm font-bold transition-all border-b-2 ${
            activeTab === 'complaints' ? 'border-[#007a6e] text-[#007a6e]' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Complaints & Safety ({complaints.total_complaints || 0})
        </button>
      </div>

      {/* Tab 1: Aspect Dimensions */}
      {activeTab === 'lens' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(aspects).map(([aspName, aspData]: [string, any]) => {
              const score = aspData.score || 50;
              const posRatio = Math.round((aspData.positive_ratio || 0.5) * 100);
              const mentions = aspData.mentions || 0;
              const sentiment = aspData.sentiment || 'neutral';

              return (
                <div key={aspName} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">{aspName}</h3>
                      <span className="text-xs text-slate-500 font-mono">
                        {mentions} customer mentions • {posRatio}% positive
                      </span>
                    </div>
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-full font-mono ${
                        score >= 70
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : score <= 45
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {score}% Performance
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        score >= 70 ? 'bg-emerald-500' : score <= 45 ? 'bg-rose-500' : 'bg-[#007a6e]'
                      }`}
                      style={{ width: `${Math.min(100, Math.max(5, score))}%` }}
                    ></div>
                  </div>

                  {/* Customer quote snippets */}
                  {aspData.snippets && aspData.snippets.length > 0 && (
                    <div className="pt-2 border-t border-slate-100 space-y-1.5">
                      <span className="text-[10px] text-slate-400 font-bold uppercase font-mono tracking-wider">
                        Customer Voice Snippet
                      </span>
                      {aspData.snippets.slice(0, 2).map((snip: string, i: number) => (
                        <p key={i} className="text-xs text-slate-600 italic bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                          "{snip}"
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Review Reality Check */}
      {activeTab === 'reality' && (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-[#007a6e]" />
            <div>
              <h2 className="text-lg font-bold text-slate-900">Review Reality & Authenticity Analysis</h2>
              <p className="text-xs text-slate-500">Multi-signal detection checks against review fraud, bot text, and repetitive phrasing</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-[11px] text-slate-500 font-mono uppercase block">Verified Buyers</span>
              <span className="text-2xl font-black text-slate-900 mt-1 block">
                {authenticity.verified_buyer_percentage || 0}%
              </span>
              <span className="text-[11px] text-slate-500">Confirmed store purchase transactions</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-[11px] text-slate-500 font-mono uppercase block">Suspicious Pattern Risk</span>
              <span className="text-2xl font-black text-slate-900 mt-1 block">
                {authenticity.suspicious_percentage || 0}%
              </span>
              <span className="text-[11px] text-slate-500">{authenticity.suspicious_count || 0} reviews flagged for review</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-[11px] text-slate-500 font-mono uppercase block">Average Authenticity Risk</span>
              <span className="text-2xl font-black text-[#007a6e] mt-1 block">
                {(authenticity.avg_authenticity_risk || 0.05).toFixed(2)} / 1.00
              </span>
              <span className="text-[11px] text-emerald-700 font-medium">Low overall bot risk footprint</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Timeline */}
      {activeTab === 'timeline' && (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-[#007a6e]" />
            <div>
              <h2 className="text-lg font-bold text-slate-900">Chronological Review Telemetry</h2>
              <p className="text-xs text-slate-500">Historical progression strictly reconstructed from real review dates</p>
            </div>
          </div>

          {timeline.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-sm">No monthly timeline data recorded yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-slate-500 font-mono uppercase text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="p-3">Period</th>
                    <th className="p-3">Reviews Ingested</th>
                    <th className="p-3">Average Rating</th>
                    <th className="p-3">Positive Sentiment Share</th>
                    <th className="p-3">Monthly Trust Index</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {timeline.map((item: any) => (
                    <tr key={item.period} className="hover:bg-slate-50">
                      <td className="p-3 font-mono font-bold text-slate-900">{item.period}</td>
                      <td className="p-3 font-mono">{item.volume} reviews</td>
                      <td className="p-3 font-mono text-amber-600 font-semibold">{item.average_rating ? item.average_rating.toFixed(2) : 'N/A'}/5</td>
                      <td className="p-3 font-mono font-semibold text-emerald-700">{item.sentiment_score}%</td>
                      <td className="p-3 font-mono font-bold text-[#007a6e]">{item.trust_score}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Complaints & Safety */}
      {activeTab === 'complaints' && (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-rose-600" />
            <div>
              <h2 className="text-lg font-bold text-slate-900">Complaints & Safety Hazard Triage</h2>
              <p className="text-xs text-slate-500">Automatic detection of high-friction failures, defects, and hazardous incidents</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-[11px] text-slate-500 font-mono uppercase block">Total Complaints</span>
              <span className="text-2xl font-black text-slate-900 mt-1 block">{complaints.total_complaints || 0}</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-[11px] text-slate-500 font-mono uppercase block">High Urgency Defects</span>
              <span className="text-2xl font-black text-amber-600 mt-1 block">{complaints.high_count || 0}</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-[11px] text-slate-500 font-mono uppercase block">Critical Safety Hazards</span>
              <span className="text-2xl font-black text-rose-600 mt-1 block">{complaints.critical_count || 0}</span>
            </div>
          </div>

          {complaints.top_complaint_types && complaints.top_complaint_types.length > 0 && (
            <div className="space-y-3 pt-2">
              <h3 className="font-bold text-slate-900 text-sm">Most Prevalent Friction Categories</h3>
              <div className="space-y-2">
                {complaints.top_complaint_types.map((c: any) => (
                  <div key={c.type} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                    <span className="font-semibold text-slate-800">{c.type}</span>
                    <span className="font-mono font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">
                      {c.count} verified reports
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
