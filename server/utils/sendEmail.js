const nodemailer = require('nodemailer');

// This function sends you (the site owner) an email every time
// someone submits the enquiry form.
const sendEnquiryEmail = async (enquiry) => {
  // Using explicit host/port instead of service: 'gmail', PLUS forcing
  // family: 4 (IPv4). This fixes a common issue on hosts like Render,
  // where the server tries to connect to Gmail over IPv6 first and
  // fails with ENETUNREACH because the hosting provider doesn't
  // support outbound IPv6 — forcing IPv4 skips that broken path entirely.
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for port 465, false for port 587
    family: 4,    // force IPv4 — this is the actual fix for ENETUNREACH
    auth: {
      user: process.env.EMAIL_USER, // your Gmail address
      pass: process.env.EMAIL_PASS, // a Gmail "App Password" (NOT your normal password)
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
