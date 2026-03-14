// =============================================================
// FILE: src/modules/comments/repository.ts
// =============================================================
import { randomUUID } from "crypto";
import { db } from "@/db/client";
import {
  comments,
  type CommentView,
  type CommentInsert,
} from "./schema";
import {
  and,
  asc,
  desc,
  eq,
  sql,
  type SQL,
} from "drizzle-orm";
import type {
  CommentCreateInput,
  CommentListParams,
  CommentUpdateInput,
} from "./validation";

function safeOrderBy(col?: string) {
  switch (col) {
    case "created_at":
    case "updated_at":
    case "likes_count":
      return col;
    default:
      return "created_at";
  }
}

export async function repoCreateComment(
  body: CommentCreateInput & { ip_address?: string | null; user_agent?: string | null },
): Promise<CommentView> {
  const id = randomUUID();

  const insert: CommentInsert = {
    id,
    target_type: body.target_type ?? "project",
    target_id: body.target_id,
    parent_id: body.parent_id ?? null,
    author_name: body.author_name.trim(),
    author_email: body.author_email?.trim() ?? null,
    content: body.content,
    image_url: body.image_url ?? null,
    is_approved: false,
    is_active: true,
    ip_address: body.ip_address ?? null,
    user_agent: body.user_agent ?? null,
    likes_count: 0,
    // created_at / updated_at DB default
  };

  await db.insert(comments).values(insert);

  const [row] = await db
    .select()
    .from(comments)
    .where(eq(comments.id, id))
    .limit(1);

  return row as CommentView;
}

export async function repoGetCommentById(id: string): Promise<CommentView | null> {
  const [row] = await db
    .select()
    .from(comments)
    .where(eq(comments.id, id))
    .limit(1);

  return (row ?? null) as CommentView | null;
}

export async function repoListComments(
  params: CommentListParams & { publicOnly?: boolean },
): Promise<CommentView[]> {
  const {
    target_type,
    target_id,
    is_approved,
    search,
    limit = 50,
    offset = 0,
    sort,
    order = "desc",
    publicOnly = false,
  } = params;

  const filters: SQL[] = [];

  // Public endpoint: only approved + active
  if (publicOnly) {
    filters.push(eq(comments.is_approved, true));
    filters.push(eq(comments.is_active, true));
  }

  if (target_type) {
    filters.push(eq(comments.target_type, target_type));
  }

  if (target_id) {
    filters.push(eq(comments.target_id, target_id));
  }

  if (typeof is_approved === "boolean") {
    filters.push(eq(comments.is_approved, is_approved));
  }

  if (search && search.trim()) {
    const q = `%${search.trim()}%`;
    filters.push(
      sql`
        (
          ${comments.author_name} LIKE ${q}
          OR ${comments.author_email} LIKE ${q}
          OR ${comments.content} LIKE ${q}
        )
      `,
    );
  }

  const whereExpr: SQL | undefined =
    filters.length > 0 ? (and(...filters) as SQL) : undefined;

  const orderCol = safeOrderBy(sort);
  const orderDir = order?.toLowerCase() === "asc" ? "asc" : "desc";

  const orderExpr =
    orderCol === "created_at"
      ? orderDir === "asc"
        ? asc(comments.created_at)
        : desc(comments.created_at)
      : orderCol === "updated_at"
      ? orderDir === "asc"
        ? asc(comments.updated_at)
        : desc(comments.updated_at)
      : orderDir === "asc"
      ? asc(comments.likes_count)
      : desc(comments.likes_count);

  const baseQuery = db
    .select()
    .from(comments);

  const rows = await (whereExpr ? baseQuery.where(whereExpr) : baseQuery)
    .orderBy(orderExpr)
    .limit(Number(limit))
    .offset(Number(offset));

  return rows as CommentView[];
}

export async function repoUpdateComment(
  id: string,
  body: CommentUpdateInput,
): Promise<CommentView | null> {
  const patch: Partial<CommentInsert> = {};

  if (body.author_name) {
    patch.author_name = body.author_name.trim();
  }
  if (typeof body.author_email !== "undefined") {
    patch.author_email = body.author_email?.trim() ?? null;
  }
  if (body.content) {
    patch.content = body.content;
  }
  if (typeof body.image_url !== "undefined") {
    patch.image_url = body.image_url ?? null;
  }
  if (typeof body.is_approved === "boolean") {
    patch.is_approved = body.is_approved;
  }
  if (typeof body.is_active === "boolean") {
    patch.is_active = body.is_active;
  }

  if (Object.keys(patch).length === 0) {
    return repoGetCommentById(id);
  }

  await db
    .update(comments)
    .set({
      ...patch,
      updated_at: new Date() as any,
    })
    .where(eq(comments.id, id));

  return repoGetCommentById(id);
}

export async function repoDeleteComment(id: string): Promise<boolean> {
  const res = await db
    .delete(comments)
    .where(eq(comments.id, id))
    .execute();

  const affected =
    (res as any)?.affectedRows != null
      ? Number((res as any).affectedRows)
      : 0;

  return affected > 0;
}

export async function repoCountComments(
  target_type: string,
  target_id: string,
): Promise<number> {
  const [result] = await db
    .select({ count: sql<number>`COUNT(*)` })
    .from(comments)
    .where(
      and(
        eq(comments.target_type, target_type),
        eq(comments.target_id, target_id),
        eq(comments.is_approved, true),
        eq(comments.is_active, true),
      ),
    );

  return Number(result?.count ?? 0);
}
