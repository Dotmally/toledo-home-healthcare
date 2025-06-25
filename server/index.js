console.log('Checking environment variables...');
console.log('MONGODB_URI exists?', !!process.env.MONGODB_URI);
console.log('All env vars:', Object.keys(process.env));
require('dotenv').config();
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

const app = express();
const allowedOrigins = [
  'https://toledohhc.com',              // Your production domain
  'https://shiny-clafoutis-66daf7.netlify.app', // Your Netlify domain
  'http://localhost:3000'               // Local development
];
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `CORS policy: ${origin} not allowed`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));
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