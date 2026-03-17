import type { RouteHandler } from 'fastify';
import { db } from '@/db/client';
import { randomUUID } from 'crypto';
import { and, asc, desc, eq, like, sql } from 'drizzle-orm';
import { services, servicesI18n } from './schema';
import { serviceCreateSchema, serviceUpdateSchema, serviceReorderSchema, serviceListQuerySchema } from './validation';

const toBool = (v: unknown): number => (v === true || v === 1 || v === '1' || v === 'true') ? 1 : 0;

/* ─── LIST ─────────────────────────────────────────── */
export const listServicesAdmin: RouteHandler = async (req, reply) => {
  try {
    const q = serviceListQuerySchema.parse(req.query ?? {});
    const locale = q.locale || 'tr';

    const conds: any[] = [eq(servicesI18n.locale, locale)];
    if (q.module_key) conds.push(eq(services.module_key, q.module_key));
    if (q.is_active !== undefined) conds.push(eq(services.is_active, q.is_active as any));
    if (q.is_featured !== undefined) conds.push(eq(services.is_featured, q.is_featured as any));
    if (q.q) conds.push(like(servicesI18n.title, `%${q.q}%`));

    const sortCol = q.sort === 'created_at' ? services.created_at
      : q.sort === 'title' ? servicesI18n.title
      : services.display_order;
    const orderFn = q.order === 'desc' ? desc : asc;

    const [countRow] = await db
      .select({ total: sql<number>`COUNT(*)` })
      .from(services)
      .innerJoin(servicesI18n, and(eq(services.id, servicesI18n.service_id), eq(servicesI18n.locale, locale)))
      .where(and(...conds));
    const total = Number(countRow?.total ?? 0);

    const rows = await db
      .select({
        id: services.id,
        module_key: services.module_key,
        is_active: services.is_active,
        is_featured: services.is_featured,
        display_order: services.display_order,
        image_url: services.image_url,
        storage_asset_id: services.storage_asset_id,
        created_at: services.created_at,
        title: servicesI18n.title,
        slug: servicesI18n.slug,
        description: servicesI18n.description,
        content: servicesI18n.content,
        alt: servicesI18n.alt,
        tags: servicesI18n.tags,
        meta_title: servicesI18n.meta_title,
        meta_description: servicesI18n.meta_description,
      })
      .from(services)
      .innerJoin(servicesI18n, and(eq(services.id, servicesI18n.service_id), eq(servicesI18n.locale, locale)))
      .where(and(...conds))
      .orderBy(orderFn(sortCol))
      .limit(q.limit)
      .offset(q.offset);

    reply.header('x-total-count', String(total));
    reply.header('access-control-expose-headers', 'x-total-count');
    return reply.send(rows);
  } catch (e: any) {
    if (e?.name === 'ZodError') {
      return reply.code(422).send({ error: { message: 'validation_error', details: e.issues } });
    }
    req.log.error({ err: e }, 'listServicesAdmin failed');
    return reply.code(500).send({ error: { message: 'internal_error', detail: e?.sqlMessage || e?.message } });
  }
};

/* ─── GET BY ID ────────────────────────────────────── */
export const getServiceAdmin: RouteHandler = async (req, reply) => {
  try {
    const { id } = req.params as { id: string };
    const { locale } = (req.query || {}) as { locale?: string };
    const loc = locale || 'tr';

    const [row] = await db
      .select({
        id: services.id,
        module_key: services.module_key,
        is_active: services.is_active,
        is_featured: services.is_featured,
        display_order: services.display_order,
        image_url: services.image_url,
        storage_asset_id: services.storage_asset_id,
        created_at: services.created_at,
        title: servicesI18n.title,
        slug: servicesI18n.slug,
        description: servicesI18n.description,
        content: servicesI18n.content,
        alt: servicesI18n.alt,
        tags: servicesI18n.tags,
        meta_title: servicesI18n.meta_title,
        meta_description: servicesI18n.meta_description,
      })
      .from(services)
      .leftJoin(servicesI18n, and(eq(services.id, servicesI18n.service_id), eq(servicesI18n.locale, loc)))
      .where(eq(services.id, id))
      .limit(1);

    if (!row) return reply.code(404).send({ error: { message: 'not_found' } });
    return reply.send({ ...row, locale: loc });
  } catch (e: any) {
    req.log.error({ err: e }, 'getServiceAdmin failed');
    return reply.code(500).send({ error: { message: 'internal_error', detail: e?.sqlMessage || e?.message } });
  }
};

/* ─── CREATE ───────────────────────────────────────── */
export const createServiceAdmin: RouteHandler = async (req, reply) => {
  try {
    const input = serviceCreateSchema.parse(req.body ?? {});
    const id = randomUUID();
    const locale = input.locale || 'tr';
    const now = new Date();

    await db.insert(services).values({
      id,
      module_key: input.module_key || 'vistainsaat',
      is_active: input.is_active !== undefined ? toBool(input.is_active) : 1,
      is_featured: input.is_featured !== undefined ? toBool(input.is_featured) : 0,
      display_order: input.display_order ?? 0,
      image_url: input.image_url ?? null,
      storage_asset_id: input.storage_asset_id || null,
      created_at: now,
      updated_at: now,
    } as any);

    const locales = input.replicate_all_locales ? ['tr', 'en', 'de'] : [locale];
    for (const loc of locales) {
      await db.insert(servicesI18n).values({
        service_id: id,
        locale: loc,
        title: input.title,
        slug: input.slug,
        description: input.description ?? null,
        content: input.content ?? null,
        alt: input.alt ?? null,
        tags: input.tags ?? [],
        meta_title: input.meta_title ?? null,
        meta_description: input.meta_description ?? null,
        created_at: now,
        updated_at: now,
      });
    }

    const [created] = await db
      .select({ id: services.id, title: servicesI18n.title })
      .from(services)
      .leftJoin(servicesI18n, and(eq(services.id, servicesI18n.service_id), eq(servicesI18n.locale, locale)))
      .where(eq(services.id, id))
      .limit(1);

    return reply.code(201).send(created);
  } catch (e: any) {
    if (e?.name === 'ZodError') {
      return reply.code(422).send({ error: { message: 'validation_error', details: e.issues } });
    }
    req.log.error({ err: e }, 'createServiceAdmin failed');
    return reply.code(500).send({ error: { message: 'internal_error', detail: e?.sqlMessage || e?.message } });
  }
};

