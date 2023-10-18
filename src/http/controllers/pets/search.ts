import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeSearchPetUseCase } from '@/use-cases/factories/make-search-pet-use-case'

export const search = async (req: FastifyRequest, reply: FastifyReply) => {
  const searchPetsQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { q, page } = searchPetsQuerySchema.parse(req.query)

  const searchPetsUseCase = makeSearchPetUseCase()

  const { pets } = await searchPetsUseCase.execute({
    query: q,
    page,
  })

  return reply.status(200).send({
    pets,
  })
}
