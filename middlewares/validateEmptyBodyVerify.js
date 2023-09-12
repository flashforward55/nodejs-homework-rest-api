const { HttpError } = require('../helpers');

const validateEmptyBody = (req, res, next) => {
  if (req.method === 'POST' && Object.keys(req.body).length === 0) {
    return next(HttpError(400, 'missing required field email'));
  }

  next();
};

module.exports = validateEmptyBody;
