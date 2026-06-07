// ═══════════════════════════════════════════════════════════════════════════
// PATIENT CONTROLLER - controllers/patientController.js
// ═══════════════════════════════════════════════════════════════════════════

const Patient = require('../models/Patient');
const User = require('../models/User');
const Appointment = require('../models/Appointment');

/**
 * GET ALL PATIENTS
 * GET /api/patients
 */
const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find()
      .populate('userId', 'name email phone')
      .populate('assignedDoctor', 'specialization hospitalName')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: patients.length,
      patients: patients
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching patients: ' + error.message
    });
  }
};

/**
 * GET PATIENT BY ID
 * GET /api/patients/:id
 */
const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id)
      .populate('userId', 'name email phone address')
      .populate('assignedDoctor', 'specialization hospitalName bio');

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found'
      });
    }

    res.status(200).json({
      success: true,
      patient: patient
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching patient: ' + error.message
    });
  }
};

/**
 * CREATE PATIENT PROFILE
 * POST /api/patients
 * Body: { bloodType, height, weight, gender, dateOfBirth, ... }
 */
const createPatient = async (req, res) => {
  try {
    const userId = req.user.id;

    // Check if patient profile already exists
    const existingPatient = await Patient.findOne({ userId });
    if (existingPatient) {
      return res.status(409).json({
        success: false,
        message: 'Patient profile already exists for this user'
      });
    }

    const {
      bloodType,
      height,
      weight,
      gender,
      dateOfBirth,
      allergies,
      chronicDiseases,
      previousSurgeries,
      medications,
      emergencyContact,
      insuranceProvider,
      insurancePolicyNumber
    } = req.body;

    // Validation
    if (!bloodType || !height || !weight || !gender || !dateOfBirth || !emergencyContact) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    const patient = await Patient.create({
      userId,
      bloodType,
      height: parseInt(height),
      weight: parseFloat(weight),
      gender,
      dateOfBirth: new Date(dateOfBirth),
      allergies: allergies || [],
      chronicDiseases: chronicDiseases || [],
      previousSurgeries: previousSurgeries || [],
      medications: medications || [],
      emergencyContact: {
        name: emergencyContact.name,
        phone: emergencyContact.phone,
        relationship: emergencyContact.relationship || 'Family'
      },
      insuranceProvider: insuranceProvider || null,
      insurancePolicyNumber: insurancePolicyNumber || null
    });

    res.status(201).json({
      success: true,
      message: 'Patient profile created successfully',
      patient: patient
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating patient profile: ' + error.message
    });
  }
};

/**
 * UPDATE PATIENT PROFILE
 * PUT /api/patients/:id
 */
const updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Patient profile updated successfully',
      patient: patient
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating patient: ' + error.message
    });
  }
};

/**
 * DELETE PATIENT
 * DELETE /api/patients/:id
 */
const deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Patient deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting patient: ' + error.message
    });
  }
};

/**
 * GET PATIENT'S APPOINTMENTS
 * GET /api/patients/appointments
 */
const getPatientAppointments = async (req, res) => {
  try {
    const patient = await Patient.findOne({ userId: req.user.id });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient profile not found'
      });
    }

    const appointments = await Appointment.find({ patientId: patient._id })
      .populate('doctorId', 'specialization hospitalName')
      .sort({ appointmentDate: -1 });

    res.status(200).json({
      success: true,
      count: appointments.length,
      appointments: appointments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching appointments: ' + error.message
    });
  }
};

/**
 * ASSIGN DOCTOR TO PATIENT
 * POST /api/patients/:patientId/assign-doctor/:doctorId
 */
const assignDoctor = async (req, res) => {
  try {
    const { patientId, doctorId } = req.params;

    const patient = await Patient.findByIdAndUpdate(
      patientId,
      { assignedDoctor: doctorId },
      { new: true }
    ).populate('assignedDoctor');

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Doctor assigned to patient successfully',
      patient: patient
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error assigning doctor: ' + error.message
    });
  }
};

module.exports = {
  getAllPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient,
  getPatientAppointments,
  assignDoctor
};
