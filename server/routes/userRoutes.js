const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET: Get user's guess history
router.get('/:uid/history', async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid });
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json(user.history);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

// POST: Save a new guess to the user's history
router.post('/:uid/guess', async (req, res) => {
  const { uid } = req.params;
  const { chord, correct } = req.body;

  try {
    const user = await User.findOne({ uid });

    if (!user) return res.status(404).json({ error: 'User not found' });

    user.history.push({ chord, correct });
    await user.save();

    res.status(200).json({ message: 'Guess saved' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/:uid/reset-history', async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid });
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.history = []; // clear history
    await user.save();

    res.status(200).json({ message: 'History cleared' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/:uid/change-difficulty', async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid});
    if (!user) return res.status(404).json({ error: 'User not found' });

    const { difficulty } = req.body;
    if (!difficulty) return res.status(400).json({ error: 'No difficulty provided' });

    user.settings.difficulty = difficulty;
    await user.save();
    res.json({ message: 'Difficulty updated', settings: user.settings });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
});

router.post('/:uid/change-theme', async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid});
    if (!user) return res.status(404).json({ error: 'User not found' });

    const { theme } = req.body;
    if (!theme) return res.status(400).json({ error: 'No theme provided' });

    user.settings.theme = theme;
    await user.save();
    res.json({ message: 'Theme updated', settings: user.settings });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
});

router.post('/:uid/change-volume', async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid});
    if (!user) return res.status(404).json({ error: 'User not found' });

    const { volume } = req.body;
    if (!volume) return res.status(400).json({ error: 'No volume provided' });

    user.settings.volume = volume;
    await user.save();
    res.json({ message: 'Volume updated', settings: user.settings });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
});

router.get('/:uid/settings', async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid });
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({
      volume: user.settings?.volume ?? 100,
      difficulty: user.settings?.difficulty ?? 'medium',
      theme: user.settings?.theme ?? 'system',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:uid/current-chord', async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid });
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({ currentChord: user.currentChord || null });
  } catch (err) {
    console.error('Error fetching currentChord:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST (update) currentChord for a user
router.post('/:uid/current-chord', async (req, res) => {
  try {
    const { currentChord } = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { uid: req.params.uid },
      { currentChord },
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ error: 'User not found' });

    res.json({ message: 'Current chord updated', currentChord });
  } catch (err) {
    console.error('Error updating currentChord:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:uid/stats', async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid });
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({
      games: user.stats?.games ?? 0,
      attempts: user.stats?.attempts ?? 0,
      wins: user.stats?.wins ?? 0,
      winStreak: user.stats?.winStreak ?? 0,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/:uid/increment-games', async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid });
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Ensure stats object exists
    if (!user.stats) user.stats = {};

    // Initialize games if undefined
    user.stats.games = (user.stats.games ?? 0) + 1;

    await user.save();

    res.json({ message: 'Games count incremented', games: user.stats.games });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/:uid/increment-wins', async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid });
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Ensure stats object exists
    if (!user.stats) user.stats = {};

    // Initialize wins if undefined
    user.stats.wins = (user.stats.wins ?? 0) + 1;

    await user.save();

    res.json({ message: 'Wins count incremented', wins: user.stats.wins });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/:uid/increment-attempts', async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const { amount } = req.body;
    if (typeof amount !== 'number' || isNaN(amount)) {
      return res.status(400).json({ error: 'Invalid or missing amount' });
    }

    // Ensure stats and attempts exist
    if (!user.stats) user.stats = {};
    user.stats.attempts = (user.stats.attempts ?? 0) + amount;

    await user.save();

    res.json({ message: 'Attempts incremented', attempts: user.stats.attempts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;
