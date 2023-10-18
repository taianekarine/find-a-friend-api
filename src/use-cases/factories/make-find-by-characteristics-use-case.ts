import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FindByCharacteristicsUseCase } from '../find-by-characteristics'

export const makeFindByCharacteristicsUseCase = () => {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new FindByCharacteristicsUseCase(petsRepository)

  return useCase
}
