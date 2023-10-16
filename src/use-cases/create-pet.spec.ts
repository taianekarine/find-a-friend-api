import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { CreatePetUseCase } from './create-pet'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsAdoptionRequerimentsRepository } from '@/repositories/in-memory/in-memory-pets-adoption-requirements-repository'

describe('Create Pet Use Case', () => {
  let petsRepository: InMemoryPetsRepository
  let orgsRepository: InMemoryOrgsRepository
  let petsAdoptionRequirementsRepository: InMemoryPetsAdoptionRequerimentsRepository
  let sut: CreatePetUseCase

  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    petsAdoptionRequirementsRepository =
      new InMemoryPetsAdoptionRequerimentsRepository()
    sut = new CreatePetUseCase(
      petsRepository,
      orgsRepository,
      petsAdoptionRequirementsRepository,
    )
  })

  it('should be able to create pet', async () => {
    await orgsRepository.create({
      id: 'org-01',
      name: 'Org Example',
      email: 'org1@example.com',
      password_hash: '123456',
      address: 'address',
      cep: '38414-669',
      whatsappNumber: '(34) 99630-5110',
    })

    const petData = {
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
      petId: 'pet-01',
      adoptionRequirements: '["",""]',
      requeriment: 'Example Requirement',
    }

    const pet = await sut.execute(petData)

    expect(pet).toBeDefined()
    expect(pet.pet.id).toEqual(expect.any(String))
  })
})
