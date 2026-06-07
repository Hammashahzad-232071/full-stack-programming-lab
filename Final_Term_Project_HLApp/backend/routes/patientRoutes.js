// ═══════════════════════════════════════════════════════════════════════════
// PATIENT ROUTES - routes/patientRoutes.js
// ═══════════════════════════════════════════════════════════════════════════

const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const { authenticateToken, authorize } = require('../middleware/authMiddleware');

/**
 * PUBLIC ROUTES
 */

// Get all patients (Admin only)
router.get('/', authenticateToken, authorize('admin'), patientController.getAllPatients);

// Get patient by ID
router.get('/:id', authenticateToken, patientController.getPatientById);

/**
 * PROTECTED ROUTES - Requires Authentication
 */

// Create patient profile (Patient registration)
router.post('/', authenticateToken, authorize('patient'), patientController.createPatient);

// Update patient profile
router.put('/:id', authenticateToken, authorize('admin', 'patient'), patientController.updatePatient);

// Delete patient (Admin only)
router.delete('/:id', authenticateToken, authorize('admin'), patientController.deletePatient);

// Get patient's appointments
router.get('/appointments/list', authenticateToken, authorize('patient'), patientController.getPatientAppointments);

// Assign doctor to patient (Admin or Doctor)
router.post('/:patientId/assign-doctor/:doctorId', authenticateToken, authorize('admin', 'doctor'), patientController.assignDoctor);

module.exports = router;
