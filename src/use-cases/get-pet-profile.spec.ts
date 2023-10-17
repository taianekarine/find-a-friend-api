import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { GetPetProfileUseCase } from './get-pet-profile'

let petsRepository: InMemoryPetsRepository
let sut: GetPetProfileUseCase

describe('Get Pet Profile Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetProfileUseCase(petsRepository)
  })

  it('should be able to get pet profile', async () => {
    const createdPet = await petsRepository.create({
      name: 'Pet example',
      description: 'Pet description',
      city: 'ExampleCity',
      age: 'cub',
      energy: 2,
      size: 'medium',
      independence: 'low',
      type: 'cat',
      photo: 'cat-photo-example.png',
      org_id: 'org-01',
    })

    const { pet } = await sut.execute({
      petId: createdPet.id,
    })

    expect(pet.name).toEqual('Pet example')
  })
})
