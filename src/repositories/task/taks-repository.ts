import { Prisma, Task } from '@prisma/client'

interface TaskUpdate {
  id: string
  user_id: string
  name?: string
  description?: string
  complete?: boolean
}

export interface TaskRepository {
  deleteTask(id: string, user_id: string): Promise<void>
  updateTask(data: TaskUpdate): Promise<Task>
  findById(id: string): Promise<Task | null>
  findByUserId(user_id: string): Promise<Task[] | null>
  create(data: Prisma.TaskCreateManyInput): Promise<Task>
}
