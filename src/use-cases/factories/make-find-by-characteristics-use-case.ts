import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FindByCharacteristics } from '../find-by-characteristics'

export const makeGetPetProfile = () => {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new FindByCharacteristics(petsRepository)

  return useCase
}
