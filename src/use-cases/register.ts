import { OrgsRepository } from '@/repositories/orgs-repository'
import { hash } from 'bcryptjs'
import { OrgsAlreadyExistsError } from './errors/orgs-already-exists-error'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
  address: string
  cep: string
  whatsappNumber: string
}

export class RegisterUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    name,
    email,
    password,
    address,
    cep,
    whatsappNumber,
  }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6)

    const orgWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new OrgsAlreadyExistsError()
    }

    await this.orgsRepository.create({
      name,
      email,
      password_hash,
      address,
      cep,
      whatsappNumber,
    })
  }
}
