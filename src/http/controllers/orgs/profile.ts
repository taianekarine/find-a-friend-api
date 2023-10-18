import { makeGetOrgProfileUseCase } from '@/use-cases/factories/make-get-org-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export const profile = async (req: FastifyRequest, reply: FastifyReply) => {
  const getUserProfile = makeGetOrgProfileUseCase()

  const { org } = await getUserProfile.execute({
    orgId: req.user.sub,
  })

  return reply.status(200).send({
    org: {
      ...org,
      password_hash: undefined,
    },
  })
}
