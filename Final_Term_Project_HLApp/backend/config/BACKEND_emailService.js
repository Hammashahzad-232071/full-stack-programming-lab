// ═══════════════════════════════════════════════════════════════════════════
// EMAIL SERVICE - config/emailService.js
// ═══════════════════════════════════════════════════════════════════════════

const nodemailer = require('nodemailer');

/**
 * Transporter configuration for Gmail SMTP
 * You need to:
 * 1. Enable 2-Step Verification in Gmail
 * 2. Generate App Password (16-character)
 * 3. Use App Password in .env EMAIL_PASSWORD
 */
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

/**
 * Send appointment confirmation email
 */
const sendAppointmentConfirmation = async (email, appointmentDetails) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: '✅ Appointment Confirmed - Healthcare System',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #2ecc71;">Appointment Confirmed ✅</h2>
          <p>Dear Patient,</p>
          <p>Your appointment has been successfully booked!</p>
          
          <div style="background-color: #f0f0f0; padding: 15px; margin: 20px 0; border-left: 4px solid #2ecc71;">
            <p><strong>Doctor:</strong> ${appointmentDetails.doctorName}</p>
            <p><strong>Date:</strong> ${appointmentDetails.date}</p>
            <p><strong>Time:</strong> ${appointmentDetails.time}</p>
            <p><strong>Reason:</strong> ${appointmentDetails.reason}</p>
          </div>
          
          <p>Please arrive 10 minutes before your appointment.</p>
          <p>Best regards,<br/>Healthcare System</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Appointment confirmation email sent to:', email);
  } catch (error) {
    console.error('❌ Error sending email:', error.message);
  }
};

/**
 * Send medication reminder email
 */
const sendMedicationReminder = async (email, medicationDetails) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: '💊 Medication Reminder - Healthcare System',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #3498db;">Medication Reminder 💊</h2>
          <p>Dear Patient,</p>
          <p>This is a reminder to take your medication.</p>
          
          <div style="background-color: #f0f0f0; padding: 15px; margin: 20px 0; border-left: 4px solid #3498db;">
            <p><strong>Medication:</strong> ${medicationDetails.name}</p>
            <p><strong>Dosage:</strong> ${medicationDetails.dosage}</p>
            <p><strong>Frequency:</strong> ${medicationDetails.frequency}</p>
          </div>
          
          <p>Take as prescribed by your doctor.</p>
          <p>Best regards,<br/>Healthcare System</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Medication reminder sent to:', email);
  } catch (error) {
    console.error('❌ Error sending email:', error.message);
  }
};

/**
 * Send follow-up reminder email
 */
const sendFollowUpReminder = async (email, followUpDetails) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: '📋 Follow-up Appointment Reminder - Healthcare System',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #e74c3c;">Follow-up Reminder 📋</h2>
          <p>Dear Patient,</p>
          <p>You have a follow-up appointment scheduled.</p>
          
          <div style="background-color: #f0f0f0; padding: 15px; margin: 20px 0; border-left: 4px solid #e74c3c;">
            <p><strong>Date:</strong> ${followUpDetails.date}</p>
            <p><strong>Time:</strong> ${followUpDetails.time}</p>
            <p><strong>Doctor:</strong> ${followUpDetails.doctorName}</p>
          </div>
          
          <p>Please don't miss this important appointment.</p>
          <p>Best regards,<br/>Healthcare System</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Follow-up reminder sent to:', email);
  } catch (error) {
    console.error('❌ Error sending email:', error.message);
  }
};

module.exports = {
  sendAppointmentConfirmation,
  sendMedicationReminder,
  sendFollowUpReminder
};
