const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  email: String,
  displayName: String,
  photoURL: String,
  currentChord: [String], /*current answer*/
  stats:
  {
    games: {type: Number, default: 0},
    attempts: {type: Number, default: 0},
    wins: {type: Number, default: 0},
    winStreak: {type: Number, default: 0}
  },
  settings: {
    difficulty: { type: String, default: 'medium' },
    soundEnabled: { type: Boolean, default: true },
    volume: {type: Number, default: 100},
    theme: {type: String, default: 'system'}

  },
  history: [{
    chord: [String],
    correct: Boolean,
    timestamp: { type: Date, default: Date.now }
  }]
});

module.exports = mongoose.model('User', userSchema);