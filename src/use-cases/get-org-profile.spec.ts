import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { expect, describe, it, beforeEach } from 'vitest'
import { GetOrgProfileUseCase } from './get-org-profile'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

let orgsRepository: InMemoryOrgsRepository
let sut: GetOrgProfileUseCase

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new GetOrgProfileUseCase(orgsRepository)
  })

  it('should be able to get org profile', async () => {
    const createdOrg = await orgsRepository.create({
      name: 'Org Example',
      email: 'org1@example.com',
      password_hash: '123456',
      address: 'address',
      cep: '38414-669',
      whatsappNumber: '(34) 99630-5110',
    })

    const { org } = await sut.execute({
      orgId: createdOrg.id,
    })

    expect(org.name).toEqual('Org Example')
  })

  it('should not be able to get org profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        orgId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
