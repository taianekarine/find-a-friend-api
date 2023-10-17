import { Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { PetsRepository } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      description: data.description,
      city: data.city,
      age: data.age,
      energy: data.energy,
      size: data.size,
      independence: data.independence,
      type: data.type,
      photo: data.photo,
      org_id: data.org_id,
      created_at: new Date(),
      pets: data.pets,
      adoptionRequirements: data.adoptionRequirements,
    }

    this.items.push(pet)

    return pet
  }
}
