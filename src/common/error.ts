export const errorCode = {
  BAD_REQUEST: "BAD_REQUEST",
  UNAUTHENTICATED: "UNAUTHENTICATED",
  FORBIDDEN: "FORBIDDEN",
  NOT_FOUND: "NOT_FOUND",
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
} as const

export type ErrorCode = (typeof errorCode)[keyof typeof errorCode]

export class AppError extends Error {
  private readonly _message: string
  private readonly _code: ErrorCode
  private readonly _metadata: Record<string, unknown>

  constructor(
    message: string,
    code: ErrorCode,
    metadata?: Record<string, unknown>,
  ) {
    super(message)
    this._message = message
    this._code = code
    this._metadata = metadata ?? {}

    Object.setPrototypeOf(this, new.target.prototype)
  }

  get message(): string {
    return this._message
  }

  get code(): ErrorCode {
    return this._code
  }

  get metadata(): Record<string, unknown> {
    return this._metadata
  }
}

export class BadRequestError extends AppError {
  constructor(message: string, metadata?: Record<string, unknown>) {
    super(message, errorCode.BAD_REQUEST, metadata)

    this.name = "BadRequestError"
  }
}

export class UnAuthenticatedError extends AppError {
  constructor(message: string, metadata?: Record<string, unknown>) {
    super(message, errorCode.UNAUTHENTICATED, metadata)

    this.name = "UnAuthenticatedError"
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string, metadata?: Record<string, unknown>) {
    super(message, errorCode.FORBIDDEN, metadata)

    this.name = "ForbiddenError"
  }
}

export class NotFoundError extends AppError {
  constructor(message: string, metadata?: Record<string, unknown>) {
    super(message, errorCode.NOT_FOUND, metadata)

    this.name = "NotFoundError"
  }
}

export class InternalServerError extends AppError {
  constructor(message: string, metadata?: Record<string, unknown>) {
    super(message, errorCode.INTERNAL_SERVER_ERROR, metadata)

    this.name = "InternalServerError"
  }
}
