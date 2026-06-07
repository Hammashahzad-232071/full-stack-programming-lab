// ═══════════════════════════════════════════════════════════════════════════
// DOCTOR CONTROLLER - controllers/doctorController.js
// ═══════════════════════════════════════════════════════════════════════════

const Doctor = require('../models/Doctor');
const User = require('../models/User');
const Appointment = require('../models/Appointment');

/**
 * GET ALL DOCTORS
 * GET /api/doctors
 */
const getAllDoctors = async (req, res) => {
  try {
    const { specialization } = req.query;
    let query = {};

    if (specialization) {
      query.specialization = specialization;
    }

    const doctors = await Doctor.find(query)
      .populate('userId', 'name email phone profileImage')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: doctors.length,
      doctors: doctors
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching doctors: ' + error.message
    });
  }
};

/**
 * GET DOCTOR BY ID
 * GET /api/doctors/:id
 */
const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id)
      .populate('userId', 'name email phone address profileImage');

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    res.status(200).json({
      success: true,
      doctor: doctor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching doctor: ' + error.message
    });
  }
};

/**
 * CREATE DOCTOR PROFILE
 * POST /api/doctors
 * Body: { specialization, qualifications, licenseNumber, experience, ... }
 */
const createDoctor = async (req, res) => {
  try {
    const userId = req.user.id;

    // Check if doctor profile already exists
    const existingDoctor = await Doctor.findOne({ userId });
    if (existingDoctor) {
      return res.status(409).json({
        success: false,
        message: 'Doctor profile already exists for this user'
      });
    }

    const {
      specialization,
      qualifications,
      licenseNumber,
      experience,
      consultationFee,
      workDays,
      startTime,
      endTime,
      hospitalName,
      hospitalAddress,
      bio
    } = req.body;

    // Validation
    if (!specialization || !qualifications || !licenseNumber || !experience || !hospitalName || !hospitalAddress) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Check if license number is unique
    const duplicateLicense = await Doctor.findOne({ licenseNumber });
    if (duplicateLicense) {
      return res.status(409).json({
        success: false,
        message: 'License number already exists'
      });
    }

    const doctor = await Doctor.create({
      userId,
      specialization,
      qualifications,
      licenseNumber,
      experience: parseInt(experience),
      consultationFee: consultationFee || 1000,
      workDays: workDays || ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      startTime: startTime || '09:00',
      endTime: endTime || '18:00',
      hospitalName,
      hospitalAddress,
      bio: bio || null
    });

    res.status(201).json({
      success: true,
      message: 'Doctor profile created successfully',
      doctor: doctor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating doctor profile: ' + error.message
    });
  }
};

/**
 * UPDATE DOCTOR PROFILE
 * PUT /api/doctors/:id
 */
const updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Doctor profile updated successfully',
      doctor: doctor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating doctor: ' + error.message
    });
  }
};

/**
 * DELETE DOCTOR
 * DELETE /api/doctors/:id
 */
const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Doctor deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting doctor: ' + error.message
    });
  }
};

/**
 * GET DOCTOR'S APPOINTMENTS
 * GET /api/doctors/appointments/list
 */
const getDoctorAppointments = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.user.id });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor profile not found'
      });
    }

    const appointments = await Appointment.find({ doctorId: doctor._id })
      .populate('patientId')
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

module.exports = {
  getAllDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  getDoctorAppointments
};
