// ═══════════════════════════════════════════════════════════════════════════
// TREATMENT MODEL - models/Treatment.js
// ═══════════════════════════════════════════════════════════════════════════

const mongoose = require('mongoose');

const treatmentSchema = new mongoose.Schema(
  {
    // ── Link to Appointment ────────────────────────────────────────────
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Appointment',
      required: true
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

    // ── Diagnosis ──────────────────────────────────────────────────────
    diagnosis: {
      type: String,
      required: [true, 'Please provide diagnosis']
    },
    diagnosticTests: {
      type: [String],
      default: []
      // e.g., ['Blood Test', 'X-Ray', 'CT Scan']
    },

    // ── Vital Signs at Visit ───────────────────────────────────────────
    vitalSigns: {
      temperature: Number, // in Celsius
      bloodPressure: String, // e.g., "120/80"
      heartRate: Number, // beats per minute
      respiratoryRate: Number,
      oxygenSaturation: Number // SpO2 percentage
    },

    // ── Physical Examination ───────────────────────────────────────────
    physicalExamination: {
      type: String,
      maxlength: [1000, 'Examination notes cannot exceed 1000 characters']
    },

    // ── Treatment Plan ────────────────────────────────────────────────
    treatmentPlan: {
      type: String,
      required: [true, 'Please provide treatment plan']
    },
    medicines: {
      type: [String],
      default: []
    },

    // ── Follow-up Details ──────────────────────────────────────────────
    followUpRequired: {
      type: Boolean,
      default: false
    },
    followUpAfterDays: Number,
    recommendations: {
      type: [String],
      default: []
      // e.g., ['Rest', 'Avoid heavy work', 'Drink plenty of water']
    },

    // ── Treatment Status ──────────────────────────────────────────────
    status: {
      type: String,
      enum: ['ongoing', 'completed', 'paused'],
      default: 'ongoing'
    },

    // ── Visit Details ──────────────────────────────────────────────────
    visitDate: {
      type: Date,
      required: true
    },
    visitDuration: Number, // in minutes

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
