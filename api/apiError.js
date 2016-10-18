export default (message, statusCode, details) => {
  const error = {
    message: message || 'internal server error',
    statusCode: statusCode || 500,
  };
  if (details) {
    error.details = details;
  }
  return error;
};
