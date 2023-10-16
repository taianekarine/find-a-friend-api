import { AdoptionRequirements, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { PetsAdoptionRequirementsRepository } from '../pets-adoption-requirements-repository'

export class InMemoryPetsAdoptionRequerimentsRepository
  implements PetsAdoptionRequirementsRepository
{
  public items: AdoptionRequirements[] = []

  async create(
    data: Prisma.AdoptionRequirementsUncheckedCreateInput,
  ): Promise<AdoptionRequirements> {
    const adoptionRequirements: AdoptionRequirements = {
      id: randomUUID(),
      title: data.title,
      pet_id: data.pet_id,
    }

    this.items.push(adoptionRequirements)

    return adoptionRequirements
  }
}
