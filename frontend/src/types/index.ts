export type UserRole = 'customer' | 'owner' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  is_active: boolean;
  created_at: string;
}

export interface Brand {
  id: string;
  name: string;
  category: string;
  description?: string;
  website?: string;
  owner_id?: string;
  verification_status: string;
}

export interface Product {
  id: string;
  brand_id: string;
  name: string;
  category: string;
  model?: string;
  version: string;
  price?: number;
  description?: string;
  features?: Record<string, any>;
  image_url?: string;
  status: string;
  created_at: string;
}

export interface ReputationDimension {
  dimension: string;
  score: number;
  evidence_count: number;
  trend: 'improving' | 'declining' | 'stable';
  explanation: string;
}

export interface ReputationProfile {
  product_id: string;
  product_name: string;
  category: string;
  brand_id: string;
  trust_score: number;
  confidence: number;
  data_freshness: string;
  review_count: number;
  positive_themes: string[];
  negative_themes: string[];
  suspicious_patterns_count: number;
  dimensions: ReputationDimension[];
}

export interface Feedback {
  id: string;
  product_id: string;
  source_id: string;
  review_text: string;
  rating?: number;
  review_date: string;
  location?: string;
  product_version: string;
  verified_flag: boolean;
  quality_status: string;
}

export interface Issue {
  id: string;
  product_id: string;
  title: string;
  description?: string;
  category: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  frequency: number;
  trend: 'increasing' | 'decreasing' | 'stable';
  status: 'open' | 'investigating' | 'in_progress' | 'resolved';
  created_at: string;
}

export interface ImprovementAction {
  id: string;
  product_id: string;
  issue_id?: string;
  owner_id: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'planned' | 'in_progress' | 'completed' | 'verified';
  due_date?: string;
}
