/* /routes/api/users.js */
const express = require('express');
const ctrl = require('../../controllers/users');
const mdw = require('../../middlewares');

const upload = require('../../servise/upload');
const usersRouter = express.Router();

usersRouter.patch('/avatars', mdw.authenticate, upload.single('avatar'), ctrl.avatars);

module.exports = usersRouter;

/* /middlewares/authenticate; */
const jwt = require('jsonwebtoken');
const { HttpError } = require('../helpers');
const { User } = require('../models');
const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer') return next(HttpError(401, 'Not authorized'));
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user || !user.token || user.token !== token) return next(HttpError(401, 'Not authorized'));

    req.user = user;

    next();
  } catch {
    next(HttpError(401, 'Not authorized'));
  }
};

module.exports = authenticate;

/* /servise/upload; */
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

const updateAvatar = require('../../servise/updateAvatar');
const path = require('path');
const convertingAvatars = require('../../servise/convertingAvatars');
const fs = require('fs').promises;

/* controllers/users; */
const avatars = async (req, res) => {
  const { path: tmpDir, originalname } = req.file;
  const { id } = req.user;
  const extension = originalname.split('.').reverse()[0];
  const newName = `${id}.${extension}`;
  const newPathAvatar = path.join(__dirname, '../public/avatars/', newName);
  try {
    await convertingAvatars({ tmpDir });
    await fs.rename(tmpDir, newPathAvatar);
    const { avatarURL } = await updateAvatar({
      id,
      avatarURL: `/avatars/${newName}`,
    });
    res.status(200).json({ avatarURL });
  } catch (error) {
    fs.unlink(tmpDir);
    res.status(400).json({ message: error.message });
  }
};

module.exports = avatars;
