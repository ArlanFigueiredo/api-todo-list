import { TaskPrismaRepository } from '@/repositories/task/task-prisma-repository'
import { TaskRegisterModel } from '../register'
import { UserPrismaRepository } from '@/repositories/user/user-prisma-repositoruy'

export function makeRegister() {
  const userRepository = new UserPrismaRepository()
  const taskRepository = new TaskPrismaRepository()
  const taskRegisterModel = new TaskRegisterModel(
    taskRepository,
    userRepository,
  )
  return taskRegisterModel
}
