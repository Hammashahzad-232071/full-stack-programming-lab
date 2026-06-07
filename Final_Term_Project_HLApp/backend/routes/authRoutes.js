// ═══════════════════════════════════════════════════════════════════════════
// AUTH ROUTES - routes/authRoutes.js
// ═══════════════════════════════════════════════════════════════════════════

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken, authorize } = require('../middleware/authMiddleware');

// ═══════════════════════════════════════════════════════════════════════════
// PUBLIC ROUTES (No authentication required)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * REGISTER NEW USER
 * POST /api/auth/register
 * Body: { name, email, password, confirmPassword, role }
 * Response: { token, user object }
 *
 * Example:
 * {
 *   "name": "Ahmed Ali",
 *   "email": "ahmed@example.com",
 *   "password": "password123",
 *   "confirmPassword": "password123",
 *   "role": "patient"
 * }
 */
router.post('/register', authController.register);

/**
 * LOGIN USER
 * POST /api/auth/login
 * Body: { email, password }
 * Response: { token, user object }
 *
 * Example:
 * {
 *   "email": "ahmed@example.com",
 *   "password": "password123"
 * }
 */
router.post('/login', authController.login);

// ═══════════════════════════════════════════════════════════════════════════
// PROTECTED ROUTES (Authentication required)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * LOGOUT USER
 * POST /api/auth/logout
 * Headers: { Authorization: "Bearer <token>" }
 * Note: Token should be removed from client storage
 */
router.post('/logout', authenticateToken, authController.logout);

/**
 * GET CURRENT USER DETAILS
 * GET /api/auth/me
 * Headers: { Authorization: "Bearer <token>" }
 * Response: User object with all details
 */
router.get('/me', authenticateToken, authController.getCurrentUser);

/**
 * UPDATE USER PROFILE
 * PUT /api/auth/profile
 * Headers: { Authorization: "Bearer <token>" }
 * Body: { name, phone, address, city, country }
 */
router.put('/profile', authenticateToken, authController.updateProfile);

/**
 * CHANGE PASSWORD
 * POST /api/auth/change-password
 * Headers: { Authorization: "Bearer <token>" }
 * Body: { currentPassword, newPassword, confirmPassword }
 */
router.post('/change-password', authenticateToken, authController.changePassword);

// ═══════════════════════════════════════════════════════════════════════════
// ROLE-BASED ROUTES (Examples - Can be expanded)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * ADMIN ONLY - Get all users (example)
 * GET /api/auth/admin/users
 * Headers: { Authorization: "Bearer <admin-token>" }
 */
router.get('/admin/users', 
  authenticateToken, 
  authorize('admin'),
  async (req, res) => {
    try {
      const User = require('../models/User');
      const users = await User.find();
      res.json({
        success: true,
        message: 'All users retrieved',
        data: users
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error: ' + error.message
      });
    }
  }
);

/**
 * DOCTOR ONLY - Doctor dashboard access (example)
 * GET /api/auth/doctor/dashboard
 * Headers: { Authorization: "Bearer <doctor-token>" }
 */
router.get('/doctor/dashboard',
  authenticateToken,
  authorize('doctor'),
  (req, res) => {
    res.json({
      success: true,
      message: 'Doctor dashboard accessed',
      doctorId: req.user.id
    });
  }
);

/**
 * PATIENT ONLY - Patient dashboard access (example)
 * GET /api/auth/patient/dashboard
 * Headers: { Authorization: "Bearer <patient-token>" }
 */
router.get('/patient/dashboard',
  authenticateToken,
  authorize('patient'),
  (req, res) => {
    res.json({
      success: true,
      message: 'Patient dashboard accessed',
      patientId: req.user.id
    });
  }
);

module.exports = router;
