import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle, Zap, Droplets, Trash2, Sun, ClipboardCheck } from 'lucide-react';
import api from '../services/api';

const schema = z.object({
  financial_year: z.string().min(1, 'Required'),
  electricity_mwh_per_cr: z.coerce.number().catch(0).default(0),
  diesel_litres_per_cr: z.coerce.number().catch(0).default(0),
  lpg_kg_per_cr: z.coerce.number().catch(0).default(0),
  petrol_litres_per_cr: z.coerce.number().catch(0).default(0),
  purchased_steam_gj_per_cr: z.coerce.number().catch(0).default(0),
  business_travel_km_per_cr: z.coerce.number().catch(0).default(0),
  water_withdrawal_kl_per_cr: z.coerce.number().catch(0).default(0),
  water_recycled_pct: z.coerce.number().min(0).max(100).catch(0).default(0),
  wastewater_treated_pct: z.coerce.number().min(0).max(100).catch(0).default(0),
  waste_generated_t_per_cr: z.coerce.number().catch(0).default(0),
  hazardous_waste_pct: z.coerce.number().min(0).max(100).catch(0).default(0),
  waste_recycled_pct: z.coerce.number().min(0).max(100).catch(0).default(0),
  renewable_energy_pct: z.coerce.number().min(0).max(100).catch(0).default(0),
  green_capex_per_cr: z.coerce.number().catch(0).default(0),
  has_env_policy: z.boolean().default(false),
  has_reduction_targets: z.boolean().default(false),
  third_party_verified: z.boolean().default(false),
});

type FormData = z.infer<typeof schema>;

const STEPS = [
  { id: 1, label: 'Profile',    icon: ClipboardCheck },
  { id: 2, label: 'Energy',     icon: Zap },
  { id: 3, label: 'Water',      icon: Droplets },
  { id: 4, label: 'Waste',      icon: Trash2 },
  { id: 5, label: 'Governance', icon: Sun },
];

const inputClass = "input-dark";
const labelClass = "block text-xs font-semibold uppercase tracking-wider mb-1.5";

