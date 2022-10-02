const Key = require('../db/key');
const User = require('../db/User');

exports.getAllKeys = async (req, res) => {
  let keys;

  const { role } = req.params;

  if (role === 'admin') {
    const users = (await User.find({ role: 'admin' }).select('_id')).map(
      (user) => user._id
    );
    keys = await Key.find({
      userId: { $in: users },
    }).populate('userId');
  } else if (role === 'user') {
    const users = (await User.find({ role: 'user' }).select('_id')).map(
      (user) => user._id
    );

    keys = await Key.find({
      userId: { $in: users },
    }).populate('userId');
  } else {
    keys = await Key.find().populate('userId');
  }

  res.status(200).json({ keys });
};

exports.deleteApiKeys = async (req, res) => {
  const { key } = req.params;
  const { name } = req.body;
  const keyToDelete = await Key.findOne({ API_KEY: key });
  if (!keyToDelete) {
    return res.status(400).json({ success: false, message: 'Key not found' });
  }

  await keyToDelete.remove();

  const user = await User.aggregate([
    { $unwind: '$API_KEYS' },
    {
      $match: {
        API_KEYS: {
          $eq: key,
        },
      },
    },
  ]);

  if (!user[0]) {
    return res.status(400).json({
      msg: `Invalid Credentials Entered`,
    });
  }

  const userMe = await User.findById({ _id: user[0]._id });

  const app = userMe.app_name.indexOf(name);

  userMe.app_name = userMe.app_name.filter((app_name, index) => index !== app);

  const index_api_key = userMe.API_KEYS.indexOf(key);

  userMe.API_KEYS = userMe.API_KEYS.filter(
    (key, index) => index !== index_api_key
  );
  await userMe.save();
  res.status(200).json({
    msg: 'Deletd Successfully',
  });
};
