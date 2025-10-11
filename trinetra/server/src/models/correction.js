// server/src/models/Correction.js
const mongoose = require('mongoose');

const CorrectionSchema = new mongoose.Schema({
  userId: { type: String, default: 'anonymous' },
  timestamp: { type: Date, default: Date.now },
  imageMeta: { type: Object }, // optional: bounding boxes, camera meta (dont store raw images unless explicit opt-in)
  detectedLabel: { type: String },
  correctedLabel: { type: String },
  notes: { type: String }
});

module.exports = mongoose.model('Correction', CorrectionSchema);
