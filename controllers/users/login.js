const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require('../../models/user');
const { HttpError } = require("../../helpers");
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) throw HttpError(401, 'Email or password is wrong');

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) throw HttpError(401, 'Email or password is wrong');

    const jwtPayload = { id: user._id };

    const token = jwt.sign(jwtPayload, SECRET_KEY, { expiresIn: '23h' });

    await User.findByIdAndUpdate(user.id, { token });

    res.json({
        token,
        user: {
            email: user.email,
            /* subscription: user.subscription, */
        },
    });
};

module.exports = login;