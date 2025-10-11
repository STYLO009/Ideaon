// server/src/routes/api.js
const express = require('express');
const router = express.Router();
const Correction = require('../models/Correction');

// POST /api/corrections  -> save a user correction
router.post('/corrections', async (req, res) => {
  try {
    const { userId, detectedLabel, correctedLabel, imageMeta, notes } = req.body;
    const c = new Correction({ userId, detectedLabel, correctedLabel, imageMeta, notes });
    await c.save();
    res.status(201).json({ ok: true, id: c._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'save_failed' });
  }
});

// GET /api/corrections  -> list recent corrections (for admin)
router.get('/corrections', async (req, res) => {
  try {
    const items = await Correction.find().sort({ timestamp: -1 }).limit(100);
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok:false });
  }
});

module.exports = router;
