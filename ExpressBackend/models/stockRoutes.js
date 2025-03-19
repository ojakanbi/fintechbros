// Modeling what to store in the database for saved stocks

const mongoose = require('mongoose');

const SavedStockSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  symbol: { type: String, required: true },
  companyName: { type: String, required: true },
  latestPrice: { type: Number, required: true },
  savedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SavedStock', SavedStockSchema);
