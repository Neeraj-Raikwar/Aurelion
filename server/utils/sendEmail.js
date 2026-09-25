const nodemailer = require('nodemailer');

// This function sends you (the site owner) an email every time
// someone submits the enquiry form.
const sendEnquiryEmail = async (enquiry) => {
  // A "transporter" is nodemailer's term for the email-sending
  // connection — here we're using Gmail's SMTP server.
  // service: 'gmail' automatically fills in Gmail's host/port,
  // so we only need to give it the login credentials.
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // your Gmail address
      pass: process.env.EMAIL_PASS, // a Gmail "App Password" (NOT your normal password — see note below)
    },
  });

  const mailOptions = {
    from: `"AURELION Website" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER, // sending the notification to yourself
    subject: `New Enquiry — ${enquiry.model || 'General'}`,
    html: `
      <h2>New Consultation Request</h2>
      <p><strong>Name:</strong> ${enquiry.name}</p>
      <p><strong>Email:</strong> ${enquiry.email}</p>
      <p><strong>Phone:</strong> ${enquiry.phone || 'Not provided'}</p>
      <p><strong>Model:</strong> ${enquiry.model || 'General'}</p>
      <p><strong>Message:</strong></p>
      <p>${enquiry.message}</p>
    `,
  };

  // sendMail returns a promise — we await it so any error
  // (bad credentials, network issue) gets caught by whoever calls this.
  await transporter.sendMail(mailOptions);
};

module.exports = sendEnquiryEmail;
