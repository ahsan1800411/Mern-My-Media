const express = require('express');
const {
  registerUser,
  login,
  sendReset,
  resetPassword,
  getUsers,
} = require('../controllers/authController');

const router = express();

router.route('/createaccount').post(registerUser);
router.route('/login').post(login);
router.route('/send-reset').post(sendReset);
router.route('/reset-password').post(resetPassword);
router.route('/getUsers').get(getUsers);

module.exports = router;
