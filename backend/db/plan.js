const mongoose = require('mongoose');

const planSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    languages: [],
    videosAllowed: Number,
    monthlyPrice: Number,
    annualPrice: Number,
    status: String,
    storageAllowed: String,
    desc1: String,
    desc2: String,
    desc3: String,
    desc4: String,
    desc5: String,
    desc6: String,
    desc7: String,
    desc8: String,
    desc9: String,
    desc10: String,
    time: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Plan', planSchema);
