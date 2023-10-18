import { makeGetOrgProfile } from '@/use-cases/factories/make-get-org-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export const orgProfile = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const getUserProfile = makeGetOrgProfile()

  const { org } = await getUserProfile.execute({
    orgId: request.user.sub,
  })

  return reply.status(200).send({
    org: {
      ...org,
      password_hash: undefined,
    },
  })
}
