// =============================================================
// FILE: src/modules/comments/schema.ts
// =============================================================
import {
  mysqlTable,
  char,
  varchar,
  text,
  boolean,
  int,
  timestamp,
  index,
} from "drizzle-orm/mysql-core";

export const comments = mysqlTable(
  "comments",
  {
    id: char("id", { length: 36 }).primaryKey().notNull(),
    target_type: varchar("target_type", { length: 50 }).notNull().default("project"),
    target_id: char("target_id", { length: 36 }).notNull(),
    parent_id: char("parent_id", { length: 36 }),
    author_name: varchar("author_name", { length: 255 }).notNull(),
    author_email: varchar("author_email", { length: 255 }),
    content: text("content").notNull(),
    image_url: varchar("image_url", { length: 500 }),
    is_approved: boolean("is_approved").notNull().default(false),
    is_active: boolean("is_active").notNull().default(true),
    ip_address: varchar("ip_address", { length: 45 }),
    user_agent: varchar("user_agent", { length: 500 }),
    likes_count: int("likes_count").notNull().default(0),
    created_at: timestamp("created_at", { fsp: 3 }).notNull().defaultNow(),
    updated_at: timestamp("updated_at", { fsp: 3 }).notNull().defaultNow().onUpdateNow(),
  },
  (t) => [
    index("idx_comment_target").on(t.target_type, t.target_id),
    index("idx_comment_parent").on(t.parent_id),
    index("idx_comment_approved").on(t.is_approved),
    index("idx_comment_created").on(t.created_at),
  ],
);

export type CommentRow = typeof comments.$inferSelect;
export type CommentInsert = typeof comments.$inferInsert;

// Projection yok, direkt row'u view gibi kullaniyoruz
export type CommentView = CommentRow;
