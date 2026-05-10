import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Leaf, RotateCcw, Bot } from 'lucide-react';

/* ─── Types ─────────────────────────────────────────────────── */
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  ts: Date;
}

/* ─── Constants ──────────────────────────────────────────────── */
const API_BASE = (import.meta as any).env?.VITE_API_URL || 'http://localhost:3001/api';

const SUGGESTED_QUESTIONS = [
  'How is my GreenScore calculated?',
  'What is Scope 1 vs Scope 2 emissions?',
  'How can I improve my water score?',
  'What is SEBI BRSR compliance?',
  'How do green loans work with my score?',
];

/* ─── Helpers ────────────────────────────────────────────────── */
const generateId = () => Math.random().toString(36).slice(2, 9);

async function askGroq(messages: { role: string; content: string }[]): Promise<string> {
  const res = await fetch(`${API_BASE}/faq/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error || `Server error ${res.status}`);
  }

  const data = await res.json();
  if (!data.reply) throw new Error('Empty reply from server');
  return data.reply;
}

/* ─── Component ──────────────────────────────────────────────── */
const FAQWidget: React.FC = () => {
  const [open, setOpen]         = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput]       = useState('');
  const [loading, setLoading]   = useState(false);
  const [unread, setUnread]     = useState(false);
  const [errorBanner, setErrorBanner] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  /* Welcome message on mount */
  useEffect(() => {
    setMessages([{
      id: generateId(),
      role: 'assistant',
      content: "Hi! I'm **GreenBot** 🌿 — your carbon scoring expert.\n\nAsk me anything about GreenScore calculation, GHG emissions, BRSR compliance, or green financing.",
      ts: new Date(),
    }]);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (open) {
      setUnread(false);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  const sendMessage = async (text = input.trim()) => {
    if (!text || loading) return;
    setInput('');
    setErrorBanner('');

    const userMsg: Message = { id: generateId(), role: 'user', content: text, ts: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      // Build clean history — skip the welcome assistant message for brevity
      const history = [...messages, userMsg]
        .filter(m => !(m.role === 'assistant' && m.id === messages[0]?.id))
        .map(m => ({ role: m.role, content: m.content }));

      const reply = await askGroq(history);
      const botMsg: Message = { id: generateId(), role: 'assistant', content: reply, ts: new Date() };
      setMessages(prev => [...prev, botMsg]);
      if (!open) setUnread(true);
    } catch (err: any) {
      console.error('[GreenBot]', err);
      setErrorBanner(err?.message || 'Connection failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setErrorBanner('');
    setMessages([{
      id: generateId(),
      role: 'assistant',
      content: "Conversation cleared. Ask me anything about carbon scoring or ESG! 🌿",
      ts: new Date(),
    }]);
  };

  /* Minimal inline markdown: **bold** and newlines */
  const renderContent = (text: string) =>
    text.split('\n').map((line, i, arr) => (
      <span key={i}>
        {line.split(/(\*\*[^*]+\*\*)/).map((part, j) =>
          /^\*\*.*\*\*$/.test(part)
            ? <strong key={j} style={{ color: 'var(--text-primary)' }}>{part.slice(2, -2)}</strong>
            : part
        )}
        {i < arr.length - 1 && <br />}
      </span>
    ));

  /* ─────────────────────────────────────────── */
  return (
    <>
      {/* ── Chat Panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, scale: 0.88, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as any }}
            className="fixed bottom-24 right-5 z-50 flex flex-col"
            style={{
              width: '360px',
              height: '520px',
              background: 'rgba(13, 25, 14, 0.94)',
              backdropFilter: 'blur(24px) saturate(1.8)',
              WebkitBackdropFilter: 'blur(24px) saturate(1.8)',
              border: '1px solid rgba(90,158,90,0.22)',
              borderRadius: '20px',
              boxShadow: '0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)',
            }}
          >
            {/* ── Header ── */}
            <div className="flex items-center justify-between px-5 py-4 flex-shrink-0"
                 style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                     style={{ background: 'rgba(90,158,90,0.2)', border: '1px solid rgba(90,158,90,0.35)' }}>
                  <Bot className="w-4 h-4 text-[#7bc47b]" />
                </div>
                <div>
                  <p className="text-sm font-semibold leading-tight" style={{ color: 'var(--text-primary)' }}>GreenBot</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7bc47b] blob-pulse" />
                    <span className="text-[10px] font-mono-code" style={{ color: 'var(--text-dim)' }}>
                      Carbon Expert · Online
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={reset} title="Clear chat"
                        className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:bg-white/10"
                        style={{ color: 'var(--text-dim)' }}>
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => setOpen(false)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:bg-white/10"
                        style={{ color: 'var(--text-dim)' }}>
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* ── Error banner ── */}
            <AnimatePresence>
              {errorBanner && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden flex-shrink-0"
                >
                  <div className="mx-4 mt-3 px-3 py-2 rounded-xl text-[11px] font-mono-code"
                       style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', color: '#f87171' }}>
                    ⚠ {errorBanner}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Messages ── */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0"
                 style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(90,158,90,0.2) transparent' }}>

              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'assistant' && (
                    <div className="w-6 h-6 rounded-lg flex items-center justify-center mr-2 mt-1 flex-shrink-0"
                         style={{ background: 'rgba(90,158,90,0.15)', border: '1px solid rgba(90,158,90,0.25)' }}>
                      <Leaf className="w-3 h-3 text-[#7bc47b]" />
                    </div>
                  )}
                  <div
                    className="max-w-[78%] px-3.5 py-2.5 rounded-2xl text-[12px] leading-relaxed"
                    style={msg.role === 'user' ? {
                      background: 'linear-gradient(135deg, rgba(90,158,90,0.3), rgba(90,158,90,0.18))',
                      border: '1px solid rgba(90,158,90,0.35)',
                      color: 'var(--text-primary)',
                      borderBottomRightRadius: '6px',
                    } : {
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: 'var(--text-secondary)',
                      borderBottomLeftRadius: '6px',
                    }}
                  >
                    {renderContent(msg.content)}
                  </div>
                </div>
              ))}

              {/* Loading dots */}
              {loading && (
                <div className="flex justify-start">
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center mr-2 flex-shrink-0"
                       style={{ background: 'rgba(90,158,90,0.15)', border: '1px solid rgba(90,158,90,0.25)' }}>
                    <Leaf className="w-3 h-3 text-[#7bc47b]" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl rounded-bl-md flex items-center gap-1.5"
                       style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    {[0, 1, 2].map(i => (
                      <span key={i} className="w-1.5 h-1.5 rounded-full"
                            style={{
                              background: '#5a9e5a',
                              animation: `pulse-blob 1.2s ease-in-out ${i * 0.2}s infinite`,
                            }} />
                    ))}
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* ── Suggested questions ── */}
            {messages.length === 1 && !loading && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5 flex-shrink-0">
                {SUGGESTED_QUESTIONS.map(q => (
                  <button key={q} onClick={() => sendMessage(q)}
                          className="text-[10px] px-2.5 py-1 rounded-full transition-all hover:opacity-80 font-medium"
                          style={{
                            background: 'rgba(90,158,90,0.08)',
                            border: '1px solid rgba(90,158,90,0.2)',
                            color: '#7bc47b',
                          }}>
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* ── Input ── */}
            <div className="px-4 pb-4 pt-2 flex-shrink-0">
              <div className="flex items-center gap-2 rounded-xl px-3.5 py-2.5"
                   style={{
                     background: 'rgba(255,255,255,0.05)',
                     border: '1px solid rgba(255,255,255,0.1)',
                   }}>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                  placeholder="Ask about carbon scoring…"
                  className="flex-1 bg-transparent outline-none text-xs"
                  style={{ color: 'var(--text-primary)' }}
                  disabled={loading}
                />
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || loading}
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all"
                  style={{
                    background: input.trim() && !loading ? 'rgba(90,158,90,0.3)' : 'rgba(255,255,255,0.05)',
                    border: `1px solid ${input.trim() && !loading ? 'rgba(90,158,90,0.5)' : 'rgba(255,255,255,0.08)'}`,
                    color: input.trim() && !loading ? '#7bc47b' : 'var(--text-dim)',
                    cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
                  }}
                >
                  <Send className="w-3.5 h-3.5" />
                </motion.button>
              </div>
              <p className="text-[9px] text-center mt-2 font-mono-code" style={{ color: 'var(--text-dim)' }}>
                Powered by Groq · Carbon &amp; ESG topics only
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FAB Button ── */}
      <motion.button
        onClick={() => setOpen(v => !v)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-2xl flex items-center justify-center"
        style={{
          background: open
            ? 'rgba(13,25,14,0.9)'
            : 'linear-gradient(135deg, #5a9e5a 0%, #3d7a3d 100%)',
          border: '1px solid rgba(90,158,90,0.4)',
          boxShadow: open
            ? '0 4px 20px rgba(0,0,0,0.4)'
            : '0 8px 32px rgba(90,158,90,0.35), 0 4px 12px rgba(0,0,0,0.4)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
        aria-label="Open GreenBot FAQ"
      >
        <AnimatePresence mode="wait">
          {open
            ? <motion.div key="close"
                initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X className="w-6 h-6 text-[#7bc47b]" />
              </motion.div>
            : <motion.div key="open"
                initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <MessageCircle className="w-6 h-6 text-white" />
              </motion.div>
          }
        </AnimatePresence>

        {/* Unread dot */}
        {unread && !open && (
          <motion.span
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
            style={{ background: '#ef4444' }}>
            1
          </motion.span>
        )}
      </motion.button>
    </>
  );
};

export default FAQWidget;
