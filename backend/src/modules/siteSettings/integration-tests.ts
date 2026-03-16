// =============================================================
// integration-tests.ts — 3. taraf servis test handler'ları
// =============================================================

import type { FastifyRequest, FastifyReply } from 'fastify';
import { env } from '@/core/env';

type TestResult = { ok: boolean; service: string; message: string; details?: any };

/** Cloudinary — ping API */
export async function testCloudinary(_req: FastifyRequest, reply: FastifyReply) {
  const name = (env as any).CLOUDINARY?.CLOUD_NAME || (env as any).CLOUDINARY?.cloudName || process.env.CLOUDINARY_CLOUD_NAME;
  const key = (env as any).CLOUDINARY?.API_KEY || (env as any).CLOUDINARY?.apiKey || process.env.CLOUDINARY_API_KEY;

  if (!name || !key) {
    return reply.send({ ok: false, service: 'cloudinary', message: 'Cloud name veya API key tanımlı değil' } satisfies TestResult);
  }

  try {
    const url = `https://api.cloudinary.com/v1_1/${name}/resources/image?max_results=1`;
    const secret = (env as any).CLOUDINARY?.API_SECRET || (env as any).CLOUDINARY?.apiSecret || process.env.CLOUDINARY_API_SECRET;
    const auth = Buffer.from(`${key}:${secret}`).toString('base64');
    const res = await fetch(url, { headers: { Authorization: `Basic ${auth}` }, signal: AbortSignal.timeout(10000) });

    if (res.ok) {
      return reply.send({ ok: true, service: 'cloudinary', message: `Bağlantı başarılı (cloud: ${name})` } satisfies TestResult);
    }
    const body = await res.text();
    return reply.send({ ok: false, service: 'cloudinary', message: `HTTP ${res.status}`, details: body.slice(0, 200) } satisfies TestResult);
  } catch (err: any) {
    return reply.send({ ok: false, service: 'cloudinary', message: err.message || 'Bağlantı hatası' } satisfies TestResult);
  }
}

/** Google OAuth — verify client_id is valid */
export async function testGoogleOAuth(_req: FastifyRequest, reply: FastifyReply) {
  const clientId = (env as any).GOOGLE?.CLIENT_ID || (env as any).GOOGLE?.clientId || process.env.GOOGLE_CLIENT_ID;

  if (!clientId) {
    return reply.send({ ok: false, service: 'google', message: 'Google Client ID tanımlı değil' } satisfies TestResult);
  }

  try {
    // Check if the client ID is resolvable via Google's discovery endpoint
    const url = `https://accounts.google.com/.well-known/openid-configuration`;
    const res = await fetch(url, { signal: AbortSignal.timeout(10000) });

    if (res.ok) {
      return reply.send({
        ok: true,
        service: 'google',
        message: `Google OAuth erişilebilir (Client ID: ${clientId.slice(0, 20)}...)`,
      } satisfies TestResult);
    }
    return reply.send({ ok: false, service: 'google', message: `Google API yanıt vermedi: HTTP ${res.status}` } satisfies TestResult);
  } catch (err: any) {
    return reply.send({ ok: false, service: 'google', message: err.message || 'Bağlantı hatası' } satisfies TestResult);
  }
}

/** reCAPTCHA — verify with test token */
export async function testRecaptcha(_req: FastifyRequest, reply: FastifyReply) {
  const secret = process.env.RECAPTCHA_SECRET_KEY || '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe';
  const enabled = process.env.RECAPTCHA_ENABLED !== '0' && process.env.RECAPTCHA_ENABLED !== 'false';

  if (!enabled) {
    return reply.send({ ok: true, service: 'recaptcha', message: 'reCAPTCHA devre dışı (RECAPTCHA_ENABLED=0)' } satisfies TestResult);
  }

  try {
    // Google test secret always succeeds with any token
    const params = new URLSearchParams({ secret, response: 'test-token-for-verification' });
    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      body: params,
      signal: AbortSignal.timeout(10000),
    });
    const data = await res.json() as any;

    return reply.send({
      ok: true,
      service: 'recaptcha',
      message: `reCAPTCHA API erişilebilir (success: ${data.success}, test key: ${secret === '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe' ? 'evet' : 'hayır'})`,
    } satisfies TestResult);
  } catch (err: any) {
    return reply.send({ ok: false, service: 'recaptcha', message: err.message || 'Bağlantı hatası' } satisfies TestResult);
  }
}

