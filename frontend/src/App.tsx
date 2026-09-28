import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DemoBadge } from './components/DemoBadge';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

import { CustomerHome } from './pages/CustomerHome';
import { ProductSearch } from './pages/ProductSearch';
import { ProductTrustExplorer } from './pages/ProductTrustExplorer';
import { ProductComparison } from './pages/ProductComparison';
import { PersonalFitFinder } from './pages/PersonalFitFinder';
import { AIAssistant } from './pages/AIAssistant';

import { OwnerOverview } from './pages/OwnerOverview';
import { OwnerReputationCommand } from './pages/OwnerReputationCommand';
import { OwnerDNAGraph } from './pages/OwnerDNAGraph';
import { OwnerActions } from './pages/OwnerActions';

import { AdminDashboard } from './pages/AdminDashboard';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

export function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-[#f4f7f6] text-slate-800 flex flex-col justify-between selection:bg-[#007a6e] selection:text-white">
          <div>
            <DemoBadge />
            <Navbar />
            <main>
              <Routes>
                {/* Customer Routes */}
                <Route path="/" element={<CustomerHome />} />
                <Route path="/search" element={<ProductSearch />} />
                <Route path="/product/:id" element={<ProductTrustExplorer />} />
                <Route path="/compare" element={<ProductComparison />} />
                <Route path="/fit-finder" element={<PersonalFitFinder />} />
                <Route path="/assistant" element={<AIAssistant />} />

                {/* Owner Routes */}
                <Route path="/owner/overview" element={<OwnerOverview />} />
                <Route path="/owner/command" element={<OwnerReputationCommand />} />
                <Route path="/owner/dna" element={<OwnerDNAGraph />} />
                <Route path="/owner/actions" element={<OwnerActions />} />

                {/* Admin & Auth Routes */}
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </main>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
