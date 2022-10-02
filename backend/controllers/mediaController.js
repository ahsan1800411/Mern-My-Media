const Media = require('../db/media');
const User = require('../db/User');
const mongoose = require('mongoose');

exports.getUserMedia = async (req, res) => {
  try {
    const media = await Media.find({ userId: req.user.data.userId });
    res.status(200).json({ success: true, media });
  } catch (error) {
    // res.status(400).json(error);
  }
};
exports.getAdminMedia = async (req, res) => {
  try {
    const users = await (
      await User.find({ role: 'admin' }).select('_id')
    ).map((user) => user._id);

    const media = await Media.find({
      userId: { $in: users },
    });

    res.status(200).json({ success: true, media });
  } catch (error) {
    // res.status(400).json(error);
  }
};

function toBytes(size, type) {
  const types = ['B', 'KB', 'MB', 'GB', 'TB'];

  const key = types.indexOf(type.toUpperCase());

  if (typeof key !== 'boolean') {
    return size * 1024 ** key;
  }
  return 'invalid type: type must be GB/KB/MB etc.';
}

function formatBytes(a, b = 2) {
  if (0 === a) return '0 Bytes';
  const c = 0 > b ? 0 : b,
    d = Math.floor(Math.log(a) / Math.log(1024));
  return (
    parseFloat((a / Math.pow(1024, d)).toFixed(c)) +
    ' ' +
    ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][d]
  );
}

exports.uploadMedia = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.data.userId });
    let videoPaths = [];
    if (Array.isArray(req.files.videos) && req.files.videos.length > 0) {
      for (let video of req.files.videos) {
        videoPaths.push('\\' + video.path);
        await Media.insertMany([
          {
            videos: videoPaths,
            name: video.originalname,
            size: (video.size / 1024 / 1024).toFixed(2),
            userId: req.user.data.userId,
          },
        ]);

        let result;
        if (user.storageLeft.toLowerCase().includes('mb')) {
          result = toBytes(user.storageLeft.replace(/[a-z ]/gi, ''), 'MB');
        } else {
          result = toBytes(user.storageLeft.replace(/[a-z ]/gi, ''), 'GB');
        }

        const userStorageLeft = result - video.size;

        user.storageLeft = formatBytes(userStorageLeft);
      }

      if (user.videosLeft > 0) {
        user.videosLeft = user.videosLeft - req.files.videos.length;
      }
      await user.save();
    }
    res.status(200).json({ success: true });
  } catch (error) {}
};

exports.getVideosByMonth = async (req, res) => {
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;

  const start = new Date(startDate).setHours(0, 0, 0, 0);
  const end = new Date(endDate).setHours(23, 59, 59, 999);

  const filteredVideos = await Media.aggregate([
    { $match: { userId: mongoose.Types.ObjectId(req.user.data.userId) } },
    {
      $match: {
        createdAt: {
          $gte: new Date(start),
          $lte: new Date(end),
        },
      },
    },
  ]);

  res.status(200).json({ filteredVideos });
};
exports.getVideosByMonthAdmin = async (req, res) => {
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;

  const users = await (
    await User.find({ role: 'admin' }).select('_id')
  ).map((user) => user._id);

  const start = new Date(startDate).setHours(0, 0, 0, 0);
  const end = new Date(endDate).setHours(23, 59, 59, 999);

  const filteredVideos = await Media.aggregate([
    { $match: { userId: { $in: users } } },
    {
      $match: {
        createdAt: {
          $gte: new Date(start),
          $lte: new Date(end),
        },
      },
    },
  ]);

  res.status(200).json({ filteredVideos });
};

exports.uploadExternnalMedia = async (req, res) => {
  try {
    const API_KEY = req.body.API_KEY;

    if (!API_KEY) {
      return res.status(400).json({
        msg: `Please Provide the API KEY`,
      });
    }

    const user = await User.aggregate([
      { $unwind: '$API_KEYS' },
      {
        $match: {
          API_KEYS: {
            $eq: API_KEY,
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

    if (!userMe) {
      return res.status(400).json({
        msg: `Invalid Credentials Entered`,
      });
    }

    let videoPaths = [];

    if (Array.isArray(req.files.videos) && req.files.videos.length > 0) {
      for (let video of req.files.videos) {
        videoPaths.push('\\' + video.path);

        if (userMe.role === 'user') {
          if (userMe.videosLeft < req.files.videos.length) {
            return res.status(400).json({
              msg: `You have only ${userMe.videosLeft} videos left`,
            });
          }

          let result;
          if (userMe.storageLeft.toLowerCase().includes('mb')) {
            result = toBytes(userMe.storageLeft.replace(/[a-z ]/gi, ''), 'MB');
          } else {
            result = toBytes(userMe.storageLeft.replace(/[a-z ]/gi, ''), 'GB');
          }

          if (result < video.size) {
            return res.status(400).json({
              msg: `Sorry, You have only ${userMe.storageLeft}  left`,
            });
          }

          const userStorageLeft = result - video.size;

          userMe.storageLeft = formatBytes(userStorageLeft);

          await Media.insertMany([
            {
              videos: videoPaths,
              name: video.originalname,
              size: (video.size / 1024 / 1024).toFixed(2),
              userId: userMe._id,
            },
          ]);
          await userMe.save();
        } else {
          await Media.insertMany([
            {
              videos: videoPaths,
              name: video.originalname,
              size: (video.size / 1024 / 1024).toFixed(2),
              userId: userMe._id,
            },
          ]);
        }
      }

      if (userMe.role === 'user') {
        userMe.videosLeft = userMe.videosLeft - req.files.videos.length;
        await userMe.save();
      }
    }

    return res.status(200).json({ msg: 'Videos upload successfully' });
  } catch (error) {}
};
