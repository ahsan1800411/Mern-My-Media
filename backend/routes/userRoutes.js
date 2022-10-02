const express = require('express');

const {
  getUsersCount,
  updateUser,
  checkUserInfo,
  createApiKeys,
  deleteApiKeys,
} = require('../controllers/userControllers');
const imageUpload = require('../utils/imageMulter');
const { authenticatedUser } = require('../middleware/auth');

const router = express();

router.route('/count').get(getUsersCount);
router.route('/update/:id').patch(imageUpload.single('image'), updateUser);
router.route('/check').get(authenticatedUser, checkUserInfo);
router.route('/api-keys/:id').patch(createApiKeys).delete(deleteApiKeys);

module.exports = router;
