import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { PrismaPetsAdoptionRequerimentsRepository } from '@/repositories/prisma/prisma-pets-adoption-requirements-repository'
import { CreatePetUseCase } from '../create-pet'

export const makeCreatePetUseCase = () => {
  const petsRepository = new PrismaPetsRepository()
  const orgsRepository = new PrismaOrgsRepository()
  const petsAdoptionRequirementsRepository =
    new PrismaPetsAdoptionRequerimentsRepository()

  const useCase = new CreatePetUseCase(
    petsRepository,
    orgsRepository,
    petsAdoptionRequirementsRepository,
  )

  return useCase
}
