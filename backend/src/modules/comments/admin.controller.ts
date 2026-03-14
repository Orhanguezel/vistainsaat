// =============================================================
// FILE: src/modules/comments/admin.controller.ts
// =============================================================
import type { FastifyRequest, FastifyReply } from "fastify";
import {
  CommentListParamsSchema,
  CommentUpdateSchema,
} from "./validation";
import {
  repoListComments,
  repoGetCommentById,
  repoUpdateComment,
  repoDeleteComment,
} from "./repository";

type ListReq = FastifyRequest<{ Querystring: unknown }>;
type GetReq = FastifyRequest<{ Params: { id: string } }>;
type UpdateReq = FastifyRequest<{ Params: { id: string }; Body: unknown }>;
type DeleteReq = FastifyRequest<{ Params: { id: string } }>;

export async function listCommentsAdmin(req: ListReq, reply: FastifyReply) {
  const parsed = CommentListParamsSchema.safeParse(req.query);
  if (!parsed.success) {
    return reply
      .code(400)
      .send({ error: "INVALID_QUERY", details: parsed.error.flatten() });
  }

  const list = await repoListComments(parsed.data);
  return reply.send(list);
}

export async function getCommentAdmin(req: GetReq, reply: FastifyReply) {
  const row = await repoGetCommentById(req.params.id);
  if (!row) return reply.code(404).send({ error: "NOT_FOUND" });
  return reply.send(row);
}

export async function updateCommentAdmin(
  req: UpdateReq,
  reply: FastifyReply,
) {
  const parsed = CommentUpdateSchema.safeParse(req.body);
  if (!parsed.success) {
    return reply
      .code(400)
      .send({ error: "INVALID_BODY", details: parsed.error.flatten() });
  }

  const updated = await repoUpdateComment(req.params.id, parsed.data);
  if (!updated) return reply.code(404).send({ error: "NOT_FOUND" });
  return reply.send(updated);
}

export async function removeCommentAdmin(req: DeleteReq, reply: FastifyReply) {
  const ok = await repoDeleteComment(req.params.id);
  return reply.send({ ok });
}
