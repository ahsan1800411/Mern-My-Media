require('dotenv').config();
const jwt = require('jsonwebtoken');

const generateToken = (data, secret = 'KaianNUywgNu26735@!') => {
  const payload = { data };
  return jwt.sign(payload, secret, {
    expiresIn: '15d',
  });
};

const verifyToken = (token, secret) => {
  try {
    // console.log("token: " ,token,"secret",secret);
    const payload = jwt.verify(token, secret);

    if (!payload) {
      return false;
    } else {
      return true;
    }
  } catch (err) {
    console.log('I am error', err);
  }
};

const generateAdminToken = (admin) => {
  return generateToken(
    { adminId: admin._id, role: admin.role },
    'KaianNUywgNu26735@!'
  );
};

const verifyAdminToken = (token) => {
  return verifyToken(token, 'KaianNUywgNu26735@!');
};

const generateAccessToken = (user) => {
  return generateToken({ userId: user._id, role: user.role });
};

const verifyAccessToken = (token, planSecret) => {
  console.log('token', token, 'planSecret', planSecret);
  return verifyToken(token, planSecret);
};

const generateResetPasswordToken = (email) => {
  return generateToken({ email }, 'KaianNUywgNu26735@!');
};

const generateAppToken = (app) => {
  return generateToken(
    { appId: app.appId, name: app.name },
    'KaianNUywgNu26735@!'
  );
};

module.exports = {
  verifyAdminToken,
  generateAdminToken,
  verifyAccessToken,
  generateAccessToken,
  generateResetPasswordToken,
  generateAppToken,
};
