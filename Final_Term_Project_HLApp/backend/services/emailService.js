// ═══════════════════════════════════════════════════════════════════════════
// EMAIL SERVICE - services/emailService.js
// ═══════════════════════════════════════════════════════════════════════════

const nodemailer = require('nodemailer');

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

/**
 * Send Email
 * @param {object} options - { to, subject, text, html }
 */
const sendEmail = async (options) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html || options.text
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully to:', options.to);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};

/**
 * Send Appointment Confirmation Email
 */
const sendAppointmentConfirmation = async (patientEmail, appointmentDetails) => {
  try {
    const html = `
      <h2>Appointment Confirmation</h2>
      <p>Dear Patient,</p>
      <p>Your appointment has been confirmed with the following details:</p>
      <ul>
        <li><strong>Date:</strong> ${appointmentDetails.date}</li>
        <li><strong>Time:</strong> ${appointmentDetails.time}</li>
        <li><strong>Doctor:</strong> ${appointmentDetails.doctorName}</li>
        <li><strong>Specialization:</strong> ${appointmentDetails.specialization}</li>
        <li><strong>Hospital:</strong> ${appointmentDetails.hospital}</li>
      </ul>
      <p>Please arrive 15 minutes before your appointment.</p>
      <p>Best regards,<br>Healthcare System Team</p>
    `;

    await sendEmail({
      to: patientEmail,
      subject: 'Appointment Confirmation',
      html: html
    });
  } catch (error) {
    console.error('Error sending appointment confirmation:', error);
  }
};

/**
 * Send Medication Reminder Email
 */
const sendMedicationReminder = async (patientEmail, medicationDetails) => {
  try {
    const html = `
      <h2>Medication Reminder</h2>
      <p>Dear Patient,</p>
      <p>This is a reminder to take your prescribed medication:</p>
      <ul>
        <li><strong>Medicine:</strong> ${medicationDetails.medicineName}</li>
        <li><strong>Dosage:</strong> ${medicationDetails.dosage}</li>
        <li><strong>Frequency:</strong> ${medicationDetails.frequency}</li>
      </ul>
      <p>Please follow your doctor's instructions carefully.</p>
      <p>Best regards,<br>Healthcare System Team</p>
    `;

    await sendEmail({
      to: patientEmail,
      subject: 'Medication Reminder',
      html: html
    });
  } catch (error) {
    console.error('Error sending medication reminder:', error);
  }
};

/**
 * Send Follow-up Reminder Email
 */
const sendFollowUpReminder = async (patientEmail, followUpDetails) => {
  try {
    const html = `
      <h2>Follow-up Reminder</h2>
      <p>Dear Patient,</p>
      <p>You have a follow-up appointment scheduled:</p>
      <ul>
        <li><strong>Date:</strong> ${followUpDetails.date}</li>
        <li><strong>Time:</strong> ${followUpDetails.time}</li>
        <li><strong>Doctor:</strong> ${followUpDetails.doctorName}</li>
        <li><strong>Reason:</strong> ${followUpDetails.reason}</li>
      </ul>
      <p>Please confirm your attendance or reschedule if necessary.</p>
      <p>Best regards,<br>Healthcare System Team</p>
    `;

    await sendEmail({
      to: patientEmail,
      subject: 'Follow-up Appointment Reminder',
      html: html
    });
  } catch (error) {
    console.error('Error sending follow-up reminder:', error);
  }
};

module.exports = {
  sendEmail,
  sendAppointmentConfirmation,
  sendMedicationReminder,
  sendFollowUpReminder
};
