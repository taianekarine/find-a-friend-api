import { profile } from './profile'
import { register } from './register'
import { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'
import { verifyJwt } from '@/http/middlewares/verify-jwt'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', register)
  app.post('/sessions', authenticate)

  /** Authenticated */
  app.get('/me', { onRequest: [verifyJwt] }, profile)
}
