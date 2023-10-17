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
      email: 'org@example.com',
      password_hash: '123456',
      address: 'address',
      cep: '99999-999',
      whatsappNumber: '(99) 99999-9999',
    })

    const createdPet = await sut.execute({
      name: 'Test Pet',
      description: 'Test description',
      city: 'Test City',
      age: '2 years',
      energy: 4,
      size: 'Medium',
      independence: 'High',
      type: 'Dog',
      photo: 'test-photo-url',
      orgId: 'org-id',
      petId: 'pet-id',
      adoptionRequirements: JSON.stringify(['Requirement 1', 'Requirement 2']),
    })

    expect(createdPet).toBeDefined()
    expect(createdPet.pet.id).toEqual(expect.any(String))
  })

  it('should create a new pet and adoption requirements', async () => {
    const createdPet = {
      name: 'Test Pet',
      description: 'Test description',
      city: 'Test City',
      age: '2 years',
      energy: 4,
      size: 'Medium',
      independence: 'High',
      type: 'Dog',
      photo: 'test-photo-url',
      orgId: 'org-id',
      petId: 'pet-id',
      adoptionRequirements: JSON.stringify(['Requirement 1', 'Requirement 2']),
    }

    const parsedRequirements = JSON.parse(createdPet.adoptionRequirements)

    parsedRequirements.forEach((requirement: string) => {
      const adoptionRequirements = petsAdoptionRequirementsRepository.create({
        title: requirement,
        pet_id: createdPet.petId,
      })
      expect(adoptionRequirements).toBeDefined()
    })
  })
})
