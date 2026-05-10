import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'motion/react';
import { setCredentials } from '../store/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { Leaf, Lock, Mail } from 'lucide-react';
import api from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      const { data } = await api.post('/auth/login', { email, password });
      dispatch(setCredentials({ user: data.user, token: data.token }));
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setErrorMsg('Login failed. Please check your email and password.');
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 relative overflow-hidden">
      {/* BG blobs */}
      <div className="absolute top-[10%] left-[15%] w-[400px] h-[400px] rounded-full blob-slow pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(90,158,90,0.1) 0%, transparent 70%)' }} />
      <div className="absolute bottom-[5%] right-[10%] w-[300px] h-[300px] rounded-full blob-medium pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(61,122,61,0.08) 0%, transparent 70%)' }} />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="glass w-full max-w-md p-8 relative z-10"
        style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07)' }}
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
               style={{ background: 'rgba(90,158,90,0.15)', border: '1px solid rgba(90,158,90,0.3)', boxShadow: '0 0 20px rgba(90,158,90,0.2)' }}>
            <Leaf className="w-6 h-6 text-[#7bc47b]" />
          </div>
          <h2 className="font-display text-3xl" style={{ color: 'var(--text-primary)' }}>
            Welcome back
          </h2>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Sign in to your GreenScore account</p>
        </div>

        {errorMsg && (
          <div className="mb-5 p-3 rounded-xl text-sm text-center font-mono-code"
               style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', color: '#f87171' }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-muted)' }}>
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-dim)' }} />
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                     className="input-dark pl-10" placeholder="you@company.com" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-muted)' }}>
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-dim)' }} />
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
                     className="input-dark pl-10" placeholder="••••••••" />
            </div>
          </div>
          <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
            type="submit" className="btn-primary w-full py-3.5 mt-2 text-sm">
            Sign In
          </motion.button>
        </form>

        <p className="mt-6 text-center text-sm font-mono-code" style={{ color: 'var(--text-muted)' }}>
          Don't have an account?{' '}
          <Link to="/register" className="text-[#5a9e5a] hover:text-[#7bc47b] font-semibold transition-colors">
            Register your SME
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
