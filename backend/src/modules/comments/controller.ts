// =============================================================
// FILE: src/modules/comments/controller.ts (PUBLIC)
// Spam protection: reCAPTCHA + rate limit + duplicate detection + content filtering
// =============================================================
import type { FastifyRequest, FastifyReply } from "fastify";
import { CommentCreateSchema, CommentListParamsSchema } from "./validation";
import { repoCreateComment, repoListComments } from "./repository";
import {
  isRecaptchaEnabled,
  shouldBypassRecaptchaForOrigin,
  verifyRecaptchaToken,
} from "../review/recaptcha";
import { db } from "@/db/client";
import { comments } from "./schema";
import { and, eq, desc, sql } from "drizzle-orm";

type CreateReq = FastifyRequest<{ Body: unknown }>;
type ListReq = FastifyRequest<{ Querystring: unknown }>;

// Simple spam word list
const SPAM_PATTERNS = [
  /\b(viagra|cialis|casino|lottery|prize|winner|congratulations)\b/i,
  /https?:\/\/.{5,}/gi, // multiple URLs
  /(.)\1{9,}/,          // repeated characters (aaaaaaaaaa)
];

function isSpamContent(content: string): boolean {
  let urlCount = 0;
  const urlRegex = /https?:\/\/\S+/gi;
  let match;
  while ((match = urlRegex.exec(content)) !== null) {
    urlCount++;
    if (urlCount > 2) return true; // more than 2 URLs = spam
  }

  return SPAM_PATTERNS.some((p) => p.test(content));
}

export async function createCommentPublic(req: CreateReq, reply: FastifyReply) {
  const parsed = CommentCreateSchema.safeParse(req.body);
  if (!parsed.success) {
    return reply
      .code(400)
      .send({ error: "INVALID_BODY", details: parsed.error.flatten() });
  }

  // reCAPTCHA verification (bypass on localhost in dev)
  const requestOrigin = typeof req.headers.origin === "string" ? req.headers.origin : "";

  if (isRecaptchaEnabled() && !shouldBypassRecaptchaForOrigin(requestOrigin)) {
    if (!parsed.data.captcha_token) {
      return reply
        .code(400)
        .send({ error: { message: "captcha_required" } });
    }

    const remoteIp =
      ((req.headers["x-forwarded-for"] as string | undefined)?.split(",")[0] || "").trim() ||
      req.ip;

    const verification = await verifyRecaptchaToken(
      parsed.data.captcha_token,
      remoteIp || undefined,
    );

    if (!verification.success) {
      return reply
        .code(400)
        .send({
          error: {
            message: "captcha_verification_failed",
            details: verification.errorCodes,
          },
        });
    }
  }

  // Spam content check
  if (isSpamContent(parsed.data.content)) {
    return reply
      .code(400)
      .send({ error: { message: "comment_flagged_as_spam" } });
  }

  const ip =
    (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
    (req.socket as any)?.remoteAddress ||
    null;

  // Duplicate detection: same IP + same content within last 5 minutes
  if (ip) {
    const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000);
    const [dup] = await db
      .select({ id: comments.id })
      .from(comments)
      .where(
        and(
          eq(comments.ip_address, ip),
          eq(comments.content, parsed.data.content),
          sql`${comments.created_at} > ${fiveMinAgo}`,
        ),
      )
      .orderBy(desc(comments.created_at))
      .limit(1);

    if (dup) {
      return reply
        .code(429)
        .send({ error: { message: "duplicate_comment" } });
    }
  }

  const ua = (req.headers["user-agent"] as string) || null;

  const { captcha_token: _, ...commentData } = parsed.data;

  const created = await repoCreateComment({
    ...commentData,
    ip_address: ip,
    user_agent: ua,
  });

  return reply.code(201).send(created);
}

export async function listCommentsPublic(req: ListReq, reply: FastifyReply) {
  const parsed = CommentListParamsSchema.safeParse(req.query);
  if (!parsed.success) {
    return reply
      .code(400)
      .send({ error: "INVALID_QUERY", details: parsed.error.flatten() });
  }

  const list = await repoListComments({ ...parsed.data, publicOnly: true });
  return reply.send(list);
}
