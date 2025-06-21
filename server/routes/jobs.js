const express = require('express');
const router = express.Router();
const JobPosting = require('../models/JobPosting');

// Create a new job posting
router.post('/', async (req, res) => {
  try {
    const job = new JobPosting(req.body);
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all job postings
router.get('/', async (req, res) => {
  try {
    const jobs = await JobPosting.find();
    res.json(jobs);
  } catch (err) {
    console.error('Error fetching jobs:', err);
    res.status(500).json({ message: 'Failed to retrieve jobs' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const job = await JobPosting.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (err) {
    console.error('Error fetching job:', err);
    res.status(500).json({ message: 'Failed to fetch job' });
  }
});

// Delete a job posting by ID
router.delete('/:id', async (req, res) => {
  try {
    await JobPosting.findByIdAndDelete(req.params.id);
    res.json({ message: 'Job deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
