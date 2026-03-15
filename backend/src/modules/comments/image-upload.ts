// =============================================================
// FILE: src/modules/comments/image-upload.ts
// Public media upload for comments — saves to uploads/comments/
// Supports images (jpeg, png, gif, webp) and videos (mp4, webm, ogg)
// =============================================================
import type { FastifyRequest, FastifyReply } from "fastify";
import type { MultipartFile } from "@fastify/multipart";
import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const ALLOWED_MIME = new Set([
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "video/mp4",
  "video/webm",
  "video/ogg",
]);

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;  // 5 MB
const MAX_VIDEO_SIZE = 20 * 1024 * 1024; // 20 MB

const MIME_EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
  "image/webp": "webp",
  "video/mp4": "mp4",
  "video/webm": "webm",
  "video/ogg": "ogg",
};

export async function uploadCommentImage(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  let mp: MultipartFile | undefined;
  try {
    mp = await (req as any).file();
  } catch {
    return reply
      .code(400)
      .send({ error: { message: "invalid_multipart_body" } });
  }

  if (!mp) {
    return reply.code(400).send({ error: { message: "file_required" } });
  }

  if (!ALLOWED_MIME.has(mp.mimetype)) {
    return reply
      .code(400)
      .send({ error: { message: "invalid_file_type", allowed: [...ALLOWED_MIME] } });
  }

  const isVideo = mp.mimetype.startsWith("video/");
  const maxSize = isVideo ? MAX_VIDEO_SIZE : MAX_IMAGE_SIZE;

  const buf = await mp.toBuffer();

  if (buf.length > maxSize) {
    return reply
      .code(400)
      .send({ error: { message: "file_too_large", maxBytes: maxSize } });
  }

  const ext = MIME_EXT[mp.mimetype] || "bin";
  const filename = `${randomUUID()}.${ext}`;

  const uploadsDir = path.resolve(process.cwd(), "uploads", "comments");
  await mkdir(uploadsDir, { recursive: true });

  const filePath = path.join(uploadsDir, filename);
  await writeFile(filePath, buf);

  const baseUrl = (process.env.PUBLIC_URL || "").replace(/\/+$/, "");
  const url = `${baseUrl}/uploads/comments/${filename}`;
  const type = isVideo ? "video" : "image";

  return reply.send({ url, type });
}
