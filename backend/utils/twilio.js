
const twilio = require('twilio');
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

const sendWhatsAppMessage = (message) => {
  return client.messages.create({
    body: message,
    from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`, // Your Twilio WhatsApp number
    to: 'whatsapp:+918866224439', // The recipient's phone number
  });
};

module.exports = sendWhatsAppMessage;
