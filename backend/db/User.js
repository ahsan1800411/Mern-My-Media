const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    address: String,
    image: String,
    role: {
      type: String,
      default: 'user',
    },
    token: {
      type: String,
      required: false,
      default: null,
    },

    planId: String,
    videosLeft: {
      type: Number,
    },
    storageLeft: {
      type: String,
    },

    API_KEYS: [{ type: String }],
    app_name: [{ type: String }],
    otherId: {
      type: mongoose.Types.ObjectId,
      ref: 'Plan',
    },
  },

  {
    timestamps: true,
  }
);

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
// compare password>>
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};
module.exports = mongoose.model('User', userSchema);
