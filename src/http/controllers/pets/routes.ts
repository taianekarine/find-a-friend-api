import { create } from './create'
import { search } from './search'
import { profile } from './profile'
import { FastifyInstance } from 'fastify'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { findByCharacteristics } from './findByCharacteristics'

export async function petsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post('/pets', create)
  app.get('/pets/search', search)
  app.get('/pets/profile/:petId', profile)
  app.get('/pets/find-by-characteristics', findByCharacteristics)
}
