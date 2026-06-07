// ═══════════════════════════════════════════════════════════════════════════
// TREATMENT CONTROLLER - controllers/treatmentController.js
// ═══════════════════════════════════════════════════════════════════════════

const Treatment = require('../models/Treatment');
const Appointment = require('../models/Appointment');

/**
 * GET ALL TREATMENTS
 * GET /api/treatments
 */
const getAllTreatments = async (req, res) => {
  try {
    const treatments = await Treatment.find()
      .populate('patientId')
      .populate('doctorId')
      .populate('appointmentId')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: treatments.length,
      treatments: treatments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching treatments: ' + error.message
    });
  }
};

/**
 * GET TREATMENT BY ID
 * GET /api/treatments/:id
 */
const getTreatmentById = async (req, res) => {
  try {
    const treatment = await Treatment.findById(req.params.id)
      .populate('patientId')
      .populate('doctorId')
      .populate('appointmentId')
      .populate('prescriptions');

    if (!treatment) {
      return res.status(404).json({
        success: false,
        message: 'Treatment not found'
      });
    }

    res.status(200).json({
      success: true,
      treatment: treatment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching treatment: ' + error.message
    });
  }
};

/**
 * CREATE TREATMENT
 * POST /api/treatments
 * Body: { appointmentId, patientId, doctorId, diagnosis, treatmentPlan }
 */
const createTreatment = async (req, res) => {
  try {
    const {
      appointmentId,
      patientId,
      doctorId,
      diagnosis,
      treatmentPlan,
      expectedEndDate
    } = req.body;

    // Validation
    if (!appointmentId || !patientId || !doctorId || !diagnosis) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Check if treatment already exists for this appointment
    const existingTreatment = await Treatment.findOne({ appointmentId });
    if (existingTreatment) {
      return res.status(409).json({
        success: false,
        message: 'Treatment already exists for this appointment'
      });
    }

    const treatment = await Treatment.create({
      appointmentId,
      patientId,
      doctorId,
      diagnosis,
      treatmentPlan: treatmentPlan || null,
      expectedEndDate: expectedEndDate ? new Date(expectedEndDate) : null,
      startDate: new Date(),
      status: 'ongoing'
    });

    // Update appointment to reflect treatment started
    await Appointment.findByIdAndUpdate(
      appointmentId,
      { treatmentStarted: true }
    );

    res.status(201).json({
      success: true,
      message: 'Treatment created successfully',
      treatment: treatment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating treatment: ' + error.message
    });
  }
};

/**
 * UPDATE TREATMENT
 * PUT /api/treatments/:id
 */
const updateTreatment = async (req, res) => {
  try {
    const treatment = await Treatment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!treatment) {
      return res.status(404).json({
        success: false,
        message: 'Treatment not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Treatment updated successfully',
      treatment: treatment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating treatment: ' + error.message
    });
  }
};

/**
 * ADD CHECKUP TO TREATMENT
 * POST /api/treatments/:id/checkup
 * Body: { checkupDate, findings, vitals, notes, doctorNotes }
 */
const addCheckup = async (req, res) => {
  try {
    const { checkupDate, findings, vitals, notes, doctorNotes } = req.body;

    if (!checkupDate || !findings) {
      return res.status(400).json({
        success: false,
        message: 'Please provide checkup date and findings'
      });
    }

    const treatment = await Treatment.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          checkups: {
            checkupDate: new Date(checkupDate),
            findings,
            vitals: vitals || {},
            notes: notes || null,
            doctorNotes: doctorNotes || null,
            createdAt: new Date()
          }
        }
      },
      { new: true }
    );

    if (!treatment) {
      return res.status(404).json({
        success: false,
        message: 'Treatment not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Checkup added successfully',
      treatment: treatment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding checkup: ' + error.message
    });
  }
};

/**
 * ADD FOLLOW-UP TO TREATMENT
 * POST /api/treatments/:id/follow-up
 * Body: { followUpDate, reason }
 */
const addFollowUp = async (req, res) => {
  try {
    const { followUpDate, reason } = req.body;

    if (!followUpDate) {
      return res.status(400).json({
        success: false,
        message: 'Please provide follow-up date'
      });
    }

    const treatment = await Treatment.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          followUps: {
            followUpDate: new Date(followUpDate),
            reason: reason || null,
            status: 'scheduled',
            createdAt: new Date()
          }
        }
      },
      { new: true }
    );

    if (!treatment) {
      return res.status(404).json({
        success: false,
        message: 'Treatment not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Follow-up added successfully',
      treatment: treatment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding follow-up: ' + error.message
    });
  }
};

/**
 * COMPLETE TREATMENT
 * PUT /api/treatments/:id/complete
 */
const completeTreatment = async (req, res) => {
  try {
    const treatment = await Treatment.findByIdAndUpdate(
      req.params.id,
      {
        status: 'completed',
        actualEndDate: new Date(),
        progressPercentage: 100
      },
      { new: true }
    );

    if (!treatment) {
      return res.status(404).json({
        success: false,
        message: 'Treatment not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Treatment completed successfully',
      treatment: treatment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error completing treatment: ' + error.message
    });
  }
};

/**
 * GET PATIENT TREATMENTS
 * GET /api/treatments/patient/:patientId
 */
const getPatientTreatments = async (req, res) => {
  try {
    const treatments = await Treatment.find({ patientId: req.params.patientId })
      .populate('doctorId', 'specialization hospitalName')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: treatments.length,
      treatments: treatments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching treatments: ' + error.message
    });
  }
};

/**
 * DELETE TREATMENT
 * DELETE /api/treatments/:id
 */
const deleteTreatment = async (req, res) => {
  try {
    const treatment = await Treatment.findByIdAndDelete(req.params.id);

    if (!treatment) {
      return res.status(404).json({
        success: false,
        message: 'Treatment not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Treatment deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting treatment: ' + error.message
    });
  }
};

module.exports = {
  getAllTreatments,
  getTreatmentById,
  createTreatment,
  updateTreatment,
  addCheckup,
  addFollowUp,
  completeTreatment,
  getPatientTreatments,
  deleteTreatment
};
