import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface FindByCharacteristicsRequest {
  age?: string
  energy?: number
  independence?: string
  size?: string
  city: string
}

interface FindByCharacteristicsResponse {
  pets: Pet[]
}

export class FindByCharacteristics {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    age,
    energy,
    independence,
    size,
    city,
  }: FindByCharacteristicsRequest): Promise<FindByCharacteristicsResponse> {
    const pets = await this.petsRepository.findByCharacteristics({
      age,
      energy,
      independence,
      size,
      city,
    })

    return {
      pets,
    }
  }
}
