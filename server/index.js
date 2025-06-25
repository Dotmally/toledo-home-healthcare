require('dotenv').config();
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const MONGODB_URI = process.env.MONGODB_URI;

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Serve uploaded resumes
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Connect to MongoDB
console.log("Connecting to MongoDB with URI:", MONGODB_URI.replace(/:[^@]+@/, ':*****@'));
if (!MONGODB_URI) {
  console.error('❌ No MongoDB URI found in environment variables');
  process.exit(1);
}

mongoose.connect(MONGODB_URI, {
  retryWrites: true,
  w: 'majority'
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Ensure uploads folder exists
if (!fs.existsSync('./uploads')) fs.mkdirSync('./uploads');

// 👇 Job routes
const jobRoutes = require('./routes/jobs');
app.use('/api/jobs', jobRoutes);

const applicationRoutes = require('./routes/applications');
app.use('/api/applications', applicationRoutes);

app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  console.log('Password from .env:', process.env.ADMIN_PASSWORD);
  console.log('Password received:', password);
  if (password === process.env.ADMIN_PASSWORD) {
    res.status(200).json({ success: true });
  } else {
    res.status(401).json({ success: false, message: 'Incorrect password' });
  }
});


// Start server
app.listen(5000, () => console.log('🚀 Server running on http://localhost:5000'));