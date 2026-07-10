class ApiResponse {
  constructor(
    statusCode,
    message = "Success",
    data = null,
    success = true,
    errors = [],
    meta = null
  ) {
    this.success = success;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.errors = errors;
    this.meta = meta;
  }
}

export default ApiResponse;