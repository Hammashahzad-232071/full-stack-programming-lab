// ═══════════════════════════════════════════════════════════════════════════
// UTILS INDEX - utils/index.js
// Export all utility functions in one place
// ═══════════════════════════════════════════════════════════════════════════

module.exports = {
  // Validators
  validators: require('./validators'),
  
  // Error handlers
  errorHandler: require('./errorHandler'),
  ErrorHandler: require('./errorHandler').ErrorHandler,
  globalErrorHandler: require('./errorHandler').globalErrorHandler,
  asyncHandler: require('./errorHandler').asyncHandler
};

// Usage examples:
// const { validators, ErrorHandler, asyncHandler } = require('./utils');
// const { validateEmail, validatePassword } = validators;
