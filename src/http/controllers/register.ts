import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { RegisterUseCase } from '@/use-cases/register'
import { PrismaOrgRepositories } from '@/repositories/prisma/prisma-orgs-repository'
import { OrgsAlreadyExistsError } from '@/use-cases/errors/orgs-already-exists-error'

export const register = async (req: FastifyRequest, reply: FastifyReply) => {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    address: z.string(),
    cep: z.string(),
    whatsappNumber: z.string(),
  })

  const { name, email, password, address, cep, whatsappNumber } =
    registerBodySchema.parse(req.body)

  try {
    const orgsRepository = new PrismaOrgRepositories()
    const registerUseCase = new RegisterUseCase(orgsRepository)

    await registerUseCase.execute({
      name,
      email,
      password,
      address,
      cep,
      whatsappNumber,
    })
  } catch (err) {
    if (err instanceof OrgsAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    return reply.status(500).send()
  }

  return reply.status(201).send()
}
