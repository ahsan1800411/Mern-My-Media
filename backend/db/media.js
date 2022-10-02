const mongoose = require('mongoose');

const mediaScehma = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
    },

    videos: [{ type: String, default: [] }],
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Media', mediaScehma);
