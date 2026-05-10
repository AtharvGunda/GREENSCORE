import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Leaf, ShieldCheck, Zap, Mail, MapPin, Phone, TrendingDown, Building2, BadgePercent, TreePine, CheckCircle } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.12, ease: 'easeOut' as const } })
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const trustItems = [
  'GHG Protocol', 'SEBI BRSR', 'ISO 14064', 'CDP Certified',
  'TCFD Aligned', 'SBTi Verified', 'GRI Standards', 'UNFCCC',
  'GHG Protocol', 'SEBI BRSR', 'ISO 14064', 'CDP Certified',
  'TCFD Aligned', 'SBTi Verified', 'GRI Standards', 'UNFCCC',
];

const stats = [
  // { value: '2,400+', label: 'SMEs Scored',            icon: Building2 },
  // { value: '₹180Cr', label: 'Green Loans Unlocked',   icon: BadgePercent },
  // { value: '34%',    label: 'Avg. Rate Reduction',    icon: TrendingDown },
  // { value: '12K',    label: 'Tonnes CO₂e Tracked',    icon: TreePine },
];

const steps = [
  { n: '01', Icon: Zap,         title: 'Data Input',       desc: 'Connect utility bills — electricity, fuel, water — via API or manual entry. Values normalised per ₹ crore of revenue.' },
  { n: '02', Icon: ShieldCheck, title: 'AI Verification',  desc: 'Our engine cross-references India-specific GHG emission factors (CEA, MNRE, CPCB) automatically.' },
  { n: '03', Icon: Leaf,        title: 'GreenScore Issued', desc: 'Receive a certified 0–100 score aligned with SEBI BRSR & GHG Protocol — instantly bankable.' },
];

const features = [
  { title: 'Transparent', desc: 'Open scoring formula built on globally recognised GHG Protocol standards.' },
  { title: 'Instant',     desc: 'Real-time score computation the moment you submit your utility data.' },
  { title: 'Bankable',    desc: 'Directly integrated with partner bank lending platforms across India.' },
];

