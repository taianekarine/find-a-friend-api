import { FastifyInstance } from 'fastify'
import { register } from './controllers/register'
import { authenticate } from './controllers/authenticate'

export const appRoutes = async (app: FastifyInstance) => {
  app.post('/orgs', register)
  app.post('/sessions', authenticate)
}
