import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'motion/react';
import { setCredentials } from '../store/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import api from '../services/api';

const SECTORS = ['Manufacturing', 'Textile & Apparel', 'Food Processing', 'Auto Parts', 'Logistics'];

const Register = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', sector: 'Manufacturing', annual_revenue_cr: ''
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = { ...formData, annual_revenue_cr: Number(formData.annual_revenue_cr) };
      const { data } = await api.post('/auth/register', payload);
      dispatch(setCredentials({ user: data.user, token: data.token }));
      navigate('/dashboard');
    } catch (err) {
      alert('Registration failed.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fields = [
    { label: 'Company Name',           name: 'name',              type: 'text',   placeholder: 'Acme Industries Pvt Ltd' },
    { label: 'Annual Revenue (₹ Cr)',  name: 'annual_revenue_cr', type: 'number', placeholder: '50' },
    { label: 'Email',                  name: 'email',             type: 'email',  placeholder: 'admin@company.com' },
    { label: 'Password',               name: 'password',          type: 'password', placeholder: '••••••••' },
  ];

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-10 relative overflow-hidden">
      {/* BG blobs */}
      <div className="absolute top-[5%] right-[10%] w-[450px] h-[450px] rounded-full blob-slow pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(90,158,90,0.09) 0%, transparent 70%)' }} />
      <div className="absolute bottom-[5%] left-[5%] w-[300px] h-[300px] rounded-full blob-medium pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(61,122,61,0.07) 0%, transparent 70%)' }} />

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
            Register your SME
          </h2>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Get your GreenScore in 5 minutes</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Sector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-muted)' }}>
              Sector
            </label>
            <select name="sector" onChange={handleChange} className="input-dark">
              {SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* Dynamic fields */}
          {fields.map(({ label, name, type, placeholder }) => (
            <div key={name}>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-muted)' }}>
                {label}
              </label>
              <input type={type} name={name} placeholder={placeholder}
                     step={type === 'number' ? 'any' : undefined}
                     onChange={handleChange} required className="input-dark" />
            </div>
          ))}

          <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
            type="submit" className="btn-primary w-full py-3.5 mt-2 text-sm">
            Create Account
          </motion.button>
        </form>

        <p className="mt-6 text-center text-sm font-mono-code" style={{ color: 'var(--text-muted)' }}>
          Already have an account?{' '}
          <Link to="/login" className="text-[#5a9e5a] hover:text-[#7bc47b] font-semibold transition-colors">
            Log in
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
