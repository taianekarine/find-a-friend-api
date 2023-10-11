import { FastifyInstance } from 'fastify'
import { Register } from './controllers/register'

export const AppRoutes = async (app: FastifyInstance) => {
  app.post('/orgs', Register)
}
