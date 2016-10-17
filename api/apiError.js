export default (message, statusCode, details) => {
  const error = { message };
  error.statusCode = statusCode || 500;
  if (details) {
    error.details = details;
  }
  return error;
};
