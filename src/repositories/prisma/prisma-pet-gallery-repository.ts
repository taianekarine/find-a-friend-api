import { PetGallery, Prisma } from '@prisma/client'
import { PetGalleryRepository } from '../pet-gallery-repositoy'
import { prisma } from '@/lib/prisma'

export class PrismaPetGalleryRepository implements PetGalleryRepository {
  public items: PetGallery[] = []

  async create(
    data: Prisma.PetGalleryUncheckedCreateInput,
  ): Promise<PetGallery> {
    const petGallery = await prisma.petGallery.create({
      data,
    })

    return petGallery
  }
}
