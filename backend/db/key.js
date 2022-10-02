const mongoose = require('mongoose');

const keySchema = new mongoose.Schema(
  {
    API_KEY: {
      type: String,
    },
    app_name: String,
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model('KEY', keySchema);
