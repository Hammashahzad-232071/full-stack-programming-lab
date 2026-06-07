// ═══════════════════════════════════════════════════════════════════════════
// UTILITIES VALIDATORS - utils/validators.js
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Validate Email Format
 */
const validateEmail = (email) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
};

/**
 * Validate Password Strength
 */
const validatePassword = (password) => {
  // Minimum 6 characters, at least one uppercase, one lowercase, one number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
  return passwordRegex.test(password);
};

/**
 * Validate Phone Number
 */
const validatePhone = (phone) => {
  const phoneRegex = /^[0-9]{10,15}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
};

/**
 * Validate Blood Type
 */
const validateBloodType = (bloodType) => {
  const validTypes = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];
  return validTypes.includes(bloodType);
};

/**
 * Validate Role
 */
const validateRole = (role) => {
  const validRoles = ['admin', 'doctor', 'patient'];
  return validRoles.includes(role);
};

/**
 * Validate Appointment Status
 */
const validateAppointmentStatus = (status) => {
  const validStatuses = ['pending', 'approved', 'rejected', 'completed', 'cancelled'];
  return validStatuses.includes(status);
};

/**
 * Validate Date Format (YYYY-MM-DD)
 */
const validateDate = (dateString) => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateString)) return false;
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
};

/**
 * Validate Time Format (HH:MM)
 */
const validateTime = (timeString) => {
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  return timeRegex.test(timeString);
};

/**
 * Validate Height (in cm)
 */
const validateHeight = (height) => {
  return height >= 50 && height <= 300;
};

/**
 * Validate Weight (in kg)
 */
const validateWeight = (weight) => {
  return weight >= 10 && weight <= 500;
};

module.exports = {
  validateEmail,
  validatePassword,
  validatePhone,
  validateBloodType,
  validateRole,
  validateAppointmentStatus,
  validateDate,
  validateTime,
  validateHeight,
  validateWeight
};
