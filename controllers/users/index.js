const { ctrlWrapper } = require('../../decorators');
const register = require('./register');
const login = require('./login');
const logout = require('./logout');
const current = require('./current');
const updateSubscription = require('./updateSubscription');
const updateAvatar = require('./updateAvatar');
const avatars = require('./avatars');

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  current: ctrlWrapper(current),
  updateSubscription: ctrlWrapper(updateSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
  avatars: ctrlWrapper(avatars),
};
