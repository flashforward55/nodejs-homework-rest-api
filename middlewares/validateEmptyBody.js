const { HttpError } = require("../helpers");

const validateEmptyBody = (req, res, next) => {
  if (req.method === "PUT" && Object.keys(req.body).length === 0) {
    return next(HttpError(400, "missing fields"));
  }

  if (req.method === "PATCH" && Object.keys(req.body).length === 0) {
    return next(HttpError(400, "missing fields favorite"));
  }

  next();
};

module.exports = validateEmptyBody;
