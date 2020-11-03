const status ={
  400:"Bad request",
  404:"Not found",
  403:"Forbidden",
  409:"Conflict"
}

class AppError extends Error {
  constructor(statusCode, messenge) {
    super(messenge);
    this.statusCode = statusCode;
    this.status = status[statusCode];
    this.message = messenge;
  }
}
module.exports = AppError;
