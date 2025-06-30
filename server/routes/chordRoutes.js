const express = require('express');
const router = express.Router();
const Chord = require('../models/Chord');

// GET /api/chords/random
router.get('/random', async (req, res) => {
  const type = req.query.type || '5-note';
  const count = await Chord.countDocuments({ type });
  const random = Math.floor(Math.random() * count);
  const chord = await Chord.findOne({ type }).skip(random);
  res.json(chord);
});

module.exports = router;
