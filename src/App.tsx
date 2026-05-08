import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { BottomNav } from './components/layout/BottomNav';
import { TopHeader } from './components/layout/TopHeader';
import { AnimatePresence, motion } from 'motion/react';

// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home'));
const Auth = lazy(() => import('./pages/Auth'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Analytics = lazy(() => import('./pages/Analytics'));
const Marketplace = lazy(() => import('./pages/Marketplace'));
const Calculator = lazy(() => import('./pages/Calculator'));
const Reports = lazy(() => import('./pages/Reports'));
const Admin = lazy(() => import('./pages/Admin'));

function AppContent() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/auth';
  const isLandingPage = location.pathname === '/';
  
  // Dashboard routes that require navigation layout
  const isDashboardLayout = !isAuthPage && !isLandingPage;

  return (
    <div className="flex min-h-screen bg-background text-on-background selection:bg-black selection:text-white">
      {isDashboardLayout && <Sidebar />}
      
      <div className="flex-1 flex flex-col min-w-0">
        {!isAuthPage && isDashboardLayout && <TopHeader />}
        
        <main className={isDashboardLayout ? "flex-1 p-6 lg:p-12 overflow-x-hidden" : "flex-1"}>
          <Suspense fallback={
            <div className="h-full w-full flex items-center justify-center">
              <div className="w-12 h-12 bg-black flex items-center justify-center animate-pulse">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
              </div>
            </div>
          }>
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="h-full"
              >
                <Routes location={location}>
                  <Route path="/" element={<Home />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/marketplace" element={<Marketplace />} />
                  <Route path="/calculator" element={<Calculator />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/admin" element={<Admin />} />
                </Routes>
              </motion.div>
            </AnimatePresence>
          </Suspense>
        </main>

        {isDashboardLayout && (
          <footer className="mt-auto py-12 px-12 border-t-2 border-black bg-surface-container-low">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <span className="text-[10px] font-black uppercase tracking-[0.25em] italic">© 2024 GreenScore Enterprise // Verified Secure Institutional Layer</span>
              <div className="flex gap-10 text-[10px] font-black uppercase tracking-[0.25em]">
                <a href="#" className="hover:text-primary transition-all underline decoration-2 underline-offset-4">Legal</a>
                <a href="#" className="hover:text-primary transition-all underline decoration-2 underline-offset-4">Security</a>
                <a href="#" className="hover:text-primary transition-all underline decoration-2 underline-offset-4">Compliance</a>
              </div>
            </div>
          </footer>
        )}
      </div>

      {isDashboardLayout && <BottomNav />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
