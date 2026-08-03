const { isCelebrateError } = require("celebrate");

const centralizedErrorHandler = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    return res.status(400).json({ message: "The data sent is invalid" });
  }

  if (err.name === "ValidationError" || err.name === "CastError") {
    return res.status(400).json({ message: "The data sent is invalid" });
  }

  if (err.code === 11000) {
    return res.status(409).json({ message: "User already registered" });
  }

  const { statusCode = 500, message } = err;

  return res.status(statusCode).json({
    message: statusCode === 500 ? "An error occurred on the server" : message,
  });
};

module.exports = centralizedErrorHandler;
