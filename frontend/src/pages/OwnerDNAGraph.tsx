import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Share2, Layers, Cpu, CheckCircle, ArrowRight } from 'lucide-react';

export const OwnerDNAGraph: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [graphData, setGraphData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
        fetchDNA(prods[0].id);
      }
    } catch (e) {
      console.error('Failed to load products for DNA Graph:', e);
    }
  };

  const fetchDNA = async (productId: string) => {
    if (!productId) return;
    setLoading(true);
    try {
      const res = await api.getReputationDNA(productId);
      setGraphData(res.data);
    } catch (e) {
      console.error('Error fetching DNA graph:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const pId = e.target.value;
    setSelectedProductId(pId);
    fetchDNA(pId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="border-b border-slate-200 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2 tracking-tight">
            <Share2 className="w-6 h-6 text-[#007a6e]" /> Reputation DNA Knowledge Graph
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Dynamic graph topology linking product features, aspect sentiment, detected customer friction, and remediation actions
          </p>
        </div>

        {/* Product selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-600">Product:</span>
          <select
            value={selectedProductId}
            onChange={handleProductChange}
            className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#007a6e] max-w-xs truncate shadow-xs"
          >
            {products.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
      </div>

      {loading || !graphData ? (
        <div className="text-center py-20 text-slate-500 text-sm font-medium">Generating Reputation DNA Graph...</div>
      ) : (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-8">
          <div>
            <span className="text-xs text-slate-500 font-mono">Knowledge Topology</span>
            <h3 className="font-extrabold text-slate-900 text-xl mt-1">{graphData.product_name}</h3>
          </div>

          {/* Node Entities */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase font-mono tracking-wider text-slate-400">
              Graph Entity Nodes ({graphData.nodes?.length || 0})
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {graphData.nodes.map((n: any) => {
                const isProduct = n.type === 'product';
                const isIssue = n.type === 'issue';
                const isPositive = n.type === 'positive_aspect';
                const isNegative = n.type === 'negative_aspect';
                const isAction = n.type === 'action';

                const badgeColor = isProduct
                  ? 'bg-[#007a6e] text-white'
                  : isIssue
                  ? 'bg-rose-50 text-rose-800 border-rose-200'
                  : isPositive
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : isNegative
                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                  : 'bg-indigo-50 text-indigo-800 border-indigo-200';

                return (
                  <div key={n.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        isProduct ? 'bg-[#007a6e]' : isIssue ? 'bg-rose-500' : isPositive ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}
                    ></div>
                    <div className="overflow-hidden">
                      <span className={`text-[9px] uppercase font-mono font-bold px-1.5 py-0.5 rounded border ${badgeColor}`}>
                        {n.type?.replace('_', ' ')}
                      </span>
                      <p className="text-xs font-bold text-slate-900 mt-1 truncate">{n.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Graph Relationships / Edges */}
          <div className="border-t border-slate-100 pt-6 space-y-3">
            <h4 className="font-bold text-xs text-slate-400 uppercase font-mono tracking-wider">
              Verified Graph Relations ({graphData.links?.length || 0})
            </h4>
            <div className="space-y-2">
              {graphData.links.map((l: any, idx: number) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl text-xs font-mono text-slate-700 flex flex-wrap items-center gap-2 border border-slate-200">
                  <span className="font-bold text-[#007a6e]">{l.source}</span>
                  <span className="text-slate-400">──[{l.relation}]──►</span>
                  <span className="font-bold text-slate-900">{l.target}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
