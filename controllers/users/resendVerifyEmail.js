const { User } = require('../../models');
const { HttpError, sendEmail } = require('../../helpers');

const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) throw HttpError(404, 'User not found');

  if (user.verify) throw HttpError(400, 'Verification has already been passed');

  const verificationEmail = {
    to: email,
    subject: 'Verify email',
    html: `<a target="_blank" href="${BASE_URL}/users/verify/${user.verificationToken}">Click here to verify your email</a>`,
  };

  await sendEmail(verificationEmail);

  res.json({
    message: 'Verification email sent',
  });
};

module.exports = resendVerifyEmail;
