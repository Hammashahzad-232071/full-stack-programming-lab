// ═══════════════════════════════════════════════════════════════════════════
// DOCTOR ROUTES - routes/doctorRoutes.js
// ═══════════════════════════════════════════════════════════════════════════

const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const { authenticateToken, authorize } = require('../middleware/authMiddleware');

/**
 * PUBLIC ROUTES
 */

// Get all doctors
router.get('/', doctorController.getAllDoctors);

// Get doctor by ID
router.get('/:id', doctorController.getDoctorById);

/**
 * PROTECTED ROUTES - Requires Authentication
 */

// Create doctor profile (Doctor registration)
router.post('/', authenticateToken, authorize('doctor'), doctorController.createDoctor);

// Update doctor profile
router.put('/:id', authenticateToken, authorize('admin', 'doctor'), doctorController.updateDoctor);

// Delete doctor (Admin only)
router.delete('/:id', authenticateToken, authorize('admin'), doctorController.deleteDoctor);

// Get doctor's appointments
router.get('/appointments/list', authenticateToken, authorize('doctor'), doctorController.getDoctorAppointments);

module.exports = router;
