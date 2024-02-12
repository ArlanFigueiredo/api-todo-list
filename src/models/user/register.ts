import { UserAlredyExistsError } from '@/error/user/user-alredy-exists-error'
import { UserRepository } from '@/repositories/user/user-repository'
import { User } from '@prisma/client'

interface UserRegisterModelRequest {
  name: string
  email: string
  password: string
}

interface UserRegisterModelResponse {
  user: User
}

export class UserRegisterModel {
  constructor(private userRepository: UserRepository) {}

  async create({
    name,
    email,
    password,
  }: UserRegisterModelRequest): Promise<UserRegisterModelResponse> {
    const userExists = await this.userRepository.findByEmail(email)

    if (userExists) {
      throw new UserAlredyExistsError()
    }

    const user = await this.userRepository.create({
      name,
      email,
      password,
    })

    return {
      user,
    }
  }
}
