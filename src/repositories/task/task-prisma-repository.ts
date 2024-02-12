import { Prisma, Task } from '@prisma/client'
import { TaskRepository } from './taks-repository'
import { prisma } from '@/lib/prisma'

interface TaskUpdate {
  id: string
  user_id: string
  name?: string
  description?: string
  complete?: boolean
}

export class TaskPrismaRepository implements TaskRepository {
  async deleteTask(id: string, user_id: string): Promise<void> {
    await prisma.task.delete({
      where: {
        id,
        user_id,
      },
    })
  }

  async updateTask(data: TaskUpdate): Promise<Task> {
    const task = await prisma.task.update({
      where: {
        id: data.id,
        user_id: data.user_id,
      },
      data: {
        name: data.name,
        description: data.description,
        complete: data.complete,
      },
    })
    return task
  }

  async findById(id: string): Promise<Task | null> {
    const task = await prisma.task.findUnique({
      where: {
        id,
      },
    })
    return task
  }

  async findByUserId(user_id: string): Promise<Task[] | null> {
    const tasks = await prisma.task.findMany({
      where: {
        user_id,
      },
    })
    return tasks
  }

  async create(data: Prisma.TaskCreateManyInput): Promise<Task> {
    const task = await prisma.task.create({
      data,
    })
    return task
  }
}
