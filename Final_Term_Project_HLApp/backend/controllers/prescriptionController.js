// ═══════════════════════════════════════════════════════════════════════════
// PRESCRIPTION CONTROLLER - controllers/prescriptionController.js
// ═══════════════════════════════════════════════════════════════════════════

const Prescription = require('../models/Prescription');
const Appointment = require('../models/Appointment');
const Treatment = require('../models/Treatment');

/**
 * GET ALL PRESCRIPTIONS
 * GET /api/prescriptions
 */
const getAllPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find()
      .populate('patientId', 'userId')
      .populate('doctorId', 'userId specialization')
      .populate('appointmentId')
      .sort({ prescriptionDate: -1 });

    res.status(200).json({
      success: true,
      count: prescriptions.length,
      prescriptions: prescriptions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching prescriptions: ' + error.message
    });
  }
};

/**
 * GET PRESCRIPTION BY ID
 * GET /api/prescriptions/:id
 */
const getPrescriptionById = async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id)
      .populate('patientId')
      .populate('doctorId')
      .populate('appointmentId')
      .populate('treatmentId');

    if (!prescription) {
      return res.status(404).json({
        success: false,
        message: 'Prescription not found'
      });
    }

    res.status(200).json({
      success: true,
      prescription: prescription
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching prescription: ' + error.message
    });
  }
};

/**
 * CREATE PRESCRIPTION
 * POST /api/prescriptions
 * Body: { appointmentId, patientId, doctorId, medicines, generalInstructions, ... }
 */
const createPrescription = async (req, res) => {
  try {
    const {
      appointmentId,
      patientId,
      doctorId,
      treatmentId,
      medicines,
      generalInstructions,
      dietaryRestrictions,
      activityRestrictions
    } = req.body;

    // Validation
    if (!appointmentId || !patientId || !doctorId || !medicines || medicines.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Check if appointment exists
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    // Calculate expiry date (default 30 days from now)
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 30);

    const prescription = await Prescription.create({
      appointmentId,
      treatmentId: treatmentId || null,
      patientId,
      doctorId,
      medicines,
      prescriptionDate: new Date(),
      expiryDate,
      generalInstructions: generalInstructions || null,
      dietaryRestrictions: dietaryRestrictions || [],
      activityRestrictions: activityRestrictions || []
    });

    // Add prescription to treatment if treatment exists
    if (treatmentId) {
      await Treatment.findByIdAndUpdate(
        treatmentId,
        { $push: { prescriptions: prescription._id } }
      );
    }

    res.status(201).json({
      success: true,
      message: 'Prescription created successfully',
      prescription: prescription
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating prescription: ' + error.message
    });
  }
};

/**
 * UPDATE PRESCRIPTION
 * PUT /api/prescriptions/:id
 */
const updatePrescription = async (req, res) => {
  try {
    const prescription = await Prescription.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!prescription) {
      return res.status(404).json({
        success: false,
        message: 'Prescription not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Prescription updated successfully',
      prescription: prescription
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating prescription: ' + error.message
    });
  }
};

/**
 * GET PATIENT PRESCRIPTIONS
 * GET /api/prescriptions/patient/:patientId
 */
const getPatientPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find({ patientId: req.params.patientId })
      .populate('doctorId', 'specialization hospitalName')
      .populate('appointmentId')
      .sort({ prescriptionDate: -1 });

    res.status(200).json({
      success: true,
      count: prescriptions.length,
      prescriptions: prescriptions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching prescriptions: ' + error.message
    });
  }
};

/**
 * DELETE PRESCRIPTION
 * DELETE /api/prescriptions/:id
 */
const deletePrescription = async (req, res) => {
  try {
    const prescription = await Prescription.findByIdAndDelete(req.params.id);

    if (!prescription) {
      return res.status(404).json({
        success: false,
        message: 'Prescription not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Prescription deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting prescription: ' + error.message
    });
  }
};

module.exports = {
  getAllPrescriptions,
  getPrescriptionById,
  createPrescription,
  updatePrescription,
  getPatientPrescriptions,
  deletePrescription
};
