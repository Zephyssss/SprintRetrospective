class AppError extends Error {
  constructor(statusCode, status, messenge) {
    super(messenge);
    this.statusCode = statusCode;
    this.status = status;
    this.message = messenge;
  }
}
module.exports = AppError;
