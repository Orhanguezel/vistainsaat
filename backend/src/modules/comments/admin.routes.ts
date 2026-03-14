// =============================================================
// FILE: src/modules/comments/admin.routes.ts
// =============================================================
import type { FastifyInstance } from "fastify";
import {
  listCommentsAdmin,
  getCommentAdmin,
  updateCommentAdmin,
  removeCommentAdmin,
} from "./admin.controller";

const BASE = "/comments";

export async function registerCommentsAdmin(app: FastifyInstance) {
  app.get(`${BASE}`,       { config: { auth: true } }, listCommentsAdmin);
  app.get(`${BASE}/:id`,   { config: { auth: true } }, getCommentAdmin);
  app.patch(`${BASE}/:id`, { config: { auth: true } }, updateCommentAdmin);
  app.delete(`${BASE}/:id`,{ config: { auth: true } }, removeCommentAdmin);
}
