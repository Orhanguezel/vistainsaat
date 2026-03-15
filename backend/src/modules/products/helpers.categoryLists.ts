// =============================================================
// FILE: src/modules/products/helpers.categoryLists.ts
// =============================================================
import type { RouteHandler } from "fastify";
import { db } from "@/db/client";
import { and, asc, eq } from "drizzle-orm";

import {
  categories,
  categoryI18n,
} from "@/modules/categories/schema";

// küçük yardımcı – query string bool parse
const toBool = (v: unknown): boolean | undefined => {
  if (v === undefined || v === null || v === "") return undefined;
  const s = String(v).toLowerCase();
  if (["1", "true", "yes", "on"].includes(s)) return true;
  if (["0", "false", "no", "off"].includes(s)) return false;
  return undefined;
};

const normalizeLocale = (raw?: string | null): string | undefined => {
  if (!raw) return undefined;
  const trimmed = raw.trim();
  if (!trimmed) return undefined;
  const [short] = trimmed.split("-");
  return short.toLowerCase();
};

/** Admin panel için kategori drop-down (locale + module_key + is_active destekli) */
export const adminListCategories: RouteHandler = async (req, reply) => {
  const { locale, module_key, is_active } =
    (req.query as {
      locale?: string;
      module_key?: string;
      is_active?: string;
    }) ?? {};

  const conds: any[] = [];

  const normLocale = normalizeLocale(locale);
  if (normLocale) {
    // locale artık categoryI18n tablosunda
    conds.push(eq(categoryI18n.locale, normLocale));
  }

  if (module_key && module_key.trim()) {
    conds.push(eq(categories.module_key, module_key.trim()));
  }

  const active = toBool(is_active);
  if (active !== undefined) {
    // categories.is_active boolean tipli ($type<boolean>()), o yüzden direkt eq ile kullanabiliriz
    conds.push(eq(categories.is_active, active));
  }

  const base = db
    .select({
      id: categories.id,
      name: categoryI18n.name,
      slug: categoryI18n.slug,
      locale: categoryI18n.locale,
      module_key: categories.module_key,
    })
    .from(categories)
    .innerJoin(
      categoryI18n,
      eq(categoryI18n.category_id, categories.id),
    );

  const qb = conds.length ? base.where(and(...conds)) : base;

  const rows = await qb.orderBy(
    asc(categories.display_order),
    asc(categoryI18n.name),
  );

  return reply.send(rows);
};

