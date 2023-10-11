import { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { z } from 'zod'

export const Register = async (req: FastifyRequest, reply: FastifyReply) => {
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

  const password_hash = await hash(password, 6)

  const orgWithSameEmail = await prisma.org.findUnique({
    where: {
      email,
    },
  })

  if (orgWithSameEmail) {
    return reply.status(409).send()
  }

  await prisma.org.create({
    data: {
      name,
      email,
      password_hash,
      address,
      cep,
      whatsappNumber,
    },
  })

  return reply.status(201).send()
}
