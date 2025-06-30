const mongoose = require('mongoose');

const chordSchema = new mongoose.Schema({
  root: String,
  name: String,
  notes: [String],
  midi: [Number],
  type: {
    type: String,
    enum: ['3-note', '4-note', '5-note'],
    required: true
  }
});

module.exports = mongoose.model('Chord', chordSchema);