// services/emailService.js
const nodemailer = require('nodemailer');

const sendEmail = async (feedback) => {
  const transporter = nodemailer.createTransport({
    service: 'mishrakajal2200@gmail.com', // Replace with your email provider
    auth: {
      user: process.env.EMAIL, // Your email address
      pass: process.env.EMAIL_PASSWORD, // Your email password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL, // Sender address
    to: process.env.RECEIVER_EMAIL, // Receiver address
    subject: `New Feedback from ${feedback.name}`,
    text: `
      You received a new feedback message:
      Name: ${feedback.name}
      Email: ${feedback.email}
      Message: ${feedback.message}
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };
