import { GetOrgProfileUseCase } from '../get-org-profile'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'

export const makeGetPetProfile = () => {
  const orgsRepository = new PrismaOrgsRepository()
  const useCase = new GetOrgProfileUseCase(orgsRepository)

  return useCase
}
