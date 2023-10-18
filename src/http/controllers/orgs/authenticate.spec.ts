import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await request(app.server).post('/orgs').send({
      name: 'Org Test',
      email: 'orgtest@example.com',
      password: '123456',
      address: 'Address Test',
      cep: '99999-999',
      whatsappNumber: '(99) 99999-9999',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'orgtest@example.com',
      password: '123456',
    })

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
