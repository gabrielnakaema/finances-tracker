import { ApiError } from './api-error';

export class BadRequestError extends ApiError {
  constructor(message: string) {
    super(message, 400, 'BadRequest');
  }
}

export class ForbiddenError extends ApiError {
  constructor(message: string) {
    super(message, 403, 'Forbidden');
  }
}

export class InternalServerError extends ApiError {
  constructor(message: string) {
    super(message, 500, 'InternalServerError');
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string) {
    super(message, 404, 'NotFound');
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string) {
    super(message, 401, 'Unauthorized');
  }
}

export class UnprocessableEntityError extends ApiError {
  constructor(message: string) {
    super(message, 422, 'UnprocessableEntity');
  }
}
