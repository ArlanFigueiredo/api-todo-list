import { TaskDoesNotExistsError } from '@/error/task/task-does-not-exists-error'
import { UserDoesNotExistsError } from '@/error/user/user-does-not-exists'
import { TaskPrismaRepository } from '@/repositories/task/task-prisma-repository'
import { UserPrismaRepository } from '@/repositories/user/user-prisma-repositoruy'
import { Task } from '@prisma/client'

interface TaskUpdateModelRequest {
  id: string
  user_id: string
  name: string
  description: string
  complete: boolean
}

interface TaskUpdateModelResponse {
  tasks: Task
}
export class TaskUpdateModel {
  constructor(
    private userRepository: UserPrismaRepository,
    private taskRepository: TaskPrismaRepository,
  ) {}

  async update({
    id,
    user_id,
    name,
    description,
    complete,
  }: TaskUpdateModelRequest): Promise<TaskUpdateModelResponse> {
    const user = await this.userRepository.findById(user_id)
    const taskExists = await this.taskRepository.findById(id)

    if (!user) {
      throw new UserDoesNotExistsError()
    }

    if (!taskExists || taskExists == null) {
      throw new TaskDoesNotExistsError()
    }

    const tasks = await this.taskRepository.updateTask({
      id,
      user_id,
      name,
      description,
      complete,
    })

    return {
      tasks,
    }
  }
}
