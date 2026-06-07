// ═══════════════════════════════════════════════════════════════════════════
// APPOINTMENT ROUTES - routes/appointmentRoutes.js
// ═══════════════════════════════════════════════════════════════════════════

const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const { authenticateToken, authorize } = require('../middleware/authMiddleware');

/**
 * PUBLIC ROUTES
 */

// Get all appointments (Admin only)
router.get('/', authenticateToken, authorize('admin'), appointmentController.getAllAppointments);

// Get appointment by ID
router.get('/:id', authenticateToken, appointmentController.getAppointmentById);

/**
 * PROTECTED ROUTES - Requires Authentication
 */

// Book appointment (Patient)
router.post('/book', authenticateToken, authorize('patient'), appointmentController.bookAppointment);

// Update appointment
router.put('/:id', authenticateToken, appointmentController.updateAppointment);

// Approve appointment (Admin/Doctor)
router.put('/:id/approve', authenticateToken, authorize('admin', 'doctor'), appointmentController.approveAppointment);

// Reject appointment (Admin/Doctor)
router.put('/:id/reject', authenticateToken, authorize('admin', 'doctor'), appointmentController.rejectAppointment);

// Cancel appointment (Patient/Admin)
router.put('/:id/cancel', authenticateToken, appointmentController.cancelAppointment);

// Complete appointment (Doctor)
router.put('/:id/complete', authenticateToken, authorize('doctor', 'admin'), appointmentController.completeAppointment);

// Delete appointment (Admin)
router.delete('/:id', authenticateToken, authorize('admin'), appointmentController.deleteAppointment);

module.exports = router;
