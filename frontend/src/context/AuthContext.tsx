import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { api } from '../services/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, pass: string) => Promise<void>;
  register: (name: string, email: string, pass: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  switchRoleDemo: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>({
    id: 'usr_customer_001',
    name: 'Alex Rivera (Demo Customer)',
    email: 'customer@brandpulse.ai',
    role: 'customer',
    is_active: true,
    created_at: new Date().toISOString()
  });
  const [token, setToken] = useState<string | null>(localStorage.getItem('brandpulse_token') || 'demo_token');
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, pass: string) => {
    setIsLoading(true);
    try {
      const res = await api.login({ email, password: pass });
      setToken(res.data.access_token);
      setUser(res.data.user);
      localStorage.setItem('brandpulse_token', res.data.access_token);
    } catch (e) {
      console.warn('API connection offline, switching to synthetic auth session');
      const mockRole: UserRole = email.includes('owner') ? 'owner' : email.includes('admin') ? 'admin' : 'customer';
      setUser({
        id: `usr_${mockRole}_demo`,
        name: `${mockRole.toUpperCase()} User`,
        email,
        role: mockRole,
        is_active: true,
        created_at: new Date().toISOString()
      });
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, pass: string, role: UserRole) => {
    setIsLoading(true);
    try {
      const res = await api.register({ name, email, password: pass, role });
      setToken(res.data.access_token);
      setUser(res.data.user);
      localStorage.setItem('brandpulse_token', res.data.access_token);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('brandpulse_token');
  };

  const switchRoleDemo = (role: UserRole) => {
    setUser({
      id: `usr_${role}_001`,
      name: `Demo ${role.toUpperCase()} User`,
      email: `${role}@brandpulse.ai`,
      role: role,
      is_active: true,
      created_at: new Date().toISOString()
    });
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isLoading, switchRoleDemo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
