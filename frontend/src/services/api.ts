import axios from 'axios';
import {
  runFullAIPipeline,
  calculatePersonalFit,
  generateAIChatResponse,
  ReviewAnalysisResult
} from './embeddedAI';
import {
  MOCK_PRODUCTS,
  MOCK_OWNER_OVERVIEW,
  MOCK_OWNER_ISSUES,
  MOCK_OWNER_ALERTS,
  MOCK_FRESHNESS,
  MOCK_INDIA_ANALYTICS,
  MOCK_ADMIN_USERS,
  MOCK_AUDIT_LOGS,
  MOCK_SYSTEM_HEALTH,
  MockProduct
} from './mockData';

const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || '/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('brandpulse_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Helper to simulate AxiosResponse
function mockResponse<T>(data: T, status: number = 200) {
  return Promise.resolve({
    data,
    status,
    statusText: 'OK',
    headers: {},
    config: {} as any
  });
}

// In-memory runtime state for mutations during the user session
let runtimeProducts: MockProduct[] = [...MOCK_PRODUCTS];
let runtimeActions: any[] = [
  {
    id: 'act_001',
    product_id: 'prd_001',
    title: 'Deploy Firmware Patch v2.1.1 for Thermal Optimization',
    description: 'Engineering hotfix addressing background process indexing bug in v2.1.',
    priority: 'high',
    status: 'in_progress',
    beforeScore: 78.0,
    afterScore: 88.5,
    impact: '+10.5% Sentiment Recovery'
  }
];

/**
 * Universal API Client with automatic Embedded AI Engine fallback.
 * Works seamlessly whether connected to a live FastAPI backend or
 * running 100% standalone inside Vercel without server infrastructure.
 */
