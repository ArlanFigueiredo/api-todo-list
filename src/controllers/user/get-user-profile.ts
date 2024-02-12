import { InvalidCredentialsError } from '@/error/user/user-invalid-credentials-error'
import { GetUserProfileModel } from '@/models/user/get-user-profile'
import { UserPrismaRepository } from '@/repositories/user/user-prisma-repositoruy'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getUserProfile(req: FastifyRequest, res: FastifyReply) {
  const userRepository = new UserPrismaRepository()
  const getUserProfile = new GetUserProfileModel(userRepository)

  const getBodySchema = z.object({
    email: z.coerce.string().email(),
    password: z.coerce.string().min(6),
  })

  const { email, password } = getBodySchema.parse(req.body)

  try {
    const { user } = await getUserProfile.getUserProfile({
      email,
      password,
    })

    const token = await res.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      },
    )

    return res.status(200).send({
      message: 'User authenticate successfully.',
      token,
    })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return res.status(409).send({
        message: error.message,
      })
    }
  }
  return res.status(500).send()
}
