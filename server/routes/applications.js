const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Application = require('../models/Application'); 

// Configure file storage
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// POST: Save application to DB
router.post('/', upload.single('resume'), async (req, res) => {
  const { name, email, phone, message, jobId } = req.body;
  const resumePath = req.file ? req.file.path : null;

  try {
    const newApp = new Application({
      name,
      email,
      phone,
      message,
      resumePath,
      jobId, // associate with specific job
    });

    await newApp.save();

    res.status(200).json({ message: 'Application saved successfully!' });
  } catch (err) {
    console.error('Error saving application:', err);
    res.status(500).json({ message: 'Failed to save application.' });
  }
});

// ✅ GET: Fetch all applications
router.get('/', async (req, res) => {
  try {
    const applications = await Application.find().sort({ submittedAt: -1 });
    res.status(200).json(applications);
  } catch (err) {
    console.error('Error fetching applications:', err);
    res.status(500).json({ message: 'Failed to retrieve applications.' });
  }
});

module.exports = router;
