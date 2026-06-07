// ═══════════════════════════════════════════════════════════════════════════
// PRESCRIPTION ROUTES - routes/prescriptionRoutes.js
// ═══════════════════════════════════════════════════════════════════════════

const express = require('express');
const router = express.Router();
const prescriptionController = require('../controllers/prescriptionController');
const { authenticateToken, authorize } = require('../middleware/authMiddleware');

/**
 * PUBLIC ROUTES
 */

// Get all prescriptions (Admin/Doctor only)
router.get('/', authenticateToken, authorize('admin', 'doctor'), prescriptionController.getAllPrescriptions);

// Get prescription by ID
router.get('/:id', authenticateToken, prescriptionController.getPrescriptionById);

// Get patient prescriptions
router.get('/patient/:patientId', authenticateToken, prescriptionController.getPatientPrescriptions);

/**
 * PROTECTED ROUTES - Requires Authentication
 */

// Create prescription (Doctor)
router.post('/', authenticateToken, authorize('doctor'), prescriptionController.createPrescription);

// Update prescription (Doctor)
router.put('/:id', authenticateToken, authorize('doctor'), prescriptionController.updatePrescription);

// Delete prescription (Admin)
router.delete('/:id', authenticateToken, authorize('admin'), prescriptionController.deletePrescription);

module.exports = router;
