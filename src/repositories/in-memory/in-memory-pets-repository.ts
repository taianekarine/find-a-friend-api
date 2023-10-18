import { Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { FindByCharacteristicsParams, PetsRepository } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async searchMany(query: string, page: number) {
    return this.items
      .filter((item) => item.city.includes(query))
      .slice((page - 1) * 20, page * 20)
  }

  async findByCharacteristics(params: FindByCharacteristicsParams) {
    return this.items.filter((item) => {
      return (
        item.age === params.age &&
        item.energy === params.energy &&
        item.independence === params.independence &&
        item.size === params.size &&
        item.city === params.city
      )
    })
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
