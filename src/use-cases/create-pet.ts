import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { PetsRepository } from '@/repositories/pets-repository'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { InvalidRequerimentRequiredError } from './errors/invalid-requeriment-required'
import { PetsAdoptionRequirementsRepository } from '@/repositories/pets-adoption-requirements-repository'
import { InvalidImageRequiredError } from './errors/invalid-image-required'
import { PetGalleryRepository } from '@/repositories/pet-gallery-repositoy'

interface Filename {
  filename: string
  filepath: string
  type: string
  tasks: null
  id: string
}
interface CreatePetUseCaseRequest {
  name: string
  age: string
  size: string
  type: string
  city: string
  orgId: string
  petId: string
  energy: number
  description: string
  independence: string
  images: Filename[]
  photo: string
  adoptionRequirements: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
    private petGalleryRepository: PetGalleryRepository,
    private petsAdoptionRequirementsRepository: PetsAdoptionRequirementsRepository,
  ) {}

  async execute({
    name,
    age,
    size,
    type,
    city,
    orgId,
    petId,
    energy,
    images,
    description,
    independence,
    adoptionRequirements,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const org_Id = await this.orgsRepository.findById(orgId)

    if (!org_Id) {
      throw new ResourceNotFoundError()
    }

    const parsedRequirements = JSON.parse(adoptionRequirements)
    const checkRequerimentLength = parsedRequirements.length <= 0

    if (checkRequerimentLength) {
      throw new InvalidRequerimentRequiredError()
    }

    parsedRequirements.forEach(async (requirement: string) => {
      await this.petsAdoptionRequirementsRepository.create({
        title: requirement,
        pet_id: petId,
      })
    })

    const petPhoto = images[0].filename
    const noImages = !images || images.length === 0

    if (noImages) {
      throw new InvalidImageRequiredError()
    }

    for (const image of images) {
      if (image.filename) {
        await this.petGalleryRepository.create({
          image: image.filename,
          pet_id: petId,
        })
      } else {
        throw new InvalidImageRequiredError()
      }
    }

    const pet = await this.petsRepository.create({
      name,
      age,
      size,
      type,
      city,
      photo: petPhoto,
      org_id: orgId,
      energy,
      description,
      independence,
    })

    return {
      pet,
    }
  }
}
