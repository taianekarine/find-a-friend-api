import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { PetsRepository } from '@/repositories/pets-repository'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { InvalidRequerimentRequiredError } from './errors/invalid-requeriment-required'
import { PetsAdoptionRequirementsRepository } from '@/repositories/pets-adoption-requirements-repository'

interface CreatePetUseCaseRequest {
  name: string
  description: string
  city: string
  age: string
  energy: number
  size: string
  independence: string
  type: string
  photo: string
  orgId: string
  petId: string
  adoptionRequirements: string
  requeriment: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
    private petsAdoptionRequirementsRepository: PetsAdoptionRequirementsRepository,
  ) {}

  async execute({
    name,
    description,
    city,
    age,
    energy,
    size,
    independence,
    type,
    photo,
    orgId,
    petId,
    adoptionRequirements,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const org_Id = await this.orgsRepository.findById(orgId)

    if (org_Id) {
      throw new ResourceNotFoundError()
    }

    const parsedRequirement = JSON.parse(adoptionRequirements)

    const checkRequerimentLength = parsedRequirement.length <= 0

    if (checkRequerimentLength) {
      throw new InvalidRequerimentRequiredError()
    }

    const org_Cep = await this.orgsRepository.findByCep(city)

    if (org_Cep) {
      throw new ResourceNotFoundError()
    }

    const pet = await this.petsRepository.create({
      name,
      age,
      city,
      description,
      energy: Number(energy),
      independence,
      photo,
      size,
      type,
      org_id: orgId,
    })

    for await (const requirement of parsedRequirement) {
      await this.petsAdoptionRequirementsRepository.create({
        title: requirement,
        pet_id: petId,
      })
    }

    return {
      pet,
    }
  }
}