const Home = () => (
  <div className="flex flex-col w-full overflow-hidden">

    {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ HERO ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
    <section className="relative min-h-[100vh] flex flex-col justify-center items-center text-center px-4 overflow-hidden">
      {/* BG blobs */}
      <div className="absolute top-[8%] left-[8%]  w-[600px] h-[600px] rounded-full blob-slow    opacity-100 pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(90,158,90,0.14) 0%, transparent 70%)' }} />
      <div className="absolute bottom-[5%] right-[4%] w-[420px] h-[420px] rounded-full blob-medium  opacity-100 pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(61,122,61,0.10) 0%, transparent 70%)' }} />
      <div className="absolute top-[55%] left-[45%] w-[280px] h-[280px] rounded-full blob-pulse   opacity-100 pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(123,196,123,0.08) 0%, transparent 70%)' }} />

      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
           style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-5xl space-y-7 relative z-10">

        {/* Badge */}
        <motion.div custom={0} variants={fadeUp} className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-sm font-medium"
          style={{ background: 'rgba(90,158,90,0.12)', border: '1px solid rgba(90,158,90,0.3)', color: '#7bc47b' }}>
          <span className="w-2 h-2 rounded-full bg-[#7bc47b] blob-pulse" />
          Live richer by living greener
        </motion.div>

        {/* Headline */}
        <motion.h1 custom={1} variants={fadeUp} className="font-display text-5xl md:text-7xl tracking-tight leading-[1.08] text-[#e8f0e8]">
          India's{' '}
          <span className="relative inline-block">
            <span className="text-transparent bg-clip-text"
                  style={{ backgroundImage: 'linear-gradient(135deg, #7bc47b 0%, #5a9e5a 40%, #3d7a3d 100%)' }}>
              Carbon Credit Score
            </span>
          </span>
          <br className="hidden md:block" />
          {' '}for Modern SMEs
        </motion.h1>

        {/* Sub */}
        <motion.p custom={2} variants={fadeUp} className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          Calculate your GreenScore based on BRSR metrics, earn verified ESG credentials,
          and unlock exclusive green financing at lower interest rates.
        </motion.p>

        {/* CTAs */}
        <motion.div custom={3} variants={fadeUp} className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
          <Link to="/register"
            className="group btn-primary flex items-center justify-center gap-2 px-8 py-4 text-base">
            Check Your GreenScore
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link to="/login"
            className="btn-glass flex items-center justify-center px-8 py-4 text-base">
            Enterprise Login
          </Link>
        </motion.div>

        {/* Trust line */}
        <motion.p custom={4} variants={fadeUp} className="text-xs font-mono-code" style={{ color: 'var(--text-dim)' }}>
          Verified against{' '}
          <a href="https://ghgprotocol.org/" target="_blank" rel="noreferrer"
             className="text-[#5a9e5a] hover:text-[#7bc47b] underline underline-offset-4 transition-colors font-semibold">
            GHG Protocol Standard
          </a>{' & '}
          <a href="#" className="text-[#5a9e5a] hover:text-[#7bc47b] underline underline-offset-4 transition-colors font-semibold">SEBI BRSR</a>
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
        <span className="text-[10px] font-mono-code tracking-widest uppercase" style={{ color: 'var(--text-dim)' }}>scroll</span>
        <div className="w-5 h-9 rounded-full flex items-start justify-center pt-1.5"
             style={{ border: '1px solid rgba(90,158,90,0.25)' }}>
          <div className="w-1 h-2.5 rounded-full bg-[#5a9e5a] scroll-dot" />
        </div>
      </motion.div>
    </section>

    {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ TRUST MARQUEE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
    <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}
         className="py-5 overflow-hidden">
      <div className="marquee-track">
        {trustItems.map((t, i) => (
          <span key={i} className="mx-10 text-xs font-mono-code font-semibold uppercase tracking-[0.2em] whitespace-nowrap select-none"
                style={{ color: 'var(--text-dim)' }}>
            {t}
          </span>
        ))}
      </div>
    </div>

    {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ STATS STRIP ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
    <section className="py-20 px-6 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(26,46,26,0.9) 0%, rgba(13,31,15,0.95) 100%)' }}>
      <div className="absolute inset-0 pointer-events-none"
           style={{ background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(90,158,90,0.08) 0%, transparent 70%)' }} />
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={stagger}
        className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 relative z-10">
        {stats.map((s, i) => (
          <motion.div key={i} custom={i} variants={fadeUp} className="text-center group">
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center transition-all"
                 style={{ background: 'rgba(90,158,90,0.12)', border: '1px solid rgba(90,158,90,0.2)' }}>
              <s.icon className="w-5 h-5 text-[#5a9e5a]" />
            </div>
            <div className="font-display text-4xl mb-1" style={{ color: 'var(--text-primary)' }}>{s.value}</div>
            <div className="text-sm" style={{ color: 'var(--text-muted)' }}>{s.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>

    {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ HOW IT WORKS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
    <section className="py-32 px-6 relative">
      <div className="absolute top-[40%] right-[5%] w-[500px] h-[500px] rounded-full blob-slow pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(90,158,90,0.07) 0%, transparent 70%)' }} />
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger}
        className="max-w-6xl mx-auto relative z-10">

        <motion.div custom={0} variants={fadeUp} className="text-center mb-20">
          <p className="text-xs font-mono-code font-semibold uppercase tracking-[0.25em] text-[#5a9e5a] mb-4">How it works</p>
          <h2 className="font-display text-4xl md:text-5xl mb-4" style={{ color: 'var(--text-primary)' }}>
            From Raw Data to{' '}
            <span className="text-transparent bg-clip-text"
                  style={{ backgroundImage: 'linear-gradient(135deg, #7bc47b, #5a9e5a)' }}>
              Bankable Score
            </span>
          </h2>
          <p className="text-lg" style={{ color: 'var(--text-muted)' }}>Three simple steps. One powerful outcome.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <motion.div key={i} custom={i + 1} variants={fadeUp}
              className="glass card-hover p-8 relative overflow-hidden group"
              style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)' }}>
              {/* Inner glow on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                   style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(90,158,90,0.08) 0%, transparent 70%)' }} />
              {/* Step number */}
              <span className="absolute top-4 right-5 font-mono-code text-6xl font-bold select-none pointer-events-none"
                    style={{ color: 'rgba(90,158,90,0.06)' }}>{s.n}</span>
              {/* Icon with glow ring */}
              <div className="relative w-14 h-14 mb-6">
                <div className="absolute inset-0 rounded-full opacity-40 group-hover:opacity-70 transition-opacity"
                     style={{ background: 'rgba(90,158,90,0.2)', filter: 'blur(8px)' }} />
                <div className="relative w-14 h-14 rounded-xl flex items-center justify-center"
                     style={{ background: 'rgba(90,158,90,0.12)', border: '1px solid rgba(90,158,90,0.25)' }}>
                  <s.Icon className="w-6 h-6 text-[#7bc47b]" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{s.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>

    {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ABOUT ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
    <section className="py-32 px-6 relative overflow-hidden" style={{ background: 'rgba(26,46,26,0.4)' }}>
      <div className="absolute bottom-0 left-[10%] w-[500px] h-[500px] rounded-full blob-medium pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(90,158,90,0.07) 0%, transparent 70%)' }} />
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
        className="max-w-4xl mx-auto text-center relative z-10">

        <motion.p custom={0} variants={fadeUp} className="text-xs font-mono-code font-semibold uppercase tracking-[0.25em] text-[#5a9e5a] mb-4">Our mission</motion.p>
        <motion.h2 custom={1} variants={fadeUp} className="font-display text-4xl md:text-5xl mb-10" style={{ color: 'var(--text-primary)' }}>
          About <span className="text-transparent bg-clip-text"
                       style={{ backgroundImage: 'linear-gradient(135deg, #7bc47b, #5a9e5a)' }}>GreenScore</span>
        </motion.h2>
        <motion.div custom={2} variants={fadeUp} className="space-y-5 text-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          <p>
            We believe sustainability shouldn't be just a compliance metric — it should be a{' '}
            <span style={{ color: 'var(--text-primary)' }} className="font-semibold">financial asset</span>.
            GreenScore bridges the gap between environmentally conscious SMEs and modern banking
            institutions deploying green capital.
          </p>
          <p>
            By translating complex carbon emissions data into a standardised, easy-to-understand credit score,
            we are <span style={{ color: 'var(--text-primary)' }} className="font-semibold">democratising access</span> to lower interest
            rates and empowering businesses to fund their sustainable transitions.
          </p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
          className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div key={i} custom={i} variants={fadeUp}
              className="glass card-hover p-6 text-left"
              style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.25)' }}>
              <CheckCircle className="w-5 h-5 text-[#5a9e5a] mb-3" />
              <h4 className="font-semibold text-base mb-2" style={{ color: 'var(--text-primary)' }}>{f.title}</h4>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>

    <div className="section-divider" />

    {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ CONTACT ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute top-[20%] right-[8%] w-[400px] h-[400px] rounded-full blob-slow pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(61,122,61,0.07) 0%, transparent 70%)' }} />
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">

        <motion.div custom={0} variants={fadeUp}>
          <p className="text-xs font-mono-code font-semibold uppercase tracking-[0.25em] text-[#5a9e5a] mb-4">Get in touch</p>
          <h2 className="font-display text-3xl mb-5" style={{ color: 'var(--text-primary)' }}>
            Ready to finance your sustainable future?
          </h2>
          <p className="mb-8 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            Get in touch with our enterprise team to learn how your supply chain
            can benefit from GreenScore adoption.
          </p>
          <div className="space-y-4">
            {[
              { Icon: Mail,   text: 'enterprise@greenscore.in' },
              { Icon: Phone,  text: '+91 800 123 4567' },
              { Icon: MapPin, text: '123 Green Tech Park, Bengaluru, India' },
            ].map(({ Icon, text }, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all"
                     style={{ background: 'rgba(90,158,90,0.1)', border: '1px solid rgba(90,158,90,0.2)' }}>
                  <Icon className="w-4 h-4 text-[#5a9e5a]" />
                </div>
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div custom={1} variants={fadeUp}
          className="glass p-8 rounded-2xl"
          style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.07)' }}>
          <form className="space-y-4 text-sm" onSubmit={e => e.preventDefault()}>
            {[
              { label: 'Work Email',    type: 'email',  placeholder: 'jane@company.com' },
              { label: 'Company Name',  type: 'text',   placeholder: 'Acme Corp' },
            ].map(({ label, type, placeholder }) => (
              <div key={label}>
                <label className="block font-semibold mb-1.5 text-xs uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{label}</label>
                <input type={type} placeholder={placeholder} className="input-dark" />
              </div>
            ))}
            <div>
              <label className="block font-semibold mb-1.5 text-xs uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Message</label>
              <textarea rows={4} placeholder="How can we help?" className="input-dark resize-none" />
            </div>
            <button type="submit" className="btn-primary w-full py-3.5 mt-1 text-sm">
              Send Message
            </button>
          </form>
        </motion.div>
      </motion.div>

      <div className="max-w-6xl mx-auto mt-20 pt-7 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono-code"
           style={{ borderTop: '1px solid rgba(255,255,255,0.06)', color: 'var(--text-dim)' }}>
        <p>© 2026 GreenScore Technologies. All rights reserved.</p>
        <div className="flex gap-6">
          {['Privacy Policy', 'Terms of Service'].map(t => (
            <a key={t} href="#" className="hover:text-[#5a9e5a] transition-colors">{t}</a>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Home;
