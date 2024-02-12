import { Task } from '@prisma/client'
import { TaskPrismaRepository } from '@/repositories/task/task-prisma-repository'
import { UserPrismaRepository } from '@/repositories/user/user-prisma-repositoruy'
import { UserDoesNotExistsError } from '@/error/user/user-does-not-exists'
import { TaskDoesNotExistsError } from '@/error/task/task-does-not-exists-error'

interface GetTasksModelResponse {
  tasks: Task[] | null
}

export class GetTasksModel {
  constructor(
    private taskRepository: TaskPrismaRepository,
    private userRepository: UserPrismaRepository,
  ) {}

  async getTasks(user_id: string): Promise<GetTasksModelResponse> {
    const user = await this.userRepository.findById(user_id)

    const tasks = await this.taskRepository.findByUserId(user_id)

    if (!user) {
      throw new UserDoesNotExistsError()
    }

    if (!tasks) {
      throw new TaskDoesNotExistsError()
    }

    return {
      tasks,
    }
  }
}
