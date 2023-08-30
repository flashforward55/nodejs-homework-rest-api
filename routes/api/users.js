const express = require('express');
const ctrl = require('../../controllers/users');
const mdw = require('../../middlewares');
const { joiUsersSchemas } = require('../../schemas');

const usersRouter = express.Router();

usersRouter.post('/register', mdw.validateBody(joiUsersSchemas.register), ctrl.register);

usersRouter.post('/login', mdw.validateBody(joiUsersSchemas.login), ctrl.login);

usersRouter.post('/logout', mdw.authenticate, ctrl.logout);

usersRouter.get('/current', mdw.authenticate, ctrl.current);

usersRouter.patch(
  '/',
  mdw.authenticate,
  mdw.validateEmptyBodySub,
  mdw.validateBody(joiUsersSchemas.updateSubscription),
  ctrl.updateSubscription
);

usersRouter.patch(
  '/avatars',
  mdw.authenticate,
  mdw.uploadAvatar.single('avatar'),
  mdw.modifyAvatar,
  ctrl.updateAvatar
);

module.exports = usersRouter;
