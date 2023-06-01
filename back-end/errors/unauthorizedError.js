class UnauthorizedError extends Error {
  constructor(message = "Validations failed.", ...args) {
    super(message, ...args);
    this.message = message;
  }
}

module.exports = UnauthorizedError;
