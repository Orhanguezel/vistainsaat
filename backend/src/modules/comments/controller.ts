// =============================================================
// FILE: src/modules/comments/controller.ts (PUBLIC)
// =============================================================
import type { FastifyRequest, FastifyReply } from "fastify";
import { CommentCreateSchema, CommentListParamsSchema } from "./validation";
import { repoCreateComment, repoListComments } from "./repository";

type CreateReq = FastifyRequest<{ Body: unknown }>;
type ListReq = FastifyRequest<{ Querystring: unknown }>;

export async function createCommentPublic(req: CreateReq, reply: FastifyReply) {
  const parsed = CommentCreateSchema.safeParse(req.body);
  if (!parsed.success) {
    return reply
      .code(400)
      .send({ error: "INVALID_BODY", details: parsed.error.flatten() });
  }

  const ip =
    (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
    (req.socket as any)?.remoteAddress ||
    null;

  const ua = (req.headers["user-agent"] as string) || null;

  const created = await repoCreateComment({
    ...parsed.data,
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
