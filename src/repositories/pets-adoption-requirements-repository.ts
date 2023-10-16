import { AdoptionRequirements, Prisma } from '@prisma/client'

export interface PetsAdoptionRequirementsRepository {
  create(
    data: Prisma.AdoptionRequirementsUncheckedCreateInput,
  ): Promise<AdoptionRequirements>
}
