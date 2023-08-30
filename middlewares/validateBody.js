const { HttpError } = require("../helpers");

const validateBody = (validationSchema) => {
  const validate = (req, res, next) => {
    const { error } = validationSchema.validate(req.body);

    if (error) next(HttpError(400, error.details[0].message));

    next();
  };
  return validate;
};

module.exports = validateBody;
