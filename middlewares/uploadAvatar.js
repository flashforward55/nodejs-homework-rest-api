const multer = require('multer');
const path = require('path');

const tempDirPath = path.join(__dirname, '..', 'temp');

const storage = multer.diskStorage({
  destination: tempDirPath,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
