import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { FindByCharacteristics } from './find-by-characteristics'

let petsRepository: InMemoryPetsRepository
let sut: FindByCharacteristics

describe('Find Pets Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    sut = new FindByCharacteristics(petsRepository)
  })

  it('should return pets with the specified characteristics in a city', async () => {
    await petsRepository.create({
      name: 'Test Pet',
      description: 'Test description',
      city: 'City Test - CT',
      age: 'Adult',
      energy: 4,
      size: 'Small',
      independence: 'High',
      type: 'Dog',
      photo: 'test-photo-url',
      org_id: 'org-id',
    })

    await petsRepository.create({
      name: 'Test Pet',
      description: 'Test description',
      city: 'City Test - CT',
      age: 'Puppy',
      energy: 4,
      size: 'Small',
      independence: 'High',
      type: 'Dog',
      photo: 'test-photo-url',
      org_id: 'org-id',
    })

    const { pets } = await sut.execute({
      city: 'City Test - CT',
      age: 'Puppy',
      energy: 4,
      size: 'Small',
      independence: 'High',
    })

    expect(pets).toEqual([
      expect.objectContaining({
        city: 'City Test - CT',
        age: 'Puppy',
        energy: 4,
        size: 'Small',
        independence: 'High',
      }),
    ])
  })
})
