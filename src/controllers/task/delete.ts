import { TaskDoesNotExistsError } from '@/error/task/task-does-not-exists-error'
import { UserDoesNotExistsError } from '@/error/user/user-does-not-exists'
import { TaskDeleteModel } from '@/models/task/delete'
import { TaskPrismaRepository } from '@/repositories/task/task-prisma-repository'
import { UserPrismaRepository } from '@/repositories/user/user-prisma-repositoruy'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function deleteTask(req: FastifyRequest, res: FastifyReply) {
  const userRepository = new UserPrismaRepository()
  const taskRepository = new TaskPrismaRepository()
  const taskDeleteModel = new TaskDeleteModel(userRepository, taskRepository)

  const deleteParamsSchema = z.object({
    id: z.coerce.string(),
    user_id: z.coerce.string(),
  })

  const { id, user_id } = deleteParamsSchema.parse(req.params)

  try {
    await taskDeleteModel.deleteTask({
      id,
      user_id,
    })
    return res.status(201).send({
      message: 'Task deleted successfully!',
    })
  } catch (error) {
    if (
      error instanceof UserDoesNotExistsError ||
      error instanceof TaskDoesNotExistsError
    ) {
      return res.status(404).send({
        message: error.message,
      })
    }
  }
  return res.status(500).send()
}
