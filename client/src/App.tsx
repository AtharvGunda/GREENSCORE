import React from 'react';
import FAQWidget from './components/shared/FAQWidget';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';

import Dashboard from './pages/Dashboard';
import CarbonInput from './pages/CarbonInput';
import Marketplace from './pages/Marketplace';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ScoreReport from './pages/ScoreReport';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

import { Home as HomeIcon } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

const TopNav = () => {
  return (
    <header className="w-full fixed top-0 left-0 z-50 flex justify-center pointer-events-none pt-5 px-4">
      <motion.nav
        initial={{ opacity: 0, y: -24, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-auto flex items-center gap-1 rounded-full px-2 py-2"
        style={{
          background: 'rgba(13, 31, 15, 0.75)',
          backdropFilter: 'blur(20px) saturate(1.8)',
          WebkitBackdropFilter: 'blur(20px) saturate(1.8)',
          border: '1px solid rgba(90, 158, 90, 0.2)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04)',
        }}
      >
        {/* Home icon pill */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200 ${
              isActive
                ? 'bg-[#5a9e5a]/20 shadow-[0_0_12px_rgba(90,158,90,0.3)]'
                : 'hover:bg-white/5'
            }`
          }
        >
          <HomeIcon className="w-[17px] h-[17px] text-[#7bc47b]" strokeWidth={1.8} />
        </NavLink>

        {/* Separator */}
        <div className="w-px h-5 bg-white/10 mx-1" />

        {[
          { to: '/dashboard',   label: 'Dashboard' },
          { to: '/carbon/input', label: 'Calculator' },
          { to: '/marketplace',  label: 'Market' },
        ].map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-[#5a9e5a]/20 text-[#7bc47b] shadow-[0_0_12px_rgba(90,158,90,0.2)]'
                  : 'text-[#7a987a] hover:bg-white/5 hover:text-[#e8f0e8]'
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </motion.nav>
    </header>
  );
};

function App() {
  return (
    <Router>
      <div
        className="min-h-screen text-[#e8f0e8] flex flex-col selection:bg-[#5a9e5a] selection:text-white"
        style={{ background: 'var(--bg-primary)' }}
      >
        <TopNav />
        <main className="flex-1 pt-16 overflow-x-hidden relative z-10">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/"          element={<Home />} />
              <Route path="/login"     element={<Login />} />
              <Route path="/register"  element={<Register />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/carbon/input" element={<ProtectedRoute><CarbonInput /></ProtectedRoute>} />
              <Route path="/score/report" element={<ProtectedRoute><ScoreReport /></ProtectedRoute>} />
              <Route path="/marketplace"  element={<ProtectedRoute><Marketplace /></ProtectedRoute>} />
            </Routes>
          </AnimatePresence>
        </main>
        <FAQWidget />
      </div>
    </Router>
  );
}

export default App;