/* ─── UPDATE ───────────────────────────────────────── */
export const updateServiceAdmin: RouteHandler = async (req, reply) => {
  try {
    const { id } = req.params as { id: string };
    const input = serviceUpdateSchema.parse(req.body ?? {});
    const locale = input.locale || 'tr';

    // Base fields
    const baseFields: Record<string, any> = {};
    if (input.is_active !== undefined) baseFields.is_active = toBool(input.is_active);
    if (input.is_featured !== undefined) baseFields.is_featured = toBool(input.is_featured);
    if (input.display_order !== undefined) baseFields.display_order = input.display_order;
    if (input.image_url !== undefined) baseFields.image_url = input.image_url;
    if (input.storage_asset_id !== undefined) baseFields.storage_asset_id = input.storage_asset_id || null;
    if (input.module_key !== undefined) baseFields.module_key = input.module_key;

    if (Object.keys(baseFields).length) {
      baseFields.updated_at = new Date();
      await db.update(services).set(baseFields).where(eq(services.id, id));
    }

    // i18n upsert
    const i18nFields: Record<string, any> = {};
    if (input.title !== undefined) i18nFields.title = input.title;
    if (input.slug !== undefined) i18nFields.slug = input.slug;
    if (input.description !== undefined) i18nFields.description = input.description;
    if (input.content !== undefined) i18nFields.content = input.content;
    if (input.alt !== undefined) i18nFields.alt = input.alt;
    if (input.tags !== undefined) i18nFields.tags = input.tags;
    if (input.meta_title !== undefined) i18nFields.meta_title = input.meta_title;
    if (input.meta_description !== undefined) i18nFields.meta_description = input.meta_description;

    if (Object.keys(i18nFields).length) {
      const [existing] = await db
        .select({ service_id: servicesI18n.service_id })
        .from(servicesI18n)
        .where(and(eq(servicesI18n.service_id, id), eq(servicesI18n.locale, locale)))
        .limit(1);

      if (existing) {
        i18nFields.updated_at = new Date();
        await db.update(servicesI18n).set(i18nFields)
          .where(and(eq(servicesI18n.service_id, id), eq(servicesI18n.locale, locale)));
      } else {
        if (!i18nFields.title || !i18nFields.slug) {
          return reply.code(400).send({ error: { message: 'title_and_slug_required_for_new_locale' } });
        }
        await db.insert(servicesI18n).values({
          service_id: id,
          locale,
          title: i18nFields.title,
          slug: i18nFields.slug,
          description: i18nFields.description ?? null,
          content: i18nFields.content ?? null,
          alt: i18nFields.alt ?? null,
          tags: i18nFields.tags ?? [],
          meta_title: i18nFields.meta_title ?? null,
          meta_description: i18nFields.meta_description ?? null,
          created_at: new Date(),
          updated_at: new Date(),
        });
      }
    }

    // Return updated
    const [row] = await db
      .select({
        id: services.id,
        module_key: services.module_key,
        is_active: services.is_active,
        is_featured: services.is_featured,
        display_order: services.display_order,
        image_url: services.image_url,
        title: servicesI18n.title,
        slug: servicesI18n.slug,
      })
      .from(services)
      .leftJoin(servicesI18n, and(eq(services.id, servicesI18n.service_id), eq(servicesI18n.locale, locale)))
      .where(eq(services.id, id))
      .limit(1);

    return reply.send({ ...row, locale });
  } catch (e: any) {
    if (e?.name === 'ZodError') {
      return reply.code(422).send({ error: { message: 'validation_error', details: e.issues } });
    }
    req.log.error({ err: e }, 'updateServiceAdmin failed');
    return reply.code(500).send({ error: { message: 'internal_error', detail: e?.sqlMessage || e?.message } });
  }
};

/* ─── DELETE ───────────────────────────────────────── */
export const removeServiceAdmin: RouteHandler = async (req, reply) => {
  try {
    const { id } = req.params as { id: string };
    await db.delete(services).where(eq(services.id, id));
    return reply.code(204).send();
  } catch (e: any) {
    req.log.error({ err: e }, 'removeServiceAdmin failed');
    return reply.code(500).send({ error: { message: 'internal_error', detail: e?.sqlMessage || e?.message } });
  }
};

/* ─── REORDER ──────────────────────────────────────── */
export const reorderServicesAdmin: RouteHandler = async (req, reply) => {
  try {
    const { items } = serviceReorderSchema.parse(req.body ?? {});
    await db.transaction(async (tx) => {
      for (const { id, display_order } of items) {
        await tx.update(services).set({ display_order, updated_at: new Date() } as any).where(eq(services.id, id));
      }
    });
    return reply.send({ ok: true });
  } catch (e: any) {
    req.log.error({ err: e }, 'reorderServicesAdmin failed');
    return reply.code(500).send({ error: { message: 'internal_error', detail: e?.sqlMessage || e?.message } });
  }
};
