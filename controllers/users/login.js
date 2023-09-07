const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { User } = require('../../models');
const { HttpError } = require('../../helpers');

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) throw HttpError(401, 'Email or password is wrong');

  if (!user.verify) throw HttpError(403, 'Email is not verified');

  const comparePassword = await bcrypt.compare(password, user.password);

  if (!comparePassword) throw HttpError(401, 'Email or password is wrong');

  const jwtPayload = { id: user._id };
  const token = jwt.sign(jwtPayload, SECRET_KEY, { expiresIn: '23h' });
  await User.findByIdAndUpdate(user.id, { token });

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
      avatarURL: user.avatarURL,
    },
  });
};

module.exports = login;
