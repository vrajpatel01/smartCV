class CustomError extends Error {
  constructor(message, code) {
    super(message);
  }
}

export default CustomError;
