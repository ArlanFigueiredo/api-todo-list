export class UserAlredyExistsError extends Error {
  constructor() {
    super('User alredy exists.')
  }
}
