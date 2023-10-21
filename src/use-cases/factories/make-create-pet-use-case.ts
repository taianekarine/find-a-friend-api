import { CreatePetUseCase } from '../create-pet'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { PrismaPetGalleryRepository } from '@/repositories/prisma/prisma-pet-gallery-repository'
import { PrismaPetsAdoptionRequerimentsRepository } from '@/repositories/prisma/prisma-pets-adoption-requirements-repository'

export const makeCreatePetUseCase = () => {
  const petsRepository = new PrismaPetsRepository()
  const orgsRepository = new PrismaOrgsRepository()
  const petsAdoptionRequirementsRepository =
    new PrismaPetsAdoptionRequerimentsRepository()
  const petsGallery = new PrismaPetGalleryRepository()

  const useCase = new CreatePetUseCase(
    petsRepository,
    orgsRepository,
    petsGallery,
    petsAdoptionRequirementsRepository,
  )

  return useCase
}
