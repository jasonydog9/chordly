const mongoose = require('mongoose');
const fs = require('fs');
const Chord = require('../models/Chord');
require('dotenv').config();

async function importChords() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const data = JSON.parse(fs.readFileSync('all_5note_chords_with_type_FIXED.json', 'utf-8'));
    const data2 = JSON.parse(fs.readFileSync('popular_3_4_note_chords.json', 'utf-8'));

    await Chord.deleteMany(); // optional: clears existing data
    await Chord.insertMany(data);
    await Chord.insertMany(data2);

    console.log('✅ Successfully imported chords!');
    process.exit();
  } catch (error) {
    console.error('❌ Import failed:', error);
    process.exit(1);
  }
}

importChords();