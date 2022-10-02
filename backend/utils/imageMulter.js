const multer = require('multer');
const fs = require('fs');
const path = require('path');
const CustomApiErrorHandler = require('./CustomApiErrorHandler');

// for images

const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync('public')) {
      fs.mkdirSync('public');
    }
    if (!fs.existsSync('public/images')) {
      fs.mkdirSync('public/images');
    }

    cb(null, 'public/images');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.originalname);
  },
});

const imageUpload = multer({
  storage: imageStorage,
  fileFilter: function (req, file, cb) {
    const extension = path.extname(file.originalname);
    if (
      extension !== '.jpeg' &&
      extension !== '.jpg' &&
      extension !== '.png' &&
      extension !== '.gif'
    ) {
      return cb(new CustomApiErrorHandler('Only Images are allowed!', 400));
    }
    cb(null, true);
  },
});

module.exports = imageUpload;
