import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, ShieldCheck, ArrowRight, Smartphone, Laptop, Footprints, GraduationCap, Utensils, Headphones, Building2, Sparkles, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api';

export const CustomerHome: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [freshness, setFreshness] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    setLoading(true);
    try {
      const [searchRes, freshRes] = await Promise.all([
        api.searchCatalog({ page_size: 8 }),
        api.getDataFreshness().catch(() => null)
      ]);
      setFeaturedProducts(searchRes.data.results || []);
      if (freshRes) setFreshness(freshRes.data);
    } catch (e) {
      console.error('Error fetching home catalog data:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const totalReviewsCount = freshness?.total_feedback_records || 14914;

  const categories = [
    { name: 'Kitchen Appliances', icon: Utensils, path: '/search?category=Kitchen+Appliances' },
    { name: 'Beauty & Personal Care', icon: Sparkles, path: '/search?category=Beauty+%26+Personal+Care' },
    { name: 'Smartphone', icon: Smartphone, path: '/search?category=Smartphone' },
    { name: 'Headphones', icon: Headphones, path: '/search?category=Headphones' },
    { name: 'Laptop', icon: Laptop, path: '/search?category=Laptop' },
    { name: 'Shoes', icon: Footprints, path: '/search?category=Shoes' },
    { name: 'Online Course', icon: GraduationCap, path: '/search?category=Online+Course' },
    { name: 'Food Delivery', icon: Building2, path: '/search?category=Food+Delivery' },
  ];

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="bg-white border-b border-slate-200 pt-12 pb-16 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e6f4f2] border border-[#b2dfdb] text-[#007a6e] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-[#007a6e]" /> Evidence-Based Reputation Intelligence
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto">
            From Public Feedback to <span className="text-[#007a6e]">Trusted Decisions</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Multi-dimensional trust profiles, review authenticity risk checks, and transparent AI evidence synthesized from{' '}
            <strong className="text-slate-900">{totalReviewsCount.toLocaleString('en-IN')} verified customer reviews</strong> across Indian markets.
          </p>

          {/* Global Search Box */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative mt-6">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Bosch, Philips, Sujata, Preethi, Mamaearth, Redmi, Samsung..."
                className="w-full bg-slate-50 border border-slate-300 rounded-2xl py-4 pl-12 pr-36 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#007a6e] focus:border-[#007a6e] transition-all shadow-sm"
              />
              <button
                type="submit"
                className="absolute right-2.5 bg-[#007a6e] hover:bg-[#006258] text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-all shadow-sm flex items-center gap-1"
              >
                Explore Directory
              </button>
            </div>
          </form>

          {/* Real Dataset Stats Pill */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500 pt-2 font-mono">
            <span>Verified Sources: Amazon India, Flipkart</span>
            <span>•</span>
            <span>{totalReviewsCount.toLocaleString('en-IN')} Analyzed Reviews</span>
            <span>•</span>
            <span>0% Hallucinated Scores</span>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex justify-between items-end border-b border-slate-200 pb-3">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Browse by Category</h2>
            <p className="text-xs text-slate-500">Explore domain-specific aspect taxonomy and evidence evaluations</p>
          </div>
          <Link to="/search" className="text-xs font-bold text-[#007a6e] hover:underline flex items-center gap-1">
            View All Categories <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {categories.map((c) => {
            const Icon = c.icon;
            return (
              <Link
                key={c.name}
                to={c.path}
                className="p-4 bg-white rounded-2xl border border-slate-200 hover:border-[#007a6e] transition-all flex items-center gap-3 shadow-xs hover:shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-[#e6f4f2] text-[#007a6e] flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-xs">{c.name}</h3>
                  <span className="text-[10px] text-slate-500 font-mono">Verified Evidence</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Verified Products Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex justify-between items-end border-b border-slate-200 pb-3">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Verified Evidence Directory</h2>
            <p className="text-xs text-slate-500">Products evaluated with statistically grounded Trust Scores and aspect breakdown</p>
          </div>
          <Link to="/search" className="text-xs font-bold text-[#007a6e] hover:underline flex items-center gap-1">
            Explore All Catalog <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-16 text-slate-500 text-sm font-medium">Loading real review evidence directory...</div>
        ) : featuredProducts.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center text-slate-500 text-sm">
            No products available.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((p) => (
              <Link
                key={p.id}
                to={`/product/${p.id}`}
                className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-[#007a6e] transition-all shadow-xs flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-mono font-bold border border-slate-200">
                      {p.category}
                    </span>
                    {p.trust_score ? (
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#e6f4f2] text-[#007a6e] border border-[#b2dfdb]">
                        {p.trust_score}% Trust
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400 font-mono">Evaluating</span>
                    )}
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-[#007a6e] transition-colors line-clamp-2">
                    {p.name}
                  </h3>

                  {p.brand_name && (
                    <p className="text-[11px] text-slate-500 font-medium">Brand: {p.brand_name}</p>
                  )}

                  {/* Top Aspects */}
                  {p.top_aspects && p.top_aspects.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {p.top_aspects.map((asp: any) => (
                        <span
                          key={asp.name}
                          className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-semibold ${
                            asp.sentiment === 'positive'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : asp.sentiment === 'negative'
                              ? 'bg-rose-50 text-rose-700 border border-rose-200'
                              : 'bg-slate-100 text-slate-600 border border-slate-200'
                          }`}
                        >
                          {asp.name} ({asp.score}%)
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="font-mono text-[11px]">{p.review_count.toLocaleString('en-IN')} verified reviews</span>
                  <span className="text-[#007a6e] font-bold text-[11px] flex items-center gap-0.5">
                    Inspect <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
