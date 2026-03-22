// =============================================================
// FILE: src/app/(main)/admin/(admin)/categories/_components/category-detail-client.tsx
// Category Detail/Edit — Standard tabs: Form + JSON
// Vista İnşaat
// =============================================================

'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { ArrowLeft, Save, FileJson } from 'lucide-react';

import { useAdminLocales } from '@/app/(main)/admin/_components/common/useAdminLocales';
import { resolveAdminApiLocale } from '@/i18n/adminLocale';
import { localeShortClient, localeShortClientOr } from '@/i18n/localeShortClient';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';

import { AdminJsonEditor } from '@/app/(main)/admin/_components/common/AdminJsonEditor';
import { AdminImageUploadField } from '@/app/(main)/admin/_components/common/AdminImageUploadField';

import {
  useGetCategoryAdminQuery,
  useCreateCategoryAdminMutation,
  useUpdateCategoryAdminMutation,
} from '@/integrations/endpoints/admin/categories_admin.endpoints';

function isValidId(v?: string) {
  if (!v || v === 'new') return false;
  return v.length >= 10 && v.includes('-');
}

const norm = (v: unknown) => String(v ?? '').trim();
const toNull = (v: unknown) => { const s = norm(v); return s || null; };

function slugify(text: string) {
  return text.toLowerCase()
    .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
    .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

type FormValues = {
  locale: string;
  name: string;
  slug: string;
  description: string;
  module_key: string;
  image_url: string;
  alt: string;
  icon: string;
  is_active: boolean;
  is_featured: boolean;
  display_order: string;
  meta_title: string;
  meta_description: string;
  replicate_all_locales: boolean;
};

const emptyForm = (locale: string): FormValues => ({
  locale,
  name: '', slug: '', description: '',
  module_key: 'vistainsaat',
  image_url: '', alt: '', icon: '',
  is_active: true, is_featured: false, display_order: '0',
  meta_title: '', meta_description: '',
  replicate_all_locales: false,
});

export default function CategoryDetailClient({ id }: { id: string }) {
  const router = useRouter();
  const sp = useSearchParams();
  const isNew = id === 'new';

  const { localeOptions, defaultLocaleFromDb, loading: localesLoading } = useAdminLocales();
  const apiLocale = React.useMemo(
    () => resolveAdminApiLocale(localeOptions as any, defaultLocaleFromDb, 'tr'),
    [localeOptions, defaultLocaleFromDb],
  );
  const urlLocale = localeShortClient(sp?.get('locale')) || '';

  const [activeLocale, setActiveLocale] = React.useState('');
  const [slugTouched, setSlugTouched] = React.useState(!isNew);

  React.useEffect(() => {
    if (!localeOptions?.length) return;
    setActiveLocale((prev) => {
      const p = localeShortClient(prev);
      const u = localeShortClient(urlLocale);
      const d = localeShortClientOr(apiLocale, 'tr');
      const canUse = (l: string) => !!l && (localeOptions ?? []).some((x: any) => localeShortClient(x.value) === l);
      if (p && canUse(p)) return p;
      if (u && canUse(u)) return u;
      if (d && canUse(d)) return d;
      return localeShortClient((localeOptions as any)?.[0]?.value) || 'tr';
    });
  }, [localeOptions, urlLocale, apiLocale]);

  const queryLocale = localeShortClient(activeLocale) || apiLocale;

  const { data: category, isLoading, isFetching } = useGetCategoryAdminQuery(
    { id, locale: queryLocale },
    { skip: isNew || !isValidId(id) || !queryLocale },
  );

  const [createCategory, createState] = useCreateCategoryAdminMutation();
  const [updateCategory, updateState] = useUpdateCategoryAdminMutation();

  const [values, setValues] = React.useState<FormValues>(() => emptyForm(queryLocale || 'tr'));
  const busy = isLoading || isFetching || localesLoading || createState.isLoading || updateState.isLoading;

  React.useEffect(() => {
    if (isNew) { setValues(emptyForm(queryLocale || 'tr')); return; }
    if (!category) return;
    const c = category as any;
    const i18n = c.i18n_data && typeof c.i18n_data === 'object' ? c.i18n_data : {};
    setValues({
      locale: queryLocale || 'tr',
      name: norm(c.name),
      slug: norm(c.slug),
      description: norm(c.description),
      module_key: norm(c.module_key) || 'vistainsaat',
      image_url: norm(c.image_url),
      alt: norm(c.alt),
      icon: norm(c.icon),
      is_active: c.is_active === 1 || c.is_active === true,
      is_featured: c.is_featured === 1 || c.is_featured === true,
      display_order: String(c.display_order ?? 0),
      meta_title: norm(i18n.meta_title || c.meta_title),
      meta_description: norm(i18n.meta_description || c.meta_description),
      replicate_all_locales: false,
    });
    setSlugTouched(false);
  }, [category, isNew, queryLocale]);

  const handleChange = (field: string, value: unknown) => {
    if (field === 'slug') setSlugTouched(true);
    setValues((prev) => {
      const next = { ...prev, [field]: value };
      if (field === 'name' && !slugTouched) next.slug = slugify(String(value));
      return next;
    });
  };

  async function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    if (busy) return;
    if (!values.name.trim()) { toast.error('Kategori adı zorunlu'); return; }

    const payload: any = {
      locale: queryLocale,
      name: values.name.trim(),
      slug: values.slug.trim() || slugify(values.name),
      description: toNull(values.description),
      module_key: values.module_key || 'vistainsaat',
      image_url: toNull(values.image_url),
      alt: toNull(values.alt),
      icon: toNull(values.icon),
      is_active: values.is_active,
      is_featured: values.is_featured,
      display_order: Number(values.display_order) || 0,
      seo_title: toNull(values.meta_title),
      seo_description: toNull(values.meta_description),
      i18n_data: {
        meta_title: toNull(values.meta_title),
        meta_description: toNull(values.meta_description),
      },
    };

    try {
      if (isNew) {
        payload.replicate_all_locales = values.replicate_all_locales;
        const result = await createCategory(payload).unwrap();
        const newId = String((result as any)?.id ?? '');
        toast.success('Kategori oluşturuldu');
        if (isValidId(newId)) router.replace(`/admin/categories/${newId}?locale=${queryLocale}`);
        else router.push('/admin/categories');
      } else {
        await updateCategory({ id, patch: payload }).unwrap();
        toast.success('Kategori güncellendi');
      }
    } catch (err: any) {
      toast.error(err?.data?.error?.message || err?.data?.error?.detail || 'Hata oluştu');
    }
  }

  const pageTitle = isNew ? 'Yeni Kategori' : (values.name || 'Kategori Düzenle');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" onClick={() => router.back()} disabled={busy}>
            <ArrowLeft className="mr-2 size-4" />Geri
          </Button>
          <h1 className="text-lg font-semibold">{pageTitle}</h1>
          <Badge variant="secondary">{queryLocale}</Badge>
          {isNew ? <Badge>YENİ</Badge> : <Badge variant="secondary">DÜZENLE</Badge>}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => router.push(`/admin/categories?locale=${queryLocale}`)} disabled={busy}>İptal</Button>
          <Button onClick={() => handleSubmit()} disabled={busy}><Save className="mr-2 size-4" />Kaydet</Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="form">
        <TabsList>
          <TabsTrigger value="form">Form</TabsTrigger>
          <TabsTrigger value="json"><FileJson className="h-4 w-4 mr-1.5" />JSON</TabsTrigger>
        </TabsList>

        {/* ── Form Tab ── */}
        <TabsContent value="form" className="mt-4">
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Kategori Bilgileri</CardTitle>
                <CardDescription>Kategori adı, açıklaması, modülü ve görseli.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 lg:grid-cols-12">
                  {/* Left column */}
                  <div className="space-y-4 lg:col-span-8">
                    {/* Locale + Toggles */}
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="space-y-2">
                        <Label>Dil</Label>
                        <Select value={activeLocale || ''} onValueChange={(v) => setActiveLocale(v)} disabled={busy || !localeOptions?.length}>
                          <SelectTrigger><SelectValue placeholder="Dil seç" /></SelectTrigger>
                          <SelectContent>
                            {(localeOptions ?? []).map((l: any) => (
                              <SelectItem key={l.value} value={String(l.value)}>{String(l.label ?? l.value)}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-end gap-4 md:col-span-2">
                        <div className="flex items-center gap-2">
                          <Checkbox id="cat_active" checked={values.is_active} onCheckedChange={(v) => handleChange('is_active', v === true)} disabled={busy} />
                          <Label htmlFor="cat_active">Aktif</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox id="cat_featured" checked={values.is_featured} onCheckedChange={(v) => handleChange('is_featured', v === true)} disabled={busy} />
                          <Label htmlFor="cat_featured">Öne Çıkan</Label>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Name + Slug */}
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Kategori Adı *</Label>
                        <Input value={values.name} onChange={(e) => handleChange('name', e.target.value)} disabled={busy} placeholder="Kategori adı" />
                      </div>
                      <div className="space-y-2">
                        <Label>Slug</Label>
                        <Input value={values.slug} onFocus={() => setSlugTouched(true)} onChange={(e) => handleChange('slug', e.target.value)} disabled={busy} placeholder="otomatik-olusturulur" />
                      </div>
                    </div>

                    {/* Module */}
                    <div className="space-y-2">
                      <Label>Modül</Label>
                      <Select value={values.module_key || 'vistainsaat'} onValueChange={(v) => handleChange('module_key', v)} disabled={busy}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vistainsaat">Vista İnşaat</SelectItem>
                          <SelectItem value="product">Ürünler</SelectItem>
                          <SelectItem value="services">Hizmetler</SelectItem>
                          <SelectItem value="news">Haberler</SelectItem>
                          <SelectItem value="library">Kütüphane</SelectItem>
                          <SelectItem value="about">Hakkımızda</SelectItem>
                          <SelectItem value="references">Referanslar</SelectItem>
                          <SelectItem value="general">Genel</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <Label>Açıklama</Label>
                      <Textarea rows={3} value={values.description} onChange={(e) => handleChange('description', e.target.value)} disabled={busy} placeholder="Kategori açıklaması..." />
                    </div>

                    {/* Icon */}
                    <div className="space-y-2">
                      <Label>Icon</Label>
                      <Input value={values.icon} onChange={(e) => handleChange('icon', e.target.value)} disabled={busy} placeholder="fa-cube veya lucide icon adı" />
                    </div>

                    <Separator />

                    {/* SEO */}
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Meta Başlık</Label>
                        <Input value={values.meta_title} onChange={(e) => handleChange('meta_title', e.target.value)} disabled={busy} />
                      </div>
                      <div className="space-y-2">
                        <Label>Alt Text</Label>
                        <Input value={values.alt} onChange={(e) => handleChange('alt', e.target.value)} disabled={busy} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Meta Açıklama</Label>
                      <Textarea rows={2} value={values.meta_description} onChange={(e) => handleChange('meta_description', e.target.value)} disabled={busy} />
                    </div>
                  </div>

                  {/* Right sidebar */}
                  <div className="space-y-4 lg:col-span-4">
                    <div className="space-y-2">
                      <Label>Sıralama</Label>
                      <Input type="number" min={0} value={values.display_order} onChange={(e) => handleChange('display_order', e.target.value)} disabled={busy} />
                    </div>

                    <AdminImageUploadField label="Kategori Görseli" bucket="public" folder="categories" value={norm(values.image_url)} onChange={(url) => handleChange('image_url', norm(url))} disabled={busy} />

                    {isNew && (
                      <>
                        <Separator />
                        <div className="flex items-start gap-2">
                          <Checkbox id="cat_replicate" checked={values.replicate_all_locales} onCheckedChange={(v) => handleChange('replicate_all_locales', v === true)} disabled={busy} />
                          <Label htmlFor="cat_replicate" className="leading-none">Tüm dillere kopyala</Label>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
                  <Button type="button" variant="outline" onClick={() => router.back()} disabled={busy}>İptal</Button>
                  <Button type="submit" disabled={busy}><Save className="mr-2 size-4" />Kaydet</Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </TabsContent>

        {/* ── JSON Tab ── */}
        <TabsContent value="json" className="mt-4">
          <Card>
            <CardHeader><CardTitle className="text-sm">JSON Veri</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <AdminJsonEditor value={values} onChange={(next) => setValues(next as FormValues)} disabled={busy} height={500} />
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button type="button" variant="outline" onClick={() => router.back()} disabled={busy}>İptal</Button>
                <Button onClick={() => handleSubmit()} disabled={busy}><Save className="mr-2 size-4" />Kaydet</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
