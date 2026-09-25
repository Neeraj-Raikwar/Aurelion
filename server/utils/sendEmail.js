const { Resend } = require('resend');

// Resend sends email over a normal HTTPS API call (like any other
// fetch request) instead of raw SMTP (port 465/587). This matters
// because many hosting platforms — Render included, on lower tiers —
// block outbound SMTP ports entirely to prevent spam abuse. An HTTPS
// API call uses port 443, the same port your website itself runs on,
// so it is never blocked.
const resend = new Resend(process.env.RESEND_API_KEY);

const sendEnquiryEmail = async (enquiry) => {
  await resend.emails.send({
   
    from: 'AURELION Website <onboarding@resend.dev>',
    to: process.env.EMAIL_USER, // your own email — where you want to RECEIVE enquiries
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
  });
};

module.exports = sendEnquiryEmail;
