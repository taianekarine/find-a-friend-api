import { Pet } from '@prisma/client'
// import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { PetsRepository } from '@/repositories/pets-repository'

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
}

interface CreatePetUseCaseResponse {
  petData: Pet
}

export class CreatePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

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
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const petData = await this.petsRepository.create({
      name,
      description,
      city,
      age,
      energy,
      size,
      independence,
      type,
      photo,
      org_id: orgId,
    })

    // if (!org) {
    //   throw new ResourceNotFoundError()
    // }

    return {
      petData,
    }
  }
}
