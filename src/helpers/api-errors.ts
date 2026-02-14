export class ApiError extends Error {
    public readonly code: number;
    public readonly details?: Array<{ path: string; message: string }>;
    constructor(message: string, code: number, details?: Array<{ path: string; message: string }>) {
        super(message);
        this.code = code;
        this.details = details;
    }
}
export class NotFoundError extends ApiError {
    constructor(message: string) {
        super(message, 404);
    }
}

export class BadRequestError extends ApiError {
    constructor(message: string) {
        super(message, 400);
    }
}

export class UnauthorizedError extends ApiError {
    constructor(message: string) {
        super(message, 401);
    }
}

export class ValidationError extends ApiError {
  constructor(details: Array<{ path: string; message: string }>) {
    super("Validation error", 400, details);
  }
}

