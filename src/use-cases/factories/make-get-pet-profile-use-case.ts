import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetPetProfileUseCase } from '../get-pet-profile'

export const makeGetPetProfileUseCase = () => {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new GetPetProfileUseCase(petsRepository)

  return useCase
}
