import { Prisma, User } from '@prisma/client'
import { UserRepository } from './user-repository'
import { prisma } from '@/lib/prisma'

export class UserPrismaRepository implements UserRepository {
  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })
    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    return user
  }

  async create(data: Prisma.UserCreateManyInput): Promise<User> {
    const user = await prisma.user.create({
      data,
    })
    return user
  }
}
