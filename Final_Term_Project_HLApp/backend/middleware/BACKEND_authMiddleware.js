// ═══════════════════════════════════════════════════════════════════════════
// AUTH MIDDLEWARE - middleware/authMiddleware.js
// ═══════════════════════════════════════════════════════════════════════════

const jwt = require('jsonwebtoken');

/**
 * Verify JWT Token and Authenticate User
 * This middleware checks if the user has a valid JWT token
 */
const authenticateToken = (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided. Please login first.'
      });
    }

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: 'Invalid or expired token. Please login again.'
        });
      }

      // Attach user info to request object
      req.user = decoded;
      next();
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Authentication error: ' + error.message
    });
  }
};

/**
 * Check if user has specific role
 * Usage: authorize('admin') or authorize('doctor', 'admin')
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
    }

    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Required role: ${roles.join(' or ')}`
      });
    }

    next();
  };
};

module.exports = {
  authenticateToken,
  authorize
};
