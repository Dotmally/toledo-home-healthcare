const mongoose = require('mongoose');

const JobPostingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  requirements: { type: String },
  location: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('JobPosting', JobPostingSchema);
