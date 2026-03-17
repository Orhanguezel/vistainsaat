import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { requireAuth } from '@/common/middleware/auth';
import { requireAdmin } from '@/common/middleware/roles';
import {
  listServicesAdmin,
  getServiceAdmin,
  createServiceAdmin,
  updateServiceAdmin,
  removeServiceAdmin,
  reorderServicesAdmin,
} from './admin.controller';

export async function registerServicesAdmin(app: FastifyInstance) {
  const adminGuard = async (req: FastifyRequest, reply: FastifyReply) => {
    await requireAuth(req, reply);
    if (reply.sent) return;
    await requireAdmin(req, reply);
  };

  app.get('/services', { preHandler: adminGuard }, listServicesAdmin);
  app.get('/services/:id', { preHandler: adminGuard }, getServiceAdmin);
  app.post('/services', { preHandler: adminGuard }, createServiceAdmin);
  app.patch('/services/:id', { preHandler: adminGuard }, updateServiceAdmin);
  app.delete('/services/:id', { preHandler: adminGuard }, removeServiceAdmin);
  app.post('/services/reorder', { preHandler: adminGuard }, reorderServicesAdmin);
}
