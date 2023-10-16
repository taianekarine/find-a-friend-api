import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryOrgRepositories } from '@/repositories/in-memory/in-memory-orgs-repository'
import { OrgsAlreadyExistsError } from './errors/orgs-already-exists-error'

describe('Registern Org Use Case', () => {
  it('should be able register', async () => {
    const orgsRepository = new InMemoryOrgRepositories()
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
    const orgsRepository = new InMemoryOrgRepositories()
    const registerUseCase = new RegisterUseCase(orgsRepository)

    const { org } = await registerUseCase.execute({
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
    const orgsRepository = new InMemoryOrgRepositories()
    const registerUseCase = new RegisterUseCase(orgsRepository)

    const email = 'johndoe@example.com'

    await registerUseCase.execute({
      name: 'John Doe',
      email,
      password: '123456',
      address: 'Rua Aparecida Gonçalves da Silva, 152',
      cep: '38414-669',
      whatsappNumber: '(34) 99630-5110',
    })

    await expect(() =>
      registerUseCase.execute({
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
