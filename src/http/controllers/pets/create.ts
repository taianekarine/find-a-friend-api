import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { File } from 'fastify-multer/lib/interfaces'

declare module 'fastify' {
  export interface FastifyRequest {
    files: File[]
  }
}

interface Filename {
  filename: string
  filepath?: string
  type?: string
  tasks?: null
  id?: string
}

export const create = async (req: FastifyRequest, reply: FastifyReply) => {
  const getOrgIdParamsSchema = z.object({
    orgId: z.string().uuid(),
  })

  const createPetBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    city: z.string(),
    age: z.string(),
    energy: z.string(),
    size: z.string(),
    independence: z.string(),
    type: z.string(),
    photo: z.string(),
    adoptionRequirements: z.string(),
  })

  const { orgId } = getOrgIdParamsSchema.parse(req.user.sub)
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
    adoptionRequirements,
  } = createPetBodySchema.parse(req.body)

  try {
    const createPetUseCase = makeCreatePetUseCase()

    const images: Filename[] = req.files.map((file) => ({
      filename: file.filename ?? '', // Ensure filename is not undefined
    }))

    const { pet } = await createPetUseCase.execute({
      name,
      age,
      size,
      type,
      city,
      orgId,
      energy,
      description,
      independence,
      adoptionRequirements,
      images,
      photo,
    })

    return reply.status(201).send({
      pet,
    })
  } catch (err) {
    if (err) {
      console.log(err)
      return reply.status(409).send('Unable to register pet.')
    }

    return reply.status(500).send()
  }
}
