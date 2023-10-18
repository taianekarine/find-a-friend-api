import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetPetProfileUseCase } from '@/use-cases/factories/make-get-pet-profile-use-case'

export const profile = async (req: FastifyRequest, reply: FastifyReply) => {
  const getPetProfile = makeGetPetProfileUseCase()

  const getPetIdParamsSchema = z.object({
    petId: z.string().uuid(),
  })

  const { petId } = getPetIdParamsSchema.parse(req.params)

  const { pet } = await getPetProfile.execute({
    petId,
  })

  return reply.status(200).send({
    pet,
  })
}
