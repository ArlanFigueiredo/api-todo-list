import { TaskDoesNotExistsError } from '@/error/task/task-does-not-exists-error'
import { UserDoesNotExistsError } from '@/error/user/user-does-not-exists'
import { TaskUpdateModel } from '@/models/task/update'
import { TaskPrismaRepository } from '@/repositories/task/task-prisma-repository'
import { UserPrismaRepository } from '@/repositories/user/user-prisma-repositoruy'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function updateTasks(req: FastifyRequest, res: FastifyReply) {
  const userRepostory = new UserPrismaRepository()
  const taskRepository = new TaskPrismaRepository()
  const taskUpdateModel = new TaskUpdateModel(userRepostory, taskRepository)

  const updateParamsSchema = z.object({
    id: z.coerce.string(),
    user_id: z.coerce.string(),
  })

  const updateBodySchema = z.object({
    name: z.coerce.string(),
    description: z.coerce.string(),
    complete: z.coerce.boolean().default(false),
  })

  const { id, user_id } = updateParamsSchema.parse(req.params)
  const { name, description, complete } = updateBodySchema.parse(req.body)

  try {
    const task = await taskUpdateModel.update({
      id,
      user_id,
      name,
      description,
      complete,
    })
    return res.status(201).send({
      message: 'Successfully in atualized task',
      task,
    })
  } catch (error) {
    if (
      error instanceof TaskDoesNotExistsError ||
      error instanceof UserDoesNotExistsError
    ) {
      return res.status(404).send({
        message: error.message,
      })
    }
  }
  return res.status(500).send()
}
