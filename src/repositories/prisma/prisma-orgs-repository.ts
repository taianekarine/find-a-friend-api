import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export class PrismaOrgRepositories {
  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({
      data,
    })

    return org
  }
}
