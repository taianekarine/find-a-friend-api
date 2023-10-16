import { expect, describe, it } from 'vitest'
import { InMemoryOrgRepositories } from '@/repositories/in-memory/in-memory-orgs-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Authenticate Org Use Case', () => {
  it('should be able authenticate', async () => {
    const orgsRepository = new InMemoryOrgRepositories()
    const sut = new AuthenticateUseCase(orgsRepository)

    await orgsRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
      address: 'Rua Aparecida Gonçalves da Silva, 152',
      cep: '38414-669',
      whatsappNumber: '(34) 99630-5110',
    })

    const { org } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    const orgsRepository = new InMemoryOrgRepositories()
    const sut = new AuthenticateUseCase(orgsRepository)

    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const orgsRepository = new InMemoryOrgRepositories()
    const sut = new AuthenticateUseCase(orgsRepository)

    await orgsRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
      address: 'Rua Aparecida Gonçalves da Silva, 152',
      cep: '38414-669',
      whatsappNumber: '(34) 99630-5110',
    })

    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
