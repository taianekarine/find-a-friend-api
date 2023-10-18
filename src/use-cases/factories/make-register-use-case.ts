import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { RegisterUseCase } from '../register'

export const makeRegisterUseCase = () => {
  const orgsRepository = new PrismaOrgsRepository()
  const useCase = new RegisterUseCase(orgsRepository)

  return useCase
}
