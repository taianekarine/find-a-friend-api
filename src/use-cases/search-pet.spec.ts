import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { SearchPetsUseCase } from './search-pet'

let petsRepository: InMemoryPetsRepository
let sut: SearchPetsUseCase

describe('Search Pets Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    sut = new SearchPetsUseCase(petsRepository)
  })

  it('should be able to search for pets', async () => {
    await petsRepository.create({
      name: 'Test Pet',
      description: 'Test description',
      city: 'Test City 1',
      age: '2 years',
      energy: 4,
      size: 'Medium',
      independence: 'High',
      type: 'Dog',
      photo: 'test-photo-url',
      org_id: 'org-id',
    })

    await petsRepository.create({
      name: 'Test Pet',
      description: 'Test description',
      city: 'Test Exemple City',
      age: '2 years',
      energy: 4,
      size: 'Medium',
      independence: 'High',
      type: 'Dog',
      photo: 'test-photo-url',
      org_id: 'org-id',
    })

    const { pets } = await sut.execute({
      query: 'Test City',
      page: 1,
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ city: 'Test City 1' })])
  })

  it('should be able to fetch paginated pet search', async () => {
    for (let i = 1; i <= 22; i++) {
      await petsRepository.create({
        name: `Test Pet ${i}`,
        description: 'Test description',
        city: `Test City ${i}`,
        age: '2 years',
        energy: 4,
        size: 'Medium',
        independence: 'High',
        type: 'Dog',
        photo: 'test-photo-url',
        org_id: 'org-id',
      })
    }

    const { pets } = await sut.execute({
      query: 'Test City',
      page: 2,
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({ city: 'Test City 21' }),
      expect.objectContaining({ city: 'Test City 22' }),
    ])
  })
})
