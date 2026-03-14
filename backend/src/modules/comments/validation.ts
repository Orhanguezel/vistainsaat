// =============================================================
// FILE: src/modules/comments/validation.ts
// =============================================================
import { z } from "zod";

export const CommentCreateSchema = z.object({
  author_name: z.string().min(2).max(255),
  author_email: z.string().email().max(255).optional().nullable(),
  content: z.string().min(1).max(5000),
  target_type: z.string().max(50).default("project"),
  target_id: z.string().max(100),
  parent_id: z.string().uuid().optional().nullable(),
  image_url: z.string().url().max(500).optional().nullable(),
});

export const CommentUpdateSchema = z.object({
  author_name: z.string().min(2).max(255).optional(),
  author_email: z.string().email().max(255).optional().nullable(),
  content: z.string().min(1).max(5000).optional(),
  image_url: z.string().url().max(500).optional().nullable(),
  is_approved: z.boolean().optional(),
  is_active: z.boolean().optional(),
});

export const CommentListParamsSchema = z.object({
  target_type: z.string().max(50).optional(),
  target_id: z.string().max(100).optional(),
  is_approved: z.coerce.boolean().optional(),
  search: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(200).default(50),
  offset: z.coerce.number().int().min(0).default(0),
  sort: z.enum(["created_at", "updated_at", "likes_count"]).optional(),
  order: z.enum(["asc", "desc"]).default("desc"),
});

export type CommentCreateInput = z.infer<typeof CommentCreateSchema>;
export type CommentUpdateInput = z.infer<typeof CommentUpdateSchema>;
export type CommentListParams = z.infer<typeof CommentListParamsSchema>;
