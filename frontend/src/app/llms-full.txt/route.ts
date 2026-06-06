import { NextResponse } from 'next/server';
import { API_BASE_URL, SITE_URL } from '@/lib/utils';

export const revalidate = 3600;

async function fetchJson(path: string) {
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      next: { revalidate },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

function itemsFrom(data: unknown): any[] {
  if (Array.isArray(data)) return data;
  return (data as any)?.items ?? [];
}

function stripHtml(input?: string | null): string {
  return String(input || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function section(title: string, lines: Array<string | null | undefined>) {
  const body = lines.map(stripHtml).filter(Boolean).join('\n\n');
  return body ? `## ${title}\n${body}` : '';
}

export async function GET() {
  const locale = 'tr';
  const [about, projectsData, servicesData] = await Promise.all([
    fetchJson(`/custom_pages/by-slug/hakkimizda?locale=${locale}`),
    fetchJson(`/products?item_type=vistainsaat&is_active=1&locale=${locale}&limit=5`),
    fetchJson(`/services?module_key=vistainsaat&is_active=1&locale=${locale}&limit=6`),
  ]);

  const projects = itemsFrom(projectsData);
  const services = itemsFrom(servicesData);
  const parts = [
    '# Vista İnşaat llms-full.txt',
    `Kaynak site: ${SITE_URL}`,
    section('Kurum Özeti', [
      'Vista İnşaat, Antalya merkezli inşaat, mimarlık, proje geliştirme ve anahtar teslim uygulama hizmetleri sunar.',
      about?.title,
      about?.description || about?.meta_description,
      about?.content?.html || about?.content,
    ]),
    section(
      'Projeler',
      projects.map((project) =>
        [
          project.title || project.name,
          project.description || project.meta_description,
          project.specifications
            ? `Teknik bilgiler: ${JSON.stringify(project.specifications)}`
            : null,
        ]
          .filter(Boolean)
          .join('\n'),
      ),
    ),
    section(
      'Hizmetler',
      services.map((service) =>
        [
          service.title || service.name,
          service.description || service.meta_description,
          service.content,
        ]
          .filter(Boolean)
          .join('\n'),
      ),
    ),
  ].filter(Boolean);

  return new NextResponse(`${parts.join('\n\n')}\n`, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
