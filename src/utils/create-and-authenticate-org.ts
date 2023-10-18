import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateOrg(app: FastifyInstance) {
  await prisma.org.create({
    data: {
      name: 'Org Test',
      email: 'orgtest@example.com',
      password_hash: await hash('123456', 6),
      address: 'Address Test',
      cep: '99999-999',
      whatsappNumber: '(99) 99999-9999',
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'orgtest@example.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return {
    token,
  }
}
