// =============================================================
// FILE: src/modules/comments/router.ts (PUBLIC)
// =============================================================
import type { FastifyInstance } from "fastify";
import { createCommentPublic, listCommentsPublic } from "./controller";

const BASE = "/comments";

export async function registerComments(app: FastifyInstance) {
  app.post(`${BASE}`, { config: { public: true } }, createCommentPublic);
  app.get(`${BASE}`, { config: { public: true } }, listCommentsPublic);
}
