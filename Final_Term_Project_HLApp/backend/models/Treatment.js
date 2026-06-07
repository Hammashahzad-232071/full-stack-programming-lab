// ═══════════════════════════════════════════════════════════════════════════
// TREATMENT MODEL - models/Treatment.js
// ═══════════════════════════════════════════════════════════════════════════

const mongoose = require('mongoose');

const treatmentSchema = new mongoose.Schema(
  {
    // ── Appointment Reference ──────────────────────────────────────────
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Appointment',
      required: true,
      unique: true
    },

    // ── Patient and Doctor Reference ───────────────────────────────────
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true
    },

    // ── Treatment Status ──────────────────────────────────────────────
    status: {
      type: String,
      enum: ['ongoing', 'completed', 'on_hold', 'cancelled'],
      default: 'ongoing'
    },

    // ── Treatment Cycle ────────────────────────────────────────────────
    startDate: {
      type: Date,
      required: true,
      default: Date.now
    },
    expectedEndDate: {
      type: Date,
      default: null
    },
    actualEndDate: {
      type: Date,
      default: null
    },

    // ── Treatment Details ─────────────────────────────────────────────
    diagnosis: {
      type: String,
      required: true,
      maxlength: [500, 'Diagnosis cannot exceed 500 characters']
    },
    treatmentPlan: {
      type: String,
      maxlength: [1000, 'Treatment plan cannot exceed 1000 characters']
    },
    currentStatus: {
      type: String,
      default: 'Initial consultation'
      // e.g., 'Initial consultation', 'Under medication', 'Physical therapy'
    },

    // ── Physical Checkups ──────────────────────────────────────────────
    checkups: [
      {
        checkupDate: {
          type: Date,
          required: true
        },
        findings: {
          type: String,
          maxlength: [500, 'Findings cannot exceed 500 characters']
        },
        vitals: {
          bloodPressure: String, // e.g., "120/80"
          temperature: Number, // in Celsius
          heartRate: Number, // in BPM
          respiratoryRate: Number,
          weight: Number, // in kg
          height: Number // in cm
        },
        notes: String,
        doctorNotes: String,
        createdAt: {
          type: Date,
          default: Date.now
        }
      }
    ],

    // ── Follow-up Visits ───────────────────────────────────────────────
    followUps: [
      {
        followUpDate: {
          type: Date,
          required: true
        },
        reason: String,
        status: {
          type: String,
          enum: ['scheduled', 'completed', 'cancelled', 'rescheduled'],
          default: 'scheduled'
        },
        notes: String,
        createdAt: {
          type: Date,
          default: Date.now
        }
      }
    ],

    // ── Treatment Progress ────────────────────────────────────────────
    progressPercentage: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    },
    progressNotes: [
      {
        note: String,
        date: {
          type: Date,
          default: Date.now
        },
        createdBy: {
          type: String,
          enum: ['doctor', 'patient'],
          default: 'doctor'
        }
      }
    ],

    // ── Prescriptions Issued ───────────────────────────────────────────
    prescriptions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Prescription'
      }
    ],

    // ── Cost Tracking ──────────────────────────────────────────────────
    estimatedCost: {
      type: Number,
      default: 0
    },
    actualCost: {
      type: Number,
      default: 0
    },
    insuranceCoverage: {
      type: Number,
      default: 0
    },
    patientPayment: {
      type: Number,
      default: 0
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

const Treatment = mongoose.model('Treatment', treatmentSchema);

module.exports = Treatment;
