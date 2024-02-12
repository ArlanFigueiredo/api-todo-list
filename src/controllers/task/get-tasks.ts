import { TaskDoesNotExistsError } from '@/error/task/task-does-not-exists-error'
import { UserDoesNotExistsError } from '@/error/user/user-does-not-exists'
import { GetTasksModel } from '@/models/task/get-tasks'
import { TaskPrismaRepository } from '@/repositories/task/task-prisma-repository'
import { UserPrismaRepository } from '@/repositories/user/user-prisma-repositoruy'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getTasks(req: FastifyRequest, res: FastifyReply) {
  const userRepository = new UserPrismaRepository()
  const taskRepository = new TaskPrismaRepository()
  const getTasksModel = new GetTasksModel(taskRepository, userRepository)

  const getParamsSchema = z.object({
    user_id: z.coerce.string(),
  })

  const { user_id } = getParamsSchema.parse(req.params)

  try {
    const tasks = await getTasksModel.getTasks(user_id)

    return res.status(200).send({
      tasks,
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
