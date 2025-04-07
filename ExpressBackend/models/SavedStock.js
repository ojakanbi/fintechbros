// models/SavedStock.js
const mongoose = require('mongoose');

const savedStockSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  symbol: { type: String, required: true },
  companyName: { type: String, required: true },
  latestPrice: { type: Number, required: true },
}, { timestamps: true });

const SavedStock = mongoose.model('SavedStock', savedStockSchema);

module.exports = SavedStock;


