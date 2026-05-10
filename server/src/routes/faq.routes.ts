import { Router, Request, Response } from 'express';
import { env } from '../config/env';

const router = Router();

const GROQ_API_KEY = env.GROQ_API_KEY;
const GROQ_MODEL   = 'llama-3.3-70b-versatile';

const SYSTEM_PROMPT = `You are GreenBot, an expert FAQ assistant for the GreenScore platform — India's carbon credit scoring system for SMEs.

Your ONLY role is to answer questions related to:
- Carbon scoring methodology (GreenScore 0–100 scale)
- GHG Protocol (Scope 1, 2, 3 emissions)
- SEBI BRSR (Business Responsibility and Sustainability Reporting)
- ESG metrics and frameworks (ISO 14064, CDP, TCFD, SBTi, GRI)
- India-specific emission factors (CEA, MNRE, CPCB)
- Green financing and loans tied to sustainability scores
- Water, waste, energy, renewables, and governance pillars
- Carbon credits, carbon markets, and offsets
- Sustainability best practices for Indian SMEs

If a question is NOT related to the above topics, politely say:
"I'm specialised in carbon scoring and ESG topics. For other questions, please contact our support team."

Keep answers concise (under 150 words), factual, and friendly. Use bullet points where helpful.`;

router.post('/chat', async (req: Request, res: Response) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      res.status(400).json({ error: 'messages array is required' });
      return;
    }

    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
        max_tokens: 300,
        temperature: 0.4,
      }),
    });

    if (!groqRes.ok) {
      const errText = await groqRes.text();
      console.error('Groq API error:', groqRes.status, errText);
      res.status(502).json({ error: 'Upstream AI error', detail: errText });
      return;
    }

    const data = await groqRes.json();
    const reply = data.choices?.[0]?.message?.content?.trim() ?? '';

    if (!reply) {
      res.status(500).json({ error: 'Empty response from AI' });
      return;
    }

    res.json({ reply });
  } catch (err: any) {
    console.error('FAQ route error:', err);
    res.status(500).json({ error: 'Internal server error', detail: err.message });
  }
});

export default router;
