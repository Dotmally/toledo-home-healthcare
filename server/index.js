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
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/toledo_healthcare', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
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