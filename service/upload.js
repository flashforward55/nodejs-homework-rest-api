const path = require('path');
const multer = require('multer');

const tmpDir = path.join(__dirname, '../temp');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tmpDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

module.exports = upload;
