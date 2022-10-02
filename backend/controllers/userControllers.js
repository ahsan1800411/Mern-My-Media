const User = require('../db/User');
const Plan = require('../db/plan');
const Media = require('../db/media');
const Key = require('../db/key');

exports.getUsersCount = async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalVideos = await Media.countDocuments();
  res.status(200).json({
    success: true,
    totalUsers,
    totalVideos,
  });
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({ _id: id });

  if (!user) {
    return res.status(400).json({ success: false, message: 'User not found' });
  }

  const userUpdated = await User.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ userUpdated });
};

exports.checkUserInfo = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.data.userId });

    const plan = await Plan.findOne({ _id: user.otherId });
    res.status(200).json({
      user,
      plan,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};

exports.createApiKeys = async (req, res) => {
  try {
    const { app_name } = req.body;

    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: 'User not found' });
    }

    const time = new Date().getTime();
    const newTime = new Date();
    if (user.app_name.length > 0) {
      user.app_name = [...user.app_name, app_name];
      user.API_KEYS = [...user.API_KEYS, `APP-${app_name}-${time}`];
    } else {
      user.app_name = app_name;
      user.API_KEYS = `APP-${app_name}-${time}`;
    }

    await user.save();

    await Key.create({
      API_KEY: `APP-${app_name}-${time}`,
      userId: user._id,
      app_name,
    });

    res.status(200).json({
      user,
      newTime,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};
exports.deleteApiKeys = async (req, res) => {
  try {
    const { name } = req.body;

    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: 'User not found' });
    }

    const app = user.app_name.indexOf(name);

    user.app_name = user.app_name.filter((app_name, index) => index !== app);

    const api_key = user.API_KEYS.find((api_key) => api_key.includes(name));

    const index_api_key = user.API_KEYS.indexOf(api_key);

    user.API_KEYS = user.API_KEYS.filter(
      (key, index) => index !== index_api_key
    );
    await Key.findOneAndDelete({ API_KEYS: api_key });

    await user.save();

    res.status(200).json({
      msg: 'Deletd Successfully',
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};
