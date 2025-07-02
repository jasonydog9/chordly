// app.js
const verifyFirebaseToken = require('./middleware/auth');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db/conn');
const User = require('./models/User');

const chordRoutes = require('./routes/chordRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors({
  origin: 'https://main.d3ejib4je4v5tu.amplifyapp.com', // replace with frontend domain
  credentials: true
}));
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/chords', chordRoutes);

// Connect to MongoDB (only once)
connectDB();

// Login route
app.post('/api/login', verifyFirebaseToken, async (req, res) => {
  const { uid, email, name, picture } = req.user;

  try {
    let user = await User.findOne({ uid });

    if (!user) {
      user = await User.create({
        uid,
        email,
        displayName: name,
        photoURL: picture
      });
      console.log('🆕 New user saved');
    }

    res.json({ message: 'User authenticated', user });
  } catch (err) {
    console.error('❌ Error saving user:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user by username
app.get('/api/users/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/hello', (req, res) => {
  res.json({ message: 'Hello from Lambda!' });
});

// Save or update user score
app.post('/api/users/:username/score', async (req, res) => {
  const { username } = req.params;
  const { score, chord, correct } = req.body;

  try {
    let user = await User.findOne({ username });

    if (!user) {
      user = new User({
        username,
        totalScore: score,
        history: [{ chord, correct }],
      });
    } else {
      user.totalScore += score;
      user.history.push({ chord, correct });
    }

    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = app;

// Start server
/*app.listen(process.env.PORT || 3001, () => {
  console.log(`Server running on http:localhost:${process.env.PORT || 3001}`);
});*/