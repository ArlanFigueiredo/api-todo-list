import { InvalidCredentialsError } from '@/error/user/user-invalid-credentials-error'
import { UserPrismaRepository } from '@/repositories/user/user-prisma-repositoruy'
import { User } from '@prisma/client'
import { compare } from 'bcrypt'

interface GetUserProfileModelReponse {
  user: User
}
interface GetUserProfileModelRequest {
  email: string
  password: string
}

export class GetUserProfileModel {
  constructor(private userRepository: UserPrismaRepository) {}

  async getUserProfile({
    email,
    password,
  }: GetUserProfileModelRequest): Promise<GetUserProfileModelReponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPassWordMatches = await compare(password, user.password)
    if (!doesPassWordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }
}
