import { FastifyInstance } from 'fastify'
import { register } from './controllers/register'
import { authenticate } from './controllers/orgs/authenticate'
import { orgProfile } from './controllers/orgs/org-profile'
import { verifyJwt } from './middlewares/verify-jwt'

export const appRoutes = async (app: FastifyInstance) => {
  app.post('/orgs', register)
  app.post('/sessions', authenticate)

  app.get('/me', { onRequest: [verifyJwt] }, orgProfile)
}
