import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export const create = async (req: FastifyRequest, reply: FastifyReply) => {
  const getOrgIdParamsSchema = z.object({
    orgId: z.string().uuid(),
  })

  const createPetBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    city: z.string(),
    age: z.string(),
    energy: z.number(),
    size: z.string(),
    independence: z.string(),
    type: z.string(),
    photo: z.string(),
    orgId: z.string(),
    petId: z.string(),
    adoptionRequirements: z.string(),
  })

  const { orgId } = getOrgIdParamsSchema.parse(req.params)
  const {
    name,
    description,
    city,
    age,
    energy,
    size,
    independence,
    type,
    photo,
    petId,
    adoptionRequirements,
  } = createPetBodySchema.parse(req.body)

  try {
    const createPetUseCase = makeCreatePetUseCase()

    const { pet } = await createPetUseCase.execute({
      name,
      description,
      city,
      age,
      energy,
      size,
      independence,
      type,
      photo,
      orgId,
      petId,
      adoptionRequirements,
    })

    return reply.status(201).send({
      pet,
    })
  } catch (err) {
    if (err) {
      return reply.status(409).send('Unable to register pet.')
    }

    return reply.status(500).send()
  }
}
