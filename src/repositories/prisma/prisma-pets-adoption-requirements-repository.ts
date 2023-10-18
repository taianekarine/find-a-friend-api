import { AdoptionRequirements, Prisma } from '@prisma/client'
import { PetsAdoptionRequirementsRepository } from '../pets-adoption-requirements-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsAdoptionRequerimentsRepository
  implements PetsAdoptionRequirementsRepository
{
  public items: AdoptionRequirements[] = []

  async create(
    data: Prisma.AdoptionRequirementsUncheckedCreateInput,
  ): Promise<AdoptionRequirements> {
    const adoptionRequirements = await prisma.adoptionRequirements.create({
      data,
    })

    return adoptionRequirements
  }
}
