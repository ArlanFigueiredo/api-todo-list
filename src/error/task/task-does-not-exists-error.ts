export class TaskDoesNotExistsError extends Error {
  constructor() {
    super('Does not exists tasks registed.')
  }
}
