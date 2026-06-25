const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL, // Your Vercel URL, e.g. https://portfolio-xyz.vercel.app
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio';

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.error('❌ MongoDB Error:', err));

// Models
const Contact = require('./models/Contact');
const Analytics = require('./models/Analytics');

// ========== ROUTES ==========

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'online', timestamp: new Date() });
});

// Contact form submission
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const contact = new Contact({ name, email, message });
    await contact.save();
    res.status(201).json({ success: true, message: 'Message received!' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get all contacts (admin)
app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Log analytics event
app.post('/api/analytics', async (req, res) => {
  try {
    const { event, timestamp, metadata } = req.body;
    const analytics = new Analytics({
      event,
      timestamp: timestamp || new Date(),
      metadata,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
    });
    await analytics.save();
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get analytics summary
app.get('/api/analytics', async (req, res) => {
  try {
    const totalVisits = await Analytics.countDocuments({ event: 'visit' });
    const resumeDownloads = await Analytics.countDocuments({ event: 'resume' });
    const recentEvents = await Analytics.find().sort({ createdAt: -1 }).limit(50);
    res.json({ totalVisits, resumeDownloads, recentEvents });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Log page visit (auto-tracked)
app.post('/api/visit', async (req, res) => {
  try {
    const analytics = new Analytics({
      event: 'visit',
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      metadata: req.body,
    });
    await analytics.save();
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
