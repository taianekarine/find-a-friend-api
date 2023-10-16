import { PrismaOrgRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { RegisterUseCase } from '../register'

export const makeRegisterUseCase = () => {
  const orgsRepository = new PrismaOrgRepository()
  const registerUseCase = new RegisterUseCase(orgsRepository)

  return registerUseCase
}
