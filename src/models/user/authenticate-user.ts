import { UserDoesNotExistsError } from '@/error/user/user-does-not-exists'
import { UserRepository } from '@/repositories/user/user-repository'

export class Authenticate {
  constructor(private userRepository: UserRepository) {}

  async findById(id: string) {
    const user = await this.userRepository.findById(id)

    if (!user) {
      throw new UserDoesNotExistsError()
    }

    return {
      user,
    }
  }
}
