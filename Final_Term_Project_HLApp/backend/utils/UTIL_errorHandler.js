// ═══════════════════════════════════════════════════════════════════════════
// ERROR HANDLER - utils/errorHandler.js
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Custom Error Handler Class
 * Usage: throw new ErrorHandler('Error message', 400);
 */
class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Global error handling middleware
 * Use in server.js: app.use(globalErrorHandler);
 */
const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';

  // ── Wrong MongoDB ID Error ────────────────────────────────────────
  if (err.name === 'CastError') {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // ── MongoDB Duplicate Key Error ───────────────────────────────────
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const message = `${field} already exists. Please use different value.`;
    err = new ErrorHandler(message, 400);
  }

  // ── Wrong JWT Error ───────────────────────────────────────────────
  if (err.name === 'JsonWebTokenError') {
    const message = 'Json Web Token is invalid, Try again !!!';
    err = new ErrorHandler(message, 400);
  }

  // ── JWT Expire Error ──────────────────────────────────────────────
  if (err.name === 'TokenExpiredError') {
    const message = 'Json Web Token is expired, Try again !!!';
    err = new ErrorHandler(message, 400);
  }

  // ── Mongoose Validation Error ────────────────────────────────────
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors)
      .map(val => val.message)
      .join(', ');
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

/**
 * Async handler wrapper - prevents try-catch in every controller
 * Usage: router.post('/route', asyncHandler(controller))
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = {
  ErrorHandler,
  globalErrorHandler,
  asyncHandler
};
