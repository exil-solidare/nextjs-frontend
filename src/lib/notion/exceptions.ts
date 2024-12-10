export enum NotionErrorCode {
  UNAUTHORIZED = "UNAUTHORIZED",
  DATABASE_NOT_FOUND = "DATABASE_NOT_FOUND",
  INVALID_REQUEST = "INVALID_REQUEST",
  RATE_LIMITED = "RATE_LIMITED",
  INTERNAL_ERROR = "INTERNAL_ERROR",
  INTERNAL_RESPONSE = "INTERNAL_RESPONSE",
  INVALID_RESPONSE = "INVALID_RESPONSE"
}

export class NotionError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code: NotionErrorCode,
  ) {
    super(message);
    this.name = "NotionError";
  }
}
