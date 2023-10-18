export class InvalidImageRequiredError extends Error {
  constructor() {
    super('At least one image is required.')
  }
}
