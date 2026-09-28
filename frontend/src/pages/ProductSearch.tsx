import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { Search, Filter, ShieldCheck, ChevronRight, AlertCircle, Star } from 'lucide-react';

export const ProductSearch: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category') || '';

  const [products, setProducts] = useState<any[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'All');
  const [minTrustScore, setMinTrustScore] = useState<string>('');

  const categories = [
    'All',
    'Kitchen Appliances',
    'Beauty & Personal Care',
    'Beauty products',
    'Smartphone',
    'Headphones',
    'Laptop',
    'Shoes',
    'Online Course',
    'Restaurant',
    'SaaS Product',
    'EV Scooter',
    'Food Delivery',
    'Hotels',
    'Financial services'
  ];

  useEffect(() => {
    fetchProducts();
  }, [searchParams]);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const q = searchParams.get('q') || undefined;
      const cat = searchParams.get('category');
      const minTrust = searchParams.get('min_trust') ? parseFloat(searchParams.get('min_trust')!) : undefined;

      const res = await api.searchCatalog({
        q: q || undefined,
        category: cat && cat !== 'All' ? cat : undefined,
        min_trust_score: minTrust,
        page_size: 50
      });

      setProducts(res.data.results || []);
      setTotalResults(res.data.total_results || 0);
    } catch (e: any) {
      console.error('Search API error:', e);
      setError('Failed to query product evidence catalog. Please check backend connection.');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params: any = {};
    if (searchQuery.trim()) params.q = searchQuery.trim();
    if (selectedCategory && selectedCategory !== 'All') params.category = selectedCategory;
    if (minTrustScore) params.min_trust = minTrustScore;
    setSearchParams(params);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setMinTrustScore('');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Product Trust Directory</h1>
          <p className="text-xs text-slate-500 font-medium">
            Search and filter multi-category verified products evaluated on real customer review telemetry
          </p>
        </div>
        <span className="text-xs text-slate-500 font-mono">
          {totalResults} verified products matching criteria
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <aside className="bg-white p-5 rounded-2xl border border-slate-200 space-y-6 h-fit shadow-xs">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 font-extrabold text-sm text-slate-900">
              <Filter className="w-4 h-4 text-[#007a6e]" /> Filter Criteria
            </span>
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-[11px] text-slate-500 hover:text-[#007a6e] font-semibold"
            >
              Reset
            </button>
          </div>

          <form onSubmit={handleFilterSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-slate-600 mb-1 font-bold">Keywords</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Product name, brand or model..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#007a6e]"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-600 mb-1 font-bold">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#007a6e]"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs text-slate-600 mb-1 font-bold">Min Evidence Trust Score (%)</label>
              <select
                value={minTrustScore}
                onChange={(e) => setMinTrustScore(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#007a6e]"
              >
                <option value="">Any Trust Score</option>
                <option value="60">60% +</option>
                <option value="70">70% +</option>
                <option value="80">80% +</option>
                <option value="90">90% +</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-[#007a6e] hover:bg-[#006258] text-white font-bold py-2 rounded-xl text-xs transition-colors shadow-xs"
            >
              Apply Filters
            </button>
          </form>
        </aside>

        {/* Product Results Grid */}
        <main className="lg:col-span-3 space-y-6">
          {error && (
            <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          {loading ? (
            <div className="text-center py-16 text-slate-500 text-sm font-medium">Loading verified products...</div>
          ) : products.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl text-center border border-slate-200 space-y-3 shadow-xs">
              <ShieldCheck className="w-12 h-12 text-slate-400 mx-auto" />
              <h3 className="text-lg font-bold text-slate-800">No matching products found</h3>
              <p className="text-xs text-slate-500">Try adjusting your category filter, keyword search, or trust score threshold.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {products.map((p) => (
                <div key={p.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between hover:border-[#007a6e] transition-all">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold font-mono border border-slate-200">
                        {p.category}
                      </span>
                      {p.trust_score ? (
                        <span className="text-xs font-bold text-[#007a6e] bg-[#e6f4f2] border border-[#b2dfdb] px-2.5 py-0.5 rounded-full font-mono">
                          {p.trust_score}% Trust
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-400 font-mono">Insufficient Data</span>
                      )}
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-900 text-base mb-1">{p.name}</h3>
                      {p.brand_name && (
                        <span className="text-xs text-slate-500 font-medium">Brand: {p.brand_name}</span>
                      )}
                    </div>

                    {/* Rating & Review volume */}
                    <div className="flex items-center gap-3 text-xs text-slate-600 font-mono">
                      {p.average_rating ? (
                        <span className="flex items-center gap-1 font-bold text-amber-600">
                          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> {p.average_rating.toFixed(1)}/5
                        </span>
                      ) : null}
                      <span>•</span>
                      <span>{p.review_count.toLocaleString('en-IN')} verified reviews</span>
                    </div>

                    {/* Top Aspect pills */}
                    {p.top_aspects && p.top_aspects.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {p.top_aspects.map((asp: any) => (
                          <span
                            key={asp.name}
                            className={`text-[9px] px-2 py-0.5 rounded font-mono font-semibold ${
                              asp.sentiment === 'positive'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : asp.sentiment === 'negative'
                                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                : 'bg-slate-100 text-slate-600 border border-slate-200'
                            }`}
                          >
                            {asp.name}: {asp.score}%
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 font-mono">
                      {p.price ? `₹${p.price.toLocaleString('en-IN')}` : ''}
                    </span>
                    <Link
                      to={`/product/${p.id}`}
                      className="bg-[#007a6e] hover:bg-[#006258] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1 shadow-xs"
                    >
                      Trust Explorer <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
