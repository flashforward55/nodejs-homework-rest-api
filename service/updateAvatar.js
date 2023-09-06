const { User } = require('../models');

const updateAvatar = async ({ id, avatarURL }) => {
  const result = await User.findByIdAndUpdate(id, { avatarURL }, { new: true });
  return result;
};
module.exports = updateAvatar;
