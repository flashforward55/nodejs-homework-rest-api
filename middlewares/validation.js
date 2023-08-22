const validation = schema => {
  return async (req, res, next) => {
    if (req.method === 'PUT' && Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'missing fields' });
    }
    if (req.method === 'PATCH' && Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'missing field favorite' });
    }
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
  };
};

module.exports = validation;
