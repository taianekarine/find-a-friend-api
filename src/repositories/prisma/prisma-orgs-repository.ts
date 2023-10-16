import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'

export class PrismaOrgRepository implements OrgsRepository {
  async findById(orgId: string) {
    const org = await prisma.org.findUnique({
      where: {
        id: orgId,
      },
    })

    return org
  }

  async findByCep(cep: string) {
    const org = await prisma.org.findFirst({
      where: {
        cep,
      },
    })

    return org
  }

  async findByEmail(email: string) {
    const org = await prisma.org.findUnique({
      where: {
        email,
      },
    })

    return org
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({
      data,
    })

    return org
  }
}
