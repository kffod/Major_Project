const mongoose = require('mongoose');

const scannedAccountSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  isBot: {
    type: Boolean,
    required: true
  },
  userData: {
    type: Object,
    required: true
  },
  predictionDetails: {
    type: String,
    required: true
  },
  feedback: {
    type: String,
    enum: ['accurate', 'inaccurate', null],
    default: null
  },
  feedbackComment: {
    type: String,
    default: null
  },
  scannedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ScannedAccount', scannedAccountSchema); 