import React, { useState, useEffect } from 'react';
import { Bot, Send, ShieldCheck, User, Sparkles } from 'lucide-react';
import { api } from '../services/api';

export const AIAssistant: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string; confidence?: number; sources?: string[] }>>([
    {
      sender: 'bot',
      text: 'Hello! I am your BrandPulse Grounded AI Assistant. Select a product and ask me anything about customer sentiment, aspect performance (motor power, noise, battery, fragrance, etc.), or verified complaints.',
      confidence: 0.98
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

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
      console.error('Error loading products for AI chat:', e);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !selectedProductId) return;

    const userText = input;
    setInput('');
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setLoading(true);

    try {
      const res = await api.chatAssistant({ product_id: selectedProductId, query: userText });
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: res.data.reply,
          confidence: res.data.confidence,
          sources: res.data.evidence_sources
        }
      ]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: 'Unable to reach the evidence analysis engine right now. Please verify backend connectivity.',
          confidence: 0.50
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Header & Product Selector */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#e6f4f2] border border-[#b2dfdb] flex items-center justify-center">
            <Bot className="w-5 h-5 text-[#007a6e]" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">AI Evidence Assistant</h1>
            <p className="text-xs text-slate-500 font-medium">Grounded in verified customer review telemetry • 0% synthetic hallucination</p>
          </div>
        </div>

        {/* Product Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-600">Product:</span>
          <select
            value={selectedProductId}
            onChange={(e) => setSelectedProductId(e.target.value)}
            className="bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#007a6e] max-w-xs truncate"
          >
            {products.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4 h-[480px] overflow-y-auto">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {m.sender === 'bot' && (
              <div className="w-8 h-8 rounded-xl bg-[#e6f4f2] border border-[#b2dfdb] flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-[#007a6e]" />
              </div>
            )}
            <div
              className={`max-w-lg p-4 rounded-2xl text-xs space-y-2 ${
                m.sender === 'user'
                  ? 'bg-[#007a6e] text-white font-medium'
                  : 'bg-slate-50 border border-slate-200 text-slate-800'
              }`}
            >
              <p className="leading-relaxed">{m.text}</p>
              {m.confidence && (
                <div className="pt-1 border-t border-slate-200/50 flex flex-wrap items-center justify-between gap-1 text-[10px] opacity-80 font-mono">
                  <span>Evidence Confidence: {(m.confidence * 100).toFixed(0)}%</span>
                  {m.sources && m.sources[0] && <span className="truncate max-w-xs">{m.sources[0]}</span>}
                </div>
              )}
            </div>
            {m.sender === 'user' && (
              <div className="w-8 h-8 rounded-xl bg-slate-200 flex items-center justify-center shrink-0">
                <User className="w-4 h-4 text-slate-700" />
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex gap-3 items-center text-xs text-slate-400 font-mono">
            <Bot className="w-4 h-4 text-[#007a6e] animate-pulse" />
            <span>Analyzing verified reviews for selected product...</span>
          </div>
        )}
      </div>

      {/* Input Box */}
      <form onSubmit={handleSend} className="relative flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about motor power, heating, hair fall, noise levels, jar quality..."
          className="w-full bg-white border border-slate-300 rounded-2xl py-3.5 pl-4 pr-28 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#007a6e] shadow-xs"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="absolute right-2 bg-[#007a6e] hover:bg-[#006258] disabled:opacity-50 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1 transition-all shadow-xs"
        >
          <Send className="w-3.5 h-3.5" /> Send
        </button>
      </form>
    </div>
  );
};
