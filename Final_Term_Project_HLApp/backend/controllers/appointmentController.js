// ═══════════════════════════════════════════════════════════════════════════
// APPOINTMENT CONTROLLER - controllers/appointmentController.js
// ═══════════════════════════════════════════════════════════════════════════

const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const Notification = require('../models/Notification');

/**
 * GET ALL APPOINTMENTS
 * GET /api/appointments
 */
const getAllAppointments = async (req, res) => {
  try {
    const { status } = req.query;
    let query = {};

    if (status) {
      query.status = status;
    }

    const appointments = await Appointment.find(query)
      .populate('patientId', 'userId')
      .populate('doctorId', 'userId specialization')
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
 * GET APPOINTMENT BY ID
 * GET /api/appointments/:id
 */
const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('patientId')
      .populate('doctorId');

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    res.status(200).json({
      success: true,
      appointment: appointment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching appointment: ' + error.message
    });
  }
};

/**
 * BOOK APPOINTMENT
 * POST /api/appointments/book
 * Body: { patientId, doctorId, appointmentDate, appointmentTime, reason, consultationType }
 */
const bookAppointment = async (req, res) => {
  try {
    const {
      patientId,
      doctorId,
      appointmentDate,
      appointmentTime,
      reason,
      description,
      consultationType
    } = req.body;

    // Validation
    if (!patientId || !appointmentDate || !appointmentTime || !reason) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Check if patient exists
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found'
      });
    }

    // Check if doctor exists (if provided)
    if (doctorId) {
      const doctor = await Doctor.findById(doctorId);
      if (!doctor) {
        return res.status(404).json({
          success: false,
          message: 'Doctor not found'
        });
      }
    }

    const appointment = await Appointment.create({
      patientId,
      doctorId: doctorId || null,
      appointmentDate: new Date(appointmentDate),
      appointmentTime,
      reason,
      description: description || null,
      consultationType: consultationType || 'in-person',
      status: 'pending'
    });

    // Update patient's appointment count
    await Patient.findByIdAndUpdate(
      patientId,
      { $inc: { totalAppointments: 1 } }
    );

    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully',
      appointment: appointment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error booking appointment: ' + error.message
    });
  }
};

/**
 * UPDATE APPOINTMENT
 * PUT /api/appointments/:id
 */
const updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Appointment updated successfully',
      appointment: appointment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating appointment: ' + error.message
    });
  }
};

/**
 * APPROVE APPOINTMENT
 * PUT /api/appointments/:id/approve
 */
const approveAppointment = async (req, res) => {
  try {
    const { doctorId, adminNotes } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      {
        status: 'approved',
        doctorId: doctorId,
        adminNotes: adminNotes || null
      },
      { new: true }
    ).populate('patientId').populate('doctorId');

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Appointment approved successfully',
      appointment: appointment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error approving appointment: ' + error.message
    });
  }
};

/**
 * REJECT APPOINTMENT
 * PUT /api/appointments/:id/reject
 */
const rejectAppointment = async (req, res) => {
  try {
    const { adminNotes } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      {
        status: 'rejected',
        adminNotes: adminNotes || null
      },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Appointment rejected successfully',
      appointment: appointment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error rejecting appointment: ' + error.message
    });
  }
};

/**
 * CANCEL APPOINTMENT
 * PUT /api/appointments/:id/cancel
 */
const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: 'cancelled' },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Appointment cancelled successfully',
      appointment: appointment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error cancelling appointment: ' + error.message
    });
  }
};

/**
 * COMPLETE APPOINTMENT
 * PUT /api/appointments/:id/complete
 */
const completeAppointment = async (req, res) => {
  try {
    const { doctorNotes, treatmentStarted, followUpRequired, followUpDate } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      {
        status: 'completed',
        doctorNotes: doctorNotes || null,
        treatmentStarted: treatmentStarted || false,
        followUpRequired: followUpRequired || false,
        followUpDate: followUpDate ? new Date(followUpDate) : null
      },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    // Update patient's completed appointments
    await Patient.findByIdAndUpdate(
      appointment.patientId,
      { $inc: { completedAppointments: 1 } }
    );

    res.status(200).json({
      success: true,
      message: 'Appointment completed successfully',
      appointment: appointment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error completing appointment: ' + error.message
    });
  }
};

/**
 * DELETE APPOINTMENT
 * DELETE /api/appointments/:id
 */
const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Appointment deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting appointment: ' + error.message
    });
  }
};

module.exports = {
  getAllAppointments,
  getAppointmentById,
  bookAppointment,
  updateAppointment,
  approveAppointment,
  rejectAppointment,
  cancelAppointment,
  completeAppointment,
  deleteAppointment
};
