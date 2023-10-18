import { Pet, Prisma } from '@prisma/client'

export interface FindByCharacteristicsParams {
  age?: string
  energy?: number
  size?: string
  independence?: string
  city: string
}
export interface PetsRepository {
  findById(id: string): Promise<Pet | null>
  findByCharacteristics(params: FindByCharacteristicsParams): Promise<Pet[]>
  searchMany(query: string, page: number): Promise<Pet[]>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
