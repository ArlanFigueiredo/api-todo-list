import { UserRegisterModel } from '@/models/user/register'
import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { hash } from 'bcrypt'
import { UserAlredyExistsError } from '@/error/user/user-alredy-exists-error'
import { UserPrismaRepository } from '@/repositories/user/user-prisma-repositoruy'
export async function registerUser(req: FastifyRequest, res: FastifyReply) {
  const userRepository = new UserPrismaRepository()
  const userRegisterModel = new UserRegisterModel(userRepository)

  const registerBodySchema = z.object({
    name: z.coerce.string(),
    email: z.coerce.string().email(),
    password: z.coerce.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(req.body)
  const password_hash = await hash(password, 8)

  try {
    const user = await userRegisterModel.create({
      name,
      email,
      password: password_hash,
    })
    return res.status(201).send({
      message: 'Created user successfully!',
      user,
    })
  } catch (error) {
    if (error instanceof UserAlredyExistsError) {
      return res.status(409).send({
        message: error.message,
      })
    }
  }
  return res.status(500).send()
}
