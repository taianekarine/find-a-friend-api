import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { FindByCharacteristicsParams, PetsRepository } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async findById(petId: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id: petId,
      },
    })

    return pet
  }

  async searchMany(query: string, page: number) {
    const pet = await prisma.pet.findMany({
      where: {
        city: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return pet
  }

  async findByCharacteristics(params: FindByCharacteristicsParams) {
    const pet = await prisma.pet.findMany({
      where: {
        age: {
          contains: params.age || '',
        },

        energy: params.energy ? { equals: params.energy } : undefined,

        independence: {
          contains: params.independence || '',
        },

        size: {
          contains: params.size || '',
        },

        city: {
          contains: params.city,
        },
      },
    })

    return pet
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })
    return pet
  }
}
