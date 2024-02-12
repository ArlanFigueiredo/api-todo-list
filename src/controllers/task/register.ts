import { UserDoesNotExistsError } from '@/error/user/user-does-not-exists'
import { makeRegister } from '@/models/task/factories/make-register'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerTask(req: FastifyRequest, res: FastifyReply) {
  const makeRegisterTask = makeRegister()

  const registerBodySchemaUserId = z.object({
    user_id: z.coerce.string(),
  })

  const registerBodySchema = z.object({
    name: z.coerce.string(),
    description: z.coerce.string(),
    complete: z.boolean().default(false),
  })

  const { user_id } = registerBodySchemaUserId.parse(req.params)
  const { name, description, complete } = registerBodySchema.parse(req.body)

  try {
    const result = await makeRegisterTask.create({
      user_id,
      name,
      description,
      complete,
    })
    return res.status(201).send({
      message: 'Created taks successfully.',
      result,
    })
  } catch (error) {
    console.log(error)
    if (error instanceof UserDoesNotExistsError) {
      return res.status(409).send({
        message: error.message,
      })
    }
  }
  return res.status(500).send()
}
