// ═══════════════════════════════════════════════════════════════════════════
// VALIDATION UTILITIES - utils/validators.js
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email
 */
const validateEmail = (email) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {object} { isValid: boolean, message: string }
 */
const validatePassword = (password) => {
  if (!password) {
    return { isValid: false, message: 'Password is required' };
  }

  if (password.length < 6) {
    return { isValid: false, message: 'Password must be at least 6 characters' };
  }

  if (password.length > 50) {
    return { isValid: false, message: 'Password cannot exceed 50 characters' };
  }

  return { isValid: true, message: 'Password is valid' };
};

/**
 * Validate phone number (international format)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid phone
 */
const validatePhone = (phone) => {
  const phoneRegex = /^[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}$/;
  return phoneRegex.test(phone);
};

/**
 * Validate name format
 * @param {string} name - Name to validate
 * @returns {object} { isValid: boolean, message: string }
 */
const validateName = (name) => {
  if (!name) {
    return { isValid: false, message: 'Name is required' };
  }

  const trimmedName = name.trim();

  if (trimmedName.length < 2) {
    return { isValid: false, message: 'Name must be at least 2 characters' };
  }

  if (trimmedName.length > 100) {
    return { isValid: false, message: 'Name cannot exceed 100 characters' };
  }

  // Check for valid characters (letters, spaces, hyphens)
  const nameRegex = /^[a-zA-Z\s\-']+$/;
  if (!nameRegex.test(trimmedName)) {
    return { isValid: false, message: 'Name can only contain letters, spaces, hyphens, and apostrophes' };
  }

  return { isValid: true, message: 'Name is valid' };
};

/**
 * Validate blood type
 * @param {string} bloodType - Blood type to validate
 * @returns {boolean} True if valid blood type
 */
const validateBloodType = (bloodType) => {
  const validTypes = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];
  return validTypes.includes(bloodType);
};

/**
 * Validate gender
 * @param {string} gender - Gender to validate
 * @returns {boolean} True if valid gender
 */
const validateGender = (gender) => {
  const validGenders = ['Male', 'Female', 'Other'];
  return validGenders.includes(gender);
};

/**
 * Validate role
 * @param {string} role - Role to validate
 * @returns {boolean} True if valid role
 */
const validateRole = (role) => {
  const validRoles = ['admin', 'doctor', 'patient'];
  return validRoles.includes(role);
};

/**
 * Validate registration input
 * @param {object} data - Registration data
 * @returns {object} { isValid: boolean, errors: array }
 */
const validateRegistration = (data) => {
  const errors = [];

  // Check name
  if (!data.name) {
    errors.push('Name is required');
  } else {
    const nameValidation = validateName(data.name);
    if (!nameValidation.isValid) {
      errors.push(nameValidation.message);
    }
  }

  // Check email
  if (!data.email) {
    errors.push('Email is required');
  } else if (!validateEmail(data.email)) {
    errors.push('Please provide a valid email address');
  }

  // Check password
  if (!data.password) {
    errors.push('Password is required');
  } else {
    const passwordValidation = validatePassword(data.password);
    if (!passwordValidation.isValid) {
      errors.push(passwordValidation.message);
    }
  }

  // Check confirm password
  if (!data.confirmPassword) {
    errors.push('Please confirm your password');
  } else if (data.password !== data.confirmPassword) {
    errors.push('Passwords do not match');
  }

  // Check role
  if (!data.role) {
    errors.push('Role is required');
  } else if (!validateRole(data.role)) {
    errors.push('Invalid role. Must be admin, doctor, or patient');
  }

  return {
    isValid: errors.length === 0,
    errors: errors
  };
};

/**
 * Validate appointment creation
 * @param {object} data - Appointment data
 * @returns {object} { isValid: boolean, errors: array }
 */
const validateAppointment = (data) => {
  const errors = [];

  if (!data.patientId) errors.push('Patient ID is required');
  if (!data.appointmentDate) errors.push('Appointment date is required');
  if (!data.appointmentTime) errors.push('Appointment time is required');
  if (!data.reason) errors.push('Reason for appointment is required');

  // Validate date is in future
  if (data.appointmentDate) {
    const appointmentDate = new Date(data.appointmentDate);
    const today = new Date();
    if (appointmentDate < today) {
      errors.push('Appointment date must be in the future');
    }
  }

  return {
    isValid: errors.length === 0,
    errors: errors
  };
};

/**
 * Validate prescription data
 * @param {object} data - Prescription data
 * @returns {object} { isValid: boolean, errors: array }
 */
const validatePrescription = (data) => {
  const errors = [];

  if (!data.appointmentId) errors.push('Appointment ID is required');
  if (!data.patientId) errors.push('Patient ID is required');
  if (!data.doctorId) errors.push('Doctor ID is required');
  if (!data.medicines || data.medicines.length === 0) {
    errors.push('At least one medicine is required');
  }
  if (!data.expiryDate) errors.push('Expiry date is required');

  // Validate medicines
  if (data.medicines && Array.isArray(data.medicines)) {
    data.medicines.forEach((medicine, index) => {
      if (!medicine.name) errors.push(`Medicine ${index + 1}: Name is required`);
      if (!medicine.dosage) errors.push(`Medicine ${index + 1}: Dosage is required`);
      if (!medicine.frequency) errors.push(`Medicine ${index + 1}: Frequency is required`);
      if (!medicine.duration) errors.push(`Medicine ${index + 1}: Duration is required`);
    });
  }

  return {
    isValid: errors.length === 0,
    errors: errors
  };
};

module.exports = {
  validateEmail,
  validatePassword,
  validatePhone,
  validateName,
  validateBloodType,
  validateGender,
  validateRole,
  validateRegistration,
  validateAppointment,
  validatePrescription
};
