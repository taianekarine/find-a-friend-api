import { prisma } from '@/lib/prisma'
import { PrismaOrgRepositories } from '@/repositories/prisma/prisma-orgs-repository'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
  address: string
  cep: string
  whatsappNumber: string
}

export const registerUseCase = async ({
  name,
  email,
  password,
  address,
  cep,
  whatsappNumber,
}: RegisterUseCaseRequest) => {
  const password_hash = await hash(password, 6)

  const orgWithSameEmail = await prisma.org.findUnique({
    where: {
      email,
    },
  })

  if (orgWithSameEmail) {
    throw new Error('E-mail already exists.')
  }

  const primaOrgsRepoitory = new PrismaOrgRepositories()

  primaOrgsRepoitory.create({
    name,
    email,
    password_hash,
    address,
    cep,
    whatsappNumber,
  })
}
