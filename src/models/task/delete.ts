import { TaskDoesNotExistsError } from '@/error/task/task-does-not-exists-error'
import { UserDoesNotExistsError } from '@/error/user/user-does-not-exists'
import { TaskRepository } from '@/repositories/task/taks-repository'
import { UserRepository } from '@/repositories/user/user-repository'

interface TaskDeleteModelRequest {
  id: string
  user_id: string
}

export class TaskDeleteModel {
  constructor(
    private userRepository: UserRepository,
    private taskRepository: TaskRepository,
  ) {}

  async deleteTask({ id, user_id }: TaskDeleteModelRequest): Promise<void> {
    const user = await this.userRepository.findById(user_id)
    if (!user) {
      throw new UserDoesNotExistsError()
    }

    const task = await this.taskRepository.findByUserId(id)
    if (!task) {
      throw new TaskDoesNotExistsError()
    }

    await this.taskRepository.deleteTask(id, user_id)
  }
}
