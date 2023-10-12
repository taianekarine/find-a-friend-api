import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { registerUseCase } from '@/use-cases/register'

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
    await registerUseCase({
      name,
      email,
      password,
      address,
      cep,
      whatsappNumber,
    })
  } catch (err) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
