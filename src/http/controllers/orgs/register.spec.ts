import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const response = await request(app.server).post('/orgs').send({
      name: 'Org',
      email: 'org4@example.com',
      password: '123456',
      address: 'Address',
      cep: '99999-999',
      whatsappNumber: '(99) 99999-9999',
    })

    expect(response.statusCode).toEqual(201)
  })
})
