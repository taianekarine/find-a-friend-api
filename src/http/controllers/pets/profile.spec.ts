import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'
import { prisma } from '@/lib/prisma'

describe('Profile Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get user profile', async () => {
    const { token, org } = await createAndAuthenticateOrg(app)

    const petData = {
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

    const pet = await prisma.pet.create(petData)

    console.log(pet)
    const profileResponse = await request(app.server)
      .get(`/pets/profile/${pet.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(profileResponse.statusCode).toEqual(200)
    expect(profileResponse.body.pet).toEqual(
      expect.objectContaining({
        id: `${pet.id}`,
      }),
    )
  })
})
