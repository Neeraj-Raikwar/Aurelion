// Catches any error that falls through from routes/controllers
// and sends a clean JSON response instead of leaking a stack trace.
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    message: err.message || 'Something went wrong on the server',
  });
};

module.exports = errorHandler;
