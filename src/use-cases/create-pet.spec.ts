// import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { expect, describe, it, beforeEach } from 'vitest'
// import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { CreatePetUseCase } from './create-pet'

let petsRepository: InMemoryPetsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new CreatePetUseCase(petsRepository)
  })

  it('should be able to create pet', async () => {
    const { petData } = await sut.execute({
      name: 'Pet example',
      description: 'Pet description',
      city: 'Uberlândia',
      age: 'cub',
      energy: 2,
      size: 'medium',
      independence: 'low',
      type: 'cat',
      photo: 'cat-photo-example.png',
      orgId: 'org-01',
    })

    console.log(petData)
    expect(petData.id).toEqual(expect.any(String))
  })
})
