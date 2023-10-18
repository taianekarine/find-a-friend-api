import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeFindByCharacteristicsUseCase } from '@/use-cases/factories/make-find-by-characteristics-use-case'

export const findByCharacteristics = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  const searchPetsQuerySchema = z.object({
    age: z.string(),
    energy: z.number(),
    independence: z.string(),
    size: z.string(),
    city: z.string(),
  })

  const { age, energy, independence, size, city } = searchPetsQuerySchema.parse(
    req.query,
  )

  const findByCharacteristicsUseCase = makeFindByCharacteristicsUseCase()

  const { pets } = await findByCharacteristicsUseCase.execute({
    age,
    energy,
    independence,
    size,
    city,
  })

  return reply.status(200).send({
    pets,
  })
}
