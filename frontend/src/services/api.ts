import axios from 'axios';

const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || '/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
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

export const api = {
  // Auth
  login: (data: any) => apiClient.post('/auth/login', data),
  register: (data: any) => apiClient.post('/auth/register', data),
  getMe: () => apiClient.get('/auth/me'),

  // Products
  getProducts: (params?: any) => apiClient.get('/products', { params }),
  getProduct: (id: string) => apiClient.get(`/products/${id}`),
  getProductReputation: (id: string) => apiClient.get(`/products/${id}/reputation`),
  getProductTimeline: (id: string) => apiClient.get(`/products/${id}/timeline`),
  getProductAspects: (id: string) => apiClient.get(`/products/${id}/aspects`),
  getProductComplaints: (id: string) => apiClient.get(`/products/${id}/complaints`),
  compareProducts: (ids: string[]) => apiClient.get('/products/compare/side-by-side', { params: { ids: ids.join(',') } }),
  searchCatalog: (params?: any) => apiClient.get('/search', { params }),

  // Feedback & AI
  getFeedbackList: (params?: any) => apiClient.get('/feedback', { params }),
  submitFeedback: (data: any) => apiClient.post('/feedback', data),
  analyzeReview: (data: any) => apiClient.post('/ai/analyze-review', data),
  getPersonalFit: (data: any) => apiClient.post('/ai/personal-fit', data),
  chatAssistant: (data: any) => apiClient.post('/ai/chat', data),

  // Owner Operations
  getOwnerOverview: () => apiClient.get('/owner/overview'),
  getOwnerIssues: (productId?: string) => apiClient.get('/owner/issues', { params: { product_id: productId } }),
  getOwnerAlerts: () => apiClient.get('/owner/alerts'),
  createAction: (data: any) => apiClient.post('/owner/actions', null, { params: data }),
  getReputationDNA: (productId: string) => apiClient.get(`/owner/reputation-dna/${productId}`),

  // Admin & Data Ingestion Health
  getDataFreshness: () => apiClient.get('/data/freshness'),
  getSources: () => apiClient.get('/sources'),
  getImports: (params?: any) => apiClient.get('/imports', { params }),
  getImportQuality: (id: string) => apiClient.get(`/imports/${id}/quality`),
  getIndiaAnalytics: () => apiClient.get('/analytics/india'),
  getAdminUsers: () => apiClient.get('/admin/users'),
  getAuditLogs: () => apiClient.get('/admin/audit-logs'),
  getSystemHealth: () => apiClient.get('/admin/system-health'),
};