const CarbonInput = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema) as any,
    defaultValues: { financial_year: '2024-25' }
  });

  const onSubmit = async (data: any) => {
    // Safety check: Don't allow submission if not on the last step
    if (step < 5) {
      nextStep();
      return;
    }

    try {
      await api.post('/carbon/submit', data);
      navigate('/dashboard');
    } catch (error) {
      console.error('Submit failed', error);
      alert('Failed to submit emissions data.');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (step < 5) {
        e.preventDefault();
        nextStep();
      }
    }
  };

  const nextStep = () => setStep(p => p + 1);
  const prevStep = () => setStep(p => p - 1);

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-10 relative overflow-hidden">
      {/* BG blobs */}
      <div className="absolute top-[5%] right-[8%] w-[500px] h-[500px] rounded-full blob-slow pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(90,158,90,0.09) 0%, transparent 70%)' }} />
      <div className="absolute bottom-[5%] left-[5%] w-[350px] h-[350px] rounded-full blob-medium pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(61,122,61,0.07) 0%, transparent 70%)' }} />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-2xl relative z-10"
      >
        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-mono-code font-semibold uppercase tracking-[0.2em] text-[#5a9e5a] mb-2">BRSR Data Entry</p>
          <h1 className="font-display text-4xl" style={{ color: 'var(--text-primary)' }}>Calculate Your GreenScore</h1>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-8 px-1">
          {STEPS.map((s, i) => {
            const isCompleted = step > s.id;
            const isActive = step === s.id;
            const Icon = s.icon;
            return (
              <React.Fragment key={s.id}>
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300"
                       style={{
                         background: isCompleted ? 'rgba(90,158,90,0.25)' : isActive ? 'rgba(90,158,90,0.15)' : 'rgba(255,255,255,0.04)',
                         border: `1px solid ${isCompleted || isActive ? 'rgba(90,158,90,0.5)' : 'rgba(255,255,255,0.08)'}`,
                         boxShadow: isActive ? '0 0 16px rgba(90,158,90,0.3)' : 'none',
                       }}>
                    {isCompleted
                      ? <CheckCircle className="w-4 h-4 text-[#7bc47b]" />
                      : <Icon className="w-4 h-4" style={{ color: isActive ? '#7bc47b' : 'var(--text-dim)' }} />
                    }
                  </div>
                  <span className="text-[10px] font-mono-code font-semibold"
                        style={{ color: isActive ? '#7bc47b' : isCompleted ? '#5a9e5a' : 'var(--text-dim)' }}>
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="flex-1 h-px mx-2 transition-all duration-500"
                       style={{ background: step > s.id ? 'rgba(90,158,90,0.4)' : 'rgba(255,255,255,0.07)' }} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Card */}
        <div className="glass p-8 rounded-2xl"
             style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)' }}>
          <form onSubmit={handleSubmit(onSubmit)} onKeyDown={handleKeyDown}>
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-5">
                  <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Financial Year</h3>
                  <div>
                    <label className={labelClass} style={{ color: 'var(--text-muted)' }}>Financial Year</label>
                    <select {...register('financial_year')} className={inputClass}>
                      <option value="2024-25">2024-25</option>
                      <option value="2023-24">2023-24</option>
                    </select>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-5">
                  <div>
                    <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Energy & Emissions</h3>
                    <p className="text-xs font-mono-code mb-5" style={{ color: 'var(--text-dim)' }}>Scope 1 & 2 — values per ₹ crore revenue</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'Electricity (MWh/₹cr)', key: 'electricity_mwh_per_cr' },
                      { label: 'Diesel (Litres/₹cr)',   key: 'diesel_litres_per_cr' },
                      { label: 'Petrol (Litres/₹cr)',   key: 'petrol_litres_per_cr' },
                      { label: 'LPG (kg/₹cr)',          key: 'lpg_kg_per_cr' },
                      { label: 'Steam (GJ/₹cr)',        key: 'purchased_steam_gj_per_cr' },
                      { label: 'Travel (km/₹cr)',       key: 'business_travel_km_per_cr' },
                    ].map(({ label, key }) => (
                      <div key={key}>
                        <label className={labelClass} style={{ color: 'var(--text-muted)' }}>{label}</label>
                        <input type="number" step="any" {...register(key as any, { valueAsNumber: true })} className={inputClass} />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-5">
                  <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Water Management</h3>
                  {[
                    { label: 'Water Withdrawal (KL/₹cr)', key: 'water_withdrawal_kl_per_cr' },
                    { label: '% Water Recycled',          key: 'water_recycled_pct' },
                    { label: '% Wastewater Treated',      key: 'wastewater_treated_pct' },
                  ].map(({ label, key }) => (
                    <div key={key}>
                      <label className={labelClass} style={{ color: 'var(--text-muted)' }}>{label}</label>
                      <input type="number" step="any" {...register(key as any, { valueAsNumber: true })} className={inputClass} />
                    </div>
                  ))}
                </motion.div>
              )}

              {step === 4 && (
                <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-5">
                  <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Waste Management</h3>
                  {[
                    { label: 'Waste Generated (Tonnes/₹cr)', key: 'waste_generated_t_per_cr' },
                    { label: '% Hazardous Waste',            key: 'hazardous_waste_pct' },
                    { label: '% Waste Recycled',             key: 'waste_recycled_pct' },
                  ].map(({ label, key }) => (
                    <div key={key}>
                      <label className={labelClass} style={{ color: 'var(--text-muted)' }}>{label}</label>
                      <input type="number" step="any" {...register(key as any, { valueAsNumber: true })} className={inputClass} />
                    </div>
                  ))}
                </motion.div>
              )}

              {step === 5 && (
                <motion.div key="s5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-5">
                  <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Renewables & Governance</h3>
                  <div>
                    <label className={labelClass} style={{ color: 'var(--text-muted)' }}>Renewable Energy Share (%)</label>
                    <input type="number" step="any" {...register('renewable_energy_pct', { valueAsNumber: true })} className={inputClass} />
                  </div>
                  <div className="mt-6 space-y-3">
                    {[
                      { key: 'has_env_policy',        label: 'We have a documented Environmental Policy' },
                      { key: 'has_reduction_targets', label: 'We have set GHG reduction targets' },
                      { key: 'third_party_verified',  label: 'Our data is third-party verified' },
                    ].map(({ key, label }) => (
                      <label key={key} className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative">
                          <input type="checkbox" {...register(key as any)}
                                 className="peer w-4 h-4 rounded opacity-0 absolute" />
                          <div className="w-5 h-5 rounded border flex items-center justify-center transition-all peer-checked:bg-[#5a9e5a] peer-checked:border-[#5a9e5a]"
                               style={{ border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.04)' }}>
                            <CheckCircle className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                          </div>
                        </div>
                        <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{label}</span>
                      </label>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="mt-8 flex justify-between items-center">
              {step > 1 ? (
                <button type="button" onClick={prevStep}
                        className="btn-glass px-5 py-2.5 text-sm">
                  ← Back
                </button>
              ) : <div />}

              {step < 5 ? (
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  type="button" onClick={nextStep} className="btn-primary px-6 py-2.5 text-sm">
                  Next Step →
                </motion.button>
              ) : (
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  type="submit" className="btn-primary px-6 py-2.5 text-sm">
                  Calculate My GreenScore ✓
                </motion.button>
              )}
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default CarbonInput;
