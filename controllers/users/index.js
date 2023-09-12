const { ctrlWrapper } = require('../../decorators');
const register = require('./register');
const login = require('./login');
const logout = require('./logout');
const current = require('./current');
const updateSubscription = require('./updateSubscription');
const avatars = require('./avatars');
const verifyEmail = require('./verifyEmail');
const resendVerifyEmail = require('./resendVerifyEmail')

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  current: ctrlWrapper(current),
  updateSubscription: ctrlWrapper(updateSubscription),
  avatars: ctrlWrapper(avatars),
  verifyEmail: ctrlWrapper(verifyEmail),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
};
