export class InvalidRequerimentRequiredError extends Error {
  constructor() {
    super('At least one requeriment required.')
  }
}
