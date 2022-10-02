const express = require('express');
const {
  uploadMedia,
  getUserMedia,
  getVideosByMonth,
  getAdminMedia,
  getVideosByMonthAdmin,
  uploadExternnalMedia,
} = require('../controllers/mediaController');
const upload = require('../middleware/multer');
const path = require('path');
const Video = require('../db/video');
const { authenticatedUser } = require('../middleware/auth');

const router = express();

router.route('/user-all').get(authenticatedUser, getUserMedia);
router.route('/admin-all').get(getAdminMedia);

router.route('/filter').post(authenticatedUser, getVideosByMonth);
router.route('/filter-admin').post(getVideosByMonthAdmin);
router.route('/create').post(
  upload.fields([
    {
      name: 'videos',
      maxCount: 8,
    },
  ]),
  authenticatedUser,
  uploadMedia
);
router.route('/create/external').post(
  upload.fields([
    {
      name: 'videos',
      maxCount: 8,
    },
  ]),
  uploadExternnalMedia
);

router.post('/download', async function (req, res) {
  const { name } = req.body;
  await Video.create({ name });

  const file = path.resolve(__dirname, `../public/videos/${name}`);

  res.download(file);
});

module.exports = router;
