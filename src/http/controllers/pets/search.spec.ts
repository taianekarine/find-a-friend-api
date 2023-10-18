import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'
import { prisma } from '@/lib/prisma'

describe('Search Pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search pets by city', async () => {
    const { token, org } = await createAndAuthenticateOrg(app)

    const firstPetData = {
      data: {
        name: 'Pet Name',
        description: 'Pet Description',
        city: 'Pet City 1',
        age: '2 years',
        energy: 4,
        size: 'Medium',
        independence: 'High',
        type: 'Dog',
        photo: 'test-photo-url',
        org_id: `${org.id}`,
      },
    }

    const secondPetData = {
      data: {
        name: 'Pet Name',
        description: 'Pet Description',
        city: 'Pet City 2',
        age: '2 years',
        energy: 4,
        size: 'Medium',
        independence: 'High',
        type: 'Dog',
        photo: 'test-photo-url',
        org_id: `${org.id}`,
      },
    }

    await prisma.pet.create(firstPetData)
    await prisma.pet.create(secondPetData)

    const response = await request(app.server)
      .get('/pets/search')
      .query({
        q: 'Pet City 2',
        page: 1,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(1)
    expect(response.body.pets).toEqual([
      expect.objectContaining({
        city: 'Pet City 2',
      }),
    ])
  })
})
