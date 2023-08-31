const multer = require('multer');
const path = require('path');
const { HttpError } = require('../helpers');

const allowedImagesMimeTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/bmp'];

const tempDirPath = path.join(__dirname, '..', 'temp');

const storage = multer.diskStorage({
  destination: tempDirPath,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const isAllowed = allowedImagesMimeTypes.includes(file.mimetype);

  if (!isAllowed) return cb(HttpError(400, 'Invalid file type'));

  cb(null, true);
};

const uploadAvatar = multer({ storage, fileFilter });

module.exports = uploadAvatar;
