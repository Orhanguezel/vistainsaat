import { z } from 'zod';

const emptyToNull = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess((v) => (v === '' ? null : v), schema);

const boolLike = z.union([
  z.boolean(),
  z.literal(0),
  z.literal(1),
  z.literal('0'),
  z.literal('1'),
  z.literal('true'),
  z.literal('false'),
]);

export const serviceCreateSchema = z.object({
  locale: z.string().min(2).max(8).optional(),
  module_key: z.string().min(1).max(50).optional().default('vistainsaat'),

  title: z.string().min(1).max(255),
  slug: z.string().min(1).max(255),
  description: emptyToNull(z.string().optional().nullable()),
  content: emptyToNull(z.string().optional().nullable()),
  alt: emptyToNull(z.string().max(255).optional().nullable()),
  tags: z.union([
    z.array(z.string()),
    z.string().transform((s) => s ? s.split(',').map((t) => t.trim()).filter(Boolean) : []),
  ]).optional().default([]),

  image_url: emptyToNull(z.string().optional().nullable()),
  storage_asset_id: emptyToNull(z.string().max(64).optional().nullable()),

  is_active: boolLike.optional(),
  is_featured: boolLike.optional(),
  display_order: z.coerce.number().int().min(0).optional().default(0),

  meta_title: emptyToNull(z.string().max(255).optional().nullable()),
  meta_description: emptyToNull(z.string().max(500).optional().nullable()),

  replicate_all_locales: z.boolean().optional(),
});

export const serviceUpdateSchema = serviceCreateSchema.partial();

export const serviceReorderSchema = z.object({
  items: z.array(z.object({
    id: z.string().min(1),
    display_order: z.coerce.number().int().min(0),
  })).min(1),
});

export const serviceListQuerySchema = z.object({
  locale: z.string().min(2).max(8).optional(),
  module_key: z.string().optional(),
  is_active: z.coerce.number().optional(),
  is_featured: z.coerce.number().optional(),
  q: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(200).optional().default(50),
  offset: z.coerce.number().int().min(0).optional().default(0),
  sort: z.enum(['display_order', 'created_at', 'title']).optional().default('display_order'),
  order: z.enum(['asc', 'desc']).optional().default('asc'),
});
