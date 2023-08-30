const { HttpError } = require("../helpers");

const validateEmptyBody = (req, res, next) => {
  if (req.method === "PATCH" && !req.body.subscription) {
    return next(HttpError(400, "missing fields subscription"));
  }

  next();
};

module.exports = validateEmptyBody;
