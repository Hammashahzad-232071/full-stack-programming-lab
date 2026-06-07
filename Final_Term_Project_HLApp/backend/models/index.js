// ═══════════════════════════════════════════════════════════════════════════
// MODELS INDEX - models/index.js
// ═══════════════════════════════════════════════════════════════════════════

const User = require('./User');
const Doctor = require('./Doctor');
const Patient = require('./Patient');
const Appointment = require('./Appointment');
const Treatment = require('./Treatment');
const Prescription = require('./Prescription');
const Notification = require('./Notification');

module.exports = {
  User,
  Doctor,
  Patient,
  Appointment,
  Treatment,
  Prescription,
  Notification
};