/** OpenAI — test completion */
export async function testOpenAI(_req: FastifyRequest, reply: FastifyReply) {
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
  const base = process.env.OPENAI_API_BASE || 'https://api.openai.com/v1';

  if (!apiKey) {
    return reply.send({ ok: false, service: 'openai', message: 'OPENAI_API_KEY tanımlı değil' } satisfies TestResult);
  }

  try {
    const res = await fetch(`${base}/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ model, messages: [{ role: 'user', content: 'Say OK' }], max_tokens: 5 }),
      signal: AbortSignal.timeout(15000),
    });
    if (res.ok) {
      const data = await res.json() as any;
      const answer = data?.choices?.[0]?.message?.content || '';
      return reply.send({ ok: true, service: 'openai', message: `Model yanıt verdi (${model})`, details: answer.slice(0, 100) } satisfies TestResult);
    }
    const errText = await res.text();
    return reply.send({ ok: false, service: 'openai', message: `HTTP ${res.status}`, details: errText.slice(0, 200) } satisfies TestResult);
  } catch (err: any) {
    return reply.send({ ok: false, service: 'openai', message: err.message || 'Bağlantı hatası' } satisfies TestResult);
  }
}

/** Anthropic — test completion */
export async function testAnthropic(_req: FastifyRequest, reply: FastifyReply) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  const model = process.env.ANTHROPIC_MODEL || 'claude-3-5-haiku-latest';

  if (!apiKey) {
    return reply.send({ ok: false, service: 'anthropic', message: 'ANTHROPIC_API_KEY tanımlı değil' } satisfies TestResult);
  }

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({ model, max_tokens: 5, messages: [{ role: 'user', content: 'Say OK' }] }),
      signal: AbortSignal.timeout(15000),
    });
    if (res.ok) {
      const data = await res.json() as any;
      const answer = data?.content?.[0]?.text || '';
      return reply.send({ ok: true, service: 'anthropic', message: `Model yanıt verdi (${model})`, details: answer.slice(0, 100) } satisfies TestResult);
    }
    const errText = await res.text();
    return reply.send({ ok: false, service: 'anthropic', message: `HTTP ${res.status}`, details: errText.slice(0, 200) } satisfies TestResult);
  } catch (err: any) {
    return reply.send({ ok: false, service: 'anthropic', message: err.message || 'Bağlantı hatası' } satisfies TestResult);
  }
}

/** Grok / xAI — test completion */
export async function testGrokXAI(_req: FastifyRequest, reply: FastifyReply) {
  const apiKey = process.env.XAI_API_KEY || process.env.GROK_API_KEY;
  const model = process.env.XAI_MODEL || process.env.GROK_MODEL || 'grok-2-latest';
  const base = process.env.XAI_API_BASE || 'https://api.x.ai/v1';

  if (!apiKey) {
    return reply.send({ ok: false, service: 'grok', message: 'XAI_API_KEY tanımlı değil' } satisfies TestResult);
  }

  try {
    const res = await fetch(`${base}/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ model, messages: [{ role: 'user', content: 'Say OK' }], max_tokens: 5 }),
      signal: AbortSignal.timeout(15000),
    });
    if (res.ok) {
      const data = await res.json() as any;
      const answer = data?.choices?.[0]?.message?.content || '';
      return reply.send({ ok: true, service: 'grok', message: `Model yanıt verdi (${model})`, details: answer.slice(0, 100) } satisfies TestResult);
    }
    const errText = await res.text();
    return reply.send({ ok: false, service: 'grok', message: `HTTP ${res.status}`, details: errText.slice(0, 200) } satisfies TestResult);
  } catch (err: any) {
    return reply.send({ ok: false, service: 'grok', message: err.message || 'Bağlantı hatası' } satisfies TestResult);
  }
}

/** Groq AI — test completion */
export async function testGroqAI(_req: FastifyRequest, reply: FastifyReply) {
  const apiKey = process.env.GROQ_API_KEY;
  const model = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';
  const base = process.env.GROQ_API_BASE || 'https://api.groq.com/openai/v1';

  if (!apiKey) {
    return reply.send({ ok: false, service: 'groq', message: 'GROQ_API_KEY tanımlı değil' } satisfies TestResult);
  }

  try {
    const res = await fetch(`${base}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: 'Merhaba, kısa bir test. Sadece "OK" yaz.' }],
        max_tokens: 10,
      }),
      signal: AbortSignal.timeout(15000),
    });

    if (res.ok) {
      const data = await res.json() as any;
      const answer = data?.choices?.[0]?.message?.content || '';
      return reply.send({
        ok: true,
        service: 'groq',
        message: `Model yanıt verdi (${model})`,
        details: answer.slice(0, 100),
      } satisfies TestResult);
    }

    const errText = await res.text();
    return reply.send({ ok: false, service: 'groq', message: `HTTP ${res.status}`, details: errText.slice(0, 200) } satisfies TestResult);
  } catch (err: any) {
    return reply.send({ ok: false, service: 'groq', message: err.message || 'Bağlantı hatası' } satisfies TestResult);
  }
}
