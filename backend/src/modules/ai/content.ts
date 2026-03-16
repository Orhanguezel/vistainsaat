// =============================================================
// AI Content Generation — Groq/OpenAI compatible
// =============================================================

import type { FastifyRequest, FastifyReply } from 'fastify';
import { env } from '@/core/env';

type ContentRequest = {
  title?: string;
  summary?: string;
  content?: string;
  tags?: string;
  locale: string;
  target_locales?: string[];
  module_key?: string;
  action: 'enhance' | 'translate' | 'generate_meta' | 'full';
};

type LocaleContent = {
  locale: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  meta_title: string;
  meta_description: string;
  tags: string;
};

async function callAI(systemPrompt: string, userPrompt: string): Promise<string> {
  const apiKey = env.GROQ_API_KEY || process.env.GROQ_API_KEY;
  const model = env.GROQ_MODEL || process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';
  const base = env.GROQ_API_BASE || process.env.GROQ_API_BASE || 'https://api.groq.com/openai/v1';

  if (!apiKey) throw new Error('AI API key tanımlı değil');

  const res = await fetch(`${base}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      max_tokens: 4000,
      temperature: 0.7,
    }),
    signal: AbortSignal.timeout(30000),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`AI API error: ${res.status} — ${err.slice(0, 200)}`);
  }

  const data = await res.json() as any;
  return data?.choices?.[0]?.message?.content || '';
}

function extractJSON(text: string): any {
  // Try direct parse first
  try { return JSON.parse(text); } catch {}

  // Extract JSON from markdown code blocks
  const match = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (match) {
    try { return JSON.parse(match[1].trim()); } catch {}
  }

  // Try to find JSON object/array in text
  const jsonMatch = text.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
  if (jsonMatch) {
    try { return JSON.parse(jsonMatch[1]); } catch {}
  }

  throw new Error('AI yanıtından JSON çıkarılamadı');
}

const SYSTEM_PROMPT = `Sen Vista İnşaat firması için profesyonel içerik yazarısın.
Vista İnşaat, Antalya merkezli konut, ticari ve endüstriyel projelerde uzmanlaşmış bir inşaat ve mimarlık firmasıdır.

Kurallar:
- Profesyonel, güvenilir ve teknik bir ton kullan
- İnşaat sektörüne uygun terminoloji kullan
- SEO dostu içerik üret (anahtar kelime yoğunluğu doğal olsun)
- HTML formatında içerik üret (<p>, <h2>, <h3>, <ul>, <li>, <strong> tagları kullan)
- Başlıklar kısa ve etkileyici olsun
- Meta description 155 karakter sınırında olsun
- Slug Türkçe karaktersiz, küçük harf, tire ile ayrılmış olsun
- Tags virgülle ayrılmış olsun
- Yanıtı SADECE JSON olarak dön, açıklama ekleme`;

export async function aiContentAssist(req: FastifyRequest, reply: FastifyReply) {
  const body = req.body as ContentRequest;

  if (!body?.action) {
    return reply.code(400).send({ error: { message: 'action alanı gerekli' } });
  }

  const locales = body.target_locales?.length ? body.target_locales : [body.locale || 'tr'];

  try {
    let userPrompt = '';

    if (body.action === 'full') {
      // Tam içerik oluştur + çevir
      userPrompt = `Mevcut bilgiler:
- Başlık: ${body.title || '(boş)'}
- Özet: ${body.summary || '(boş)'}
- İçerik: ${body.content ? body.content.slice(0, 500) : '(boş)'}
- Etiketler: ${body.tags || '(boş)'}
- Modül: ${body.module_key || 'blog'}

Görev: Bu bilgileri kullanarak her dil için eksiksiz bir içerik hazırla.
- Başlık boşsa, özet veya içerikten anlamlı bir başlık üret
- İçerik boş veya kısaysa, başlık ve özetten en az 3 paragraf HTML içerik üret
- Özet boşsa, içerikten 1-2 cümlelik özet çıkar
- meta_title ve meta_description SEO için optimize et
- tags boşsa, içerikten uygun etiketler çıkar
- Slug her dilde aynı olsun (Türkçe karaktersiz)

Hedef diller: ${locales.join(', ')}

SADECE şu JSON formatında yanıt ver:
{
  "locales": [
    {
      "locale": "tr",
      "title": "...",
      "slug": "...",
      "summary": "...",
      "content": "<p>...</p>",
      "meta_title": "...",
      "meta_description": "...",
      "tags": "etiket1, etiket2, etiket3"
    }
  ]
}`;
    } else if (body.action === 'enhance') {
      userPrompt = `Mevcut içerik:
- Başlık: ${body.title || '(boş)'}
- İçerik: ${body.content || '(boş)'}

Görev: Bu içeriği geliştir ve genişlet. Daha detaylı, profesyonel ve SEO dostu hale getir.
Dil: ${body.locale || 'tr'}

SADECE şu JSON formatında yanıt ver:
{
  "locales": [{ "locale": "${body.locale || 'tr'}", "title": "...", "slug": "...", "summary": "...", "content": "<p>...</p>", "meta_title": "...", "meta_description": "...", "tags": "..." }]
}`;
    } else if (body.action === 'translate') {
      userPrompt = `Kaynak içerik (${body.locale || 'tr'}):
- Başlık: ${body.title}
- Özet: ${body.summary}
- İçerik: ${body.content?.slice(0, 2000)}
- Etiketler: ${body.tags}
- meta_title: ${body.title}
- meta_description: ${body.summary}

Görev: Bu içeriği şu dillere çevir: ${locales.filter(l => l !== body.locale).join(', ')}
Çeviri doğal olsun, kelime kelime değil anlam odaklı.
Slug tüm dillerde aynı olsun.

SADECE şu JSON formatında yanıt ver:
{
  "locales": [
    { "locale": "en", "title": "...", "slug": "...", "summary": "...", "content": "<p>...</p>", "meta_title": "...", "meta_description": "...", "tags": "..." }
  ]
}`;
    } else if (body.action === 'generate_meta') {
      userPrompt = `İçerik:
- Başlık: ${body.title}
- İçerik: ${body.content?.slice(0, 1000)}

Görev: SEO meta bilgilerini oluştur.
Dil: ${body.locale || 'tr'}

SADECE şu JSON formatında yanıt ver:
{
  "locales": [{ "locale": "${body.locale || 'tr'}", "title": "${body.title}", "slug": "...", "summary": "...", "content": "", "meta_title": "...", "meta_description": "...", "tags": "..." }]
}`;
    }

    const raw = await callAI(SYSTEM_PROMPT, userPrompt);
    const result = extractJSON(raw);

    return reply.send({ ok: true, data: result });
  } catch (err: any) {
    return reply.code(500).send({ error: { message: err.message || 'AI içerik hatası' } });
  }
}
