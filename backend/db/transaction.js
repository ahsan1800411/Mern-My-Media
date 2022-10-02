const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    planId: {
      type: mongoose.Types.ObjectId,
      ref: 'Plan',
    },
    email: String,
    amount: Number,
    planName: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Transaction', transactionSchema);
