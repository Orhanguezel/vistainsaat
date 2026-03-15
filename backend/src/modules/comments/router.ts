// =============================================================
// FILE: src/modules/comments/router.ts (PUBLIC)
// =============================================================
import type { FastifyInstance } from "fastify";
import { createCommentPublic, listCommentsPublic } from "./controller";
import { uploadCommentImage } from "./image-upload";

const BASE = "/comments";

export async function registerComments(app: FastifyInstance) {
  // List — generous limit
  app.get(`${BASE}`, { config: { public: true } }, listCommentsPublic);

  // Create comment — rate limited for spam prevention
  app.post(`${BASE}`, {
    config: {
      public: true,
      rateLimit: { max: 5, timeWindow: "1 minute" },
    },
  }, createCommentPublic);

  // Image upload — rate limited
  app.post(`${BASE}/upload-image`, {
    config: {
      public: true,
      rateLimit: { max: 10, timeWindow: "1 minute" },
    },
  }, uploadCommentImage);
}
