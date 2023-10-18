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

  it('should be able to search pets by characteristics', async () => {
    const { token, org } = await createAndAuthenticateOrg(app)

    const firstPetData = {
      data: {
        name: 'Pet Name',
        description: 'Pet Description',
        city: 'Pet City 1',
        age: '2 years',
        energy: 2,
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
        age: 'Puppy',
        energy: 4,
        size: 'Low',
        independence: 'High',
        type: 'Dog',
        photo: 'test-photo-url',
        org_id: `${org.id}`,
      },
    }

    await prisma.pet.create(firstPetData)
    await prisma.pet.create(secondPetData)

    const pets = await request(app.server)
      .get('/pets/find-by-characteristics')
      .query({
        city: 'Pet City 2',
        age: 'Puppy',
        energy: 4,
        size: 'Low',
        independence: 'High',
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(pets.statusCode).toEqual(200)
    expect(pets.body.pets).toEqual([
      expect.objectContaining({
        city: 'Pet City 2',
        age: 'Puppy',
        energy: 4,
        size: 'Low',
        independence: 'High',
      }),
    ])
  })
})
