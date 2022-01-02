export class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);

    this.statusCode = statusCode;
  }

  sendResponse(res) {
    res.status(this.statusCode).send({ message: this.message });
  }
}

export class BadRequestApiError extends ApiError {
  constructor(message = 'Bad Request.') {
    super(400, message);
  }
}

export class UnauthorizedApiError extends ApiError {
  constructor(message = 'Unauthorized.') {
    super(401, message);
  }
}

export class PermissionDeniedApiError extends ApiError {
  constructor(message = 'Access denied.') {
    super(403, message);
  }
}
