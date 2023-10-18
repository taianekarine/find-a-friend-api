import { randomUUID } from 'node:crypto'
import { PetGallery, Prisma } from '@prisma/client'
import { PetGalleryRepository } from '../pet-gallery-repositoy'

export class InMemoryPetGalleryRepository implements PetGalleryRepository {
  public items: PetGallery[] = []

  async create(
    data: Prisma.PetGalleryUncheckedCreateInput,
  ): Promise<PetGallery> {
    const petGallery = {
      id: randomUUID(),
      image: data.image,
      pet_id: data.pet_id,
    }

    this.items.push(petGallery)

    return petGallery
  }
}