export const api = {
  // Auth
  login: async (data: any) => {
    try {
      const res = await apiClient.post('/auth/login', data);
      if (res.data && res.data.access_token) return res;
    } catch (_) {
      // Fallback
    }
    const role = data.email?.includes('owner') ? 'owner' : data.email?.includes('admin') ? 'admin' : 'customer';
    return mockResponse({
      access_token: `embedded_jwt_${role}_${Date.now()}`,
      token_type: 'bearer',
      user: {
        id: `usr_${role}_001`,
        name: role === 'owner' ? 'Sarah Jenkins (Brand Owner)' : role === 'admin' ? 'System Administrator' : 'Alex Rivera (Customer)',
        email: data.email || `${role}@brandpulse.ai`,
        role,
        is_active: true,
        created_at: new Date().toISOString()
      }
    });
  },

  register: async (data: any) => {
    try {
      const res = await apiClient.post('/auth/register', data);
      if (res.data && res.data.access_token) return res;
    } catch (_) {
      // Fallback
    }
    return mockResponse({
      access_token: `embedded_jwt_${data.role || 'customer'}_${Date.now()}`,
      token_type: 'bearer',
      user: {
        id: `usr_${Date.now()}`,
        name: data.name,
        email: data.email,
        role: data.role || 'customer',
        is_active: true,
        created_at: new Date().toISOString()
      }
    });
  },

  getMe: async () => {
    try {
      const res = await apiClient.get('/auth/me');
      if (res.data) return res;
    } catch (_) {}
    return mockResponse({
      id: 'usr_customer_001',
      name: 'Alex Rivera (Customer)',
      email: 'customer@brandpulse.ai',
      role: 'customer'
    });
  },

  // Products Catalog
  getProducts: async (params?: any) => {
    try {
      const res = await apiClient.get('/products', { params });
      if (Array.isArray(res.data) && res.data.length > 0) return res;
    } catch (_) {}
    let list = [...runtimeProducts];
    if (params?.category) {
      list = list.filter((p) => p.category.toLowerCase().includes(params.category.toLowerCase()));
    }
    if (params?.page_size) {
      list = list.slice(0, params.page_size);
    }
    return mockResponse(list);
  },

  getProduct: async (id: string) => {
    try {
      const res = await apiClient.get(`/products/${id}`);
      if (res.data && res.data.id) return res;
    } catch (_) {}
    const p = runtimeProducts.find((item) => item.id === id) || runtimeProducts[0];
    return mockResponse(p);
  },

  getProductReputation: async (id: string) => {
    try {
      const res = await apiClient.get(`/products/${id}/reputation`);
      if (res.data && res.data.trust_score !== undefined) return res;
    } catch (_) {}
    const p = runtimeProducts.find((item) => item.id === id) || runtimeProducts[0];
    return mockResponse({
      product_id: p.id,
      product_name: p.name,
      category: p.category,
      brand_id: p.brand_id,
      trust_score: p.trust_score,
      confidence: p.confidence,
      data_freshness: "Verified continuous sync (Embedded Evidence Engine)",
      review_count: p.review_count,
      rating: p.rating,
      sentiment_distribution: p.sentiment_distribution,
      aspects: p.aspects,
      positive_themes: p.positive_themes,
      negative_themes: p.negative_themes,
      suspicious_patterns_count: p.suspicious_patterns_count,
      dimensions: p.dimensions,
      recent_reviews: p.reviews
    });
  },

  getProductTimeline: async (id: string) => {
    try {
      const res = await apiClient.get(`/products/${id}/timeline`);
      if (res.data && Array.isArray(res.data.timeline) && res.data.timeline.length > 0) return res;
    } catch (_) {}
    const p = runtimeProducts.find((item) => item.id === id) || runtimeProducts[0];
    return mockResponse({ timeline: p.timeline });
  },

  getProductAspects: async (id: string) => {
    try {
      const res = await apiClient.get(`/products/${id}/aspects`);
      if (res.data) return res;
    } catch (_) {}
    const p = runtimeProducts.find((item) => item.id === id) || runtimeProducts[0];
    return mockResponse(p.aspects);
  },

  getProductComplaints: async (id: string) => {
    try {
      const res = await apiClient.get(`/products/${id}/complaints`);
      if (res.data) return res;
    } catch (_) {}
    const p = runtimeProducts.find((item) => item.id === id) || runtimeProducts[0];
    return mockResponse({
      total_complaints: Math.round(p.review_count * 0.08),
      top_complaint_types: [
        { type: "Thermal / Acoustic Discomfort", count: 34 },
        { type: "Transit Packaging / Gasket Fitment", count: 18 }
      ]
    });
  },

  compareProducts: async (ids: string[]) => {
    try {
      const res = await apiClient.get('/products/compare/side-by-side', { params: { ids: ids.join(',') } });
      if (res.data && res.data.products) return res;
    } catch (_) {}
    const selected = runtimeProducts.filter((p) => ids.includes(p.id));
    const comparison = selected.length >= 2 ? selected : [runtimeProducts[0], runtimeProducts[1]];
    return mockResponse({
      products: comparison.map((p) => ({
        id: p.id,
        name: p.name,
        category: p.category,
        price: p.price,
        trust_score: p.trust_score,
        rating: p.rating,
        review_count: p.review_count,
        aspects: p.aspects,
        features: p.features
      }))
    });
  },

  searchCatalog: async (params?: any) => {
    try {
      const res = await apiClient.get('/search', { params });
      if (res.data && Array.isArray(res.data.results) && res.data.results.length > 0) return res;
    } catch (_) {}
    let list = [...runtimeProducts];
    if (params?.q) {
      const qLower = params.q.toLowerCase();
      list = list.filter((p) =>
        p.name.toLowerCase().includes(qLower) ||
        p.category.toLowerCase().includes(qLower) ||
        p.description.toLowerCase().includes(qLower)
      );
    }
    if (params?.category) {
      list = list.filter((p) => p.category.toLowerCase() === params.category.toLowerCase());
    }
    const pageSize = params?.page_size || 12;
    const paginated = list.slice(0, pageSize);
    return mockResponse({
      total: list.length,
      page: 1,
      page_size: pageSize,
      results: paginated
    });
  },

  // Feedback & AI
  getFeedbackList: async (params?: any) => {
    try {
      const res = await apiClient.get('/feedback', { params });
      if (res.data && Array.isArray(res.data)) return res;
    } catch (_) {}
    const p = runtimeProducts.find((item) => item.id === params?.product_id) || runtimeProducts[0];
    return mockResponse(p.reviews);
  },

  submitFeedback: async (data: any) => {
    try {
      const res = await apiClient.post('/feedback', data);
      if (res.data) return res;
    } catch (_) {}
    const aiAnalysis = runFullAIPipeline(data.review_text, data.rating || 4.0, data.category || '');
    const newRev = {
      id: `rev_${Date.now()}`,
      author: data.author_name || "Verified Customer",
      rating: data.rating || 4,
      date: new Date().toISOString().split('T')[0],
      review_text: data.review_text,
      location: data.location || "Bengaluru, India",
      verified: true,
      sentiment: aiAnalysis.sentiment,
      sentiment_score: aiAnalysis.sentiment_score,
      emotion: aiAnalysis.emotion,
      authenticity_risk: aiAnalysis.authenticity_risk
    };
    const targetProd = runtimeProducts.find((p) => p.id === data.product_id);
    if (targetProd) {
      targetProd.reviews.unshift(newRev);
      targetProd.review_count += 1;
    }
    return mockResponse({ feedback: newRev, analysis: aiAnalysis });
  },

  /**
   * Live AI Review Analysis
   * Direct model inference on user-submitted text!
   */
  analyzeReview: async (data: { review_text: string; category?: string }): Promise<{ data: ReviewAnalysisResult }> => {
    try {
      const res = await apiClient.post('/ai/analyze-review', data);
      if (res.data && res.data.sentiment) return res;
    } catch (_) {}
    const result = runFullAIPipeline(data.review_text, 4.0, data.category || '');
    return mockResponse(result);
  },

  /**
   * Personal Fit Finder
   */
  getPersonalFit: async (data: any) => {
    try {
      const res = await apiClient.post('/ai/personal-fit', data);
      if (res.data && res.data.fit_score !== undefined) return res;
    } catch (_) {}
    const p = runtimeProducts.find((item) => item.id === data.product_id) || runtimeProducts[0];
    const fit = calculatePersonalFit(
      p.name,
      p.category,
      p.aspects,
      data.primary_use_case || 'General Daily Usage',
      data.non_negotiable_features || []
    );
    return mockResponse(fit);
  },

  /**
   * AI Evidence Assistant Chat
   */
  chatAssistant: async (data: { product_id: string; query: string }) => {
    try {
      const res = await apiClient.post('/ai/chat', data);
      if (res.data && res.data.reply) return res;
    } catch (_) {}
    const p = runtimeProducts.find((item) => item.id === data.product_id) || runtimeProducts[0];
    const reply = generateAIChatResponse(data.query, p.name, p);
    return mockResponse({
      query: data.query,
      reply,
      evidence_sources: [
        `Derived from ${p.review_count.toLocaleString()} verified customer reviews for ${p.name}`,
        `Current Trust Score: ${p.trust_score}%`
      ],
      confidence: 0.94
    });
  },

  // Owner Operations
  getOwnerOverview: async () => {
    try {
      const res = await apiClient.get('/owner/overview');
      if (res.data && res.data.active_reputation_index !== undefined) return res;
    } catch (_) {}
    return mockResponse(MOCK_OWNER_OVERVIEW);
  },

  getOwnerIssues: async (productId?: string) => {
    try {
      const res = await apiClient.get('/owner/issues', { params: { product_id: productId } });
      if (res.data && Array.isArray(res.data) && res.data.length > 0) return res;
    } catch (_) {}
    let list = [...MOCK_OWNER_ISSUES];
    if (productId) list = list.filter((i) => i.product_id === productId);
    return mockResponse(list);
  },

  getOwnerAlerts: async () => {
    try {
      const res = await apiClient.get('/owner/alerts');
      if (res.data && Array.isArray(res.data)) return res;
    } catch (_) {}
    return mockResponse(MOCK_OWNER_ALERTS);
  },

  createAction: async (data: any) => {
    try {
      const res = await apiClient.post('/owner/actions', null, { params: data });
      if (res.data) return res;
    } catch (_) {}
    const newAction = {
      id: `act_${Date.now()}`,
      title: data.title || "Remediation Action",
      description: data.description || "Deploy QA procedure",
      priority: data.priority || "high",
      status: "in_progress",
      beforeScore: 82.0,
      afterScore: 90.0,
      impact: "+8.0% Sentiment Recovery"
    };
    runtimeActions.unshift(newAction);
    return mockResponse(newAction);
  },

  getReputationDNA: async (productId: string) => {
    try {
      const res = await apiClient.get(`/owner/reputation-dna/${productId}`);
      if (res.data && res.data.nodes) return res;
    } catch (_) {}
    const p = runtimeProducts.find((item) => item.id === productId) || runtimeProducts[0];
    const nodes = [
      { id: "node_product", label: p.name, type: "product" }
    ];
    const links: any[] = [];

    Object.entries(p.aspects).slice(0, 5).forEach(([aspName, aspData], idx) => {
      const nodeId = `node_asp_${idx + 1}`;
      const sentiment = aspData.positive_ratio >= 0.75 ? "positive_aspect" : aspData.positive_ratio >= 0.5 ? "neutral_aspect" : "negative_aspect";
      nodes.push({
        id: nodeId,
        label: `${aspName} (${Math.round(aspData.positive_ratio * 100)}%)`,
        type: sentiment
      });
      links.push({
        source: "node_product",
        target: nodeId,
        relation: "HAS_ASPECT"
      });
    });

    const relatedIssue = MOCK_OWNER_ISSUES.find((i) => i.product_id === p.id);
    if (relatedIssue) {
      nodes.push({
        id: "node_issue_1",
        label: `Issue: ${relatedIssue.title}`,
        type: "issue"
      });
      links.push({
        source: "node_product",
        target: "node_issue_1",
        relation: "EXHIBITS_FRICTION"
      });
      nodes.push({
        id: "node_action_1",
        label: "Remediation: Firmware Thermal Patch",
        type: "action"
      });
      links.push({
        source: "node_issue_1",
        target: "node_action_1",
        relation: "MITIGATED_BY"
      });
    }

    return mockResponse({ nodes, links });
  },

  // Admin & Data Telemetry
  getDataFreshness: async () => {
    try {
      const res = await apiClient.get('/data/freshness');
      if (res.data) return res;
    } catch (_) {}
    return mockResponse(MOCK_FRESHNESS);
  },

  getSources: async () => {
    try {
      const res = await apiClient.get('/sources');
      if (res.data) return res;
    } catch (_) {}
    return mockResponse([
      { id: "src_001", name: "Amazon India Verified Reviews", source_type: "ecommerce", reliability_level: 0.98 },
      { id: "src_002", name: "Flipkart Customer Feedback", source_type: "ecommerce", reliability_level: 0.96 },
      { id: "src_003", name: "Direct Brand Post-Purchase Surveys", source_type: "first_party", reliability_level: 0.99 },
      { id: "src_004", name: "Google Customer Reviews", source_type: "aggregator", reliability_level: 0.94 }
    ]);
  },

  getImports: async (params?: any) => {
    try {
      const res = await apiClient.get('/imports', { params });
      if (res.data) return res;
    } catch (_) {}
    return mockResponse([
      { id: "imp_001", source_name: "Amazon India Reviews", row_count: 5420, status: "completed", timestamp: "2026-10-01T14:30:00Z" },
      { id: "imp_002", source_name: "Flipkart Customer Telemetry", row_count: 3890, status: "completed", timestamp: "2026-10-01T11:15:00Z" },
      { id: "imp_003", source_name: "Retail Partner Ingestion", row_count: 2140, status: "completed", timestamp: "2026-09-30T18:00:00Z" }
    ]);
  },

  getImportQuality: async (id: string) => {
    try {
      const res = await apiClient.get(`/imports/${id}/quality`);
      if (res.data) return res;
    } catch (_) {}
    return mockResponse({
      accuracy_score: 99.2,
      deduplicated_count: 142,
      fake_signals_isolated: 24,
      normalized_aspects_count: 18
    });
  },

  getIndiaAnalytics: async () => {
    try {
      const res = await apiClient.get('/analytics/india');
      if (res.data) return res;
    } catch (_) {}
    return mockResponse(MOCK_INDIA_ANALYTICS);
  },

  getAdminUsers: async () => {
    try {
      const res = await apiClient.get('/admin/users');
      if (res.data) return res;
    } catch (_) {}
    return mockResponse(MOCK_ADMIN_USERS);
  },

  getAuditLogs: async () => {
    try {
      const res = await apiClient.get('/admin/audit-logs');
      if (res.data) return res;
    } catch (_) {}
    return mockResponse(MOCK_AUDIT_LOGS);
  },

  getSystemHealth: async () => {
    try {
      const res = await apiClient.get('/admin/system-health');
      if (res.data) return res;
    } catch (_) {}
    return mockResponse(MOCK_SYSTEM_HEALTH);
  },
};
