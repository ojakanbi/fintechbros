const express = require('express');
const router = express.Router();
const SavedStock = require('../models/SavedStock'); 



router.post('/', async (req, res) => {
  try {
    const { userId, symbol, companyName, latestPrice } = req.body;

    if (!userId || !symbol || !companyName || !latestPrice) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newStock = new SavedStock({
      userId,
      symbol,
      companyName,
      latestPrice,
    });

    const saved = await newStock.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error('❌ Error saving stock:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const stocks = await SavedStock.find({ userId }).sort({ createdAt: -1 }); // latest first
    res.status(200).json(stocks);
  } catch (error) {
    console.error('❌ Error fetching saved stocks:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
