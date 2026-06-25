const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  event: { type: String, required: true, index: true },
  ip: { type: String },
  userAgent: { type: String },
  metadata: { type: mongoose.Schema.Types.Mixed },
}, { timestamps: true });

module.exports = mongoose.model('Analytics', analyticsSchema);
