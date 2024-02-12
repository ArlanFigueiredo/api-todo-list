import { UserDoesNotExistsError } from '@/error/user/user-does-not-exists'
import { Authenticate } from '@/models/user/authenticate-user'
import { UserPrismaRepository } from '@/repositories/user/user-prisma-repositoruy'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function profile(req: FastifyRequest, res: FastifyReply) {
  const userRepository = new UserPrismaRepository()
  const authenticate = new Authenticate(userRepository)

  try {
    const { user } = await authenticate.findById(req.user.sub)
    return res.status(201).send({
      user: {
        ...user,
        password: undefined,
      },
    })
  } catch (error) {
    if (error instanceof UserDoesNotExistsError) {
      return res.status(404).send({
        message: error.message,
      })
    }
  }
}
