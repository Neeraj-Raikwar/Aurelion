const Enquiry = require('../models/Enquiry');
const sendEnquiryEmail = require('../utils/sendEmail');

// @desc    Create a new enquiry
// @route   POST /api/enquiries
const createEnquiry = async (req, res) => {
  try {
    const { name, email, phone, model, message } = req.body;

    const enquiry = new Enquiry({
      name,
      email,
      phone,
      model,
      message
    });

    const savedEnquiry = await enquiry.save();

    // Try to send the email notification. We wrap this separately
    // in its own try/catch so that if the EMAIL fails (wrong
    // credentials, network issue, etc.), the enquiry is still
    // saved successfully and the user still gets a success response —
    // an email hiccup shouldn't make their submission look like it failed.
    try {
      await sendEnquiryEmail(savedEnquiry);
    } catch (emailError) {
      console.error('Enquiry saved, but email notification failed:', emailError.message);
    }

    res.status(201).json(savedEnquiry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all enquiries (for you to check submissions)
// @route   GET /api/enquiries
const getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createEnquiry, getEnquiries };
