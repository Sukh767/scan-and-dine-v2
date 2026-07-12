export class ApiError extends Error {
  constructor({
    message = "Something went wrong.",
    statusCode = 500,
    errors = [],
    success = false,
  } = {}) {
    super(message);

    this.name = "ApiError";

    this.success = success;
    this.statusCode = statusCode;
    this.errors = errors;
  }
}
