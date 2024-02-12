import { UserDoesNotExistsError } from '@/error/user/user-does-not-exists'
import { TaskRepository } from '@/repositories/task/taks-repository'
import { UserPrismaRepository } from '@/repositories/user/user-prisma-repositoruy'
import { Task } from '@prisma/client'

interface TaskRegisterModelResponse {
  task: Task
}

interface TaskRegisterModelRequest {
  user_id: string
  name: string
  description: string
  complete: boolean
}

export class TaskRegisterModel {
  constructor(
    private taskRepository: TaskRepository,
    private userRepository: UserPrismaRepository,
  ) {}

  async create({
    user_id,
    name,
    description,
    complete,
  }: TaskRegisterModelRequest): Promise<TaskRegisterModelResponse> {
    const user = await this.userRepository.findById(user_id)
    console.log(user)
    if (!user) {
      throw new UserDoesNotExistsError()
    }

    const task = await this.taskRepository.create({
      user_id,
      name,
      description,
      complete,
    })

    return {
      task,
    }
  }
}
