import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

const SECRET = process.env.REVALIDATE_SECRET || 'vista-revalidate-2026';

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const { secret, path, all } = body as { secret?: string; path?: string; all?: boolean };

  if (secret !== SECRET) {
    return NextResponse.json({ error: 'invalid_secret' }, { status: 401 });
  }

  try {
    if (all) {
      // Tüm sayfaları revalidate et
      revalidatePath('/', 'layout');
      return NextResponse.json({ revalidated: true, scope: 'all' });
    }

    if (path) {
      revalidatePath(path, 'page');
      return NextResponse.json({ revalidated: true, path });
    }

    // Default: ana sayfalar
    revalidatePath('/tr', 'layout');
    revalidatePath('/en', 'layout');
    return NextResponse.json({ revalidated: true, scope: 'all-locales' });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'revalidation_failed' }, { status: 500 });
  }
}
