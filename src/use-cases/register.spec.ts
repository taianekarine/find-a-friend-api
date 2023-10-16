import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryOrgRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { OrgsAlreadyExistsError } from './errors/orgs-already-exists-error'

let orgsRepository: InMemoryOrgRepository
let sut: RegisterUseCase

describe('Register Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgRepository()
    sut = new RegisterUseCase(orgsRepository)
  })

  it('should be able register', async () => {
    const orgsRepository = new InMemoryOrgRepository()
    const registerUseCase = new RegisterUseCase(orgsRepository)

    const { org } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      address: 'Rua Aparecida Gonçalves da Silva, 152',
      cep: '38414-669',
      whatsappNumber: '(34) 99630-5110',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should hash org password upon registration', async () => {
    const { org } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      address: 'Rua Aparecida Gonçalves da Silva, 152',
      cep: '38414-669',
      whatsappNumber: '(34) 99630-5110',
    })

    console.log('password_hash =>', org.password_hash)

    const isPasswordCorrectlyHased = await compare('123456', org.password_hash)

    expect(isPasswordCorrectlyHased).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'johndoe@example.com'

    await sut.execute({
      name: 'John Doe',
      email,
      password: '123456',
      address: 'Rua Aparecida Gonçalves da Silva, 152',
      cep: '38414-669',
      whatsappNumber: '(34) 99630-5110',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        password: '123456',
        address: 'Rua Aparecida Gonçalves da Silva, 152',
        cep: '38414-669',
        whatsappNumber: '(34) 99630-5110',
      }),
    ).rejects.toBeInstanceOf(OrgsAlreadyExistsError)
  })
})
