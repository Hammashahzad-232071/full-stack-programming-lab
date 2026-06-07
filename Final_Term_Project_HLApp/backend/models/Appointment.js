// ═══════════════════════════════════════════════════════════════════════════
// APPOINTMENT MODEL - models/Appointment.js
// ═══════════════════════════════════════════════════════════════════════════

const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
  {
    // ── Patient and Doctor Reference ───────────────────────────────────
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      default: null // Doctor can be assigned later
    },

    // ── Appointment Details ────────────────────────────────────────────
    appointmentDate: {
      type: Date,
      required: [true, 'Please provide appointment date']
    },
    appointmentTime: {
      type: String, // Format: "09:00"
      required: [true, 'Please provide appointment time']
    },
    reason: {
      type: String,
      required: [true, 'Please provide reason for appointment']
    },
    description: {
      type: String,
      maxlength: [500, 'Description cannot exceed 500 characters']
    },

    // ── Appointment Status ────────────────────────────────────────────
    status: {
      type: String,
      enum: {
        values: ['pending', 'approved', 'rejected', 'completed', 'cancelled'],
        message: 'Invalid appointment status'
      },
      default: 'pending'
    },

    // ── Consultation Type ──────────────────────────────────────────────
    consultationType: {
      type: String,
      enum: ['in-person', 'online', 'phone'],
      default: 'in-person'
    },

    // ── Notes from Doctor/Admin ────────────────────────────────────────
    adminNotes: {
      type: String,
      default: null
    },
    doctorNotes: {
      type: String,
      default: null
    },

    // ── Treatment Status ──────────────────────────────────────────────
    treatmentStarted: {
      type: Boolean,
      default: false
    },
    treatmentCompleted: {
      type: Boolean,
      default: false
    },

    // ── Follow-up Information ──────────────────────────────────────────
    followUpRequired: {
      type: Boolean,
      default: false
    },
    followUpDate: {
      type: Date,
      default: null
    },

    // ── Timestamps ────────────────────────────────────────────────────
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
