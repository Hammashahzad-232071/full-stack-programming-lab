// ═══════════════════════════════════════════════════════════════════════════
// TREATMENT ROUTES - routes/treatmentRoutes.js
// ═══════════════════════════════════════════════════════════════════════════

const express = require('express');
const router = express.Router();
const treatmentController = require('../controllers/treatmentController');
const { authenticateToken, authorize } = require('../middleware/authMiddleware');

/**
 * PUBLIC ROUTES
 */

// Get all treatments (Admin only)
router.get('/', authenticateToken, authorize('admin'), treatmentController.getAllTreatments);

// Get treatment by ID
router.get('/:id', authenticateToken, treatmentController.getTreatmentById);

// Get patient treatments
router.get('/patient/:patientId', authenticateToken, treatmentController.getPatientTreatments);

/**
 * PROTECTED ROUTES - Requires Authentication
 */

// Create treatment (Doctor)
router.post('/', authenticateToken, authorize('doctor'), treatmentController.createTreatment);

// Update treatment (Doctor)
router.put('/:id', authenticateToken, authorize('doctor', 'admin'), treatmentController.updateTreatment);

// Add checkup (Doctor)
router.post('/:id/checkup', authenticateToken, authorize('doctor'), treatmentController.addCheckup);

// Add follow-up (Doctor)
router.post('/:id/follow-up', authenticateToken, authorize('doctor'), treatmentController.addFollowUp);

// Complete treatment (Doctor)
router.put('/:id/complete', authenticateToken, authorize('doctor'), treatmentController.completeTreatment);

// Delete treatment (Admin)
router.delete('/:id', authenticateToken, authorize('admin'), treatmentController.deleteTreatment);

module.exports = router;
