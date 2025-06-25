require('dotenv').config();
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Serve uploaded resumes
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Connect to MongoDB

console.log('Node environment:', process.env.NODE_ENV);
console.log('MongoDB host:', process.env.MONGODB_URI?.split('@')[1]?.split('/')[0]);
const MONGODB_URI = process.env.MONGODB_URI;

// Critical failure if URI is missing
if (!MONGODB_URI) {
  console.error('❌ Critical Error: MONGODB_URI is required');
  console.error('For local development: Create .env file in /server');
  console.error('For production: Set in Render Environment Variables');
  process.exit(1);
}

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected to', MONGODB_URI.split('@')[1].split('/')[0]))
  .catch(err => {
    console.error('❌ Connection failed:', err.message);
    process.exit(1);
  });

// Ensure uploads folder exists
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

// 👇 Job routes
const jobRoutes = require('./routes/jobs');
app.use('/api/jobs', jobRoutes);

const applicationRoutes = require('./routes/applications');
app.use('/api/applications', applicationRoutes);

app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  if (password === process.env.ADMIN_PASSWORD) {
    res.status(200).json({ success: true });
  } else {
    res.status(401).json({ success: false, message: 'Incorrect password' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));