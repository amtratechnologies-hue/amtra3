export class ApiError extends Error {
  constructor(message, { status = null, details = [] } = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}
