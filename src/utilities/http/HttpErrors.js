class HttpError extends Error {
  statusCode;
  message;
  meta;

  constructor(message, statusCode = 500, meta) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.meta = meta;
  }
}

class UnauthorizedError extends HttpError {
  constructor(message = "Unauthorized", meta) {
    super(message, 401, meta);
  }
}

class NotFoundError extends HttpError {
  constructor(message = "Not found", meta) {
    super(message, 404, meta);
  }
}

class ForbiddenError extends HttpError {
  constructor(message = "Forbidden", meta) {
    super(message, 403, meta);
  }
}

class ConflictError extends HttpError {
  constructor(message = "Conflict", meta) {
    super(message, 409, meta);
  }
}

class BadRequestError extends HttpError {
  constructor(message = "Bad request", meta) {
    super(message, 400, meta);
  }
}

module.exports = {
  HttpError,
  UnauthorizedError,
  NotFoundError,
  ForbiddenError,
  ConflictError,
  BadRequestError,
};
