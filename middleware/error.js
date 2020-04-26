const ErrorResponse = require('../utils/errorResponse');
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log to console for dev
  console.log(err.stack.red);

  if (err.name === 'DataError') {
    const message = `Resource not found with id of ${
      err.message.replace('"').split('uuid: ')[1]
    }`;
    error = new ErrorResponse(message, 404);
  }

  if (err.nativeError && err.nativeError.code === '23502') {
    const message = `Data missing [${error.nativeError.column}]`;
    error = new ErrorResponse(message, 400);
  }
  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message || 'Server Error' });
};

module.exports = errorHandler;
